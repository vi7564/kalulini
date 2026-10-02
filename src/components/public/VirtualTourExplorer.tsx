'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, MapPin } from 'lucide-react';

type TourScene = {
  id: string;
  title: string;
  description: string;
  image: string;
  hotspot: { x: number; y: number };
  mediaType: 'image' | 'panorama';
  panoramaSource?: string;
};

const scenes: TourScene[] = [
  {
    id: 'main-gate',
    title: 'Main Gate',
    description: 'Begin your visit at the entrance to Kalulini Boys High School. The campus welcomes learners, families, and partners into a community shaped by discipline and purpose.',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=2000&q=85',
    hotspot: { x: 18, y: 58 },
    mediaType: 'image',
  },
  {
    id: 'administration',
    title: 'Administration Block',
    description: 'The administration team supports families, students, and staff throughout the school year. This is the first stop for enquiries, admissions, and official visits.',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=2000&q=85',
    hotspot: { x: 33, y: 40 },
    mediaType: 'image',
  },
  {
    id: 'library',
    title: 'Library',
    description: 'A calm study environment gives learners room to read, research, and prepare independently. Print and digital resources help extend learning beyond the classroom.',
    image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=2000&q=85',
    hotspot: { x: 47, y: 52 },
    mediaType: 'image',
  },
  {
    id: 'science-labs',
    title: 'Science Laboratories',
    description: 'Practical science lessons invite students to investigate questions and test ideas. Lab work strengthens observation, precision, and confident problem-solving.',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=2000&q=85',
    hotspot: { x: 62, y: 37 },
    mediaType: 'image',
  },
  {
    id: 'dining-hall',
    title: 'Dining Hall',
    description: 'Shared meals are an important part of boarding school life. The dining hall brings students together and anchors the rhythm of each school day.',
    image: 'https://images.unsplash.com/photo-1567521464027-f127ff144326?auto=format&fit=crop&w=2000&q=85',
    hotspot: { x: 76, y: 55 },
    mediaType: 'image',
  },
  {
    id: 'dormitories',
    title: 'Dormitories',
    description: 'Boarding offers a structured setting for rest, friendship, and personal responsibility. House routines help students balance study, recreation, and wellbeing.',
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=2000&q=85',
    hotspot: { x: 82, y: 42 },
    mediaType: 'image',
  },
  {
    id: 'sports-field',
    title: 'Sports Field',
    description: 'The sports field is a place for teamwork, healthy competition, and school pride. Students develop resilience and leadership through games and athletics.',
    image: 'https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=2000&q=85',
    hotspot: { x: 57, y: 72 },
    mediaType: 'image',
  },
  {
    id: 'chapel',
    title: 'Chapel',
    description: 'The chapel provides time for reflection, gratitude, and shared values. It is part of the school’s commitment to holistic character formation.',
    image: 'https://images.unsplash.com/photo-1438032005730-c779502df39b?auto=format&fit=crop&w=2000&q=85',
    hotspot: { x: 36, y: 70 },
    mediaType: 'image',
  },
];

