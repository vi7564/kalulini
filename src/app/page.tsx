'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Award, BookOpen, CalendarDays, CheckCircle2, ChevronLeft, ChevronRight, GraduationCap, Mail, MapPin, Quote, Sparkles, Star } from 'lucide-react';
import { AnnouncementBar } from '@/components/public/AnnouncementBar';
import { Footer } from '@/components/public/Footer';
import { BackToTopButton } from '@/components/public/BackToTopButton';
import { Navbar } from '@/components/public/Navbar';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Reveal } from '@/components/ui/Reveal';

const kcseStats = [
  { label: 'Mean Score', value: 8.7, suffix: '/10', description: 'Strong academic performance across core subjects.' },
  { label: 'University Entry', value: 92, suffix: '%', description: 'Learners qualify for higher education pathways.' },
  { label: 'Science Proficiency', value: 89, suffix: '%', description: 'Excellence in STEM and analytical reasoning.' },
  { label: 'Student Support', value: 1, suffix: 'k+', description: 'Academic mentoring and wellness guidance.' },
];

const departments = [
  { name: 'Sciences & Mathematics', lead: 'Mr. Patrick Wanyama', description: 'Modern labs, problem-solving, and research-based inquiry.' },
  { name: 'Languages', lead: 'Mrs. Florence Nduku', description: 'Communication, literature, and confident public speaking.' },
  { name: 'Humanities', lead: 'Mr. David Mutiso', description: 'Critical thinking, civic awareness, and ethics.' },
  { name: 'Technology & Innovation', lead: 'Mr. Daniel Mwangangi', description: 'Digital literacy, creativity, and entrepreneurship.' },
];

const events = [
  { title: 'Science & Innovation Week', date: '15 Jan 2027', venue: 'STEM Centre', description: 'Projects, exhibitions, and robotics demonstrations led by students.' },
  { title: 'Parent-Teacher Forum', date: '22 Jan 2027', venue: 'Assembly Hall', description: 'Open discussions on student progress, wellbeing, and discipline.' },
  { title: 'Inter-House Games', date: '04 Feb 2027', venue: 'Main Field', description: 'Track, football and cultural competitions across house systems.' },
];

const blogPosts = [
  { title: 'How our STEM culture shapes confident future leaders', category: 'Innovation', excerpt: 'Students work on inquiry-led projects that bridge classroom theory with real-world challenges.' },
  { title: 'The power of mentorship in academic excellence', category: 'Wellbeing', excerpt: 'Teacher mentorship and counseling pathways create a supportive learning environment.' },
  { title: 'Building discipline, courage and service in every boy', category: 'Character', excerpt: 'Our school values are embedded through leadership, clubs and community engagement.' },
];

