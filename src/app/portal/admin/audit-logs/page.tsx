'use client';

import React, { useState, useEffect } from 'react';
import { PortalLayout } from '@/components/portal/PortalLayout';
import { auditService } from '@/lib/services/auditService';
import { AuditLog } from '@/types';
import { History, Search, ShieldCheck } from 'lucide-react';

export default function AuditLogsPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    auditService.getLogs().then(setLogs);
  }, []);

  const filtered = logs.filter((l) =>
    l.userName.toLowerCase().includes(search.toLowerCase()) ||
    l.action.toLowerCase().includes(search.toLowerCase()) ||
    l.target.toLowerCase().includes(search.toLowerCase()) ||
    l.details.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <PortalLayout title="Security Audit Logs & Trace Records" subtitle="Track sensitive administrative transactions, grade publishing, admission authorizations and financial adjustments">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="relative flex-1 sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search audit records..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-aqua-500"
          />
        </div>

        <span className="text-xs text-slate-500">
          Logged Events: <strong>{logs.length}</strong>
        </span>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3 px-5">Timestamp</th>
                <th className="py-3 px-5">Author</th>
                <th className="py-3 px-5">Role</th>
                <th className="py-3 px-5">Action Performed</th>
                <th className="py-3 px-5">Target Entity</th>
                <th className="py-3 px-5">Audit Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-5 font-mono text-slate-500">{log.timestamp}</td>
                  <td className="py-3 px-5 font-bold text-charcoal-900">{log.userName}</td>
                  <td className="py-3 px-5">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-slate-100 text-slate-700">
                      {log.userRole}
                    </span>
                  </td>
                  <td className="py-3 px-5 font-mono font-semibold text-aqua-700">{log.action}</td>
                  <td className="py-3 px-5 text-charcoal-800 font-medium">{log.target}</td>
                  <td className="py-3 px-5 text-slate-600">{log.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PortalLayout>
  );
}
