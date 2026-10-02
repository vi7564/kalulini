'use client';

import React from 'react';
import { AnnouncementBar } from '@/components/public/AnnouncementBar';
import { Navbar } from '@/components/public/Navbar';
import { Footer } from '@/components/public/Footer';
import { DEPARTMENTS_DATA, SUBJECTS_DATA } from '@/lib/mockData';
import { BookOpen, Atom, Globe, Laptop, Award, CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function AcademicsPage() {
  const deptIcons = [Atom, Globe, BookOpen, Laptop];

  return (
    <div className="flex flex-col min-h-screen">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1">
        {/* Banner */}
        <section className="bg-charcoal-900 text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-charcoal-800">
          <div className="max-w-7xl mx-auto space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-400">
              Academics & Instructional Framework
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight">
              Curriculum, Departments & Academic Excellence
            </h1>
            <p className="text-slate-300 max-w-2xl text-sm sm:text-base leading-relaxed">
              Explore our structured academic syllabus, subject clusters, faculty leadership, and examination evaluation protocols.
            </p>
          </div>
        </section>

        {/* Academic Structure Overview */}
        <section className="py-16 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 space-y-5">
                <span className="text-xs font-bold uppercase tracking-widest text-aqua-600">
                  Curriculum Architecture
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold font-display text-charcoal-900">
                  Equipping Boys with Analytical Mastery Across STEM and Humanities
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Kalulini Boys High School strictly implements the Kenya National Examinations Council (KNEC) curriculum while actively incorporating Competency-Based Curriculum (CBC) senior secondary pathways. In Forms 1 and 2, students receive broad exposure across all foundational disciplines. In Form 3, guided career diagnostic tests help students select tailored subject combinations aligned with university degree requirements.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <h4 className="font-bold text-sm text-charcoal-900">Forms 1 & 2 Foundational Phase</h4>
                    <p className="text-xs text-slate-600 mt-1">11 compulsory subjects ensuring balanced cognitive grounding in math, sciences, languages, humanities, and computer studies.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <h4 className="font-bold text-sm text-charcoal-900">Forms 3 & 4 Specialization Phase</h4>
                    <p className="text-xs text-slate-600 mt-1">Specialized clusters for Engineering & STEM, Health Sciences, Law & Humanities, and Business & Economics.</p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 bg-charcoal-900 rounded-2xl p-6 text-white border border-charcoal-800">
                <h3 className="text-lg font-bold font-display text-gold-400 mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-gold-400" /> Assessment Framework
                </h3>
                <ul className="space-y-3 text-xs text-slate-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-aqua-400 shrink-0 mt-0.5" />
                    <span><strong>Continuous Assessment Tests (CATs):</strong> Administered bi-weekly to assess ongoing unit mastery.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-aqua-400 shrink-0 mt-0.5" />
                    <span><strong>Termly Examinations:</strong> Mid-Term Diagnostic Exams and comprehensive End of Term Summative papers.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-aqua-400 shrink-0 mt-0.5" />
                    <span><strong>KCSE Mock Series:</strong> Inter-school academic symposiums and joint county trial examinations for candidates.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-aqua-400 shrink-0 mt-0.5" />
                    <span><strong>Remedial Clinics:</strong> Tailored academic intervention clinics on Saturday mornings for challenging topics.</span>
                  </li>
                </ul>

                <div className="mt-6 pt-4 border-t border-charcoal-700">
                  <Link
                    href="/academics/kcse"
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-aqua-400 hover:text-aqua-300"
                  >
                    View National KCSE Statistics & Trends &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Academic Departments */}
        <section id="departments" className="py-16 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-aqua-600">
                Instructional Pillars
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-charcoal-900 mt-1">
                Our Four Academic Departments
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {DEPARTMENTS_DATA.map((dept, i) => {
                const Icon = deptIcons[i % deptIcons.length];
                return (
                  <div
                    key={dept.id}
                    className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-aqua-50 border border-aqua-200 flex items-center justify-center text-aqua-700">
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-charcoal-900">{dept.name}</h3>
                          <p className="text-xs font-semibold text-gold-600">HOD: {dept.hodName}</p>
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {dept.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                      <span>{dept.subjectsCount} Subjects Offered</span>
                      <span>{dept.teachersCount} Full-Time Instructors</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Subjects Directory */}
        <section className="py-16 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-gold-600">
                Curriculum Subjects
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-charcoal-900 mt-1">
                Accredited KNEC Secondary Subjects
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {SUBJECTS_DATA.map((sub) => (
                <div
                  key={sub.id}
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-aqua-300 transition-all flex items-center justify-between"
                >
                  <div>
                    <h4 className="font-bold text-sm text-charcoal-900">{sub.name}</h4>
                    <span className="text-[11px] text-slate-500">Code: {sub.code} &bull; {sub.department}</span>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                    sub.category === 'Compulsory' ? 'bg-amber-100 text-amber-900' :
                    sub.category === 'Sciences' ? 'bg-aqua-100 text-aqua-900' :
                    sub.category === 'Humanities' ? 'bg-purple-100 text-purple-900' :
                    'bg-slate-200 text-slate-800'
                  }`}>
                    {sub.category}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
