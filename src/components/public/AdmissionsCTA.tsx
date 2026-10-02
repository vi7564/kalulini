'use client';

import React from 'react';
import Link from 'next/link';
import { GraduationCap, ArrowRight, CheckCircle2, ShieldCheck, PhoneCall } from 'lucide-react';

export const AdmissionsCTA: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-charcoal-950 via-charcoal-900 to-aqua-950 text-white relative overflow-hidden">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-aqua-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-charcoal-900/90 border border-aqua-500/30 rounded-3xl p-8 sm:p-14 shadow-2xl backdrop-blur-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-8 space-y-5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-400/20 text-gold-300 text-xs font-bold uppercase tracking-wider border border-gold-400/30">
                <GraduationCap className="w-4 h-4" /> 2026 Academic Year Admissions
              </span>

              <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-white leading-tight">
                Secure Your Son&apos;s Academic & Moral Future at Kalulini Boys
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl font-normal">
                Admissions for Form 1 and limited transfer vacancies for Form 2 & Form 3 are currently open. Parents can submit their application online, upload birth certificate and result slips, and track their admission decision in real-time.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />
                  <span>Instant Application Ref</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-aqua-400 shrink-0" />
                  <span>MOE Approved Fees</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Comprehensive Boarding</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3">
              <Link
                href="/admissions/apply"
                className="w-full py-4 px-6 rounded-xl bg-gold-400 hover:bg-gold-500 text-charcoal-950 font-extrabold text-sm text-center shadow-lg transition-all hover:scale-105 flex items-center justify-center gap-2"
              >
                Start Online Application <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/admissions"
                className="w-full py-3.5 px-6 rounded-xl bg-charcoal-800 hover:bg-charcoal-700 text-white font-semibold text-xs text-center border border-charcoal-600 transition-colors"
              >
                Review Requirements & Fee Structure
              </Link>

              <div className="mt-2 flex items-center justify-center gap-2 text-xs text-slate-400">
                <PhoneCall className="w-3.5 h-3.5 text-aqua-400" />
                <span>Admissions Desk: +254 700 000 000</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
