import { getAuth } from 'firebase-admin/auth';
import { NextResponse } from 'next/server';
import { getFirebaseAdminApp, requireActiveProfile } from '@/lib/firebase-admin';

export const runtime = 'nodejs';

const SESSION_DURATION_MS = 5 * 24 * 60 * 60 * 1000;

export async function POST(request: Request) {
  try {
    const authorization = request.headers.get('authorization');
    const idToken = authorization?.startsWith('Bearer ') ? authorization.slice(7) : '';
    if (!idToken) return NextResponse.json({ error: 'Sign in is required.' }, { status: 401 });

    const app = getFirebaseAdminApp();
    const adminAuth = getAuth(app);
    const decoded = await adminAuth.verifyIdToken(idToken, true);
    const profile = await requireActiveProfile(app, decoded);
    const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn: SESSION_DURATION_MS });
    const response = NextResponse.json({
      uid: decoded.uid,
      role: profile.role,
      displayName: profile.displayName || '',
    });
    response.cookies.set('__session', sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: Math.floor(SESSION_DURATION_MS / 1000),
    });
    return response;
  } catch (error) {
    if (error instanceof Error && error.message === 'ACCOUNT_NOT_ACTIVE') {
      return NextResponse.json({ error: 'Your account is awaiting administrator approval or has been deactivated.' }, { status: 403 });
    }
    console.error('Unable to establish an authenticated portal session.', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unable to establish a secure session.' },
      { status: 401 },
    );
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.set('__session', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });
  return response;
}
