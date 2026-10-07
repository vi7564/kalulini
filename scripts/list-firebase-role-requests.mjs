import { applicationDefault, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

try {
  initializeApp({
    credential: applicationDefault(),
    ...(process.env.GOOGLE_CLOUD_PROJECT
      ? { projectId: process.env.GOOGLE_CLOUD_PROJECT }
      : {}),
  });

  const snapshot = await getFirestore()
    .collection('roleRequests')
    .where('status', '==', 'pending')
    .orderBy('createdAt', 'asc')
    .get();

  if (snapshot.empty) {
    console.log('No pending role requests.');
  } else {
    console.table(snapshot.docs.map((request) => {
      const data = request.data();
      return {
        uid: request.id,
        requestedRole: data.requestedRole,
        name: data.displayName,
        email: data.email,
        requestedAt: data.createdAt?.toDate?.().toISOString() || 'unknown',
      };
    }));
  }
} catch (error) {
  console.error('Unable to list role requests:', error);
  process.exitCode = 1;
}