export function VirtualTourExplorer() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const transitionTimer = useRef<number | null>(null);
  const scene = scenes[activeIndex];
  const nextScene = scenes[(activeIndex + 1) % scenes.length];
  const previousScene = previousIndex === null ? null : scenes[previousIndex];

  useEffect(() => () => {
    if (transitionTimer.current !== null) window.clearTimeout(transitionTimer.current);
  }, []);

  useEffect(() => {
    const upcomingScene = scenes[(activeIndex + 1) % scenes.length];
    const image = new Image();
    image.src = upcomingScene.mediaType === 'panorama' ? upcomingScene.panoramaSource ?? upcomingScene.image : upcomingScene.image;
  }, [activeIndex]);

  const moveTo = (index: number) => {
    const destination = (index + scenes.length) % scenes.length;
    if (destination === activeIndex) return;
    setPreviousIndex(activeIndex);
    setActiveIndex(destination);
    if (transitionTimer.current !== null) window.clearTimeout(transitionTimer.current);
    const duration = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 150 : 500;
    transitionTimer.current = window.setTimeout(() => {
      setPreviousIndex(null);
      transitionTimer.current = null;
    }, duration);
  };
  const moveBy = (direction: -1 | 1) => moveTo(activeIndex + direction);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      moveBy(-1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      moveBy(1);
    }
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchStart === null) return;
    const distance = event.changedTouches[0].clientX - touchStart;
    if (Math.abs(distance) > 55) moveBy(distance < 0 ? 1 : -1);
    setTouchStart(null);
  };

  return (
    <div
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onTouchStart={(event) => setTouchStart(event.touches[0].clientX)}
      onTouchEnd={handleTouchEnd}
      className="outline-none focus-visible:ring-2 focus-visible:ring-aqua-500 focus-visible:ring-offset-4"
      aria-label="Interactive school campus tour"
    >
      <div className="relative isolate min-h-[520px] overflow-hidden rounded-2xl bg-charcoal-900 text-white shadow-xl sm:min-h-[620px]">
        {previousScene && (
          <div key={`${previousScene.id}-outgoing`} aria-hidden="true" className="absolute inset-0 motion-safe:animate-[tourFadeOut_500ms_ease-out_forwards] motion-reduce:animate-[tourFadeOut_150ms_ease-out_forwards]">
            <TourSceneViewer scene={previousScene} />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/90 via-charcoal-950/10 to-charcoal-950/25" />
          </div>
        )}
        <div key={scene.id} className="absolute inset-0 motion-safe:animate-[galleryFade_500ms_ease-out] motion-reduce:animate-[galleryFade_150ms_ease-out]">
          <TourSceneViewer scene={scene} />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/90 via-charcoal-950/10 to-charcoal-950/25" />
        </div>

        <div className="absolute left-4 top-4 right-4 z-10 flex items-center justify-between gap-3 sm:left-6 sm:right-6 sm:top-6">
          <div className="rounded-lg border border-white/20 bg-charcoal-950/70 px-3 py-2 backdrop-blur-sm">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold-300">Campus route</p>
            <p className="mt-0.5 text-sm font-semibold text-white">{activeIndex + 1} of {scenes.length} locations</p>
          </div>
          <div className="flex items-center gap-1.5" aria-label="Tour progress">
            {scenes.map((step, index) => (
              <button
                key={step.id}
                type="button"
                onClick={() => moveTo(index)}
                aria-label={`Go to ${step.title}`}
                aria-current={index === activeIndex ? 'step' : undefined}
                className={`h-2.5 rounded-full transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400 motion-reduce:transition-none ${index === activeIndex ? 'w-8 bg-gold-400' : 'w-2.5 bg-white/60 hover:bg-white'}`}
              />
            ))}
          </div>
        </div>

        {scenes.map((stop, index) => (
          <button
            key={stop.id}
            type="button"
            onClick={() => moveTo(index)}
            aria-label={`Visit ${stop.title}`}
            aria-pressed={index === activeIndex}
            className={`absolute z-10 flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-[10px] font-bold shadow-lg backdrop-blur-sm transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400 sm:px-3 sm:py-2 sm:text-xs motion-reduce:transition-none ${index === activeIndex ? 'border-gold-300 bg-gold-400 text-charcoal-900' : 'border-white/60 bg-charcoal-950/75 text-white hover:border-gold-300 hover:text-gold-200'}`}
            style={{ left: `${stop.hotspot.x}%`, top: `${stop.hotspot.y}%` }}
          >
            <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="hidden sm:inline">{stop.title}</span>
            <span className="sm:hidden">{index + 1}</span>
          </button>
        ))}

        <div key={`${scene.id}-copy`} className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex flex-col gap-5 p-5 sm:p-8 lg:flex-row lg:items-end lg:justify-between motion-safe:animate-[galleryFade_450ms_ease-out] motion-reduce:animate-[galleryFade_150ms_ease-out]">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[0.24em] text-gold-300">Location {activeIndex + 1}</span>
            <h2 className="mt-2 text-2xl font-black text-white sm:text-4xl">{scene.title}</h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-100 sm:text-base sm:leading-7">{scene.description}</p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <button type="button" onClick={() => moveBy(-1)} aria-label="Previous location" className="pointer-events-auto rounded-lg border border-white/40 bg-white/10 p-3 text-white hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-400">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <Link href="/contact" className="pointer-events-auto hidden rounded-lg border border-white/40 bg-white/10 px-4 py-3 text-sm font-semibold text-white hover:bg-white/20 sm:inline-flex">
              Plan a campus visit
            </Link>
            <button type="button" onClick={() => moveBy(1)} className="pointer-events-auto inline-flex items-center gap-2 rounded-lg bg-gold-400 px-4 py-3 text-sm font-bold text-charcoal-900 hover:bg-gold-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
              <span>Continue to {nextScene.title}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
        <p className="sr-only" aria-live="polite" aria-atomic="true">{activeIndex + 1} of {scenes.length}: {scene.title}</p>
      </div>

      <nav aria-label="Campus locations" className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-8">
        {scenes.map((stop, index) => (
          <button
            key={stop.id}
            type="button"
            onClick={() => moveTo(index)}
            aria-current={index === activeIndex ? 'step' : undefined}
            className={`rounded-lg border px-3 py-2 text-left text-xs font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aqua-600 ${index === activeIndex ? 'border-aqua-700 bg-aqua-700 text-white' : 'border-slate-200 bg-white text-charcoal-800 hover:border-aqua-400 hover:text-aqua-800'}`}
          >
            <span className="mr-1 text-gold-600">{String(index + 1).padStart(2, '0')}</span> {stop.title}
          </button>
        ))}
      </nav>
    </div>
  );
}

function TourSceneViewer({ scene }: { scene: TourScene }) {
  if (scene.mediaType === 'panorama' && scene.panoramaSource) {
    return <PanoramaScene source={scene.panoramaSource} title={scene.title} />;
  }

  return <img src={scene.image} alt={scene.title} className="h-full w-full object-cover" />;
}

function PanoramaScene({ source, title }: { source: string; title: string }) {
  return (
    <div className="h-full w-full" data-panorama-source={source} data-panorama-scene={title}>
      <img src={source} alt={`${title} panoramic view`} className="h-full w-full object-cover" />
    </div>
  );
}