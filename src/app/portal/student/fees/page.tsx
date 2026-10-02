'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { PortalLayout } from '@/components/portal/PortalLayout';
import { RouteGuard } from '@/components/portal/RouteGuard';
import { feesService } from '@/lib/services/feesService';
import { PaymentTransaction } from '@/types';
import { DollarSign, Printer, CheckCircle2, AlertCircle, X, Smartphone, Landmark, ArrowRight } from 'lucide-react';

const termSummaries = [
  { term: 'Term 1', billed: 37500, paid: 25000, dueDate: '2026-03-20', status: 'Pending' },
  { term: 'Term 2', billed: 39000, paid: 30000, dueDate: '2026-06-18', status: 'Partial' },
  { term: 'Term 3', billed: 41000, paid: 41000, dueDate: '2026-09-10', status: 'Paid' }
];

export default function StudentFeesPage() {
  const [payments, setPayments] = useState<PaymentTransaction[]>([]);
  const [payingTerm, setPayingTerm] = useState<typeof termSummaries[number] | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    feesService.getPaymentsByStudentId('std-1001').then(setPayments);
  }, []);

  const totals = useMemo(() => {
    const totalBilled = termSummaries.reduce((sum, row) => sum + row.billed, 0);
    const paid = termSummaries.reduce((sum, row) => sum + row.paid, 0);
    const pending = totalBilled - paid;
    return { totalBilled, paid, pending };
  }, []);

  const openPayModal = (term: typeof termSummaries[number]) => {
    setPayingTerm(term);
    setSuccess(false);
  };

  const submitMpesa = (event: React.FormEvent) => {
    event.preventDefault();
    setSuccess(true);
    setTimeout(() => {
      setPayingTerm(null);
      setSuccess(false);
    }, 1600);
  };

  return (
    <RouteGuard>
      <PortalLayout title="Fee statement" subtitle="Review term fees, outstanding balances, and payment status across the academic year.">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            { label: 'Total billed', value: `KES ${totals.totalBilled.toLocaleString()}`, accent: 'slate', icon: Landmark },
            { label: 'Paid', value: `KES ${totals.paid.toLocaleString()}`, accent: 'emerald', icon: CheckCircle2 },
            { label: 'Pending', value: `KES ${totals.pending.toLocaleString()}`, accent: 'amber', icon: AlertCircle }
          ].map((card) => {
            const Icon = card.icon;
            const accent = card.accent === 'emerald' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300' : card.accent === 'amber' ? 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300' : 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-100';
            return (
              <div key={card.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">{card.label}</p>
                    <p className="mt-3 text-2xl font-black text-slate-900 dark:text-white">{card.value}</p>
                  </div>
                  <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${accent}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-slate-800">
            <h3 className="text-lg font-black text-slate-900 dark:text-white">Term financial status</h3>
            <button type="button" onClick={() => window.print()} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-aqua-500 hover:text-aqua-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
              <Printer className="h-3.5 w-3.5" /> Print statement
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-700 dark:bg-slate-800/80 dark:text-slate-200">
                <tr>
                  <th className="px-5 py-3 font-semibold">Term</th>
                  <th className="px-5 py-3 font-semibold">Billed</th>
                  <th className="px-5 py-3 font-semibold">Paid</th>
                  <th className="px-5 py-3 font-semibold">Balance</th>
                  <th className="px-5 py-3 font-semibold">Due date</th>
                  <th className="px-5 py-3 font-semibold">Status</th>
                  <th className="px-5 py-3 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {termSummaries.map((row) => {
                  const balance = row.billed - row.paid;
                  return (
                    <tr key={row.term} className="transition hover:bg-slate-50 dark:hover:bg-slate-800/60">
                      <td className="px-5 py-3 font-bold text-slate-900 dark:text-white">{row.term}</td>
                      <td className="px-5 py-3 text-slate-700 dark:text-slate-200">KES {row.billed.toLocaleString()}</td>
                      <td className="px-5 py-3 text-emerald-700 dark:text-emerald-300">KES {row.paid.toLocaleString()}</td>
                      <td className="px-5 py-3 text-amber-700 dark:text-amber-300">KES {balance.toLocaleString()}</td>
                      <td className="px-5 py-3 text-slate-600 dark:text-slate-300">{row.dueDate}</td>
                      <td className="px-5 py-3">
                        <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] ${
                          row.status === 'Paid' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300' :
                          row.status === 'Partial' ? 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300' :
                          'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200'
                        }`}>{row.status}</span>
                      </td>
                      <td className="px-5 py-3 text-right">
                        <button type="button" onClick={() => openPayModal(row)} className="rounded-xl bg-aqua-600 px-3 py-2 text-xs font-bold text-white transition hover:bg-aqua-500">
                          {row.status === 'Paid' ? 'Receipt' : 'Pay now'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-black text-slate-900 dark:text-white">Payment history</h3>
            <span className="text-xs text-slate-500 dark:text-slate-400">{payments.length} verified entries</span>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-700 dark:bg-slate-800/80 dark:text-slate-200">
                <tr>
                  <th className="px-5 py-3 font-semibold">Receipt</th>
                  <th className="px-5 py-3 font-semibold">Date</th>
                  <th className="px-5 py-3 font-semibold">Method</th>
                  <th className="px-5 py-3 font-semibold">Amount</th>
                  <th className="px-5 py-3 font-semibold">Reference</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {payments.map((payment) => (
                  <tr key={payment.id} className="transition hover:bg-slate-50 dark:hover:bg-slate-800/60">
                    <td className="px-5 py-3 font-mono text-aqua-700 dark:text-aqua-300">{payment.receiptNumber}</td>
                    <td className="px-5 py-3 text-slate-600 dark:text-slate-300">{payment.date}</td>
                    <td className="px-5 py-3 text-slate-600 dark:text-slate-300">{payment.paymentMethod}</td>
                    <td className="px-5 py-3 font-bold text-emerald-700 dark:text-emerald-300">KES {payment.amount.toLocaleString()}</td>
                    <td className="px-5 py-3 font-mono text-slate-600 dark:text-slate-300">{payment.transactionReference}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <AnimatePresence>
          {payingTerm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4"
            >
              <motion.div
                initial={{ y: 26, opacity: 0, scale: 0.96 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: 18, opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.2 }}
                className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-700 dark:bg-slate-900"
              >
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-aqua-600">M-Pesa</p>
                    <h3 className="mt-1 text-xl font-black text-slate-900 dark:text-white">Pay {payingTerm.term}</h3>
                  </div>
                  <button type="button" onClick={() => setPayingTerm(null)} className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 transition hover:border-slate-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {success ? (
                  <div className="space-y-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-center dark:border-emerald-900 dark:bg-emerald-500/5">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                      <CheckCircle2 className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-lg font-black text-slate-900 dark:text-white">Payment successful</p>
                      <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">KES {payingTerm.billed.toLocaleString()} has been sent to the school via M-Pesa.</p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={submitMpesa} className="space-y-4">
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/60">
                      <p className="text-xs text-slate-500 dark:text-slate-400">Amount due</p>
                      <p className="mt-1 text-2xl font-black text-slate-900 dark:text-white">KES {payingTerm.billed.toLocaleString()}</p>
                    </div>

                    <label className="block space-y-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
                      <span>Phone number</span>
                      <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 dark:border-slate-700 dark:bg-slate-800">
                        <Smartphone className="h-4 w-4 text-slate-500" />
                        <input type="tel" defaultValue="+254 712 345 678" className="w-full bg-transparent text-sm outline-none dark:text-white" />
                      </div>
                    </label>

                    <button type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-aqua-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-aqua-500">
                      Send M-Pesa prompt <ArrowRight className="h-4 w-4" />
                    </button>
                  </form>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </PortalLayout>
    </RouteGuard>
  );
}
