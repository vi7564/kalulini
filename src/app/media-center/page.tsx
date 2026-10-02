'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowRight, Camera, Newspaper, PlayCircle } from 'lucide-react';
import { AnnouncementBar } from '@/components/public/AnnouncementBar';
import { Navbar } from '@/components/public/Navbar';
import { Footer } from '@/components/public/Footer';
import { GALLERY_ITEMS_DATA } from '@/lib/mockData';

const heroPhotos = GALLERY_ITEMS_DATA.slice(0, 6);
const galleryTeaserPhotos = GALLERY_ITEMS_DATA.slice(0, 4);

const mediaSections = [
  {
    title: 'Photo Gallery',
    description: 'Browse campus life, academic moments, sports, and school events through our curated visual archive.',
    href: '/gallery',
    icon: Camera,
  },
  {
    title: 'Video Highlights',
    description: 'Explore school stories, celebrations, and student achievements captured in video.',
    href: '/events',
    icon: PlayCircle,
  },
  {
    title: 'Press & Updates',
    description: 'Stay informed through the latest school announcements, media features, and public updates.',
    href: '/news',
    icon: Newspaper,
  },
];

const showcase = [
  {
    title: 'STEM Week Showcase',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80',
    tag: 'Innovation',
  },
  {
    title: 'Inter-House Sports Day',
    image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1200&q=80',
    tag: 'Sports',
  },
  {
    title: 'School Assembly Highlights',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
    tag: 'Campus Life',
  },
];

