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
      subtitle: 'KUCCPS placements (Sample)',
      icon: ShieldCheck,
      color: 'text-purple-400'
    }
  ];

  return (
    <section className="bg-charcoal-900 border-b border-charcoal-800 py-12 px-4 sm:px-6 lg:px-8 text-white relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-8">
          <p className="text-[11px] font-bold uppercase tracking-widest text-gold-400">
            Institutional Milestones &bull; Sample Benchmark Data
          </p>
          <h2 className="text-xl sm:text-2xl font-bold font-display tracking-tight text-white mt-1">
            Proven Commitment to Educational Distinction
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className="bg-charcoal-800/80 rounded-xl p-4 border border-charcoal-700/70 hover:border-aqua-500/50 transition-all flex flex-col items-center text-center group"
              >
                <div className="w-10 h-10 rounded-lg bg-charcoal-900 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                  {stat.value}
                </div>
                <div className="text-xs font-semibold text-slate-200 mt-1">
                  {stat.label}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
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
