'use client';

import { useEffect, useState } from 'react';
import { Bell, Check, Lock, Mail, MoonStar, SunMedium } from 'lucide-react';
import { PortalLayout } from '@/components/portal/PortalLayout';
import { RouteGuard } from '@/components/portal/RouteGuard';
import { useNotification } from '@/context/NotificationContext';

export default function PortalSettingsPage() {
  const { showToast } = useNotification();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [notifications, setNotifications] = useState({
    attendance: true,
    fees: true,
    announcements: false,
    alerts: true
  });
  const [emailForm, setEmailForm] = useState({ email: 'student@kaluliniboys.ac.ke' });
  const [passwordForm, setPasswordForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });

  useEffect(() => {
    const stored = localStorage.getItem('kbhs-portal-theme');
    if (stored === 'dark' || stored === 'light') {
      setTheme(stored);
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    root.style.colorScheme = theme;
    localStorage.setItem('kbhs-portal-theme', theme);
  }, [theme]);

  const saveEmail = (event: React.FormEvent) => {
    event.preventDefault();
    showToast('success', 'Email updated', 'Your contact email has been updated successfully.');
  };

  const savePassword = (event: React.FormEvent) => {
    event.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      showToast('error', 'Password mismatch', 'The new password and confirmation do not match.');
      return;
    }
    showToast('success', 'Password updated', 'Your account password has been changed.');
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <RouteGuard>
      <PortalLayout title="Settings" subtitle="Manage your account preferences, security, and communication defaults.">
        <div className="grid gap-6 xl:grid-cols-2">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Appearance</p>
                <h2 className="mt-1 text-xl font-black text-slate-900 dark:text-white">Theme</h2>
              </div>
              <div className="flex rounded-xl border border-slate-200 bg-slate-100 p-1 dark:border-slate-700 dark:bg-slate-800">
                <button
                  type="button"
                  onClick={() => setTheme('light')}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold transition ${theme === 'light' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}
                >
                  <SunMedium className="h-3.5 w-3.5" /> Light
                </button>
                <button
                  type="button"
                  onClick={() => setTheme('dark')}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold transition ${theme === 'dark' ? 'bg-slate-900 text-white' : 'text-slate-500'}`}
                >
                  <MoonStar className="h-3.5 w-3.5" /> Dark
                </button>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/60">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">Portal theme</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Your preference is saved automatically for future visits.</p>
                </div>
                <span className="rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                  {theme === 'dark' ? 'Dark' : 'Light'} mode
                </span>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Notifications</p>
              <h2 className="mt-1 text-xl font-black text-slate-900 dark:text-white">Communication preferences</h2>
            </div>

            <div className="space-y-3">
              {Object.entries(notifications).map(([key, enabled]) => (
                <div key={key} className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800/60">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-aqua-100 text-aqua-700 dark:bg-aqua-900/30 dark:text-aqua-300">
                      <Bell className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-bold capitalize text-slate-900 dark:text-white">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Receive updates and alerts through your portal.</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    aria-label={`Toggle ${key}`}
                    onClick={() => toggleNotification(key as keyof typeof notifications)}
                    className={`relative h-7 w-12 rounded-full transition ${enabled ? 'bg-aqua-600' : 'bg-slate-300 dark:bg-slate-700'}`}
                  >
                    <span className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${enabled ? 'left-6' : 'left-1'}`} />
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-aqua-100 text-aqua-700 dark:bg-aqua-900/30 dark:text-aqua-300">
                <Mail className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Account</p>
                <h2 className="mt-1 text-xl font-black text-slate-900 dark:text-white">Email settings</h2>
              </div>
            </div>

            <form onSubmit={saveEmail} className="space-y-4">
              <label className="block space-y-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
                <span>Primary email</span>
                <input
                  type="email"
                  value={emailForm.email}
                  onChange={(event) => setEmailForm({ email: event.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition focus:border-aqua-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </label>

              <button type="submit" className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100">
                <Check className="h-4 w-4" /> Save email
              </button>
            </form>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300">
                <Lock className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Security</p>
                <h2 className="mt-1 text-xl font-black text-slate-900 dark:text-white">Password</h2>
              </div>
            </div>

            <form onSubmit={savePassword} className="space-y-4">
              <label className="block space-y-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
                <span>Current password</span>
                <input
                  type="password"
                  value={passwordForm.currentPassword}
                  onChange={(event) => setPasswordForm((prev) => ({ ...prev, currentPassword: event.target.value }))}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition focus:border-aqua-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </label>

              <label className="block space-y-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
                <span>New password</span>
                <input
                  type="password"
                  value={passwordForm.newPassword}
                  onChange={(event) => setPasswordForm((prev) => ({ ...prev, newPassword: event.target.value }))}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition focus:border-aqua-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </label>

              <label className="block space-y-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
                <span>Confirm password</span>
                <input
                  type="password"
                  value={passwordForm.confirmPassword}
                  onChange={(event) => setPasswordForm((prev) => ({ ...prev, confirmPassword: event.target.value }))}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition focus:border-aqua-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </label>

              <button type="submit" className="inline-flex items-center gap-2 rounded-xl bg-rose-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-rose-500">
                <Lock className="h-4 w-4" /> Update password
              </button>
            </form>
          </section>
        </div>
      </PortalLayout>
    </RouteGuard>
  );
}
