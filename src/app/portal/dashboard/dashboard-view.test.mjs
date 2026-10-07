import assert from 'node:assert/strict';
import test from 'node:test';
import {
  getAcademicTerm,
  getDashboardSections,
  getDashboardView,
  getLinkedStudentIds,
  isInAcademicTerm,
  parentOwnsStudent,
} from './dashboard-view.mjs';

test('dashboard view is restricted to applicant and parent roles', () => {
  assert.equal(getDashboardView('APPLICANT'), 'applicant');
  assert.equal(getDashboardView('PARENT'), 'parent');
  assert.equal(getDashboardView('ADMIN'), 'unsupported');
  assert.deepEqual(getDashboardSections('APPLICANT'), [
    'application-status',
    'progress',
    'missing-documents',
    'admission-fee',
  ]);
  assert.deepEqual(getDashboardSections('PARENT'), [
    'child-switcher',
    'fees',
    'notifications',
    'academics',
    'attendance',
    'assignments',
    'events',
    'messages',
  ]);
});

test('parent child access uses only linked, deduplicated student claims', () => {
  const claims = { studentId: 'student-1', studentIds: ['student-1', 'student-2', 3] };
  assert.deepEqual(getLinkedStudentIds(claims), ['student-1', 'student-2']);
  assert.equal(parentOwnsStudent(claims, 'student-2'), true);
  assert.equal(parentOwnsStudent({ studentId: 'KBHS/4201' }, 'student-1', 'KBHS/4201'), true);
  assert.equal(parentOwnsStudent(claims, 'student-3'), false);
});

test('school term follows the specified calendar and leaves December between terms', () => {
  assert.equal(getAcademicTerm(new Date('2026-03-20T12:00:00Z')).label, 'Term 1');
  assert.equal(getAcademicTerm(new Date('2026-06-20T12:00:00Z')).label, 'Term 2');
  assert.equal(getAcademicTerm(new Date('2026-10-02T12:00:00Z')).label, 'Term 3');
  assert.equal(getAcademicTerm(new Date('2026-12-02T12:00:00Z')).label, 'Between terms');
});

test('term metrics exclude records from other terms and years', () => {
  const term = getAcademicTerm(new Date('2026-10-02T12:00:00Z'));
  assert.equal(isInAcademicTerm({ updatedAt: '2026-10-01' }, term), true);
  assert.equal(isInAcademicTerm({ term: 'Term 2', updatedAt: '2026-10-01' }, term), false);
  assert.equal(isInAcademicTerm({ year: 2025, updatedAt: '2026-10-01' }, term), false);
});
