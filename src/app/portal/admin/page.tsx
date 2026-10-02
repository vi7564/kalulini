'use client';

import React, { useEffect, useState } from 'react';
import { PortalLayout } from '@/components/portal/PortalLayout';
import {
  Users,
  GraduationCap,
  UserCheck,
  DollarSign,
  FileCheck,
  TrendingUp,
  Award,
  CheckCircle2,
  Calendar,
  AlertCircle
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { studentService } from '@/lib/services/studentService';
import { teacherService } from '@/lib/services/teacherService';
import { feesService } from '@/lib/services/feesService';
import { admissionService } from '@/lib/services/admissionService';
import { Student, Teacher, AdmissionApplication } from '@/types';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [applications, setApplications] = useState<AdmissionApplication[]>([]);
  const [feeSummary, setFeeSummary] = useState({ totalCollected: 0, totalPending: 0, paymentCount: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    studentService.getStudents().then(setStudents);
    teacherService.getTeachers().then(setTeachers);
    admissionService.getApplications().then(setApplications);
    feesService.getFeeSummary().then(setFeeSummary);
  }, []);

  // Demo charts data
  const enrollmentData = [
    { form: 'Form 1', students: 215 },
    { form: 'Form 2', students: 208 },
    { form: 'Form 3', students: 212 },
    { form: 'Form 4', students: 205 }
  ];

  const feeMonthlyData = [
    { month: 'Oct', collected: 2.1 },
    { month: 'Nov', collected: 2.8 },
    { month: 'Dec', collected: 1.4 },
    { month: 'Jan', collected: 4.8 },
    { month: 'Feb', collected: 3.2 }
  ];

  const attendanceRate = students.length > 0
    ? (students.reduce((acc, s) => acc + s.attendanceRate, 0) / students.length).toFixed(1)
    : '96.8';

  const pendingApps = applications.filter((a) => a.status === 'Submitted' || a.status === 'Under Review').length;

  return (
    <PortalLayout title="Executive Administration Dashboard" subtitle="Overview of institutional metrics, enrollment, finances and operational desk">
      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Enrolled Boys</span>
            <div className="text-2xl font-extrabold text-charcoal-900 font-display mt-1">{students.length > 0 ? '840' : '0'}</div>
            <span className="text-[11px] font-semibold text-emerald-600 mt-1 block">Forms 1 to 4 Streams</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Faculty & Staff</span>
            <div className="text-2xl font-extrabold text-charcoal-900 font-display mt-1">42</div>
            <span className="text-[11px] font-semibold text-aqua-600 mt-1 block">TSC & BOM Appointees</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-aqua-50 text-aqua-600 flex items-center justify-center">
            <UserCheck className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Pending Admissions</span>
            <div className="text-2xl font-extrabold text-charcoal-900 font-display mt-1">{pendingApps}</div>
            <span className="text-[11px] font-semibold text-amber-600 mt-1 block">Awaiting Board Review</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <FileCheck className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Average Attendance</span>
            <div className="text-2xl font-extrabold text-emerald-600 font-display mt-1">{attendanceRate}%</div>
            <span className="text-[11px] font-semibold text-slate-500 mt-1 block">Term 1 Daily Register</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Finance Snapshot */}
      <div className="bg-charcoal-900 text-white rounded-3xl p-6 sm:p-8 border border-charcoal-800 shadow-institution flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <span className="text-xs uppercase tracking-widest text-gold-400 font-bold">Term 1 2026 Financial Position</span>
          <h3 className="text-xl font-bold font-display">Term Fee Revenue & Outstanding Collections</h3>
          <p className="text-xs text-slate-300">Live reconciliation from Bank Direct Deposits and M-Pesa Paybill.</p>
        </div>

        <div className="flex flex-wrap items-center gap-6">
          <div className="bg-charcoal-800 p-4 rounded-xl border border-charcoal-700">
            <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400">Verified Collections</span>
            <div className="text-xl font-bold text-white mt-0.5">KES {feeSummary.totalCollected.toLocaleString()}</div>
          </div>
          <div className="bg-charcoal-800 p-4 rounded-xl border border-charcoal-700">
            <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400">Pending Balances</span>
            <div className="text-xl font-bold text-white mt-0.5">KES {feeSummary.totalPending.toLocaleString()}</div>
          </div>
          <Link
            href="/portal/admin/fees"
            className="px-4 py-2.5 rounded-xl bg-aqua-600 hover:bg-aqua-700 text-white text-xs font-bold transition-colors"
          >
            Manage Fees &rarr;
          </Link>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Enrollment Distribution */}
        <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="font-bold text-sm text-charcoal-900">Student Enrollment by Form</h4>
              <p className="text-xs text-slate-500">Distribution across 4 Form streams</p>
            </div>
            <Users className="w-4 h-4 text-aqua-600" />
          </div>

          <div className="h-64 w-full">
            {mounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={enrollmentData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="form" stroke="#94a3b8" fontSize={12} />
                  <YAxis stroke="#94a3b8" fontSize={12} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', border: 'none', color: '#fff', fontSize: '12px' }}
                    formatter={(val: number) => [`${val} scholars`, 'Enrollment']}
                  />
                  <Bar dataKey="students" fill="#0099cc" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : null}
          </div>
        </div>

        {/* Fee Collection Trend */}
        <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="font-bold text-sm text-charcoal-900">Monthly Fee Collection Flow</h4>
              <p className="text-xs text-slate-500">Revenue in Millions KES</p>
            </div>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>

          <div className="h-64 w-full">
            {mounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={feeMonthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
                  <YAxis stroke="#94a3b8" fontSize={12} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', border: 'none', color: '#fff', fontSize: '12px' }}
                    formatter={(val: number) => [`KES ${val}M`, 'Collected']}
                  />
                  <Line
                    type="monotone"
                    dataKey="collected"
                    stroke="#10b981"
                    strokeWidth={3}
                    dot={{ r: 5, fill: '#10b981', strokeWidth: 2, stroke: '#fff' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : null}
          </div>
        </div>
      </div>

      {/* Recent Admissions & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recent Applications Table (8 Cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
            <h4 className="font-bold text-sm text-charcoal-900">Recent Online Admission Submissions</h4>
            <Link href="/portal/admin/admissions" className="text-xs font-bold text-aqua-700 hover:text-aqua-800">
              View All Desk &rarr;
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-700 border-b border-slate-200 font-semibold">
                <tr>
                  <th className="py-3 px-5">Ref Code</th>
                  <th className="py-3 px-5">Applicant</th>
                  <th className="py-3 px-5">Target Form</th>
                  <th className="py-3 px-5">KCPE Marks</th>
                  <th className="py-3 px-5">Status</th>
                  <th className="py-3 px-5">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {applications.slice(0, 4).map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50">
                    <td className="py-3 px-5 font-mono font-bold text-aqua-700">{app.applicationReference}</td>
                    <td className="py-3 px-5 font-semibold text-charcoal-900">{app.applicantFirstName} {app.applicantLastName}</td>
                    <td className="py-3 px-5 text-slate-600">{app.targetForm}</td>
                    <td className="py-3 px-5 font-bold text-slate-800">{app.kcpeMarks}</td>
                    <td className="py-3 px-5">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        app.status === 'Accepted' ? 'bg-emerald-100 text-emerald-800' :
                        app.status === 'Under Review' ? 'bg-amber-100 text-amber-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="py-3 px-5">
                      <Link href="/portal/admin/admissions" className="text-aqua-600 hover:underline font-semibold">
                        Review
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Operational Quick Launcher (4 Cols) */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <h4 className="font-bold text-sm text-charcoal-900 mb-2">Administrative Quick Launcher</h4>

          <Link
            href="/portal/admin/students"
            className="w-full p-3 rounded-xl bg-slate-50 hover:bg-aqua-50 border border-slate-200 hover:border-aqua-300 text-left flex items-center justify-between transition-colors group"
          >
            <div className="flex items-center gap-3">
              <Users className="w-4 h-4 text-aqua-600" />
              <span className="text-xs font-bold text-charcoal-900 group-hover:text-aqua-800">Add New Student</span>
            </div>
            <span className="text-xs text-slate-400">&rarr;</span>
          </Link>

          <Link
            href="/portal/admin/announcements"
            className="w-full p-3 rounded-xl bg-slate-50 hover:bg-aqua-50 border border-slate-200 hover:border-aqua-300 text-left flex items-center justify-between transition-colors group"
          >
            <div className="flex items-center gap-3">
              <TrendingUp className="w-4 h-4 text-gold-500" />
              <span className="text-xs font-bold text-charcoal-900 group-hover:text-aqua-800">Publish Top Announcement</span>
            </div>
            <span className="text-xs text-slate-400">&rarr;</span>
          </Link>

          <Link
            href="/portal/admin/fees"
            className="w-full p-3 rounded-xl bg-slate-50 hover:bg-aqua-50 border border-slate-200 hover:border-aqua-300 text-left flex items-center justify-between transition-colors group"
          >
            <div className="flex items-center gap-3">
              <DollarSign className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-bold text-charcoal-900 group-hover:text-aqua-800">Record Fee Payment</span>
            </div>
            <span className="text-xs text-slate-400">&rarr;</span>
          </Link>

          <Link
            href="/portal/admin/audit-logs"
            className="w-full p-3 rounded-xl bg-slate-50 hover:bg-aqua-50 border border-slate-200 hover:border-aqua-300 text-left flex items-center justify-between transition-colors group"
          >
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-purple-600" />
              <span className="text-xs font-bold text-charcoal-900 group-hover:text-aqua-800">Audit Security Log</span>
            </div>
            <span className="text-xs text-slate-400">&rarr;</span>
          </Link>
        </div>
      </div>
    </PortalLayout>
  );
}
