'use client';

import React, { useState, useEffect } from 'react';
import { PortalLayout } from '@/components/portal/PortalLayout';
import { studentService } from '@/lib/services/studentService';
import { academicService } from '@/lib/services/academicService';
import { Student } from '@/types';
import { useNotification } from '@/context/NotificationContext';
import { Award, CheckCircle2, Save, FileSpreadsheet } from 'lucide-react';

export default function TeacherGradingPage() {
  const { showToast } = useNotification();
  const [students, setStudents] = useState<Student[]>([]);
  const [exam, setExam] = useState('Term 1 Mid-Term Examination 2026');
  const [subject, setSubject] = useState('121 - Mathematics');
  const [formClass, setFormClass] = useState('Form 3 East');

  // Map of scores: studentId -> score
  const [scores, setScores] = useState<Record<string, number>>({});

  useEffect(() => {
    studentService.getStudents().then((stds) => {
      setStudents(stds);
      const initialScores: Record<string, number> = {};
      stds.forEach((s, idx) => {
        initialScores[s.id] = 75 + (idx % 15);
      });
      setScores(initialScores);
    });
  }, []);

  const calculateGrade = (score: number) => {
    if (score >= 80) return { grade: 'A', points: 12 };
    if (score >= 75) return { grade: 'A-', points: 11 };
    if (score >= 70) return { grade: 'B+', points: 10 };
    if (score >= 65) return { grade: 'B', points: 9 };
    if (score >= 60) return { grade: 'B-', points: 8 };
    if (score >= 55) return { grade: 'C+', points: 7 };
    if (score >= 50) return { grade: 'C', points: 6 };
    if (score >= 45) return { grade: 'C-', points: 5 };
    if (score >= 40) return { grade: 'D+', points: 4 };
    return { grade: 'D', points: 3 };
  };

  const handleScoreChange = (id: string, val: string) => {
    const num = Math.min(100, Math.max(0, Number(val) || 0));
    setScores((prev) => ({ ...prev, [id]: num }));
  };

  const handleSubmitMarks = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('success', 'Marks Submitted Successfully', `${subject} marks for ${formClass} transmitted to the Dean of Studies for moderation.`);
  };

  const scoreValues = Object.values(scores);
  const mean = scoreValues.length > 0
    ? (scoreValues.reduce((a, b) => a + b, 0) / scoreValues.length).toFixed(1)
    : '0';

  return (
    <PortalLayout title="Examination Marks & Gradebook Entry" subtitle="Enter continuous assessment and termly marks for authorized subjects. Grades and KNEC points are computed dynamically">
      {/* Controls Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 flex-1">
          <div>
            <label className="text-xs font-semibold text-slate-500 block mb-1">Target Examination</label>
            <select
              value={exam}
              onChange={(e) => setExam(e.target.value)}
              className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 font-semibold focus:outline-none focus:border-aqua-500"
            >
              <option value="Term 1 Mid-Term Examination 2026">Term 1 Mid-Term Exam 2026</option>
              <option value="Term 1 End-Term Examination 2026">Term 1 End-Term Exam 2026</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-500 block mb-1">Assigned Subject</label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 font-semibold focus:outline-none focus:border-aqua-500"
            >
              <option value="121 - Mathematics">121 - Mathematics</option>
              <option value="232 - Physics">232 - Physics</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-500 block mb-1">Target Class Stream</label>
            <select
              value={formClass}
              onChange={(e) => setFormClass(e.target.value)}
              className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 font-semibold focus:outline-none focus:border-aqua-500"
            >
              <option value="Form 3 East">Form 3 East (48 Scholars)</option>
              <option value="Form 4 West">Form 4 West (46 Scholars)</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleSubmitMarks}
          className="px-5 py-2.5 rounded-xl bg-aqua-600 hover:bg-aqua-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-sm self-end"
        >
          <Save className="w-4 h-4" /> Submit to Dean
        </button>
      </div>

      {/* Aggregate Mean Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 text-center">
          <span className="text-[11px] font-bold uppercase text-slate-400">Class Enrolled</span>
          <div className="text-xl font-bold text-charcoal-900 mt-0.5">{students.length} Candidates</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 text-center">
          <span className="text-[11px] font-bold uppercase text-aqua-600">Subject Mean Score</span>
          <div className="text-xl font-bold text-aqua-700 mt-0.5">{mean}%</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 text-center">
          <span className="text-[11px] font-bold uppercase text-emerald-600">Mean Grade</span>
          <div className="text-xl font-bold text-emerald-600 mt-0.5">{calculateGrade(Number(mean)).grade}</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 text-center">
          <span className="text-[11px] font-bold uppercase text-gold-600">Average Points</span>
          <div className="text-xl font-bold text-gold-600 mt-0.5">{calculateGrade(Number(mean)).points} / 12</div>
        </div>
      </div>

      {/* Grade Entry Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3 px-5">Scholar</th>
                <th className="py-3 px-5">Adm No</th>
                <th className="py-3 px-5">Class</th>
                <th className="py-3 px-5 w-40">Mark (0-100)</th>
                <th className="py-3 px-5">Grade</th>
                <th className="py-3 px-5">KNEC Points</th>
                <th className="py-3 px-5">Teacher Remarks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {students.map((std) => {
                const score = scores[std.id] || 0;
                const { grade, points } = calculateGrade(score);
                return (
                  <tr key={std.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-5 font-bold text-charcoal-900">
                      {std.firstName} {std.lastName}
                    </td>
                    <td className="py-3 px-5 font-mono text-slate-600">{std.admissionNumber}</td>
                    <td className="py-3 px-5 text-slate-600">{std.form} {std.stream}</td>
                    <td className="py-3 px-5">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={score}
                        onChange={(e) => handleScoreChange(std.id, e.target.value)}
                        className="w-24 px-3 py-1.5 rounded-lg border border-slate-300 font-bold text-center text-charcoal-900 focus:outline-none focus:border-aqua-500"
                      />
                    </td>
                    <td className="py-3 px-5">
                      <span className="font-extrabold text-sm text-charcoal-900 px-2 py-0.5 rounded bg-slate-100">
                        {grade}
                      </span>
                    </td>
                    <td className="py-3 px-5 font-bold text-aqua-700">{points} pts</td>
                    <td className="py-3 px-5 text-slate-500 italic">
                      {score >= 80 ? 'Commendable mastery' : score >= 65 ? 'Good potential' : 'Needs revision clinic'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </PortalLayout>
  );
}
