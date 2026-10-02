'use client';

import React, { useState } from 'react';
import { PortalLayout } from '@/components/portal/PortalLayout';
import { SAMPLE_ASSIGNMENTS } from '@/lib/mockData';
import { Assignment } from '@/types';
import { useNotification } from '@/context/NotificationContext';
import { Modal } from '@/components/ui/Modal';
import { ClipboardList, Plus, Calendar, Clock, CheckCircle2 } from 'lucide-react';

export default function TeacherAssignmentsPage() {
  const { showToast } = useNotification();
  const [assignments, setAssignments] = useState<Assignment[]>([...SAMPLE_ASSIGNMENTS]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    subject: 'Mathematics',
    form: 'Form 3',
    stream: 'East',
    description: '',
    dueDate: '2026-02-20',
    totalMarks: 30
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      showToast('error', 'Missing Information', 'Please provide title and instructions.');
      return;
    }

    const newAsg: Assignment = {
      id: 'asg-' + Date.now(),
      title: formData.title,
      subject: formData.subject,
      form: formData.form,
      stream: formData.stream,
      teacherName: 'Mr. Geoffrey Musyoka',
      teacherId: 'tch-101',
      description: formData.description,
      dueDate: formData.dueDate,
      assignedDate: new Date().toISOString().slice(0, 10),
      totalMarks: Number(formData.totalMarks),
      submissionsCount: 0
    };

    setAssignments([newAsg, ...assignments]);
    showToast('success', 'Assignment Created', `Dispatched to ${formData.form} ${formData.stream}`);
    setIsModalOpen(false);
  };

  return (
    <PortalLayout title="Homework & Assignment Manager" subtitle="Create class assignments, upload problem sets, monitor submission deadlines and provide student marks">
      <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="text-xs text-slate-500 font-medium">
          Active Assignments: <strong>{assignments.length}</strong>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 rounded-xl bg-aqua-600 hover:bg-aqua-700 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" /> Create Assignment
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {assignments.map((asg) => (
          <div
            key={asg.id}
            className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-premium transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-aqua-50 text-aqua-800 border border-aqua-200">
                  {asg.subject} &bull; {asg.form} {asg.stream}
                </span>
                <span className="text-xs text-rose-600 font-semibold flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> Due: {asg.dueDate}
                </span>
              </div>

              <h3 className="text-base font-bold text-charcoal-900 mb-2">{asg.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{asg.description}</p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Max Score: <strong>{asg.totalMarks} Marks</strong></span>
              <span>Submissions: <strong>{asg.submissionsCount || 0} / 48</strong></span>
            </div>
          </div>
        ))}
      </div>

      {/* Create Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Issue New Assignment">
        <form onSubmit={handleCreate} className="space-y-4 text-xs">
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Assignment Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. Calculus: Derivatives and Turning Points"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-slate-300"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Subject</label>
              <select
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300"
              >
                <option value="Mathematics">Mathematics</option>
                <option value="Physics">Physics</option>
              </select>
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Class</label>
              <select
                value={formData.form}
                onChange={(e) => setFormData({ ...formData, form: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300"
              >
                <option value="Form 3">Form 3</option>
                <option value="Form 4">Form 4</option>
              </select>
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Stream</label>
              <select
                value={formData.stream}
                onChange={(e) => setFormData({ ...formData, stream: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300"
              >
                <option value="East">East</option>
                <option value="West">West</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Submission Deadline *</label>
              <input
                type="date"
                required
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Total Marks *</label>
              <input
                type="number"
                required
                value={formData.totalMarks}
                onChange={(e) => setFormData({ ...formData, totalMarks: Number(e.target.value) || 20 })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Instructions / Questions *</label>
            <textarea
              required
              rows={4}
              placeholder="Specify textbook questions, problems, or essay guidelines..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-slate-300"
            />
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
              Publish Assignment
            </button>
          </div>
        </form>
      </Modal>
    </PortalLayout>
  );
}
