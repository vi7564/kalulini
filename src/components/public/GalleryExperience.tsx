'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  Pause,
  Play,
  X,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import type { GalleryItem } from '@/types';

const galleryCategories = ['Grounds & Facilities', 'Classrooms', 'Sports', 'Labs', 'Dormitories', 'Events', 'Clubs'];

function getDisplayCategory(category: GalleryItem['category']) {
  if (category === 'Campus') return 'Grounds & Facilities';
  if (category === 'Academics') return 'Classrooms';
  if (category === 'Laboratories') return 'Labs';
  if (category === 'Student Life') return 'Clubs';
  return category;
}

interface GalleryExperienceProps {
  items: GalleryItem[];
}

export function GalleryExperience({ items }: GalleryExperienceProps) {
  const [category, setCategory] = useState('All');
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [playing, setPlaying] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [focusWithin, setFocusWithin] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const touchStartRef = useRef<{ x: number; pinch: number | null } | null>(null);

  const visibleItems = useMemo(
    () => items.filter((item) => category === 'All' || getDisplayCategory(item.category) === category),
    [category, items],
  );
  const currentItem = activeIndex === null ? null : visibleItems[activeIndex] ?? null;

  useEffect(() => {
    if (!currentItem || !visibleItems.length) return;
    const nextItem = visibleItems[(activeIndex! + 1) % visibleItems.length];
    const nextImage = new Image();
    nextImage.src = nextItem.imageURL;
  }, [activeIndex, currentItem, visibleItems]);

  useEffect(() => {
    if (activeIndex === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialogRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      openerRef.current?.focus();
    };
  }, [activeIndex === null]);

  useEffect(() => {
    if (activeIndex === null || !currentItem || !playing || hovered || focusWithin) return;
    const timer = window.setTimeout(() => {
      setActiveIndex((index) => (index === null ? null : (index + 1) % visibleItems.length));
      setZoomed(false);
    }, 5000);
    return () => window.clearTimeout(timer);
  }, [activeIndex, currentItem, focusWithin, hovered, playing, visibleItems.length]);

  const closeLightbox = () => {
    setActiveIndex(null);
    setZoomed(false);
    setFocusWithin(false);
  };

  const navigate = (direction: -1 | 1) => {
    if (visibleItems.length < 2) return;
    setPlaying(false);
    setZoomed(false);
    setActiveIndex((index) => (index === null ? null : (index + direction + visibleItems.length) % visibleItems.length));
  };

  const toggleZoom = () => {
    setPlaying(false);
    setZoomed((value) => !value);
  };

  const openLightbox = (item: GalleryItem) => {
    openerRef.current = document.activeElement as HTMLElement;
    setPlaying(true);
    setActiveIndex(visibleItems.findIndex((visibleItem) => visibleItem.id === item.id));
  };

  const onDialogKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      closeLightbox();
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      navigate(-1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      navigate(1);
    } else if (event.key === 'Tab') {
      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (document.activeElement === dialogRef.current) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  };

  const onTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    const firstTouch = event.touches[0];
    const pinch = event.touches.length > 1
      ? Math.hypot(
          event.touches[0].clientX - event.touches[1].clientX,
          event.touches[0].clientY - event.touches[1].clientY,
        )
      : null;
    touchStartRef.current = { x: firstTouch.clientX, pinch };
  };

  const onTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    if (event.touches.length < 2 || touchStartRef.current?.pinch === null || !touchStartRef.current) return;
    event.preventDefault();
    const distance = Math.hypot(
      event.touches[0].clientX - event.touches[1].clientX,
      event.touches[0].clientY - event.touches[1].clientY,
    );
    setZoomed(distance > touchStartRef.current.pinch * 1.08);
  };

  const onTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    const start = touchStartRef.current;
    touchStartRef.current = null;
    if (!start || start.pinch !== null || event.changedTouches.length === 0) return;
    const delta = event.changedTouches[0].clientX - start.x;
    if (Math.abs(delta) > 55) navigate(delta < 0 ? 1 : -1);
  };

  const openCategory = (nextCategory: string) => {
    setCategory(nextCategory);
    setActiveIndex(null);
  };

  return (
    <>
      <div className="mb-8 flex flex-wrap gap-2" aria-label="Filter gallery by category">
        {['All', ...galleryCategories].map((itemCategory) => (
          <button
            key={itemCategory}
            type="button"
            onClick={() => openCategory(itemCategory)}
            aria-pressed={category === itemCategory}
            className={`rounded-full px-4 py-2 text-xs font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aqua-600 ${
              category === itemCategory
                ? 'bg-aqua-700 text-white'
                : 'bg-slate-100 text-charcoal-800 hover:bg-aqua-50 hover:text-aqua-800'
            }`}
          >
            {itemCategory}
          </button>
        ))}
      </div>

      {category === 'All' ? (
        <div className="space-y-12">
          {galleryCategories.map((group) => {
            const groupItems = visibleItems.filter((item) => getDisplayCategory(item.category) === group);
            if (!groupItems.length) return null;
            return (
              <section key={group} aria-labelledby={`gallery-${group.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}>
                <div className="mb-5 flex items-center gap-3">
                  <Camera className="h-5 w-5 text-aqua-700" aria-hidden="true" />
                  <h2 id={`gallery-${group.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} className="text-xl font-bold text-charcoal-900">{group}</h2>
                  <span className="text-xs font-semibold text-slate-500">{groupItems.length} photos</span>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
                  {groupItems.map((item) => (
                    <GalleryThumbnail key={item.id} item={item} onOpen={openLightbox} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
          {visibleItems.map((item) => <GalleryThumbnail key={item.id} item={item} onOpen={openLightbox} />)}
          {visibleItems.length === 0 && (
            <p className="col-span-full py-12 text-center text-sm text-slate-600">More photographs in this collection are coming soon.</p>
          )}
        </div>
      )}

      {currentItem && activeIndex !== null && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label="Photo gallery viewer"
          tabIndex={-1}
          onKeyDown={onDialogKeyDown}
          onFocusCapture={(event) => {
            if (event.target !== dialogRef.current) {
              setFocusWithin(true);
              setPlaying(false);
            }
          }}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocusWithin(false);
          }}
          className="fixed inset-0 z-[100] flex flex-col bg-charcoal-950 text-white outline-none"
        >
          <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-400">{getDisplayCategory(currentItem.category)}</p>
              <h2 className="truncate text-sm font-semibold text-white sm:text-base">{currentItem.title}</h2>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={() => setPlaying((value) => !value)}
                aria-label={playing ? 'Pause slideshow' : 'Play slideshow'}
                className="rounded-full border border-white/20 p-2 text-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-400"
              >
                {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </button>
              <button
                type="button"
                onClick={closeLightbox}
                aria-label="Close photo viewer"
                className="rounded-full border border-white/20 p-2 text-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-400"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div
            className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden px-12 sm:px-20"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <button
              type="button"
              onClick={() => navigate(-1)}
              aria-label="Previous image"
              className="absolute left-3 z-10 rounded-full border border-white/20 bg-black/40 p-2.5 text-white transition hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-400 sm:left-6"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={toggleZoom}
              aria-label={zoomed ? 'Zoom out of image' : 'Zoom in on image'}
              className="group relative flex h-full w-full items-center justify-center overflow-hidden"
            >
              <img
                key={currentItem.id}
                src={currentItem.imageURL}
                alt={currentItem.title}
                className={`max-h-full max-w-full select-none object-contain motion-safe:transition-transform motion-safe:duration-300 motion-reduce:transition-none ${zoomed ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'}`}
                draggable={false}
              />
              <span className="absolute bottom-3 right-3 rounded-full bg-black/60 p-2 text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100" aria-hidden="true">
                {zoomed ? <ZoomOut className="h-4 w-4" /> : <ZoomIn className="h-4 w-4" />}
              </span>
            </button>
            <button
              type="button"
              onClick={() => navigate(1)}
              aria-label="Next image"
              className="absolute right-3 z-10 rounded-full border border-white/20 bg-black/40 p-2.5 text-white transition hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-400 sm:right-6"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
            <p className="sr-only" aria-live="polite" aria-atomic="true">Image {activeIndex + 1} of {visibleItems.length}</p>
            <div key={`${currentItem.id}-caption`} className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-5 pb-5 pt-14 text-center motion-safe:animate-[galleryFade_250ms_ease-out] motion-reduce:animate-[galleryFade_150ms_ease-out]">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-300">{getDisplayCategory(currentItem.category)}</p>
              <p className="mt-1 text-lg font-bold text-white">{currentItem.title}</p>
              <p className="mx-auto mt-1 max-w-2xl text-sm text-slate-200">{currentItem.caption}</p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-3 border-t border-white/10 px-4 py-3 sm:px-6">
            <span className="hidden shrink-0 text-xs font-semibold text-slate-300 sm:block">{activeIndex + 1} / {visibleItems.length}</span>
            <div className="flex min-w-0 flex-1 gap-2 overflow-x-auto py-1" aria-label="Choose a photo">
              {visibleItems.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setPlaying(false);
                    setZoomed(false);
                    setActiveIndex(index);
                  }}
                  aria-label={`Show image ${index + 1}: ${item.title}`}
                  aria-current={index === activeIndex ? 'true' : undefined}
                  className={`h-12 w-16 shrink-0 overflow-hidden rounded-md border-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400 sm:h-14 sm:w-20 ${index === activeIndex ? 'border-gold-400' : 'border-transparent opacity-60 hover:opacity-100'}`}
                >
                  <img src={item.imageURL} alt="" loading="lazy" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
            <button type="button" onClick={toggleZoom} aria-label={zoomed ? 'Zoom out' : 'Zoom in'} className="shrink-0 rounded-full border border-white/20 p-2 text-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-400">
              {zoomed ? <ZoomOut className="h-4 w-4" /> : <ZoomIn className="h-4 w-4" />}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function GalleryThumbnail({ item, onOpen }: { item: GalleryItem; onOpen: (item: GalleryItem) => void }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(item)}
      aria-label={`Open ${item.title}, ${getDisplayCategory(item.category)}`}
      className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-slate-200 bg-charcoal-900 text-left shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aqua-600"
    >
      <img
        src={item.imageURL}
        alt={item.title}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
      />
      <span className="absolute inset-0 bg-gradient-to-t from-charcoal-950/90 via-charcoal-950/10 to-transparent" />
      <span className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
        <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-gold-300">{getDisplayCategory(item.category)}</span>
        <span className="mt-1 block text-sm font-bold leading-snug text-white">{item.title}</span>
      </span>
    </button>
  );
}