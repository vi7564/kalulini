'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useNotification } from '@/context/NotificationContext';
import { UserRole } from '@/types';
import {
  GraduationCap,
  ShieldCheck,
  Lock,
  Mail,
  ArrowRight,
  UserCheck,
  Users,
  Compass,
  FileCheck
} from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const { loginAsRole, loginWithEmail, loading } = useAuth();
  const { showToast } = useNotification();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('ADMIN');

  const redirectByRole = (role: UserRole) => {
    if (role === 'ADMIN' || role === 'SUPER_ADMIN') router.push('/portal/admin');
    else if (role === 'TEACHER') router.push('/portal/teacher');
    else if (role === 'PARENT') router.push('/portal/parent');
    else if (role === 'APPLICANT') router.push('/portal/applicant');
    else router.push('/portal/student');
  };

  const handleManualLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    try {
      await loginWithEmail(email, password || 'password123');
      showToast('success', 'Authentication Successful', `Welcome back to Kalulini SMS`);
      redirectByRole(selectedRole);
    } catch {
      showToast('error', 'Login Error', 'Invalid credentials.');
    }
  };

  const handleInstantRole = (role: UserRole) => {
    loginAsRole(role);
    showToast('info', 'Logged In as Demo Profile', `Switched to ${role} session`);
    redirectByRole(role);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden text-slate-100">
      {/* Background Ambience */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-aqua-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 text-center">
        <Link href="/" className="inline-flex items-center gap-3 mb-4 group">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-aqua-600 via-aqua-700 to-charcoal-900 flex items-center justify-center text-white shadow-institution border-2 border-gold-400 group-hover:scale-105 transition-transform">
            <GraduationCap className="w-8 h-8 text-gold-300" />
          </div>
        </Link>
        <h2 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-white">
          KALULINI BOYS HIGH SCHOOL
        </h2>
        <p className="mt-1 text-xs uppercase tracking-widest text-gold-400 font-semibold">
          Unified Institutional Portal Access
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl relative z-10 px-4">
        <div className="bg-charcoal-900 py-8 px-6 sm:px-10 shadow-2xl rounded-3xl border border-charcoal-700 space-y-6">
          {/* Instant Quick Demo Switcher (Per requirements, all roles testable instantly!) */}
          <div className="bg-charcoal-950/60 p-4 rounded-2xl border border-charcoal-700">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gold-400 block mb-2 text-center">
              Quick Role Switcher &bull; Instant Access
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleInstantRole('ADMIN')}
                className="p-2.5 rounded-xl bg-charcoal-800 hover:bg-aqua-600/30 border border-charcoal-600 hover:border-aqua-500 text-left transition-all group"
              >
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-aqua-400" />
                  <span className="text-xs font-bold text-white group-hover:text-aqua-300">Admin</span>
                </div>
                <span className="text-[10px] text-slate-400 block mt-0.5">Principal / Deputy</span>
              </button>

              <button
                type="button"
                onClick={() => handleInstantRole('TEACHER')}
                className="p-2.5 rounded-xl bg-charcoal-800 hover:bg-emerald-600/30 border border-charcoal-600 hover:border-emerald-500 text-left transition-all group"
              >
                <div className="flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold text-white group-hover:text-emerald-300">Teacher</span>
                </div>
                <span className="text-[10px] text-slate-400 block mt-0.5">Mr. Musyoka</span>
              </button>

              <button
                type="button"
                onClick={() => handleInstantRole('STUDENT')}
                className="p-2.5 rounded-xl bg-charcoal-800 hover:bg-blue-600/30 border border-charcoal-600 hover:border-blue-500 text-left transition-all group"
              >
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-blue-400" />
                  <span className="text-xs font-bold text-white group-hover:text-blue-300">Student</span>
                </div>
                <span className="text-[10px] text-slate-400 block mt-0.5">Brian Mutua (F3)</span>
              </button>

              <button
                type="button"
                onClick={() => handleInstantRole('PARENT')}
                className="p-2.5 rounded-xl bg-charcoal-800 hover:bg-purple-600/30 border border-charcoal-600 hover:border-purple-500 text-left transition-all group"
              >
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-purple-400" />
                  <span className="text-xs font-bold text-white group-hover:text-purple-300">Parent</span>
                </div>
                <span className="text-[10px] text-slate-400 block mt-0.5">Mr. Joseph Kyalo</span>
              </button>

              <button
                type="button"
                onClick={() => handleInstantRole('APPLICANT')}
                className="p-2.5 rounded-xl bg-charcoal-800 hover:bg-amber-600/30 border border-charcoal-600 hover:border-amber-500 text-left transition-all group"
              >
                <div className="flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-gold-400" />
                  <span className="text-xs font-bold text-white group-hover:text-gold-300">Applicant</span>
                </div>
                <span className="text-[10px] text-slate-400 block mt-0.5">Collins Mutiso</span>
              </button>

              <Link
                href="/admissions/apply"
                className="p-2.5 rounded-xl bg-charcoal-800 hover:bg-aqua-600/30 border border-charcoal-600 hover:border-aqua-500 text-left transition-all group flex flex-col justify-center"
              >
                <span className="text-xs font-bold text-gold-400 group-hover:text-gold-300">Apply Form 1 &rarr;</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">Start application</span>
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-charcoal-700" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-charcoal-900 px-3 text-slate-400 font-semibold">Or Sign In with Credentials</span>
            </div>
          </div>

          {/* Standard Authentication Form */}
          <form onSubmit={handleManualLogin} className="space-y-4 text-xs">
            <div>
              <label className="font-semibold text-slate-300 block mb-1">Target Portal Access Role</label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value as UserRole)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-charcoal-800 border border-charcoal-700 text-white focus:outline-none focus:border-aqua-500 font-medium"
              >
                <option value="ADMIN">Administrator Portal (Principal / BOM / Bursar)</option>
                <option value="TEACHER">Teacher Portal (Academic Staff)</option>
                <option value="STUDENT">Student Portal (Learner Portal)</option>
                <option value="PARENT">Parent Portal (Guardian Portal)</option>
                <option value="APPLICANT">Applicant Portal (Admissions Tracking)</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-300 block mb-1">Email Address / Admission No / Staff ID</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  placeholder="e.g. admin@kaluliniboys.ac.ke or KBHS/4201"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-charcoal-800 border border-charcoal-700 text-white placeholder-slate-500 focus:outline-none focus:border-aqua-500"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-semibold text-slate-300">Password</label>
                <a href="#" onClick={(e) => { e.preventDefault(); alert("Please contact the school ICT administrator or your class teacher for credential recovery."); }} className="text-aqua-400 hover:underline">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-charcoal-800 border border-charcoal-700 text-white placeholder-slate-500 focus:outline-none focus:border-aqua-500"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-aqua-600 hover:bg-aqua-700 text-white font-bold text-xs uppercase tracking-wider shadow-institution transition-all flex items-center justify-center gap-2"
              >
                {loading ? 'Authenticating...' : 'Sign In to Portal'} <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          <div className="text-center text-xs text-slate-400 pt-2 border-t border-charcoal-700">
            <Link href="/" className="text-slate-300 hover:text-white font-medium">
              &larr; Return to Kalulini Public Website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
