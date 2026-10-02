'use client';

import React, { useState, useEffect } from 'react';
import { AnnouncementBar } from '@/components/public/AnnouncementBar';
import { Navbar } from '@/components/public/Navbar';
import { Footer } from '@/components/public/Footer';
import { FileText, Download, AlertCircle, X } from 'lucide-react';

interface DocumentItem {
  title: string;
  category: string;
  size: string;
  fileName: string;
  filePath: string;
  exists: boolean;
}

const INITIAL_DOCUMENTS: DocumentItem[] = [
  {
    title: '2026 Academic Prospectus & Information Guide',
    category: 'General',
    size: '2.4 MB',
    fileName: 'kalulini-academic-prospectus-2026.pdf',
    filePath: '/downloads/kalulini-academic-prospectus-2026.pdf',
    exists: true
  },
  {
    title: 'Official Boarding Fees Structure Schedule 2026',
    category: 'Finance',
    size: '480 KB',
    fileName: 'kalulini-boarding-fees-structure-2026.pdf',
    filePath: '/downloads/kalulini-boarding-fees-structure-2026.pdf',
    exists: true
  },
  {
    title: 'Form 1 Direct Admission Application Package',
    category: 'Admissions',
    size: '1.2 MB',
    fileName: 'kalulini-form-1-admission-package.pdf',
    filePath: '/downloads/kalulini-form-1-admission-package.pdf',
    exists: true
  },
  {
    title: 'Student Medical History & Clinical Clearance Form',
    category: 'Health',
    size: '350 KB',
    fileName: 'kalulini-student-medical-clearance-form.pdf',
    filePath: '/downloads/kalulini-student-medical-clearance-form.pdf',
    exists: true
  },
  {
    title: 'Institutional Rules, Code of Conduct & Prefects Charter',
    category: 'Policies',
    size: '890 KB',
    fileName: 'kalulini-rules-code-of-conduct-prefects-charter.pdf',
    filePath: '/downloads/kalulini-rules-code-of-conduct-prefects-charter.pdf',
    exists: true
  },
  {
    title: 'Comprehensive Term 1 2026 Academic Calendar',
    category: 'Academics',
    size: '420 KB',
    fileName: 'kalulini-term-1-2026-academic-calendar.pdf',
    filePath: '/downloads/kalulini-term-1-2026-academic-calendar.pdf',
    exists: true
  },
  {
    title: 'Boarding Packing List & Dormitory Uniform Standards',
    category: 'Boarding',
    size: '510 KB',
    fileName: 'kalulini-boarding-packing-list-uniform-standards.pdf',
    filePath: '/downloads/kalulini-boarding-packing-list-uniform-standards.pdf',
    exists: true
  },
  {
    title: 'Transfer Student Assessment Form (Forms 2 & 3)',
    category: 'Admissions',
    size: '640 KB',
    fileName: 'kalulini-transfer-student-assessment-form.pdf',
    filePath: '/downloads/kalulini-transfer-student-assessment-form.pdf',
    exists: true
  }
];

export default function DownloadsPage() {
  const [documents, setDocuments] = useState<DocumentItem[]>(INITIAL_DOCUMENTS);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDocInfo() {
      try {
        const res = await fetch('/api/downloads');
        if (res.ok) {
          const data = await res.json();
          if (data.documents && Array.isArray(data.documents)) {
            setDocuments(data.documents);
          }
        }
      } catch (err) {
        console.error('Failed to load document info:', err);
      }
    }
    fetchDocInfo();
  }, []);

  const handleDownloadClick = (e: React.MouseEvent<HTMLAnchorElement>, doc: DocumentItem) => {
    if (!doc.exists) {
      e.preventDefault();
      setErrorMessage(
        `The document "${doc.title}" is temporarily unavailable for direct download. Please contact the school administration office via info@kaluliniboys.ac.ke or call the principal's office for immediate assistance.`
      );
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1">
        <section className="bg-charcoal-900 text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-charcoal-800">
          <div className="max-w-7xl mx-auto space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-400">
              Document Repository
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight">
              Download Center & Official Publications
            </h1>
            <p className="text-slate-300 max-w-2xl text-sm sm:text-base leading-relaxed">
              Access certified institutional forms, policy handbooks, fee structures, and calendar circulars.
            </p>
          </div>
        </section>

        {errorMessage && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-xl flex items-start justify-between gap-3 shadow-sm">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-amber-900">Document Notice</h4>
                  <p className="text-xs text-amber-800 mt-1 leading-relaxed">{errorMessage}</p>
                </div>
              </div>
              <button
                onClick={() => setErrorMessage(null)}
                className="text-amber-600 hover:text-amber-800 p-1 transition-colors"
                aria-label="Dismiss error notice"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        <section className="py-16 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {documents.map((doc, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 p-5 rounded-2xl border border-slate-200 hover:border-aqua-400 hover:bg-white transition-all flex items-center justify-between gap-4 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-aqua-50 border border-aqua-200 text-aqua-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        {doc.category} &bull; PDF
                      </span>
                      <h3 className="font-bold text-sm text-charcoal-900 group-hover:text-aqua-700 transition-colors">
                        {doc.title}
                      </h3>
                      <span className="text-xs text-slate-500 mt-1 block">File Size: {doc.size}</span>
                    </div>
                  </div>

                  <a
                    href={doc.filePath}
                    download={doc.fileName}
                    onClick={(e) => handleDownloadClick(e, doc)}
                    className="p-2.5 rounded-xl bg-white border border-slate-200 text-charcoal-800 hover:bg-aqua-600 hover:text-white hover:border-aqua-600 transition-all shadow-sm shrink-0"
                    title={`Download ${doc.title}`}
                    aria-label={`Download ${doc.title}`}
                  >
                    <Download className="w-4 h-4" />
                  </a>
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
