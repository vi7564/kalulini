'use client';

import React, { useState, useEffect } from 'react';
import { AnnouncementBar } from '@/components/public/AnnouncementBar';
import { Navbar } from '@/components/public/Navbar';
import { Footer } from '@/components/public/Footer';
import { KCSE_SAMPLE_PERFORMANCE, KCSE_GRADE_DISTRIBUTION_2024 } from '@/lib/mockData';
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
import { Award, TrendingUp, AlertCircle, ArrowLeft, GraduationCap } from 'lucide-react';
import Link from 'next/link';

export default function KCSEPerformancePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1">
        {/* Banner */}
        <section className="bg-charcoal-900 text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-charcoal-800">
          <div className="max-w-7xl mx-auto space-y-4">
            <Link
              href="/academics"
              className="inline-flex items-center gap-1.5 text-xs text-aqua-400 hover:text-aqua-300 font-semibold mb-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Academics Overview
            </Link>
            <span className="text-xs font-bold uppercase tracking-widest text-gold-400 block">
              National Examination Analytics &bull; Sample Data
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight">
              KCSE Examination Performance & Trends
            </h1>
            <p className="text-slate-300 max-w-2xl text-sm sm:text-base leading-relaxed">
              Historical progression, mean score development, grade distribution charts, and direct university transition statistics for Kalulini Boys High School.
            </p>
          </div>
        </section>

        {/* Notice & Disclaimer */}
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-3 text-xs text-amber-900 font-medium">
          <div className="max-w-7xl mx-auto flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
            <span>
              <strong>Institutional Policy Notice:</strong> Per school management guidelines, statistical charts below represent benchmark demonstration data until the release and verification of official KNEC results.
            </span>
          </div>
        </div>

        {/* Analytics Section */}
        <section className="py-16 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            {/* KPI Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">2024 Mean Score</span>
                <div className="text-3xl font-extrabold text-aqua-700 font-display mt-1">9.35</div>
                <span className="text-xs font-semibold text-emerald-600 mt-1 block">B+ (Plus) Grade</span>
              </div>
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Candidates Enrolled</span>
                <div className="text-3xl font-extrabold text-charcoal-900 font-display mt-1">240</div>
                <span className="text-xs text-slate-500 mt-1 block">100% Completion Rate</span>
              </div>
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">KUCCPS University Entry</span>
                <div className="text-3xl font-extrabold text-emerald-600 font-display mt-1">91.2%</div>
                <span className="text-xs text-slate-500 mt-1 block">Attaining C+ and above</span>
              </div>
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Plain As & A Minuses</span>
                <div className="text-3xl font-extrabold text-gold-600 font-display mt-1">52</div>
                <span className="text-xs text-slate-500 mt-1 block">Competitive career qualification</span>
              </div>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Yearly Trend Chart */}
              <div className="lg:col-span-6 bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-base font-bold text-charcoal-900">5-Year Historical Mean Score Trend</h3>
                    <p className="text-xs text-slate-500">Yearly continuous assessment growth</p>
                  </div>
                  <TrendingUp className="w-5 h-5 text-aqua-600" />
                </div>

                <div className="h-72 w-full">
                  {mounted ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={KCSE_SAMPLE_PERFORMANCE} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="year" stroke="#64748b" fontSize={12} />
                        <YAxis domain={[6, 11]} stroke="#64748b" fontSize={12} />
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
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-full flex items-center justify-center text-xs text-slate-400">Loading chart...</div>
                  )}
                </div>
              </div>

              {/* Grade Distribution Bar Chart */}
              <div className="lg:col-span-6 bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-base font-bold text-charcoal-900">2024 Candidate Grade Distribution</h3>
                    <p className="text-xs text-slate-500">Breakdown from Grade A to D+</p>
                  </div>
                  <GraduationCap className="w-5 h-5 text-gold-500" />
                </div>

                <div className="h-72 w-full">
                  {mounted ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={KCSE_GRADE_DISTRIBUTION_2024} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="grade" stroke="#64748b" fontSize={12} />
                        <YAxis stroke="#64748b" fontSize={12} />
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

            {/* Historical Table */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
                <h3 className="font-bold text-sm text-charcoal-900">Historical KCSE Examination Summary</h3>
                <span className="text-xs text-slate-500">2020 &ndash; 2024 Academic Years</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-6">Year</th>
                      <th className="py-3 px-6">Candidates</th>
                      <th className="py-3 px-6">Mean Score</th>
                      <th className="py-3 px-6">Mean Grade</th>
                      <th className="py-3 px-6">University Entry %</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {KCSE_SAMPLE_PERFORMANCE.map((row) => (
                      <tr key={row.year} className="hover:bg-slate-50/80">
                        <td className="py-3 px-6 font-bold text-charcoal-900">{row.year}</td>
                        <td className="py-3 px-6 text-slate-600">{row.candidates}</td>
                        <td className="py-3 px-6 font-bold text-aqua-700">{row.meanScore}</td>
                        <td className="py-3 px-6 font-semibold text-charcoal-900">{row.meanGrade}</td>
                        <td className="py-3 px-6 font-bold text-emerald-600">{row.universityEntryRate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
