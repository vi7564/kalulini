'use client';

import { useCallback, useEffect, useState } from 'react';
import { AlertCircle, BadgeCheck, BriefcaseBusiness, RefreshCw, ShieldCheck, UserRound, UserX } from 'lucide-react';
import { PortalLayout } from '@/components/portal/PortalLayout';
import { useAuth } from '@/context/AuthContext';
import { useNotification } from '@/context/NotificationContext';
import { auth } from '@/lib/firebase';
import type { UserRole } from '@/types';

type ManagedUser = {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole | null;
  requestedRole: UserRole | null;
  status: 'pending' | 'active' | 'suspended' | 'rejected';
  requestStatus: string | null;
  requestCreatedAt: string | null;
  studentId: string | null;
  teacherId: string | null;
};

type StudentOption = { id: string; firstName: string; lastName: string; admissionNumber: string; form: string; stream: string };
type TeacherOption = { id: string; firstName: string; lastName: string; staffNumber: string; assignedClasses: string[] };
type Assignment = { role: UserRole; studentId: string; teacherId: string };
type AccessResponse = { users: ManagedUser[]; students: StudentOption[]; teachers: TeacherOption[]; error?: string };

const roleOptions: Array<{ value: UserRole; label: string }> = [
  { value: 'APPLICANT', label: 'Applicant' },
  { value: 'STUDENT', label: 'Student' },
  { value: 'PARENT', label: 'Parent / Guardian' },
  { value: 'TEACHER', label: 'Teacher' },
  { value: 'STAFF', label: 'Staff' },
  { value: 'PRINCIPAL', label: 'Principal' },
  { value: 'ADMIN', label: 'Administrator' },
  { value: 'SUPER_ADMIN', label: 'Super Admin' },
];

function selectedRole(user: ManagedUser): UserRole {
  if (user.role && roleOptions.some((option) => option.value === user.role)) return user.role;
  if (user.requestedRole && roleOptions.some((option) => option.value === user.requestedRole)) return user.requestedRole;
  return 'APPLICANT';
}

function statusLabel(status: ManagedUser['status']) {
  if (status === 'active') return 'Active';
  if (status === 'pending') return 'Pending approval';
  if (status === 'suspended') return 'Deactivated';
  return 'Rejected';
}

