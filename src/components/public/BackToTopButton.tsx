'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

const SHOW_THRESHOLD = 400;
const RING_CIRCUMFERENCE = 2 * Math.PI * 21;

export function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let frameId = 0;

    const updateScrollState = () => {
      frameId = 0;
      const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      const progress = Math.min((window.scrollY / maxScroll) * 100, 100);

      setIsVisible(window.scrollY >= SHOW_THRESHOLD);
      setScrollProgress(progress);
    };

    const scheduleUpdate = () => {
      if (!frameId) frameId = window.requestAnimationFrame(updateScrollState);
    };

    updateScrollState();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);

    return () => {
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      aria-hidden={!isVisible}
      tabIndex={isVisible ? 0 : -1}
      className={`fixed bottom-[calc(24px+env(safe-area-inset-bottom))] right-4 z-30 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-slate-900/80 text-gold shadow-lg shadow-black/20 backdrop-blur-md transition-[opacity,transform,box-shadow] duration-300 hover:scale-105 hover:shadow-gold/25 focus-visible:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 sm:right-6 sm:h-12 sm:w-12 ${
        isVisible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
      }`}
    >
      <svg
        aria-hidden="true"
        className="absolute inset-0 h-full w-full -rotate-90"
        viewBox="0 0 48 48"
      >
        <circle cx="24" cy="24" r="21" fill="none" stroke="currentColor" strokeOpacity="0.18" strokeWidth="1.5" />
        <circle
          cx="24"
          cy="24"
          r="21"
          fill="none"
          stroke="currentColor"
          strokeDasharray={RING_CIRCUMFERENCE}
          strokeDashoffset={RING_CIRCUMFERENCE * (1 - scrollProgress / 100)}
          strokeLinecap="round"
          strokeWidth="1.5"
        />
      </svg>
      <ArrowUp aria-hidden="true" className="h-5 w-5" />
    </button>
  );
}