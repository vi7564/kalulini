'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Award, GraduationCap, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-charcoal-950 via-charcoal-900 to-charcoal-950 text-white py-20 lg:py-28 border-b border-charcoal-800">
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 bg-grid-dark opacity-40 pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-aqua-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Institutional Messaging & Call-to-actions */}
          <div className="lg:col-span-7 space-y-6">
            {/* National / Institutional Recognition Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-charcoal-800/90 border border-aqua-500/30 text-aqua-300 text-xs font-semibold uppercase tracking-wider shadow-sm">
              <Award className="w-3.5 h-3.5 text-gold-400" />
              <span>Premier Extra-County Boys Secondary Institution</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-white leading-tight">
              Fostering Academic Distinction, Integrity & Disciplined Servant Leadership
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
              Welcome to <strong className="text-white font-semibold">Kalulini Boys High School</strong>, situated in the scenic heart of Makueni County. We provide an uncompromising academic environment, state-of-the-art STEM laboratories, and rigorous character formation that prepares young men to excel in university education and global leadership.
            </p>

            {/* Value Proposition Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs text-slate-300">
              <div className="flex items-center gap-2 bg-charcoal-800/60 p-2.5 rounded-lg border border-charcoal-700/80">
                <CheckCircle2 className="w-4 h-4 text-aqua-400 shrink-0" />
                <span>KNEC & CBC Compliant</span>
              </div>
              <div className="flex items-center gap-2 bg-charcoal-800/60 p-2.5 rounded-lg border border-charcoal-700/80">
                <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />
                <span>Modern Science Labs</span>
              </div>
              <div className="flex items-center gap-2 bg-charcoal-800/60 p-2.5 rounded-lg border border-charcoal-700/80">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Dedicated Faculty</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                href="/admissions/apply"
                className="px-6 py-3.5 rounded-xl bg-gold-400 hover:bg-gold-500 text-charcoal-950 font-bold text-sm tracking-wide shadow-institution flex items-center gap-2 transition-all hover:scale-105"
              >
                <GraduationCap className="w-4 h-4" />
                Apply for 2026 Admissions
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/academics"
                className="px-6 py-3.5 rounded-xl bg-aqua-600 hover:bg-aqua-700 text-white font-semibold text-sm tracking-wide shadow-sm flex items-center gap-2 transition-all"
              >
                Explore Academics
              </Link>

              <Link
                href="/login"
                className="px-5 py-3.5 rounded-xl bg-charcoal-800/90 hover:bg-charcoal-700 text-slate-200 border border-slate-700 font-semibold text-sm tracking-wide flex items-center gap-2 transition-colors"
              >
                <ShieldCheck className="w-4 h-4 text-aqua-400" />
                Portal Access
              </Link>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Decorative Frame */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-aqua-500 to-gold-400 rounded-3xl blur-md opacity-30 group-hover:opacity-100 transition duration-1000" />
              
              <div className="relative rounded-2xl overflow-hidden border-2 border-slate-700/80 bg-charcoal-900 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=80"
                  alt="Kalulini Boys High School Academic Environment"
                  className="w-full h-80 sm:h-96 object-cover transform hover:scale-105 transition-transform duration-700"
                />
                
                {/* Floating Institutional Badge Card */}
                <div className="absolute bottom-4 left-4 right-4 bg-charcoal-900/95 backdrop-blur-md p-4 rounded-xl border border-aqua-500/40 shadow-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gold-400">
                        Academic Distinction (Sample Data)
                      </span>
                      <h4 className="text-white font-bold text-sm">
                        9.35 Mean Score &bull; B+ Average
                      </h4>
                      <p className="text-[11px] text-slate-300">
                        Over 90% direct university qualification rate
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gold-400/20 border border-gold-400/40 flex items-center justify-center shrink-0">
                      <Award className="w-5 h-5 text-gold-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
