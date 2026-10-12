'use client';

import React from 'react';
import Link from 'next/link';
import { GraduationCap, ArrowRight, CheckCircle2, ShieldCheck, PhoneCall } from 'lucide-react';

export const AdmissionsCTA: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-charcoal-950 text-white relative border-b border-charcoal-800">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-charcoal-900 border border-charcoal-800 rounded-3xl p-8 sm:p-12 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-8 space-y-5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/15 text-gold-300 text-xs font-bold uppercase tracking-wider border border-amber-400/30">
                <GraduationCap className="w-4 h-4" /> 2026 Academic Year Admissions
              </span>

              <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-white leading-tight">
                Secure Your Son&apos;s Academic & Moral Future at Kalulini Boys
              </h2>

              <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl font-normal">
                Admissions for Form 1 and limited transfer vacancies for Form 2 & Form 3 are currently open. Parents can submit their application online, upload birth certificate and result slips, and track their admission decision in real-time.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs text-slate-200">
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
                className="w-full py-4 px-6 rounded-xl bg-gold-400 hover:bg-gold-500 text-charcoal-950 font-extrabold text-sm text-center shadow-md transition-all hover:scale-105 flex items-center justify-center gap-2"
              >
                Start Online Application <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/admissions"
                className="w-full py-3.5 px-6 rounded-xl bg-charcoal-800 hover:bg-charcoal-700 text-white font-semibold text-xs text-center border border-charcoal-700 transition-colors"
              >
                Review Requirements & Fee Structure
              </Link>

              <div className="mt-2 flex items-center justify-center gap-2 text-xs text-slate-300">
                <PhoneCall className="w-3.5 h-3.5 text-aqua-400" />
                <span>Admissions Desk: 0792 511 717</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
