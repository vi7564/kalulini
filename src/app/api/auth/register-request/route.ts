import { getAuth } from 'firebase-admin/auth';
import { FieldValue, getFirestore } from 'firebase-admin/firestore';
import { NextResponse } from 'next/server';
import { getFirebaseAdminApp } from '@/lib/firebase-admin';

export const runtime = 'nodejs';

const requestableRoles = ['APPLICANT', 'STUDENT', 'PARENT', 'TEACHER', 'STAFF'] as const;

export async function POST(request: Request) {
  try {
    const authorization = request.headers.get('authorization');
    const idToken = authorization?.startsWith('Bearer ') ? authorization.slice(7) : '';
    if (!idToken) {
      return NextResponse.json({ error: 'Sign in to submit an access request.' }, { status: 401 });
    }

    const body = await request.json() as { requestedRole?: unknown; displayName?: unknown };
    if (
      typeof body.requestedRole !== 'string'
      || !requestableRoles.includes(body.requestedRole as typeof requestableRoles[number])
      || typeof body.displayName !== 'string'
      || body.displayName.trim().length < 2
      || body.displayName.trim().length > 100
    ) {
      return NextResponse.json({ error: 'Enter your name and select a valid portal role.' }, { status: 400 });
    }
    const requestedRole = body.requestedRole;
    const displayName = body.displayName.trim();

    const app = getFirebaseAdminApp();
    const auth = getAuth(app);
    const decoded = await auth.verifyIdToken(idToken);
    const user = await auth.getUser(decoded.uid);
    if (!user.email) {
      return NextResponse.json({ error: 'An email address is required to request access.' }, { status: 400 });
    }

    const firestore = getFirestore(app);
    const userRef = firestore.collection('users').doc(decoded.uid);
    const requestRef = firestore.collection('roleRequests').doc(decoded.uid);
    const [profileSnapshot, requestSnapshot] = await Promise.all([userRef.get(), requestRef.get()]);
    if (profileSnapshot.exists && profileSnapshot.data()?.status === 'active' && profileSnapshot.data()?.role) {
      return NextResponse.json({ error: 'This account is already active. Sign in instead.' }, { status: 409 });
    }
    if (requestSnapshot.exists && requestSnapshot.data()?.status === 'pending') {
      return NextResponse.json({ error: 'An access request is already pending review.' }, { status: 409 });
    }

    await firestore.runTransaction(async (transaction) => {
      transaction.set(userRef, {
        uid: decoded.uid,
        email: user.email,
        displayName,
        role: null,
        requestedRole,
        status: 'pending',
        createdAt: profileSnapshot.data()?.createdAt || user.metadata.creationTime || new Date().toISOString(),
        updatedAt: FieldValue.serverTimestamp(),
      }, { merge: true });
      transaction.set(requestRef, {
        uid: decoded.uid,
        email: user.email,
        displayName,
        requestedRole,
        status: 'pending',
        createdAt: FieldValue.serverTimestamp(),
      });
    });

    await auth.setCustomUserClaims(decoded.uid, {});
    await auth.updateUser(decoded.uid, { disabled: true });
    await auth.revokeRefreshTokens(decoded.uid);

    return NextResponse.json({ status: 'pending' }, { status: 202 });
  } catch (error) {
    console.error('Access request registration failed.', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unable to submit your access request.' },
      { status: 500 },
    );
  }
}