export default function AdminRoleRequestsPage() {
  const { currentUser } = useAuth();
  const { showToast } = useNotification();
  const [users, setUsers] = useState<ManagedUser[]>([]);
  const [students, setStudents] = useState<StudentOption[]>([]);
  const [teachers, setTeachers] = useState<TeacherOption[]>([]);
  const [assignments, setAssignments] = useState<Record<string, Assignment>>({});
  const [loading, setLoading] = useState(true);
  const [activeUid, setActiveUid] = useState<string | null>(null);
  const [pageError, setPageError] = useState<string | null>(null);
  const canManage = currentUser?.role === 'ADMIN' || currentUser?.role === 'SUPER_ADMIN';
  const isSuperAdmin = currentUser?.role === 'SUPER_ADMIN';

  const loadAccounts = useCallback(async () => {
    if (!auth?.currentUser) {
      setPageError('Sign in with an administrator account.');
      setLoading(false);
      return;
    }
    setLoading(true);
    setPageError(null);
    try {
      const token = await auth.currentUser.getIdToken();
      const response = await fetch('/api/admin/users', {
        headers: { Authorization: `Bearer ${token}` },
        cache: 'no-store',
      });
      const result = await response.json() as AccessResponse;
      if (!response.ok) throw new Error(result.error || 'Unable to load account access records.');
      setUsers(result.users);
      setStudents(result.students);
      setTeachers(result.teachers);
      setAssignments((previous) => {
        const next = { ...previous };
        for (const user of result.users) {
          next[user.uid] ||= {
            role: selectedRole(user),
            studentId: user.studentId || '',
            teacherId: user.teacherId || '',
          };
        }
        return next;
      });
    } catch (error) {
      setPageError(error instanceof Error ? error.message : 'Unable to load account access records.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadAccounts();
  }, [loadAccounts]);

  const updateAssignment = (uid: string, updates: Partial<Assignment>, user: ManagedUser) => {
    setAssignments((previous) => ({
      ...previous,
      [uid]: { ...(previous[uid] || { role: selectedRole(user), studentId: '', teacherId: '' }), ...updates },
    }));
  };

  const runAction = async (user: ManagedUser, action: 'approve' | 'reject' | 'deactivate' | 'activate' | 'set-role') => {
    if (!auth?.currentUser) {
      showToast('error', 'Sign in required', 'Sign in with an active administrator account and try again.');
      return;
    }
    const assignment = assignments[user.uid] || { role: selectedRole(user), studentId: '', teacherId: '' };
    if ((action === 'approve' || action === 'set-role') && ['STUDENT', 'PARENT'].includes(assignment.role) && !assignment.studentId) {
      showToast('warning', 'Student link required', 'Select the verified student record before assigning this role.');
      return;
    }
    if ((action === 'approve' || action === 'set-role') && assignment.role === 'TEACHER' && !assignment.teacherId) {
      showToast('warning', 'Teacher link required', 'Select the verified teacher record before assigning this role.');
      return;
    }

    setActiveUid(user.uid);
    try {
      const token = await auth.currentUser.getIdToken();
      const response = await fetch(`/api/admin/users/${encodeURIComponent(user.uid)}`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action,
          role: assignment.role,
          studentId: assignment.studentId,
          teacherId: assignment.teacherId,
        }),
      });
      const result = await response.json() as { error?: string };
      if (!response.ok) throw new Error(result.error || 'Unable to update this account.');
      showToast('success', 'Account updated', `${user.displayName} is now ${action === 'reject' ? 'rejected' : action === 'deactivate' ? 'deactivated' : action === 'activate' ? 'active' : assignment.role}.`);
      await loadAccounts();
    } catch (error) {
      showToast('error', 'Account update failed', error instanceof Error ? error.message : 'Please try again.');
    } finally {
      setActiveUid(null);
    }
  };

  const pendingUsers = users.filter((user) => user.status === 'pending' && user.requestStatus === 'pending');
  const managedUsers = users.filter((user) => user.status !== 'pending');

  const rolePicker = (user: ManagedUser) => {
    const assignment = assignments[user.uid] || { role: selectedRole(user), studentId: '', teacherId: '' };
    const elevatedLocked = !isSuperAdmin;
    return (
      <div className="grid gap-2 sm:grid-cols-2">
        <label className="text-xs font-semibold text-slate-700">
          Assign role
          <select
            value={assignment.role}
            onChange={(event) => updateAssignment(user.uid, { role: event.target.value as UserRole }, user)}
            disabled={!canManage || activeUid === user.uid}
            className="mt-1 min-h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 disabled:opacity-60"
          >
            {roleOptions.filter((option) => !elevatedLocked || !['SUPER_ADMIN', 'ADMIN', 'PRINCIPAL'].includes(option.value)).map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </label>
        {['STUDENT', 'PARENT'].includes(assignment.role) && (
          <label className="text-xs font-semibold text-slate-700">
            Verified student link
            <select
              value={assignment.studentId}
              onChange={(event) => updateAssignment(user.uid, { studentId: event.target.value }, user)}
              disabled={!canManage || activeUid === user.uid}
              className="mt-1 min-h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 disabled:opacity-60"
            >
              <option value="">Select student…</option>
              {students.map((student) => <option key={student.id} value={student.id}>{student.firstName} {student.lastName} — {student.admissionNumber} ({student.form} {student.stream})</option>)}
            </select>
          </label>
        )}
        {assignment.role === 'TEACHER' && (
          <label className="text-xs font-semibold text-slate-700">
            Verified teacher record
            <select
              value={assignment.teacherId}
              onChange={(event) => updateAssignment(user.uid, { teacherId: event.target.value }, user)}
              disabled={!canManage || activeUid === user.uid}
              className="mt-1 min-h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 disabled:opacity-60"
            >
              <option value="">Select teacher…</option>
              {teachers.map((teacher) => <option key={teacher.id} value={teacher.id}>{teacher.firstName} {teacher.lastName} — {teacher.staffNumber}</option>)}
            </select>
          </label>
        )}
      </div>
    );
  };

  return (
    <PortalLayout
      title="Account access management"
      subtitle="Review requests, approve and activate accounts, assign roles, and manage existing access."
    >
      <section className="mb-6 grid gap-3 sm:grid-cols-3" aria-label="Account summary">
        <Summary label="Pending requests" value={pendingUsers.length} />
        <Summary label="Active accounts" value={users.filter((user) => user.status === 'active').length} />
        <Summary label="Deactivated accounts" value={users.filter((user) => user.status === 'suspended').length} />
      </section>

      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div>
          <p className="text-sm font-bold text-slate-900 dark:text-white">Access requests and accounts</p>
          <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">Only active administrators can approve or change access.</p>
        </div>
        <button type="button" onClick={() => void loadAccounts()} disabled={loading} className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50 disabled:opacity-50">
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} /> Refresh
        </button>
      </div>

      {pageError && <div role="alert" className="mb-5 flex items-start gap-3 rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-900"><AlertCircle className="mt-0.5 h-5 w-5 shrink-0" /><div><p className="font-semibold">Unable to load account records</p><p className="mt-1">{pageError}</p></div></div>}

      {loading ? <div role="status" className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-700">Loading account records…</div> : (
        <>
          <section aria-labelledby="pending-users-title">
            <h2 id="pending-users-title" className="mb-3 flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white"><BadgeCheck size={19} aria-hidden="true" /> Pending approval</h2>
            {pendingUsers.length === 0 ? (
              <div className="mb-7 rounded-2xl border border-dashed border-slate-300 bg-white p-7 text-center dark:border-slate-700 dark:bg-slate-900">
                <BadgeCheck className="mx-auto h-8 w-8 text-emerald-700" />
                <p className="mt-2 font-semibold text-slate-900 dark:text-white">No pending access requests</p>
              </div>
            ) : (
              <div className="mb-7 space-y-4">
                {pendingUsers.map((user) => <article key={user.uid} className="rounded-2xl border border-amber-300 bg-white p-4 shadow-sm sm:p-5 dark:border-amber-900 dark:bg-slate-900">
                  <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex min-w-0 items-start gap-3"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-900"><UserRound size={19} /></span><div className="min-w-0"><h3 className="truncate font-bold text-slate-900 dark:text-white">{user.displayName}</h3><p className="break-all text-sm text-slate-700 dark:text-slate-300">{user.email}</p><p className="mt-1 text-xs text-slate-600">Requested: {user.requestedRole || 'Not specified'} · UID {user.uid}</p></div></div>
                    <span className="w-fit rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-950">{statusLabel(user.status)}</span>
                  </div>
                  {rolePicker(user)}
                  <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                    <button type="button" onClick={() => void runAction(user, 'approve')} disabled={!canManage || activeUid === user.uid} className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-lg bg-emerald-800 px-4 py-2 text-sm font-bold text-white hover:bg-emerald-900 disabled:opacity-50"><ShieldCheck size={17} />{activeUid === user.uid ? 'Updating…' : 'Approve and activate'}</button>
                    <button type="button" onClick={() => void runAction(user, 'reject')} disabled={!canManage || activeUid === user.uid} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-red-300 px-4 py-2 text-sm font-bold text-red-900 hover:bg-red-50 disabled:opacity-50"><UserX size={17} />Reject request</button>
                  </div>
                </article>)}
              </div>
            )}
          </section>

          <section aria-labelledby="managed-users-title">
            <h2 id="managed-users-title" className="mb-3 flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white"><BriefcaseBusiness size={19} aria-hidden="true" /> Existing accounts</h2>
            {managedUsers.length === 0 ? <p className="rounded-xl border border-slate-200 bg-white p-5 text-sm text-slate-700">No activated or previously reviewed accounts are listed.</p> : <div className="space-y-3">
              {managedUsers.map((user) => <article key={user.uid} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5 dark:border-slate-800 dark:bg-slate-900">
                <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0"><h3 className="truncate font-bold text-slate-900 dark:text-white">{user.displayName}</h3><p className="break-all text-sm text-slate-700 dark:text-slate-300">{user.email}</p><p className="mt-1 text-xs text-slate-600 dark:text-slate-400">Current role: {user.role || 'None'} · UID {user.uid}</p></div>
                  <span className={`w-fit rounded-full px-3 py-1 text-xs font-bold ${user.status === 'active' ? 'bg-emerald-100 text-emerald-900' : user.status === 'suspended' ? 'bg-slate-200 text-slate-900' : 'bg-red-100 text-red-900'}`}>{statusLabel(user.status)}</span>
                </div>
                {user.status !== 'rejected' && rolePicker(user)}
                <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                  {user.status === 'active' && <button type="button" onClick={() => void runAction(user, 'set-role')} disabled={!canManage || activeUid === user.uid} className="min-h-10 flex-1 rounded-lg border border-blue-300 px-4 py-2 text-sm font-bold text-blue-900 hover:bg-blue-50 disabled:opacity-50">Save role changes</button>}
                  {user.status === 'active' && <button type="button" onClick={() => void runAction(user, 'deactivate')} disabled={!canManage || activeUid === user.uid} className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-red-300 px-4 py-2 text-sm font-bold text-red-900 hover:bg-red-50 disabled:opacity-50"><UserX size={16} />Deactivate account</button>}
                  {user.status === 'suspended' && <button type="button" onClick={() => void runAction(user, 'activate')} disabled={!canManage || activeUid === user.uid} className="min-h-10 flex-1 rounded-lg bg-emerald-800 px-4 py-2 text-sm font-bold text-white hover:bg-emerald-900 disabled:opacity-50">Reactivate account</button>}
                </div>
              </article>)}
            </div>}
          </section>
        </>
      )}
      {!canManage && <p role="alert" className="mt-5 rounded-xl border border-red-300 bg-red-50 p-4 text-sm font-semibold text-red-900">Your role can view this page but cannot change account access.</p>}
      {students.length === 0 && teachers.length === 0 && <p className="mt-5 text-xs text-slate-600">No student or teacher records are currently available to link. Create verified school records before assigning those roles.</p>}
    </PortalLayout>
  );
}

function Summary({ label, value }: { label: string; value: number }) {
  return <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900"><p className="text-xs font-semibold text-slate-700 dark:text-slate-300">{label}</p><p className="mt-1 text-2xl font-black text-slate-900 dark:text-white">{value}</p></div>;
}
