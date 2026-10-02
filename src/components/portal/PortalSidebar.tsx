'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  GraduationCap,
  LayoutDashboard,
  Users,
  UserCheck,
  BookOpen,
  DollarSign,
  Bell,
  FileCheck,
  Megaphone,
  History,
  ClipboardList,
  Award,
  Calendar,
  LogOut,
  ExternalLink,
  Layers,
  ChevronLeft,
  ChevronRight,
  Settings,
  UserCircle2
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { UserRole } from '@/types';

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
}

interface PortalSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export const PortalSidebar: React.FC<PortalSidebarProps> = ({ collapsed, onToggle }) => {
  const pathname = usePathname();
  const { currentUser, logout, loginAsRole } = useAuth();
  const role = currentUser?.role || 'STUDENT';

  const commonNav: NavItem[] = [
    { name: 'Dashboard', href: '/portal/dashboard', icon: LayoutDashboard },
    { name: 'Grades', href: '/portal/student/grades', icon: Award },
    { name: 'Attendance', href: '/portal/student/attendance', icon: Calendar },
    { name: 'Messages', href: '/portal/student/messages', icon: Bell },
    { name: 'Fees', href: '/portal/student/fees', icon: DollarSign },
    { name: 'Profile', href: '/portal/profile', icon: UserCircle2 },
    { name: 'Settings', href: '/portal/settings', icon: Settings },
  ];

  let navItems: NavItem[] = [...commonNav];

  if (role === 'ADMIN' || role === 'SUPER_ADMIN') {
    navItems = [
      ...commonNav,
      { name: 'Admin Dashboard', href: '/portal/admin', icon: LayoutDashboard },
      { name: 'Student Management', href: '/portal/admin/students', icon: Users },
      { name: 'Teacher Directory', href: '/portal/admin/teachers', icon: UserCheck },
      { name: 'Academics & Exams', href: '/portal/admin/academics', icon: BookOpen },
      { name: 'Fees & Finance', href: '/portal/admin/fees', icon: DollarSign },
      { name: 'Admissions Desk', href: '/portal/admin/admissions', icon: FileCheck },
      { name: 'Announcements CMS', href: '/portal/admin/announcements', icon: Megaphone },
      { name: 'Security Audit Logs', href: '/portal/admin/audit-logs', icon: History },
    ];
  } else if (role === 'TEACHER') {
    navItems = [
      ...commonNav,
      { name: 'Teacher Dashboard', href: '/portal/teacher', icon: LayoutDashboard },
      { name: 'Daily Attendance', href: '/portal/teacher/attendance', icon: UserCheck },
      { name: 'Exam Marks & Grading', href: '/portal/teacher/grading', icon: Award },
      { name: 'Assignments & Homework', href: '/portal/teacher/assignments', icon: ClipboardList },
    ];
  } else if (role === 'PARENT') {
    navItems = [
      ...commonNav,
      { name: 'Ward Dashboard', href: '/portal/parent', icon: LayoutDashboard },
      { name: 'Academic Reports', href: '/portal/student/results', icon: Award },
      { name: 'Fee Statement', href: '/portal/student/fees', icon: DollarSign },
      { name: 'Attendance Record', href: '/portal/student/attendance', icon: Calendar },
    ];
  } else if (role === 'APPLICANT') {
    navItems = [
      ...commonNav,
      { name: 'Application Tracker', href: '/portal/applicant', icon: FileCheck },
      { name: 'Admissions Info', href: '/admissions', icon: BookOpen },
    ];
  } else {
    navItems = [
      ...commonNav,
      { name: 'Student Overview', href: '/portal/student', icon: LayoutDashboard },
      { name: 'Report Cards & Marks', href: '/portal/student/results', icon: Award },
      { name: 'Attendance Register', href: '/portal/student/attendance', icon: Calendar },
      { name: 'Fee Statement', href: '/portal/student/fees', icon: DollarSign },
      { name: 'Assignments', href: '/portal/student/assignments', icon: ClipboardList },
    ];
  }

