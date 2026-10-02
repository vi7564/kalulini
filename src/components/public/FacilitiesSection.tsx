'use client';

import React from 'react';
import Link from 'next/link';
import { FACILITIES_DATA } from '@/lib/mockData';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export const FacilitiesSection: React.FC = () => {
  return (
    <section className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-aqua-600">
              Campus Infrastructure
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-charcoal-900 tracking-tight mt-1">
              Purpose-Built Facilities Supporting 21st-Century Learning
            </h2>
            <p className="text-sm text-slate-600 mt-2 max-w-2xl">
              From advanced science laboratories to modern residential dormitories and athletic fields, our campus is designed for focused study and well-being.
            </p>
          </div>

          <Link
            href="/facilities"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-sm font-bold text-aqua-700 hover:text-aqua-800 transition-colors"
          >
            Tour All Campus Facilities <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FACILITIES_DATA.map((fac) => (
            <div
              key={fac.id}
              className="bg-slate-50/70 rounded-2xl overflow-hidden border border-slate-200 hover:border-aqua-400 transition-all shadow-sm hover:shadow-premium flex flex-col group"
            >
              <div className="h-44 overflow-hidden relative">
                <img
                  src={fac.imageURL}
                  alt={fac.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider bg-charcoal-950/80 text-white px-2.5 py-1 rounded-full backdrop-blur-sm">
                  {fac.category}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-sm text-charcoal-900 group-hover:text-aqua-700 transition-colors">
                    {fac.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {fac.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/80 space-y-1.5">
                  {fac.features.slice(0, 2).map((feat, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-[11px] text-slate-600">
                      <CheckCircle2 className="w-3.5 h-3.5 text-aqua-600 shrink-0" />
                      <span className="truncate">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
