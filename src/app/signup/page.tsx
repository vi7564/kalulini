'use client';

import React, { useState } from 'react';
import { createUserWithEmailAndPassword, deleteUser, signOut, updateProfile } from 'firebase/auth';
import { ArrowRight, GraduationCap, Lock, Mail, UserRound, Users, BookOpen, BriefcaseBusiness } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useNotification } from '@/context/NotificationContext';
import { auth, firebaseConfigured } from '@/lib/firebase';

type SignupRole = 'APPLICANT' | 'STUDENT' | 'PARENT' | 'TEACHER' | 'STAFF';

export default function SignupPage() {
  const router = useRouter();
  const { showToast } = useNotification();
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [requestedRole, setRequestedRole] = useState<SignupRole>('APPLICANT');
  const [loading, setLoading] = useState(false);

  const handleSignup = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!auth || !firebaseConfigured) {
      showToast('error', 'Signup unavailable', 'Firebase is not configured. Contact the school administrator.');
      return;
    }

    setLoading(true);
    let accountCreated = false;
    let registrationCommitted = false;
    try {
      const credential = await createUserWithEmailAndPassword(auth, email.trim(), password);
      accountCreated = true;
      await updateProfile(credential.user, { displayName: displayName.trim() });

      const token = await credential.user.getIdToken(true);
      const response = await fetch('/api/auth/register-request', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ displayName: displayName.trim(), requestedRole }),
      });
      const result = await response.json() as { error?: string };
      if (!response.ok) throw new Error(result.error || 'Unable to submit the access request.');
      registrationCommitted = true;
      try {
        await signOut(auth);
      } catch (signOutError) {
        console.error('The access request was saved, but the signup session could not be cleared.', signOutError);
      }
      showToast(
        'success',
        'Access request submitted',
        'Your account is pending administrator approval. You can sign in after the school activates it and assigns your role.',
      );
      router.replace('/login?reason=pending');
    } catch (error) {
      if (accountCreated && !registrationCommitted && auth?.currentUser) {
        try {
          await deleteUser(auth.currentUser);
          accountCreated = false;
        } catch (cleanupError) {
          console.error('Unable to clean up an incomplete signup account.', cleanupError);
        }
      }
      showToast(
        'error',
        accountCreated ? 'Registration incomplete' : 'Signup failed',
        error instanceof Error
          ? `${error.message}${accountCreated ? ' Your account was created; sign in again or contact the school administrator for help.' : ''}`
          : 'Please try again.',
      );
    } finally {
      setLoading(false);
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
          Secure portal registration
        </p>
      </div>

      <div className="relative z-10 mt-8 w-full px-4 sm:mx-auto sm:max-w-md sm:px-0">
        <div className="space-y-6 rounded-3xl border border-charcoal-700 bg-charcoal-900 px-6 py-8 shadow-2xl sm:px-10">
          <div className="text-center">
            <h2 className="text-lg font-bold text-white">Create your portal account</h2>
            <p className="mt-1 text-xs text-slate-400">
              Choose the portal you need. Student and parent access is enabled after the school verifies your details.
            </p>
          </div>

          <form onSubmit={handleSignup} className="space-y-4 text-xs">
            <fieldset>
              <legend className="mb-2 font-semibold text-slate-300">I am signing up as</legend>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                {([
                  { value: 'APPLICANT', label: 'Applicant', description: 'Admission application' },
                  { value: 'STUDENT', label: 'Student', description: 'Requires school verification' },
                  { value: 'PARENT', label: 'Parent / Guardian', description: 'Requires school verification' },
                  { value: 'TEACHER', label: 'Teacher', description: 'Requires staff verification' },
                  { value: 'STAFF', label: 'Other staff', description: 'Requires school verification' },
                ] as const).map((option) => (
                  <label
                    key={option.value}
                    className={`flex cursor-pointer items-start gap-2 rounded-xl border p-3 transition ${
                      requestedRole === option.value
                        ? 'border-aqua-500 bg-aqua-950/40'
                        : 'border-charcoal-700 bg-charcoal-800 hover:border-charcoal-500'
                    }`}
                  >
                    <input
                      type="radio"
                      name="requestedRole"
                      value={option.value}
                      checked={requestedRole === option.value}
                      onChange={() => setRequestedRole(option.value)}
                      className="mt-0.5 accent-cyan-500"
                    />
                    <span>
                      <span className="flex items-center gap-1.5 font-semibold text-white">
                        {option.value === 'PARENT' ? <Users className="h-3.5 w-3.5" /> : null}
                        {option.value === 'TEACHER' ? <BookOpen className="h-3.5 w-3.5" /> : null}
                        {option.value === 'STAFF' ? <BriefcaseBusiness className="h-3.5 w-3.5" /> : null}
                        {option.label}
                      </span>
                      <span className="mt-1 block text-[10px] text-slate-400">{option.description}</span>
                    </span>
                  </label>
                ))}
              </div>
              <p className="mt-2 text-[11px] leading-relaxed text-amber-200">
                All requests remain pending until an administrator verifies your details, approves your account, and assigns your portal role.
              </p>
            </fieldset>

            <div>
              <label htmlFor="displayName" className="mb-1 block font-semibold text-slate-300">Full name</label>
              <div className="relative">
                <UserRound className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                <input
                  id="displayName"
                  type="text"
                  autoComplete="name"
                  minLength={2}
                  maxLength={100}
                  required
                  value={displayName}
                  onChange={(event) => setDisplayName(event.target.value)}
                  className="w-full rounded-xl border border-charcoal-700 bg-charcoal-800 py-2.5 pl-10 pr-4 text-white placeholder-slate-500 focus:border-aqua-500 focus:outline-none"
                  placeholder="Your full name"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="mb-1 block font-semibold text-slate-300">Email address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full rounded-xl border border-charcoal-700 bg-charcoal-800 py-2.5 pl-10 pr-4 text-white placeholder-slate-500 focus:border-aqua-500 focus:outline-none"
                  placeholder="you@example.com"
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
                  autoComplete="new-password"
                  minLength={6}
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full rounded-xl border border-charcoal-700 bg-charcoal-800 py-2.5 pl-10 pr-4 text-white placeholder-slate-500 focus:border-aqua-500 focus:outline-none"
                  placeholder="At least 6 characters"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-aqua-600 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-institution transition-all hover:bg-aqua-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Creating account...' : 'Create applicant account'}
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <p className="border-t border-charcoal-700 pt-4 text-center text-xs text-slate-400">
            Already registered?{' '}
            <Link href="/login" className="font-semibold text-aqua-400 hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
