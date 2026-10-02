import type { ReactNode } from 'react';
import { PortalRoleShell } from '@/components/portal/PortalRoleShell';

export default function AdminPortalLayout({ children }: { children: ReactNode }) {
  return <PortalRoleShell role="ADMIN">{children}</PortalRoleShell>;
}