const testimonials = [
  { quote: 'Kalulini taught me how to think independently, lead with integrity and work hard with purpose.', name: 'Joseph M.', role: 'Alumnus, University of Nairobi' },
  { quote: 'The school combines high standards with a warm, disciplined culture where boys grow into responsible adults.', name: 'Peter K.', role: 'Parent of Form 4 student' },
  { quote: 'The teachers are deeply invested in every learner and the academic environment is challenging and supportive.', name: 'David N.', role: 'Teacher & Mentor' },
];

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
      <AnnouncementBar />
      <Navbar />

      <main>
        <section className="relative isolate overflow-hidden bg-charcoal text-white">
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/90 to-charcoal/70" />

          <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
            <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
              <Reveal>
                <div>
                  <Badge variant="aqua" className="mb-5 bg-white/10 text-aqua">Strive for excellence</Badge>
                  <h1 className="max-w-xl text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">Kalulini Boys High School</h1>
                  <p className="mt-5 max-w-xl text-base text-slate-200 sm:text-lg">A disciplined, purpose-driven learning community nurturing academic excellence, leadership and service in every boy.</p>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <Link href="/admissions/apply" className="inline-flex items-center justify-center gap-2 rounded-xl bg-gold px-6 py-3 font-bold text-charcoal shadow-soft transition hover:brightness-95">
                      Apply now <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link href="/academics" className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3 font-semibold text-white transition hover:bg-white/10">Explore academics</Link>
                  </div>

                  <div className="mt-8 grid gap-3 sm:grid-cols-3">
                    <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                      <div className="flex items-center gap-2 text-sm text-slate-200"><Sparkles className="h-4 w-4 text-gold" /> CBC-aligned</div>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                      <div className="flex items-center gap-2 text-sm text-slate-200"><GraduationCap className="h-4 w-4 text-aqua" /> STEM excellence</div>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                      <div className="flex items-center gap-2 text-sm text-slate-200"><Award className="h-4 w-4 text-gold" /> 92% university entry</div>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.08}>
                <Card className="rounded-3xl border-white/10 bg-white/5 p-5 shadow-2xl backdrop-blur-sm">
                  <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">2026/27</span>
                      <Badge variant="gold" size="sm">Admissions open</Badge>
                    </div>

                    <div className="mt-6 space-y-4">
                      {kcseStats.slice(0, 3).map((item) => (
                        <div key={item.label} className="rounded-xl border border-white/10 bg-slate-800/60 p-4">
                          <div className="text-3xl font-black text-white">
                            <AnimatedCounter value={item.value} suffix={item.suffix} />
                          </div>
                          <div className="mt-1 text-sm text-slate-300">{item.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mb-8 text-center">
              <Badge variant="aqua">Our impact</Badge>
              <h2 className="mt-5 text-3xl font-black tracking-tight text-charcoal sm:text-4xl">Excellence in learning, leadership and character</h2>
            </div>
          </Reveal>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {kcseStats.map((item, index) => (
              <Reveal key={item.label} delay={index * 0.05}>
                <Card hoverEffect className="p-6">
                  <div className="text-4xl font-black text-aqua">
                    <AnimatedCounter value={item.value} suffix={item.suffix} />
                  </div>
                  <p className="mt-3 text-lg font-semibold text-charcoal">{item.label}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="bg-slate-100 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="mb-8 text-center">
                <Badge variant="gold">Academic pathways</Badge>
                <h2 className="mt-5 text-3xl font-black tracking-tight text-charcoal sm:text-4xl">Departments driving achievement</h2>
              </div>
            </Reveal>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {departments.map((department, index) => (
                <Reveal key={department.name} delay={index * 0.06}>
                  <Card hoverEffect className="p-6">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-aqua/10 text-aqua">
                      <BookOpen className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold text-charcoal">{department.name}</h3>
                    <p className="mt-3 text-sm font-semibold text-slate-500">Lead: {department.lead}</p>
                    <p className="mt-4 text-sm leading-6 text-slate-600">{department.description}</p>
                  </Card>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <Reveal>
            <Card className="overflow-hidden rounded-3xl bg-gradient-to-r from-charcoal via-slate-900 to-slate-800 p-8 text-white shadow-soft sm:p-10">
              <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <Badge variant="gold" className="bg-gold/20 text-gold">Admissions 2027</Badge>
                  <h2 className="mt-5 text-3xl font-black tracking-tight sm:text-4xl">Join a community committed to excellence</h2>
                  <p className="mt-4 max-w-xl text-slate-200">Applications are open for Form 1 and transfer students seeking a disciplined, high-performing academic environment.</p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link href="/admissions/apply" className="inline-flex items-center justify-center gap-2 rounded-xl bg-gold px-6 py-3 font-bold text-charcoal">Apply now <ArrowRight className="h-4 w-4" /></Link>
                  <Link href="/admissions" className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 px-6 py-3 font-semibold text-white">View requirements</Link>
                </div>
              </div>
            </Card>
          </Reveal>
        </section>

        <section className="bg-slate-100 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="mb-8 text-center">
                <Badge variant="aqua">Student voices</Badge>
                <h2 className="mt-5 text-3xl font-black tracking-tight text-charcoal sm:text-4xl">Testimonials</h2>
              </div>
            </Reveal>

            <Reveal>
              <Card className="overflow-hidden p-6 sm:p-8">
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-aqua/10 text-aqua">
                    <Quote className="h-6 w-6" />
                  </div>
                  <div className="flex gap-2">
                    <button onClick={handlePrev} className="rounded-lg border border-slate-200 p-2 text-slate-700 transition hover:bg-slate-100" aria-label="Previous testimonial"><ChevronLeft className="h-4 w-4" /></button>
                    <button onClick={handleNext} className="rounded-lg border border-slate-200 p-2 text-slate-700 transition hover:bg-slate-100" aria-label="Next testimonial"><ChevronRight className="h-4 w-4" /></button>
                  </div>
                </div>

                <p className="mt-8 text-xl font-medium leading-9 text-slate-700 sm:text-2xl">“{testimonials[activeTestimonial].quote}”</p>
                <div className="mt-6 flex items-center justify-between gap-3 border-t border-slate-200 pt-5">
                  <div>
                    <p className="font-bold text-charcoal">{testimonials[activeTestimonial].name}</p>
                    <p className="text-sm text-slate-500">{testimonials[activeTestimonial].role}</p>
                  </div>
                  <div className="flex gap-1 text-gold">
                    {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                  </div>
                </div>

                <div className="mt-6 flex gap-2">
                  {testimonials.map((_, index) => (
                    <button key={index} onClick={() => setActiveTestimonial(index)} className={`h-2.5 rounded-full transition ${index === activeTestimonial ? 'w-10 bg-aqua' : 'w-2.5 bg-slate-300'}`} aria-label={`Go to testimonial ${index + 1}`} />
                  ))}
                </div>
              </Card>
            </Reveal>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <Badge variant="gold">Latest stories</Badge>
                <h2 className="mt-4 text-3xl font-black tracking-tight text-charcoal sm:text-4xl">News and blog</h2>
              </div>
              <Link href="/news" className="inline-flex items-center gap-2 text-sm font-semibold text-aqua">View all updates <ArrowRight className="h-4 w-4" /></Link>
            </div>
          </Reveal>

          <div className="grid gap-5 lg:grid-cols-3">
            {blogPosts.map((post, index) => (
              <Reveal key={post.title} delay={index * 0.05}>
                <Card hoverEffect className="overflow-hidden">
                  <div className="h-44 bg-gradient-to-br from-aqua/20 via-slate-100 to-gold/20 p-5">
                    <div className="flex h-full items-end">
                      <Badge variant="charcoal" className="bg-slate-900/85 text-white">{post.category}</Badge>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-sm text-slate-500">12 Dec 2026</p>
                    <h3 className="mt-3 text-xl font-bold text-charcoal">{post.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{post.excerpt}</p>
                    <Link href="/news" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-aqua">Read story <ArrowRight className="h-4 w-4" /></Link>
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="bg-slate-900 py-16 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <Badge variant="gold" className="bg-gold/20 text-gold">School calendar</Badge>
                  <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">Upcoming events</h2>
                </div>
                <Link href="/events" className="inline-flex items-center gap-2 text-sm font-semibold text-aqua">View all events <ArrowRight className="h-4 w-4" /></Link>
              </div>
            </Reveal>

            <div className="grid gap-5 lg:grid-cols-3">
              {events.map((event, index) => (
                <Reveal key={event.title} delay={index * 0.05}>
                  <Card className="overflow-hidden border-slate-700 bg-slate-800 p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div className="rounded-full bg-aqua/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-aqua">{event.venue}</div>
                      <CalendarDays className="h-5 w-5 text-gold" />
                    </div>
                    <h3 className="mt-5 text-xl font-bold">{event.title}</h3>
                    <p className="mt-2 text-sm font-medium text-slate-300">{event.date}</p>
                    <p className="mt-4 text-sm leading-6 text-slate-300">{event.description}</p>
                  </Card>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <Reveal>
            <Card className="overflow-hidden rounded-3xl bg-slate-50 p-6 sm:p-8">
              <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr] lg:items-center">
                <div>
                  <Badge variant="aqua">Stay informed</Badge>
                  <h2 className="mt-4 text-3xl font-black tracking-tight text-charcoal sm:text-4xl">Subscribe for school updates</h2>
                  <p className="mt-3 text-sm leading-6 text-slate-600">Receive official announcements, key dates and admission updates from Kalulini Boys High School.</p>
                </div>

                <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <div className="relative flex-1">
                      <Mail className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                      <input
                        type="email"
                        value={email}
                        onChange={(event) => {
                          setEmail(event.target.value);
                          if (newsletterError) setNewsletterError('');
                          if (newsletterSuccess) setNewsletterSuccess(false);
                        }}
                        placeholder="Your email address"
                        className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm text-slate-700 outline-none transition focus:border-aqua"
                        aria-label="Email address"
                      />
                    </div>
                    <Button type="submit" variant="primary">Subscribe</Button>
                  </div>

                  {newsletterError && <p className="text-sm text-rose-600">{newsletterError}</p>}
                  {newsletterSuccess && <p className="flex items-center gap-2 text-sm text-emerald-600"><CheckCircle2 className="h-4 w-4" /> Thank you! You are subscribed.</p>}
                </form>
              </div>
            </Card>
          </Reveal>
        </section>
      </main>

      <BackToTopButton />
      <Footer />
    </div>
  );
}
