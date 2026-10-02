'use client';

import React from 'react';
import { AnnouncementBar } from '@/components/public/AnnouncementBar';
import { Navbar } from '@/components/public/Navbar';
import { Footer } from '@/components/public/Footer';
import { EVENTS_DATA } from '@/lib/mockData';
import { Calendar, Clock, MapPin, Users, Download } from 'lucide-react';
import Link from 'next/link';

export default function EventsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1">
        <section className="bg-charcoal-900 text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-charcoal-800">
          <div className="max-w-7xl mx-auto space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-400">
              Institutional Diary
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight">
              School Events Calendar & Important Dates
            </h1>
            <p className="text-slate-300 max-w-2xl text-sm sm:text-base leading-relaxed">
              Stay up-to-date with term assessment schedules, sports derbies, parents consultation meetings, and mid-term breaks.
            </p>
          </div>
        </section>

        <section className="py-16 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold font-display text-charcoal-900">
                Scheduled Term 1 2026 Academic Events
              </h2>
              <Link
                href="/downloads"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-aqua-600 hover:bg-aqua-700 text-white text-xs font-bold transition-colors"
              >
                <Download className="w-3.5 h-3.5" /> Download Term 1 Calendar PDF
              </Link>
            </div>

            <div className="space-y-4">
              {EVENTS_DATA.map((evt) => (
                <div
                  key={evt.id}
                  className="bg-slate-50 rounded-2xl p-6 border border-slate-200 hover:border-aqua-400 hover:bg-white transition-all shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                  <div className="flex items-start gap-5">
                    <div className="w-16 h-16 rounded-xl bg-charcoal-900 text-white flex flex-col items-center justify-center shrink-0 border border-gold-400/40">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-gold-400">
                        {new Date(evt.startDate).toLocaleString('default', { month: 'short' })}
                      </span>
                      <span className="text-2xl font-extrabold leading-none mt-0.5">
                        {new Date(evt.startDate).getDate()}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-aqua-100 text-aqua-900">
                        {evt.category}
                      </span>
                      <h3 className="text-base font-bold text-charcoal-900">
                        {evt.title}
                      </h3>
                      <p className="text-xs text-slate-600 max-w-xl">
                        {evt.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-4 text-xs text-slate-500 shrink-0 border-t md:border-t-0 md:border-l border-slate-200 pt-4 md:pt-0 md:pl-6">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-aqua-600" />
                      <span>{evt.time}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-gold-600" />
                      <span>{evt.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-slate-400" />
                      <span>{evt.targetAudience}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
