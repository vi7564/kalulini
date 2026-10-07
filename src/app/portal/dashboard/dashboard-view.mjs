export function getDashboardView(role) {
  if (role === 'APPLICANT') return 'applicant';
  if (role === 'PARENT') return 'parent';
  return 'unsupported';
}

export function getDashboardSections(role) {
  if (role === 'APPLICANT') {
    return ['application-status', 'progress', 'missing-documents', 'admission-fee'];
  }
  if (role === 'PARENT') {
    return ['child-switcher', 'fees', 'notifications', 'academics', 'attendance', 'assignments', 'events', 'messages'];
  }
  return [];
}

export function getLinkedStudentIds(claims) {
  const ids = [
    ...(typeof claims.studentId === 'string' ? [claims.studentId] : []),
    ...(Array.isArray(claims.studentIds)
      ? claims.studentIds.filter((id) => typeof id === 'string')
      : []),
  ];
  return [...new Set(ids.filter(Boolean))].slice(0, 20);
}

export function parentOwnsStudent(claims, studentId, admissionNumber) {
  const linkedIds = getLinkedStudentIds(claims);
  return linkedIds.includes(studentId)
    || (typeof admissionNumber === 'string' && linkedIds.includes(admissionNumber));
}

export function getAcademicTerm(now = new Date()) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Africa/Nairobi',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(now);
  const part = (type) => parts.find((item) => item.type === type)?.value;
  const year = Number(part('year'));
  const month = Number(part('month'));
  const day = part('day');

  if (month <= 4) return { label: 'Term 1', year, startDate: `${year}-01-01`, endDate: `${year}-04-30`, today: `${year}-${part('month')}-${day}` };
  if (month <= 8) return { label: 'Term 2', year, startDate: `${year}-05-01`, endDate: `${year}-08-31`, today: `${year}-${part('month')}-${day}` };
  if (month <= 11) return { label: 'Term 3', year, startDate: `${year}-09-01`, endDate: `${year}-11-30`, today: `${year}-${part('month')}-${day}` };
  return { label: 'Between terms', year, startDate: null, endDate: null, today: `${year}-${part('month')}-${day}` };
}

export function isInAcademicTerm(record, term) {
  if (!term.startDate || !term.endDate) return false;
  const recordTerm = String(record.term || '').replace(/\s+/g, ' ').trim().toLowerCase();
  if (recordTerm && recordTerm !== term.label.toLowerCase()) return false;
  const recordYear = Number(record.academicYear || record.year);
  if (Number.isFinite(recordYear) && recordYear > 0 && recordYear !== term.year) return false;
  const dateValue = record.date || record.updatedAt || record.createdAt;
  let date = '';
  if (typeof dateValue === 'string') {
    const isoDate = dateValue.match(/^\d{4}-\d{2}-\d{2}/)?.[0];
    if (isoDate) date = isoDate;
    else {
      const parsed = new Date(dateValue);
      if (!Number.isNaN(parsed.getTime())) date = parsed.toISOString().slice(0, 10);
    }
  } else if (dateValue && typeof dateValue.toDate === 'function') {
    date = dateValue.toDate().toISOString().slice(0, 10);
  }
  return date >= term.startDate && date <= term.endDate;
}
