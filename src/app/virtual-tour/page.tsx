'use client';

import Link from 'next/link';
import { AnnouncementBar } from '@/components/public/AnnouncementBar';
import { Navbar } from '@/components/public/Navbar';
import { Footer } from '@/components/public/Footer';
import { VirtualTourExplorer } from '@/components/public/VirtualTourExplorer';

export default function VirtualTourPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-800">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1">
        <section className="border-b border-charcoal-800 bg-charcoal-900 px-4 py-16 text-white sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-gold-400">Virtual tour</span>
            <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">Explore our campus from anywhere</h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
              Take a guided look at the learning spaces, student facilities, and welcoming environment that define the Kalulini experience.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <VirtualTourExplorer />
        </section>

        <section className="border-y border-slate-200 bg-white px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-2xl font-bold text-charcoal-900">Visit Kalulini in person</h2>
              <p className="mt-2 text-sm text-slate-600">Contact the school to arrange a campus visit and meet our community.</p>
            </div>
            <Link href="/contact" className="rounded-lg bg-aqua-700 px-5 py-3 text-sm font-semibold text-white hover:bg-aqua-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aqua-700">
              Contact the school
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
