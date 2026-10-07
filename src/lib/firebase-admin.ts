import { applicationDefault, getApp, getApps, initializeApp, type App } from 'firebase-admin/app';
import { getAuth, type DecodedIdToken } from 'firebase-admin/auth';
import { getFirestore, type DocumentData } from 'firebase-admin/firestore';

export const ACTIVE_PORTAL_ROLES = [
  'SUPER_ADMIN',
  'ADMIN',
  'PRINCIPAL',
  'TEACHER',
  'STUDENT',
  'PARENT',
  'STAFF',
  'APPLICANT',
] as const;

export type ActivePortalRole = typeof ACTIVE_PORTAL_ROLES[number];

export function getFirebaseAdminApp(): App {
  if (getApps().length) return getApp();
  return initializeApp({
    credential: applicationDefault(),
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  });
}

export async function verifyRequestToken(request: Request) {
  const authorization = request.headers.get('authorization');
  const token = authorization?.startsWith('Bearer ') ? authorization.slice(7) : '';
  if (!token) throw new Error('AUTH_REQUIRED');
  const app = getFirebaseAdminApp();
  const decoded = await getAuth(app).verifyIdToken(token, true);
  return { app, decoded };
}

export async function requireActiveProfile(app: App, decoded: DecodedIdToken) {
  const profileSnapshot = await getFirestore(app).collection('users').doc(decoded.uid).get();
  const profile = profileSnapshot.data();
  if (
    !profileSnapshot.exists
    || profile?.status !== 'active'
    || typeof profile.role !== 'string'
    || !ACTIVE_PORTAL_ROLES.includes(profile.role as ActivePortalRole)
    || decoded.role !== profile.role
  ) {
    throw new Error('ACCOUNT_NOT_ACTIVE');
  }
  return profile;
}

export function isActiveRole(role: unknown): role is ActivePortalRole {
  return typeof role === 'string' && ACTIVE_PORTAL_ROLES.includes(role as ActivePortalRole);
}

export async function requireAdminRequest(request: Request) {
  try {
    const { app, decoded } = await verifyRequestToken(request);
    const profile = await requireActiveProfile(app, decoded);
    if (profile.role !== 'ADMIN' && profile.role !== 'SUPER_ADMIN') {
      return { response: Response.json({ error: 'Only an active administrator can manage accounts.' }, { status: 403 }) } as const;
    }
    return { app, decoded, profile } as const;
  } catch (error) {
    if (error instanceof Error && error.message === 'AUTH_REQUIRED') {
      return { response: Response.json({ error: 'Sign in with an administrator account.' }, { status: 401 }) } as const;
    }
    if (error instanceof Error && error.message === 'ACCOUNT_NOT_ACTIVE') {
      return { response: Response.json({ error: 'This account is not active.' }, { status: 403 }) } as const;
    }
    throw error;
  }
}

export function publicUserProfile(profile: DocumentData, uid: string) {
  return {
    uid,
    email: typeof profile.email === 'string' ? profile.email : '',
    displayName: typeof profile.displayName === 'string' ? profile.displayName : 'User',
    role: typeof profile.role === 'string' ? profile.role : null,
    requestedRole: typeof profile.requestedRole === 'string' ? profile.requestedRole : null,
    status: typeof profile.status === 'string' ? profile.status : 'pending',
    studentId: typeof profile.studentId === 'string' ? profile.studentId : null,
    teacherId: typeof profile.teacherId === 'string' ? profile.teacherId : null,
    createdAt: profile.createdAt && typeof profile.createdAt.toDate === 'function'
      ? profile.createdAt.toDate().toISOString()
      : typeof profile.createdAt === 'string' ? profile.createdAt : null,
  };
}
