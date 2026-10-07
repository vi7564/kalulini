import { applicationDefault, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { FieldValue, getFirestore } from 'firebase-admin/firestore';

const allowedRoles = new Set([
  'ADMIN',
  'SUPER_ADMIN',
  'PRINCIPAL',
  'TEACHER',
  'STUDENT',
  'PARENT',
  'STAFF',
  'APPLICANT',
]);
const [uid, role, ...options] = process.argv.slice(2);

function usage() {
  console.error(
    'Usage: node scripts/set-firebase-role.mjs <uid> <role> [--student-id=<id>] [--teacher-id=<id>] [--assigned-classes="Form 3 East,Form 4 West"]',
  );
  process.exitCode = 1;
}

if (!uid || !role || !allowedRoles.has(role)) {
  usage();
} else {
  const values = new Map();
  for (const option of options) {
    const separator = option.indexOf('=');
    if (!option.startsWith('--') || separator < 3) {
      usage();
      break;
    }
    values.set(option.slice(2, separator), option.slice(separator + 1));
  }

  const studentId = values.get('student-id');
  const teacherId = values.get('teacher-id');
  const assignedClasses = values.get('assigned-classes')
    ?.split(',')
    .map((className) => className.trim())
    .filter(Boolean);

  if (role === 'STUDENT' || role === 'PARENT') {
    if (!studentId) {
      console.error(`${role} accounts require --student-id.`);
      process.exitCode = 1;
    }
  } else if (role === 'TEACHER') {
    if (!teacherId || !assignedClasses?.length) {
      console.error('TEACHER accounts require --teacher-id and --assigned-classes.');
      process.exitCode = 1;
    } else if (assignedClasses.length > 30) {
      console.error('TEACHER accounts can have no more than 30 assigned classes.');
      process.exitCode = 1;
    }
  }

  if (process.exitCode !== 1) {
    try {
      initializeApp({
        credential: applicationDefault(),
        ...(process.env.GOOGLE_CLOUD_PROJECT
          ? { projectId: process.env.GOOGLE_CLOUD_PROJECT }
          : {}),
      });

      const auth = getAuth();
      const user = await auth.getUser(uid);
      const firestore = getFirestore();
      if (studentId) {
        const student = await firestore.collection('students').doc(studentId).get();
        if (!student.exists) throw new Error(`Student record ${studentId} does not exist.`);
      }
      if (teacherId) {
        const teacher = await firestore.collection('teachers').doc(teacherId).get();
        if (!teacher.exists) throw new Error(`Teacher record ${teacherId} does not exist.`);
      }

      const roleRequestRef = firestore.collection('roleRequests').doc(uid);
      const roleRequestSnapshot = await roleRequestRef.get();
      let requestData;
      if (roleRequestSnapshot.exists) {
        requestData = roleRequestSnapshot.data();
        if (requestData.status !== 'pending' && requestData.status !== 'approved') {
          throw new Error(`Role request is ${requestData.status}; it cannot be approved.`);
        }
        if (requestData.requestedRole !== role) {
          throw new Error(`The pending request is for ${requestData.requestedRole}, not ${role}.`);
        }
      }

      const claims = { role };

      if (studentId) claims.studentId = studentId;
      if (teacherId) claims.teacherId = teacherId;
      if (assignedClasses) claims.assignedClasses = assignedClasses;

      await auth.setCustomUserClaims(uid, claims);
      await firestore.collection('users').doc(uid).set({
        uid,
        email: user.email || '',
        displayName: user.displayName || user.email?.split('@')[0] || 'User',
        role,
        ...(studentId ? { studentId } : {}),
        ...(teacherId ? { teacherId } : {}),
        ...(assignedClasses ? { assignedClasses } : {}),
        createdAt: user.metadata.creationTime || new Date().toISOString(),
        status: 'active',
      }, { merge: true });
      await auth.updateUser(uid, { disabled: false });
      await auth.revokeRefreshTokens(uid);

      if (requestData) {
        await roleRequestRef.update({
          status: 'approved',
          studentId: studentId || null,
          teacherId: teacherId || null,
          reviewedAt: FieldValue.serverTimestamp(),
        });
      }
      console.log(`Assigned ${role} role to Firebase Auth user ${uid}. Have the user sign in again to refresh claims.`);
    } catch (error) {
      console.error('Unable to assign the Firebase role:', error);
      process.exitCode = 1;
    }
  }
}
