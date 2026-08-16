import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface AIRecommendationCardProps {
  onViewInsights?: () => void;
}

export const AIRecommendationCard: React.FC<AIRecommendationCardProps> = ({ onViewInsights }) => {
  const defaultRecommendation = {
    targetSubject: 'Database Systems',
    insightText: 'Take a diagnostic practice test on Relational Normalization & SQL Joins to benchmark your current score.',
    recommendations: [
      'Revise 3NF and Boyce-Codd Normal Form rules.',
      'Practice INNER JOIN vs LEFT OUTER JOIN query patterns.'
    ],
    actionText: 'Take Practice Test'
  };

  return (
    <div className="bg-inverse-on-surface rounded-xl p-md border border-secondary/30 shadow-floating relative overflow-hidden">
      {/* Background Sparkles Decors */}
      <div className="absolute top-0 right-0 p-sm opacity-20 text-secondary pointer-events-none">
        <Sparkles className="w-16 h-16" />
      </div>

      {/* Card Header */}
      <div className="flex items-center gap-sm mb-sm relative z-10">
        <Sparkles className="w-5 h-5 text-secondary shrink-0" />
        <h3 className="font-title text-[18px] leading-[28px] text-secondary font-bold">
          AI Academic Assistant
        </h3>
      </div>

      {/* Insight Highlight Box */}
      <div className="bg-surface-container-lowest/80 backdrop-blur-sm rounded-lg p-sm mb-md relative z-10 border border-outline-variant/30">
        <p className="font-body text-[14px] leading-[20px] text-on-surface">
          <strong className="text-primary font-semibold">Diagnostic:</strong>{' '}
          {defaultRecommendation.insightText}
        </p>
      </div>

      {/* Recommendation Bullet Points */}
      <div className="mb-md relative z-10">
        <h4 className="font-label text-[12px] leading-[16px] text-on-surface-variant font-medium uppercase tracking-wider mb-xs">
          Recommendations
        </h4>
        <ul className="font-body text-[14px] leading-[20px] text-on-surface list-disc pl-md space-y-1">
          {defaultRecommendation.recommendations.map((rec, index) => (
            <li key={index}>{rec}</li>
          ))}
        </ul>
      </div>

      {/* Action Button */}
      <button 
        onClick={onViewInsights}
        className="w-full bg-secondary text-on-secondary font-label text-[12px] leading-[16px] font-semibold py-sm rounded-lg hover:bg-secondary-container transition-colors relative z-10 flex items-center justify-center gap-2 shadow-sm cursor-pointer"
      >
        <span>{defaultRecommendation.actionText}</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};
