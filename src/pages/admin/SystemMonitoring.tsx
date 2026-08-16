import React, { useState } from 'react';
import { ShieldCheck, Server, Database, Activity, RefreshCw, Filter } from 'lucide-react';
import { adminSystemMonitoringLogs, adminSystemHealthItems } from '../../data/mockData';
import { SystemMonitoringLog } from '../../types';

export const SystemMonitoring: React.FC = () => {
  const [logs] = useState<SystemMonitoringLog[]>(adminSystemMonitoringLogs);
  const [roleFilter, setRoleFilter] = useState('All');

  const filteredLogs = logs.filter(
    (l) => roleFilter === 'All' || l.userRole === roleFilter
  );

  return (
    <div className="space-y-lg max-w-7xl mx-auto pb-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-headline text-[24px] md:text-[32px] font-bold text-on-surface">
            System Monitoring & Audit Logs
          </h2>
          <p className="font-body text-[14px] text-on-surface-variant mt-1">
            Real-time infrastructure health, API service status, and security audit logs.
          </p>
        </div>

        <button className="px-4 py-2 bg-surface-container-lowest border border-outline-variant text-on-surface font-label text-[12px] font-semibold rounded-lg flex items-center gap-2 hover:bg-surface-container-low transition-colors shadow-xs cursor-pointer self-start md:self-auto">
          <RefreshCw className="w-4 h-4 text-primary" />
          <span>Refresh System Health</span>
        </button>
      </div>

      {/* Infrastructure Health Status Grid */}
      <div className="space-y-md">
        <h3 className="font-title text-[18px] font-bold text-on-surface">Service Health Matrix</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-md">
          {adminSystemHealthItems.map((item, idx) => (
            <div key={idx} className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/30 shadow-card flex justify-between items-center">
              <div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-tertiary animate-pulse" />
                  <h4 className="font-title text-[15px] font-semibold text-on-surface">{item.name}</h4>
                </div>
                <p className="font-body text-[12px] text-on-surface-variant mt-1">Latency: {item.latency} • Uptime: {item.uptime}</p>
              </div>

              <span className="px-2.5 py-0.5 bg-tertiary/10 text-tertiary font-label text-[11px] font-bold rounded-full">
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Activity Filter */}
      <div className="bg-surface-container-lowest rounded-xl p-md border border-outline-variant/30 shadow-card flex items-center justify-between">
        <h3 className="font-title text-[18px] font-bold text-on-surface">Recent System Audit Trail</h3>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-on-surface-variant" />
          <select 
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="bg-surface-container-low border border-outline-variant/50 rounded-lg px-3 py-1.5 text-[13px] outline-none font-medium cursor-pointer"
          >
            <option value="All">All User Roles</option>
            <option value="Admin">Admin</option>
            <option value="System">System Auto</option>
          </select>
        </div>
      </div>

      {/* Activity Logs Table */}
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-bright border-b border-outline-variant/30 font-label text-[12px] uppercase text-on-surface-variant">
                <th className="p-sm pl-md">Timestamp</th>
                <th className="p-sm">Activity Description</th>
                <th className="p-sm">Role / Source</th>
                <th className="p-sm">Target Module</th>
                <th className="p-sm pr-md">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-surface-container-low transition-colors">
                  <td className="p-sm pl-md font-mono text-[13px] text-outline-variant">{log.time}</td>
                  <td className="p-sm font-medium text-on-surface">{log.title}</td>
                  <td className="p-sm font-body text-[14px] text-on-surface-variant">{log.userRole || log.source}</td>
                  <td className="p-sm font-body text-[14px] text-primary font-semibold">{log.module || 'System'}</td>
                  <td className="p-sm pr-md">
                    <span className={`px-2.5 py-1 font-label text-[11px] font-bold rounded-full ${log.status === 'Warning' ? 'bg-[#d97706]/10 text-[#d97706]' : 'bg-tertiary/10 text-tertiary'}`}>
                      {log.status || 'Success'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
