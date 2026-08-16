import React from 'react';
import { Sparkles } from 'lucide-react';

interface InstitutionalAIInsightCardProps {
  onViewAnalysis?: () => void;
}

export const InstitutionalAIInsightCard: React.FC<InstitutionalAIInsightCardProps> = ({ onViewAnalysis }) => {
  return (
    <div className="lg:col-span-12 ai-gradient-border rounded-xl shadow-card p-md bg-[#EEF2FF] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
      <div className="relative z-10 flex flex-col md:flex-row gap-6 items-start md:items-center">
        <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center shrink-0 border border-outline-variant/50">
          <Sparkles className="w-6 h-6 text-secondary" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-title text-[18px] leading-[28px] text-on-primary-fixed font-semibold">
              Institutional AI Insight
            </h3>
            <span className="px-2 py-0.5 rounded-full bg-secondary/20 text-secondary font-label text-[10px] uppercase font-bold">
              New
            </span>
          </div>
          <p className="font-body text-[16px] leading-[24px] text-on-surface-variant max-w-4xl">
            <strong className="text-on-surface font-semibold">Computer Science</strong> students show a{' '}
            <strong className="text-tertiary font-semibold">9% improvement</strong> in examination performance this semester following the implementation of adaptive learning modules. Recommend expanding pilot to Engineering department.
          </p>
        </div>
        <button 
          onClick={onViewAnalysis}
          className="shrink-0 px-4 py-2 bg-white border border-outline-variant text-on-surface rounded-lg font-label text-[12px] leading-[16px] font-semibold hover:bg-surface-container-low transition-colors shadow-sm whitespace-nowrap cursor-pointer"
        >
          View Analysis
        </button>
      </div>
    </div>
  );
};
