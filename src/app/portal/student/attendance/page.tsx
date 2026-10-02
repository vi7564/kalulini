'use client';

import React, { useMemo, useState } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { PortalLayout } from '@/components/portal/PortalLayout';
import { RouteGuard } from '@/components/portal/RouteGuard';
import { CheckCircle2, Clock3, XCircle, Filter, CalendarRange } from 'lucide-react';

const attendanceWeeks = [
  { week: 'Week 1', present: 5, absent: 0, late: 0, term: 'Term 1', month: 'Jan' },
  { week: 'Week 2', present: 5, absent: 0, late: 0, term: 'Term 1', month: 'Jan' },
  { week: 'Week 3', present: 4, absent: 0, late: 1, term: 'Term 1', month: 'Jan' },
  { week: 'Week 4', present: 5, absent: 0, late: 0, term: 'Term 1', month: 'Feb' },
  { week: 'Week 5', present: 5, absent: 0, late: 0, term: 'Term 1', month: 'Feb' },
  { week: 'Week 6', present: 4, absent: 1, late: 1, term: 'Term 2', month: 'Mar' }
];

const records = [
  { date: '2026-01-06', form: 'Form 3 East', subject: 'Mathematics', status: 'Present', noted: 'On time', time: '07:50 AM' },
  { date: '2026-01-07', form: 'Form 3 East', subject: 'Physics', status: 'Present', noted: 'On time', time: '07:52 AM' },
  { date: '2026-01-08', form: 'Form 3 East', subject: 'Chemistry', status: 'Late', noted: 'Late by 7 mins', time: '07:57 AM' },
  { date: '2026-01-09', form: 'Form 3 East', subject: 'English', status: 'Present', noted: 'On time', time: '07:48 AM' },
  { date: '2026-01-10', form: 'Form 3 East', subject: 'Biology', status: 'Absent', noted: 'Medical leave', time: '-' },
  { date: '2026-01-13', form: 'Form 3 East', subject: 'History', status: 'Present', noted: 'On time', time: '07:49 AM' }
];

const pieColors = ['#10b981', '#f59e0b', '#ef4444'];

export default function StudentAttendancePage() {
  const [term, setTerm] = useState('All terms');
  const [view, setView] = useState('All');

  const filteredRecords = useMemo(() => {
    return records.filter((row) => {
      const matchesTerm = term === 'All terms' ? true : row.date.startsWith(term === 'Term 1' ? '2026-01' : '2026-02');
      const matchesView = view === 'All' ? true : row.status === view;
      return matchesTerm && matchesView;
    });
  }, [term, view]);

  const metrics = useMemo(() => {
    const total = filteredRecords.length || 1;
    const present = filteredRecords.filter((r) => r.status === 'Present').length;
    const late = filteredRecords.filter((r) => r.status === 'Late').length;
    const absent = filteredRecords.filter((r) => r.status === 'Absent').length;
    const rate = ((present / total) * 100).toFixed(1);
    return { present, late, absent, rate };
  }, [filteredRecords]);

  const barData = attendanceWeeks
    .filter((item) => term === 'All terms' || item.term === term)
    .map((item) => ({
      name: item.week,
      present: item.present,
      late: item.late,
      absent: item.absent
    }));

  const pieData = [
    { name: 'Present', value: Number(metrics.rate) },
    { name: 'Late', value: Math.max(0, (metrics.late / Math.max(filteredRecords.length, 1)) * 100) },
    { name: 'Absent', value: Math.max(0, (metrics.absent / Math.max(filteredRecords.length, 1)) * 100) }
  ];

  return (
    <RouteGuard>
      <PortalLayout title="Attendance Register" subtitle="Track daily attendance, punctuality, and overall attendance trends across the term.">
        <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3 text-sm font-semibold text-slate-700 dark:text-slate-200">
            <Filter className="h-4 w-4 text-aqua-600" />
            Filters
          </div>
          <div className="flex flex-wrap gap-3">
            <select value={term} onChange={(e) => setTerm(e.target.value)} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-aqua-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white">
              <option>All terms</option>
              <option>Term 1</option>
              <option>Term 2</option>
            </select>
            <select value={view} onChange={(e) => setView(e.target.value)} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-aqua-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white">
              <option>All</option>
              <option>Present</option>
              <option>Late</option>
              <option>Absent</option>
            </select>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {[
            { label: 'Present', value: `${metrics.present} days`, accent: 'emerald', icon: CheckCircle2 },
            { label: 'Late', value: `${metrics.late} records`, accent: 'amber', icon: Clock3 },
            { label: 'Absent', value: `${metrics.absent} days`, accent: 'rose', icon: XCircle },
            { label: 'Rate', value: `${metrics.rate}%`, accent: 'aqua', icon: CalendarRange }
          ].map((card) => {
            const Icon = card.icon;
            const accent = card.accent;
            const palette = {
              emerald: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300',
              amber: 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300',
              rose: 'bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-300',
              aqua: 'bg-aqua-100 text-aqua-700 dark:bg-aqua-500/10 dark:text-aqua-300'
            }[accent];

            return (
              <div key={card.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">{card.label}</p>
                    <p className="mt-3 text-2xl font-black text-slate-900 dark:text-white">{card.value}</p>
                  </div>
                  <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${palette}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h3 className="text-lg font-black text-slate-900 dark:text-white">Weekly attendance trend</h3>
            <div className="mt-4 h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="#94a3b8" />
                  <YAxis tick={{ fontSize: 11 }} stroke="#94a3b8" />
                  <Tooltip />
                  <Bar dataKey="present" fill="#10b981" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="late" fill="#f59e0b" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="absent" fill="#ef4444" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h3 className="text-lg font-black text-slate-900 dark:text-white">Attendance mix</h3>
            <div className="mt-4 h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} innerRadius={55} outerRadius={85} dataKey="value" nameKey="name" paddingAngle={2}>
                    {pieData.map((entry, index) => (
                      <Cell key={entry.name} fill={pieColors[index]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => [`${value.toFixed(1)}%`, 'Share']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-slate-800">
            <h3 className="text-lg font-black text-slate-900 dark:text-white">Attendance log</h3>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{filteredRecords.length} records</span>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-700 dark:bg-slate-800/80 dark:text-slate-200">
                <tr>
                  <th className="px-5 py-3 font-semibold">Date</th>
                  <th className="px-5 py-3 font-semibold">Subject</th>
                  <th className="px-5 py-3 font-semibold">Class</th>
                  <th className="px-5 py-3 font-semibold">Time</th>
                  <th className="px-5 py-3 font-semibold">Status</th>
                  <th className="px-5 py-3 font-semibold">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {filteredRecords.map((row) => (
                  <tr key={`${row.date}-${row.subject}`} className="transition hover:bg-slate-50 dark:hover:bg-slate-800/60">
                    <td className="px-5 py-3 text-slate-700 dark:text-slate-200">{row.date}</td>
                    <td className="px-5 py-3 font-semibold text-slate-900 dark:text-white">{row.subject}</td>
                    <td className="px-5 py-3 text-slate-600 dark:text-slate-300">{row.form}</td>
                    <td className="px-5 py-3 text-slate-600 dark:text-slate-300">{row.time}</td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] ${
                        row.status === 'Present' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300' :
                        row.status === 'Late' ? 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300' :
                        'bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-300'
                      }`}>{row.status}</span>
                    </td>
                    <td className="px-5 py-3 text-slate-600 dark:text-slate-300">{row.noted}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </PortalLayout>
    </RouteGuard>
  );
}
