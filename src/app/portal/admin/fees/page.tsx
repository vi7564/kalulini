'use client';

import React, { useState, useEffect } from 'react';
import { PortalLayout } from '@/components/portal/PortalLayout';
import { feesService } from '@/lib/services/feesService';
import { studentService } from '@/lib/services/studentService';
import { PaymentTransaction, Student } from '@/types';
import { useNotification } from '@/context/NotificationContext';
import { Modal } from '@/components/ui/Modal';
import { DollarSign, Plus, Search, FileText, CheckCircle2 } from 'lucide-react';

export default function FeesManagementPage() {
  const { showToast } = useNotification();
  const [payments, setPayments] = useState<PaymentTransaction[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState('');

  const [formData, setFormData] = useState({
    studentId: '',
    admissionNumber: '',
    studentName: '',
    amount: 15000,
    date: new Date().toISOString().slice(0, 10),
    paymentMethod: 'Bank Transfer' as PaymentTransaction['paymentMethod'],
    transactionReference: '',
    verifiedBy: 'Senior Bursar'
  });

  const loadData = () => {
    feesService.getPaymentTransactions().then(setPayments);
    studentService.getStudents().then((stds) => {
      setStudents(stds);
      if (stds.length > 0 && !formData.studentId) {
        setFormData((prev) => ({
          ...prev,
          studentId: stds[0].id,
          admissionNumber: stds[0].admissionNumber,
          studentName: `${stds[0].firstName} ${stds[0].lastName}`
        }));
      }
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStudentSelect = (stdId: string) => {
    const s = students.find((x) => x.id === stdId);
    if (s) {
      setFormData({
        ...formData,
        studentId: s.id,
        admissionNumber: s.admissionNumber,
        studentName: `${s.firstName} ${s.lastName}`
      });
    }
  };

  const handleRecordPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.amount || !formData.transactionReference) {
      showToast('error', 'Missing Information', 'Please provide amount and transaction reference.');
      return;
    }

    const newPayment = await feesService.recordPayment({
      studentId: formData.studentId,
      admissionNumber: formData.admissionNumber,
      studentName: formData.studentName,
      amount: Number(formData.amount),
      date: formData.date,
      paymentMethod: formData.paymentMethod,
      transactionReference: formData.transactionReference,
      verifiedBy: formData.verifiedBy
    });

    // Update student balance if possible
    const s = students.find((x) => x.id === formData.studentId);
    if (s) {
      const newBalance = Math.max(0, s.feeBalance - Number(formData.amount));
      await studentService.updateStudent(s.id, { feeBalance: newBalance });
    }

    showToast('success', 'Fee Payment Recorded', `Receipt generated: ${newPayment.receiptNumber}`);
    setIsModalOpen(false);
    loadData();
  };

  const totalCollected = payments.reduce((acc, p) => acc + p.amount, 0);

  const filtered = payments.filter((p) =>
    p.studentName.toLowerCase().includes(search.toLowerCase()) ||
    p.admissionNumber.toLowerCase().includes(search.toLowerCase()) ||
    p.receiptNumber.toLowerCase().includes(search.toLowerCase()) ||
    p.transactionReference.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <PortalLayout title="Fees, Invoicing & Bursar Ledger" subtitle="Real-time reconciliation of school fee deposits, receipting, invoices and student balances">
      {/* Financial KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Verified Collections</span>
            <div className="text-2xl font-extrabold text-charcoal-900 font-display mt-1">
              KES {totalCollected.toLocaleString()}
            </div>
            <span className="text-xs text-emerald-600 font-semibold mt-1 block">Term 1 Reconciled</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Outstanding Balances</span>
            <div className="text-2xl font-extrabold text-charcoal-900 font-display mt-1">
              KES 45,500
            </div>
            <span className="text-xs text-amber-600 font-semibold mt-1 block">Across Unsettled Accounts</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <FileText className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Transactions</span>
            <div className="text-2xl font-extrabold text-charcoal-900 font-display mt-1">
              {payments.length}
            </div>
            <span className="text-xs text-slate-500 mt-1 block">Bank & M-Pesa Receipts</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Filter and Add Button */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="relative flex-1 sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by student, receipt, or reference..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-aqua-500"
          />
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 rounded-xl bg-aqua-600 hover:bg-aqua-700 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" /> Record New Payment
        </button>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3 px-5">Receipt No</th>
                <th className="py-3 px-5">Date</th>
                <th className="py-3 px-5">Scholar</th>
                <th className="py-3 px-5">Adm No</th>
                <th className="py-3 px-5">Amount (KES)</th>
                <th className="py-3 px-5">Payment Channel</th>
                <th className="py-3 px-5">Reference Slip</th>
                <th className="py-3 px-5">Audited By</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((pay) => (
                <tr key={pay.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-5 font-mono font-bold text-aqua-700">{pay.receiptNumber}</td>
                  <td className="py-3 px-5 text-slate-500">{pay.date}</td>
                  <td className="py-3 px-5 font-semibold text-charcoal-900">{pay.studentName}</td>
                  <td className="py-3 px-5 font-mono text-slate-600">{pay.admissionNumber}</td>
                  <td className="py-3 px-5 font-bold text-emerald-700">KES {pay.amount.toLocaleString()}</td>
                  <td className="py-3 px-5">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-slate-100 text-slate-700">
                      {pay.paymentMethod}
                    </span>
                  </td>
                  <td className="py-3 px-5 font-mono text-slate-600">{pay.transactionReference}</td>
                  <td className="py-3 px-5 text-slate-500">{pay.verifiedBy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Record Payment Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Record School Fee Payment">
        <form onSubmit={handleRecordPayment} className="space-y-4 text-xs">
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Select Student *</label>
            <select
              value={formData.studentId}
              onChange={(e) => handleStudentSelect(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300"
            >
              {students.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.admissionNumber} - {s.firstName} {s.lastName} ({s.form}) - Balance: KES {s.feeBalance}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Amount Paid (KES) *</label>
              <input
                type="number"
                required
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) || 0 })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Payment Date *</label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Payment Channel *</label>
              <select
                value={formData.paymentMethod}
                onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value as any })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300"
              >
                <option value="Bank Transfer">Bank Transfer / Direct Deposit</option>
                <option value="M-Pesa Paybill">M-Pesa Paybill</option>
                <option value="Cheque">Banker&apos;s Cheque</option>
              </select>
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Bank Slip / M-Pesa Ref *</label>
              <input
                type="text"
                required
                placeholder="e.g. KCB-887123 or SBA98124"
                value={formData.transactionReference}
                onChange={(e) => setFormData({ ...formData, transactionReference: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 font-mono"
              />
            </div>
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
              Generate Official Receipt
            </button>
          </div>
        </form>
      </Modal>
    </PortalLayout>
  );
}
