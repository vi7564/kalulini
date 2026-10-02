'use client';

import React from 'react';
import { AnnouncementBar } from '@/components/public/AnnouncementBar';
import { Navbar } from '@/components/public/Navbar';
import { Footer } from '@/components/public/Footer';
import { LEADERSHIP_PROFILES } from '@/lib/mockData';
import { Compass, Target, Award, Shield, CheckCircle2, Quote, History, Users } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1">
        {/* Page Banner Header */}
        <section className="bg-charcoal-900 text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-charcoal-800 relative overflow-hidden">
          <div className="max-w-7xl mx-auto space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-400">
              Institutional Heritage & Leadership
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight">
              About Kalulini Boys High School
            </h1>
            <p className="text-slate-300 max-w-2xl text-sm sm:text-base leading-relaxed">
              Founded on the pillars of academic excellence, upright character, and selfless service. Discover our historical journey, vision, and governance.
            </p>
          </div>
        </section>

        {/* History & Profile */}
        <section className="py-16 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 space-y-5">
                <div className="flex items-center gap-2 text-aqua-600 font-bold text-xs uppercase tracking-wider">
                  <History className="w-4 h-4" /> Established Foundations
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold font-display text-charcoal-900">
                  A Legacy of Cultivating Academic Titans in Makueni County
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Established to answer the community&apos;s yearning for high-standard, disciplined secondary education for boys, Kalulini Boys High School has steadily grown into a respected Extra-County public institution. Over the decades, we have expanded our capacity to over 800 boarding students, maintained a distinguished faculty, and upgraded our campus to accommodate cutting-edge STEM laboratories and digital curriculum suites.
                </p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Our educational philosophy recognizes that intellectual genius must always be coupled with emotional maturity, spiritual grounding, and deep civic duty. Alumni of Kalulini currently serve as physicians, engineers, educators, and public leaders across Kenya and internationally.
                </p>
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-2xl overflow-hidden border-2 border-slate-200 shadow-premium">
                  <img
                    src="https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=800&q=80"
                    alt="Kalulini Campus Assembly"
                    className="w-full h-80 object-cover"
                  />
                  <div className="p-4 bg-slate-50 border-t border-slate-200 text-xs text-slate-600">
                    Students engaged in morning devotional assembly and flag raising ceremony.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vision, Mission, and Core Values */}
        <section id="vision" className="py-16 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-aqua-600">
                Foundational Principles
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-charcoal-900 mt-1">
                Vision, Mission & Guiding Core Values
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-aqua-50 border border-aqua-200 text-aqua-600 flex items-center justify-center mb-4">
                    <Compass className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-charcoal-900 mb-2">Our Vision</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    To be a leading center of academic excellence and holistic character formation that produces upright, self-driven, and transformational leaders for the nation and the world.
                  </p>
                </div>
              </div>

              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 text-gold-500 flex items-center justify-center mb-4">
                    <Target className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-charcoal-900 mb-2">Our Mission</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    To provide quality, holistic, and value-based secondary education that nurtures cognitive excellence, empirical curiosity, moral integrity, physical fitness, and servant leadership.
                  </p>
                </div>
              </div>
            </div>

            {/* Core Values */}
            <div id="values" className="bg-charcoal-900 text-white rounded-3xl p-8 sm:p-12 border border-charcoal-800">
              <div className="text-center max-w-lg mx-auto mb-8">
                <span className="text-xs font-bold uppercase tracking-widest text-gold-400">
                  Institutional Pillars
                </span>
                <h3 className="text-2xl font-bold font-display mt-1">Our Core Values</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { title: 'Academic Distinction', desc: 'Relentless pursuit of knowledge, rigorous study habits, and intellectual curiosity.' },
                  { title: 'Moral Integrity', desc: 'Uncompromising honesty, truthfulness, and ethical transparency in all actions.' },
                  { title: 'Discipline & Self-Control', desc: 'Respect for order, adherence to institutional regulations, and time stewardship.' },
                  { title: 'Servant Leadership', desc: 'Leading by example, humility, and putting community welfare ahead of selfish interest.' },
                  { title: 'Innovation & Research', desc: 'Empirical experimentation, STEM problem-solving, and creative enterprise.' },
                  { title: 'Mutual Respect & Brotherhood', desc: 'Respecting peers, honoring faculty, and fostering inclusive school fellowship.' }
                ].map((val, i) => (
                  <div key={i} className="bg-charcoal-800/80 p-5 rounded-xl border border-charcoal-700/80">
                    <h4 className="text-gold-400 font-bold text-sm mb-1">{val.title}</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">{val.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Leadership & Board of Management */}
        <section id="leadership" className="py-16 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-aqua-600">
                Governance & Faculty
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-charcoal-900 mt-1">
                Institutional Leadership & Board of Management
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-2">
                Profiles of the senior educators and governance trustees steering Kalulini Boys High School.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {LEADERSHIP_PROFILES.map((leader) => (
                <div
                  key={leader.id}
                  className="bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-premium transition-all flex flex-col group"
                >
                  <div className="h-64 overflow-hidden relative">
                    <img
                      src={leader.photoURL}
                      alt={leader.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-bold text-sm text-charcoal-900 group-hover:text-aqua-700 transition-colors">
                        {leader.name}
                      </h4>
                      <p className="text-xs font-bold text-aqua-700 uppercase mt-0.5">
                        {leader.role}
                      </p>
                      <p className="text-[11px] text-gold-600 font-semibold mt-1">
                        {leader.credentials}
                      </p>
                      <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                        {leader.bio}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Principal's Detailed Message */}
        <section id="principal" className="py-16 bg-slate-50 border-b border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-premium space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-aqua-600 shrink-0">
                  <img
                    src={LEADERSHIP_PROFILES[0].photoURL}
                    alt={LEADERSHIP_PROFILES[0].name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-charcoal-900">{LEADERSHIP_PROFILES[0].name}</h3>
                  <p className="text-xs text-aqua-700 font-bold uppercase">{LEADERSHIP_PROFILES[0].role}</p>
                </div>
              </div>

              <div className="prose text-xs sm:text-sm text-slate-700 leading-relaxed space-y-4">
                <p>
                  It gives me profound pleasure to welcome prospective parents, guardians, students, alumni, and stakeholders to the official digital portal of Kalulini Boys High School.
                </p>
                <p>
                  As an institution of learning, our primary task is to kindle the flame of intellect. In a rapidly transforming world driven by technology and scientific discovery, we provide an academic framework that insists on depth, analytical precision, and genuine comprehension. We do not drill for tests; we prepare boys for life.
                </p>
                <p>
                  Equally paramount is the question of character. High academic scores divorced from moral responsibility lead to ruin. At Kalulini Boys, every student learns that privileges are earned through responsibility, that honesty is non-negotiable, and that leadership is best exercised through service to others.
                </p>
                <p>
                  I invite parents seeking an institution where their son will be personally known, mentored, challenged, and inspired to apply for admission to Kalulini Boys High School.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="font-display font-bold text-sm text-charcoal-900 block">Dr. Josephat M. Ndambuki</span>
                  <span className="text-xs text-slate-500">Chief Principal & Secretary to BOM</span>
                </div>
                <div className="text-xs text-slate-400 italic">Office of the Principal</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
