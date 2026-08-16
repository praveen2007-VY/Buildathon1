import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle, Sparkles, BookOpen, Target } from 'lucide-react';
import { api } from '../../services/api';
import { CourseProgressItem } from '../../types';

export const MyProgress: React.FC = () => {
  const [courses, setCourses] = useState<CourseProgressItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProgress = async () => {
      setIsLoading(true);
      try {
        const res = await api.getStudentCourses();
        setCourses(res.courses || []);
      } catch (e) {
        setCourses([]);
      } finally {
        setIsLoading(false);
      }
    };
    loadProgress();
  }, []);

  const totalProgress = courses.length > 0
    ? Math.round(courses.reduce((acc, c) => acc + (c.progress || 0), 0) / courses.length)
    : 0;

  return (
    <div className="space-y-lg max-w-7xl mx-auto pb-8">
      {/* Header */}
      <div>
        <h2 className="font-headline text-[24px] md:text-[32px] font-bold text-on-surface">
          My Academic Progress
        </h2>
        <p className="font-body text-[14px] text-on-surface-variant mt-1">
          Detailed breakdown of your enrolled course progress and subject completion milestones.
        </p>
      </div>

      {/* Progress Overview Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
        {/* Overall Completion Indicator */}
        <div className="bg-surface-container-lowest p-lg rounded-xl border border-outline-variant/30 shadow-card flex flex-col justify-between">
          <div>
            <span className="font-label text-[12px] text-on-surface-variant uppercase font-medium">Overall Course Completion</span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="font-display text-[48px] font-bold text-primary">{totalProgress}%</span>
              <span className="font-label text-[14px] text-tertiary font-medium">Active Term</span>
            </div>
          </div>
          <div className="w-full bg-surface-container-high rounded-full h-3 mt-md">
            <div className="bg-primary h-3 rounded-full transition-all duration-500" style={{ width: `${totalProgress}%` }} />
          </div>
        </div>

        {/* Strong Subjects Summary */}
        <div className="bg-surface-container-lowest p-lg rounded-xl border border-outline-variant/30 shadow-card flex flex-col justify-between">
          <div className="flex items-center gap-2 mb-sm">
            <CheckCircle className="w-5 h-5 text-tertiary" />
            <h3 className="font-title text-[16px] font-bold text-on-surface">Course Status</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center text-[14px]">
              <span className="font-medium text-on-surface">Enrolled Modules</span>
              <span className="font-bold text-tertiary">{courses.length} Courses</span>
            </div>
          </div>
          <span className="font-label text-[12px] text-on-surface-variant mt-sm">Meeting target completion milestones.</span>
        </div>

        {/* Focus Summary */}
        <div className="bg-surface-container-lowest p-lg rounded-xl border border-outline-variant/30 shadow-card flex flex-col justify-between">
          <div className="flex items-center gap-2 mb-sm">
            <Target className="w-5 h-5 text-primary" />
            <h3 className="font-title text-[16px] font-bold text-on-surface">Academic Goal</h3>
          </div>
          <p className="font-body text-[14px] text-on-surface-variant">
            Maintain 80%+ completion across all registered subject modules before term evaluations.
          </p>
        </div>
      </div>

      {/* Detailed Subject Breakdown */}
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 p-lg shadow-card space-y-md">
        <h3 className="font-title text-[18px] font-bold text-on-surface">Enrolled Course Mastery Status</h3>

        {courses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
            {courses.map((c) => (
              <div key={c.id} className="p-md rounded-lg border border-outline-variant/30 bg-surface-container-low/30 space-y-sm">
                <div className="flex justify-between items-center">
                  <span className="font-title text-[16px] font-bold text-on-surface">{c.name}</span>
                  <span className="px-2.5 py-0.5 text-[11px] font-bold rounded-full bg-tertiary/10 text-tertiary">
                    {c.status || 'Active'}
                  </span>
                </div>
                <div className="flex justify-between text-[13px] text-on-surface-variant">
                  <span>Code: {c.code}</span>
                  <span>Completion: <strong>{c.progress}%</strong></span>
                </div>
                <div className="w-full bg-surface-container-high rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full transition-all duration-500" style={{ width: `${c.progress}%` }} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-xl text-center text-on-surface-variant font-body text-[14px]">
            No enrolled courses currently active. Discover and enroll in courses from your Student Portal.
          </div>
        )}
      </div>
    </div>
  );
};
