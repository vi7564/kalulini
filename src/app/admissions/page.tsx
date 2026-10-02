'use client';

import React from 'react';
import { AnnouncementBar } from '@/components/public/AnnouncementBar';
import { Navbar } from '@/components/public/Navbar';
import { Footer } from '@/components/public/Footer';
import { GraduationCap, FileText, CheckCircle2, DollarSign, Bed, ArrowRight, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function AdmissionsPage() {
  const feeBreakdown = [
    { voteHead: 'Tuition & Academic Learning Materials', term1: '12,500', term2: '9,000', term3: '6,500', total: '28,000' },
    { voteHead: 'Boarding, Catering & Nutrition', term1: '15,000', term2: '12,000', term3: '8,000', total: '35,000' },
    { voteHead: 'Repairs, Maintenance & Improvement', term1: '3,500', term2: '2,500', term3: '1,500', total: '7,500' },
    { voteHead: 'Co-Curricular Activities & Sports', term1: '2,000', term2: '1,500', term3: '1,000', total: '4,500' },
    { voteHead: 'Medical & Student Insurance', term1: '1,500', term2: '1,000', term3: '500', total: '3,000' }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1">
        {/* Banner */}
        <section className="bg-charcoal-900 text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-charcoal-800">
          <div className="max-w-7xl mx-auto space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-400">
              Admissions Portal &bull; 2026 Academic Year
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight">
              Admissions, Requirements & Fees Structure
            </h1>
            <p className="text-slate-300 max-w-2xl text-sm sm:text-base leading-relaxed">
              Transparent admission guidelines, Ministry of Education fee structures, boarding requirements, and fast-track online application.
            </p>
            <div className="pt-2">
              <Link
                href="/admissions/apply"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gold-400 hover:bg-gold-500 text-charcoal-950 font-bold text-sm shadow-institution transition-all"
              >
                Apply Online Now <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Requirements & Application Process */}
        <section className="py-16 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Requirements */}
              <div className="lg:col-span-7 space-y-6">
                <span className="text-xs font-bold uppercase tracking-widest text-aqua-600">
                  Eligibility & Entry Criteria
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold font-display text-charcoal-900">
                  Admission Requirements for Incoming Scholars
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Admission to Form 1 is processed through the Ministry of Education NEMIS placement portal and via our institutional direct application window for qualified applicants. Limited vacancies exist for Form 2 and Form 3 transfers based on exemplary past academic performance and discipline records.
                </p>

                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal-900">
                    Mandatory Documentation
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-aqua-600 shrink-0 mt-0.5" />
                      <span>Original and copy of the primary school KCPE / KPSEA Assessment Result Slip.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-aqua-600 shrink-0 mt-0.5" />
                      <span>Copy of the student&apos;s Birth Certificate or National ID.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-aqua-600 shrink-0 mt-0.5" />
                      <span>Primary School Leaving Certificate signed by the Headteacher.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-aqua-600 shrink-0 mt-0.5" />
                      <span>Two recent colored passport-sized photographs of the applicant.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-aqua-600 shrink-0 mt-0.5" />
                      <span>Fully completed and certified Medical History & Examination Form.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* 5-Step Process */}
              <div className="lg:col-span-5 bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <h3 className="text-base font-bold text-charcoal-900 mb-4">
                  Step-by-Step Application Process
                </h3>

                <ol className="space-y-4 text-xs">
                  <li className="flex gap-3">
                    <span className="w-6 h-6 rounded-full bg-aqua-600 text-white font-bold flex items-center justify-center shrink-0">1</span>
                    <div>
                      <strong className="text-charcoal-900 block font-semibold">Online Application:</strong>
                      <span className="text-slate-600">Complete the online student biodata form on this portal and attach PDF scans of certificates.</span>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="w-6 h-6 rounded-full bg-aqua-600 text-white font-bold flex items-center justify-center shrink-0">2</span>
                    <div>
                      <strong className="text-charcoal-900 block font-semibold">Instant Application Reference:</strong>
                      <span className="text-slate-600">Receive a unique tracking reference (e.g. KBHS-2026-0842) via SMS/Email.</span>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="w-6 h-6 rounded-full bg-aqua-600 text-white font-bold flex items-center justify-center shrink-0">3</span>
                    <div>
                      <strong className="text-charcoal-900 block font-semibold">Academic Review:</strong>
                      <span className="text-slate-600">The Admissions Committee evaluates marks, vacancy availability, and character references.</span>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="w-6 h-6 rounded-full bg-aqua-600 text-white font-bold flex items-center justify-center shrink-0">4</span>
                    <div>
                      <strong className="text-charcoal-900 block font-semibold">Calling Letter Generation:</strong>
                      <span className="text-slate-600">Approved applicants receive the official calling letter and boarding checklist.</span>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="w-6 h-6 rounded-full bg-gold-500 text-charcoal-950 font-bold flex items-center justify-center shrink-0">5</span>
                    <div>
                      <strong className="text-charcoal-900 block font-semibold">Reporting & Orientation:</strong>
                      <span className="text-slate-600">Reporting to school on designated date for uniform issuance and house allocation.</span>
                    </div>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* Approved Fee Structure Table */}
        <section id="fees" className="py-16 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-gold-600">
                  Approved Ministry of Education Schedule
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold font-display text-charcoal-900 mt-1">
                  2026 Academic Year Boarding Fees Structure
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Strictly aligned with public Extra-County secondary school guidelines in Kenya.
                </p>
              </div>

              <div className="mt-4 md:mt-0">
                <Link
                  href="/downloads"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-aqua-700 hover:text-aqua-800"
                >
                  <FileText className="w-4 h-4" /> Download Official Fee Structure PDF
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-6">Vote Head Description</th>
                      <th className="py-3 px-6">Term 1 (KES)</th>
                      <th className="py-3 px-6">Term 2 (KES)</th>
                      <th className="py-3 px-6">Term 3 (KES)</th>
                      <th className="py-3 px-6 font-bold text-charcoal-900">Total (KES)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {feeBreakdown.map((row, i) => (
                      <tr key={i} className="hover:bg-slate-50">
                        <td className="py-3 px-6 font-medium text-charcoal-900">{row.voteHead}</td>
                        <td className="py-3 px-6 text-slate-600">{row.term1}</td>
                        <td className="py-3 px-6 text-slate-600">{row.term2}</td>
                        <td className="py-3 px-6 text-slate-600">{row.term3}</td>
                        <td className="py-3 px-6 font-bold text-aqua-800">{row.total}</td>
                      </tr>
                    ))}
                    <tr className="bg-aqua-50/70 font-extrabold text-charcoal-900 border-t-2 border-aqua-200">
                      <td className="py-3 px-6">TOTAL BOARDING FEES</td>
                      <td className="py-3 px-6 text-aqua-900">KES 34,000</td>
                      <td className="py-3 px-6 text-aqua-900">KES 26,000</td>
                      <td className="py-3 px-6 text-aqua-900">KES 18,000</td>
                      <td className="py-3 px-6 text-aqua-900">KES 78,000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Payment Channels Notice */}
            <div className="bg-charcoal-900 text-white rounded-2xl p-6 border border-charcoal-800 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-gold-400">Approved School Bank & Paybill Channels</h4>
                <p className="text-xs text-slate-300">
                  Payments are accepted via Kenya Commercial Bank (KCB) or National Bank direct deposits, and official M-Pesa Paybill. Always quote student admission number as the account reference.
                </p>
              </div>
              <div className="text-right shrink-0">
                <span className="text-xs text-slate-400 block">Finance Inquiries</span>
                <span className="text-sm font-bold text-white">+254 700 888 999</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