  const roleLabels: Record<UserRole, { label: string; color: string }> = {
    SUPER_ADMIN: { label: 'Super Admin', color: 'bg-rose-500/20 text-rose-300 border-rose-500/30' },
    ADMIN: { label: 'Administrator', color: 'bg-aqua-500/20 text-aqua-300 border-aqua-500/30' },
    TEACHER: { label: 'Teacher', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
    STUDENT: { label: 'Student', color: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
    PARENT: { label: 'Parent', color: 'bg-purple-500/20 text-purple-300 border-purple-500/30' },
    STAFF: { label: 'Staff', color: 'bg-amber-500/20 text-amber-300 border-amber-500/30' },
    APPLICANT: { label: 'Applicant', color: 'bg-gold-500/20 text-gold-300 border-gold-500/30' },
  };

  return (
    <motion.aside
      animate={{ width: collapsed ? 88 : 280 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="relative flex h-screen shrink-0 flex-col overflow-hidden border-r border-slate-200 bg-slate-950 text-slate-200 dark:border-slate-800 dark:bg-slate-900"
    >
      <div className="flex items-center justify-between border-b border-slate-800 p-3">
        <Link href="/" className="flex items-center gap-3 overflow-hidden">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-aqua-500 to-sky-700 text-white shadow-lg">
            <GraduationCap className="h-5 w-5 text-gold-300" />
          </div>
          {!collapsed && (
            <div className="overflow-hidden">
              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-white">Kalulini</p>
              <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-aqua-400">Portal</p>
            </div>
          )}
        </Link>
        <button
          type="button"
          onClick={onToggle}
          aria-label="Toggle sidebar"
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-700 bg-slate-900 text-slate-300 transition hover:border-aqua-500 hover:text-white"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      {!collapsed && (
        <div className="border-b border-slate-800 px-3 py-3">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">Active mode</span>
            <span className={`rounded-full border px-2 py-0.5 text-[9px] font-bold uppercase ${roleLabels[role].color}`}>
              {roleLabels[role].label}
            </span>
          </div>
          <select
            value={role}
            onChange={(e) => loginAsRole(e.target.value as UserRole)}
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-2.5 py-2 text-[10px] text-slate-200 outline-none transition focus:border-aqua-500"
          >
            <option value="ADMIN">Administrator</option>
            <option value="TEACHER">Teacher</option>
            <option value="STUDENT">Student</option>
            <option value="PARENT">Parent</option>
            <option value="APPLICANT">Applicant</option>
          </select>
        </div>
      )}

      <nav className="flex-1 space-y-1 overflow-y-auto px-2 py-3">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex items-center gap-3 rounded-xl px-2.5 py-2.5 text-sm font-medium transition ${
                isActive
                  ? 'bg-aqua-600 text-white shadow-lg shadow-aqua-900/20'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Icon className={`h-4 w-4 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}`} />
              {!collapsed && <span className="truncate">{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-slate-800 p-3">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-slate-700 bg-slate-800 text-xs font-bold text-white">
            {currentUser?.photoURL ? <img src={currentUser.photoURL} alt={currentUser.displayName} className="h-full w-full object-cover" /> : currentUser?.displayName?.charAt(0) || 'U'}
          </div>
          {!collapsed && (
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-bold text-white">{currentUser?.displayName || 'User'}</p>
              <p className="truncate text-[10px] text-slate-400">{currentUser?.email}</p>
            </div>
          )}
        </div>

        {!collapsed && (
          <div className="mt-3 grid grid-cols-2 gap-2">
            <Link href="/" className="flex items-center justify-center gap-1.5 rounded-lg bg-slate-800 px-2 py-2 text-[10px] font-semibold text-slate-200 transition hover:bg-slate-700">
              <ExternalLink className="h-3 w-3" /> Website
            </Link>
            <button
              type="button"
              onClick={() => logout()}
              className="flex items-center justify-center gap-1.5 rounded-lg border border-rose-800 bg-rose-950/40 px-2 py-2 text-[10px] font-semibold text-rose-300 transition hover:bg-rose-900/50"
            >
              <LogOut className="h-3 w-3" /> Logout
            </button>
          </div>
        )}
      </div>
    </motion.aside>
  );
};
