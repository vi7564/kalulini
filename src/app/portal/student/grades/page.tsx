'use client';

import { useMemo, useState } from 'react';
import { PortalLayout } from '@/components/portal/PortalLayout';
import { RouteGuard } from '@/components/portal/RouteGuard';
import { Filter, TrendingUp } from 'lucide-react';

const gradeRows = [
  { subject: 'Mathematics', code: '121', cat: 82, endTerm: 88, total: 85, grade: 'A', points: 12, trend: '+6%' },
  { subject: 'Physics', code: '232', cat: 76, endTerm: 84, total: 80, grade: 'A-', points: 11, trend: '+4%' },
  { subject: 'Chemistry', code: '233', cat: 71, endTerm: 77, total: 74, grade: 'B+', points: 10, trend: '+3%' },
  { subject: 'English', code: '101', cat: 79, endTerm: 81, total: 80, grade: 'A-', points: 11, trend: '+2%' },
  { subject: 'Biology', code: '231', cat: 74, endTerm: 79, total: 77, grade: 'B+', points: 10, trend: '+5%' },
  { subject: 'History & Govt', code: '311', cat: 68, endTerm: 72, total: 70, grade: 'B', points: 9, trend: '+1%' }
];

export default function StudentGradesPage() {
  const [term, setTerm] = useState('Term 1');
  const [year, setYear] = useState('2026');

  const summary = useMemo(() => {
    const average = Math.round(gradeRows.reduce((sum, row) => sum + row.total, 0) / gradeRows.length);
    const totalPoints = gradeRows.reduce((sum, row) => sum + row.points, 0);
    return { average, totalPoints };
  }, []);

  return (
    <RouteGuard>
      <PortalLayout title="Academic grades" subtitle="Review your progress across the term, subject strengths, and learning trajectory.">
        <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-aqua-100 text-aqua-700 dark:bg-aqua-500/10 dark:text-aqua-300">
              <Filter className="h-4 w-4" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Filters</p>
              <p className="text-sm font-bold text-slate-900 dark:text-white">Performance report</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <select value={term} onChange={(event) => setTerm(event.target.value)} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none transition focus:border-aqua-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white">
              <option>Term 1</option>
              <option>Term 2</option>
              <option>Term 3</option>
            </select>
            <select value={year} onChange={(event) => setYear(event.target.value)} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none transition focus:border-aqua-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white">
              <option>2026</option>
              <option>2025</option>
              <option>2024</option>
            </select>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {[
            { label: 'Term average', value: `${summary.average}%`, note: 'Overall performance', tint: 'aqua' },
            { label: 'KNEC points', value: `${summary.totalPoints}`, note: 'Current total', tint: 'emerald' },
            { label: 'Progress', value: 'Up 8.4%', note: 'From previous term', tint: 'amber' }
          ].map((card) => (
            <div key={card.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">{card.label}</p>
              <p className="mt-3 text-3xl font-black text-slate-900 dark:text-white">{card.value}</p>
              <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
                <TrendingUp className="h-3.5 w-3.5 text-emerald-600" />
                {card.note}
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-slate-800">
            <h3 className="text-lg font-black text-slate-900 dark:text-white">Subject breakdown</h3>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{year} • {term}</span>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-700 dark:bg-slate-800/80 dark:text-slate-200">
                <tr>
                  <th className="px-5 py-3 font-semibold">Subject</th>
                  <th className="px-5 py-3 font-semibold">CAT</th>
                  <th className="px-5 py-3 font-semibold">End term</th>
                  <th className="px-5 py-3 font-semibold">Total</th>
                  <th className="px-5 py-3 font-semibold">Grade</th>
                  <th className="px-5 py-3 font-semibold">Progress</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {gradeRows.map((row) => (
                  <tr key={row.subject} className="transition hover:bg-slate-50 dark:hover:bg-slate-800/60">
                    <td className="px-5 py-3">
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white">{row.subject}</p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">Code {row.code}</p>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-slate-700 dark:text-slate-200">{row.cat}</td>
                    <td className="px-5 py-3 text-slate-700 dark:text-slate-200">{row.endTerm}</td>
                    <td className="px-5 py-3 font-bold text-slate-900 dark:text-white">{row.total}</td>
                    <td className="px-5 py-3">
                      <span className="inline-flex rounded-full bg-aqua-100 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-aqua-700 dark:bg-aqua-500/10 dark:text-aqua-300">{row.grade}</span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex min-w-[160px] items-center gap-3">
                        <div className="h-2.5 w-full rounded-full bg-slate-200 dark:bg-slate-700">
                          <div className="h-2.5 rounded-full bg-gradient-to-r from-aqua-500 to-emerald-500" style={{ width: `${row.total}%` }} />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-600 dark:text-emerald-300">{row.trend}</span>
                      </div>
                    </td>
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
