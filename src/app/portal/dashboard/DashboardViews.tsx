'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Bell,
  BookOpenCheck,
  CalendarDays,
  Check,
  ChevronDown,
  CircleAlert,
  ClipboardCheck,
  CreditCard,
  FileText,
  GraduationCap,
  Home,
  Languages,
  MessageCircle,
  Wallet,
  X,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { auth } from '@/lib/firebase';
import { getDashboardSections, type DashboardView } from './dashboard-view.mjs';

type Language = 'en' | 'sw';

type Application = {
  id: string;
  reference: string;
  applicantName: string;
  status: string;
  submittedAt: string | null;
  reviewNotes: string | null;
  missingDocuments: string[];
  admissionFeeBalance: number | null;
  admissionFeeDueDate: string | null;
};

type Child = { id: string; name: string; className: string };
type Notification = {
  id: string;
  title: string;
  message: string;
  category: string;
  createdAt: string | null;
  read: boolean;
};
type Dashboard = {
  studentId: string;
  fee: {
    balance: number;
    dueDate: string | null;
    admissionNumber: string | null;
    invoices: Array<{ id: string; invoiceNumber: string; term: string; balance: number; dueDate: string | null }>;
    payments: Array<{ id: string; receiptNumber?: string; amount?: number; date?: string; paymentMethod?: string }>;
  };
  academics: { average: number | null; grade: string | null; position: number | null; classSize: number | null };
  attendance: { absentDays: number; recordedDays: number };
  assignments: { pending: number; overdue: number };
  notifications: Notification[];
  unreadMessageCount: number;
  messages: Array<{ id: string; sender: string; text: string; date: string | null }>;
  events: Array<{ id: string; title: string; date: string; category: string; location: string }>;
};

type Payload = {
  role: 'PARENT' | 'APPLICANT';
  applications?: Application[];
  children?: Child[];
  dashboard?: Dashboard | null;
  term?: { label: string; year: number; today: string };
};

