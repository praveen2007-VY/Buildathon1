import React from 'react';
import { Users, BookOpen, Clock, UserCheck } from 'lucide-react';
import { teacherStats, currentUserTeacher } from '../../data/mockData';
import { TeacherPerformanceChart } from '../../components/charts/TeacherPerformanceChart';
import { TeacherAIInsightsCard } from '../../components/ai/TeacherAIInsightsCard';
import { ActiveCoursesList } from '../../components/teacher/ActiveCoursesList';
import { AtRiskStudentsTable } from '../../components/tables/AtRiskStudentsTable';

export const TeacherDashboard: React.FC = () => {
  return (
    <div className="space-y-lg max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-lg">
        <h2 className="font-headline text-[24px] leading-[32px] md:text-[32px] md:leading-[40px] font-bold text-on-surface">
          Welcome back, {currentUserTeacher.name}
        </h2>
        <p className="font-body text-[16px] leading-[24px] text-on-surface-variant mt-1">
          Here is your academic overview for today, October 24.
        </p>
      </div>

      {/* Top Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-md">
        {/* Total Students */}
        <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant shadow-card flex flex-col justify-between h-28">
          <div className="flex justify-between items-start">
            <p className="font-label text-[12px] leading-[16px] text-on-surface-variant uppercase tracking-wider font-medium">
              Total Students
            </p>
            <div className="bg-surface-container p-1 rounded-md text-primary-container">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-sm">
            <span className="font-display text-[32px] md:text-[48px] leading-[40px] md:leading-[60px] font-bold text-on-surface">
              {teacherStats.totalStudents}
            </span>
          </div>
        </div>

        {/* Active Courses */}
        <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant shadow-card flex flex-col justify-between h-28">
          <div className="flex justify-between items-start">
            <p className="font-label text-[12px] leading-[16px] text-on-surface-variant uppercase tracking-wider font-medium">
              Active Courses
            </p>
            <div className="bg-tertiary-container/10 p-1 rounded-md text-tertiary">
              <BookOpen className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-sm">
            <span className="font-display text-[32px] md:text-[48px] leading-[40px] md:leading-[60px] font-bold text-on-surface">
              {teacherStats.activeCourses}
            </span>
          </div>
        </div>

        {/* Pending Evals */}
        <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant shadow-card flex flex-col justify-between h-28">
          <div className="flex justify-between items-start">
            <p className="font-label text-[12px] leading-[16px] text-on-surface-variant uppercase tracking-wider font-medium">
              Pending Evals
            </p>
            <div className="bg-[#fef3c7] p-1 rounded-md text-[#d97706]">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-sm">
            <span className="font-display text-[32px] md:text-[48px] leading-[40px] md:leading-[60px] font-bold text-on-surface">
              {teacherStats.pendingEvaluations}
            </span>
          </div>
        </div>

        {/* Attendance Today */}
        <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant shadow-card flex flex-col justify-between h-28">
          <div className="flex justify-between items-start">
            <p className="font-label text-[12px] leading-[16px] text-on-surface-variant uppercase tracking-wider font-medium">
              Attendance Today
            </p>
            <div className="bg-tertiary-container/10 p-1 rounded-md text-tertiary">
              <UserCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-sm">
            <span className="font-display text-[32px] md:text-[48px] leading-[40px] md:leading-[60px] font-bold text-on-surface">
              {teacherStats.attendanceTodayPercentage}%
            </span>
          </div>
        </div>
      </div>

      {/* Middle Section: Chart & AI Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-lg">
        <div className="lg:col-span-2">
          <TeacherPerformanceChart />
        </div>
        <div className="lg:col-span-1">
          <TeacherAIInsightsCard />
        </div>
      </div>

      {/* Bottom Section: Active Courses & At-Risk Students */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-lg">
        <ActiveCoursesList />
        <AtRiskStudentsTable />
      </div>
    </div>
  );
};
