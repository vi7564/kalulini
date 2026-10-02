'use client';

import React, { useState, useEffect } from 'react';
import { PortalLayout } from '@/components/portal/PortalLayout';
import { admissionService } from '@/lib/services/admissionService';
import { AdmissionApplication } from '@/types';
import { useNotification } from '@/context/NotificationContext';
import { Modal } from '@/components/ui/Modal';
import { FileCheck, Search, CheckCircle2, XCircle, Clock, AlertCircle } from 'lucide-react';

export default function AdminAdmissionsDeskPage() {
  const { showToast } = useNotification();
  const [applications, setApplications] = useState<AdmissionApplication[]>([]);
  const [search, setSearch] = useState('');
  const [selectedApp, setSelectedApp] = useState<AdmissionApplication | null>(null);
  const [newStatus, setNewStatus] = useState<AdmissionApplication['status']>('Accepted');
  const [reviewNotes, setReviewNotes] = useState('');

  const loadApps = () => {
    admissionService.getApplications().then(setApplications);
  };

  useEffect(() => {
    loadApps();
  }, []);

  const openReviewModal = (app: AdmissionApplication) => {
    setSelectedApp(app);
    setNewStatus(app.status);
    setReviewNotes(app.reviewNotes || '');
  };

  const handleUpdateStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedApp) return;

    await admissionService.updateStatus(selectedApp.id, newStatus, reviewNotes);
    showToast('success', 'Status Updated', `Application ${selectedApp.applicationReference} changed to ${newStatus}`);
    setSelectedApp(null);
    loadApps();
  };

  const filtered = applications.filter((app) =>
    app.applicationReference.toLowerCase().includes(search.toLowerCase()) ||
    app.applicantFirstName.toLowerCase().includes(search.toLowerCase()) ||
    app.applicantLastName.toLowerCase().includes(search.toLowerCase()) ||
    app.parentName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <PortalLayout title="Admissions Desk & Application Review" subtitle="Evaluate prospective student intake applications, review KCPE scores, verify certificates and issue admission decisions">
      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="relative flex-1 sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by reference, applicant, or parent..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-aqua-500"
          />
        </div>

        <div className="text-xs text-slate-500 font-medium">
          Total Applications: <strong>{applications.length}</strong>
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3 px-5">Ref Code</th>
                <th className="py-3 px-5">Applicant Name</th>
                <th className="py-3 px-5">Class Target</th>
                <th className="py-3 px-5">KCPE Marks</th>
                <th className="py-3 px-5">Primary School</th>
                <th className="py-3 px-5">Parent & Phone</th>
                <th className="py-3 px-5">Status</th>
                <th className="py-3 px-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((app) => (
                <tr key={app.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-5 font-mono font-bold text-aqua-700">{app.applicationReference}</td>
                  <td className="py-3 px-5 font-semibold text-charcoal-900">{app.applicantFirstName} {app.applicantLastName}</td>
                  <td className="py-3 px-5 text-slate-700">{app.targetForm}</td>
                  <td className="py-3 px-5 font-bold text-charcoal-900">{app.kcpeMarks || 'N/A'}</td>
                  <td className="py-3 px-5 text-slate-600 truncate max-w-xs">{app.currentSchool}</td>
                  <td className="py-3 px-5">
                    <span className="text-charcoal-800 font-medium block">{app.parentName}</span>
                    <span className="text-[10px] text-slate-400">{app.parentPhone}</span>
                  </td>
                  <td className="py-3 px-5">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      app.status === 'Accepted' ? 'bg-emerald-100 text-emerald-800' :
                      app.status === 'Rejected' ? 'bg-rose-100 text-rose-800' :
                      app.status === 'Waitlisted' ? 'bg-amber-100 text-amber-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="py-3 px-5 text-right">
                    <button
                      onClick={() => openReviewModal(app)}
                      className="px-3 py-1 rounded-lg bg-aqua-50 hover:bg-aqua-100 text-aqua-800 font-bold text-[11px] transition-colors"
                    >
                      Review Decision
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Review Modal */}
      {selectedApp && (
        <Modal
          isOpen={!!selectedApp}
          onClose={() => setSelectedApp(null)}
          title={`Review Application: ${selectedApp.applicationReference}`}
        >
          <form onSubmit={handleUpdateStatus} className="space-y-4 text-xs">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <p><strong>Applicant:</strong> {selectedApp.applicantFirstName} {selectedApp.applicantLastName}</p>
                <p><strong>Target Form:</strong> {selectedApp.targetForm}</p>
                <p><strong>KCPE Marks:</strong> {selectedApp.kcpeMarks}</p>
                <p><strong>County:</strong> {selectedApp.homeCounty}, {selectedApp.subCounty}</p>
                <p><strong>Parent:</strong> {selectedApp.parentName}</p>
                <p><strong>Contact:</strong> {selectedApp.parentPhone}</p>
              </div>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Admissions Board Decision *</label>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value as any)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 font-semibold"
              >
                <option value="Under Review">Under Review</option>
                <option value="Accepted">Accepted (Issue Admission Letter)</option>
                <option value="Waitlisted">Waitlisted (Pending Stream Vacancy)</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Admissions Committee Notes / Directives</label>
              <textarea
                rows={3}
                value={reviewNotes}
                onChange={(e) => setReviewNotes(e.target.value)}
                placeholder="e.g. Accepted for Form 1 West. Boarding requirements package issued."
                className="w-full px-3 py-2 rounded-lg border border-slate-300"
              />
            </div>

            <div className="pt-4 border-t flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setSelectedApp(null)}
                className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 font-bold uppercase"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-xl bg-aqua-600 hover:bg-aqua-700 text-white font-bold uppercase transition-colors"
              >
                Save Admission Decision
              </button>
            </div>
          </form>
        </Modal>
      )}
    </PortalLayout>
  );
}
