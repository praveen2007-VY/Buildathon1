import React, { useState, useEffect } from 'react';
import { Sparkles, AlertCircle, CheckCircle, ArrowRight, BookOpen, Target, Award } from 'lucide-react';
import { AIRecommendation } from '../../types';
import { api } from '../../services/api';
import { TestModal } from '../../components/common/TestModal';

export const AIRecommendations: React.FC = () => {
  const [insights, setInsights] = useState<AIRecommendation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [testModalOpen, setTestModalOpen] = useState(false);
  const [testMode, setTestMode] = useState<'practice' | 'graded'>('practice');
  const [selectedSubject, setSelectedSubject] = useState('Database Systems');
  const [completedCount, setCompletedCount] = useState(0);

  const loadRecommendations = async () => {
    setIsLoading(true);
    try {
      const res = await api.getStudentAIRecommendations();
      if (res.recommendations && res.recommendations.length > 0) {
        setInsights(res.recommendations);
      } else {
        // Provide standard recovery plans if empty
        setInsights([
          { 
            id: 'ai_1', 
            targetSubject: 'Database Systems (CS-303)', 
            scoreChange: 'Assessment Needed', 
            riskLevel: 'Medium' as const, 
            priority: 'High' as const, 
            insightText: 'Complete diagnostic practice quiz on Relational Normalization & SQL Joins to benchmark your current score.', 
            reason: 'Identify weak areas in functional dependencies, 3NF normalization rules, and query performance.', 
            suggestedAction: 'Take interactive Practice Test or Graded Assessment.', 
            recommendations: ['Revise 3NF and Boyce-Codd Normal Form rules.', 'Practice INNER JOIN vs LEFT OUTER JOIN query patterns.'], 
            actionText: 'Take Practice Test' 
          },
          { 
            id: 'ai_2', 
            targetSubject: 'Mathematics (MATH-101)', 
            scoreChange: 'Assessment Needed', 
            riskLevel: 'Low' as const, 
            priority: 'Medium' as const, 
            insightText: 'Evaluate integration, derivatives, and linear algebra matrix problem-solving accuracy.', 
            reason: 'Verify mastery before mid-term evaluations.', 
            suggestedAction: 'Attempt timed practice test under assessment conditions.', 
            recommendations: ['Review integration by parts sample problems.', 'Attempt mock calculus questions under timed conditions.'], 
            actionText: 'Take Graded Test' 
          }
        ]);
      }
    } catch (e) {
      setInsights([
        { 
          id: 'ai_1', 
          targetSubject: 'Database Systems (CS-303)', 
          scoreChange: 'Assessment Needed', 
          riskLevel: 'Medium' as const, 
          priority: 'High' as const, 
          insightText: 'Complete diagnostic practice quiz on Relational Normalization & SQL Joins.', 
          reason: 'Identify weak areas in functional dependencies, 3NF normalization rules, and query performance.', 
          suggestedAction: 'Take interactive Practice Test or Graded Assessment.', 
          recommendations: ['Revise 3NF and Boyce-Codd Normal Form rules.', 'Practice INNER JOIN vs LEFT OUTER JOIN query patterns.'], 
          actionText: 'Take Practice Test' 
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadRecommendations();
  }, []);

  const handleStartTest = (subject: string, mode: 'practice' | 'graded') => {
    let cleanSubject = 'Database Systems';
    if (subject.toLowerCase().includes('math')) cleanSubject = 'Mathematics';
    else if (subject.toLowerCase().includes('data structure')) cleanSubject = 'Data Structures';
    
    setSelectedSubject(cleanSubject);
    setTestMode(mode);
    setTestModalOpen(true);
  };

  return (
    <div className="space-y-lg max-w-7xl mx-auto pb-8">
      {/* Page Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/10 text-secondary rounded-full font-label text-[12px] font-bold mb-xs">
          <Sparkles className="w-4 h-4 shrink-0" />
          <span>AI Academic Intelligence Engine</span>
        </div>
        <h2 className="font-headline text-[24px] md:text-[32px] font-bold text-on-surface">
          Personalized AI Academic Insights & Testing
        </h2>
        <p className="font-body text-[14px] text-on-surface-variant mt-1 max-w-3xl">
          Real-time algorithmic assessment of your learning progress, subject diagnostic testing, and targeted recovery paths.
        </p>
      </div>

      {/* Action Banner */}
      <div className="bg-inverse-on-surface rounded-xl p-lg border border-secondary/30 shadow-floating relative overflow-hidden space-y-md">
        <div className="absolute top-0 right-0 p-lg opacity-10 text-secondary pointer-events-none">
          <Sparkles className="w-40 h-40" />
        </div>

        <div className="flex items-center justify-between flex-wrap gap-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-secondary/20 text-secondary flex items-center justify-center font-bold">
              <Target className="w-6 h-6" />
            </div>
            <div>
              <span className="px-2.5 py-0.5 bg-secondary/20 text-secondary font-label text-[11px] font-bold rounded-full uppercase">
                Active Assessment Portal
              </span>
              <h3 className="font-title text-[20px] font-bold text-on-surface mt-1">
                Interactive Knowledge & Practice Tests Available
              </h3>
            </div>
          </div>

          <div className="flex gap-sm">
            <button
              onClick={() => handleStartTest('Database Systems', 'practice')}
              className="px-md py-sm bg-secondary text-on-secondary font-label text-[13px] font-semibold rounded-lg hover:bg-secondary-container transition-colors cursor-pointer shadow-xs"
            >
              Practice Test
            </button>
            <button
              onClick={() => handleStartTest('Database Systems', 'graded')}
              className="px-md py-sm bg-primary text-on-primary font-label text-[13px] font-semibold rounded-lg hover:bg-primary/90 transition-colors cursor-pointer shadow-xs"
            >
              Take Graded Test
            </button>
          </div>
        </div>
      </div>

      {/* Weak Subject Detection Breakdown */}
      <div className="space-y-md">
        <h3 className="font-title text-[20px] font-bold text-on-surface">Targeted AI Recovery & Diagnostic Tests</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
          {insights.map((insight, idx) => (
            <div 
              key={insight.id || idx}
              className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 p-lg shadow-card space-y-md flex flex-col justify-between"
            >
              <div className="space-y-sm">
                <div className="flex justify-between items-center">
                  <span className="font-label text-[12px] font-bold text-primary uppercase">{insight.targetSubject}</span>
                  <span className={`px-2.5 py-0.5 font-label text-[11px] font-bold rounded-full ${insight.riskLevel === 'Medium' ? 'bg-[#d97706]/10 text-[#d97706]' : 'bg-tertiary/10 text-tertiary'}`}>
                    {insight.riskLevel || 'Active'}
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
                    {insight.recommendations.map((rec, rIdx) => (
                      <li key={rIdx}>{rec}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-md border-t border-outline-variant/20 flex gap-sm">
                <button 
                  onClick={() => handleStartTest(insight.targetSubject, 'practice')}
                  className="flex-1 bg-surface-container-low text-on-surface border border-outline-variant/40 font-label text-[12px] font-semibold py-2.5 rounded-lg hover:bg-surface-container-high transition-colors flex justify-center items-center gap-1.5 cursor-pointer"
                >
                  <BookOpen className="w-4 h-4 text-secondary" />
                  <span>Practice Test</span>
                </button>

                <button 
                  onClick={() => handleStartTest(insight.targetSubject, 'graded')}
                  className="flex-1 bg-primary text-on-primary font-label text-[12px] font-semibold py-2.5 rounded-lg hover:bg-primary/90 transition-colors flex justify-center items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <span>Take Graded Test</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Test Modal */}
      <TestModal
        isOpen={testModalOpen}
        onClose={() => setTestModalOpen(false)}
        testType={testMode}
        subject={selectedSubject}
        onCompleted={() => {
          setCompletedCount(prev => prev + 1);
          loadRecommendations();
        }}
      />
    </div>
  );
};
