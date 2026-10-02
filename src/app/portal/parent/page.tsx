'use client';

import React, { useState, useEffect } from 'react';
import { PortalLayout } from '@/components/portal/PortalLayout';
import { useAuth } from '@/context/AuthContext';
import { studentService } from '@/lib/services/studentService';
import { Student } from '@/types';
import { Award, DollarSign, Calendar, ShieldCheck, CheckCircle2, User, BookOpen, Clock } from 'lucide-react';
import Link from 'next/link';

export default function ParentDashboardPage() {
  const { currentUser } = useAuth();
  const [student, setStudent] = useState<Student | null>(null);

  useEffect(() => {
    // Linked student for Mr. Joseph Kyalo is Brian Mutua (std-1001)
    studentService.getStudentById('std-1001').then((s) => {
      if (s) setStudent(s);
    });
  }, []);

  if (!student) {
    return (
      <PortalLayout title="Parent / Guardian Portal" subtitle="Connecting with your son's academic record...">
        <div className="py-16 text-center text-slate-400">Loading student record...</div>
      </PortalLayout>
    );
  }

  return (
    <PortalLayout title={`Parent Portal: ${currentUser?.displayName || 'Guardian'}`} subtitle="Authorized Guardian Console &bull; Confidential records strictly limited to your registered ward">
      {/* Ward Profile Banner */}
      <div className="bg-charcoal-900 text-white rounded-3xl p-6 sm:p-8 border border-charcoal-800 shadow-institution flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-gold-400 shrink-0">
            <img src={student.photoURL} alt={student.firstName} className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-widest text-gold-400">Registered Ward</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {student.status}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-white mt-1">
              {student.firstName} {student.middleName} {student.lastName}
            </h2>
            <p className="text-xs text-slate-300 font-mono mt-0.5">
              Admission No: {student.admissionNumber} &bull; Class: {student.form} {student.stream} &bull; House: {student.house}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/portal/student/results"
            className="px-4 py-2.5 rounded-xl bg-aqua-600 hover:bg-aqua-700 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
          >
            Review Report Card
          </Link>
          <Link
            href="/portal/student/fees"
            className="px-4 py-2.5 rounded-xl bg-gold-400 hover:bg-gold-500 text-charcoal-950 font-bold text-xs uppercase tracking-wider transition-colors"
          >
            Fee Statement
          </Link>
        </div>
      </div>

      {/* Ward KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Term 3 Mean Grade</span>
          <div className="text-3xl font-extrabold text-charcoal-900 font-display mt-1">A- (Minus)</div>
          <span className="text-xs text-emerald-600 font-semibold mt-1 block">Class Position: 3 of 48</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Attendance Reliability</span>
          <div className="text-3xl font-extrabold text-emerald-600 font-display mt-1">{student.attendanceRate}%</div>
          <span className="text-xs text-slate-500 mt-1 block">Full compliance this term</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Outstanding Balance</span>
          <div className="text-3xl font-extrabold text-charcoal-900 font-display mt-1">
            KES {student.feeBalance.toLocaleString()}
          </div>
          <span className="text-xs text-amber-600 font-semibold mt-1 block">Term 1 2026 Balance</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Class Teacher</span>
          <div className="text-base font-bold text-charcoal-900 mt-1">Mr. Geoffrey Musyoka</div>
          <span className="text-xs text-slate-500 mt-1 block">+254 722 100 200</span>
        </div>
      </div>

      {/* Parent Updates & Visiting Days */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-bold text-base text-charcoal-900 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-aqua-600" /> Upcoming Parent Meetings & Visiting Days
          </h3>

          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-gold-100 text-gold-900">
                PTA General Meeting
              </span>
              <h4 className="text-sm font-bold text-charcoal-900 mt-1.5">
                Annual Parents & Teachers Association (PTA) AGM
              </h4>
              <p className="text-xs text-slate-600 mt-1">
                Saturday 14th February 2026 starting at 9:00 AM in the School Main Assembly Hall.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-aqua-100 text-aqua-900">
                Official Visiting Day
              </span>
              <h4 className="text-sm font-bold text-charcoal-900 mt-1.5">
                Term 1 Visiting Day for All Classes
              </h4>
              <p className="text-xs text-slate-600 mt-1">
                Sunday 1st March 2026 from 10:00 AM to 4:00 PM. Parents may bring cooked snacks conforming to school hygiene guidelines.
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-2xl bg-charcoal-900 text-white border border-charcoal-800 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-gold-400">Parental Direct Contact</span>
            <h4 className="font-bold text-base">Office of the Deputy Principal</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              For academic consultation or pastoral welfare inquiries regarding your son, schedule a visit or call during official working hours.
            </p>
            <div className="pt-2 text-xs font-mono text-aqua-400">
              Direct Phone: +254 722 000 000
            </div>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}
