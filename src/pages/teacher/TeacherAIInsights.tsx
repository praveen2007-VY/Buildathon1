import React from 'react';
import { Sparkles, AlertCircle, BookOpen, Users, ArrowRight, CheckCircle2 } from 'lucide-react';
import { teacherWeakTopicsList, teacherAtRiskStudents } from '../../data/mockData';

export const TeacherAIInsights: React.FC = () => {
  return (
    <div className="space-y-lg max-w-7xl mx-auto pb-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/10 text-secondary rounded-full font-label text-[12px] font-bold mb-xs">
          <Sparkles className="w-4 h-4 shrink-0" />
          <span>AI Teacher Intelligence Engine</span>
        </div>
        <h2 className="font-headline text-[24px] md:text-[32px] font-bold text-on-surface">
          AI Pedagogy & Class Insights
        </h2>
        <p className="font-body text-[14px] text-on-surface-variant mt-1 max-w-3xl">
          Automated analysis of concept retention, curriculum topic friction, and student performance risk warnings.
        </p>
      </div>

      {/* Hero Class Intelligence Card */}
      <div className="bg-inverse-on-surface rounded-xl p-lg border border-secondary/30 shadow-floating relative overflow-hidden space-y-md">
        <div className="absolute top-0 right-0 p-lg opacity-10 text-secondary pointer-events-none">
          <Sparkles className="w-40 h-40" />
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-secondary/20 text-secondary flex items-center justify-center font-bold">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <span className="px-2.5 py-0.5 bg-secondary/20 text-secondary font-label text-[11px] font-bold rounded-full uppercase">
              Class Concept Warning
            </span>
            <h3 className="font-title text-[20px] font-bold text-on-surface mt-1">
              42% of students in Advanced Calculus (MATH-401) struggling with Module 4
            </h3>
          </div>
        </div>

        <p className="font-body text-[15px] leading-[22px] text-on-surface max-w-3xl">
          "Statistical evaluation of Problem Set #3 indicates a cluster failure on integration by parts with non-homogeneous terms. Generating a 3-step targeted revision worksheet is recommended before next week's midterm."
        </p>

        <div className="pt-sm flex flex-wrap gap-md">
          <button className="px-lg py-md bg-secondary text-on-secondary font-label text-[14px] font-semibold rounded-lg hover:bg-secondary-container transition-colors flex items-center gap-2 cursor-pointer shadow-xs">
            <span>Generate Revision Plan</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Weak Topic Detection Breakdown */}
      <div className="space-y-md">
        <h3 className="font-title text-[20px] font-bold text-on-surface">Curriculum Weak Topic Detection</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
          {teacherWeakTopicsList.map((wt) => (
            <div 
              key={wt.id}
              className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 p-lg shadow-card space-y-md flex flex-col justify-between"
            >
              <div className="space-y-sm">
                <div className="flex justify-between items-center">
                  <span className="font-label text-[12px] font-bold text-primary uppercase">{wt.course}</span>
                  <span className="px-2.5 py-0.5 bg-error/10 text-error font-label text-[11px] font-bold rounded-full">
                    {wt.studentsAffectedPercentage}% Affected
                  </span>
                </div>

                <h4 className="font-title text-[18px] font-bold text-on-surface">{wt.topic}</h4>

                <div className="bg-surface-container-low p-sm rounded-lg border border-outline-variant/20 text-[13px] space-y-1">
                  <p><strong className="text-on-surface">Severity Level:</strong> {wt.severity}</p>
                  <p><strong className="text-primary">Recommended Pedagogical Action:</strong> {wt.recommendedAction}</p>
                </div>
              </div>

              <button className="w-full bg-primary text-on-primary font-label text-[12px] font-semibold py-2.5 rounded-lg hover:bg-primary/90 transition-colors flex justify-center items-center gap-2 cursor-pointer shadow-xs">
                <span>Distribute Supplementary Exercises</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
