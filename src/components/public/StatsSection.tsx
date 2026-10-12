'use client';

import React from 'react';
import { Users, GraduationCap, Award, BookOpen, Trophy, ShieldCheck } from 'lucide-react';

export const StatsSection: React.FC = () => {
  const stats = [
    {
      label: 'Years of Institutional Service',
      value: '35+',
      subtitle: 'Nurturing generations',
      icon: Award,
      color: 'text-gold-400'
    },
    {
      label: 'Enrolled Young Men',
      value: '840+',
      subtitle: 'Forms 1 to 4 streams',
      icon: Users,
      color: 'text-aqua-400'
    },
    {
      label: 'Qualified TSC & BOM Faculty',
      value: '42',
      subtitle: 'Experienced subject masters',
      icon: GraduationCap,
      color: 'text-emerald-400'
    },
    {
      label: 'Academic Departments',
      value: '4',
      subtitle: 'Sciences, Languages, Humanities, Tech',
      icon: BookOpen,
      color: 'text-blue-400'
    },
    {
      label: 'Co-Curricular Clubs & Sports',
      value: '18+',
      subtitle: 'Debate, Robotics, Rugby, Football',
      icon: Trophy,
      color: 'text-amber-400'
    },
    {
      label: 'Direct University Transition',
      value: '91%',
      subtitle: 'KUCCPS placement rate',
      icon: ShieldCheck,
      color: 'text-purple-400'
    }
  ];

  return (
    <section className="bg-charcoal-900 border-b border-charcoal-800 py-14 px-4 sm:px-6 lg:px-8 text-white relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-10">
          <p className="text-[11px] font-bold uppercase tracking-widest text-gold-400">
            Institutional Milestones &bull; Key Indicators
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-white mt-2">
            Proven Commitment to Educational Distinction
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-2">
            Providing holistic boarding scholarship and robust character mentorship in Makueni County.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className="bg-charcoal-800 rounded-2xl p-4 sm:p-5 border border-charcoal-700 hover:border-aqua-400/60 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col items-center text-center group"
              >
                <div className="w-11 h-11 rounded-xl bg-charcoal-900 border border-charcoal-700/80 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-display tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs font-semibold text-slate-100 mt-1.5 leading-snug">
                  {stat.label}
                </div>
                <div className="text-[11px] text-slate-300 mt-1">
                  {stat.subtitle}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
