'use client';

import { useMemo, useState } from 'react';
import { Camera, Save, UserRound } from 'lucide-react';
import { PortalLayout } from '@/components/portal/PortalLayout';
import { RouteGuard } from '@/components/portal/RouteGuard';
import { useAuth } from '@/context/AuthContext';
import { useNotification } from '@/context/NotificationContext';

export default function PortalProfilePage() {
  const { currentUser, updateCurrentProfile } = useAuth();
  const { showToast } = useNotification();

  const [form, setForm] = useState({
    displayName: currentUser?.displayName || 'Student Name',
    email: currentUser?.email || 'student@kaluliniboys.ac.ke',
    phoneNumber: currentUser?.phoneNumber || '+254 712 345 678',
    role: currentUser?.role || 'STUDENT',
    bio: 'Dedicated scholar with a strong interest in science, leadership and community service.'
  });

  const initials = useMemo(() => {
    return (form.displayName || 'User')
      .split(' ')
      .map((part) => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  }, [form.displayName]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    updateCurrentProfile({
      displayName: form.displayName,
      email: form.email,
      phoneNumber: form.phoneNumber,
      role: form.role as any,
      updatedAt: new Date().toISOString()
    });
    showToast('success', 'Profile saved', 'Your portal profile was updated successfully.');
  };

  return (
    <RouteGuard>
      <PortalLayout title="Profile & identity" subtitle="Maintain your contact details, portal identity, and school profile information.">
        <form onSubmit={handleSubmit} className="grid gap-6 xl:grid-cols-[380px,1fr]">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-black text-slate-900 dark:text-white">Photo & summary</h2>
              <button type="button" className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
                <Camera className="h-3.5 w-3.5" /> Upload
              </button>
            </div>

            <div className="mt-6 flex flex-col items-center text-center">
              <div className="relative flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-4 border-aqua-200 bg-gradient-to-br from-aqua-100 to-sky-200 text-3xl font-black text-aqua-900 dark:border-aqua-900/50 dark:from-slate-800 dark:to-slate-700 dark:text-aqua-200">
                {currentUser?.photoURL ? <img src={currentUser.photoURL} alt={form.displayName} className="h-full w-full object-cover" /> : initials}
              </div>

              <div className="mt-4 space-y-1">
                <p className="text-xl font-black text-slate-900 dark:text-white">{form.displayName}</p>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-aqua-600 dark:text-aqua-400">{form.role}</p>
              </div>

              <div className="mt-5 w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-left dark:border-slate-700 dark:bg-slate-800/70">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-800 dark:text-slate-100">
                  <UserRound className="h-4 w-4 text-aqua-600 dark:text-aqua-400" />
                  Profile completion
                </div>
                <div className="mt-3 h-2.5 rounded-full bg-slate-200 dark:bg-slate-700">
                  <div className="h-2.5 w-[82%] rounded-full bg-gradient-to-r from-aqua-500 to-emerald-500" />
                </div>
                <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">82% complete — missing emergency contact and academic focus note.</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-lg font-black text-slate-900 dark:text-white">Personal details</h2>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <label className="space-y-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
                <span>Full name</span>
                <input
                  value={form.displayName}
                  onChange={(event) => setForm((prev) => ({ ...prev, displayName: event.target.value }))}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-aqua-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </label>

              <label className="space-y-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
                <span>Role</span>
                <select
                  value={form.role}
                  onChange={(event) => setForm((prev) => ({ ...prev, role: event.target.value }))}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-aqua-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                >
                  <option value="STUDENT">Student</option>
                  <option value="TEACHER">Teacher</option>
                  <option value="PARENT">Parent</option>
                  <option value="ADMIN">Administrator</option>
                </select>
              </label>

              <label className="space-y-2 text-sm font-semibold text-slate-700 dark:text-slate-200 md:col-span-2">
                <span>Email address</span>
                <input
                  type="email"
                  value={form.email}
                  onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-aqua-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </label>

              <label className="space-y-2 text-sm font-semibold text-slate-700 dark:text-slate-200 md:col-span-2">
                <span>Phone number</span>
                <input
                  value={form.phoneNumber}
                  onChange={(event) => setForm((prev) => ({ ...prev, phoneNumber: event.target.value }))}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-aqua-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </label>

              <label className="space-y-2 text-sm font-semibold text-slate-700 dark:text-slate-200 md:col-span-2">
                <span>Bio</span>
                <textarea
                  rows={5}
                  value={form.bio}
                  onChange={(event) => setForm((prev) => ({ ...prev, bio: event.target.value }))}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-aqua-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </label>
            </div>

            <div className="mt-6 flex justify-end">
              <button type="submit" className="inline-flex items-center gap-2 rounded-xl bg-aqua-600 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-aqua-900/20 transition hover:bg-aqua-500">
                <Save className="h-4 w-4" /> Save changes
              </button>
            </div>
          </div>
        </form>
      </PortalLayout>
    </RouteGuard>
  );
}
