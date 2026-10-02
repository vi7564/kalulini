'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line
} from 'recharts';
import { KCSE_SAMPLE_PERFORMANCE, KCSE_GRADE_DISTRIBUTION_2024 } from '@/lib/mockData';
import { Award, TrendingUp, AlertCircle, ArrowRight, GraduationCap } from 'lucide-react';

export const KCSEPerformanceSection: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading & Sample Notice */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gold-100 text-gold-900 border border-gold-300 text-xs font-bold uppercase tracking-wider mb-2">
              <Award className="w-3.5 h-3.5 text-gold-600" />
              Academic Performance Analysis
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-charcoal-900 tracking-tight">
              Consistent Upward Trajectory in National Examinations
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              Kalulini Boys High School prioritizes continuous diagnostic testing, holiday revision clinics, and individual subject remedial coaching.
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex items-center gap-2 text-xs font-semibold text-slate-500 bg-white px-3 py-2 rounded-lg border border-slate-200 shadow-sm">
            <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
            <span>Demonstration Benchmark Data &bull; Configurable via Admin</span>
          </div>
        </div>

        {/* Highlight KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Latest Mean Score
            </span>
            <div className="text-3xl font-extrabold text-aqua-700 font-display mt-1">
              9.35
            </div>
            <span className="inline-block mt-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
              +0.43 over 2023
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              School Mean Grade
            </span>
            <div className="text-3xl font-extrabold text-charcoal-900 font-display mt-1">
              B+ (Plus)
            </div>
            <span className="inline-block mt-1 text-xs font-semibold text-slate-500">
              240 Candidates
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Direct University Entry
            </span>
            <div className="text-3xl font-extrabold text-emerald-600 font-display mt-1">
              91.2%
            </div>
            <span className="inline-block mt-1 text-xs font-semibold text-slate-500">
              KUCCPS Qualified (C+ & above)
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Top Grade Earners
            </span>
            <div className="text-3xl font-extrabold text-gold-600 font-display mt-1">
              52
            </div>
            <span className="inline-block mt-1 text-xs font-semibold text-slate-500">
              Plain A & A- (Minus)
            </span>
          </div>
        </div>

        {/* Dynamic Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Trend Line Chart (5-Year Progression) */}
          <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-sm font-bold text-charcoal-900">5-Year KCSE Mean Score Progression</h4>
                <p className="text-xs text-slate-500">Continuous steady growth from 2020 to 2024</p>
              </div>
              <TrendingUp className="w-5 h-5 text-aqua-600" />
            </div>

            <div className="h-64 w-full">
              {mounted ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={KCSE_SAMPLE_PERFORMANCE} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="year" stroke="#94a3b8" fontSize={12} />
                    <YAxis domain={[6, 11]} stroke="#94a3b8" fontSize={12} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', border: 'none', color: '#fff', fontSize: '12px' }}
                      formatter={(val: number) => [`${val} points`, 'Mean Score']}
                    />
                    <Line
                      type="monotone"
                      dataKey="meanScore"
                      stroke="#0284c7"
                      strokeWidth={3}
                      dot={{ r: 5, fill: '#0284c7', strokeWidth: 2, stroke: '#fff' }}
                      activeDot={{ r: 7 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-xs text-slate-400">Loading chart...</div>
              )}
            </div>
          </div>

          {/* Grade Distribution Bar Chart */}
          <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-sm font-bold text-charcoal-900">2024 KCSE Grade Distribution</h4>
                <p className="text-xs text-slate-500">Breakdown of grades obtained across all subjects</p>
              </div>
              <GraduationCap className="w-5 h-5 text-gold-500" />
            </div>

            <div className="h-64 w-full">
              {mounted ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={KCSE_GRADE_DISTRIBUTION_2024} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="grade" stroke="#94a3b8" fontSize={12} />
                    <YAxis stroke="#94a3b8" fontSize={12} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', border: 'none', color: '#fff', fontSize: '12px' }}
                      formatter={(val: number) => [`${val} candidates`, 'Count']}
                    />
                    <Bar dataKey="count" fill="#0099cc" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-xs text-slate-400">Loading chart...</div>
              )}
            </div>
          </div>
        </div>

        {/* Link to Dedicated KCSE Page */}
        <div className="mt-8 text-center">
          <Link
            href="/academics/kcse"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-aqua-700 hover:text-aqua-800 bg-white px-5 py-2.5 rounded-xl border border-slate-200 shadow-sm hover:shadow transition-all"
          >
            View Detailed Subject-by-Subject KCSE Breakdown & Historical Archives
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
};
