'use client';

import React from 'react';
import Link from 'next/link';
import { Quote, ArrowRight, CheckCircle2 } from 'lucide-react';
import { LEADERSHIP_PROFILES } from '@/lib/mockData';

export const PrincipalMessageSection: React.FC = () => {
  const principal = LEADERSHIP_PROFILES[0]; // Dr. Josephat Ndambuki

  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-premium">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Principal Profile Photo and Credentials */}
            <div className="lg:col-span-4 flex flex-col items-center text-center">
              <div className="relative">
                <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden border-4 border-aqua-600 shadow-xl">
                  <img
                    src={principal.photoURL}
                    alt={principal.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-3 -right-3 w-12 h-12 rounded-xl bg-gold-400 text-charcoal-950 flex items-center justify-center font-bold shadow-md">
                  <Quote className="w-6 h-6" />
                </div>
              </div>

              <div className="mt-5">
                <h3 className="text-lg sm:text-xl font-bold font-display text-charcoal-900">
                  {principal.name}
                </h3>
                <p className="text-xs font-semibold text-aqua-700 uppercase tracking-wider mt-0.5">
                  {principal.role}
                </p>
                <p className="text-[11px] text-slate-500 mt-1 max-w-xs">
                  {principal.credentials}
                </p>
              </div>
            </div>

            {/* Principal's Editorial Message */}
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-aqua-50 border border-aqua-200 text-aqua-800 text-xs font-semibold uppercase tracking-wider">
                Principal&apos;s Welcome Address
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-charcoal-900 tracking-tight">
                &ldquo;Every Boy Enters as a Scholar and Steps Out as a Transformational Leader&rdquo;
              </h2>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Welcome to Kalulini Boys High School. Education is a sacred trust between parents, teachers, and students. Our mandate extends beyond transmitting syllabus concepts to cultivating deep moral conviction, rigorous scientific curiosity, and resilient self-mastery.
              </p>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Whether through our top-ranking KCSE academic preparation, national-tier Science and Engineering Fair projects, or our disciplined rugby and athletics squads, Kalulini boys are nurtured to compete with the finest minds in Kenya and beyond.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-slate-100">
                <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Configurable Administrative Notice &bull; Office of the Principal</span>
                </div>

                <Link
                  href="/about#principal"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-aqua-700 hover:text-aqua-800"
                >
                  Read Full Message <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
