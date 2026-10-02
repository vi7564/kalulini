'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import { CheckCircle2, CreditCard, MessageCircle, Send, UserRound } from 'lucide-react';
import { PARENT_WARDS, type ParentMessage } from '../../../data/portalDashboards';

const attendanceHistory = [
  { week: 'W1', rate: 95 }, { week: 'W2', rate: 98 }, { week: 'W3', rate: 93 },
  { week: 'W4', rate: 97 }, { week: 'W5', rate: 100 }, { week: 'W6', rate: 96 },
];

export function ParentDashboardPanel() {
  const [wardId, setWardId] = useState(PARENT_WARDS[0].id);
  const [balances, setBalances] = useState(() => Object.fromEntries(PARENT_WARDS.map((ward) => [ward.id, ward.feeBalance])));
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState(5000);
  const [phone, setPhone] = useState('+254 712 345 678');
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [messagesByWard, setMessagesByWard] = useState<Record<string, ParentMessage[]>>({});
  const [draft, setDraft] = useState('');
  const paymentDialogRef = useRef<HTMLElement>(null);
  const paymentTriggerRef = useRef<HTMLButtonElement>(null);
  const ward = PARENT_WARDS.find((item) => item.id === wardId) ?? PARENT_WARDS[0];
  const feeBalance = balances[ward.id] ?? ward.feeBalance;
  const messages = messagesByWard[ward.id] ?? ward.messages;

  const selectedTrend = useMemo(() => attendanceHistory.map((point) => ({ ...point, rate: Math.min(100, point.rate + (ward.attendanceRate > 97 ? 2 : 0)) })), [ward.attendanceRate]);

  const closePayment = () => {
    setPaymentOpen(false);
    setPaymentComplete(false);
  };

  useEffect(() => {
    if (!paymentOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    paymentDialogRef.current?.querySelector<HTMLElement>('input, button')?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      paymentTriggerRef.current?.focus();
    };
  }, [paymentOpen]);

  const completePayment = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBalances((current) => ({ ...current, [ward.id]: Math.max(0, feeBalance - paymentAmount) }));
    setPaymentComplete(true);
  };

  const sendMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const text = draft.trim();
    if (!text) return;
    const sentMessage: ParentMessage = {
      id: `parent-message-${Date.now()}`,
      from: 'You',
      role: 'Parent / Guardian',
      message: text,
      time: 'Just now',
    };
    setMessagesByWard((current) => ({ ...current, [ward.id]: [...(current[ward.id] ?? ward.messages), sentMessage] }));
    setDraft('');
  };

  return (
    <section aria-label="Parent dashboard" className="space-y-5">
      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-aqua-700 dark:text-aqua-300">Family account</p>
          <h2 className="mt-1 text-lg font-bold text-charcoal-900 dark:text-white">Selected child</h2>
        </div>
        <label className="flex items-center gap-3 text-sm font-semibold text-slate-700 dark:text-slate-200">
          <UserRound className="h-4 w-4 text-aqua-700 dark:text-aqua-300" />
          <span className="sr-only">Select child</span>
          <select aria-label="Select child" value={ward.id} onChange={(event) => setWardId(event.target.value)} className="min-w-56 rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-charcoal-900 focus:border-aqua-600 focus:outline-none focus:ring-2 focus:ring-aqua-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white">
            {PARENT_WARDS.map((item) => <option key={item.id} value={item.id}>{item.name} · {item.form} {item.stream}</option>)}
          </select>
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: 'Attendance', value: `${ward.attendanceRate}%`, helper: 'This term', icon: UserRound, color: 'text-emerald-700 dark:text-emerald-300' },
          { label: 'Fee balance', value: `KES ${feeBalance.toLocaleString()}`, helper: feeBalance === 0 ? 'Account settled' : 'Outstanding this term', icon: CreditCard, color: 'text-amber-700 dark:text-amber-300' },
          { label: 'Term average', value: `${ward.termAverage}%`, helper: 'Current academic term', icon: CheckCircle2, color: 'text-aqua-800 dark:text-aqua-300' },
          { label: 'Class placement', value: `${ward.form} ${ward.stream}`, helper: ward.name, icon: MessageCircle, color: 'text-charcoal-800 dark:text-slate-100' },
        ].map(({ label, value, helper, icon: Icon, color }) => (
          <div key={label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-semibold text-slate-600 dark:text-slate-300">{label}</p>
              <Icon className={`h-4 w-4 ${color}`} />
            </div>
            <p className={`mt-3 text-xl font-black ${color}`}>{value}</p>
            <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">{helper}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900" aria-labelledby="parent-attendance-title">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-600 dark:text-slate-300">{ward.name}</p>
              <h2 id="parent-attendance-title" className="mt-1 text-lg font-bold text-charcoal-900 dark:text-white">Attendance summary</h2>
            </div>
            <span className="text-sm font-black text-emerald-700 dark:text-emerald-300">{ward.attendanceRate}%</span>
          </div>
          <div className="mt-4 h-40 w-full" role="img" aria-label={`Attendance trend for ${ward.name}`}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={selectedTrend} margin={{ top: 6, right: 8, left: 0, bottom: 0 }}>
                <defs><linearGradient id="parentAttendance" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#00BFFF" stopOpacity={0.32} /><stop offset="100%" stopColor="#00BFFF" stopOpacity={0.02} /></linearGradient></defs>
                <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} />
                <Tooltip formatter={(value: number) => [`${value}%`, 'Attendance']} />
                <Area type="monotone" dataKey="rate" stroke="#00A8D6" fill="url(#parentAttendance)" strokeWidth={2.5} isAnimationActive={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900" aria-labelledby="parent-fees-title">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-gold-700 dark:text-gold-300">Term 1 · {ward.form} {ward.stream}</p>
              <h2 id="parent-fees-title" className="mt-1 text-lg font-bold text-charcoal-900 dark:text-white">Fee balance</h2>
            </div>
            <button ref={paymentTriggerRef} type="button" onClick={() => { setPaymentAmount(Math.min(5000, feeBalance)); setPaymentComplete(false); setPaymentOpen(true); }} disabled={feeBalance === 0} className="inline-flex items-center gap-2 rounded-lg bg-aqua-700 px-4 py-2.5 text-xs font-bold text-white hover:bg-aqua-800 disabled:cursor-not-allowed disabled:bg-slate-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aqua-700">
              <CreditCard className="h-4 w-4" /> Pay with M-Pesa
            </button>
          </div>
          <div className="mt-5 rounded-xl bg-slate-50 p-4 dark:bg-slate-800/70">
            <p className="text-xs text-slate-600 dark:text-slate-300">Outstanding amount</p>
            <p className="mt-1 text-3xl font-black text-charcoal-900 dark:text-white">KES {feeBalance.toLocaleString()}</p>
            <p className="mt-2 text-xs text-slate-600 dark:text-slate-300">A simulated payment updates this dashboard only; no M-Pesa request is sent.</p>
          </div>
        </section>
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900" aria-labelledby="parent-messages-title">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-aqua-700 dark:text-aqua-300">{ward.form} {ward.stream}</p>
            <h2 id="parent-messages-title" className="mt-1 text-lg font-bold text-charcoal-900 dark:text-white">Teacher messages</h2>
          </div>
          <MessageCircle className="h-5 w-5 text-aqua-700 dark:text-aqua-300" aria-hidden="true" />
        </div>
        <ol className="space-y-3">
          {messages.map((message) => (
            <li key={message.id} className={`max-w-2xl rounded-xl border p-4 ${message.from === 'You' ? 'ml-auto border-aqua-200 bg-aqua-50 dark:border-aqua-900 dark:bg-aqua-950/30' : 'border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/70'}`}>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="text-xs font-bold text-charcoal-900 dark:text-white">{message.from} <span className="font-normal text-slate-600 dark:text-slate-300">· {message.role}</span></p>
                <time className="text-[10px] text-slate-600 dark:text-slate-300">{message.time}</time>
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-200">{message.message}</p>
            </li>
          ))}
        </ol>
        <form onSubmit={sendMessage} className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end">
          <label className="min-w-0 flex-1 text-xs font-semibold text-slate-700 dark:text-slate-200">
            <span className="mb-1.5 block">Message the teaching team</span>
            <textarea value={draft} onChange={(event) => setDraft(event.target.value)} rows={2} placeholder="Write a message about your child..." className="w-full resize-y rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm font-normal text-charcoal-900 placeholder:text-slate-500 focus:border-aqua-600 focus:outline-none focus:ring-2 focus:ring-aqua-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
          </label>
          <button type="submit" disabled={!draft.trim()} className="inline-flex items-center justify-center gap-2 rounded-lg bg-charcoal-900 px-4 py-3 text-xs font-bold text-white hover:bg-charcoal-800 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-aqua-600">
            <Send className="h-3.5 w-3.5" /> Send message
          </button>
        </form>
      </section>

      {paymentOpen && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-charcoal-950/70 p-4" onMouseDown={(event) => { if (event.target === event.currentTarget) closePayment(); }}>
          <section
            ref={paymentDialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="mpesa-title"
            tabIndex={-1}
            onKeyDown={(event) => {
              if (event.key === 'Escape') {
                event.preventDefault();
                closePayment();
              } else if (event.key === 'Tab') {
                const focusable = paymentDialogRef.current?.querySelectorAll<HTMLElement>('input, button:not([disabled])');
                if (!focusable?.length) return;
                const first = focusable[0];
                const last = focusable[focusable.length - 1];
                if (event.shiftKey && document.activeElement === first) {
                  event.preventDefault();
                  last.focus();
                } else if (!event.shiftKey && document.activeElement === last) {
                  event.preventDefault();
                  first.focus();
                }
              }
            }}
            className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-700 dark:bg-slate-900"
          >
            {paymentComplete ? (
              <div className="py-4 text-center">
                <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-600 dark:text-emerald-300" />
                <h2 id="mpesa-title" className="mt-3 text-xl font-black text-charcoal-900 dark:text-white">Payment simulated</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">KES {paymentAmount.toLocaleString()} recorded for {ward.name}. Remaining balance: KES {(balances[ward.id] ?? ward.feeBalance).toLocaleString()}.</p>
                <button type="button" onClick={closePayment} className="mt-5 rounded-lg bg-aqua-700 px-5 py-2.5 text-sm font-bold text-white hover:bg-aqua-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aqua-700">Done</button>
              </div>
            ) : (
              <form onSubmit={completePayment} className="space-y-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-aqua-700 dark:text-aqua-300">M-Pesa · simulated</p>
                  <h2 id="mpesa-title" className="mt-1 text-xl font-black text-charcoal-900 dark:text-white">Pay school fees</h2>
                </div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200">Phone number
                  <input type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} required className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-charcoal-900 focus:border-aqua-600 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
                </label>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200">Amount (KES)
                  <input type="number" min="1" max={feeBalance} value={paymentAmount} onChange={(event) => setPaymentAmount(Math.max(1, Math.min(feeBalance, Number(event.target.value))))} required className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-charcoal-900 focus:border-aqua-600 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
                </label>
                <p className="text-xs text-slate-600 dark:text-slate-300">Payment is simulated and does not contact a payment provider.</p>
                <div className="flex justify-end gap-2">
                  <button type="button" onClick={closePayment} className="rounded-lg border border-slate-300 px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800">Cancel</button>
                  <button type="submit" disabled={paymentAmount > feeBalance || feeBalance <= 0} className="rounded-lg bg-aqua-700 px-4 py-2.5 text-xs font-bold text-white hover:bg-aqua-800 disabled:opacity-50">Send M-Pesa prompt</button>
                </div>
              </form>
            )}
          </section>
        </div>
      )}
    </section>
  );
}