import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getAuth } from 'firebase-admin/auth';
import { getFirebaseAdminApp, requireActiveProfile } from '@/lib/firebase-admin';

export const metadata: Metadata = {
  title: 'Portal | Kalulini Boys High School',
  description: 'School management portal for students, parents, teachers and administrators.',
};

export const dynamic = 'force-dynamic';

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const sessionCookie = cookies().get('__session')?.value;
  if (!sessionCookie) redirect('/login?reason=inactive');

  try {
    const app = getFirebaseAdminApp();
    const decoded = await getAuth(app).verifySessionCookie(sessionCookie, true);
    await requireActiveProfile(app, decoded);
  } catch (error) {
    console.error('Portal page authorization failed.', error);
    redirect('/login?reason=inactive');
  }
  return children;
}
