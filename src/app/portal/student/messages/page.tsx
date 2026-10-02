'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { PortalLayout } from '@/components/portal/PortalLayout';
import { RouteGuard } from '@/components/portal/RouteGuard';
import { Mail, Send, PencilLine, X, CheckDouble, CircleDot } from 'lucide-react';

const inbox = [
  { id: 1, sender: 'Class Teacher', subject: 'Revision reminder', preview: 'Your Physics revision plan is due before Friday.', time: '09:12 AM', unread: true },
  { id: 2, sender: 'Principal', subject: 'Assembly schedule', preview: 'The school assembly is moved to the main hall.', time: 'Yesterday', unread: true },
  { id: 3, sender: 'Accounts Office', subject: 'Fee statement update', preview: 'Your fee profile has been reconciled and verified.', time: 'Mon', unread: false },
  { id: 4, sender: 'Dean of Studies', subject: 'CAT results uploaded', preview: 'Your Chemistry CAT mark is now available online.', time: 'Sun', unread: false }
];

const sent = [
  { id: 5, sender: 'You', subject: 'Request for extra math session', preview: 'Kindly confirm a make-up session for Friday.', time: '08:10 AM' },
  { id: 6, sender: 'You', subject: 'Parent reminder', preview: 'I will be attending the science fair this weekend.', time: 'Yesterday' }
];

export default function StudentMessagesPage() {
  const [tab, setTab] = useState<'inbox' | 'sent'>('inbox');
  const [isComposeOpen, setComposeOpen] = useState(false);
  const [messages, setMessages] = useState(inbox);

  const currentMessages = useMemo(() => (tab === 'inbox' ? messages : sent), [messages, tab]);

  const markAsRead = (id: number) => {
    setMessages((prev) => prev.map((item) => item.id === id ? { ...item, unread: false } : item));
  };

  return (
    <RouteGuard>
      <PortalLayout title="Messages" subtitle="Stay updated with notices, teacher communication, and school correspondence.">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex gap-2">
              <button type="button" onClick={() => setTab('inbox')} className={`rounded-xl px-4 py-2 text-sm font-bold ${tab === 'inbox' ? 'bg-aqua-600 text-white' : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200'}`}>
                Inbox
              </button>
              <button type="button" onClick={() => setTab('sent')} className={`rounded-xl px-4 py-2 text-sm font-bold ${tab === 'sent' ? 'bg-aqua-600 text-white' : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200'}`}>
                Sent
              </button>
            </div>

            <button type="button" onClick={() => setComposeOpen(true)} className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100">
              <PencilLine className="h-4 w-4" /> Compose
            </button>
          </div>

          <div className="space-y-3">
            {currentMessages.map((message) => (
              <div key={message.id} className={`flex cursor-pointer items-start justify-between gap-4 rounded-xl border p-4 transition hover:border-aqua-500 hover:bg-aqua-50/40 dark:hover:bg-slate-800/60 ${message.unread ? 'border-aqua-200 bg-aqua-50/60 dark:border-aqua-900 dark:bg-aqua-500/5' : 'border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/50'}`} onClick={() => tab === 'inbox' && message.unread && markAsRead(message.id)}>
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-aqua-700 shadow-sm dark:bg-slate-900 dark:text-aqua-300">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-bold text-slate-900 dark:text-white">{message.sender}</p>
                      {message.unread && tab === 'inbox' && <CircleDot className="h-2.5 w-2.5 fill-rose-500 text-rose-500" />}
                    </div>
                    <p className="mt-1 text-sm font-semibold text-slate-700 dark:text-slate-200">{message.subject}</p>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{message.preview}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                  <span>{message.time}</span>
                  {tab === 'inbox' && message.unread && (
                    <button type="button" onClick={() => markAsRead(message.id)} className="inline-flex items-center gap-1 rounded-lg bg-emerald-100 px-2 py-1 font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                      <CheckDouble className="h-3 w-3" /> Read
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <AnimatePresence>
          {isComposeOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4">
              <motion.div initial={{ y: 18, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 18, opacity: 0 }} transition={{ duration: 0.2 }} className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-700 dark:bg-slate-900">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-aqua-600">New message</p>
                    <h3 className="mt-1 text-xl font-black text-slate-900 dark:text-white">Compose note</h3>
                  </div>
                  <button type="button" onClick={() => setComposeOpen(false)} className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 transition hover:border-slate-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="space-y-4">
                  <label className="block space-y-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
                    <span>To</span>
                    <input defaultValue="Dean of Studies" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition focus:border-aqua-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
                  </label>

                  <label className="block space-y-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
                    <span>Subject</span>
                    <input defaultValue="Request for additional guidance" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition focus:border-aqua-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
                  </label>

                  <label className="block space-y-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
                    <span>Message</span>
                    <textarea rows={5} defaultValue="Dear Madam, I would appreciate additional time on the upcoming revision plan for Chemistry and Mathematics. Thank you." className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition focus:border-aqua-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
                  </label>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                  <button type="button" onClick={() => setComposeOpen(false)} className="rounded-xl border border-slate-200 bg-slate-100 px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">Cancel</button>
                  <button type="button" onClick={() => setComposeOpen(false)} className="inline-flex items-center gap-2 rounded-xl bg-aqua-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-aqua-500">
                    <Send className="h-4 w-4" /> Send
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </PortalLayout>
    </RouteGuard>
  );
}
