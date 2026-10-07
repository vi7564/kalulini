'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSubscribed(true);
    setNewsletterEmail('');
  };

  return (
    <footer className="bg-charcoal-900 text-slate-300 border-t-4 border-aqua-600 [&_a]:flex [&_a]:min-h-11 [&_a]:items-center">
      {/* Pre-footer Newsletter & Quick Action */}
      <div className="border-b border-charcoal-800 bg-charcoal-950/60 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight font-display">
              Kalulini Boys High School Academic Bulletin
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
              Subscribe to official school announcements, term calendar updates, KCSE milestones, and administrative circulars.
            </p>
          </div>

          <form onSubmit={handleNewsletter} className="w-full md:w-auto flex flex-col sm:flex-row gap-2 max-w-md">
            {subscribed ? (
              <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium py-2">
                <CheckCircle2 className="w-5 h-5" />
                Thank you! You have subscribed to official school bulletins.
              </div>
            ) : (
              <>
                <input
                  type="email"
                  required
                  placeholder="Enter parent or guardian email..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="px-4 py-2.5 rounded-lg bg-charcoal-800 border border-charcoal-700 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-aqua-500 flex-1"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-lg bg-aqua-600 hover:bg-aqua-700 text-white font-semibold text-sm transition-all whitespace-nowrap"
                >
                  Subscribe
                </button>
              </>
            )}
          </form>
        </div>
      </div>

      {/* Main Mega Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
          {/* Institutional Identity Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-aqua-500 to-charcoal-800 flex items-center justify-center text-white border-2 border-gold-400">
                <GraduationCap className="w-7 h-7 text-gold-300" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white tracking-tight font-display">
                  KALULINI BOYS HIGH SCHOOL
                </h4>
                <p className="text-xs text-gold-400 font-semibold tracking-wider uppercase">
                  Makueni County, Kenya
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              A premier institution dedicated to academic distinction, STEM innovation, holistic character formation, and disciplined servant leadership. Empowering young men to lead with integrity.
            </p>

            <div className="space-y-2 pt-2 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-aqua-400 shrink-0 mt-0.5" />
                <span>P.O. Box 24 - 90130, Kalulini, Makueni County, Kenya</span>
              </div>
              <a href="tel:+254792511717" className="flex min-h-11 items-center gap-2.5 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aqua-400">
                <Phone className="w-4 h-4 text-aqua-400 shrink-0" />
                <span>0792 511 717</span>
              </a>
              <a href="mailto:info@kaluliniboys.ac.ke" className="flex min-h-11 items-center gap-2.5 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aqua-400">
                <Mail className="w-4 h-4 text-aqua-400 shrink-0" />
                <span>info@kaluliniboys.ac.ke</span>
              </a>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-aqua-400 shrink-0" />
                <span>Mon - Fri: 8:00 AM - 5:00 PM (Admin Office)</span>
              </div>
            </div>
          </div>

          {/* Column 2: About & Leadership */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-gold-400">
              Quick Links
            </h5>
            <ul className="space-y-2 text-xs text-[#d1d1d1]">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/sdgs" className="hover:text-white transition-colors">
                  Our Impact
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-white transition-colors">
                  News Desk
                </Link>
              </li>
              <li>
                <Link href="/media-center" className="hover:text-white transition-colors">
                  Media Center
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/virtual-tour" className="hover:text-white transition-colors">
                  Virtual Tour
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Academics & Admissions */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-gold-400">
              Academics & Admissions
            </h5>
            <ul className="space-y-2 text-xs text-[#d1d1d1]">
              <li>
                <Link href="/academics" className="hover:text-white transition-colors">
                  Curriculum Overview
                </Link>
              </li>
              <li>
                <Link href="/academics#departments" className="hover:text-white transition-colors">
                  Academic Departments
                </Link>
              </li>
              <li>
                <Link href="/academics/kcse" className="hover:text-white transition-colors">
                  KCSE Performance
                </Link>
              </li>
              <li>
                <Link href="/admissions" className="hover:text-white transition-colors">
                  Admission Requirements
                </Link>
              </li>
              <li>
                <Link href="/admissions#fees" className="hover:text-white transition-colors">
                  Fees Structure
                </Link>
              </li>
              <li>
                <Link href="/admissions/apply" className="text-aqua-400 hover:text-aqua-300 font-semibold">
                  Online Application Form
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Student Life & Resources */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-gold-400">
              Student Life & Co-Curricular
            </h5>
            <ul className="space-y-2 text-xs text-[#d1d1d1]">
              <li>
                <Link href="/student-life#sports" className="hover:text-white transition-colors">
                  Sports & Athletics
                </Link>
              </li>
              <li>
                <Link href="/student-life#clubs" className="hover:text-white transition-colors">
                  Clubs & Societies
                </Link>
              </li>
              <li>
                <Link href="/student-life#boarding" className="hover:text-white transition-colors">
                  Boarding & Houses
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-white transition-colors">
                  School News
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-white transition-colors">
                  Term Calendar & Events
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-white transition-colors">
                  Photo Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Portals & Security */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-gold-400">
              Portals Access
            </h5>
            <ul className="space-y-2 text-xs text-[#d1d1d1]">
              <li>
                <Link href="/login" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-aqua-400" /> Student Portal
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-aqua-400" /> Teacher Portal
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-aqua-400" /> Parent Portal
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-aqua-400" /> Administration System
                </Link>
              </li>
              <li>
                <Link href="/portal/applicant" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-gold-400" /> Application Tracker
                </Link>
              </li>
              <li>
                <Link href="/downloads" className="hover:text-white transition-colors">
                  Downloads Center
                </Link>
              </li>
              <li>
                <Link href="/faqs" className="hover:text-white transition-colors">
                  Support & FAQs
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal & Copyright Row */}
        <div className="mt-14 pt-8 border-t border-charcoal-800 flex flex-col sm:flex-row items-center justify-between text-xs text-[#d1d1d1] gap-4">
          <p>
            &copy; {new Date().getFullYear()} Kalulini Boys High School. All rights reserved. Registered Extra-County Public Institution, Ministry of Education, Kenya.
          </p>
          <div className="flex space-x-6">
            <Link href="/about" className="hover:text-white hover:underline transition-colors">Privacy Policy</Link>
            <Link href="/about" className="hover:text-white hover:underline transition-colors">Terms of Admission</Link>
            <Link href="/contact" className="hover:text-white hover:underline transition-colors">Accessibility</Link>
            <Link href="/login" className="text-aqua-400 hover:text-aqua-300 transition-colors">Staff Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
