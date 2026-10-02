'use client';

import React from 'react';
import Link from 'next/link';
import { Target, Compass, Award, Shield, ArrowRight, BookCheck, Users, Check } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-premium border border-slate-200">
              <img
                src="https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=800&q=80"
                alt="Kalulini Boys High School Students"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                <span className="text-xs uppercase tracking-widest text-gold-400 font-bold">
                  Established Heritage
                </span>
                <p className="text-sm font-semibold mt-1">
                  Over three decades of shaping responsible, distinguished young men.
                </p>
              </div>
            </div>

            {/* Accent Card */}
            <div className="hidden sm:block absolute -bottom-6 -right-6 bg-aqua-600 text-white p-5 rounded-2xl shadow-xl max-w-xs border-2 border-white">
              <div className="flex items-center gap-3">
                <Shield className="w-8 h-8 text-gold-300 shrink-0" />
                <div>
                  <h4 className="font-bold text-sm">Four Pillar Discipline</h4>
                  <p className="text-xs text-aqua-100">Honor, Diligence, Character, Respect</p>
                </div>
              </div>
            </div>
          </div>

          {/* Text Information & Pillars */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-aqua-600">
                About Kalulini Boys High School
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-charcoal-900 tracking-tight">
                An Educational Sanctuary Inspiring Young Minds to Reach Their Utmost Potential
              </h2>
            </div>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Kalulini Boys High School is a public Extra-County boys secondary school dedicated to holistic education. Our rigorous academic curriculum is enriched with practical science laboratories, vibrant co-curricular clubs, and comprehensive boarding facilities designed to promote camaraderie, focus, and self-reliance.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {/* Vision Card */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-aqua-300 transition-colors">
                <div className="flex items-center gap-2.5 text-aqua-700 font-bold text-sm mb-1.5">
                  <Compass className="w-5 h-5 text-aqua-600" />
                  <span>Our Vision</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  To be a premier national center of excellence that models upright, self-driven, and intellectually accomplished leaders.
                </p>
              </div>

              {/* Mission Card */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-gold-300 transition-colors">
                <div className="flex items-center gap-2.5 text-amber-700 font-bold text-sm mb-1.5">
                  <Target className="w-5 h-5 text-gold-500" />
                  <span>Our Mission</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  To provide holistic, value-based secondary education that develops academic mastery, critical inquiry, moral integrity, and community service.
                </p>
              </div>
            </div>

            {/* Core Values checklist */}
            <div className="pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal-800 mb-2">
                Core Institutional Values
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-semibold text-slate-700">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-aqua-600" />
                  Academic Distinction
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-aqua-600" />
                  Moral Integrity
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-aqua-600" />
                  Unwavering Discipline
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-aqua-600" />
                  Servant Leadership
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-aqua-600" />
                  Scientific Innovation
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-aqua-600" />
                  Mutual Respect
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm font-bold text-aqua-700 hover:text-aqua-800 hover:underline"
              >
                Read our full history, leadership structure, and institutional milestones
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