const labels = {
  en: {
    portal: 'Parent portal',
    applicantPortal: 'Applicant portal',
    language: 'Kiswahili',
    welcome: 'Welcome back',
    childSwitch: 'Select child',
    feeBalance: 'Fee balance',
    due: 'Due',
    dueDateUnavailable: 'Due date not available.',
    payMpesa: 'Pay via M-Pesa',
    statement: 'View statement',
    notifications: 'Notifications',
    unread: 'unread',
    markRead: 'Mark as read',
    payNow: 'Pay now',
    average: 'Average score',
    position: 'Class position',
    attendance: 'Attendance',
    absent: 'absent days this term',
    assignments: 'Assignments',
    pending: 'pending',
    overdue: 'overdue',
    term: 'Current term',
    events: 'Upcoming events',
    messages: 'Messages',
    overview: 'Overview',
    noNotifications: 'You are all caught up. New school updates will appear here.',
    noEvents: 'There are no upcoming events scheduled.',
    noMessages: 'No messages are available for this child yet.',
    noGrades: 'No scores have been recorded for this term.',
    noAttendance: 'No attendance has been recorded for this term.',
    noAssignments: 'There are no outstanding assignments.',
    noFees: 'No outstanding fee balance.',
    feeUnavailable: 'Fee balance has not been posted.',
    noChildren: 'No linked student record is available. Contact the school office to link your child.',
    loadError: 'We could not load this dashboard.',
    retry: 'Try again',
    applicationStatus: 'Application status',
    application: 'Application',
    progress: 'Application progress',
    missingDocuments: 'Missing documents',
    noMissingDocuments: 'All required documents are on file.',
    admissionFee: 'Admission fee',
    noApplication: 'No application is linked to this account yet.',
    submitted: 'Submitted',
    review: 'Under review',
    decision: 'Decision',
    enrollment: 'Complete enrollment',
    schoolUpdates: 'School updates',
    statementTitle: 'Fee statement',
    noInvoices: 'No invoice details are available.',
    recentPayments: 'Recent payments',
    noPayments: 'No payments have been recorded.',
    paymentInfo: 'M-Pesa payment',
    paymentInstructions: 'Use the school’s official M-Pesa Paybill and enter the student admission number as the account reference. Confirm the current Paybill number with the accounts office before sending money.',
    referenceUnavailable: 'Confirm the required account reference with the finance office.',
    financeOffice: 'Finance inquiries',
    close: 'Close',
    retrying: 'Loading dashboard…',
    errorMarkRead: 'Could not mark this notification as read.',
  },
  sw: {
    portal: 'Tovuti ya Mzazi',
    applicantPortal: 'Tovuti ya Mwombaji',
    language: 'English',
    welcome: 'Karibu tena',
    childSwitch: 'Chagua mwanafunzi',
    feeBalance: 'Salio la karo',
    due: 'Tarehe ya mwisho',
    dueDateUnavailable: 'Tarehe ya mwisho haijapatikana.',
    payMpesa: 'Lipa kwa M-Pesa',
    statement: 'Angalia taarifa ya karo',
    notifications: 'Arifa',
    unread: 'hazijasomwa',
    markRead: 'Weka kuwa imesomwa',
    payNow: 'Lipa sasa',
    average: 'Wastani wa alama',
    position: 'Nafasi darasani',
    attendance: 'Mahudhurio',
    absent: 'siku za kutokuwepo muhula huu',
    assignments: 'Kazi za shule',
    pending: 'inasubiri',
    overdue: 'imechelewa',
    term: 'Muhula wa sasa',
    events: 'Matukio yajayo',
    messages: 'Ujumbe',
    overview: 'Muhtasari',
    noNotifications: 'Hakuna arifa mpya. Taarifa mpya zitaonekana hapa.',
    noEvents: 'Hakuna matukio yajayo yaliyopangwa.',
    noMessages: 'Hakuna ujumbe kwa mwanafunzi huyu kwa sasa.',
    noGrades: 'Hakuna alama zilizorekodiwa muhula huu.',
    noAttendance: 'Hakuna mahudhurio yaliyorekodiwa muhula huu.',
    noAssignments: 'Hakuna kazi zinazosubiri.',
    noFees: 'Hakuna salio la karo.',
    feeUnavailable: 'Salio la karo bado halijachapishwa.',
    noChildren: 'Hakuna mwanafunzi aliyeunganishwa. Wasiliana na ofisi ya shule.',
    loadError: 'Imeshindikana kupakia dashibodi hii.',
    retry: 'Jaribu tena',
    applicationStatus: 'Hali ya ombi',
    application: 'Ombi',
    progress: 'Hatua za ombi',
    missingDocuments: 'Nyaraka zinazokosekana',
    noMissingDocuments: 'Nyaraka zote zinazohitajika zimewasilishwa.',
    admissionFee: 'Ada ya kujiunga',
    noApplication: 'Hakuna ombi lililounganishwa na akaunti hii.',
    submitted: 'Imewasilishwa',
    review: 'Inakaguliwa',
    decision: 'Uamuzi',
    enrollment: 'Kamilisha usajili',
    schoolUpdates: 'Taarifa za shule',
    statementTitle: 'Taarifa ya karo',
    noInvoices: 'Hakuna ankara inayopatikana.',
    recentPayments: 'Malipo ya hivi karibuni',
    noPayments: 'Hakuna malipo yaliyorekodiwa.',
    paymentInfo: 'Malipo ya M-Pesa',
    paymentInstructions: 'Tumia nambari rasmi ya Paybill ya shule na uweke nambari ya usajili wa mwanafunzi kama kumbukumbu ya akaunti. Thibitisha nambari ya Paybill na idara ya fedha kabla ya kutuma pesa.',
    referenceUnavailable: 'Thibitisha kumbukumbu ya akaunti inayohitajika na idara ya fedha.',
    financeOffice: 'Maswali ya fedha',
    close: 'Funga',
    retrying: 'Dashibodi inapakia…',
    errorMarkRead: 'Imeshindikana kuweka arifa kuwa imesomwa.',
  },
} satisfies Record<Language, Record<string, string>>;

function formatDate(value: string | null | undefined, language: Language) {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '—';
  return new Intl.DateTimeFormat(language === 'en' ? 'en-GB' : 'sw-KE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: 'Africa/Nairobi',
  }).format(date);
}

function formatMoney(value: number | null) {
  if (value === null || !Number.isFinite(value)) return '—';
  return new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES', maximumFractionDigits: 0 }).format(value);
}

