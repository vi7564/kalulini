import { type DecodedIdToken } from 'firebase-admin/auth';
import { getFirestore, type DocumentData, type Query } from 'firebase-admin/firestore';
import { NextResponse } from 'next/server';
import { getAcademicTerm, getLinkedStudentIds, isInAcademicTerm, parentOwnsStudent } from '@/app/portal/dashboard/dashboard-view.mjs';
import { getFirebaseAdminApp, requireActiveProfile, verifyRequestToken } from '@/lib/firebase-admin';

export const runtime = 'nodejs';

type StudentDocument = DocumentData & { id: string };

function serialize(value: unknown): unknown {
  if (value instanceof Date) return value.toISOString();
  if (value && typeof value === 'object' && 'toDate' in value && typeof value.toDate === 'function') {
    return value.toDate().toISOString();
  }
  if (Array.isArray(value)) return value.map(serialize);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, serialize(item)]));
  }
  return value;
}

function documents(snapshot: { docs: Array<{ id: string; data: () => DocumentData }> }): Array<DocumentData & { id: string }> {
  return snapshot.docs.map((item) => {
    const data = serialize(item.data());
    if (!data || typeof data !== 'object' || Array.isArray(data)) {
      throw new Error(`Document ${item.id} could not be serialized.`);
    }
    return { id: item.id, ...data as DocumentData };
  });
}

async function matchingDocuments(
  firestore: FirebaseFirestore.Firestore,
  collectionName: string,
  field: string,
  values: string[],
) {
  const uniqueValues = values.filter((value, index) => Boolean(value) && values.indexOf(value) === index);
  const snapshots = await Promise.all(uniqueValues.map((value) =>
    firestore.collection(collectionName).where(field, '==', value).get(),
  ));
  const uniqueDocuments = new Map(snapshots.flatMap((snapshot) => documents(snapshot)).map((item) => [item.id, item]));
  const result: DocumentData[] = [];
  uniqueDocuments.forEach((document) => result.push(document));
  return result;
}

function currentTermRecords(records: DocumentData[], term: ReturnType<typeof getAcademicTerm>) {
  return records.filter((record) => isInAcademicTerm(record, term));
}

function gradeFromScore(score: number) {
  if (score >= 80) return 'A';
  if (score >= 75) return 'A-';
  if (score >= 70) return 'B+';
  if (score >= 65) return 'B';
  if (score >= 60) return 'B-';
  if (score >= 55) return 'C+';
  if (score >= 50) return 'C';
  if (score >= 45) return 'C-';
  if (score >= 40) return 'D';
  return 'E';
}

function asDate(value: unknown) {
  if (typeof value === 'string') {
    const isoDate = value.match(/^\d{4}-\d{2}-\d{2}/)?.[0];
    if (isoDate) return isoDate;
    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? '' : parsed.toISOString().slice(0, 10);
  }
  if (value && typeof value === 'object' && 'toDate' in value && typeof value.toDate === 'function') {
    return value.toDate().toISOString().slice(0, 10);
  }
  return '';
}

async function authenticate(request: Request) {
  try {
    const { app, decoded } = await verifyRequestToken(request);
    const profile = await requireActiveProfile(app, decoded);
    return { app, decoded, profile };
  } catch (error) {
    if (error instanceof Error && error.message === 'AUTH_REQUIRED') {
      return { response: NextResponse.json({ error: 'Sign in to view this dashboard.' }, { status: 401 }) };
    }
    if (error instanceof Error && error.message === 'ACCOUNT_NOT_ACTIVE') {
      return { response: NextResponse.json({ error: 'This account is pending approval or inactive.' }, { status: 403 }) };
    }
    throw error;
  }
}

