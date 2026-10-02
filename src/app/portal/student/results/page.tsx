'use client';

import React, { useState, useEffect } from 'react';
import { PortalLayout } from '@/components/portal/PortalLayout';
import { academicService } from '@/lib/services/academicService';
import { StudentReportCard } from '@/types';
import { Award, Printer, Download, GraduationCap, CheckCircle2 } from 'lucide-react';

export default function StudentResultsPage() {
  const [report, setReport] = useState<StudentReportCard | null>(null);

  useEffect(() => {
    academicService.generateReportCard('std-1001').then(setReport);
  }, []);

  const handlePrint = () => {
    window.print();
  };

  if (!report) {
    return (
      <PortalLayout title="Official Academic Report Card" subtitle="Generating report card transcript...">
        <div className="py-16 text-center text-slate-400">Loading student transcript...</div>
      </PortalLayout>
    );
  }

  return (
    <PortalLayout title="Official Termly Academic Report Card" subtitle="Certified academic assessment, subject performance scores, class position and faculty remarks">
      {/* Actions Bar */}
      <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-sm print:hidden">
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500">Term Period:</span>
          <span className="text-xs font-bold text-charcoal-900 bg-slate-100 px-3 py-1 rounded-lg">
            {report.term} {report.year} &bull; {report.examTitle}
          </span>
        </div>

        <button
          onClick={handlePrint}
          className="px-4 py-2 rounded-xl bg-aqua-600 hover:bg-aqua-700 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-sm"
        >
          <Printer className="w-4 h-4" /> Print Report Card
        </button>
      </div>

      {/* Printable Report Card Document */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 border-2 border-slate-200 shadow-premium max-w-4xl mx-auto space-y-6">
        {/* Institutional Header */}
        <div className="text-center pb-6 border-b-2 border-charcoal-900 space-y-1">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-aqua-600 to-charcoal-900 text-white flex items-center justify-center mx-auto border-2 border-gold-400 mb-2">
            <GraduationCap className="w-8 h-8 text-gold-300" />
          </div>
          <h2 className="text-2xl font-black font-display tracking-tight text-charcoal-950 uppercase">
            KALULINI BOYS HIGH SCHOOL
          </h2>
          <p className="text-xs text-slate-600 font-medium">
            P.O. Box 24 - 90130, Kalulini, Makueni County, Kenya &bull; Tel: +254 700 000 000
          </p>
          <p className="text-xs font-bold tracking-widest uppercase text-aqua-700">
            MOTTO: STRIVE FOR EXCELLENCE, INTEGRITY AND SERVICE
          </p>
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-charcoal-900 pt-2 underline">
            STUDENT ACADEMIC PROGRESS REPORT &bull; {report.term.toUpperCase()} {report.year}
          </h3>
        </div>

        {/* Scholar Biodata Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Student Name</span>
            <strong className="text-charcoal-900 text-sm">{report.student.firstName} {report.student.lastName}</strong>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Admission Number</span>
            <strong className="text-aqua-700 font-mono text-sm">{report.student.admissionNumber}</strong>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Class & Stream</span>
            <strong className="text-charcoal-900 text-sm">{report.student.form} {report.student.stream}</strong>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">House</span>
            <strong className="text-charcoal-900 text-sm">{report.student.house}</strong>
          </div>
        </div>

        {/* Grades Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-200">
            <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-300">
              <tr>
                <th className="py-2.5 px-4">Subject</th>
                <th className="py-2.5 px-3 text-center">Code</th>
                <th className="py-2.5 px-3 text-center">CAT (30%)</th>
                <th className="py-2.5 px-3 text-center">End Term (70%)</th>
                <th className="py-2.5 px-3 text-center">Total (100%)</th>
                <th className="py-2.5 px-3 text-center">Grade</th>
                <th className="py-2.5 px-3 text-center">Points</th>
                <th className="py-2.5 px-4">Teacher Remarks</th>
                <th className="py-2.5 px-3 text-center">Initials</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {report.grades.map((g, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="py-2 px-4 font-bold text-charcoal-900">{g.subject}</td>
                  <td className="py-2 px-3 text-center font-mono text-slate-500">{g.code}</td>
                  <td className="py-2 px-3 text-center font-semibold text-slate-700">{g.catMarks}</td>
                  <td className="py-2 px-3 text-center font-semibold text-slate-700">{g.endTermMarks}</td>
                  <td className="py-2 px-3 text-center font-extrabold text-charcoal-900">{g.total}</td>
                  <td className="py-2 px-3 text-center font-black text-sm text-aqua-800">{g.grade}</td>
                  <td className="py-2 px-3 text-center font-bold text-slate-700">{g.points}</td>
                  <td className="py-2 px-4 text-slate-600 text-[11px]">{g.remarks}</td>
                  <td className="py-2 px-3 text-center font-mono font-bold text-slate-400">{g.teacherInitials}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Aggregated Performance Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-charcoal-900 text-white text-xs">
          <div>
            <span className="text-[10px] uppercase font-bold text-gold-400 block">Total Marks</span>
            <strong className="text-xl font-bold font-display">{report.totalMarks} / 700</strong>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-gold-400 block">Mean Score & Grade</span>
            <strong className="text-xl font-bold font-display text-aqua-400">{report.meanMarks}% ({report.meanGrade})</strong>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-gold-400 block">Total KNEC Points</span>
            <strong className="text-xl font-bold font-display text-emerald-400">{report.totalPoints} / 84</strong>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-gold-400 block">Class Position</span>
            <strong className="text-xl font-bold font-display">{report.classPosition} of {report.totalStudentsInClass}</strong>
          </div>
        </div>

        {/* Remarks Section */}
        <div className="space-y-4 pt-2">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
            <strong className="text-charcoal-900 block font-bold mb-1">Class Teacher&apos;s Remarks:</strong>
            <p className="text-slate-700 italic">{report.classTeacherRemarks}</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
            <strong className="text-charcoal-900 block font-bold mb-1">Chief Principal&apos;s Comments:</strong>
            <p className="text-slate-700 italic">{report.principalRemarks}</p>
          </div>
        </div>

        {/* Closing & Reopening Dates Footer */}
        <div className="pt-4 border-t-2 border-slate-200 grid grid-cols-2 gap-4 text-xs text-slate-600">
          <div>
            <span className="block">Term Closing Date: <strong>{report.closingDate}</strong></span>
            <span className="block mt-0.5">Next Term Reopening: <strong>{report.nextTermOpeningDate}</strong></span>
          </div>
          <div className="text-right">
            <span className="font-bold text-charcoal-900 block">Dr. Josephat M. Ndambuki</span>
            <span className="text-[10px] text-slate-500 uppercase tracking-wider">Chief Principal &amp; Secretary to BOM</span>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}
