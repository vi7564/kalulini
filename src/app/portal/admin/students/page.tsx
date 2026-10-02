'use client';

import React, { useState, useEffect } from 'react';
import { PortalLayout } from '@/components/portal/PortalLayout';
import { studentService } from '@/lib/services/studentService';
import { Student } from '@/types';
import { useNotification } from '@/context/NotificationContext';
import { Modal } from '@/components/ui/Modal';
import {
  Users,
  Search,
  Plus,
  Edit2,
  Trash2,
  Filter,
  CheckCircle2,
  UserCheck,
  ChevronDown
} from 'lucide-react';

export default function StudentManagementPage() {
  const { showToast } = useNotification();
  const [students, setStudents] = useState<Student[]>([]);
  const [search, setSearch] = useState('');
  const [filterForm, setFilterForm] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  // New Student Form State
  const [formData, setFormData] = useState<Omit<Student, 'id'>>({
    admissionNumber: '',
    firstName: '',
    middleName: '',
    lastName: '',
    gender: 'Male',
    dateOfBirth: '2009-01-01',
    enrollmentDate: '2026-01-06',
    form: 'Form 1',
    stream: 'East',
    house: 'Simba House',
    guardianName: '',
    guardianPhone: '',
    guardianEmail: '',
    guardianRelationship: 'Father',
    county: 'Makueni',
    kcpeMarks: 380,
    status: 'Active',
    feeBalance: 0,
    attendanceRate: 100,
    photoURL: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80'
  });

  const loadStudents = () => {
    studentService.getStudents().then(setStudents);
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const openAddModal = () => {
    setEditingStudent(null);
    const nextAdm = 'KBHS/' + (4200 + students.length + 1);
    setFormData({
      admissionNumber: nextAdm,
      firstName: '',
      middleName: '',
      lastName: '',
      gender: 'Male',
      dateOfBirth: '2009-01-01',
      enrollmentDate: '2026-01-06',
      form: 'Form 1',
      stream: 'East',
      house: 'Simba House',
      guardianName: '',
      guardianPhone: '',
      guardianEmail: '',
      guardianRelationship: 'Father',
      county: 'Makueni',
      kcpeMarks: 380,
      status: 'Active',
      feeBalance: 0,
      attendanceRate: 100,
      photoURL: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80'
    });
    setIsModalOpen(true);
  };

  const openEditModal = (std: Student) => {
    setEditingStudent(std);
    setFormData({
      admissionNumber: std.admissionNumber,
      firstName: std.firstName,
      middleName: std.middleName || '',
      lastName: std.lastName,
      gender: std.gender,
      dateOfBirth: std.dateOfBirth,
      enrollmentDate: std.enrollmentDate,
      form: std.form,
      stream: std.stream,
      house: std.house,
      guardianName: std.guardianName,
      guardianPhone: std.guardianPhone,
      guardianEmail: std.guardianEmail || '',
      guardianRelationship: std.guardianRelationship,
      county: std.county,
      kcpeMarks: std.kcpeMarks || 350,
      status: std.status,
      feeBalance: std.feeBalance,
      attendanceRate: std.attendanceRate,
      photoURL: std.photoURL || ''
    });
    setIsModalOpen(true);
  };

  const handleSaveStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.admissionNumber) {
      showToast('error', 'Missing Information', 'Please complete all required fields.');
      return;
    }

    if (editingStudent) {
      await studentService.updateStudent(editingStudent.id, formData);
      showToast('success', 'Student Record Updated', `${formData.firstName} ${formData.lastName} modified successfully.`);
    } else {
      await studentService.addStudent(formData);
      showToast('success', 'Student Enrolled', `${formData.firstName} ${formData.lastName} added to student roll.`);
    }

    setIsModalOpen(false);
    loadStudents();
  };

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to remove ${name} from the active roll?`)) {
      await studentService.deleteStudent(id);
      showToast('info', 'Student Record Removed', `${name} archived.`);
      loadStudents();
    }
  };

  const filtered = students.filter((s) => {
    const matchesForm = filterForm === 'All' || s.form === filterForm;
    const matchesSearch =
      s.firstName.toLowerCase().includes(search.toLowerCase()) ||
      s.lastName.toLowerCase().includes(search.toLowerCase()) ||
      s.admissionNumber.toLowerCase().includes(search.toLowerCase());
    return matchesForm && matchesSearch;
  });

  return (
    <PortalLayout title="Student Management Directory" subtitle="Manage scholar enrollments, class placements, houses, fee statuses, and parent contacts">
      {/* Top Filter and Add Row */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          {/* Search Box */}
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by name or Adm No..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-aqua-500"
            />
          </div>

          {/* Form Filter */}
          <select
            value={filterForm}
            onChange={(e) => setFilterForm(e.target.value)}
            className="text-xs px-3 py-1.5 rounded-xl border border-slate-300 bg-white focus:outline-none focus:border-aqua-500"
          >
            <option value="All">All Forms</option>
            <option value="Form 1">Form 1</option>
            <option value="Form 2">Form 2</option>
            <option value="Form 3">Form 3</option>
            <option value="Form 4">Form 4</option>
          </select>
        </div>

        <button
          onClick={openAddModal}
          className="w-full sm:w-auto px-4 py-2 rounded-xl bg-aqua-600 hover:bg-aqua-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" /> Add New Scholar
        </button>
      </div>

      {/* Students Data Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3 px-5">Scholar</th>
                <th className="py-3 px-5">Adm No</th>
                <th className="py-3 px-5">Class & Stream</th>
                <th className="py-3 px-5">House</th>
                <th className="py-3 px-5">Guardian & Phone</th>
                <th className="py-3 px-5">Fee Balance</th>
                <th className="py-3 px-5">Attendance</th>
                <th className="py-3 px-5">Status</th>
                <th className="py-3 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((std) => (
                <tr key={std.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-200 shrink-0 border border-slate-300">
                        {std.photoURL ? (
                          <img src={std.photoURL} alt={std.firstName} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center font-bold text-slate-600">
                            {std.firstName[0]}
                          </div>
                        )}
                      </div>
                      <div>
                        <span className="font-bold text-charcoal-900 block">
                          {std.firstName} {std.lastName}
                        </span>
                        <span className="text-[10px] text-slate-400">KCPE: {std.kcpeMarks || 'N/A'}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-5 font-mono font-bold text-aqua-700">{std.admissionNumber}</td>
                  <td className="py-3 px-5 text-slate-700 font-medium">
                    {std.form} &bull; <span className="text-slate-500">{std.stream}</span>
                  </td>
                  <td className="py-3 px-5 text-slate-600">{std.house}</td>
                  <td className="py-3 px-5">
                    <span className="text-charcoal-800 font-medium block">{std.guardianName}</span>
                    <span className="text-[10px] text-slate-400">{std.guardianPhone}</span>
                  </td>
                  <td className="py-3 px-5">
                    {std.feeBalance === 0 ? (
                      <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                        Cleared
                      </span>
                    ) : (
                      <span className="text-amber-800 font-bold bg-amber-50 px-2 py-0.5 rounded">
                        KES {std.feeBalance.toLocaleString()}
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-5 font-semibold text-slate-700">{std.attendanceRate}%</td>
                  <td className="py-3 px-5">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800">
                      {std.status}
                    </span>
                  </td>
                  <td className="py-3 px-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEditModal(std)}
                        className="p-1 rounded-lg text-slate-500 hover:text-aqua-600 hover:bg-slate-100 transition-colors"
                        title="Edit Student Record"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(std.id, `${std.firstName} ${std.lastName}`)}
                        className="p-1 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        title="Remove Student Record"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Student Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingStudent ? `Edit Student: ${editingStudent.firstName} ${editingStudent.lastName}` : "Enroll New Student"}
        maxWidth="xl"
      >
        <form onSubmit={handleSaveStudent} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Admission Number *</label>
              <input
                type="text"
                required
                value={formData.admissionNumber}
                onChange={(e) => setFormData({ ...formData, admissionNumber: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 font-mono"
              />
            </div>
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

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Form Class *</label>
              <select
                value={formData.form}
                onChange={(e) => setFormData({ ...formData, form: e.target.value as any })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300"
              >
                <option value="Form 1">Form 1</option>
                <option value="Form 2">Form 2</option>
                <option value="Form 3">Form 3</option>
                <option value="Form 4">Form 4</option>
              </select>
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Stream *</label>
              <select
                value={formData.stream}
                onChange={(e) => setFormData({ ...formData, stream: e.target.value as any })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300"
              >
                <option value="East">East</option>
                <option value="West">West</option>
                <option value="North">North</option>
                <option value="South">South</option>
              </select>
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Boarding House *</label>
              <select
                value={formData.house}
                onChange={(e) => setFormData({ ...formData, house: e.target.value as any })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300"
              >
                <option value="Simba House">Simba House</option>
                <option value="Chui House">Chui House</option>
                <option value="Kifaru House">Kifaru House</option>
                <option value="Twiga House">Twiga House</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Guardian Name *</label>
              <input
                type="text"
                required
                value={formData.guardianName}
                onChange={(e) => setFormData({ ...formData, guardianName: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Guardian Phone *</label>
              <input
                type="tel"
                required
                value={formData.guardianPhone}
                onChange={(e) => setFormData({ ...formData, guardianPhone: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Fee Balance (KES)</label>
              <input
                type="number"
                value={formData.feeBalance}
                onChange={(e) => setFormData({ ...formData, feeBalance: Number(e.target.value) || 0 })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Attendance Rate %</label>
              <input
                type="number"
                value={formData.attendanceRate}
                onChange={(e) => setFormData({ ...formData, attendanceRate: Number(e.target.value) || 100 })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">KCPE Marks</label>
              <input
                type="number"
                value={formData.kcpeMarks}
                onChange={(e) => setFormData({ ...formData, kcpeMarks: Number(e.target.value) || 350 })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300"
              />
            </div>
          </div>

          <div className="pt-4 border-t flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs uppercase"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-xl bg-aqua-600 hover:bg-aqua-700 text-white font-bold text-xs uppercase transition-colors"
            >
              {editingStudent ? 'Save Changes' : 'Enroll Student'}
            </button>
          </div>
        </form>
      </Modal>
    </PortalLayout>
  );
}
