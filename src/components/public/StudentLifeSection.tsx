'use client';

import React from 'react';
import Link from 'next/link';
import { Trophy, Compass, ShieldCheck, Users, ArrowRight } from 'lucide-react';

export const StudentLifeSection: React.FC = () => {
  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-aqua-600">
            Beyond the Classroom
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-charcoal-900 tracking-tight mt-1">
            Student Life, Co-Curriculars & House Camaraderie
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Character is forged on the sports pitch, the debate stage, and within the four traditional boarding houses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Sports */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-premium hover:border-aqua-300 transition-all">
            <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center mb-4">
              <Trophy className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-charcoal-900">
              Sports & Athletic Excellence
            </h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Competitive rugby, soccer, volleyball, lawn tennis, table tennis, and athletics. Our students regularly contest in sub-county and regional tournaments.
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5 text-[11px] font-semibold text-slate-700">
              <span className="px-2 py-0.5 rounded bg-slate-100">Rugby 7s & 15s</span>
              <span className="px-2 py-0.5 rounded bg-slate-100">Kalulini FC</span>
              <span className="px-2 py-0.5 rounded bg-slate-100">Basketball</span>
              <span className="px-2 py-0.5 rounded bg-slate-100">Cross-Country</span>
            </div>
          </div>

          {/* Card 2: Clubs & Societies */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-premium hover:border-aqua-300 transition-all">
            <div className="w-12 h-12 rounded-xl bg-aqua-50 border border-aqua-200 text-aqua-700 flex items-center justify-center mb-4">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-charcoal-900">
              Clubs, STEM & Societies
            </h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Nurturing intellectual passions through Young Scientists Club, Great Debaters Society, President&apos;s Award Scheme, Robotics, Scouts Movement, and St. John Ambulance.
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5 text-[11px] font-semibold text-slate-700">
              <span className="px-2 py-0.5 rounded bg-slate-100">Young Scientists</span>
              <span className="px-2 py-0.5 rounded bg-slate-100">Debate & Oratory</span>
              <span className="px-2 py-0.5 rounded bg-slate-100">Scouts Movement</span>
              <span className="px-2 py-0.5 rounded bg-slate-100">Christian Union</span>
            </div>
          </div>

          {/* Card 3: Boarding Houses */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-premium hover:border-aqua-300 transition-all">
            <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-charcoal-900">
              Four Traditional Houses
            </h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Every boy is inducted into Simba, Chui, Kifaru, or Twiga House. Supervised by seasoned House Masters and student prefects to instil mutual responsibility and order.
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5 text-[11px] font-semibold text-slate-700">
              <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">Simba</span>
              <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200">Chui</span>
              <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">Kifaru</span>
              <span className="px-2 py-0.5 rounded bg-purple-50 text-purple-800 border border-purple-200">Twiga</span>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/student-life"
            className="inline-flex items-center gap-2 text-sm font-bold text-aqua-700 hover:text-aqua-800"
          >
            Explore Student Life, Boarding Policies & Co-Curricular Calendar <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
