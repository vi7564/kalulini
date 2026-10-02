'use client';

import React from 'react';
import { AnnouncementBar } from '@/components/public/AnnouncementBar';
import { Navbar } from '@/components/public/Navbar';
import { Footer } from '@/components/public/Footer';
import { FACILITIES_DATA } from '@/lib/mockData';
import { CheckCircle2, Building, ShieldCheck, Wifi, Award } from 'lucide-react';

export default function FacilitiesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1">
        <section className="bg-charcoal-900 text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-charcoal-800">
          <div className="max-w-7xl mx-auto space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-400">
              Campus Infrastructure & Environments
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight">
              Modern Campus Facilities
            </h1>
            <p className="text-slate-300 max-w-2xl text-sm sm:text-base leading-relaxed">
              Equipped with modern scientific laboratories, digital learning suites, hygienic boarding dormitories, and expansive sports grounds.
            </p>
          </div>
        </section>

        <section className="py-16 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {FACILITIES_DATA.map((fac) => (
                <div
                  key={fac.id}
                  className="bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-premium transition-all flex flex-col group"
                >
                  <div className="h-64 overflow-hidden relative">
                    <img
                      src={fac.imageURL}
                      alt={fac.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-4 left-4 bg-charcoal-950/80 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full backdrop-blur-sm">
                      {fac.category}
                    </span>
                  </div>

                  <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-charcoal-900 group-hover:text-aqua-700 transition-colors">
                        {fac.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                        {fac.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {fac.features.map((feat, i) => (
                        <div key={i} className="flex items-center gap-2 text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-aqua-600 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Additional Safety & Health Amenities */}
            <div className="bg-charcoal-900 text-white rounded-3xl p-8 sm:p-12 border border-charcoal-800">
              <h3 className="text-xl font-bold font-display text-gold-400 mb-6">
                Health, Safety & Environmental Standards
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-slate-300">
                <div className="space-y-2">
                  <h4 className="font-bold text-white text-sm">24/7 School Sickbay</h4>
                  <p>Staffed by a qualified resident registered clinical nurse for minor ailments, first aid, and urgent triage coordination with Makueni County Referral Hospital.</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold text-white text-sm">Clean Water & Green Energy</h4>
                  <p>On-site high-yield borehole with solar filtration pumps, water purification stations, and solar thermal water heating across all dormitory ablution blocks.</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold text-white text-sm">Perimeter Security & CCTV</h4>
                  <p>Guarded access gates, perimeter stone wall, round-the-clock trained security guards, and fire extinguisher stations in all science and boarding blocks.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
