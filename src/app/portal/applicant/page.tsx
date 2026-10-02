'use client';

import React, { useState, useEffect } from 'react';
import { PortalLayout } from '@/components/portal/PortalLayout';
import { admissionService } from '@/lib/services/admissionService';
import { AdmissionApplication } from '@/types';
import { CheckCircle2, Clock, AlertCircle, FileCheck, Download, GraduationCap } from 'lucide-react';
import Link from 'next/link';

export default function ApplicantDashboardPage() {
  const [app, setApp] = useState<AdmissionApplication | null>(null);

  useEffect(() => {
    // Look up applicant Collins Mutiso (usr-applicant-1) or first available
    admissionService.getApplications().then((list) => {
      if (list.length > 0) setApp(list[0]);
    });
  }, []);

  if (!app) {
    return (
      <PortalLayout title="Application Tracking Console" subtitle="Loading admission status...">
        <div className="py-16 text-center text-slate-400">Loading application record...</div>
      </PortalLayout>
    );
  }

  const steps = [
    { title: 'Application Submitted', desc: 'Online biodata received', status: 'completed' },
    { title: 'Documents Verified', desc: 'Birth cert & KCPE slip confirmed', status: 'completed' },
    {
      title: 'Committee Review',
      desc: 'Admissions Board evaluation',
      status: app.status === 'Accepted' || app.status === 'Waitlisted' ? 'completed' : 'current'
    },
    {
      title: 'Official Decision',
      desc: 'Calling letter & intake schedule',
      status: app.status === 'Accepted' ? 'completed' : 'pending'
    }
  ];

  return (
    <PortalLayout title={`Application Tracker: ${app.applicationReference}`} subtitle="Monitor the status of your online admission request and download the official calling letter">
      {/* Status Decision Banner */}
      <div className={`rounded-3xl p-8 border shadow-premium ${
        app.status === 'Accepted'
          ? 'bg-emerald-950/90 text-emerald-100 border-emerald-500/40'
          : app.status === 'Waitlisted'
          ? 'bg-amber-950/90 text-amber-100 border-amber-500/40'
          : 'bg-charcoal-900 text-white border-aqua-500/30'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-gold-400 block mb-1">
              Admission Decision Status
            </span>
            <h2 className="text-2xl font-bold font-display text-white">
              Status: {app.status.toUpperCase()}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
              {app.reviewNotes || "Your application is currently undergoing review by the Kalulini Admissions Committee. Check back regularly for decision updates."}
            </p>
          </div>

          {app.status === 'Accepted' && (
            <button
              onClick={() => alert("Downloading Official Kalulini Boys High School Admission Calling Letter & Boarding Package PDF")}
              className="px-6 py-3 rounded-xl bg-gold-400 hover:bg-gold-500 text-charcoal-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shrink-0"
            >
              <Download className="w-4 h-4" /> Download Calling Letter
            </button>
          )}
        </div>
      </div>

      {/* Progress Stepper */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
        <h3 className="font-bold text-sm text-charcoal-900 mb-6">Application Progress Tracker</h3>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 relative">
          {steps.map((st, idx) => (
            <div key={idx} className="flex flex-col items-start space-y-2">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                  st.status === 'completed'
                    ? 'bg-emerald-600 text-white'
                    : st.status === 'current'
                    ? 'bg-aqua-600 text-white animate-pulse'
                    : 'bg-slate-200 text-slate-500'
                }`}>
                  {st.status === 'completed' ? '✓' : idx + 1}
                </div>
                <span className="text-xs font-bold text-charcoal-900">{st.title}</span>
              </div>
              <p className="text-[11px] text-slate-500 pl-11">{st.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Summary of Submitted Data */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h4 className="font-bold text-sm text-charcoal-900">Submitted Applicant Biodata</h4>
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-slate-400 block font-semibold">Scholar Name:</span>
              <span className="text-charcoal-900 font-bold text-sm">{app.applicantFirstName} {app.applicantLastName}</span>
            </div>
            <div>
              <span className="text-slate-400 block font-semibold">Target Class:</span>
              <span className="text-charcoal-900 font-bold text-sm">{app.targetForm} (Boarding)</span>
            </div>
            <div>
              <span className="text-slate-400 block font-semibold">Previous School:</span>
              <span className="text-charcoal-900 font-medium">{app.currentSchool}</span>
            </div>
            <div>
              <span className="text-slate-400 block font-semibold">KCPE Assessment Score:</span>
              <span className="text-charcoal-900 font-bold">{app.kcpeMarks} Marks</span>
            </div>
            <div>
              <span className="text-slate-400 block font-semibold">Parent / Guardian:</span>
              <span className="text-charcoal-900 font-medium">{app.parentName}</span>
            </div>
            <div>
              <span className="text-slate-400 block font-semibold">Contact Phone:</span>
              <span className="text-charcoal-900 font-medium">{app.parentPhone}</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h4 className="font-bold text-sm text-charcoal-900">Submitted Attachments</h4>
          <div className="space-y-2 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <span>Birth Certificate Copy</span>
              <span className="text-emerald-600 font-bold">✓ Attached</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <span>KCPE Result Slip</span>
              <span className="text-emerald-600 font-bold">✓ Attached</span>
            </div>
          </div>

          <div className="pt-2 text-[11px] text-slate-500">
            Need to update certificates? Call the Admissions Desk: <strong>+254 700 000 000</strong>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}
