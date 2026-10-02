'use client';

import React, { useState } from 'react';
import { PortalLayout } from '@/components/portal/PortalLayout';
import { SAMPLE_ASSIGNMENTS } from '@/lib/mockData';
import { Assignment } from '@/types';
import { useNotification } from '@/context/NotificationContext';
import { ClipboardList, Clock, Upload, CheckCircle2 } from 'lucide-react';

export default function StudentAssignmentsPage() {
  const { showToast } = useNotification();
  const [submittedIds, setSubmittedIds] = useState<string[]>(['asg-01']);

  const handleSubmit = (id: string, title: string) => {
    setSubmittedIds((prev) => [...prev, id]);
    showToast('success', 'Assignment Submitted', `Your work for "${title}" has been transmitted to your teacher.`);
  };

  return (
    <PortalLayout title="Scholar Homework & Continuous Coursework" subtitle="View issued subject problems, essay prompts, laboratory report guidelines and submit work">
      <div className="space-y-6">
        {SAMPLE_ASSIGNMENTS.map((asg) => {
          const isDone = submittedIds.includes(asg.id);
          return (
            <div
              key={asg.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-premium transition-all space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-aqua-50 text-aqua-800 border border-aqua-200">
                    {asg.subject} &bull; {asg.form}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">Instructor: {asg.teacherName}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-rose-600 font-semibold flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> Due Date: {asg.dueDate}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-base font-bold text-charcoal-900">{asg.title}</h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">{asg.description}</p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-slate-100 text-xs">
                <span className="text-slate-500">Max Grade: <strong>{asg.totalMarks} Marks</strong></span>

                {isDone ? (
                  <span className="inline-flex items-center gap-1.5 text-emerald-600 font-bold bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                    <CheckCircle2 className="w-4 h-4" /> Work Submitted for Grading
                  </span>
                ) : (
                  <button
                    onClick={() => handleSubmit(asg.id, asg.title)}
                    className="px-4 py-2 rounded-xl bg-aqua-600 hover:bg-aqua-700 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-sm self-start sm:self-auto"
                  >
                    <Upload className="w-3.5 h-3.5" /> Submit Homework
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </PortalLayout>
  );
}
