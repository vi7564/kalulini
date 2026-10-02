'use client';

import React from 'react';
import { Quote, GraduationCap, MapPin, Phone, Mail, Award, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export const TestimonialsAndAlumni: React.FC = () => {
  const testimonials = [
    {
      name: 'Eng. Dennis Muthoka',
      title: 'Senior Civil Engineer, Class of 2014',
      quote: 'Kalulini Boys imparted rigorous mathematical discipline and moral resilience. The teachers believed in our potential even when we doubted ourselves.',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      badge: 'Alumni Network'
    },
    {
      name: 'Mrs. Beatrice Musau',
      title: 'Parent (Form 4 Candidate & Form 2 Student)',
      quote: 'The transformation in my boys’ character and self-discipline since joining Kalulini is remarkable. Transparent fee structures and supportive administration make all the difference.',
      photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      badge: 'PTA Parent'
    },
    {
      name: 'Dr. Kevin K. Kituku',
      title: 'Medical Officer, Kenyatta National Hospital, Class of 2011',
      quote: 'The science laboratory foundation at Kalulini Boys was second to none. Our chemistry and biology practicals gave me an early passion for medicine.',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
      badge: 'Alumni Doctor'
    }
  ];

  return (
    <section className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-gold-600">
            Voices of Kalulini
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-charcoal-900 tracking-tight mt-1">
            Alumni Distinction & Parent Reflections
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            The impact of our educational model through the experiences of graduates and families.
          </p>
        </div>

        {/* 3 Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((item, i) => (
            <div
              key={i}
              className="bg-slate-50/80 rounded-2xl p-6 border border-slate-200 hover:border-aqua-400 transition-all flex flex-col justify-between shadow-sm group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-aqua-50 text-aqua-800 border border-aqua-200">
                    {item.badge}
                  </span>
                  <Quote className="w-5 h-5 text-gold-400 opacity-80" />
                </div>
                <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200/80 flex items-center gap-3">
                <img
                  src={item.photo}
                  alt={item.name}
                  className="w-10 h-10 rounded-full object-cover border border-slate-300"
                />
                <div>
                  <h4 className="text-xs font-bold text-charcoal-900 group-hover:text-aqua-700 transition-colors">
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-slate-500">{item.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Location / Campus Map & Contact Preview (Sections 18 & 19) */}
        <div className="bg-charcoal-900 rounded-3xl p-8 sm:p-12 text-white border border-charcoal-800 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-gold-400">
                School Location & Contacts
              </span>
              <h3 className="text-2xl font-bold font-display tracking-tight text-white">
                Visiting Our Campus in Makueni County
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Kalulini Boys High School is located in a serene, quiet learning environment conducive to intense concentration and holistic character development. Accessible via standard all-weather roads.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-aqua-400 shrink-0 mt-0.5" />
                  <span>P.O. Box 24 - 90130, Kalulini, Makueni County, Kenya</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-aqua-400 shrink-0" />
                  <span>+254 700 000 000 / +254 722 000 000</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-aqua-400 shrink-0" />
                  <span>admissions@kaluliniboys.ac.ke</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Visiting Hours: Official Term Visiting Days Only</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-aqua-400 hover:text-aqua-300"
                >
                  Send an Inquiry to Administration &rarr;
                </Link>
              </div>
            </div>

            {/* Visual Simulated Map Card */}
            <div className="lg:col-span-5 bg-charcoal-800 rounded-2xl p-6 border border-charcoal-700 flex flex-col justify-between h-64 text-center">
              <div className="flex-1 flex flex-col items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-aqua-600/20 text-aqua-400 flex items-center justify-center mb-2">
                  <MapPin className="w-6 h-6 animate-bounce" />
                </div>
                <h4 className="font-bold text-sm text-white">Kalulini High School Campus</h4>
                <p className="text-xs text-slate-400 mt-1">Makueni County &bull; Kenya</p>
                <p className="text-[11px] text-slate-500 mt-2">GPS: -1.7820° S, 37.6250° E (Approximate)</p>
              </div>
              <Link
                href="/contact"
                className="w-full py-2.5 rounded-lg bg-aqua-600 hover:bg-aqua-700 text-white font-semibold text-xs transition-colors"
              >
                Get Driving Directions & Inquiry Form
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
