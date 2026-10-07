'use client';

import { useState, type FormEvent } from 'react';
import { CheckCircle2, ChevronLeft, ChevronRight, Mail, Quote, Star } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Reveal } from '@/components/ui/Reveal';

const testimonials = [
  { quote: 'Kalulini taught me how to think independently, lead with integrity and work hard with purpose.', name: 'Joseph M.', role: 'Alumnus, University of Nairobi' },
  { quote: 'The school combines high standards with a warm, disciplined culture where boys grow into responsible adults.', name: 'Peter K.', role: 'Parent of Form 4 student' },
  { quote: 'The teachers are deeply invested in every learner and the academic environment is challenging and supportive.', name: 'David N.', role: 'Teacher & Mentor' },
];

export function HomeTestimonials() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const handlePrev = () => setActiveTestimonial((current) => (current === 0 ? testimonials.length - 1 : current - 1));
  const handleNext = () => setActiveTestimonial((current) => (current + 1) % testimonials.length);

  return (
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
                <Quote className="h-6 w-6" aria-hidden="true" />
              </div>
              <div className="flex gap-2">
                <button onClick={handlePrev} className="min-h-11 min-w-11 rounded-lg border border-slate-200 p-2 text-slate-700 transition hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aqua-700" aria-label="Previous testimonial"><ChevronLeft className="h-4 w-4" /></button>
                <button onClick={handleNext} className="min-h-11 min-w-11 rounded-lg border border-slate-200 p-2 text-slate-700 transition hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aqua-700" aria-label="Next testimonial"><ChevronRight className="h-4 w-4" /></button>
              </div>
            </div>

            <p className="mt-8 text-xl font-medium leading-9 text-slate-700 sm:text-2xl">“{testimonials[activeTestimonial].quote}”</p>
            <div className="mt-6 flex items-center justify-between gap-3 border-t border-slate-200 pt-5">
              <div>
                <p className="font-bold text-charcoal">{testimonials[activeTestimonial].name}</p>
                <p className="text-sm text-slate-500">{testimonials[activeTestimonial].role}</p>
              </div>
              <div className="flex gap-1 text-gold">
                {Array.from({ length: 5 }).map((_, index) => <Star key={index} className="h-4 w-4 fill-current" aria-hidden="true" />)}
              </div>
            </div>

            <div className="mt-6 flex gap-2">
              {testimonials.map((_, index) => (
                <button key={index} onClick={() => setActiveTestimonial(index)} className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aqua-700" aria-label={`Go to testimonial ${index + 1}`} aria-pressed={index === activeTestimonial}><span aria-hidden="true" className={`h-2.5 rounded-full transition ${index === activeTestimonial ? 'w-10 bg-aqua-700' : 'w-2.5 bg-slate-400'}`} /></button>
              ))}
            </div>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}

export function HomeNewsletter() {
  const [email, setEmail] = useState('');
  const [newsletterError, setNewsletterError] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
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
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <Reveal>
        <Card className="overflow-hidden rounded-3xl bg-slate-50 p-6 sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <Badge variant="aqua">Stay informed</Badge>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-charcoal sm:text-4xl">Subscribe for school updates</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">Receive official announcements, key dates and admission updates from Kalulini Boys High School.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative flex-1">
                  <Mail className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" aria-hidden="true" />
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      if (newsletterError) setNewsletterError('');
                      if (newsletterSuccess) setNewsletterSuccess(false);
                    }}
                    placeholder="Your email address"
                    className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm text-slate-700 outline-none transition focus:border-aqua focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aqua-700"
                    aria-label="Email address"
                  />
                </div>
                <Button type="submit" variant="primary" className="min-h-11">Subscribe</Button>
              </div>

              {newsletterError && <p role="alert" className="text-sm text-rose-600">{newsletterError}</p>}
              {newsletterSuccess && <p role="status" className="flex items-center gap-2 text-sm text-emerald-600"><CheckCircle2 className="h-4 w-4" aria-hidden="true" /> Thank you! You are subscribed.</p>}
            </form>
          </div>
        </Card>
      </Reveal>
    </section>
  );
}
