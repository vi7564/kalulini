'use client';

import React, { useState } from 'react';
import { AnnouncementBar } from '@/components/public/AnnouncementBar';
import { Navbar } from '@/components/public/Navbar';
import { Footer } from '@/components/public/Footer';
import { FAQS_DATA } from '@/lib/mockData';
import { ChevronDown, Search, HelpCircle } from 'lucide-react';
import Link from 'next/link';

export default function FAQsPage() {
  const [openId, setOpenId] = useState<string | null>(FAQS_DATA[0].id);
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('All');

  const categories = ['All', 'Admissions', 'Fees & Finance', 'Academics', 'Boarding Life'];

  const filtered = FAQS_DATA.filter((faq) => {
    const matchesCat = selectedCat === 'All' || faq.category === selectedCat;
    const matchesSearch = faq.question.toLowerCase().includes(search.toLowerCase()) ||
                          faq.answer.toLowerCase().includes(search.toLowerCase());
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
              Help Desk & Information
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight">
              Frequently Asked Questions
            </h1>
            <p className="text-slate-300 max-w-2xl text-sm sm:text-base leading-relaxed">
              Find instant answers to common questions regarding admissions, boarding requirements, fees, and academic life.
            </p>
          </div>
        </section>

        <section className="py-12 bg-white border-b border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            {/* Filter and Search */}
            <div className="space-y-4">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Search questions or keywords (e.g. fees, boarding, subjects)..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-aqua-500 shadow-sm"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCat(cat)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      selectedCat === cat
                        ? 'bg-aqua-600 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Accordion List */}
            <div className="space-y-3">
              {filtered.map((item) => {
                const isOpen = openId === item.id;
                return (
                  <div
                    key={item.id}
                    className="border border-slate-200 rounded-2xl overflow-hidden transition-all bg-slate-50/50"
                  >
                    <button
                      onClick={() => setOpenId(isOpen ? null : item.id)}
                      className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-sm text-charcoal-900 hover:text-aqua-700 bg-white"
                    >
                      <span className="flex items-center gap-2">
                        <HelpCircle className="w-4 h-4 text-aqua-600 shrink-0" />
                        {item.question}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-aqua-600' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="p-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50">
                        {item.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Contact Callout */}
            <div className="p-6 rounded-2xl bg-charcoal-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="font-bold text-sm text-gold-400">Have a question not answered here?</h4>
                <p className="text-xs text-slate-300 mt-0.5">Our admissions and administrative team is available to assist.</p>
              </div>
              <Link
                href="/contact"
                className="px-4 py-2 rounded-xl bg-aqua-600 hover:bg-aqua-700 text-white font-bold text-xs shrink-0 transition-colors"
              >
                Contact Administration
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
