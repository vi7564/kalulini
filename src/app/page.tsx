'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Activity,
  ArrowRight,
  Award,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Quote,
  School,
  Sparkles,
  Star,
  Users
} from 'lucide-react';
import { AnnouncementBar } from '@/components/public/AnnouncementBar';
import { Footer } from '@/components/public/Footer';
import { BackToTopButton } from '@/components/public/BackToTopButton';
import { Navbar } from '@/components/public/Navbar';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Reveal } from '@/components/ui/Reveal';

const institutionalStats = [
  {
    label: 'Enrolled Scholars',
    value: 840,
    suffix: '+',
    description: 'Disciplined young men across Forms 1 to 4 boarding streams.',
  },
  {
    label: 'Qualified Faculty',
    value: 42,
    suffix: '',
    description: 'Experienced TSC and BOM instructors driving subject mastery.',
  },
  {
    label: 'Academic Departments',
    value: 4,
    suffix: '',
    description: 'Sciences, Languages, Humanities, and Technical Studies.',
  },
  {
    label: 'Clubs & Societies',
    value: 18,
    suffix: '+',
    description: 'Active co-curricular groups including STEM, Rugby, and Debate.',
  },
];

const departments = [
  {
    name: 'Sciences & Mathematics',
    lead: 'Mr. Patrick Wanyama',
    description: 'Modern laboratories, empirical inquiry, robotics, and problem-solving methodologies.',
  },
  {
    name: 'Languages',
    lead: 'Mrs. Florence Nduku',
    description: 'English and Kiswahili fluency, essay composition, literature critique, and confident public debate.',
  },
  {
    name: 'Humanities & Social Sciences',
    lead: 'Mr. David Mutiso',
    description: 'History, Geography, and C.R.E fostering deep civic consciousness, ethical leadership, and critical analysis.',
  },
  {
    name: 'Technical & Applied Studies',
    lead: 'Eng. Titus Kilonzo',
    description: 'Practical digital literacy in Computer Studies, Agriculture, and Business Studies for real-world application.',
  },
];

const events = [
  {
    title: 'Science & Innovation Week',
    date: '15 Jan 2027',
    venue: 'STEM Centre',
    description: 'Student-led engineering projects, empirical exhibitions, and robotics demonstrations.',
  },
  {
    title: 'Parent-Teacher Consultative Forum',
    date: '22 Jan 2027',
    venue: 'Assembly Hall',
    description: 'Comprehensive discussions on learner academic progression, character development, and wellbeing.',
  },
  {
    title: 'Inter-House Sports & Athletics',
    date: '04 Feb 2027',
    venue: 'Main Field',
    description: 'Track, rugby, football, and cultural presentations across all boarding house systems.',
  },
];

const blogPosts = [
  {
    title: 'How our STEM culture shapes confident future leaders',
    category: 'Innovation',
    excerpt: 'Learners engage with inquiry-led projects bridging secondary syllabus theory with practical real-world solutions.',
  },
  {
    title: 'The power of structured mentorship in academic excellence',
    category: 'Mentorship',
    excerpt: 'Faculty guidance, peer tutoring, and pastoral counseling create a disciplined and supportive learning environment.',
  },
  {
    title: 'Building discipline, courage and service in every boy',
    category: 'Character',
    excerpt: 'Core institutional values are reinforced through student leadership councils, clubs, and community outreach.',
  },
];

const testimonials = [
  {
    quote: 'Kalulini taught me how to think independently, lead with integrity and work hard with purpose.',
    name: 'Joseph M.',
    role: 'Alumnus, University of Nairobi',
  },
  {
    quote: 'The school combines high standards with a warm, disciplined culture where boys grow into responsible adults.',
    name: 'Peter K.',
    role: 'Parent of Form 4 student',
  },
  {
    quote: 'The teachers are deeply invested in every learner and the academic environment is challenging and supportive.',
    name: 'David N.',
    role: 'Faculty Instructor & Mentor',
  },
];

const schoolStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'School',
  name: 'Kalulini Boys High School',
  url: 'https://kaluliniboys.ac.ke',
  description: 'A public boys’ boarding Extra-County secondary school (C2) in Kibwezi, Makueni County, Kenya.',
  telephone: '+254792511717',
  email: 'info@kaluliniboys.ac.ke',
  identifier: [
    { '@type': 'PropertyValue', propertyID: 'KNEC code', value: '18325201' },
    { '@type': 'PropertyValue', propertyID: 'UIC', value: 'CEK8' },
  ],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Kibwezi',
    addressRegion: 'Makueni County',
    addressCountry: 'KE',
  },
};