function localizedApplicationStatus(status: string, language: Language) {
  if (language === 'en') return status;
  const translations: Record<string, string> = {
    Draft: 'Rasimu',
    Submitted: 'Imewasilishwa',
    'Under Review': 'Inakaguliwa',
    Accepted: 'Imekubaliwa',
    Waitlisted: 'Iko kwenye orodha ya kusubiri',
    Rejected: 'Imekataliwa',
    Completed: 'Imekamilika',
  };
  return translations[status] || status;
}

function localizedDocumentName(name: string, language: Language) {
  if (language === 'en') return name;
  const translations: Record<string, string> = {
    'Birth certificate': 'Cheti cha kuzaliwa',
    'KCPE result slip': 'Matokeo ya KCPE',
    'Leaving certificate': 'Cheti cha kuondoka',
  };
  return translations[name] || name;
}

function CardState({
  loading,
  error,
  empty,
  children,
}: {
  loading: boolean;
  error: string | null;
  empty: boolean;
  children: React.ReactNode;
}) {
  if (loading) {
    return <div className="space-y-3" aria-label="Loading card" aria-busy="true"><div className="h-4 w-2/5 animate-pulse rounded bg-slate-200" /><div className="h-8 w-3/5 animate-pulse rounded bg-slate-200" /><div className="h-4 w-full animate-pulse rounded bg-slate-100" /></div>;
  }
  if (error) return <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm font-medium text-red-800">{error}</p>;
  if (empty) return <>{children}</>;
  return <>{children}</>;
}

