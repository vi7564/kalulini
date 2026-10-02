'use client';

import React, { useState } from 'react';
import { AnnouncementBar } from '@/components/public/AnnouncementBar';
import { Navbar } from '@/components/public/Navbar';
import { Footer } from '@/components/public/Footer';
import { admissionService } from '@/lib/services/admissionService';
import { useNotification } from '@/context/NotificationContext';
import { GraduationCap, ArrowRight, ArrowLeft, CheckCircle2, Upload, ShieldCheck, FileText } from 'lucide-react';
import Link from 'next/link';

export default function ApplyPage() {
  const { showToast } = useNotification();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    applicantFirstName: '',
    applicantLastName: '',
    dateOfBirth: '',
    gender: 'Male' as const,
    currentSchool: '',
    kcpeIndexNumber: '',
    kcpeMarks: '',
    targetForm: 'Form 1' as const,
    parentName: '',
    parentPhone: '',
    parentEmail: '',
    parentOccupation: '',
    homeCounty: 'Makueni',
    subCounty: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const application = await admissionService.submitApplication({
        userId: 'usr-applicant-direct-' + Date.now(),
        applicantFirstName: formData.applicantFirstName,
        applicantLastName: formData.applicantLastName,
        dateOfBirth: formData.dateOfBirth,
        gender: 'Male',
        currentSchool: formData.currentSchool,
        kcpeIndexNumber: formData.kcpeIndexNumber,
        kcpeMarks: Number(formData.kcpeMarks) || 350,
        targetForm: formData.targetForm,
        parentName: formData.parentName,
        parentPhone: formData.parentPhone,
        parentEmail: formData.parentEmail,
        parentOccupation: formData.parentOccupation,
        homeCounty: formData.homeCounty,
        subCounty: formData.subCounty,
        documents: {
          birthCertificateUrl: '#',
          kcpeResultSlipUrl: '#'
        }
      });

      setSubmittedRef(application.applicationReference);
      showToast('success', 'Application Submitted', `Reference: ${application.applicationReference}`);
    } catch (err) {
      console.error(err);
      showToast('error', 'Submission Failed', 'Please verify your information and retry.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1 bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-aqua-600">
              Kalulini Boys Admissions
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-charcoal-900 tracking-tight mt-1">
              Online Admission Application Form
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Complete this application for Form 1 entry or transfer admission for the 2026 Academic Year.
            </p>
          </div>

          {/* If already submitted successfully */}
          {submittedRef ? (
            <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-premium text-center space-y-6 animate-in fade-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h2 className="text-2xl font-bold font-display text-charcoal-900">
                  Application Successfully Received!
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-md mx-auto">
                  Your admission request for <strong className="text-charcoal-900">{formData.applicantFirstName} {formData.applicantLastName}</strong> has been transmitted to the Admissions Board.
                </p>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 max-w-md mx-auto">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                  Official Application Reference
                </span>
                <span className="text-2xl font-extrabold text-aqua-700 font-mono tracking-wider mt-1 block">
                  {submittedRef}
                </span>
                <span className="text-[11px] text-slate-500 mt-2 block">
                  Please preserve this reference number to track your admission decision and calling letter.
                </span>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                <Link
                  href="/portal/applicant"
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-aqua-600 hover:bg-aqua-700 text-white font-bold text-xs uppercase tracking-wider transition-colors"
                >
                  Track Application in Applicant Portal
                </Link>
                <Link
                  href="/"
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-charcoal-800 font-bold text-xs uppercase tracking-wider transition-colors"
                >
                  Return to Homepage
                </Link>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-premium">
              {/* Stepper Indicator */}
              <div className="flex items-center justify-between mb-8 border-b border-slate-100 pb-4">
                <div className={`flex items-center gap-2 text-xs font-bold ${step >= 1 ? 'text-aqua-700' : 'text-slate-400'}`}>
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 1 ? 'bg-aqua-600 text-white' : 'bg-slate-200'}`}>1</span>
                  <span>Student Biodata</span>
                </div>
                <div className={`flex items-center gap-2 text-xs font-bold ${step >= 2 ? 'text-aqua-700' : 'text-slate-400'}`}>
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 2 ? 'bg-aqua-600 text-white' : 'bg-slate-200'}`}>2</span>
                  <span>Parent / Guardian</span>
                </div>
                <div className={`flex items-center gap-2 text-xs font-bold ${step >= 3 ? 'text-aqua-700' : 'text-slate-400'}`}>
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 3 ? 'bg-aqua-600 text-white' : 'bg-slate-200'}`}>3</span>
                  <span>Certificates & Review</span>
                </div>
              </div>

              {/* Step 1: Student Information */}
              {step === 1 && (
                <form onSubmit={handleNext} className="space-y-4">
                  <h3 className="text-sm font-bold text-charcoal-900 border-b pb-2">Student Information</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">First Name *</label>
                      <input
                        type="text"
                        name="applicantFirstName"
                        required
                        value={formData.applicantFirstName}
                        onChange={handleChange}
                        placeholder="e.g. Collins"
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-aqua-500"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">Last Name *</label>
                      <input
                        type="text"
                        name="applicantLastName"
                        required
                        value={formData.applicantLastName}
                        onChange={handleChange}
                        placeholder="e.g. Mutiso"
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-aqua-500"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">Date of Birth *</label>
                      <input
                        type="date"
                        name="dateOfBirth"
                        required
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-aqua-500"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">Target Form *</label>
                      <select
                        name="targetForm"
                        value={formData.targetForm}
                        onChange={handleChange}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-aqua-500"
                      >
                        <option value="Form 1">Form 1 (Fresh Entry)</option>
                        <option value="Form 2">Form 2 (Transfer)</option>
                        <option value="Form 3">Form 3 (Transfer)</option>
                      </select>
                    </div>
                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">Previous Primary School *</label>
                      <input
                        type="text"
                        name="currentSchool"
                        required
                        value={formData.currentSchool}
                        onChange={handleChange}
                        placeholder="e.g. Wote Township Boarding Primary"
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-aqua-500"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">KCPE / KPSEA Assessment Marks *</label>
                      <input
                        type="number"
                        name="kcpeMarks"
                        required
                        min="250"
                        max="500"
                        value={formData.kcpeMarks}
                        onChange={handleChange}
                        placeholder="e.g. 382"
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-aqua-500"
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-aqua-600 hover:bg-aqua-700 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                    >
                      Continue to Parent Info <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}

              {/* Step 2: Parent / Guardian Information */}
              {step === 2 && (
                <form onSubmit={handleNext} className="space-y-4">
                  <h3 className="text-sm font-bold text-charcoal-900 border-b pb-2">Parent / Guardian Details</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">Parent/Guardian Full Name *</label>
                      <input
                        type="text"
                        name="parentName"
                        required
                        value={formData.parentName}
                        onChange={handleChange}
                        placeholder="e.g. Stephen Mutiso Kioko"
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-aqua-500"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">Parent Phone Number *</label>
                      <input
                        type="tel"
                        name="parentPhone"
                        required
                        value={formData.parentPhone}
                        onChange={handleChange}
                        placeholder="e.g. +254 711 223 344"
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-aqua-500"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">Email Address *</label>
                      <input
                        type="email"
                        name="parentEmail"
                        required
                        value={formData.parentEmail}
                        onChange={handleChange}
                        placeholder="e.g. parent@example.com"
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-aqua-500"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">Occupation</label>
                      <input
                        type="text"
                        name="parentOccupation"
                        value={formData.parentOccupation}
                        onChange={handleChange}
                        placeholder="e.g. Civil Servant / Business"
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-aqua-500"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">Home County *</label>
                      <input
                        type="text"
                        name="homeCounty"
                        required
                        value={formData.homeCounty}
                        onChange={handleChange}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-aqua-500"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">Sub-County / Location</label>
                      <input
                        type="text"
                        name="subCounty"
                        value={formData.subCounty}
                        onChange={handleChange}
                        placeholder="e.g. Makueni West"
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-aqua-500"
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5"
                    >
                      <ArrowLeft className="w-4 h-4" /> Back
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-aqua-600 hover:bg-aqua-700 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                    >
                      Review & Uploads <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}

              {/* Step 3: Certificate Upload Simulation & Final Review */}
              {step === 3 && (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h3 className="text-sm font-bold text-charcoal-900 border-b pb-2">Documents Upload & Declaration</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="border-2 border-dashed border-slate-300 rounded-2xl p-4 text-center hover:border-aqua-500 transition-colors">
                      <Upload className="w-6 h-6 text-aqua-600 mx-auto mb-2" />
                      <span className="text-xs font-bold text-charcoal-900 block">Birth Certificate Scan</span>
                      <span className="text-[10px] text-slate-500">PDF, JPG, PNG (Max 5MB)</span>
                      <div className="mt-2 text-[11px] text-emerald-600 font-semibold bg-emerald-50 py-1 rounded">
                        ✓ Ready for submission
                      </div>
                    </div>

                    <div className="border-2 border-dashed border-slate-300 rounded-2xl p-4 text-center hover:border-aqua-500 transition-colors">
                      <Upload className="w-6 h-6 text-aqua-600 mx-auto mb-2" />
                      <span className="text-xs font-bold text-charcoal-900 block">KCPE / KPSEA Result Slip</span>
                      <span className="text-[10px] text-slate-500">PDF, JPG, PNG (Max 5MB)</span>
                      <div className="mt-2 text-[11px] text-emerald-600 font-semibold bg-emerald-50 py-1 rounded">
                        ✓ Ready for submission
                      </div>
                    </div>
                  </div>

                  {/* Summary Box */}
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-1.5">
                    <h4 className="font-bold text-charcoal-900 mb-1">Application Summary</h4>
                    <p><strong className="text-slate-700">Applicant:</strong> {formData.applicantFirstName} {formData.applicantLastName} ({formData.gender})</p>
                    <p><strong className="text-slate-700">Class:</strong> {formData.targetForm} &bull; Marks: {formData.kcpeMarks}</p>
                    <p><strong className="text-slate-700">Parent/Guardian:</strong> {formData.parentName} ({formData.parentPhone})</p>
                    <p><strong className="text-slate-700">County:</strong> {formData.homeCounty}, {formData.subCounty}</p>
                  </div>

                  <div className="flex items-start gap-2 text-xs text-slate-600">
                    <input type="checkbox" required className="mt-0.5" id="declaration" />
                    <label htmlFor="declaration">
                      I declare that all information submitted is accurate and certified copies of official certificates are provided.
                    </label>
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5"
                    >
                      <ArrowLeft className="w-4 h-4" /> Back
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-8 py-3 rounded-xl bg-gold-400 hover:bg-gold-500 text-charcoal-950 font-extrabold text-xs uppercase tracking-wider shadow-institution flex items-center gap-2 transition-all hover:scale-105"
                    >
                      {isSubmitting ? 'Submitting Application...' : 'Submit Official Application'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
