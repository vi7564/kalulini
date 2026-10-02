'use client';

import Link from 'next/link';
import { ArrowRight, BookOpen, Leaf, Users, HeartHandshake } from 'lucide-react';
import { AnnouncementBar } from '@/components/public/AnnouncementBar';
import { Navbar } from '@/components/public/Navbar';
import { Footer } from '@/components/public/Footer';

const sdgGoals = [
  {
    title: 'Quality Education',
    text: 'We ensure every learner accesses purposeful, inclusive education that builds confidence, creativity, and academic excellence.',
    icon: BookOpen,
  },
  {
    title: 'Gender Equality',
    text: 'Our school promotes respect, opportunity, and equal participation so every boy can thrive in a supportive environment.',
    icon: Users,
  },
  {
    title: 'Climate Action',
    text: 'We teach environmental stewardship through tree planting, clean-up campaigns, and practical sustainability projects.',
    icon: Leaf,
  },
  {
    title: 'Partnerships for Growth',
    text: 'We collaborate with families, institutions, and communities to create meaningful learning and service opportunities.',
    icon: HeartHandshake,
  },
];

export default function SDGsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-800">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1">
        <section className="border-b border-charcoal-800 bg-charcoal-900 px-4 py-16 text-white sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-gold-400">Sustainable development</span>
            <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">Global goals, local action</h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
              Kalulini Boys High School is committed to real-world learning that develops capable young men and supports a resilient, inclusive society.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {sdgGoals.map(({ title, text, icon: Icon }) => (
              <div key={title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-aqua-50 text-aqua-600">
                  <Icon className="h-6 w-6" />
                </div>
                <h2 className="text-xl font-bold text-charcoal-900">{title}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-y border-slate-200 bg-white px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-aqua-600">Our school focus</span>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-charcoal-900">Building responsible changemakers</h2>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              <div className="rounded-3xl bg-slate-900 p-8 text-white">
                <h3 className="text-2xl font-bold">From classroom learning to community service</h3>
                <ul className="mt-6 space-y-4 text-sm text-slate-200">
                  <li>• Leadership clubs that promote civic responsibility and mentoring.</li>
                  <li>• Environmental projects such as tree planting, recycling, and campus hygiene.</li>
                  <li>• Student mentorship pathways that support wellbeing and positive relationships.</li>
                  <li>• School-community partnerships that extend learning beyond the classroom.</li>
                </ul>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8">
                <h3 className="text-2xl font-bold text-charcoal-900">What we measure</h3>
                <div className="mt-6 space-y-5">
                  {[
                    ['Academic inclusion', '96% student participation in structured learning support.'],
                    ['Environmental action', 'Annual campus clean-up and sustainability initiatives across all houses.'],
                    ['Student leadership', 'Active participation in clubs, service projects, and school governance.'],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-xl border border-slate-200 bg-white p-4">
                      <div className="text-xs font-bold uppercase tracking-[0.2em] text-gold-600">{label}</div>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-r from-aqua-600 to-sky-600 p-8 text-white shadow-soft sm:p-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-aqua-100">Take the next step</span>
                <h3 className="mt-3 text-3xl font-black tracking-tight">Be part of a school that leads with purpose</h3>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link href="/admissions/apply" className="inline-flex items-center justify-center gap-2 rounded-xl bg-gold px-6 py-3 font-bold text-charcoal">
                  Apply now <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/news" className="inline-flex items-center justify-center rounded-xl border border-white/30 bg-white/10 px-6 py-3 font-semibold text-white">
                  Read school stories
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
