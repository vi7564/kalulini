import assert from 'node:assert/strict';
import test from 'node:test';
import { isPendingStatus, requiredRoleLink, validateRoleAssignment } from './access-policy.mjs';

test('role changes reject unknown and elevated roles for regular admins', () => {
  assert.match(validateRoleAssignment('UNKNOWN') || '', /valid school role/);
  assert.match(validateRoleAssignment('ADMIN') || '', /Super Admin/);
  assert.equal(validateRoleAssignment('TEACHER'), null);
  assert.equal(validateRoleAssignment('ADMIN', { isSuperAdmin: true }), null);
});

test('student, parent, and teacher roles require verified school links', () => {
  assert.equal(requiredRoleLink('STUDENT'), 'studentId');
  assert.equal(requiredRoleLink('PARENT'), 'studentId');
  assert.equal(requiredRoleLink('TEACHER'), 'teacherId');
  assert.equal(requiredRoleLink('APPLICANT'), null);
});

test('only pending users are eligible for approval or rejection', () => {
  assert.equal(isPendingStatus('pending'), true);
  assert.equal(isPendingStatus('active'), false);
  assert.equal(isPendingStatus('rejected'), false);
});