async function applicantDashboard(app: ReturnType<typeof getFirebaseAdminApp>, uid: string) {
  const firestore = getFirestore(app);
  const snapshot = await firestore.collection('admissions').where('userId', '==', uid).get();
  const applications = documents(snapshot).map((application) => {
    const docs = application.documents && typeof application.documents === 'object'
      ? application.documents as Record<string, unknown>
      : {};
    const requiredDocuments = [
      ['birthCertificateUrl', 'Birth certificate'],
      ['kcpeResultSlipUrl', 'KCPE result slip'],
      ['leavingCertificateUrl', 'Leaving certificate'],
    ];
    const missingDocuments = requiredDocuments
      .filter(([key]) => typeof docs[key] !== 'string' || !docs[key].trim() || docs[key] === '#')
      .map(([, label]) => label);
    return {
      id: application.id,
      reference: application.applicationReference || application.id,
      applicantName: [application.applicantFirstName, application.applicantLastName].filter(Boolean).join(' '),
      status: application.status || 'Submitted',
      submittedAt: application.submittedAt || null,
      reviewNotes: application.reviewNotes || null,
      missingDocuments,
      admissionFeeBalance: typeof (application.admissionFeeBalance ?? application.admissionFeeDue) === 'number'
        ? Number(application.admissionFeeBalance ?? application.admissionFeeDue)
        : null,
      admissionFeeDueDate: application.admissionFeeDueDate || null,
    };
  });
  return { role: 'APPLICANT', applications };
}

