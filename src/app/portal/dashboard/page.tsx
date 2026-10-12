'use client';

import { RouteGuard } from '@/components/portal/RouteGuard';
import { useAuth } from '@/context/AuthContext';
import { DashboardViews } from './DashboardViews';
import { getDashboardView } from './dashboard-view.mjs';

function RoleDashboard() {
  const { currentUser } = useAuth();
  return <DashboardViews view={getDashboardView(currentUser?.role)} />;
}

export default function PortalDashboardPage() {
  return (
    <RouteGuard>
      <RoleDashboard />
    </RouteGuard>
  );
}
