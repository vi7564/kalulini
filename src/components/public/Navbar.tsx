'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Menu,
  X,
  ChevronDown,
  GraduationCap,
  LogIn,
  Search,
  BookOpen,
  ShieldCheck,
  Award,
  Users,
  Building,
  FileText,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { currentUser } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleDropdown = (menu: string) => {
    setActiveDropdown((prev) => (prev === menu ? null : menu));
  };

  const closeMenus = () => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-md transition-all duration-300 ${
        scrolled ? 'shadow-md' : 'shadow-none'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-aqua to-slate-900 text-white shadow-soft">
              <GraduationCap className="h-7 w-7 text-gold" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-base font-black tracking-tight text-charcoal sm:text-lg">KALULINI BOYS</span>
              <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-aqua">High School</span>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            <Link href="/about" className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-aqua">About</Link>
            <Link href="/academics" className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-aqua">Academics</Link>
            <Link href="/admissions" className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-aqua">Admissions</Link>
            <div className="relative">
              <button
                onClick={() => handleDropdown('about-menu')}
                className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-aqua"
              >
                Explore
                <ChevronDown className="h-4 w-4" />
              </button>
              {activeDropdown === 'about-menu' && (
                <div className="absolute left-0 top-full mt-2 w-56 rounded-xl border border-slate-200 bg-white p-2 shadow-soft">
                  <Link href="/student-life" onClick={closeMenus} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-100"><Users className="h-4 w-4 text-aqua" /> Student Life</Link>
                  <Link href="/facilities" onClick={closeMenus} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-100"><Building className="h-4 w-4 text-aqua" /> Facilities</Link>
                  <Link href="/news" onClick={closeMenus} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-100"><BookOpen className="h-4 w-4 text-aqua" /> News</Link>
                  <Link href="/events" onClick={closeMenus} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-100"><FileText className="h-4 w-4 text-aqua" /> Events</Link>
                </div>
              )}
            </div>
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <button onClick={() => setSearchOpen(true)} className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 hover:text-aqua" aria-label="Search"><Search className="h-4 w-4" /></button>
            <Link href="/admissions/apply" className="rounded-lg bg-gold px-4 py-2 text-xs font-bold uppercase tracking-wide text-charcoal transition hover:brightness-95">Apply</Link>
            <Link href={currentUser ? '/portal' : '/login'} className="inline-flex items-center gap-2 rounded-lg bg-aqua px-4 py-2 text-xs font-bold uppercase tracking-wide text-white transition hover:brightness-110">
              <LogIn className="h-4 w-4" />
              {currentUser ? 'Portal' : 'Login'}
            </Link>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <button onClick={() => setSearchOpen(true)} className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 hover:text-aqua" aria-label="Search"><Search className="h-5 w-5" /></button>
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="rounded-lg p-2 text-slate-700 transition hover:bg-slate-100 hover:text-aqua"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 shadow-soft lg:hidden">
          <div className="flex flex-col gap-2">
            <Link href="/about" onClick={closeMenus} className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">About</Link>
            <Link href="/academics" onClick={closeMenus} className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">Academics</Link>
            <Link href="/admissions" onClick={closeMenus} className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">Admissions</Link>
            <Link href="/student-life" onClick={closeMenus} className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">Student Life</Link>
            <Link href="/facilities" onClick={closeMenus} className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">Facilities</Link>
            <Link href="/news" onClick={closeMenus} className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">News</Link>
            <Link href="/events" onClick={closeMenus} className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">Events</Link>
            <Link href={currentUser ? '/portal' : '/login'} onClick={closeMenus} className="mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-aqua px-4 py-3 text-sm font-bold uppercase tracking-wide text-white"> <ShieldCheck className="h-4 w-4" /> {currentUser ? 'Open Portal' : 'Student Portal'} </Link>
          </div>
        </div>
      )}

      {/* Public Global Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-charcoal-950/70 backdrop-blur-sm flex items-start justify-center pt-24 px-4">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 p-6 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3 flex-1">
                <Search className="w-5 h-5 text-aqua-600" />
                <input
                  type="text"
                  placeholder="Search Kalulini admissions, curriculum, news, staff..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-sm font-medium focus:outline-none text-charcoal-900"
                  autoFocus
                />
              </div>
              <button
                onClick={() => setSearchOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-3">
              <p className="text-xs uppercase tracking-wider font-semibold text-slate-400">
                Quick Navigation
              </p>
              <div className="grid grid-cols-2 gap-2 text-sm font-medium">
                <Link
                  href="/admissions/apply"
                  onClick={() => setSearchOpen(false)}
                  className="p-2.5 rounded-lg bg-slate-50 hover:bg-aqua-50 hover:text-aqua-800 transition-colors flex items-center gap-2"
                >
                  <GraduationCap className="w-4 h-4 text-aqua-600" /> Online Admission Form
                </Link>
                <Link
                  href="/academics/kcse"
                  onClick={() => setSearchOpen(false)}
                  className="p-2.5 rounded-lg bg-slate-50 hover:bg-aqua-50 hover:text-aqua-800 transition-colors flex items-center gap-2"
                >
                  <Award className="w-4 h-4 text-gold-500" /> KCSE Performance Analysis
                </Link>
                <Link
                  href="/downloads"
                  onClick={() => setSearchOpen(false)}
                  className="p-2.5 rounded-lg bg-slate-50 hover:bg-aqua-50 hover:text-aqua-800 transition-colors flex items-center gap-2"
                >
                  <FileText className="w-4 h-4 text-slate-600" /> Fee Structure & Rules
                </Link>
                <Link
                  href="/login"
                  onClick={() => setSearchOpen(false)}
                  className="p-2.5 rounded-lg bg-slate-50 hover:bg-aqua-50 hover:text-aqua-800 transition-colors flex items-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4 text-aqua-600" /> Portal Login (Students/Staff)
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
