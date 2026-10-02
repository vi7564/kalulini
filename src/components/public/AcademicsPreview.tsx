'use client';

import React from 'react';
import Link from 'next/link';
import { DEPARTMENTS_DATA, SUBJECTS_DATA } from '@/lib/mockData';
import { BookOpen, Atom, Globe, Laptop, ArrowRight, CheckCircle2 } from 'lucide-react';

export const AcademicsPreview: React.FC = () => {
  const icons = [Atom, Globe, BookOpen, Laptop];

  return (
    <section className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-aqua-600">
              Academics & Curriculum
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-charcoal-900 tracking-tight mt-1">
              Four Robust Departments Driving Intellectual Rigor
            </h2>
            <p className="text-sm text-slate-600 mt-2 max-w-2xl">
              Our 8-4-4 and emerging CBC Senior School pathways integrate continuous evaluation, dedicated laboratory sessions, and career-cluster mentorship.
            </p>
          </div>

          <Link
            href="/academics"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-sm font-bold text-aqua-700 hover:text-aqua-800 transition-colors"
          >
            Explore Complete Curriculum <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 4 Academic Department Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {DEPARTMENTS_DATA.map((dept, idx) => {
            const Icon = icons[idx % icons.length];
            return (
              <div
                key={dept.id}
                className="bg-slate-50/70 rounded-2xl p-6 border border-slate-200 hover:border-aqua-400 hover:bg-white transition-all shadow-sm hover:shadow-premium group flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-aqua-50 border border-aqua-200 flex items-center justify-center text-aqua-700 mb-4 group-hover:scale-105 group-hover:bg-aqua-600 group-hover:text-white transition-all">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-base font-bold text-charcoal-900 group-hover:text-aqua-700 transition-colors">
                    {dept.name}
                  </h3>
                  <p className="text-xs font-semibold text-gold-600 mt-0.5">
                    HOD: {dept.hodName}
                  </p>

                  <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                    {dept.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-500">
                  <span>{dept.subjectsCount} Subjects</span>
                  <span>{dept.teachersCount} Instructors</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* KCSE Subjects Quick Ribbon */}
        <div className="mt-12 bg-charcoal-900 rounded-2xl p-6 sm:p-8 text-white flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="text-[11px] uppercase tracking-wider text-gold-400 font-bold">
              KNEC Examination Subjects Offered
            </span>
            <h4 className="text-lg font-bold">
              12 Accredited Subjects Across Sciences, Humanities, Languages & Applied Tech
            </h4>
            <p className="text-xs text-slate-300">
              Students select balanced combinations aligned with engineering, medicine, law, and business university requirements.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 max-w-md">
            {SUBJECTS_DATA.slice(0, 8).map((sub) => (
              <span
                key={sub.id}
                className="text-xs px-2.5 py-1 rounded-md bg-charcoal-800 border border-charcoal-700 text-slate-200"
              >
                {sub.name}
              </span>
            ))}
            <span className="text-xs px-2.5 py-1 rounded-md bg-aqua-600 text-white font-semibold">
              +4 more
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
