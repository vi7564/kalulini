'use client';

import React from 'react';
import { AnnouncementBar } from '@/components/public/AnnouncementBar';
import { Navbar } from '@/components/public/Navbar';
import { Footer } from '@/components/public/Footer';
import { Trophy, Compass, ShieldCheck, HeartHandshake, Bed, Award, Users } from 'lucide-react';

export default function StudentLifePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1">
        {/* Banner */}
        <section className="bg-charcoal-900 text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-charcoal-800">
          <div className="max-w-7xl mx-auto space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-400">
              Co-Curriculars & Residential Experience
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight">
              Student Life, Sports & Boarding Culture
            </h1>
            <p className="text-slate-300 max-w-2xl text-sm sm:text-base leading-relaxed">
              At Kalulini Boys High School, education thrives both inside and outside the classroom. Discover our athletics, clubs, house system, and boarding community.
            </p>
          </div>
        </section>

        {/* Sports & Athletics */}
        <section id="sports" className="py-16 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 space-y-4">
                <span className="text-xs font-bold uppercase tracking-widest text-aqua-600">
                  Athletic Excellence
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold font-display text-charcoal-900">
                  Championship Spirit in Competitive Sports
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Physical discipline, teamwork, and stamina are nurtured every afternoon on our standard sports pavilion. Our Rugby 7s & 15s squads, football team, volleyball players, and cross-country marathoners routinely represent the sub-county at regional championships.
                </p>

                <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                    <strong className="text-charcoal-900 block font-bold">Rugby 7s & 15s</strong>
                    <span className="text-slate-600">The Kalulini Stallions team with dedicated tactical coaching.</span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                    <strong className="text-charcoal-900 block font-bold">Kalulini FC</strong>
                    <span className="text-slate-600">Competitive soccer fielding junior and senior varsity sides.</span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                    <strong className="text-charcoal-900 block font-bold">Basketball & Volleyball</strong>
                    <span className="text-slate-600">FIBA-compliant outdoor court and inter-school tournaments.</span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                    <strong className="text-charcoal-900 block font-bold">Athletics & Marathon</strong>
                    <span className="text-slate-600">Sprint, middle distance, hurdles, and endurance cross-country.</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="rounded-2xl overflow-hidden border-2 border-slate-200 shadow-premium">
                  <img
                    src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80"
                    alt="Kalulini Football Derby"
                    className="w-full h-80 object-cover"
                  />
                  <div className="p-4 bg-slate-50 text-xs text-slate-600">
                    Students competing during the annual Inter-House Football Championship.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Clubs & Societies */}
        <section id="clubs" className="py-16 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-gold-600">
                Intellectual & Cultural Societies
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-charcoal-900 mt-1">
                Clubs, STEM Innovation & Leadership
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'Young Scientists & Robotics Club', desc: 'Promoting empirical scientific design, automated mechanics, and green energy innovations for the Kenya Science and Engineering Fair.' },
                { title: 'Great Debaters & Oratory Society', desc: 'Sharpening parliamentary debate, rhetoric, diction, impromptu public speaking, and essay writing competitions.' },
                { title: 'Kenya Scouts Association Movement', desc: 'Instilling outdoor survival skills, first-aid, navigation, emergency drill management, and community voluntary service.' },
                { title: 'Christian Union & YCS', desc: 'Fostering spiritual growth, ethical reflection, weekly devotions, choir recitals, and character guidance.' },
                { title: 'President\'s Award-Kenya Scheme', desc: 'Empowering boys with international physical challenge badges, wilderness expedition, and civic mentorship.' },
                { title: 'Journalism & Media Club', desc: 'Producing the school termly bulletin, photography coverage, campus announcements, and radio broadcasting.' }
              ].map((club, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-charcoal-900 mb-2">{club.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{club.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Boarding & House System */}
        <section id="boarding" className="py-16 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-widest text-aqua-600">
                Residential Life
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-charcoal-900 mt-1">
                The Four Traditional Boarding Houses
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-2">
                A structured pastoral care framework fostering fraternity, sanitation, and leadership.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: 'Simba House', color: 'border-amber-400 bg-amber-50/50', motto: 'Bravery & Strength', patron: 'Mr. David Mutiso' },
                { name: 'Chui House', color: 'border-blue-400 bg-blue-50/50', motto: 'Agility & Precision', patron: 'Mr. Titus Kilonzo' },
                { name: 'Kifaru House', color: 'border-emerald-400 bg-emerald-50/50', motto: 'Steadfast Resilience', patron: 'Mr. Patrick Wanyama' },
                { name: 'Twiga House', color: 'border-purple-400 bg-purple-50/50', motto: 'Vision & Distinction', patron: 'Mrs. Florence Nduku' }
              ].map((house, i) => (
                <div key={i} className={`p-6 rounded-2xl border-2 ${house.color} shadow-sm space-y-3`}>
                  <div className="w-10 h-10 rounded-xl bg-charcoal-900 text-white flex items-center justify-center font-bold text-sm">
                    {house.name.charAt(0)}
                  </div>
                  <h3 className="font-bold text-base text-charcoal-900">{house.name}</h3>
                  <p className="text-xs text-slate-600 italic">&ldquo;{house.motto}&rdquo;</p>
                  <div className="pt-2 border-t border-slate-200 text-xs text-slate-500">
                    House Master: <strong>{house.patron}</strong>
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
