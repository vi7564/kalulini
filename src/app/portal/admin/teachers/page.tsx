'use client';

import React, { useState, useEffect } from 'react';
import { PortalLayout } from '@/components/portal/PortalLayout';
import { teacherService } from '@/lib/services/teacherService';
import { Teacher } from '@/types';
import { useNotification } from '@/context/NotificationContext';
import { Modal } from '@/components/ui/Modal';
import { UserCheck, Search, Plus, Mail, Phone, BookOpen } from 'lucide-react';

export default function TeacherManagementPage() {
  const { showToast } = useNotification();
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState<Omit<Teacher, 'id'>>({
    tscNumber: '',
    staffNumber: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    department: 'Sciences & Mathematics',
    subjects: ['Mathematics'],
    assignedClasses: ['Form 3 East'],
    roleTitle: 'Subject Teacher',
    qualification: 'B.Ed Science',
    joiningDate: '2026-01-01',
    status: 'Active',
    photoURL: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80'
  });

  const loadTeachers = () => {
    teacherService.getTeachers().then(setTeachers);
  };

  useEffect(() => {
    loadTeachers();
  }, []);

  const openAddModal = () => {
    const nextStaff = 'KB-T0' + (teachers.length + 1);
    setFormData({
      tscNumber: 'TSC/' + Math.floor(100000 + Math.random() * 900000),
      staffNumber: nextStaff,
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      department: 'Sciences & Mathematics',
      subjects: ['Mathematics'],
      assignedClasses: ['Form 3 East'],
      roleTitle: 'Subject Teacher',
      qualification: 'B.Ed Science',
      joiningDate: '2026-01-01',
      status: 'Active',
      photoURL: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80'
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.email) {
      showToast('error', 'Missing Information', 'Please complete required fields.');
      return;
    }
    await teacherService.addTeacher(formData);
    showToast('success', 'Teacher Appointed', `${formData.firstName} ${formData.lastName} added to faculty roster.`);
    setIsModalOpen(false);
    loadTeachers();
  };

  const filtered = teachers.filter((t) =>
    t.firstName.toLowerCase().includes(search.toLowerCase()) ||
    t.lastName.toLowerCase().includes(search.toLowerCase()) ||
    t.department.toLowerCase().includes(search.toLowerCase()) ||
    t.staffNumber.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <PortalLayout title="Faculty & Teacher Directory" subtitle="Manage teaching staff appointments, TSC registration, department allocations, and teaching loads">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="relative flex-1 sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by teacher name, department, or staff ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-aqua-500"
          />
        </div>

        <button
          onClick={openAddModal}
          className="px-4 py-2 rounded-xl bg-aqua-600 hover:bg-aqua-700 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" /> Appoint New Teacher
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((t) => (
          <div
            key={t.id}
            className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-premium transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl overflow-hidden bg-slate-200 shrink-0 border border-slate-300">
                  <img src={t.photoURL} alt={t.firstName} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-charcoal-900 leading-tight">
                    {t.firstName} {t.lastName}
                  </h3>
                  <span className="text-xs text-aqua-700 font-semibold block">{t.roleTitle}</span>
                  <span className="text-[10px] text-slate-400 font-mono mt-0.5 block">
                    {t.staffNumber} &bull; {t.tscNumber}
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                <p><strong>Department:</strong> {t.department}</p>
                <p><strong>Subjects:</strong> {t.subjects.join(', ')}</p>
                <p><strong>Classes:</strong> {t.assignedClasses.join(', ')}</p>
                <p className="text-[11px] text-slate-500"><strong>Credentials:</strong> {t.qualification}</p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800">
                {t.status}
              </span>
              <span className="text-slate-400 text-[11px]">{t.phone}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Teacher Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Appoint New Teacher">
        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Staff ID *</label>
              <input
                type="text"
                required
                value={formData.staffNumber}
                onChange={(e) => setFormData({ ...formData, staffNumber: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 font-mono"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">TSC Number *</label>
              <input
                type="text"
                required
                value={formData.tscNumber}
                onChange={(e) => setFormData({ ...formData, tscNumber: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">First Name *</label>
              <input
                type="text"
                required
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Last Name *</label>
              <input
                type="text"
                required
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Email Address *</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="teacher@kaluliniboys.ac.ke"
                className="w-full px-3 py-2 rounded-lg border border-slate-300"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Phone Number</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Department</label>
            <select
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-slate-300"
            >
              <option value="Sciences & Mathematics">Sciences & Mathematics</option>
              <option value="Languages">Languages</option>
              <option value="Humanities & Social Sciences">Humanities & Social Sciences</option>
              <option value="Technical & Applied Studies">Technical & Applied Studies</option>
            </select>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Role Title / Responsibilities</label>
            <input
              type="text"
              value={formData.roleTitle}
              onChange={(e) => setFormData({ ...formData, roleTitle: e.target.value })}
              placeholder="e.g. Senior Master / Class Teacher Form 3 East"
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
              Appoint Teacher
            </button>
          </div>
        </form>
      </Modal>
    </PortalLayout>
  );
}
