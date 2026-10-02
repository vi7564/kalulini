'use client';

import React, { useState, useEffect } from 'react';
import { PortalLayout } from '@/components/portal/PortalLayout';
import { studentService } from '@/lib/services/studentService';
import { Student } from '@/types';
import { useNotification } from '@/context/NotificationContext';
import { Check, X, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function TeacherAttendancePage() {
  const { showToast } = useNotification();
  const [students, setStudents] = useState<Student[]>([]);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [formStream, setFormStream] = useState('Form 3 East');

  // Track status per student id: Present, Absent, Late, Excused
  const [attendanceMap, setAttendanceMap] = useState<Record<string, 'Present' | 'Absent' | 'Late' | 'Excused'>>({});

  useEffect(() => {
    studentService.getStudents().then((stds) => {
      setStudents(stds);
      const initialMap: Record<string, any> = {};
      stds.forEach((s) => {
        initialMap[s.id] = 'Present';
      });
      setAttendanceMap(initialMap);
    });
  }, []);

  const handleStatusChange = (studentId: string, status: 'Present' | 'Absent' | 'Late' | 'Excused') => {
    setAttendanceMap((prev) => ({
      ...prev,
      [studentId]: status
    }));
  };

  const handleMarkAll = (status: 'Present' | 'Absent') => {
    const updated: Record<string, any> = {};
    students.forEach((s) => {
      updated[s.id] = status;
    });
    setAttendanceMap(updated);
  };

  const handleSaveRegister = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('success', 'Attendance Register Saved', `Class roll call for ${formStream} recorded for ${date}.`);
  };

  const presentCount = Object.values(attendanceMap).filter((s) => s === 'Present').length;
  const totalCount = students.length || 1;
  const attendancePercentage = Math.round((presentCount / totalCount) * 100);

  return (
    <PortalLayout title="Daily Roll Call Register" subtitle="Mark morning and afternoon attendance for Form 3 East. Records update student transcripts and parent portals">
      {/* Top Filter & Bulk Controls */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-500 block mb-1">Class & Stream</label>
            <select
              value={formStream}
              onChange={(e) => setFormStream(e.target.value)}
              className="text-xs px-3 py-2 rounded-xl border border-slate-300 font-bold text-charcoal-900 focus:outline-none focus:border-aqua-500"
            >
              <option value="Form 3 East">Form 3 East (Class Teacher)</option>
              <option value="Form 4 West">Form 4 West (Subject Class)</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-500 block mb-1">Register Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="text-xs px-3 py-2 rounded-xl border border-slate-300 font-semibold focus:outline-none focus:border-aqua-500"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => handleMarkAll('Present')}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-charcoal-800 text-xs font-bold transition-colors"
          >
            Mark All Present
          </button>
          <button
            onClick={handleSaveRegister}
            className="px-5 py-2 rounded-xl bg-aqua-600 hover:bg-aqua-700 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
          >
            Submit Register
          </button>
        </div>
      </div>

      {/* KPI Stats Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 text-center">
          <span className="text-[11px] font-bold uppercase text-slate-400">Total Scholars</span>
          <div className="text-xl font-bold text-charcoal-900 mt-0.5">{totalCount}</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 text-center">
          <span className="text-[11px] font-bold uppercase text-emerald-600">Present</span>
          <div className="text-xl font-bold text-emerald-600 mt-0.5">{presentCount}</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 text-center">
          <span className="text-[11px] font-bold uppercase text-rose-600">Absent</span>
          <div className="text-xl font-bold text-rose-600 mt-0.5">{totalCount - presentCount}</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 text-center">
          <span className="text-[11px] font-bold uppercase text-aqua-600">Attendance Rate</span>
          <div className="text-xl font-bold text-aqua-700 mt-0.5">{attendancePercentage}%</div>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3 px-5">Scholar Name</th>
                <th className="py-3 px-5">Adm No</th>
                <th className="py-3 px-5">House</th>
                <th className="py-3 px-5 text-center">Status Selection</th>
                <th className="py-3 px-5">Term Record</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {students.map((std) => {
                const currentStatus = attendanceMap[std.id] || 'Present';
                return (
                  <tr key={std.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-5 font-bold text-charcoal-900">
                      {std.firstName} {std.lastName}
                    </td>
                    <td className="py-3 px-5 font-mono text-slate-600">{std.admissionNumber}</td>
                    <td className="py-3 px-5 text-slate-600">{std.house}</td>
                    <td className="py-3 px-5 text-center">
                      <div className="inline-flex rounded-lg border border-slate-200 p-0.5 bg-slate-50">
                        <button
                          type="button"
                          onClick={() => handleStatusChange(std.id, 'Present')}
                          className={`px-3 py-1 rounded-md text-[11px] font-bold transition-all ${
                            currentStatus === 'Present'
                              ? 'bg-emerald-600 text-white shadow-sm'
                              : 'text-slate-600 hover:text-emerald-700'
                          }`}
                        >
                          Present
                        </button>
                        <button
                          type="button"
                          onClick={() => handleStatusChange(std.id, 'Late')}
                          className={`px-3 py-1 rounded-md text-[11px] font-bold transition-all ${
                            currentStatus === 'Late'
                              ? 'bg-amber-500 text-white shadow-sm'
                              : 'text-slate-600 hover:text-amber-700'
                          }`}
                        >
                          Late
                        </button>
                        <button
                          type="button"
                          onClick={() => handleStatusChange(std.id, 'Absent')}
                          className={`px-3 py-1 rounded-md text-[11px] font-bold transition-all ${
                            currentStatus === 'Absent'
                              ? 'bg-rose-600 text-white shadow-sm'
                              : 'text-slate-600 hover:text-rose-700'
                          }`}
                        >
                          Absent
                        </button>
                        <button
                          type="button"
                          onClick={() => handleStatusChange(std.id, 'Excused')}
                          className={`px-3 py-1 rounded-md text-[11px] font-bold transition-all ${
                            currentStatus === 'Excused'
                              ? 'bg-blue-600 text-white shadow-sm'
                              : 'text-slate-600 hover:text-blue-700'
                          }`}
                        >
                          Excused
                        </button>
                      </div>
                    </td>
                    <td className="py-3 px-5 text-slate-500 font-semibold">{std.attendanceRate}% avg</td>
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
