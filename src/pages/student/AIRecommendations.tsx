import React, { useState, useEffect } from 'react';
import { Sparkles, AlertCircle, CheckCircle, ArrowRight, BookOpen, Target, Loader2 } from 'lucide-react';
import { studentAIInsightsDetailed } from '../../data/mockData';
import { AIRecommendation } from '../../types';
import { api } from '../../services/api';

export const AIRecommendations: React.FC = () => {
  const [insights, setInsights] = useState<AIRecommendation[]>(studentAIInsightsDetailed);
  const [summary, setSummary] = useState<string>('Your recent assignment scores have declined by 12% in Database Systems while attendance remains stable at 81%. Early intervention can prevent grade loss prior to final examinations.');
  const [overallRisk, setOverallRisk] = useState<string>('Medium');

  useEffect(() => {
    const loadRecommendations = async () => {
      try {
        const res = await api.getStudentAIRecommendations();
        if (res.recommendations && res.recommendations.length > 0) {
          setInsights(res.recommendations);
        }
      } catch (e) {
        // Fallback
      }
    };
    loadRecommendations();
  }, []);
  return (
    <div className="space-y-lg max-w-7xl mx-auto pb-8">
      {/* Page Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/10 text-secondary rounded-full font-label text-[12px] font-bold mb-xs">
          <Sparkles className="w-4 h-4 shrink-0" />
          <span>AI Academic Intelligence Engine</span>
        </div>
        <h2 className="font-headline text-[24px] md:text-[32px] font-bold text-on-surface">
          Personalized AI Academic Insights
        </h2>
        <p className="font-body text-[14px] text-on-surface-variant mt-1 max-w-3xl">
          Real-time algorithmic analysis of your assessment scores, learning patterns, attendance correlation, and targeted recovery paths.
        </p>
      </div>

      {/* Academic Risk Banner */}
      <div className="bg-inverse-on-surface rounded-xl p-lg border border-secondary/30 shadow-floating relative overflow-hidden space-y-md">
        <div className="absolute top-0 right-0 p-lg opacity-10 text-secondary pointer-events-none">
          <Sparkles className="w-40 h-40" />
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-secondary/20 text-secondary flex items-center justify-center font-bold">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div>
            <span className="px-2.5 py-0.5 bg-secondary/20 text-secondary font-label text-[11px] font-bold rounded-full uppercase">
              Academic Risk Level: Medium
            </span>
            <h3 className="font-title text-[20px] font-bold text-on-surface mt-1">
              Performance Trend Notice for Database Systems
            </h3>
          </div>
        </div>

        <p className="font-body text-[15px] leading-[22px] text-on-surface max-w-3xl">
          "Your recent assignment scores have declined by 12% in Database Systems while attendance remains stable at 81%. Early intervention can prevent grade loss prior to final examinations."
        </p>
      </div>

      {/* Weak Subject Detection Breakdown */}
      <div className="space-y-md">
        <h3 className="font-title text-[20px] font-bold text-on-surface">Targeted AI Recovery Plans</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
          {studentAIInsightsDetailed.map((insight) => (
            <div 
              key={insight.id}
              className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 p-lg shadow-card space-y-md flex flex-col justify-between"
            >
              <div className="space-y-sm">
                <div className="flex justify-between items-center">
                  <span className="font-label text-[12px] font-bold text-primary uppercase">{insight.targetSubject}</span>
                  <span className={`px-2.5 py-0.5 font-label text-[11px] font-bold rounded-full ${insight.riskLevel === 'Medium' ? 'bg-[#d97706]/10 text-[#d97706]' : 'bg-tertiary/10 text-tertiary'}`}>
                    {insight.riskLevel} Risk ({insight.scoreChange})
                  </span>
                </div>

                <h4 className="font-title text-[18px] font-bold text-on-surface">{insight.insightText}</h4>

                <div className="bg-surface-container-low p-sm rounded-lg border border-outline-variant/20 space-y-1 text-[13px]">
                  <p><strong className="text-on-surface">Root Cause:</strong> {insight.reason}</p>
                  <p><strong className="text-primary">Suggested Action:</strong> {insight.suggestedAction}</p>
                </div>

                <div className="space-y-1">
                  <h5 className="font-label text-[12px] uppercase text-on-surface-variant font-semibold">Recommended Steps</h5>
                  <ul className="list-disc pl-md text-[14px] text-on-surface space-y-1">
                    {insight.recommendations.map((rec, idx) => (
                      <li key={idx}>{rec}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <button className="w-full mt-md bg-secondary text-on-secondary font-label text-[12px] font-semibold py-2.5 rounded-lg hover:bg-secondary-container transition-colors flex justify-center items-center gap-2 cursor-pointer shadow-xs">
                <span>{insight.actionText}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
