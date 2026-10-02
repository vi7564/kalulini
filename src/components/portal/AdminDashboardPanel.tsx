'use client';

import { useMemo, useState } from 'react';
import { BarChart3, CheckCircle2, Megaphone, Send, Users, Wallet } from 'lucide-react';
import { Cell, Funnel, FunnelChart, LabelList, ResponsiveContainer, Tooltip } from 'recharts';
import { ADMIN_DASHBOARD_DATA, type AdminArrearsRow } from '../../../data/portalDashboards';

type ArrearsSort = 'class' | 'term';

export function AdminDashboardPanel() {
  const [classFilter, setClassFilter] = useState('All classes');
  const [termFilter, setTermFilter] = useState('All terms');
  const [sortBy, setSortBy] = useState<ArrearsSort>('class');
  const [sortAscending, setSortAscending] = useState(true);
  const [announcementTitle, setAnnouncementTitle] = useState('');
  const [announcementMessage, setAnnouncementMessage] = useState('');
  const [announcements, setAnnouncements] = useState<{ id: string; title: string; message: string; time: string }[]>([]);

  const classOptions = Array.from(new Set(ADMIN_DASHBOARD_DATA.arrears.map((row) => row.class)));
  const arrears = useMemo(() => ADMIN_DASHBOARD_DATA.arrears
    .filter((row) => classFilter === 'All classes' || row.class === classFilter)
    .filter((row) => termFilter === 'All terms' || row.term === termFilter)
    .slice()
    .sort((left, right) => {
      const result = left[sortBy].localeCompare(right[sortBy]);
      return sortAscending ? result : -result;
    }), [classFilter, sortAscending, sortBy, termFilter]);

  const sortTable = (column: ArrearsSort) => {
    if (sortBy === column) setSortAscending((value) => !value);
    else {
      setSortBy(column);
      setSortAscending(true);
    }
  };

  const broadcast = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const title = announcementTitle.trim();
    const message = announcementMessage.trim();
    if (!title || !message) return;
    setAnnouncements((current) => [{ id: `announcement-${Date.now()}`, title, message, time: 'Just now' }, ...current]);
    setAnnouncementTitle('');
    setAnnouncementMessage('');
  };

  const kpis = [
    { label: 'Total students', value: ADMIN_DASHBOARD_DATA.totalStudents.toLocaleString(), detail: 'Active enrolment', icon: Users, color: 'text-aqua-800 dark:text-aqua-300' },
    { label: 'Total staff', value: `${ADMIN_DASHBOARD_DATA.totalStaff}`, detail: 'Teaching and support', icon: Users, color: 'text-charcoal-800 dark:text-slate-100' },
    { label: 'Fee collection rate', value: `${ADMIN_DASHBOARD_DATA.feeCollectionRate}%`, detail: 'Current term', icon: Wallet, color: 'text-gold-700 dark:text-gold-300' },
    { label: 'Attendance rate', value: `${ADMIN_DASHBOARD_DATA.attendanceRate}%`, detail: 'School-wide today', icon: CheckCircle2, color: 'text-emerald-700 dark:text-emerald-300' },
  ];

  return (
    <section aria-label="Admin dashboard" className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map(({ label, value, detail, icon: Icon, color }) => (
          <div key={label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold text-slate-600 dark:text-slate-300">{label}</p>
                <p className={`mt-2 text-2xl font-black ${color}`}>{value}</p>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">{detail}</p>
              </div>
              <Icon className={`h-5 w-5 ${color}`} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-[0.85fr_1.15fr]">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900" aria-labelledby="enrollment-funnel-title">
          <div className="mb-3 flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-aqua-700 dark:text-aqua-300" />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-aqua-700 dark:text-aqua-300">Admissions</p>
              <h2 id="enrollment-funnel-title" className="text-lg font-bold text-charcoal-900 dark:text-white">Enrollment funnel</h2>
            </div>
          </div>
          <div className="h-64 w-full" role="img" aria-label="Applications to active enrollment funnel">
            <ResponsiveContainer width="100%" height="100%">
              <FunnelChart>
                <Tooltip formatter={(value: number) => [`${value} learners`, '']} />
                <Funnel dataKey="count" data={ADMIN_DASHBOARD_DATA.enrollmentFunnel} isAnimationActive={false}>
                  <LabelList dataKey="stage" position="right" fill="#1F1F1F" stroke="none" fontSize={12} />
                  {ADMIN_DASHBOARD_DATA.enrollmentFunnel.map((entry) => <Cell key={entry.stage} fill={entry.fill} />)}
                </Funnel>
              </FunnelChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-3 gap-2 border-t border-slate-200 pt-3 dark:border-slate-800">
            {ADMIN_DASHBOARD_DATA.enrollmentFunnel.map((step) => (
              <div key={step.stage} className="text-center">
                <p className="text-lg font-black text-charcoal-900 dark:text-white">{step.count}</p>
                <p className="text-[10px] font-semibold text-slate-600 dark:text-slate-300">{step.stage}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900" aria-labelledby="arrears-title">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-gold-700 dark:text-gold-300">Finance</p>
              <h2 id="arrears-title" className="mt-1 text-lg font-bold text-charcoal-900 dark:text-white">Fee arrears</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              <label className="sr-only" htmlFor="arrears-class">Filter arrears by class</label>
              <select id="arrears-class" value={classFilter} onChange={(event) => setClassFilter(event.target.value)} className="rounded-lg border border-slate-300 bg-white px-2.5 py-2 text-xs text-slate-800 focus:border-aqua-600 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white">
                <option>All classes</option>
                {classOptions.map((name) => <option key={name}>{name}</option>)}
              </select>
              <label className="sr-only" htmlFor="arrears-term">Filter arrears by term</label>
              <select id="arrears-term" value={termFilter} onChange={(event) => setTermFilter(event.target.value)} className="rounded-lg border border-slate-300 bg-white px-2.5 py-2 text-xs text-slate-800 focus:border-aqua-600 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white">
                <option>All terms</option>
                <option>Term 1</option>
                <option>Term 2</option>
                <option>Term 3</option>
              </select>
            </div>
          </div>
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-[620px] w-full text-left text-xs">
              <thead className="border-b border-slate-200 text-slate-600 dark:border-slate-700 dark:text-slate-300">
                <tr>
                  <th className="py-2 pr-3 font-semibold">Student</th>
                  <th className="py-2 pr-3 font-semibold"><button type="button" onClick={() => sortTable('class')} aria-sort={sortBy === 'class' ? (sortAscending ? 'ascending' : 'descending') : 'none'} className="underline decoration-dotted underline-offset-4">Class</button></th>
                  <th className="py-2 pr-3 font-semibold"><button type="button" onClick={() => sortTable('term')} aria-sort={sortBy === 'term' ? (sortAscending ? 'ascending' : 'descending') : 'none'} className="underline decoration-dotted underline-offset-4">Term</button></th>
                  <th className="py-2 text-right font-semibold">Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {arrears.map((row: AdminArrearsRow) => (
                  <tr key={`${row.admissionNo}-${row.term}`}>
                    <td className="py-3 pr-3"><p className="font-semibold text-charcoal-900 dark:text-white">{row.student}</p><p className="mt-0.5 font-mono text-[10px] text-slate-600 dark:text-slate-300">{row.admissionNo}</p></td>
                    <td className="py-3 pr-3 text-slate-700 dark:text-slate-200">{row.class}</td>
                    <td className="py-3 pr-3 text-slate-700 dark:text-slate-200">{row.term}</td>
                    <td className="py-3 text-right font-bold text-amber-700 dark:text-amber-300">KES {row.balance.toLocaleString()}</td>
                  </tr>
                ))}
                {arrears.length === 0 && <tr><td colSpan={4} className="py-8 text-center text-slate-600 dark:text-slate-300">No arrears match these filters.</td></tr>}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      <div className="grid gap-5 xl:grid-cols-[1fr_1fr]">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900" aria-labelledby="staff-list-title">
          <div className="mb-4 flex items-center gap-2">
            <Users className="h-4 w-4 text-aqua-700 dark:text-aqua-300" />
            <h2 id="staff-list-title" className="text-lg font-bold text-charcoal-900 dark:text-white">Staff & assigned classes</h2>
          </div>
          <ul className="divide-y divide-slate-200 dark:divide-slate-800">
            {ADMIN_DASHBOARD_DATA.staff.map((member) => (
              <li key={member.name} className="flex flex-wrap items-center justify-between gap-3 py-3 first:pt-1 last:pb-1">
                <div>
                  <p className="text-sm font-semibold text-charcoal-900 dark:text-white">{member.name}</p>
                  <p className="mt-1 text-xs text-aqua-800 dark:text-aqua-300">{member.role}</p>
                </div>
                <p className="max-w-52 text-right text-xs leading-5 text-slate-600 dark:text-slate-300">{member.classes}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900" aria-labelledby="announcement-composer-title">
          <div className="mb-4 flex items-center gap-2">
            <Megaphone className="h-4 w-4 text-gold-700 dark:text-gold-300" />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-gold-700 dark:text-gold-300">Broadcast</p>
              <h2 id="announcement-composer-title" className="text-lg font-bold text-charcoal-900 dark:text-white">Announcement composer</h2>
            </div>
          </div>
          <form onSubmit={broadcast} className="space-y-3">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200">Audience
              <input readOnly value="All portals" className="mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200" />
            </label>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200">Title
              <input required value={announcementTitle} onChange={(event) => setAnnouncementTitle(event.target.value)} maxLength={90} className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-charcoal-900 focus:border-aqua-600 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
            </label>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200">Message
              <textarea required rows={3} value={announcementMessage} onChange={(event) => setAnnouncementMessage(event.target.value)} maxLength={500} className="mt-1.5 w-full resize-y rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-charcoal-900 focus:border-aqua-600 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
            </label>
            <button type="submit" className="inline-flex items-center gap-2 rounded-lg bg-charcoal-900 px-4 py-2.5 text-xs font-bold text-white hover:bg-charcoal-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aqua-600">
              <Send className="h-3.5 w-3.5" /> Broadcast to all portals
            </button>
          </form>
          {announcements.length > 0 && (
            <div className="mt-4 border-t border-slate-200 pt-4 dark:border-slate-800" aria-live="polite">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-300">Most recent broadcast · {announcements[0].time}</p>
              <h3 className="mt-1 text-sm font-bold text-charcoal-900 dark:text-white">{announcements[0].title}</h3>
              <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-300">{announcements[0].message}</p>
            </div>
          )}
        </section>
      </div>
    </section>
  );
}