'use client';

import React, { useEffect, useState } from 'react';
import { PortalSidebar } from './PortalSidebar';
import { PortalHeader } from './PortalHeader';

interface PortalLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export const PortalLayout: React.FC<PortalLayoutProps> = ({ children, title, subtitle }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('kbhs-portal-theme');
    if (savedTheme === 'dark' || savedTheme === 'light') {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.style.colorScheme = theme;
    localStorage.setItem('kbhs-portal-theme', theme);
  }, [theme]);

  useEffect(() => {
    const collapsedState = localStorage.getItem('kbhs-portal-sidebar');
    if (collapsedState === 'true') setCollapsed(true);
  }, []);

  useEffect(() => {
    localStorage.setItem('kbhs-portal-sidebar', String(collapsed));
  }, [collapsed]);

  return (
    <div className={`min-h-screen bg-slate-100 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100`}>
      <div className="flex h-screen overflow-hidden">
        <PortalSidebar collapsed={collapsed} onToggle={() => setCollapsed((prev) => !prev)} />
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <PortalHeader title={title} subtitle={subtitle} theme={theme} onToggleTheme={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))} />
          <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
            <div className="mx-auto w-full max-w-7xl space-y-6">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
};
