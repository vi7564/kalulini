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
  FileText,
  Camera,
  GraduationCap as AdmissionsIcon,
  Mail,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { currentUser } = useAuth();

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Academics', href: '/academics' },
    { label: 'SDGs', href: '/sdgs' },
    { label: 'Virtual Tour', href: '/virtual-tour' },
  ];

  const exploreItems = [
    { label: 'News Desk', href: '/news', icon: FileText },
    { label: 'Media Center', href: '/media-center', icon: Camera },
    { label: 'Student Life', href: '/student-life', icon: Users },
    { label: 'Events', href: '/events', icon: FileText },
    { label: 'Admissions', href: '/admissions', icon: AdmissionsIcon },
    { label: 'Contact Us', href: '/contact', icon: Mail },
  ];

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
    <>
      <header
        className={`sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur-md transition-all duration-300 ${
          scrolled ? 'shadow-[0_8px_28px_rgba(15,23,42,0.12)]' : 'shadow-sm'
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
                <span className="mt-1 text-[10px] font-medium uppercase tracking-[0.2em] text-aqua-700">High School</span>
              </div>
            </Link>

            <nav className="hidden items-center gap-1 lg:flex">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-aqua-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aqua-700"
                >
                  {item.label}
                </Link>
              ))}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => handleDropdown('explore-menu')}
                  aria-expanded={activeDropdown === 'explore-menu'}
                  aria-controls="explore-menu"
                  className="flex min-h-11 items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-aqua-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aqua-700"
                >
                  Explore
                  <ChevronDown className="h-4 w-4" />
                </button>
                {activeDropdown === 'explore-menu' && (
                  <div id="explore-menu" className="absolute left-0 top-full mt-2 w-56 rounded-xl border border-slate-200 bg-white p-2 shadow-soft">
                    {exploreItems.map(({ label, href, icon: Icon }) => (
                      <Link key={href} href={href} onClick={closeMenus} className="flex min-h-11 items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-aqua-800">
                        <Icon className="h-4 w-4 text-aqua" /> {label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </nav>

            <div className="hidden items-center gap-3 lg:flex">
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="min-h-11 min-w-11 rounded-lg p-2 text-slate-700 transition hover:bg-slate-100 hover:text-aqua focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aqua-700"
                aria-label="Search"
                aria-haspopup="dialog"
                aria-expanded={searchOpen}
                aria-controls="quick-navigation"
              >
                <Search className="h-4 w-4" />
              </button>
              <Link href="/admissions/apply" className="inline-flex min-h-11 items-center rounded-lg bg-gold px-4 py-2 text-xs font-bold uppercase tracking-wide text-charcoal transition hover:brightness-95">Apply now</Link>
              <Link href={currentUser ? '/portal' : '/login'} className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-aqua-600 px-4 py-2 text-xs font-bold uppercase tracking-wide text-white transition hover:bg-aqua-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aqua-700">
                <LogIn className="h-4 w-4" />
                Portal
              </Link>
            </div>

            <div className="flex items-center gap-2 lg:hidden">
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="min-h-11 min-w-11 rounded-lg p-2 text-slate-700 transition hover:bg-slate-100 hover:text-aqua focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aqua-700"
                aria-label="Search"
                aria-haspopup="dialog"
                aria-expanded={searchOpen}
                aria-controls="quick-navigation"
              >
                <Search className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                className="min-h-11 min-w-11 rounded-lg p-2 text-slate-700 transition hover:bg-slate-100 hover:text-aqua focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aqua-700"
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-menu"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div id="mobile-menu" className="border-t border-white/70 bg-white/90 px-4 py-4 shadow-soft backdrop-blur-xl lg:hidden">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenus}
                  className="flex min-h-11 items-center rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-aqua-800"
                >
                  {item.label}
                </Link>
              ))}
              <button
                type="button"
                onClick={() => handleDropdown('explore-menu')}
                aria-expanded={activeDropdown === 'explore-menu'}
                aria-controls="mobile-explore-menu"
                className="flex min-h-11 items-center justify-between rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-aqua-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aqua-700"
              >
                Explore <ChevronDown className={`h-4 w-4 transition-transform ${activeDropdown === 'explore-menu' ? 'rotate-180' : ''}`} />
              </button>
              {activeDropdown === 'explore-menu' && (
                <div id="mobile-explore-menu" className="ml-3 flex flex-col gap-1 border-l-2 border-aqua-200 pl-3">
                  {exploreItems.map(({ label, href, icon: Icon }) => (
                    <Link key={href} href={href} onClick={closeMenus} className="flex min-h-11 items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-aqua-800">
                      <Icon className="h-4 w-4 text-aqua" /> {label}
                    </Link>
                  ))}
                </div>
              )}
              <Link href={currentUser ? '/portal' : '/login'} onClick={closeMenus} className="mt-2 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-aqua-700 px-4 py-3 text-sm font-bold uppercase tracking-wide text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aqua-700">
                <ShieldCheck className="h-4 w-4" /> Student Portal
              </Link>
            </div>
          </div>
        )}
      </header>

      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-charcoal/70 px-4 pt-24 backdrop-blur-sm">
          <div
            id="quick-navigation"
            role="dialog"
            aria-modal="true"
            aria-labelledby="quick-navigation-title"
            onKeyDown={(event) => {
              if (event.key === 'Escape') {
                setSearchOpen(false);
                return;
              }
              if (event.key !== 'Tab') return;
              const focusable = event.currentTarget.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input:not([disabled])');
              const first = focusable.item(0);
              const last = focusable.item(focusable.length - 1);
              if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
              } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
              }
            }}
            className="w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex flex-1 items-center gap-3">
                <Search className="h-5 w-5 text-aqua" aria-hidden="true" />
                <input
                  type="text"
                  aria-label="Search school content"
                  placeholder="Search Kalulini admissions, curriculum, news, staff..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-sm font-medium text-charcoal focus:outline-none"
                  autoFocus
                />
              </div>
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                aria-label="Close search"
                className="min-h-11 min-w-11 rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aqua-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3 py-4">
              <h2 id="quick-navigation-title" className="text-xs font-semibold uppercase tracking-wider text-slate-700">Quick Navigation</h2>
              <div className="grid grid-cols-2 gap-2 text-sm font-medium">
                <Link href="/admissions/apply" onClick={() => setSearchOpen(false)} className="flex min-h-11 items-center gap-2 rounded-lg bg-slate-50 p-2.5 transition hover:bg-aqua/10 hover:text-aqua-800">
                  <GraduationCap className="h-4 w-4 text-aqua" /> Online Admission Form
                </Link>
                <Link href="/academics/kcse" onClick={() => setSearchOpen(false)} className="flex min-h-11 items-center gap-2 rounded-lg bg-slate-50 p-2.5 transition hover:bg-aqua/10 hover:text-aqua-800">
                  <Award className="h-4 w-4 text-gold" /> KCSE Performance Analysis
                </Link>
                <Link href="/downloads" onClick={() => setSearchOpen(false)} className="flex min-h-11 items-center gap-2 rounded-lg bg-slate-50 p-2.5 transition hover:bg-aqua/10 hover:text-aqua-800">
                  <FileText className="h-4 w-4 text-slate-600" /> Fee Structure & Rules
                </Link>
                <Link href="/login" onClick={() => setSearchOpen(false)} className="flex min-h-11 items-center gap-2 rounded-lg bg-slate-50 p-2.5 transition hover:bg-aqua/10 hover:text-aqua-800">
                  <ShieldCheck className="h-4 w-4 text-aqua" /> Portal Login (Students/Staff)
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
