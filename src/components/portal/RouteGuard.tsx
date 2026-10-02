'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export function RouteGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) {
      router.replace('/login');
    }
  }, [currentUser, router]);

  if (!currentUser) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-100">
        <div className="space-y-3 text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-aqua-500 border-t-transparent" />
          <p className="text-sm font-medium text-slate-300">Redirecting to the portal login…</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
