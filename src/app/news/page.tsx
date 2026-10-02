'use client';

import React, { useState } from 'react';
import { AnnouncementBar } from '@/components/public/AnnouncementBar';
import { Navbar } from '@/components/public/Navbar';
import { Footer } from '@/components/public/Footer';
import { BLOG_POSTS_DATA } from '@/lib/mockData';
import { Search, ArrowRight, Calendar, User, Clock } from 'lucide-react';
import Link from 'next/link';

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [search, setSearch] = useState('');

  const categories = ['All', 'Academics & STEM', 'Institutional Culture', 'Sports & Co-curricular'];

  const filteredPosts = BLOG_POSTS_DATA.filter((post) => {
    const matchesCat = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(search.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="flex flex-col min-h-screen">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1">
        <section className="bg-charcoal-900 text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-charcoal-800">
          <div className="max-w-7xl mx-auto space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-400">
              Official Media & Press
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight">
              School News, Updates & Features
            </h1>
            <p className="text-slate-300 max-w-2xl text-sm sm:text-base leading-relaxed">
              Read stories of student innovation, academic honors, athletic victories, and administrative bulletins.
            </p>
          </div>
        </section>

        <section className="py-12 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Filter and Search Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      selectedCategory === cat
                        ? 'bg-aqua-600 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="relative max-w-xs w-full">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none focus:border-aqua-500"
                />
              </div>
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <article
                  key={post.id}
                  className="bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-premium transition-all flex flex-col group"
                >
                  <div className="h-52 overflow-hidden relative">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-aqua-600 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md">
                      {post.category}
                    </span>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-[11px] text-slate-500 mb-2">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{post.publishedAt}</span>
                        <span>&bull;</span>
                        <Clock className="w-3.5 h-3.5" />
                        <span>{post.readTimeMinutes} min read</span>
                      </div>

                      <h3 className="font-bold text-base text-charcoal-900 group-hover:text-aqua-700 transition-colors leading-snug">
                        <Link href={`/news/${post.slug}`}>{post.title}</Link>
                      </h3>

                      <p className="text-xs text-slate-600 mt-2.5 leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-200/80 flex items-center justify-between">
                      <span className="text-[11px] text-slate-500 font-medium">By {post.author}</span>
                      <Link
                        href={`/news/${post.slug}`}
                        className="text-xs font-bold text-aqua-700 hover:text-aqua-800 flex items-center gap-1"
                      >
                        Read More <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="py-16 text-center text-slate-500 text-sm">
                No articles found matching your criteria.
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
