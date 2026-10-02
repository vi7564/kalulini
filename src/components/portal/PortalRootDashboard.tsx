'use client';

import { StudentDashboardPanel } from '@/components/portal/StudentDashboardPanel';
import { TeacherDashboardPanel } from '@/components/portal/TeacherDashboardPanel';
import { ParentDashboardPanel } from '@/components/portal/ParentDashboardPanel';
import { AdminDashboardPanel } from '@/components/portal/AdminDashboardPanel';
import type { DashboardRole } from '@/components/portal/PortalRoleShell';

export function PortalRootDashboard({ role }: { role: DashboardRole }) {
  if (role === 'STUDENT') return <StudentDashboardPanel />;
  if (role === 'TEACHER') return <TeacherDashboardPanel />;
  if (role === 'PARENT') return <ParentDashboardPanel />;
  if (role === 'ADMIN') return <AdminDashboardPanel />;
  return null;
}