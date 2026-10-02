import type { ReactNode } from 'react';
import { PortalRoleShell } from '@/components/portal/PortalRoleShell';

export default function TeacherPortalLayout({ children }: { children: ReactNode }) {
  return <PortalRoleShell role="TEACHER">{children}</PortalRoleShell>;
}