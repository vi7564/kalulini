'use client';

import React from 'react';
import { PortalLayout } from '@/components/portal/PortalLayout';
import { useAuth } from '@/context/AuthContext';
import { BookOpen, UserCheck, Award, ClipboardList, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function TeacherDashboardPage() {
  const { currentUser } = useAuth();

  const timetable = [
    { period: 'Lesson 1 (8:20 - 9:00 AM)', subject: 'Mathematics', class: 'Form 4 West', room: 'Room 12' },
    { period: 'Lesson 3 (10:00 - 10:40 AM)', subject: 'Mathematics', class: 'Form 3 East', room: 'Room 8' },
    { period: 'Lesson 5 (11:40 - 12:20 PM)', subject: 'Physics Practical', class: 'Form 3 East', room: 'Physics Lab' },
    { period: 'Lesson 7 (2:40 - 3:20 PM)', subject: 'Remedial Math Clinic', class: 'Form 4 Candidates', room: 'Main Hall' }
  ];

  return (
    <PortalLayout title={`Teacher Portal: ${currentUser?.displayName || 'Faculty Member'}`} subtitle="Manage your assigned classes, subject curriculum, exam scorecards, and daily attendance">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Assigned Classes</span>
          <div className="text-2xl font-extrabold text-charcoal-900 font-display mt-1">2 Classes</div>
          <span className="text-xs text-aqua-600 font-semibold mt-1 block">Form 4 West & Form 3 East</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Scholars Under Instruction</span>
          <div className="text-2xl font-extrabold text-charcoal-900 font-display mt-1">94 Boys</div>
          <span className="text-xs text-emerald-600 font-semibold mt-1 block">Mathematics & Physics</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Pending Mark Entry</span>
          <div className="text-2xl font-extrabold text-amber-600 font-display mt-1">1 Exam</div>
          <span className="text-xs text-amber-600 font-semibold mt-1 block">Mid-Term CAT 1 Papers</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Class Attendance Today</span>
          <div className="text-2xl font-extrabold text-emerald-600 font-display mt-1">98.2%</div>
          <span className="text-xs text-slate-500 mt-1 block">Form 3 East Marked</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Today's Schedule (7 Cols) */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-charcoal-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-aqua-600" /> Today&apos;s Teaching Schedule
            </h3>
            <span className="text-xs font-semibold text-slate-500">Term 1 2026 Week 4</span>
          </div>

          <div className="space-y-3">
            {timetable.map((t, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-aqua-300 transition-colors flex items-center justify-between"
              >
                <div>
                  <span className="text-[11px] font-mono font-semibold text-slate-400 block">{t.period}</span>
                  <strong className="text-sm font-bold text-charcoal-900 block mt-0.5">{t.subject}</strong>
                  <span className="text-xs text-aqua-700 font-semibold">{t.class}</span>
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700">
                  {t.room}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Faculty Direct Actions (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-charcoal-900 text-white rounded-2xl p-6 border border-charcoal-800 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-gold-400">Class Teacher Desk</span>
            <h4 className="text-base font-bold">Daily Roll Call Attendance</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Mark today&apos;s register for your home-room stream. Absences are automatically aggregated into term report cards.
            </p>
            <Link
              href="/portal/teacher/attendance"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-aqua-600 hover:bg-aqua-700 text-white font-bold text-xs uppercase tracking-wider transition-colors"
            >
              Open Daily Register <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
            <h4 className="font-bold text-sm text-charcoal-900">Academic Modules</h4>

            <Link
              href="/portal/teacher/grading"
              className="w-full p-3 rounded-xl bg-slate-50 hover:bg-aqua-50 border border-slate-200 hover:border-aqua-300 text-left flex items-center justify-between transition-colors group"
            >
              <div className="flex items-center gap-3">
                <Award className="w-4 h-4 text-gold-500" />
                <span className="text-xs font-bold text-charcoal-900 group-hover:text-aqua-800">
                  Enter & Submit Exam Marks
                </span>
              </div>
              <span className="text-xs text-slate-400">&rarr;</span>
            </Link>

            <Link
              href="/portal/teacher/assignments"
              className="w-full p-3 rounded-xl bg-slate-50 hover:bg-aqua-50 border border-slate-200 hover:border-aqua-300 text-left flex items-center justify-between transition-colors group"
            >
              <div className="flex items-center gap-3">
                <ClipboardList className="w-4 h-4 text-aqua-600" />
                <span className="text-xs font-bold text-charcoal-900 group-hover:text-aqua-800">
                  Assign Homework & Tasks
                </span>
              </div>
              <span className="text-xs text-slate-400">&rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}
