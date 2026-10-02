'use client';

import React from 'react';
import Link from 'next/link';
import { GALLERY_ITEMS_DATA } from '@/lib/mockData';
import { Camera, ArrowRight } from 'lucide-react';

export const GalleryPreview: React.FC = () => {
  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-aqua-600">
              School Moments
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-charcoal-900 tracking-tight mt-1">
              Life at Kalulini Boys High School in Pictures
            </h2>
            <p className="text-sm text-slate-600 mt-2 max-w-2xl">
              Glimpses of academic discovery, sporting derbies, laboratory research, and cultural celebrations.
            </p>
          </div>

          <Link
            href="/gallery"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-sm font-bold text-aqua-700 hover:text-aqua-800 transition-colors"
          >
            Open Complete Gallery <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {GALLERY_ITEMS_DATA.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-charcoal-900 aspect-square"
            >
              <img
                src={item.imageURL}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/90 via-charcoal-950/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-5 text-white">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gold-400 mb-1">
                  {item.category === 'Campus' ? 'Grounds & Facilities' : item.category}
                </span>
                <h4 className="text-sm font-bold leading-tight">{item.title}</h4>
                <p className="text-[11px] text-slate-300 mt-1 line-clamp-2">{item.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
