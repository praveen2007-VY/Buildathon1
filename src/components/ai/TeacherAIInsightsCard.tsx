import React from 'react';
import { Sparkles, Bot } from 'lucide-react';

interface TeacherAIInsightsCardProps {
  onGeneratePlan?: () => void;
}

export const TeacherAIInsightsCard: React.FC<TeacherAIInsightsCardProps> = ({ onGeneratePlan }) => {
  return (
    <div className="ai-gradient p-lg rounded-xl shadow-card flex flex-col relative overflow-hidden min-h-[340px]">
      {/* Background Decors */}
      <div className="absolute -right-10 -top-10 opacity-10 pointer-events-none">
        <Sparkles className="w-48 h-48 text-secondary" />
      </div>

      {/* Header */}
      <div className="flex items-center gap-sm mb-md relative z-10">
        <Sparkles className="w-5 h-5 text-secondary shrink-0" />
        <h3 className="font-title text-[18px] leading-[28px] ai-text-gradient font-bold">
          AI Teacher Insights
        </h3>
      </div>

      {/* Main Insight Box */}
      <div className="bg-surface-container-lowest/80 backdrop-blur-sm rounded-lg p-md mb-auto relative z-10 border border-white/50">
        <p className="font-body text-[14px] leading-[20px] text-on-surface">
          <strong className="text-on-surface font-semibold">42% of students</strong> are struggling with{' '}
          <strong className="text-on-surface font-semibold">Module 4 (Advanced Calculus)</strong>. Historical data suggests intervention is needed before the midterm exam.
        </p>
      </div>

      {/* Button */}
      <button 
        onClick={onGeneratePlan}
        className="mt-md w-full bg-secondary hover:bg-secondary-container text-on-secondary font-label text-[12px] leading-[16px] font-semibold py-3 px-4 rounded-lg flex justify-center items-center gap-2 transition-colors relative z-10 shadow-sm cursor-pointer"
      >
        <Bot className="w-4 h-4 shrink-0" />
        <span>Generate Revision Plan</span>
      </button>
    </div>
  );
};
