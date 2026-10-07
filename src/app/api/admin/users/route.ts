import { getFirestore } from 'firebase-admin/firestore';
import { NextResponse } from 'next/server';
import { requireAdminRequest, publicUserProfile } from '@/lib/firebase-admin';

export const runtime = 'nodejs';

export async function GET(request: Request) {
  try {
    const access = await requireAdminRequest(request);
    if ('response' in access) return access.response;
    const { app } = access;
    const firestore = getFirestore(app);
    const [profiles, requests, studentSnapshot, teacherSnapshot] = await Promise.all([
      firestore.collection('users').limit(500).get(),
      firestore.collection('roleRequests').limit(500).get(),
      firestore.collection('students').limit(1000).get(),
      firestore.collection('teachers').limit(1000).get(),
    ]);
    const requestByUid = new Map(requests.docs.map((item) => [item.id, item.data()]));
    const users = profiles.docs.map((item) => {
      const profile = item.data();
      const accessRequest = requestByUid.get(item.id);
      return {
        ...publicUserProfile(profile, item.id),
        requestedRole: profile.requestedRole || accessRequest?.requestedRole || null,
        requestStatus: accessRequest?.status || (profile.status === 'pending' ? 'pending' : null),
        requestCreatedAt: accessRequest?.createdAt?.toDate?.().toISOString?.() || null,
      };
    });
    const students = studentSnapshot.docs.map((item) => {
      const student = item.data();
      return {
        id: item.id,
        firstName: typeof student.firstName === 'string' ? student.firstName : '',
        lastName: typeof student.lastName === 'string' ? student.lastName : '',
        admissionNumber: typeof student.admissionNumber === 'string' ? student.admissionNumber : '',
        form: typeof student.form === 'string' ? student.form : '',
        stream: typeof student.stream === 'string' ? student.stream : '',
      };
    });
    const teachers = teacherSnapshot.docs.map((item) => {
      const teacher = item.data();
      return {
        id: item.id,
        firstName: typeof teacher.firstName === 'string' ? teacher.firstName : '',
        lastName: typeof teacher.lastName === 'string' ? teacher.lastName : '',
        staffNumber: typeof teacher.staffNumber === 'string' ? teacher.staffNumber : '',
        assignedClasses: Array.isArray(teacher.assignedClasses) ? teacher.assignedClasses : [],
      };
    });
    return NextResponse.json({ users, students, teachers });
  } catch (error) {
    console.error('Unable to load account access records.', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unable to load account access records.' },
      { status: 500 },
    );
  }
}
