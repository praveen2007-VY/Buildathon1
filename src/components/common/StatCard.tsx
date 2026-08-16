import React from 'react';
import { TrendingUp, UserCheck, Clock, AlertTriangle } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  iconType: 'performance' | 'attendance' | 'assignments' | 'exam';
  subtitle?: string;
  isErrorSubtitle?: boolean;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  iconType,
  subtitle,
  isErrorSubtitle = false
}) => {
  const getIconConfig = () => {
    switch (iconType) {
      case 'performance':
        return {
          icon: TrendingUp,
          bgClass: 'bg-primary-container',
          textClass: 'text-primary'
        };
      case 'attendance':
        return {
          icon: UserCheck,
          bgClass: 'bg-tertiary-container/20',
          textClass: 'text-tertiary-container'
        };
      case 'assignments':
        return {
          icon: Clock,
          bgClass: 'bg-secondary-container/20',
          textClass: 'text-secondary'
        };
      case 'exam':
        return {
          icon: AlertTriangle,
          bgClass: 'bg-error-container',
          textClass: 'text-on-error-container'
        };
    }
  };

  const config = getIconConfig();
  const IconComponent = config.icon;

  return (
    <div className="bg-surface-container-lowest rounded-xl p-md border border-outline-variant/30 shadow-card flex flex-col justify-between min-h-[120px]">
      <div className="flex items-center justify-between mb-sm">
        <span className="font-label text-[12px] leading-[16px] text-on-surface-variant font-medium uppercase tracking-wider">
          {title}
        </span>
        <div className={`w-8 h-8 rounded-full ${config.bgClass} flex items-center justify-center ${config.textClass}`}>
          <IconComponent className="w-4 h-4 shrink-0" />
        </div>
      </div>

      <div>
        {iconType === 'exam' ? (
          <div>
            <div className="font-title text-[18px] leading-[28px] font-semibold text-on-surface truncate">
              {value}
            </div>
            {subtitle && (
              <div className={`font-label text-[12px] leading-[16px] ${isErrorSubtitle ? 'text-error' : 'text-on-surface-variant'}`}>
                {subtitle}
              </div>
            )}
          </div>
        ) : (
          <span className="font-display text-[48px] leading-[60px] font-bold text-on-surface tracking-tight">
            {value}
          </span>
        )}
      </div>
    </div>
  );
};
