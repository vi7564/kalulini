'use client';

import React from 'react';
import Link from 'next/link';
import { BLOG_POSTS_DATA, EVENTS_DATA } from '@/lib/mockData';
import { Calendar, Clock, MapPin, ArrowRight, BookOpen, Megaphone } from 'lucide-react';

export const NewsAndEventsSection: React.FC = () => {
  return (
    <section className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: School News & Bulletins (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-aqua-600">
                  School News & Stories
                </span>
                <h2 className="text-2xl font-extrabold font-display text-charcoal-900 tracking-tight mt-0.5">
                  Latest from the Kalulini Community
                </h2>
              </div>
              <Link
                href="/news"
                className="text-xs font-bold text-aqua-700 hover:text-aqua-800 flex items-center gap-1"
              >
                All News <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Featured Post Card */}
            {BLOG_POSTS_DATA.length > 0 && (
              <div className="bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-premium transition-all group">
                <div className="h-56 overflow-hidden relative">
                  <img
                    src={BLOG_POSTS_DATA[0].coverImage}
                    alt={BLOG_POSTS_DATA[0].title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-aqua-600 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md">
                    {BLOG_POSTS_DATA[0].category}
                  </span>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-slate-500 mb-2">
                    <span>{BLOG_POSTS_DATA[0].publishedAt}</span>
                    <span>&bull;</span>
                    <span>By {BLOG_POSTS_DATA[0].author} ({BLOG_POSTS_DATA[0].authorRole})</span>
                  </div>

                  <h3 className="text-lg font-bold text-charcoal-900 group-hover:text-aqua-700 transition-colors">
                    <Link href={`/news/${BLOG_POSTS_DATA[0].slug}`}>
                      {BLOG_POSTS_DATA[0].title}
                    </Link>
                  </h3>

                  <p className="text-xs text-slate-600 mt-2 leading-relaxed line-clamp-2">
                    {BLOG_POSTS_DATA[0].excerpt}
                  </p>

                  <div className="mt-4 pt-4 border-t border-slate-200/80 flex items-center justify-between">
                    <Link
                      href={`/news/${BLOG_POSTS_DATA[0].slug}`}
                      className="text-xs font-bold text-aqua-700 hover:text-aqua-800 flex items-center gap-1"
                    >
                      Read Full Article <ArrowRight className="w-3 h-3" />
                    </Link>
                    <span className="text-[11px] text-slate-400">
                      {BLOG_POSTS_DATA[0].readTimeMinutes} min read
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Secondary News List */}
            <div className="space-y-3">
              {BLOG_POSTS_DATA.slice(1, 3).map((post) => (
                <div
                  key={post.id}
                  className="p-4 rounded-xl border border-slate-200/90 bg-white hover:bg-slate-50 hover:border-aqua-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-[11px] text-slate-400">
                      <span className="font-semibold text-aqua-600">{post.category}</span>
                      <span>&bull;</span>
                      <span>{post.publishedAt}</span>
                    </div>
                    <h4 className="text-sm font-bold text-charcoal-900 hover:text-aqua-700 transition-colors">
                      <Link href={`/news/${post.slug}`}>{post.title}</Link>
                    </h4>
                  </div>
                  <Link
                    href={`/news/${post.slug}`}
                    className="text-xs font-semibold text-aqua-700 shrink-0 self-start sm:self-center"
                  >
                    Read &rarr;
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Upcoming School Calendar Events (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-gold-600">
                  Institutional Calendar
                </span>
                <h2 className="text-2xl font-extrabold font-display text-charcoal-900 tracking-tight mt-0.5">
                  Upcoming Term Events
                </h2>
              </div>
              <Link
                href="/events"
                className="text-xs font-bold text-aqua-700 hover:text-aqua-800 flex items-center gap-1"
              >
                All Events <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-4">
              {EVENTS_DATA.map((evt) => (
                <div
                  key={evt.id}
                  className="bg-slate-50/80 rounded-2xl p-5 border border-slate-200 hover:border-gold-400 hover:bg-white transition-all shadow-sm flex items-start gap-4"
                >
                  <div className="w-14 h-14 rounded-xl bg-charcoal-900 text-white flex flex-col items-center justify-center shrink-0 border border-gold-400/40">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-gold-400">
                      {new Date(evt.startDate).toLocaleString('default', { month: 'short' })}
                    </span>
                    <span className="text-lg font-extrabold leading-none">
                      {new Date(evt.startDate).getDate()}
                    </span>
                  </div>

                  <div className="space-y-1.5 flex-1 min-w-0">
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-slate-200/80 text-charcoal-800">
                      {evt.category}
                    </span>
                    <h4 className="text-sm font-bold text-charcoal-900 truncate">
                      {evt.title}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-2">
                      {evt.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-slate-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-aqua-600" /> {evt.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-gold-600" /> {evt.location}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Downloads Banner */}
            <div className="p-5 rounded-2xl bg-charcoal-900 text-white border border-charcoal-800 flex items-center justify-between gap-4">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-gold-400">
                  Official Academic Calendar
                </h4>
                <p className="text-xs text-slate-300 mt-0.5">
                  Download the comprehensive Term 1, 2, and 3 schedule PDF.
                </p>
              </div>
              <Link
                href="/downloads"
                className="px-3.5 py-2 rounded-lg bg-aqua-600 hover:bg-aqua-700 text-white text-xs font-bold shrink-0 transition-colors"
              >
                Download PDF
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
