'use client';

import React, { useEffect, useState } from 'react';
import { announcementService } from '@/lib/services/announcementService';
import { Announcement } from '@/types';
import Link from 'next/link';
import { Megaphone, X, ArrowRight } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  const [announcement, setAnnouncement] = useState<Announcement | null>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    announcementService.getTopBannerAnnouncement().then((ann) => {
      if (ann) setAnnouncement(ann);
    });
  }, []);

  if (!visible || !announcement) return null;

  return (
    <div className="bg-charcoal-900 border-b border-aqua-500/20 text-slate-200 text-xs py-2 px-4 relative z-40 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-aqua-500/20 text-aqua-400 font-semibold text-[10px] tracking-wider uppercase whitespace-nowrap">
            <Megaphone className="w-3 h-3 text-gold-400 animate-pulse" />
            Announcement
          </span>
          <p className="truncate font-medium text-slate-100 text-xs sm:text-sm">
            {announcement.title}:{' '}
            <span className="text-slate-300 font-normal">{announcement.content}</span>
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/admissions/apply"
            className="hidden sm:inline-flex items-center gap-1 text-gold-400 hover:text-gold-300 font-semibold text-xs transition-colors"
          >
            Take Action <ArrowRight className="w-3 h-3" />
          </Link>
          <button
            onClick={() => setVisible(false)}
            className="text-slate-400 hover:text-white p-0.5 rounded transition-colors"
            title="Dismiss notice"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
