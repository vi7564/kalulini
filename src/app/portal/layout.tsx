import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portal | Kalulini Boys High School',
  description: 'School management portal for students, parents, teachers and administrators.',
};

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return children;
}
