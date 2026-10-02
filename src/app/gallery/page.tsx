'use client';

import { AnnouncementBar } from '@/components/public/AnnouncementBar';
import { Navbar } from '@/components/public/Navbar';
import { Footer } from '@/components/public/Footer';
import { GALLERY_ITEMS_DATA } from '@/lib/mockData';
import { GalleryExperience } from '@/components/public/GalleryExperience';

export default function GalleryPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1">
        <section className="bg-charcoal-900 text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-charcoal-800">
          <div className="max-w-7xl mx-auto space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-400">
              Visual Archives
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight">
              School Photo Gallery
            </h1>
            <p className="text-slate-300 max-w-2xl text-sm sm:text-base leading-relaxed">
              Explore photographic highlights capturing moments of scholarship, laboratory research, athletic achievement, and school ceremonies.
            </p>
          </div>
        </section>

        <section className="py-12 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <GalleryExperience items={GALLERY_ITEMS_DATA} />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