async function loadParentDashboard(
  app: ReturnType<typeof getFirebaseAdminApp>,
  decoded: DecodedIdToken,
  requestedStudentId: string | null,
) {
  const linkedIds = getLinkedStudentIds(decoded as Record<string, unknown>);
  if (!linkedIds.length) {
    return NextResponse.json({ error: 'Your parent account is not linked to a student. Contact the school office.' }, { status: 403 });
  }

  const firestore = getFirestore(app);
  const children = (await Promise.all(linkedIds.map(async (id) => {
    const byId = await firestore.collection('students').doc(id).get();
    if (byId.exists) return { id: byId.id, ...byId.data() };
    const byAdmissionNumber = await firestore.collection('students')
      .where('admissionNumber', '==', id)
      .limit(1)
      .get();
    const match = byAdmissionNumber.docs[0];
    return match ? { id: match.id, ...match.data() } : null;
  }))).filter((child): child is StudentDocument => child !== null);
  if (requestedStudentId && !children.some((child) =>
    child.id === requestedStudentId || child.admissionNumber === requestedStudentId
  )) {
    return NextResponse.json({ error: 'You are not authorized to view this student.' }, { status: 403 });
  }
  const selected = children.find((child) =>
    child.id === requestedStudentId || child.admissionNumber === requestedStudentId
  )
    || children[0];
  if (!selected) {
    if (requestedStudentId) {
      return NextResponse.json({ error: 'The selected student record is unavailable.' }, { status: 404 });
    }
    return NextResponse.json({ role: 'PARENT', children: [], dashboard: null, term: getAcademicTerm() });
  }

  const term = getAcademicTerm();
  const studentKeys = [selected.id, selected.admissionNumber].filter((key): key is string => typeof key === 'string' && Boolean(key));
  const classQuery: Query = selected.classKey
    ? firestore.collection('grades').where('classKey', '==', selected.classKey)
    : firestore.collection('grades').where('form', '==', selected.form).where('stream', '==', selected.stream);
  const [grades, initialClassGradeSnapshot, attendance, assignments, submissions, invoices, payments, events, notifications, messages] = await Promise.all([
    matchingDocuments(firestore, 'grades', 'studentId', studentKeys),
    classQuery.get(),
    matchingDocuments(firestore, 'attendance', 'studentId', studentKeys),
    (selected.classKey
      ? firestore.collection('assignments').where('classKey', '==', selected.classKey).get()
      : firestore.collection('assignments').where('form', '==', selected.form).where('stream', '==', selected.stream).get()),
    matchingDocuments(firestore, 'assignmentSubmissions', 'studentId', studentKeys),
    matchingDocuments(firestore, 'invoices', 'studentId', studentKeys),
    matchingDocuments(firestore, 'payments', 'studentId', studentKeys),
    firestore.collection('events').get(),
    matchingDocuments(firestore, 'notifications', 'studentId', [selected.id]),
    matchingDocuments(firestore, 'messages', 'studentId', [selected.id]),
  ]);
  const classGradeSnapshot = initialClassGradeSnapshot.empty && selected.form && selected.stream
    ? await firestore.collection('grades')
        .where('form', '==', selected.form)
        .where('stream', '==', selected.stream)
        .get()
    : initialClassGradeSnapshot;

  const termGrades = currentTermRecords(grades, term);
  const average = termGrades.length
    ? termGrades.reduce((sum, grade) => sum + Number(grade.score || 0), 0) / termGrades.length
    : null;
  const classAverages = new Map<string, number[]>();
  for (const grade of currentTermRecords(documents(classGradeSnapshot), term)) {
    if (typeof grade.studentId !== 'string') continue;
    const scores = classAverages.get(grade.studentId) || [];
    scores.push(Number(grade.score || 0));
    classAverages.set(grade.studentId, scores);
  }
  const rankedStudents: Array<{ studentId: string; average: number }> = [];
  classAverages.forEach((scores, studentId) => {
    rankedStudents.push({
      studentId,
      average: scores.reduce((sum, score) => sum + score, 0) / scores.length,
    });
  });
  rankedStudents.sort((left, right) => right.average - left.average);
  const position = average === null
    ? null
    : (rankedStudents.findIndex((student) => studentKeys.includes(student.studentId)) + 1 || null);
  const termAttendance = currentTermRecords(attendance, term);
  const absentDays = termAttendance.filter((record) => String(record.status).toLowerCase() === 'absent').length;
  const termAssignments = term.startDate && term.endDate
    ? documents(assignments).filter((assignment) =>
        (!assignment.form || assignment.form === selected.form)
        && (!assignment.stream || assignment.stream === selected.stream)
        && [assignment.dueDate, assignment.assignedDate].some((value) => {
          const date = asDate(value);
          return date >= term.startDate! && date <= term.endDate!;
        })
      )
    : [];
  const submittedIds = new Set(submissions
    .filter((submission) => ['submitted', 'graded', 'marked'].includes(String(submission.status || '').toLowerCase()))
    .map((submission) => String(submission.assignmentId || '')));
  const outstanding = termAssignments.filter((assignment) => !submittedIds.has(assignment.id));
  const overdueAssignments = outstanding.filter((assignment) => {
    const dueDate = asDate(assignment.dueDate);
    return dueDate && dueDate < term.today;
  }).length;
  const invoiceBalance = invoices.reduce((sum, invoice) => sum + Number(invoice.balance || 0), 0);
  const feeBalance = invoices.length
    ? invoiceBalance
    : typeof selected.feeBalance === 'number' ? Number(selected.feeBalance) : null;
  const dueInvoices = invoices
    .filter((invoice) => Number(invoice.balance || 0) > 0 && asDate(invoice.dueDate))
    .sort((left, right) => asDate(left.dueDate).localeCompare(asDate(right.dueDate)));
  const futureEvents = documents(events).filter((event) => {
    const date = asDate(event.startDate || event.date);
    return date && date >= term.today;
  }).sort((left, right) => asDate(left.startDate || left.date).localeCompare(asDate(right.startDate || right.date)));
  const childNotifications = notifications
    .filter((notification) => {
      const recipients = [notification.userId, notification.recipientId, notification.parentId, notification.recipientUid]
        .filter((recipient): recipient is string => typeof recipient === 'string');
      return !recipients.length || recipients.includes(decoded.uid);
    })
    .sort((left, right) => asDate(right.createdAt).localeCompare(asDate(left.createdAt)));
  const childMessages = messages
    .filter((message) => message.recipientId === decoded.uid || message.parentId === decoded.uid || message.studentId === selected.id);
  const unreadMessageCount = childMessages.filter((message) => {
    const addressedToParent = message.recipientId === decoded.uid
      || message.toUserId === decoded.uid
      || (message.parentId === decoded.uid && message.senderId !== decoded.uid);
    return addressedToParent && message.read !== true && message.isRead !== true;
  }).length;

  return NextResponse.json({
    role: 'PARENT',
    term: { ...term },
    children: children.map((child) => ({
      id: child.id,
      name: [child.firstName, child.middleName, child.lastName].filter(Boolean).join(' '),
      className: [child.form, child.stream].filter(Boolean).join(' '),
    })),
    dashboard: {
      studentId: selected.id,
      fee: {
        balance: feeBalance,
        dueDate: dueInvoices[0] ? dueInvoices[0].dueDate : null,
        admissionNumber: selected.admissionNumber || null,
        invoices: invoices.map((invoice) => ({
          id: invoice.id,
          invoiceNumber: invoice.invoiceNumber || invoice.id,
          term: invoice.term || '',
          balance: Number(invoice.balance || 0),
          dueDate: invoice.dueDate || null,
        })),
        payments: payments.sort((left, right) => asDate(right.date).localeCompare(asDate(left.date))).slice(0, 5),
      },
      academics: {
        average,
        grade: average === null ? null : gradeFromScore(average),
        position,
        classSize: rankedStudents.length || null,
      },
      attendance: { absentDays, recordedDays: termAttendance.length },
      assignments: { pending: outstanding.length, overdue: overdueAssignments },
      notifications: childNotifications.map((notification) => ({
        id: notification.id,
        title: notification.title || notification.subject || 'School update',
        message: notification.message || notification.detail || '',
        category: notification.category || notification.type || '',
        createdAt: notification.createdAt || null,
        read: notification.read === true || notification.isRead === true,
      })),
      unreadMessageCount,
      messages: childMessages
        .sort((left, right) => asDate(right.createdAt || right.date).localeCompare(asDate(left.createdAt || left.date)))
        .slice(0, 5)
        .map((message) => ({
          id: message.id,
          sender: message.senderName || message.from || message.sender || 'School',
          text: message.message || message.body || message.text || '',
          date: message.createdAt || message.date || null,
        })),
      events: futureEvents.map((event) => ({
        id: event.id,
        title: event.title || event.name || 'School event',
        date: event.startDate || event.date,
        category: event.category || event.type || '',
        location: event.location || '',
      })),
    },
  });
}

