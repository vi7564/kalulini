import type { ReactNode } from 'react';
import { PortalRoleShell } from '@/components/portal/PortalRoleShell';

export default function ParentPortalLayout({ children }: { children: ReactNode }) {
  return <PortalRoleShell role="PARENT">{children}</PortalRoleShell>;
}