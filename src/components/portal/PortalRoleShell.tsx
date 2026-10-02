'use client';

import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Activity,
  Bell,
  BookOpen,
  ClipboardCheck,
  ClipboardList,
  CreditCard,
  FileCheck2,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  Search,
  Settings,
  ShieldCheck,
  Users,
  X,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { PORTAL_SEARCH_ITEMS, type PortalSearchItem } from '../../../data/portalDashboards';
import type { UserRole } from '@/types';
import { PortalHeader } from './PortalHeader';
import { PortalRootDashboard } from './PortalRootDashboard';

export type DashboardRole = Extract<UserRole, 'STUDENT' | 'TEACHER' | 'PARENT' | 'ADMIN'>;

interface PortalRoleContextValue {
  role: DashboardRole;
  homePath: string;
  openSearch: () => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const PortalRoleContext = createContext<PortalRoleContextValue | null>(null);

export function usePortalRoleContext() {
  return useContext(PortalRoleContext);
}

const roleDetails: Record<DashboardRole, { label: string; homePath: string; shortName: string }> = {
  STUDENT: { label: 'Student Portal', homePath: '/portal/student', shortName: 'Student' },
  TEACHER: { label: 'Teacher Portal', homePath: '/portal/teacher', shortName: 'Teacher' },
  PARENT: { label: 'Parent Portal', homePath: '/portal/parent', shortName: 'Parent' },
  ADMIN: { label: 'Admin Console', homePath: '/portal/admin', shortName: 'Admin' },
};

const roleLinks: Record<DashboardRole, { label: string; href: string; icon: React.ElementType }[]> = {
  STUDENT: [
    { label: 'Dashboard', href: '/portal/student', icon: LayoutDashboard },
    { label: 'Grades', href: '/portal/student/grades', icon: BookOpen },
    { label: 'Attendance', href: '/portal/student/attendance', icon: ClipboardCheck },
    { label: 'Messages', href: '/portal/student/messages', icon: MessageSquare },
    { label: 'Fees', href: '/portal/student/fees', icon: CreditCard },
    { label: 'Assignments', href: '/portal/student/assignments', icon: ClipboardList },
    { label: 'Results', href: '/portal/student/results', icon: FileCheck2 },
    { label: 'Settings', href: '/portal/settings', icon: Settings },
  ],
  TEACHER: [
    { label: 'Dashboard', href: '/portal/teacher', icon: LayoutDashboard },
    { label: 'Class Register', href: '/portal/teacher/attendance', icon: ClipboardCheck },
    { label: 'Gradebook', href: '/portal/teacher/grading', icon: BookOpen },
    { label: 'Assignments', href: '/portal/teacher/assignments', icon: ClipboardList },
    { label: 'Messages', href: '/portal/student/messages', icon: MessageSquare },
    { label: 'Settings', href: '/portal/settings', icon: Settings },
  ],
  PARENT: [
    { label: 'Dashboard', href: '/portal/parent', icon: LayoutDashboard },
    { label: 'Academic reports', href: '/portal/student/results', icon: BookOpen },
    { label: 'Attendance', href: '/portal/student/attendance', icon: ClipboardCheck },
    { label: 'Fees', href: '/portal/student/fees', icon: CreditCard },
    { label: 'Messages', href: '/portal/student/messages', icon: MessageSquare },
    { label: 'Settings', href: '/portal/settings', icon: Settings },
  ],
  ADMIN: [
    { label: 'Dashboard', href: '/portal/admin', icon: LayoutDashboard },
    { label: 'Students', href: '/portal/admin/students', icon: Users },
    { label: 'Staff', href: '/portal/admin/teachers', icon: GraduationCap },
    { label: 'Admissions', href: '/portal/admin/admissions', icon: FileCheck2 },
    { label: 'Fees & finance', href: '/portal/admin/fees', icon: CreditCard },
    { label: 'Academics', href: '/portal/admin/academics', icon: BookOpen },
    { label: 'Announcements', href: '/portal/admin/announcements', icon: Bell },
    { label: 'Audit logs', href: '/portal/admin/audit-logs', icon: Activity },
    { label: 'Settings', href: '/portal/settings', icon: Settings },
  ],
};

export function PortalRoleShell({ role, children }: { role: DashboardRole; children: React.ReactNode }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const pathname = usePathname();

  useEffect(() => {
    const savedTheme = localStorage.getItem('kbhs-portal-theme');
    if (savedTheme === 'dark' || savedTheme === 'light') setTheme(savedTheme);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.style.colorScheme = theme;
    localStorage.setItem('kbhs-portal-theme', theme);
  }, [theme]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const contextValue = useMemo(() => ({
    role,
    homePath: roleDetails[role].homePath,
    openSearch: () => setSearchOpen(true),
    theme,
    toggleTheme: () => setTheme((previous) => (previous === 'dark' ? 'light' : 'dark')),
  }), [role, theme]);

  return (
    <PortalRoleContext.Provider value={contextValue}>
      <div className="flex h-dvh min-h-screen overflow-hidden bg-slate-100 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
        <aside className="hidden h-full w-64 shrink-0 flex-col border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 md:flex">
          <RoleBrand role={role} />
          <RoleIdentity role={role} />
          <RoleNavigation role={role} />
          <RoleSignOut />
        </aside>
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          {pathname === contextValue.homePath ? (
            <>
              <PortalHeader
                title={`${roleDetails[role].shortName} dashboard`}
                subtitle="Academic Year 2026 · Term 1"
                theme={theme}
                onToggleTheme={contextValue.toggleTheme}
                onOpenCommand={contextValue.openSearch}
              />
              <main className="min-h-0 flex-1 overflow-y-auto p-4 pb-24 md:p-6 md:pb-6 lg:p-8">
                <div className="mx-auto w-full max-w-7xl space-y-6"><PortalRootDashboard role={role} /></div>
              </main>
            </>
          ) : children}
        </div>
        <MobileRoleNavigation role={role} isOpen={mobileOpen} onToggle={() => setMobileOpen((value) => !value)} onNavigate={() => setMobileOpen(false)} />
      </div>
      <PortalCommandPalette open={searchOpen} onClose={() => setSearchOpen(false)} />
    </PortalRoleContext.Provider>
  );
}

function RoleBrand({ role }: { role: DashboardRole }) {
  return (
    <div className="flex items-center gap-3 border-b border-slate-200 px-5 py-5 dark:border-slate-800">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-charcoal-900 text-white">
        <GraduationCap className="h-5 w-5 text-gold-400" />
      </div>
      <div className="min-w-0">
        <p className="truncate text-xs font-black uppercase tracking-[0.15em] text-charcoal-900 dark:text-white">Kalulini Boys</p>
        <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-aqua-700 dark:text-aqua-300">{roleDetails[role].label}</p>
      </div>
    </div>
  );
}

function RoleIdentity({ role }: { role: DashboardRole }) {
  const { currentUser } = useAuth();
  return (
    <div className="mx-3 mt-4 flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800/70">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-aqua-100 text-sm font-bold text-aqua-900 dark:bg-aqua-900/40 dark:text-aqua-200">
        {currentUser?.photoURL
          ? <img src={currentUser.photoURL} alt="" className="h-full w-full object-cover" />
          : currentUser?.displayName?.charAt(0) || roleDetails[role].shortName.charAt(0)}
      </div>
      <div className="min-w-0">
        <p className="truncate text-xs font-bold text-slate-900 dark:text-white">{currentUser?.displayName || roleDetails[role].shortName}</p>
        <p className="truncate text-[10px] text-slate-600 dark:text-slate-300">{roleDetails[role].shortName} workspace</p>
      </div>
    </div>
  );
}

function RoleNavigation({ role, onNavigate }: { role: DashboardRole; onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <nav aria-label={`${roleDetails[role].shortName} portal`} className="min-h-0 flex-1 space-y-1 overflow-y-auto px-3 py-5">
      {roleLinks[role].map(({ label, href, icon: Icon }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            aria-current={active ? 'page' : undefined}
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aqua-600 ${active ? 'bg-aqua-700 text-white' : 'text-slate-700 hover:bg-slate-100 hover:text-charcoal-900 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-white'}`}
          >
            <Icon className={`h-4 w-4 shrink-0 ${active ? 'text-white' : 'text-aqua-700 dark:text-aqua-300'}`} />
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

function RoleSignOut() {
  const { logout } = useAuth();
  const router = useRouter();
  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };
  return (
    <div className="border-t border-slate-200 p-3 dark:border-slate-800">
      <button type="button" onClick={handleLogout} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-600 transition-colors hover:bg-rose-50 hover:text-rose-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-rose-600 dark:text-slate-300 dark:hover:bg-rose-950/40 dark:hover:text-rose-200">
        <LogOut className="h-4 w-4" /> Log out
      </button>
      <Link href="/" className="mt-1 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-100 hover:text-charcoal-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white">
        <GraduationCap className="h-4 w-4" /> Public website
      </Link>
    </div>
  );
}

function MobileRoleNavigation({ role, isOpen, onToggle, onNavigate }: { role: DashboardRole; isOpen: boolean; onToggle: () => void; onNavigate: () => void }) {
  const links = roleLinks[role];
  const { logout } = useAuth();
  const router = useRouter();

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_24px_rgba(15,23,42,0.08)] backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/95 md:hidden">
      {isOpen && (
        <div className="max-h-[55dvh] overflow-y-auto border-b border-slate-200 p-3 dark:border-slate-800">
          <RoleBrand role={role} />
          <RoleIdentity role={role} />
          <div className="mt-3 grid grid-cols-2 gap-2">
            {links.map(({ label, href, icon: Icon }) => (
              <Link key={href} href={href} onClick={onNavigate} className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2.5 text-xs font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-200">
                <Icon className="h-4 w-4 text-aqua-700 dark:text-aqua-300" /> {label}
              </Link>
            ))}
            <button type="button" onClick={async () => { await logout(); router.push('/login'); }} className="flex items-center gap-2 rounded-lg border border-rose-200 px-3 py-2.5 text-xs font-semibold text-rose-700 dark:border-rose-900 dark:text-rose-300">
              <LogOut className="h-4 w-4" /> Log out
            </button>
          </div>
        </div>
      )}
      <nav aria-label="Quick portal navigation" className="grid h-16 grid-cols-4 items-center px-2">
        {links.slice(0, 3).map(({ label, href, icon: Icon }) => (
          <Link key={href} href={href} className="flex flex-col items-center justify-center gap-1 py-2 text-[10px] font-semibold text-slate-600 dark:text-slate-300">
            <Icon className="h-4 w-4 text-aqua-700 dark:text-aqua-300" /> {label}
          </Link>
        ))}
        <button type="button" onClick={onToggle} aria-expanded={isOpen} aria-label={isOpen ? 'Close portal menu' : 'Open portal menu'} className="flex flex-col items-center justify-center gap-1 py-2 text-[10px] font-semibold text-slate-600 dark:text-slate-300">
          {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4 text-aqua-700 dark:text-aqua-300" />} Menu
        </button>
      </nav>
    </div>
  );
}

function PortalCommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const results = useMemo(() => {
    const term = query.trim().toLowerCase();
    return term
      ? PORTAL_SEARCH_ITEMS.filter((item) => `${item.label} ${item.category}`.toLowerCase().includes(term))
      : PORTAL_SEARCH_ITEMS.slice(0, 6);
  }, [query]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
    else setQuery('');
  }, [open]);

  if (!open) return null;

  const trapFocus = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      onClose();
      return;
    }
    if (event.key !== 'Tab') return;
    const focusable = event.currentTarget.querySelectorAll<HTMLElement>('input, a[href], button:not([disabled])');
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center bg-charcoal-950/70 p-4 pt-[12vh] backdrop-blur-sm" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div role="dialog" aria-modal="true" aria-label="Search portal" onKeyDown={trapFocus} className="w-full max-w-xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900">
        <div className="flex items-center gap-3 border-b border-slate-200 px-4 dark:border-slate-700">
          <Search className="h-5 w-5 text-aqua-700 dark:text-aqua-300" />
          <input ref={inputRef} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search students, classes, or pages" className="h-14 min-w-0 flex-1 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-500 dark:text-white" />
          <kbd className="rounded border border-slate-300 px-1.5 py-1 text-[10px] text-slate-500 dark:border-slate-600 dark:text-slate-300">ESC</kbd>
        </div>
        <div className="max-h-[55vh] overflow-y-auto p-2">
          {results.length ? results.map((item: PortalSearchItem) => (
            <Link key={`${item.label}-${item.href}`} href={item.href} onClick={onClose} className="flex items-center justify-between gap-4 rounded-xl px-3 py-3 text-left hover:bg-aqua-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-aqua-700 dark:hover:bg-slate-800">
              <span className="text-sm font-semibold text-slate-900 dark:text-white">{item.label}</span>
              <span className="text-xs text-slate-600 dark:text-slate-300">{item.category}</span>
            </Link>
          )) : <p className="px-3 py-8 text-center text-sm text-slate-600 dark:text-slate-300">No matching portal results.</p>}
        </div>
      </div>
    </div>
  );
}