import { AuditLog } from '@/types';

let memoryAuditLogs: AuditLog[] = [
  {
    id: 'log-1',
    userId: 'usr-admin-1',
    userName: 'Principal Ndambuki',
    userRole: 'ADMIN',
    action: 'PUBLISH_ANNOUNCEMENT',
    target: 'Term 1 2026 Academic Reporting',
    details: 'Published official opening dates banner to public website',
    timestamp: '2026-01-02 08:30:00'
  },
  {
    id: 'log-2',
    userId: 'usr-teacher-1',
    userName: 'Mr. Geoffrey Musyoka',
    userRole: 'TEACHER',
    action: 'SUBMIT_GRADES',
    target: 'Form 3 East - Mathematics',
    details: 'Submitted 48 student marks for Term 3 Summative Exam',
    timestamp: '2025-11-28 14:12:00'
  },
  {
    id: 'log-3',
    userId: 'usr-admin-1',
    userName: 'Principal Ndambuki',
    userRole: 'ADMIN',
    action: 'APPROVE_ADMISSION',
    target: 'Applicant: Meshack Kariuki (KBHS-2026-0843)',
    details: 'Status changed to Accepted for Form 1 West',
    timestamp: '2026-01-07 15:45:00'
  }
];

export const auditService = {
  async getLogs(): Promise<AuditLog[]> {
    return memoryAuditLogs;
  },
  async log(entry: Omit<AuditLog, 'id' | 'timestamp'>): Promise<AuditLog> {
    const newLog: AuditLog = {
      ...entry,
      id: 'log-' + Date.now(),
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19)
    };
    memoryAuditLogs = [newLog, ...memoryAuditLogs];
    return newLog;
  }
};
