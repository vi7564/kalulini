'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { AnnouncementBar } from '@/components/public/AnnouncementBar';
import { Navbar } from '@/components/public/Navbar';
import { Footer } from '@/components/public/Footer';
import { BLOG_POSTS_DATA } from '@/lib/mockData';
import { ArrowLeft, Calendar, User, Clock, Share2 } from 'lucide-react';
import Link from 'next/link';

export default function ArticleDetailPage() {
  const params = useParams();
  const slugOrId = params.id as string;

  const post = BLOG_POSTS_DATA.find((p) => p.slug === slugOrId || p.id === slugOrId) || BLOG_POSTS_DATA[0];

  return (
    <div className="flex flex-col min-h-screen">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1 bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/news"
            className="inline-flex items-center gap-1.5 text-xs text-aqua-700 hover:text-aqua-800 font-bold uppercase tracking-wider mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to News & Press
          </Link>

          <article className="bg-white rounded-3xl p-6 sm:p-12 border border-slate-200 shadow-premium">
            <span className="inline-block text-xs font-bold uppercase tracking-wider text-aqua-600 bg-aqua-50 px-3 py-1 rounded-full mb-4">
              {post.category}
            </span>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display text-charcoal-900 leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 py-4 my-4 border-y border-slate-100">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-aqua-600" /> {post.publishedAt}
              </span>
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4 text-gold-500" /> By {post.author} ({post.authorRole})
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-slate-400" /> {post.readTimeMinutes} min read
              </span>
            </div>

            <div className="rounded-2xl overflow-hidden mb-8 border border-slate-200">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-80 sm:h-96 object-cover"
              />
            </div>

            <div className="prose max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-4">
              <p className="font-semibold text-charcoal-800 text-base sm:text-lg">
                {post.excerpt}
              </p>
              <p>
                {post.content}
              </p>
              <p>
                The school leadership continues to invest heavily in modern facilities, teacher professional development, and student mentorship programs to sustain this trajectory. Parents and alumni are encouraged to partner with the administration in these transformative educational initiatives.
              </p>
            </div>

            <div className="mt-12 pt-6 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500">Official Bulletin &bull; Kalulini Boys High School</span>
              <Link
                href="/news"
                className="text-xs font-bold text-aqua-700 hover:text-aqua-800"
              >
                Explore More Articles &rarr;
              </Link>
            </div>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}
