'use client';

import React, { useState } from 'react';
import { AnnouncementBar } from '@/components/public/AnnouncementBar';
import { Navbar } from '@/components/public/Navbar';
import { Footer } from '@/components/public/Footer';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';
import { useNotification } from '@/context/NotificationContext';

export default function ContactPage() {
  const { showToast } = useNotification();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Admissions Inquiry',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('success', 'Inquiry Received', 'Thank you! The administration office has received your message.');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1">
        <section className="bg-charcoal-900 text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-charcoal-800">
          <div className="max-w-7xl mx-auto space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-400">
              Institutional Communications
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight">
              Contact Kalulini Boys High School
            </h1>
            <p className="text-slate-300 max-w-2xl text-sm sm:text-base leading-relaxed">
              We welcome prospective parents, education partners, and alumni inquiries. Reach out to our offices below.
            </p>
          </div>
        </section>

        <section className="py-16 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Contact Information Cards (5 Cols) */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-aqua-600">
                    Administrative Offices
                  </span>
                  <h2 className="text-2xl font-bold font-display text-charcoal-900 mt-1">
                    Direct Contact Channels
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                    Official operating hours are Monday through Friday from 8:00 AM to 5:00 PM. Boarding visits are strictly reserved for official term visiting calendar dates.
                  </p>
                </div>

                <div className="space-y-4 text-xs">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-aqua-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-charcoal-900 block font-bold text-sm">Campus Postal Address</strong>
                      <span className="text-slate-600">Kalulini Boys High School</span>
                      <span className="text-slate-600 block">P.O. Box 24 - 90130, Kalulini</span>
                      <span className="text-slate-600 block">Makueni County, Kenya</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                    <Phone className="w-5 h-5 text-gold-500 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-charcoal-900 block font-bold text-sm">Telephone Contacts</strong>
                      <span className="text-slate-600 block">Main Office: +254 700 000 000</span>
                      <span className="text-slate-600 block">Admissions Desk: +254 722 000 000</span>
                      <span className="text-slate-600 block">Bursar & Accounts: +254 700 888 999</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                    <Mail className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-charcoal-900 block font-bold text-sm">Official Email Channels</strong>
                      <span className="text-slate-600 block">General Inquiries: info@kaluliniboys.ac.ke</span>
                      <span className="text-slate-600 block">Principal&apos;s Desk: principal@kaluliniboys.ac.ke</span>
                      <span className="text-slate-600 block">Admissions Office: admissions@kaluliniboys.ac.ke</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                    <Clock className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-charcoal-900 block font-bold text-sm">Working Hours</strong>
                      <span className="text-slate-600 block">Monday &ndash; Friday: 8:00 AM &ndash; 5:00 PM</span>
                      <span className="text-slate-600 block">Saturday: 9:00 AM &ndash; 1:00 PM (Remedials/Admin)</span>
                      <span className="text-slate-600 block">Sunday: Closed (Devotionals & Rest)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Inquiry Form (7 Cols) */}
              <div className="lg:col-span-7 bg-slate-50 p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-sm">
                <span className="text-xs font-bold uppercase tracking-widest text-gold-600">
                  Online Inquiry Form
                </span>
                <h3 className="text-xl font-bold font-display text-charcoal-900 mt-1 mb-6">
                  Send an Official Communication
                </h3>

                {submitted ? (
                  <div className="bg-white p-8 rounded-2xl border border-emerald-200 text-center space-y-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h4 className="font-bold text-lg text-charcoal-900">Message Delivered</h4>
                    <p className="text-xs text-slate-600 max-w-md mx-auto">
                      Thank you for contacting Kalulini Boys High School. A school representative will respond to your provided email within 24–48 hours.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-5 py-2 rounded-xl bg-aqua-600 text-white font-bold text-xs uppercase"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="font-semibold text-slate-700 block mb-1">Your Full Name *</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. John Mutua"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-aqua-500 bg-white"
                        />
                      </div>
                      <div>
                        <label className="font-semibold text-slate-700 block mb-1">Email Address *</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="e.g. j.mutua@example.com"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-aqua-500 bg-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="font-semibold text-slate-700 block mb-1">Phone Number</label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="e.g. +254 712 345 678"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-aqua-500 bg-white"
                        />
                      </div>
                      <div>
                        <label className="font-semibold text-slate-700 block mb-1">Department / Inquiry Category</label>
                        <select
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-aqua-500 bg-white"
                        >
                          <option value="Admissions Inquiry">Admissions Inquiry</option>
                          <option value="Academic Counseling">Academic Counseling</option>
                          <option value="Finance & Fees">Finance & Fees</option>
                          <option value="Boarding & Welfare">Boarding & Welfare</option>
                          <option value="Alumni Affairs">Alumni Affairs</option>
                          <option value="General Information">General Information</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">Message Content *</label>
                      <textarea
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Please write your inquiry in detail..."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-aqua-500 bg-white"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="px-6 py-3 rounded-xl bg-aqua-600 hover:bg-aqua-700 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-colors shadow-sm"
                      >
                        <Send className="w-4 h-4" /> Send Official Message
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
