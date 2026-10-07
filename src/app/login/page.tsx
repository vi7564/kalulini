'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { GraduationCap, Lock, Mail, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useNotification } from '@/context/NotificationContext';
import type { UserRole } from '@/types';

function portalForRole(role: UserRole) {
  if (role === 'ADMIN' || role === 'SUPER_ADMIN' || role === 'PRINCIPAL') return '/portal/admin';
  if (role === 'TEACHER') return '/portal/teacher';
  if (role === 'PARENT') return '/portal/parent';
  if (role === 'APPLICANT') return '/portal/applicant';
  return '/portal/student';
}

export default function LoginPage() {
  const router = useRouter();
  const { loginWithEmail, loading } = useAuth();
  const { showToast } = useNotification();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const role = await loginWithEmail(email, password);
      showToast('success', 'Signed in', 'Welcome to the Kalulini school portal.');
      const requestedPath = new URLSearchParams(window.location.search).get('next');
      if (role === 'APPLICANT' && requestedPath === '/admissions/apply') {
        router.replace(requestedPath);
        return;
      }
      router.push(portalForRole(role));
    } catch (error) {
      showToast(
        'error',
        'Sign-in failed',
        error instanceof Error ? error.message : 'Unable to sign in. Please try again.',
      );
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-slate-900 py-12 text-slate-100 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute right-1/4 top-0 h-96 w-96 rounded-full bg-aqua-600/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-10 h-96 w-96 rounded-full bg-gold-500/10 blur-3xl" />

      <div className="relative z-10 mx-auto w-full max-w-md px-4 text-center sm:px-0">
        <Link href="/" className="mb-4 inline-flex items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-gold-400 bg-gradient-to-br from-aqua-600 via-aqua-700 to-charcoal-900 text-white shadow-institution">
            <GraduationCap className="h-8 w-8 text-gold-300" />
          </div>
        </Link>
        <h1 className="font-display text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
          KALULINI BOYS HIGH SCHOOL
        </h1>
        <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-gold-400">
          Unified Institutional Portal Access
        </p>
      </div>

      <div className="relative z-10 mt-8 w-full px-4 sm:mx-auto sm:max-w-md sm:px-0">
        <div className="space-y-6 rounded-3xl border border-charcoal-700 bg-charcoal-900 px-6 py-8 shadow-2xl sm:px-10">
          <div className="text-center">
            <h2 className="text-lg font-bold text-white">Sign in to your portal</h2>
            <p className="mt-1 text-xs text-slate-400">
              Your school role and access are verified securely by Firebase.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div>
              <label htmlFor="email" className="mb-1 block font-semibold text-slate-300">Email address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                <input
                  id="email"
                  type="email"
                  autoComplete="username"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full rounded-xl border border-charcoal-700 bg-charcoal-800 py-2.5 pl-10 pr-4 text-white placeholder-slate-500 focus:border-aqua-500 focus:outline-none"
                  placeholder="name@kaluliniboys.ac.ke"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="mb-1 block font-semibold text-slate-300">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full rounded-xl border border-charcoal-700 bg-charcoal-800 py-2.5 pl-10 pr-4 text-white placeholder-slate-500 focus:border-aqua-500 focus:outline-none"
                  placeholder="Your password"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-aqua-600 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-institution transition-all hover:bg-aqua-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Authenticating...' : 'Sign In to Portal'}
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <p className="border-t border-charcoal-700 pt-4 text-center text-xs text-slate-400">
            New applicant?{' '}
            <Link href="/signup" className="font-semibold text-aqua-400 hover:underline">
              Create an account
            </Link>
            . Staff and student accounts are created by the school administrator.
          </p>
          <div className="text-center text-xs">
            <Link href="/" className="font-medium text-slate-300 hover:text-white">
              &larr; Return to Kalulini Public Website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
