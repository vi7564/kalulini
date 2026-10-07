export const ASSIGNABLE_ROLES = [
  'SUPER_ADMIN',
  'ADMIN',
  'PRINCIPAL',
  'TEACHER',
  'STUDENT',
  'PARENT',
  'STAFF',
  'APPLICANT',
];

export function validateRoleAssignment(role, { isSuperAdmin = false } = {}) {
  if (!ASSIGNABLE_ROLES.includes(role)) return 'Select a valid school role.';
  if (['SUPER_ADMIN', 'ADMIN', 'PRINCIPAL'].includes(role) && !isSuperAdmin) {
    return 'Only a Super Admin can assign administrator or Principal access.';
  }
  return null;
}

export function requiredRoleLink(role) {
  if (role === 'STUDENT' || role === 'PARENT') return 'studentId';
  if (role === 'TEACHER') return 'teacherId';
  return null;
}

export function isPendingStatus(status) {
  return status === 'pending';
}
