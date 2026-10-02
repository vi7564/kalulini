'use client';

import React, { useState, useEffect } from 'react';
import { PortalLayout } from '@/components/portal/PortalLayout';
import { useAuth } from '@/context/AuthContext';
import { studentService } from '@/lib/services/studentService';
import { Student } from '@/types';
import { Award, BookOpen, Calendar, DollarSign, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function StudentDashboardPage() {
  const { currentUser } = useAuth();
  const [student, setStudent] = useState<Student | null>(null);

  useEffect(() => {
    studentService.getStudents().then((stds) => {
      // Find Brian Mutua or first student
      const found = stds.find((s) => s.id === currentUser?.studentId) || stds[0];
      setStudent(found);
    });
  }, [currentUser]);

  if (!student) {
    return (
      <PortalLayout title="Student Portal" subtitle="Loading scholar dashboard...">
        <div className="py-16 text-center text-slate-400">Loading student profile...</div>
      </PortalLayout>
    );
  }

  return (
    <PortalLayout title={`Welcome, ${student.firstName} ${student.lastName}`} subtitle="Student Academic Portal &bull; Form 3 East &bull; Simba House">
      {/* Profile Banner */}
      <div className="bg-charcoal-900 text-white rounded-3xl p-6 sm:p-8 border border-charcoal-800 shadow-institution flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-gold-400 shrink-0">
            <img src={student.photoURL} alt={student.firstName} className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
                {student.firstName} {student.middleName} {student.lastName}
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {student.status}
              </span>
            </div>
            <p className="text-xs text-gold-400 font-semibold font-mono mt-0.5">
              Admission No: {student.admissionNumber} &bull; Class: {student.form} {student.stream}
            </p>
            <p className="text-xs text-slate-300 mt-1">
              House: <strong>{student.house}</strong> &bull; Guardian: {student.guardianName} ({student.guardianPhone})
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/portal/student/results"
            className="px-4 py-2.5 rounded-xl bg-aqua-600 hover:bg-aqua-700 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
          >
            View Term Report Card
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Term 3 Mean Grade</span>
          <div className="text-3xl font-extrabold text-charcoal-900 font-display mt-1">A- (Minus)</div>
          <span className="text-xs text-aqua-700 font-semibold mt-1 block">81.0 Mean Score &bull; 80 Pts</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Class Position</span>
          <div className="text-3xl font-extrabold text-gold-600 font-display mt-1">Position 3</div>
          <span className="text-xs text-slate-500 mt-1 block">Out of 48 in Form 3 East</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Term Attendance</span>
          <div className="text-3xl font-extrabold text-emerald-600 font-display mt-1">{student.attendanceRate}%</div>
          <span className="text-xs text-slate-500 mt-1 block">Present in all roll calls</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Term Fee Balance</span>
          <div className="text-3xl font-extrabold text-charcoal-900 font-display mt-1">
            {student.feeBalance === 0 ? 'KES 0' : `KES ${student.feeBalance.toLocaleString()}`}
          </div>
          <span className="text-xs text-amber-600 font-semibold mt-1 block">Due by Term Mid-Break</span>
        </div>
      </div>

      {/* Dashboard Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Active Homework & Tasks (7 Cols) */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-charcoal-900 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-aqua-600" /> Pending Homework & Assignments
            </h3>
            <Link href="/portal/student/assignments" className="text-xs font-bold text-aqua-700 hover:text-aqua-800">
              View All &rarr;
            </Link>
          </div>

          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-aqua-300 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-aqua-100 text-aqua-900">
                  Mathematics
                </span>
                <span className="text-xs font-semibold text-rose-600 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> Due in 2 days
                </span>
              </div>
              <h4 className="text-sm font-bold text-charcoal-900 mt-2">
                Vectors and Three-Dimensional Geometry
              </h4>
              <p className="text-xs text-slate-600 mt-1">
                Exercise 6.4: Problems 1 to 14. Ensure complete geometric diagrams.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-aqua-300 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-purple-100 text-purple-900">
                  English & Literature
                </span>
                <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> Due in 5 days
                </span>
              </div>
              <h4 className="text-sm font-bold text-charcoal-900 mt-2">
                Character Analysis: Fathers of Nations
              </h4>
              <p className="text-xs text-slate-600 mt-1">
                600-word critical evaluation contrasting leadership ethics.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Portal Navigation & School Rules (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h4 className="font-bold text-sm text-charcoal-900">Student Modules</h4>

            <Link
              href="/portal/student/results"
              className="w-full p-3 rounded-xl bg-slate-50 hover:bg-aqua-50 border border-slate-200 hover:border-aqua-300 text-left flex items-center justify-between transition-colors group"
            >
              <div className="flex items-center gap-3">
                <Award className="w-4 h-4 text-gold-500" />
                <span className="text-xs font-bold text-charcoal-900 group-hover:text-aqua-800">
                  Official Report Cards & Performance
                </span>
              </div>
              <span className="text-xs text-slate-400">&rarr;</span>
            </Link>

            <Link
              href="/portal/student/fees"
              className="w-full p-3 rounded-xl bg-slate-50 hover:bg-aqua-50 border border-slate-200 hover:border-aqua-300 text-left flex items-center justify-between transition-colors group"
            >
              <div className="flex items-center gap-3">
                <DollarSign className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-bold text-charcoal-900 group-hover:text-aqua-800">
                  Fee Statement & Receipts
                </span>
              </div>
              <span className="text-xs text-slate-400">&rarr;</span>
            </Link>

            <Link
              href="/portal/student/attendance"
              className="w-full p-3 rounded-xl bg-slate-50 hover:bg-aqua-50 border border-slate-200 hover:border-aqua-300 text-left flex items-center justify-between transition-colors group"
            >
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-bold text-charcoal-900 group-hover:text-aqua-800">
                  Attendance Calendar & Register
                </span>
              </div>
              <span className="text-xs text-slate-400">&rarr;</span>
            </Link>
          </div>

          <div className="p-5 rounded-2xl bg-charcoal-900 text-white border border-charcoal-800">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gold-400">
              Institutional Core Reminder
            </span>
            <h4 className="text-sm font-bold mt-1">Four-Pillar Character Foundation</h4>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              Honor your school, respect your masters and peers, and guard your academic integrity at all times.
            </p>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}