export function DashboardViews({ view }: { view: DashboardView }) {
  const { currentUser } = useAuth();
  const visibleSections = getDashboardSections(view === 'applicant' ? 'APPLICANT' : view === 'parent' ? 'PARENT' : '');
  const [language, setLanguage] = useState<Language>('en');
  const [payload, setPayload] = useState<Payload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedChildId, setSelectedChildId] = useState('');
  const [statementOpen, setStatementOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [readPending, setReadPending] = useState('');
  const [noticeError, setNoticeError] = useState('');
  const t = labels[language];

  const load = useCallback(async (studentId?: string) => {
    if (!auth?.currentUser) return;
    setLoading(true);
    setError(null);
    try {
      const token = await auth.currentUser.getIdToken();
      const query = studentId ? `?studentId=${encodeURIComponent(studentId)}` : '';
      const response = await fetch(`/api/portal/dashboard${query}`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: 'no-store',
      });
      const result = await response.json() as Payload & { error?: string };
      if (!response.ok) throw new Error(result.error || t.loadError);
      setPayload(result);
      if (result.dashboard?.studentId) setSelectedChildId(result.dashboard.studentId);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : t.loadError);
      setPayload(null);
    } finally {
      setLoading(false);
    }
  }, [t.loadError]);

  useEffect(() => {
    void load();
  }, [load]);

  const selectedChild = payload?.children?.find((child) => child.id === selectedChildId);
  const dashboard = payload?.dashboard;
  const unreadNotifications = dashboard?.notifications.filter((item) => !item.read).length || 0;
  const parentName = currentUser?.displayName || currentUser?.email?.split('@')[0] || 'Parent';
  const welcomeTitle = selectedChild
    ? language === 'en'
      ? `${t.welcome}, ${parentName}. Here's how ${selectedChild.name} is doing.`
      : `${t.welcome}, ${parentName}. Hivi ndivyo ${selectedChild.name} anaendelea.`
    : `${t.welcome}, ${parentName}.`;
  const classPosition = dashboard?.academics.position && dashboard.academics.classSize
    ? `${dashboard.academics.position}/${dashboard.academics.classSize}`
    : '—';

  const markAsRead = async (notification: Notification) => {
    if (!auth?.currentUser || !selectedChildId) return;
    setReadPending(notification.id);
    setNoticeError('');
    try {
      const token = await auth.currentUser.getIdToken();
      const response = await fetch('/api/portal/dashboard', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId: selectedChildId, notificationId: notification.id }),
      });
      const result = await response.json() as { error?: string };
      if (!response.ok) throw new Error(result.error || t.errorMarkRead);
      setPayload((previous) => previous && previous.dashboard ? {
        ...previous,
        dashboard: {
          ...previous.dashboard,
          notifications: previous.dashboard.notifications.map((item) =>
            item.id === notification.id ? { ...item, read: true } : item
          ),
        },
      } : previous);
    } catch (markError) {
      setNoticeError(markError instanceof Error ? markError.message : t.errorMarkRead);
    } finally {
      setReadPending('');
    }
  };

  const navigation = useMemo(() => [
    { label: t.overview, href: '#overview', icon: Home },
    { label: t.messages, href: '#messages', icon: MessageCircle, badge: dashboard?.unreadMessageCount || 0 },
    { label: t.notifications, href: '#notifications', icon: Bell, badge: unreadNotifications },
    { label: t.statement, href: '#fees', icon: FileText },
  ], [dashboard?.unreadMessageCount, t.messages, t.notifications, t.overview, t.statement, unreadNotifications]);

  if (view === 'unsupported') {
    return <main className="mx-auto flex min-h-screen max-w-xl items-center justify-center p-6"><p role="alert" className="rounded-xl border border-red-200 bg-white p-6 text-center font-semibold text-red-800">This dashboard is available to parent and applicant accounts only.</p></main>;
  }

  if (view === 'applicant' && visibleSections.includes('application-status')) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-6 text-slate-900 sm:px-6 sm:py-10">
        <div className="mx-auto max-w-4xl">
          <header className="mb-7 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 text-white"><GraduationCap aria-hidden="true" /></span>
              <div><p className="text-sm font-bold text-slate-900">Kalulini School</p><p className="text-xs font-medium text-slate-600">{t.applicantPortal}</p></div>
            </div>
            <LanguageButton language={language} label={t.language} onClick={() => setLanguage(language === 'en' ? 'sw' : 'en')} />
          </header>
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8" aria-labelledby="application-dashboard-title">
            <div className="mb-6">
              <p className="text-xs font-bold uppercase tracking-wide text-slate-700">{t.applicationStatus}</p>
              <h1 id="application-dashboard-title" className="mt-2 text-2xl font-black sm:text-3xl">{t.welcome}, {currentUser?.displayName || 'Applicant'}.</h1>
              <p className="mt-2 text-sm text-slate-700">{t.progress}</p>
            </div>
            {error ? <ErrorPanel error={error} onRetry={() => void load()} retry={t.retry} /> : loading ? <LoadingPanel label={t.retrying} /> : payload?.applications?.length ? (
              <div className="space-y-5">
                {payload.applications.map((application) => (
                  <article key={application.id} className="rounded-xl border border-slate-200 p-4 sm:p-6">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div><p className="text-xs font-semibold text-slate-600">{t.application} · {application.reference}</p><h2 className="mt-1 text-lg font-bold">{application.applicantName}</h2></div>
                      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-900">{localizedApplicationStatus(application.status, language)}</span>
                    </div>
                    <ol className="mt-6 grid gap-3 sm:grid-cols-4" aria-label={t.progress}>
                      {[t.submitted, t.review, t.decision, t.enrollment].map((step, index) => {
                        const completed = (index === 0 && application.status !== 'Draft') || (index === 1 && ['Under Review', 'Accepted', 'Waitlisted', 'Rejected', 'Completed'].includes(application.status)) || (index === 2 && ['Accepted', 'Waitlisted', 'Rejected', 'Completed'].includes(application.status)) || (index === 3 && application.status === 'Completed');
                        return <li key={step} className={`flex items-center gap-2 rounded-lg border p-3 text-sm font-semibold ${completed ? 'border-emerald-300 bg-emerald-50 text-emerald-900' : 'border-slate-200 bg-white text-slate-700'}`}><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white">{completed ? <Check size={15} aria-label="Complete" /> : index + 1}</span>{step}</li>;
                      })}
                    </ol>
                    {application.reviewNotes && <p className="mt-4 rounded-lg bg-blue-50 p-3 text-sm text-blue-950">{application.reviewNotes}</p>}
                    <div className="mt-5 grid gap-4 sm:grid-cols-2">
                      <section className="rounded-xl bg-slate-50 p-4" aria-labelledby={`missing-${application.id}`}>
                        <h3 id={`missing-${application.id}`} className="font-bold">{t.missingDocuments}</h3>
                        {application.missingDocuments.length ? <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-slate-700">{application.missingDocuments.map((document) => <li key={document}>{localizedDocumentName(document, language)}</li>)}</ul> : <p className="mt-2 text-sm text-slate-700">{t.noMissingDocuments}</p>}
                      </section>
                      <section className="rounded-xl bg-slate-50 p-4" aria-labelledby={`admission-${application.id}`}>
                        <h3 id={`admission-${application.id}`} className="font-bold">{t.admissionFee}</h3>
                        <p className="mt-2 text-xl font-black">{formatMoney(application.admissionFeeBalance)}</p>
                        {application.admissionFeeBalance === null && <p className="mt-1 text-sm text-slate-700">{t.feeUnavailable}</p>}
                        {application.admissionFeeDueDate && <p className="mt-1 text-sm text-slate-700">{t.due}: {formatDate(application.admissionFeeDueDate, language)}</p>}
                      </section>
                    </div>
                  </article>
                ))}
              </div>
            ) : <p className="rounded-xl border border-dashed border-slate-300 p-6 text-sm text-slate-700">{t.noApplication}</p>}
          </section>
        </div>
      </main>
    );
  }

  return (
    <main id="overview" className="min-h-screen bg-slate-50 pb-24 text-slate-900 sm:pb-8">
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 sm:py-8 lg:px-8">
        <header className="mb-6 flex flex-col gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 text-white"><GraduationCap aria-hidden="true" /></span>
            <div><p className="text-sm font-bold text-slate-900">Kalulini School</p><p className="text-xs font-medium text-slate-600">{t.portal}</p></div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {payload?.children && payload.children.length > 0 && (
              <label className="flex min-w-0 items-center gap-2 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-800">
                <span className="sr-only">{t.childSwitch}</span>
                <GraduationCap size={18} aria-hidden="true" />
                <select value={selectedChildId} onChange={(event) => { setSelectedChildId(event.target.value); void load(event.target.value); }} className="max-w-[210px] min-w-0 bg-transparent outline-none focus-visible:ring-2 focus-visible:ring-blue-700" aria-label={t.childSwitch}>
                  {payload.children.map((child) => <option key={child.id} value={child.id}>{child.name}, {child.className}</option>)}
                </select>
                <ChevronDown size={15} aria-hidden="true" />
              </label>
            )}
            <LanguageButton language={language} label={t.language} onClick={() => setLanguage(language === 'en' ? 'sw' : 'en')} />
          </div>
          <div className="w-full sm:hidden">
            <p className="text-xs font-semibold text-slate-700">{selectedChild?.className || t.portal}</p>
            <h1 className="mt-1 text-xl font-black leading-tight">{welcomeTitle}</h1>
          </div>
          <div className="hidden sm:block sm:max-w-2xl sm:text-right">
            <p className="text-xs font-semibold text-slate-700">{selectedChild?.className || t.portal}</p>
            <h1 className="mt-1 text-2xl font-black leading-tight">{welcomeTitle}</h1>
          </div>
        </header>

        <nav aria-label="Dashboard sections" className="mb-5 hidden flex-wrap gap-5 border-b border-slate-200 pb-3 text-sm font-semibold text-slate-700 sm:flex">
          {navigation.map(({ label, href, icon: Icon, badge }) => <a key={href} href={href} className="inline-flex items-center gap-2 rounded-md py-2 hover:text-slate-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-800"><Icon size={17} aria-hidden="true" />{label}{badge ? <span className="rounded-full bg-red-800 px-1.5 text-xs text-white">{badge}</span> : null}</a>)}
        </nav>

        {!loading && !error && !payload?.children?.length ? <p role="status" className="mb-5 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm font-medium text-amber-950">{t.noChildren}</p> : null}
        {error && <ErrorPanel error={error} onRetry={() => void load(selectedChildId || undefined)} retry={t.retry} />}

        <div className="grid items-start gap-4 lg:grid-cols-[1.05fr,0.95fr]">
          <section id="fees" className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6" aria-labelledby="fee-card-title">
            <CardState loading={loading} error={error} empty={!dashboard}>
              {dashboard ? (
                <>
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div><p className="text-xs font-bold uppercase tracking-wide text-slate-700">{payload?.term?.label || t.term}</p><h2 id="fee-card-title" className="mt-1 text-lg font-bold">{t.feeBalance}</h2></div>
                    <Wallet className="text-slate-700" aria-hidden="true" />
                  </div>
                  <p className="mt-5 text-3xl font-black tracking-tight">{formatMoney(dashboard.fee.balance)}</p>
                  <p className="mt-1 text-sm text-slate-700">{dashboard.fee.dueDate ? `${t.due}: ${formatDate(dashboard.fee.dueDate, language)}` : dashboard.fee.balance === null ? t.feeUnavailable : dashboard.fee.balance > 0 ? t.dueDateUnavailable : t.noFees}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <button type="button" onClick={() => setPaymentOpen(true)} disabled={dashboard.fee.balance === null || dashboard.fee.balance <= 0} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-blue-800 px-4 py-2.5 text-sm font-bold text-white hover:bg-blue-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800 disabled:cursor-not-allowed disabled:bg-slate-400"><CreditCard size={17} aria-hidden="true" />{t.payMpesa}</button>
                    <button type="button" onClick={() => setStatementOpen(true)} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-slate-400 bg-white px-4 py-2.5 text-sm font-bold text-slate-900 hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800"><FileText size={17} aria-hidden="true" />{t.statement}</button>
                  </div>
                </>
              ) : <p className="text-sm text-slate-700">{t.noChildren}</p>}
            </CardState>
          </section>

          <section id="notifications" className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6" aria-labelledby="notifications-title">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div><h2 id="notifications-title" className="text-lg font-bold">{t.notifications}</h2><p className="text-sm font-medium text-slate-700">{unreadNotifications} {t.unread}</p></div>
              <Bell className="text-slate-700" aria-hidden="true" />
            </div>
            <CardState loading={loading} error={error} empty={!dashboard?.notifications.length}>
              {dashboard?.notifications.length ? <ul className="space-y-3">
                {dashboard.notifications.slice(0, 4).map((notification) => {
                  const isFee = /fee|payment|balance/i.test(`${notification.title} ${notification.category}`);
                  return <li key={notification.id} className={`rounded-xl border p-3 ${notification.read ? 'border-slate-200 bg-white' : 'border-blue-200 bg-blue-50/70'}`}>
                    <div className="flex items-start justify-between gap-3"><div><p className="text-sm font-bold text-slate-900">{notification.title}</p><p className="mt-1 text-sm leading-5 text-slate-700">{notification.message}</p></div>{!notification.read && <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-blue-800" aria-label={t.unread} />}</div>
                    <div className="mt-3 flex flex-wrap items-center gap-3">
                      {isFee && <><button type="button" onClick={() => setPaymentOpen(true)} className="text-xs font-bold text-blue-900 underline underline-offset-2">{t.payNow}</button><button type="button" onClick={() => setStatementOpen(true)} className="text-xs font-bold text-blue-900 underline underline-offset-2">{t.statement}</button></>}
                      {!notification.read && <button type="button" onClick={() => void markAsRead(notification)} disabled={readPending === notification.id} className="text-xs font-semibold text-slate-800 underline underline-offset-2 disabled:opacity-60">{readPending === notification.id ? t.retrying : t.markRead}</button>}
                      {notification.createdAt && <time className="ml-auto text-xs font-medium text-slate-600">{formatDate(notification.createdAt, language)}</time>}
                    </div>
                  </li>;
                })}
              </ul> : <p className="rounded-lg bg-slate-50 p-3 text-sm text-slate-700">{t.noNotifications}</p>}
            </CardState>
            {noticeError && <p role="alert" className="mt-3 text-sm font-semibold text-red-800">{noticeError}</p>}
          </section>
        </div>

        <section className="mt-4 grid gap-4 sm:grid-cols-3" aria-label={t.term}>
          <MetricCard title={t.average} icon={<BookOpenCheck size={18} aria-hidden="true" />} loading={loading} error={error} empty={dashboard?.academics.average == null} emptyText={t.noGrades}>
            {dashboard?.academics.average !== null && dashboard?.academics.average !== undefined && <><p className="text-2xl font-black">{dashboard.academics.grade} · {classPosition}</p><p className="mt-1 text-sm font-medium text-slate-700">{dashboard.academics.average.toFixed(1)}% · {t.position}</p></>}
          </MetricCard>
          <MetricCard title={t.attendance} icon={<ClipboardCheck size={18} aria-hidden="true" />} loading={loading} error={error} empty={!dashboard?.attendance.recordedDays} emptyText={t.noAttendance}>
            {dashboard && <><p className="text-2xl font-black">{dashboard.attendance.absentDays}</p><p className="mt-1 text-sm font-medium text-slate-700">{t.absent}</p></>}
          </MetricCard>
          <MetricCard title={t.assignments} icon={<BookOpenCheck size={18} aria-hidden="true" />} loading={loading} error={error} empty={!dashboard?.assignments.pending} emptyText={t.noAssignments}>
            {dashboard && <div className="flex items-end gap-4"><p className="text-2xl font-black">{dashboard.assignments.pending} <span className="text-sm font-semibold text-slate-700">{t.pending}</span></p><p className="pb-1 text-sm font-semibold text-red-800">{dashboard.assignments.overdue} {t.overdue}</p></div>}
          </MetricCard>
        </section>

        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <section id="events" className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6" aria-labelledby="events-title">
            <h2 id="events-title" className="mb-4 flex items-center gap-2 text-lg font-bold"><CalendarDays size={19} aria-hidden="true" />{t.events}</h2>
            <CardState loading={loading} error={error} empty={!dashboard?.events.length}>
              {dashboard?.events.length ? <ul className="divide-y divide-slate-200">{dashboard.events.map((event) => <li key={event.id} className="flex flex-wrap justify-between gap-2 py-3 first:pt-0"><div><p className="font-semibold">{event.title}</p><p className="mt-1 text-sm text-slate-700">{[event.category, event.location].filter(Boolean).join(' · ')}</p></div><time className="text-sm font-semibold text-slate-700">{formatDate(event.date, language)}</time></li>)}</ul> : <p className="rounded-lg bg-slate-50 p-3 text-sm text-slate-700">{t.noEvents}</p>}
            </CardState>
          </section>
          <section id="messages" className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6" aria-labelledby="messages-title">
            <h2 id="messages-title" className="mb-4 flex items-center gap-2 text-lg font-bold"><MessageCircle size={19} aria-hidden="true" />{t.messages}{dashboard?.unreadMessageCount ? <span className="rounded-full bg-blue-800 px-2 py-0.5 text-xs text-white">{dashboard.unreadMessageCount}</span> : null}</h2>
            <CardState loading={loading} error={error} empty={!dashboard?.messages.length}>
              {dashboard?.messages.length ? <ul className="space-y-3">{dashboard.messages.map((message) => <li key={message.id} className="rounded-lg bg-slate-50 p-3"><div className="flex justify-between gap-3"><p className="text-sm font-bold">{message.sender}</p>{message.date && <time className="text-xs text-slate-600">{formatDate(message.date, language)}</time>}</div><p className="mt-1 text-sm leading-5 text-slate-700">{message.text}</p></li>)}</ul> : <p className="rounded-lg bg-slate-50 p-3 text-sm text-slate-700">{t.noMessages}</p>}
            </CardState>
          </section>
        </div>
        <p className="mt-4 text-xs font-medium text-slate-700">{t.term}: {payload?.term?.label || '—'}{payload?.term?.year ? ` ${payload.term.year}` : ''}</p>
      </div>

      <nav aria-label="Dashboard navigation" className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-300 bg-white px-1 pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_12px_rgba(15,23,42,0.08)] sm:hidden">
        <ul className="mx-auto grid max-w-lg grid-cols-4">
          {navigation.map(({ label, href, icon: Icon, badge }) => <li key={href}><a href={href} className="relative flex min-h-14 flex-col items-center justify-center gap-1 px-1 text-[11px] font-semibold text-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-800"><Icon size={19} aria-hidden="true" /><span className="max-w-full truncate">{label}</span>{badge ? <span className="absolute right-2 top-1 min-w-4 rounded-full bg-red-800 px-1 text-center text-[10px] leading-4 text-white">{badge > 99 ? '99+' : badge}</span> : null}</a></li>)}
        </ul>
      </nav>
      {(statementOpen || paymentOpen) && dashboard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) { setStatementOpen(false); setPaymentOpen(false); } }}>
          <section role="dialog" aria-modal="true" aria-labelledby="dashboard-dialog-title" className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl sm:p-6">
            <div className="flex items-start justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-wide text-slate-700">{paymentOpen ? t.paymentInfo : t.statementTitle}</p><h2 id="dashboard-dialog-title" className="mt-1 text-xl font-black">{paymentOpen ? t.payMpesa : t.statementTitle}</h2></div><button type="button" onClick={() => { setStatementOpen(false); setPaymentOpen(false); }} aria-label={t.close} className="rounded-lg p-2 text-slate-700 hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-800"><X size={19} /></button></div>
            {paymentOpen ? <div className="mt-5 space-y-4"><div className="rounded-xl bg-slate-50 p-4"><p className="text-sm font-semibold text-slate-700">{t.feeBalance}</p><p className="mt-1 text-2xl font-black">{formatMoney(dashboard.fee.balance)}</p><p className="mt-1 text-sm text-slate-700">Account reference: {dashboard.fee.admissionNumber || t.referenceUnavailable}</p></div><p className="text-sm leading-6 text-slate-800">{t.paymentInstructions}</p><a href="tel:+254700888999" className="inline-flex min-h-11 items-center rounded-lg bg-blue-800 px-4 py-2 text-sm font-bold text-white hover:bg-blue-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800">{t.financeOffice}: +254 700 888 999</a></div> : <div className="mt-5 space-y-6">
              <section><h3 className="font-bold">{t.feeBalance}: {formatMoney(dashboard.fee.balance)}</h3><p className="mt-1 text-sm text-slate-700">{dashboard.fee.dueDate ? `${t.due}: ${formatDate(dashboard.fee.dueDate, language)}` : ''}</p><h4 className="mt-4 text-sm font-bold">{t.statementTitle}</h4>{dashboard.fee.invoices.length ? <ul className="mt-2 divide-y divide-slate-200">{dashboard.fee.invoices.map((invoice) => <li key={invoice.id} className="flex justify-between gap-3 py-2 text-sm"><span>{invoice.invoiceNumber} · {invoice.term} · {invoice.dueDate ? formatDate(invoice.dueDate, language) : '—'}</span><strong>{formatMoney(invoice.balance)}</strong></li>)}</ul> : <p className="mt-2 text-sm text-slate-700">{t.noInvoices}</p>}</section>
              <section><h3 className="font-bold">{t.recentPayments}</h3>{dashboard.fee.payments.length ? <ul className="mt-2 divide-y divide-slate-200">{dashboard.fee.payments.map((payment) => <li key={payment.id} className="flex justify-between gap-3 py-2 text-sm"><span>{payment.receiptNumber || payment.paymentMethod || payment.id} · {payment.date ? formatDate(payment.date, language) : '—'}</span><strong>{formatMoney(Number(payment.amount || 0))}</strong></li>)}</ul> : <p className="mt-2 text-sm text-slate-700">{t.noPayments}</p>}</section>
            </div>}
          </section>
        </div>
      )}
    </main>
  );
}

