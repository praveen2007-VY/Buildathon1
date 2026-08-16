import React from 'react';
import { RefreshCw, Shield, UserPlus, AlertTriangle } from 'lucide-react';
import { adminSystemMonitoringLogs } from '../../data/mockData';

export const SystemMonitoringWidget: React.FC = () => {
  const getLogIcon = (type: string) => {
    switch (type) {
      case 'sync':
        return <RefreshCw className="w-3.5 h-3.5 text-primary" />;
      case 'security':
        return <Shield className="w-3.5 h-3.5 text-secondary" />;
      case 'user':
        return <UserPlus className="w-3.5 h-3.5 text-on-surface-variant" />;
      case 'warning':
        return <AlertTriangle className="w-3.5 h-3.5 text-error" />;
      default:
        return <RefreshCw className="w-3.5 h-3.5 text-primary" />;
    }
  };

  return (
    <div className="lg:col-span-4 bg-surface-container-lowest rounded-xl border border-outline-variant shadow-card p-md flex flex-col min-h-[300px]">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-title text-[18px] leading-[28px] font-semibold text-on-surface">
          System Monitoring
        </h3>
        <button className="text-primary font-label text-[12px] leading-[16px] font-medium hover:underline">
          View All
        </button>
      </div>

      <div className="mb-4 p-3 rounded-lg bg-surface-container-low border border-outline-variant flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-tertiary animate-pulse" />
          <span className="font-label text-[12px] leading-[16px] font-medium text-on-surface">
            All systems operational
          </span>
        </div>
        <span className="font-label text-[10px] text-outline-variant">99.9% Uptime</span>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 space-y-4">
        {adminSystemMonitoringLogs.map((log, index) => (
          <div key={log.id} className="flex gap-3 relative">
            {index < adminSystemMonitoringLogs.length - 1 && (
              <div className="absolute left-[11px] top-6 bottom-[-16px] w-[2px] bg-surface-container-high" />
            )}
            <div className="w-6 h-6 rounded-full bg-surface-container-high flex items-center justify-center shrink-0 z-10 mt-0.5 border border-outline-variant/30">
              {getLogIcon(log.type)}
            </div>
            <div>
              <p className="font-body text-[14px] leading-[20px] text-on-surface font-medium">
                {log.title}
              </p>
              <p className="font-label text-[12px] leading-[16px] text-outline-variant">
                {log.time} • {log.source}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
