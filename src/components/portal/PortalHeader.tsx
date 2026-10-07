'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Search, Bell, Moon, SunMedium, ExternalLink, ShieldCheck } from 'lucide-react';

interface PortalHeaderProps {
  title: string;
  subtitle?: string;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export const PortalHeader: React.FC<PortalHeaderProps> = ({ title, subtitle, theme, onToggleTheme }) => {
  const { currentUser } = useAuth();

  return (
    <header className="border-b border-slate-200 bg-white/80 px-4 py-3 backdrop-blur-md sm:px-6 dark:border-slate-800 dark:bg-slate-950/80">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-aqua-600 dark:text-aqua-400">School dashboard</p>
          <h1 className="mt-1 text-xl font-black tracking-tight text-slate-900 dark:text-white md:text-2xl">{title}</h1>
          {subtitle && <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{subtitle}</p>}
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-slate-100 px-3 py-2 text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 sm:flex">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
            Academic Year 2026 • Term 1
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-100 px-2.5 py-2 text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
            <Search className="h-4 w-4" />
            <input
              aria-label="Search"
              placeholder="Quick search"
              className="w-28 bg-transparent text-xs text-slate-700 placeholder:text-slate-400 outline-none dark:text-slate-200"
            />
          </div>

          <button
            type="button"
            onClick={onToggleTheme}
            aria-label="Toggle dark mode"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-100 text-slate-700 transition hover:border-aqua-500 hover:text-aqua-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
          >
            {theme === 'dark' ? <SunMedium className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <button
            type="button"
            className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-100 text-slate-700 transition hover:border-aqua-500 hover:text-aqua-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-rose-500" />
          </button>

          <Link href="/" className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-aqua-500 hover:text-aqua-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 sm:flex">
            <ExternalLink className="h-3.5 w-3.5" /> Public site
          </Link>

          <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-100 px-2.5 py-2 dark:border-slate-700 dark:bg-slate-900">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-aqua-100 font-bold text-xs text-aqua-900 dark:bg-aqua-900/30 dark:text-aqua-300">
              {currentUser?.displayName?.charAt(0) || 'U'}
            </div>
            <div className="hidden text-left md:block">
              <p className="text-xs font-bold text-slate-900 dark:text-white">{currentUser?.displayName || 'User'}</p>
              <span className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-emerald-600 dark:text-emerald-400">
                <ShieldCheck className="h-3 w-3" /> {currentUser?.role || 'STUDENT'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
