import type { ReactNode } from 'react';
import { PortalRoleShell } from '@/components/portal/PortalRoleShell';

export default function StudentPortalLayout({ children }: { children: ReactNode }) {
  return <PortalRoleShell role="STUDENT">{children}</PortalRoleShell>;
}