export default function MediaCenterPage() {
  const [heroIndex, setHeroIndex] = useState(0);
  const [previousHeroIndex, setPreviousHeroIndex] = useState<number | null>(null);
  const [heroHovered, setHeroHovered] = useState(false);
  const transitionTimer = useRef<number | null>(null);

  useEffect(() => () => {
    if (transitionTimer.current !== null) window.clearTimeout(transitionTimer.current);
  }, []);

  useEffect(() => {
    const nextPhoto = heroPhotos[(heroIndex + 1) % heroPhotos.length];
    const image = new Image();
    image.src = nextPhoto.imageURL;
  }, [heroIndex]);

  const changeHero = useCallback((nextIndex: number) => {
    if (nextIndex === heroIndex) return;
    setPreviousHeroIndex(heroIndex);
    setHeroIndex(nextIndex);
    if (transitionTimer.current !== null) window.clearTimeout(transitionTimer.current);
    const duration = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 150 : 700;
    transitionTimer.current = window.setTimeout(() => {
      setPreviousHeroIndex(null);
      transitionTimer.current = null;
    }, duration);
  }, [heroIndex]);

  useEffect(() => {
    if (heroHovered || heroPhotos.length < 2) return;
    const timer = window.setTimeout(() => changeHero((heroIndex + 1) % heroPhotos.length), 5500);
    return () => window.clearTimeout(timer);
  }, [changeHero, heroHovered, heroIndex]);

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-800">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1">
        <section
          className="relative isolate overflow-hidden border-b border-charcoal-800 bg-charcoal-900 px-4 py-16 text-white sm:px-6 lg:px-8"
          onMouseEnter={() => setHeroHovered(true)}
          onMouseLeave={() => setHeroHovered(false)}
        >
          <div className="absolute inset-0" aria-hidden="true">
            {previousHeroIndex !== null && (
              <img
                src={heroPhotos[previousHeroIndex].imageURL}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
              />
            )}
            <img
              key={heroPhotos[heroIndex].id}
              src={heroPhotos[heroIndex].imageURL}
              alt=""
              loading={heroIndex === 0 ? 'eager' : 'lazy'}
              className="absolute inset-0 h-full w-full object-cover motion-safe:animate-[galleryFade_700ms_ease-out] motion-reduce:animate-[galleryFade_150ms_ease-out]"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal-950/90 via-charcoal-900/80 to-charcoal-900/55" aria-hidden="true" />
          <div className="mx-auto max-w-7xl">
            <span className="relative text-xs font-bold uppercase tracking-[0.25em] text-gold-400">Media center</span>
            <h1 className="relative mt-4 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">Stories, moments, and school life</h1>
            <p className="relative mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
              Explore the visual and written story of Kalulini Boys High School through events, achievements, and the everyday experiences that shape our school culture.
            </p>
            <div className="relative mt-6 flex items-center gap-2" aria-label="Media center hero slides">
              {heroPhotos.map((photo, index) => (
                <button
                  key={photo.id}
                  type="button"
                  onClick={() => changeHero(index)}
                  aria-label={`Show slide ${index + 1}: ${photo.title}`}
                  aria-pressed={heroIndex === index}
                  className={`h-2.5 rounded-full transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-300 ${heroIndex === index ? 'w-7 bg-gold-400' : 'w-2.5 bg-white/65 hover:bg-aqua-300'}`}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-3">
            {mediaSections.map(({ title, description, href, icon: Icon }) => (
              <Link key={title} href={href} className="block rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-colors hover:border-aqua-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aqua-700">
                <div className="mb-4 flex items-center gap-3">
                  {title === 'Photo Gallery' && <GalleryThumbnailStrip photos={galleryTeaserPhotos} />}
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold/10 text-gold-600">
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
                <h2 className="text-xl font-bold text-charcoal-900">{title}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-aqua-700">
                  Open section <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="border-y border-slate-200 bg-white px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-aqua-600">Featured media</span>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-charcoal-900">Highlights from campus life</h2>
              </div>
              <Link href="/gallery" className="hidden text-sm font-semibold text-aqua-700 sm:inline-flex items-center gap-2">
                View gallery <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {showcase.map(({ title, image, tag }) => (
                <div key={title} className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm">
                  <div className="h-64 overflow-hidden">
                    <img src={image} alt={title} className="h-full w-full object-cover transition duration-500 hover:scale-105" />
                  </div>
                  <div className="p-5">
                    <span className="inline-flex rounded-full bg-aqua-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-aqua-700">{tag}</span>
                    <h3 className="mt-3 text-xl font-bold text-charcoal-900">{title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-r from-slate-900 to-slate-800 p-8 text-white sm:p-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-gold-400">Stay connected</span>
                <h3 className="mt-3 text-3xl font-black tracking-tight">Follow the school story</h3>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link href="/news" className="inline-flex items-center justify-center gap-2 rounded-xl bg-gold px-6 py-3 font-bold text-charcoal">
                  Explore updates <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/contact" className="inline-flex items-center justify-center rounded-xl border border-white/30 bg-white/5 px-6 py-3 font-semibold text-white">
                  Contact school
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function GalleryThumbnailStrip({ photos }: { photos: typeof galleryTeaserPhotos }) {
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setStartIndex((index) => (index + 1) % photos.length);
    }, 3000);
    return () => window.clearInterval(timer);
  }, [photos.length]);

  useEffect(() => {
    const nextPhoto = photos[(startIndex + 3) % photos.length];
    const image = new Image();
    image.src = nextPhoto.imageURL;
  }, [photos, startIndex]);

  return (
    <div className="flex h-12 w-32 shrink-0 overflow-hidden rounded-xl border border-gold-200 bg-charcoal-900" aria-label="Recent gallery photos">
      {[0, 1, 2].map((offset) => {
        const photo = photos[(startIndex + offset) % photos.length];
        return (
          <div key={`${photo.id}-${offset}`} className="h-full min-w-0 flex-1 overflow-hidden motion-safe:animate-[galleryFade_250ms_ease-out] motion-reduce:animate-[galleryFade_150ms_ease-out]">
            <img src={photo.imageURL} alt="" loading="lazy" className="h-full w-full object-cover" />
          </div>
        );
      })}
    </div>
  );
}