function LanguageButton({ language, label, onClick }: { language: Language; label: string; onClick: () => void }) {
  return <button type="button" onClick={onClick} lang={language === 'sw' ? 'en' : 'sw'} className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-800"><Languages size={17} aria-hidden="true" />{label}</button>;
}

function ErrorPanel({ error, onRetry, retry }: { error: string; onRetry: () => void; retry: string }) {
  return <div role="alert" className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-950"><span className="flex items-center gap-2 font-semibold"><CircleAlert size={18} aria-hidden="true" />{error}</span><button type="button" onClick={onRetry} className="rounded-lg border border-red-400 px-3 py-2 font-bold hover:bg-red-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-800">{retry}</button></div>;
}

function LoadingPanel({ label }: { label: string }) {
  return <div role="status" aria-live="polite" className="space-y-4"><div className="h-5 w-1/3 animate-pulse rounded bg-slate-200" /><div className="h-24 animate-pulse rounded-xl bg-slate-100" /><p className="sr-only">{label}</p></div>;
}

function MetricCard({
  title,
  icon,
  loading,
  error,
  empty,
  emptyText,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  loading: boolean;
  error: string | null;
  empty: boolean;
  emptyText: string;
  children: React.ReactNode;
}) {
  return <section className="min-h-36 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm" aria-label={title}>
    <div className="mb-4 flex items-center justify-between gap-3"><h2 className="text-sm font-bold text-slate-800">{title}</h2><span className="text-slate-700">{icon}</span></div>
    <CardState loading={loading} error={error} empty={empty}>{empty ? <p className="text-sm text-slate-700">{emptyText}</p> : children}</CardState>
  </section>;
}
