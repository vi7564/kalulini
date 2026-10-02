'use client';

import Link from 'next/link';
import { Activity, Award, BookOpen, CalendarCheck, Clock3, CreditCard, Mail, MessageSquare } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, Tooltip } from 'recharts';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { STUDENT_DASHBOARD_DATA } from '../../../data/portalDashboards';

const assignmentStatusClasses = {
  Pending: 'bg-amber-100 text-amber-800 dark:bg-amber-500/10 dark:text-amber-300',
  Submitted: 'bg-aqua-100 text-aqua-900 dark:bg-aqua-500/10 dark:text-aqua-200',
  Graded: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-300',
};

const activityIcons = {
  grade: Award,
  message: MessageSquare,
  payment: CreditCard,
};

export function StudentDashboardPanel() {
  const data = STUDENT_DASHBOARD_DATA;
  const kpis = [
    { label: 'Attendance rate', value: data.attendanceRate, suffix: '%', icon: CalendarCheck, accent: 'text-emerald-700 dark:text-emerald-300' },
    { label: 'Current term average', value: data.termAverage, suffix: '%', icon: Award, accent: 'text-aqua-800 dark:text-aqua-300' },
    { label: 'Fee balance', value: data.feeBalance, prefix: 'KES ', icon: CreditCard, accent: 'text-amber-700 dark:text-amber-300' },
    { label: 'Unread messages', value: data.unreadMessages, icon: Mail, accent: 'text-charcoal-800 dark:text-slate-100' },
  ];

  return (
    <section aria-label="Student daily dashboard" className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map(({ label, value, prefix = '', suffix = '', icon: Icon, accent }) => (
          <div key={label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold text-slate-600 dark:text-slate-300">{label}</p>
                <p className={`mt-2 text-2xl font-black ${accent}`}><AnimatedCounter value={value} prefix={prefix} suffix={suffix} /></p>
              </div>
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800">
                <Icon className={`h-5 w-5 ${accent}`} aria-hidden="true" />
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.4fr_0.9fr]">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900" aria-labelledby="student-timetable-title">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-aqua-700 dark:text-aqua-300">Tuesday · Form 3 East</p>
              <h2 id="student-timetable-title" className="mt-1 text-lg font-bold text-charcoal-900 dark:text-white">Today&apos;s timetable</h2>
            </div>
            <Clock3 className="h-5 w-5 text-gold-600" aria-hidden="true" />
          </div>
          <ol className="divide-y divide-slate-200 dark:divide-slate-800">
            {data.timetable.map((lesson) => (
              <li key={`${lesson.time}-${lesson.subject}`} className="grid grid-cols-[3.5rem_1fr] gap-3 py-3 first:pt-1 last:pb-1 sm:grid-cols-[4rem_1fr_auto] sm:items-center">
                <time className="pt-0.5 text-xs font-bold tabular-nums text-aqua-800 dark:text-aqua-300">{lesson.time}</time>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-charcoal-900 dark:text-white">{lesson.subject}</p>
                  <p className="mt-0.5 text-xs text-slate-600 dark:text-slate-300">{lesson.teacher}</p>
                </div>
                <span className="col-start-2 text-xs text-slate-500 dark:text-slate-400 sm:col-start-auto">{lesson.room}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900" aria-labelledby="student-attendance-title">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-600 dark:text-slate-300">Last six weeks</p>
              <h2 id="student-attendance-title" className="mt-1 text-lg font-bold text-charcoal-900 dark:text-white">Attendance trend</h2>
            </div>
            <span className="text-sm font-bold text-emerald-700 dark:text-emerald-300">{data.attendanceRate}%</span>
          </div>
          <div className="mt-4 h-36 w-full" role="img" aria-label="Attendance trend over the last six weeks">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.attendanceTrend} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} />
                <Tooltip formatter={(value: number) => [`${value}%`, 'Attendance']} />
                <Line type="monotone" dataKey="rate" stroke="#00A8D6" strokeWidth={3} dot={{ r: 3, fill: '#FFD700', stroke: '#1F1F1F', strokeWidth: 1 }} isAnimationActive={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900" aria-labelledby="student-assignments-title">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 id="student-assignments-title" className="text-lg font-bold text-charcoal-900 dark:text-white">Assignments due this week</h2>
            <Link href="/portal/student/assignments" className="text-xs font-semibold text-aqua-800 underline-offset-4 hover:underline dark:text-aqua-300">All assignments</Link>
          </div>
          <ul className="divide-y divide-slate-200 dark:divide-slate-800">
            {data.assignments.map((assignment) => (
              <li key={assignment.id} className="flex flex-wrap items-center justify-between gap-3 py-3 first:pt-1 last:pb-1">
                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-aqua-800 dark:text-aqua-300">{assignment.subject}</p>
                  <p className="mt-1 text-sm font-semibold text-charcoal-900 dark:text-white">{assignment.title}</p>
                  <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">Due {assignment.due}</p>
                </div>
                <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${assignmentStatusClasses[assignment.status]}`}>{assignment.status}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900" aria-labelledby="student-activity-title">
          <div className="mb-4 flex items-center gap-2">
            <Activity className="h-4 w-4 text-gold-600" aria-hidden="true" />
            <h2 id="student-activity-title" className="text-lg font-bold text-charcoal-900 dark:text-white">Recent activity</h2>
          </div>
          <ol className="space-y-4">
            {data.activity.map((entry) => {
              const Icon = activityIcons[entry.kind];
              return (
                <li key={entry.id} className="flex gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-aqua-50 text-aqua-800 dark:bg-aqua-900/30 dark:text-aqua-300"><Icon className="h-4 w-4" /></span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                      <p className="text-sm font-semibold text-charcoal-900 dark:text-white">{entry.title}</p>
                      <time className="text-[10px] text-slate-500 dark:text-slate-400">{entry.time}</time>
                    </div>
                    <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-300">{entry.detail}</p>
                  </div>
                </li>
              );
            })}
          </ol>
          <Link href="/portal/student/messages" className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-aqua-800 underline-offset-4 hover:underline dark:text-aqua-300">
            <MessageSquare className="h-3.5 w-3.5" /> Open messages
          </Link>
        </section>
      </div>
    </section>
  );
}