export default function HomePage() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [email, setEmail] = useState('');
  const [newsletterError, setNewsletterError] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  const handlePrev = () => setActiveTestimonial((current) => (current === 0 ? testimonials.length - 1 : current - 1));
  const handleNext = () => setActiveTestimonial((current) => (current + 1) % testimonials.length);

  const handleNewsletterSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = email.trim();
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);

    if (!isValid) {
      setNewsletterError('Please enter a valid email address.');
      setNewsletterSuccess(false);
      return;
    }

    setNewsletterError('');
    setNewsletterSuccess(true);
    setEmail('');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schoolStructuredData).replace(/</g, '\\u003c') }}
      />
      <AnnouncementBar />
      <Navbar />

      <main className="pb-20 md:pb-0">
        {/* Hero Section */}
        <section className="relative isolate overflow-hidden bg-slate-950 text-white">
          <Image
            src="/image1.webp"
            alt="Kalulini Boys High School Campus"
            fill
            priority
            unoptimized
            sizes="100vw"
            className="object-cover object-center sm:object-[68%_center] transition-transform duration-1000 ease-out hover:scale-105"
          />
          {/* Reduced directional overlay: maintains strong text contrast on the left, clear and sharp on the right */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/55 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-slate-950/20 pointer-events-none" />

          <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
            <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
              <Reveal className="!translate-y-0 !opacity-100">
                <div className="rounded-2xl sm:rounded-3xl border border-slate-800 bg-slate-900/90 backdrop-blur-md p-6 sm:p-8 lg:p-10 shadow-2xl">
                  <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-aqua-500/40 bg-aqua-950/80 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-aqua-300">
                    <Sparkles className="h-3.5 w-3.5 text-gold" />
                    <span>Extra-County Public Boarding School</span>
                  </div>
                  <h1 className="max-w-xl text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl font-display leading-tight">
                    Kalulini Boys High School
                  </h1>
                  <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
                    A disciplined, purpose-driven learning community in Kibwezi, Makueni County, nurturing academic distinction, STEM innovation, and servant leadership in every young man.
                  </p>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <Link
                      href="/admissions/apply"
                      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-gold px-6 py-3.5 font-bold text-slate-950 shadow-md transition hover:bg-gold-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aqua-400"
                    >
                      Apply for Admission <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      href="/academics"
                      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800/90 px-6 py-3.5 font-semibold text-slate-100 shadow-sm transition hover:bg-slate-700 hover:border-slate-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aqua-400"
                    >
                      Explore Academics
                    </Link>
                  </div>

                  <div className="mt-8 grid gap-3 sm:grid-cols-3">
                    <div className="flex items-center gap-2.5 rounded-xl border border-slate-800 bg-slate-950/70 p-3">
                      <Sparkles className="h-4 w-4 text-gold shrink-0" />
                      <span className="text-xs font-medium text-slate-300">CBC & KNEC Aligned</span>
                    </div>
                    <div className="flex items-center gap-2.5 rounded-xl border border-slate-800 bg-slate-950/70 p-3">
                      <GraduationCap className="h-4 w-4 text-aqua-400 shrink-0" />
                      <span className="text-xs font-medium text-slate-300">STEM Focused Labs</span>
                    </div>
                    <div className="flex items-center gap-2.5 rounded-xl border border-slate-800 bg-slate-950/70 p-3">
                      <School className="h-4 w-4 text-gold shrink-0" />
                      <span className="text-xs font-medium text-slate-300">Category C2 Institution</span>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.08} className="!translate-y-0 !opacity-100">
                <div className="rounded-2xl sm:rounded-3xl border border-white/20 bg-slate-950/50 backdrop-blur-md p-6 sm:p-7 text-white shadow-2xl">
                  <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-4">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-gold">Institutional Snapshot</span>
                      <h3 className="text-sm font-semibold text-slate-200 mt-0.5">Verified School Profile</h3>
                    </div>
                    <Badge variant="gold" size="sm">Admissions Open</Badge>
                  </div>

                  <div className="mt-5 space-y-3.5">
                    <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-slate-900/60 backdrop-blur-sm p-3.5">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-aqua-950/80 text-aqua-400 border border-aqua-800/50">
                        <Users className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <div>
                        <div className="text-2xl font-black text-white font-display">
                          <AnimatedCounter value={840} suffix="+" />
                        </div>
                        <div className="text-xs font-medium text-slate-300">Enrolled Boarding Scholars</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-slate-900/60 backdrop-blur-sm p-3.5">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-950/80 text-gold border border-amber-800/50">
                        <GraduationCap className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <div>
                        <div className="text-2xl font-black text-white font-display">
                          <AnimatedCounter value={42} />
                        </div>
                        <div className="text-xs font-medium text-slate-300">TSC & BOM Teaching Staff</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-slate-900/60 backdrop-blur-sm p-3.5">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-aqua-950/80 text-aqua-400 border border-aqua-800/50">
                        <BookOpen className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <div>
                        <div className="text-2xl font-black text-white font-display">
                          <AnimatedCounter value={4} />
                        </div>
                        <div className="text-xs font-medium text-slate-300">Academic Departments & 12 Subjects</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                    <span>KNEC Code: <strong className="text-slate-200">18325201</strong></span>
                    <span>UIC: <strong className="text-slate-200">CEK8</strong></span>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Quick Facts and Contact Ribbon */}
        <section aria-label="School facts and contact details" className="border-b border-slate-200 bg-white">
          <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-slate-200 px-4 py-3 sm:grid-cols-2 sm:divide-y-0 sm:gap-x-6 sm:gap-y-3 lg:grid-cols-4 lg:gap-y-0 sm:px-6 lg:px-8">
            <div className="flex min-h-14 items-center gap-3.5 py-3 sm:px-2">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-aqua-50 border border-aqua-100 text-aqua-700">
                <School className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">School Identifiers</p>
                <p className="text-sm font-semibold text-slate-900">KNEC 18325201 &bull; UIC CEK8</p>
              </div>
            </div>
            <div className="flex min-h-14 items-center gap-3.5 py-3 sm:px-2">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 border border-amber-200/80 text-amber-800">
                <MapPin className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Campus Location</p>
                <p className="text-sm font-semibold text-slate-900">Kibwezi, Makueni County</p>
              </div>
            </div>
            <a
              href="tel:+254792511717"
              className="group flex min-h-14 items-center gap-3.5 py-3 sm:px-2 text-slate-800 hover:text-aqua-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aqua-700 transition-colors"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-aqua-50 border border-aqua-100 text-aqua-700 group-hover:bg-aqua-100 transition-colors">
                <Phone className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">Admissions Desk</span>
                <span className="block text-sm font-semibold text-slate-900 group-hover:text-aqua-800">0792 511 717</span>
              </div>
            </a>
            <a
              href="mailto:info@kaluliniboys.ac.ke"
              className="group flex min-h-14 items-center gap-3.5 py-3 sm:px-2 text-slate-800 hover:text-aqua-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aqua-700 transition-colors"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-aqua-50 border border-aqua-100 text-aqua-700 group-hover:bg-aqua-100 transition-colors">
                <Mail className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">Official Inquiries</span>
                <span className="block break-all text-sm font-semibold text-slate-900 group-hover:text-aqua-800">info@kaluliniboys.ac.ke</span>
              </div>
            </a>
          </div>
        </section>

        {/* Institutional Pillars / Statistics */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mb-10 text-center max-w-2xl mx-auto">
              <Badge variant="aqua">Institutional Pillars</Badge>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl font-display">
                Excellence in Learning, Leadership & Character
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
                Key foundational milestones that distinguish Kalulini Boys High School as an extra-county center of academic distinction.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {institutionalStats.map((item, index) => {
              const StatIcon = [Users, GraduationCap, BookOpen, Award][index];
              return (
                <Reveal key={item.label} delay={index * 0.05}>
                  <div className="group rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm hover:shadow-md hover:border-aqua-400 transition-all duration-300 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-aqua-50 border border-aqua-200/70 text-aqua-700 group-hover:scale-105 group-hover:bg-aqua-600 group-hover:text-white transition-all">
                          <StatIcon className="h-5 w-5" aria-hidden="true" />
                        </div>
                        <div className="h-1 w-8 rounded-full bg-gradient-to-r from-aqua-500 to-gold opacity-60 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display tracking-tight">
                        <AnimatedCounter value={item.value} suffix={item.suffix} />
                      </div>
                      <h3 className="mt-2 text-base font-bold text-slate-900">{item.label}</h3>
                      <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-slate-600">{item.description}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* Academic Pathways */}
        <section className="bg-slate-100/70 py-16 border-y border-slate-200/80">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="mb-10 text-center max-w-2xl mx-auto">
                <Badge variant="gold">Academic Pathways</Badge>
                <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl font-display">
                  Four Departments Driving Achievement
                </h2>
                <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
                  Rigorous curriculum implementation across sciences, languages, humanities, and applied digital technology.
                </p>
              </div>
            </Reveal>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {departments.map((department, index) => {
                const DeptIcon = [BookOpen, Sparkles, School, Activity][index];
                return (
                  <Reveal key={department.name} delay={index * 0.06}>
                    <div className="group rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm hover:shadow-md hover:border-aqua-400 transition-all duration-300 flex flex-col justify-between">
                      <div>
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-aqua-50 border border-aqua-200/80 text-aqua-700 group-hover:scale-105 group-hover:bg-aqua-600 group-hover:text-white transition-all">
                          <DeptIcon className="h-6 w-6" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-aqua-800 transition-colors">
                          {department.name}
                        </h3>
                        <p className="mt-1.5 text-xs font-semibold text-gold-700">Lead: {department.lead}</p>
                        <p className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-600">{department.description}</p>
                      </div>
                      <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                        <Link href="/academics" className="inline-flex items-center gap-1 text-aqua-700 hover:text-aqua-800 font-semibold group-hover:underline">
                          View details <ArrowRight className="h-3 w-3" />
                        </Link>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* Admissions CTA */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <Reveal>
            <div className="overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 p-8 text-white shadow-xl sm:p-12">
              <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-2xl space-y-4">
                  <Badge variant="gold">Admissions Open 2026/2027</Badge>
                  <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl font-display text-white">
                    Join a Community Committed to Distinction
                  </h2>
                  <p className="text-sm sm:text-base leading-relaxed text-slate-300">
                    Applications are open for Form 1 learners and qualified transfer scholars seeking a structured, disciplined, and high-performing boarding environment in Makueni County.
                  </p>
                  <div className="flex flex-wrap gap-4 pt-1 text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-gold shrink-0" />
                      <span>Ministry Approved Fees</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-aqua-400 shrink-0" />
                      <span>Instant Application Reference</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-gold shrink-0" />
                      <span>Comprehensive Boarding Care</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row lg:flex-col sm:shrink-0">
                  <Link
                    href="/admissions/apply"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-gold px-6 py-3.5 font-bold text-slate-950 shadow-md transition hover:bg-gold-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aqua-400"
                  >
                    Apply Online Now <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/admissions"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800/80 px-6 py-3.5 font-semibold text-slate-100 shadow-sm transition hover:bg-slate-700 hover:border-slate-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aqua-400"
                  >
                    View Requirements & Fees
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* Testimonials */}
        <section className="bg-slate-100/70 py-16 border-y border-slate-200/80">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="mb-10 text-center max-w-2xl mx-auto">
                <Badge variant="aqua">Community Voices</Badge>
                <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl font-display">
                  What Parents, Alumni & Mentors Say
                </h2>
              </div>
            </Reveal>

            <Reveal>
              <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm sm:p-10 max-w-4xl mx-auto">
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-aqua-50 border border-aqua-200/70 text-aqua-700">
                    <Quote className="h-6 w-6" />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handlePrev}
                      className="min-h-11 min-w-11 rounded-xl border border-slate-200 p-2 text-slate-700 transition hover:bg-slate-100 hover:border-slate-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aqua-700"
                      aria-label="Previous testimonial"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                      onClick={handleNext}
                      className="min-h-11 min-w-11 rounded-xl border border-slate-200 p-2 text-slate-700 transition hover:bg-slate-100 hover:border-slate-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aqua-700"
                      aria-label="Next testimonial"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <p className="mt-8 text-xl font-medium leading-relaxed text-slate-800 sm:text-2xl">
                  &ldquo;{testimonials[activeTestimonial].quote}&rdquo;
                </p>
                <div className="mt-6 flex items-center justify-between gap-3 border-t border-slate-100 pt-5">
                  <div>
                    <p className="font-bold text-slate-900 text-base">{testimonials[activeTestimonial].name}</p>
                    <p className="text-xs sm:text-sm text-slate-500">{testimonials[activeTestimonial].role}</p>
                  </div>
                  <div className="flex gap-1 text-gold">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current text-gold" aria-hidden="true" />
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex gap-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveTestimonial(index)}
                      className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aqua-700"
                      aria-label={`Go to testimonial ${index + 1}`}
                      aria-pressed={index === activeTestimonial}
                    >
                      <span
                        aria-hidden="true"
                        className={`h-2.5 rounded-full transition-all duration-300 ${
                          index === activeTestimonial ? 'w-10 bg-aqua-700' : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* News and Updates */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mb-10 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <Badge variant="gold">Latest Stories</Badge>
                <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl font-display">
                  School News & Updates
                </h2>
              </div>
              <Link
                href="/news"
                className="inline-flex items-center gap-2 text-sm font-bold text-aqua-700 hover:text-aqua-800 transition-colors"
              >
                View all updates <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>

          <div className="grid gap-6 lg:grid-cols-3">
            {blogPosts.map((post, index) => (
              <Reveal key={post.title} delay={index * 0.05}>
                <div className="group rounded-2xl border border-slate-200/90 bg-white shadow-sm hover:shadow-md hover:border-aqua-400 transition-all duration-300 overflow-hidden flex flex-col justify-between">
                  <div>
                    <div className="bg-slate-100 border-b border-slate-200 p-5 flex items-center justify-between">
                      <span className="inline-flex items-center rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
                        {post.category}
                      </span>
                      <span className="text-xs font-medium text-slate-500">Official Bulletin</span>
                    </div>
                    <div className="p-6">
                      <p className="text-xs font-medium text-slate-500">12 Dec 2026</p>
                      <h3 className="mt-2 text-lg font-bold text-slate-900 group-hover:text-aqua-800 transition-colors leading-snug">
                        {post.title}
                      </h3>
                      <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-slate-600">{post.excerpt}</p>
                    </div>
                  </div>
                  <div className="px-6 pb-6">
                    <Link
                      href="/news"
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-aqua-700 hover:text-aqua-800 transition-colors"
                    >
                      Read full story <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="bg-slate-900 py-16 text-white border-t border-slate-800">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="mb-10 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <Badge variant="gold">School Calendar</Badge>
                  <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl font-display text-white">
                    Upcoming Campus Events
                  </h2>
                </div>
                <Link
                  href="/events"
                  className="inline-flex items-center gap-2 text-sm font-bold text-aqua-400 hover:text-aqua-300 transition-colors"
                >
                  View full calendar <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>

            <div className="grid gap-6 lg:grid-cols-3">
              {events.map((event, index) => (
                <Reveal key={event.title} delay={index * 0.05}>
                  <div className="rounded-2xl border border-slate-800 bg-slate-800/80 p-6 text-white shadow-sm hover:border-slate-700 transition-all flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="rounded-full bg-aqua-950/80 border border-aqua-800/60 px-3 py-1 text-xs font-semibold text-aqua-300">
                          {event.venue}
                        </span>
                        <div className="flex items-center gap-1.5 text-xs text-gold font-medium">
                          <CalendarDays className="h-4 w-4 text-gold" />
                          <span>{event.date}</span>
                        </div>
                      </div>
                      <h3 className="text-lg font-bold text-white">{event.title}</h3>
                      <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-slate-300">{event.description}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Subscription */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <Reveal>
            <div className="overflow-hidden rounded-3xl bg-white border border-slate-200/90 p-8 shadow-sm sm:p-12">
              <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
                <div>
                  <Badge variant="aqua">Stay Informed</Badge>
                  <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl font-display">
                    Subscribe for School Announcements
                  </h2>
                  <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-600 max-w-xl">
                    Receive official circulars, key academic dates, examination notices, and admission updates directly from the administration.
                  </p>
                </div>

                <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <div className="relative flex-1">
                      <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                      <input
                        type="email"
                        value={email}
                        onChange={(event) => {
                          setEmail(event.target.value);
                          if (newsletterError) setNewsletterError('');
                          if (newsletterSuccess) setNewsletterSuccess(false);
                        }}
                        placeholder="Enter parent or guardian email..."
                        className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-10 pr-4 text-sm text-slate-800 outline-none transition focus:border-aqua-600 focus:ring-1 focus:ring-aqua-600"
                        aria-label="Email address"
                      />
                    </div>
                    <Button type="submit" variant="primary" className="min-h-11 px-6">
                      Subscribe
                    </Button>
                  </div>

                  {newsletterError && <p className="text-sm font-medium text-rose-600">{newsletterError}</p>}
                  {newsletterSuccess && (
                    <p className="flex items-center gap-2 text-sm font-medium text-emerald-600">
                      <CheckCircle2 className="h-4 w-4" /> Thank you! You have subscribed to official school bulletins.
                    </p>
                  )}
                </form>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      <BackToTopButton />
      <Footer />
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200 bg-white/95 px-4 pb-[max(env(safe-area-inset-bottom),0.75rem)] pt-3 shadow-[0_-4px_16px_rgba(15,23,42,0.12)] backdrop-blur md:hidden">
        <Link
          href="/admissions/apply"
          className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-gold px-5 py-3 text-sm font-bold text-slate-950 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aqua-700"
        >
          Apply for Admission <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
