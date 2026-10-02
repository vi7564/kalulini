'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Bell, BookOpenCheck, CalendarCheck2, ChartNoAxesCombined, ChevronRight, Clock3, ShieldCheck, TrendingUp } from 'lucide-react';
import { PortalLayout } from '@/components/portal/PortalLayout';
import { RouteGuard } from '@/components/portal/RouteGuard';

const summaryCards = [
  { label: 'Attendance', value: '96.8%', delta: '+2.4%', accent: 'bg-emerald-500/10 text-emerald-600', icon: ShieldCheck },
  { label: 'Average Score', value: '82.4', delta: '+5.1%', accent: 'bg-aqua-500/10 text-aqua-600', icon: ChartNoAxesCombined },
  { label: 'Assignments', value: '14', delta: '3 due soon', accent: 'bg-amber-500/10 text-amber-600', icon: BookOpenCheck },
  { label: 'Upcoming', value: '6', delta: '2 events this week', accent: 'bg-violet-500/10 text-violet-600', icon: CalendarCheck2 }
];

const upcomingEvents = [
  { title: 'Form 3 revision bootcamp', date: 'Tue, 08 Apr • 08:00 AM', location: 'Main Hall', type: 'Academic' },
  { title: 'Inter-house sports day', date: 'Thu, 10 Apr • 08:30 AM', location: 'School Field', type: 'Sports' },
  { title: 'Parent consultation forum', date: 'Fri, 11 Apr • 02:00 PM', location: 'Boardroom', type: 'Parent' }
];

const notifications = [
  { title: 'Fee statement updated', detail: 'Term 1 balance was reconciled and published.', time: '10 mins ago' },
  { title: 'New assignment published', detail: 'English literature project is now live in your portal.', time: '2 hours ago' },
  { title: 'Attendance milestone', detail: 'Your weekly attendance rate is above target.', time: 'Yesterday' }
];

export default function PortalDashboardPage() {
  return (
    <RouteGuard>
      <PortalLayout title="Dashboard Overview" subtitle="Your school activity, academic pulse, and key alerts in one place.">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {summaryCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: index * 0.08 }}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">{card.label}</p>
                    <p className="mt-3 text-3xl font-black tracking-tight text-slate-900 dark:text-white">{card.value}</p>
                  </div>
                  <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${card.accent}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between text-xs font-semibold">
                  <span className="text-emerald-600 dark:text-emerald-400">{card.delta}</span>
                  <span className="text-slate-400">vs last period</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.4fr,0.9fr]">
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 0.12 }}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Calendar</p>
                <h2 className="mt-1 text-xl font-black text-slate-900 dark:text-white">Upcoming school events</h2>
              </div>
              <Link href="/portal/student" className="inline-flex items-center gap-1 text-xs font-semibold text-aqua-600 hover:text-aqua-500">
                View all <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="space-y-3">
              {upcomingEvents.map((event) => (
                <div key={event.title} className="flex items-start justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/60">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex h-9 w-9 items-center justify-center rounded-lg bg-aqua-100 text-aqua-700 dark:bg-aqua-900/30 dark:text-aqua-300">
                      <CalendarCheck2 className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">{event.title}</p>
                      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{event.date}</p>
                      <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{event.location}</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-slate-200 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-700 dark:bg-slate-700 dark:text-slate-200">
                    {event.type}
                  </span>
                </div>
              ))}
            </div>
          </motion.section>

          <motion.aside
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 0.16 }}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Alerts</p>
                <h2 className="mt-1 text-xl font-black text-slate-900 dark:text-white">Notifications</h2>
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
                <Bell className="h-4 w-4" />
              </div>
            </div>

            <div className="space-y-3">
              {notifications.map((item) => (
                <div key={item.title} className="rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800/60">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{item.title}</p>
                    <span className="text-[10px] font-semibold text-slate-400">{item.time}</span>
                  </div>
                  <p className="mt-2 text-xs leading-5 text-slate-600 dark:text-slate-300">{item.detail}</p>
                </div>
              ))}
            </div>
          </motion.aside>
        </div>

        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.2 }}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Performance</p>
              <h2 className="mt-1 text-xl font-black text-slate-900 dark:text-white">Academic momentum</h2>
            </div>
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
              <TrendingUp className="h-4 w-4" />
              <span className="text-xs font-semibold">Up 8.4% this term</span>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { label: 'Form 3 Science', value: '89%', band: 'Top 5%' },
              { label: 'English literature', value: '86%', band: 'Strong analysis' },
              { label: 'Physics practicals', value: '91%', band: 'Excellent lab execution' }
            ].map((item) => (
              <div key={item.label} className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/50">
                <div className="mb-3 flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
                  <span>{item.label}</span>
                  <span>{item.value}</span>
                </div>
                <div className="h-2.5 rounded-full bg-slate-200 dark:bg-slate-700">
                  <div className="h-2.5 rounded-full bg-gradient-to-r from-aqua-500 to-emerald-500" style={{ width: item.value }} />
                </div>
                <p className="mt-3 text-xs text-slate-600 dark:text-slate-300">{item.band}</p>
              </div>
            ))}
          </div>
        </motion.section>
      </PortalLayout>
    </RouteGuard>
  );
}
