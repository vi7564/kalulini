'use client';

import React, { useState } from 'react';
import { PortalLayout } from '@/components/portal/PortalLayout';
import { DEPARTMENTS_DATA, SUBJECTS_DATA } from '@/lib/mockData';
import { Subject, Department } from '@/types';
import { useNotification } from '@/context/NotificationContext';
import { Modal } from '@/components/ui/Modal';
import { BookOpen, Plus, Award, CheckCircle2, Building, Edit2 } from 'lucide-react';

export default function AdminAcademicsPage() {
  const { showToast } = useNotification();
  const [subjects, setSubjects] = useState<Subject[]>([...SUBJECTS_DATA]);
  const [departments, setDepartments] = useState<Department[]>([...DEPARTMENTS_DATA]);
  const [activeTab, setActiveTab] = useState<'exams' | 'subjects' | 'departments'>('exams');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [exams, setExams] = useState([
    { id: 'ex-1', title: 'Term 1 Mid-Term Examination 2026', term: 'Term 1', year: 2026, status: 'Grading Active', start: '2026-02-16', end: '2026-02-20' },
    { id: 'ex-2', title: 'Term 1 End of Term Summative Exam 2026', term: 'Term 1', year: 2026, status: 'Draft', start: '2026-03-24', end: '2026-03-31' },
    { id: 'ex-3', title: 'Term 3 End of Year Examination 2025', term: 'Term 3', year: 2025, status: 'Published', start: '2025-11-20', end: '2025-11-28' }
  ]);

  const [newExamTitle, setNewExamTitle] = useState('');
  const [newExamTerm, setNewExamTerm] = useState('Term 1');

  const handleCreateExam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExamTitle) return;

    setExams([
      {
        id: 'ex-' + Date.now(),
        title: newExamTitle,
        term: newExamTerm,
        year: 2026,
        status: 'Draft',
        start: '2026-06-01',
        end: '2026-06-08'
      },
      ...exams
    ]);

    showToast('success', 'Examination Created', `${newExamTitle} created in draft state.`);
    setIsModalOpen(false);
    setNewExamTitle('');
  };

  const publishExam = (id: string, title: string) => {
    setExams(exams.map((ex) => (ex.id === id ? { ...ex, status: 'Published' } : ex)));
    showToast('success', 'Examination Published', `Results for ${title} released to student & parent portals.`);
  };

  return (
    <PortalLayout title="Academic Administration & Examinations" subtitle="Manage curriculum subjects, academic department chairs, exam schedules and official grade publishing">
      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveTab('exams')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'exams'
              ? 'bg-aqua-600 text-white shadow-sm'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          Examinations & Term Grading
        </button>
        <button
          onClick={() => setActiveTab('subjects')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'subjects'
              ? 'bg-aqua-600 text-white shadow-sm'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          Subjects Roster ({subjects.length})
        </button>
        <button
          onClick={() => setActiveTab('departments')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'departments'
              ? 'bg-aqua-600 text-white shadow-sm'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          Academic Departments ({departments.length})
        </button>
      </div>

      {/* Tab 1: Examinations */}
      {activeTab === 'exams' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-xs text-slate-500 font-semibold">Total Examination Cycles: <strong>{exams.length}</strong></span>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-aqua-600 hover:bg-aqua-700 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4" /> Create Examination
            </button>
          </div>

          <div className="space-y-4">
            {exams.map((ex) => (
              <div
                key={ex.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-charcoal-800">
                      {ex.term} &bull; {ex.year}
                    </span>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      ex.status === 'Published'
                        ? 'bg-emerald-100 text-emerald-800'
                        : ex.status === 'Grading Active'
                        ? 'bg-aqua-100 text-aqua-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {ex.status}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-charcoal-900">{ex.title}</h3>
                  <span className="text-xs text-slate-500 mt-1 block">Timetable Period: {ex.start} to {ex.end}</span>
                </div>

                <div className="flex items-center gap-3">
                  {ex.status !== 'Published' && (
                    <button
                      onClick={() => publishExam(ex.id, ex.title)}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
                    >
                      Approve & Publish Results
                    </button>
                  )}
                  {ex.status === 'Published' && (
                    <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Published to Portals
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Subjects */}
      {activeTab === 'subjects' && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-5">KNEC Code</th>
                  <th className="py-3 px-5">Subject Name</th>
                  <th className="py-3 px-5">Department</th>
                  <th className="py-3 px-5">Classification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {subjects.map((sub) => (
                  <tr key={sub.id} className="hover:bg-slate-50">
                    <td className="py-3 px-5 font-mono font-bold text-aqua-700">{sub.code}</td>
                    <td className="py-3 px-5 font-bold text-charcoal-900">{sub.name}</td>
                    <td className="py-3 px-5 text-slate-600">{sub.department}</td>
                    <td className="py-3 px-5">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-slate-100 text-slate-700">
                        {sub.category}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Departments */}
      {activeTab === 'departments' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {departments.map((dept) => (
            <div key={dept.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-base text-charcoal-900">{dept.name}</h3>
                <span className="text-xs font-semibold text-aqua-700 bg-aqua-50 px-2 py-0.5 rounded">
                  {dept.subjectsCount} Subjects
                </span>
              </div>
              <p className="text-xs text-gold-600 font-semibold">Head of Department: {dept.hodName}</p>
              <p className="text-xs text-slate-600 leading-relaxed">{dept.description}</p>
              <div className="pt-2 border-t border-slate-100 text-xs text-slate-500">
                Instructors Attached: <strong>{dept.teachersCount} Full-Time Teachers</strong>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Exam Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Configure Examination Session">
        <form onSubmit={handleCreateExam} className="space-y-4 text-xs">
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Examination Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. Term 2 Mid-Term Assessment 2026"
              value={newExamTitle}
              onChange={(e) => setNewExamTitle(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Academic Term *</label>
            <select
              value={newExamTerm}
              onChange={(e) => setNewExamTerm(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300"
            >
              <option value="Term 1">Term 1</option>
              <option value="Term 2">Term 2</option>
              <option value="Term 3">Term 3</option>
            </select>
          </div>

          <div className="pt-4 border-t flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 font-bold uppercase"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-xl bg-aqua-600 hover:bg-aqua-700 text-white font-bold uppercase transition-colors"
            >
              Initialize Exam
            </button>
          </div>
        </form>
      </Modal>
    </PortalLayout>
  );
}