export async function GET(request: Request) {
  try {
    const authResult = await authenticate(request);
    if ('response' in authResult) return authResult.response;
    const { app, decoded } = authResult;
    const role = decoded.role;
    if (role === 'PARENT') {
      return await loadParentDashboard(app, decoded, new URL(request.url).searchParams.get('studentId'));
    }
    if (role === 'APPLICANT') {
      return NextResponse.json(await applicantDashboard(app, decoded.uid));
    }
    return NextResponse.json({ error: 'This dashboard is available to applicants and parents.' }, { status: 403 });
  } catch (error) {
    console.error('Portal dashboard data request failed.', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unable to load dashboard data.' },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const authResult = await authenticate(request);
    if ('response' in authResult) return authResult.response;
    const { app, decoded } = authResult;
    if (decoded.role !== 'PARENT') {
      return NextResponse.json({ error: 'Only a parent can update dashboard notifications.' }, { status: 403 });
    }
    const body = await request.json() as { studentId?: unknown; notificationId?: unknown };
    if (typeof body.studentId !== 'string' || typeof body.notificationId !== 'string') {
      return NextResponse.json({ error: 'A linked student and notification are required.' }, { status: 400 });
    }
    const firestore = getFirestore(app);
    const studentRef = firestore.collection('students').doc(body.studentId);
    const studentDoc = await studentRef.get();
    const student: StudentDocument | null = studentDoc.exists
      ? { id: studentDoc.id, ...studentDoc.data() }
      : null;
    if (!student || !parentOwnsStudent(
      decoded as Record<string, unknown>,
      student.id,
      typeof student.admissionNumber === 'string' ? student.admissionNumber : undefined,
    )) {
      return NextResponse.json({ error: 'You are not authorized to update this notification.' }, { status: 403 });
    }
    const notificationRef = firestore.collection('notifications').doc(body.notificationId);
    const notification = await notificationRef.get();
    const notificationData = notification.data();
    const recipientIds = [
      notificationData?.userId,
      notificationData?.recipientId,
      notificationData?.parentId,
      notificationData?.recipientUid,
    ]
      .filter((value): value is string => typeof value === 'string');
    if (!notification.exists || notificationData?.studentId !== body.studentId) {
      return NextResponse.json({ error: 'This notification was not found for the selected student.' }, { status: 404 });
    }
    if (recipientIds.some((recipientId) => recipientId !== decoded.uid)) {
      return NextResponse.json({ error: 'You are not authorized to update this notification.' }, { status: 403 });
    }
    await notificationRef.update({ read: true, readAt: new Date().toISOString() });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Unable to mark parent notification as read.', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unable to update this notification.' },
      { status: 500 },
    );
  }
}
