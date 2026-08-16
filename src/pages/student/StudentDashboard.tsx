import React from 'react';
import { StatCard } from '../../components/common/StatCard';
import { PerformanceChart } from '../../components/charts/PerformanceChart';
import { CourseProgressCard } from '../../components/common/CourseProgress';
import { AIRecommendationCard } from '../../components/ai/AIRecommendationCard';
import { UpcomingActivitiesCard } from '../../components/common/UpcomingActivities';
import { studentStats, currentUserStudent } from '../../data/mockData';
import { useNavigate } from 'react-router-dom';

export const StudentDashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-lg max-w-7xl mx-auto">
      {/* Welcome Header */}
      <div className="mb-lg">
        <h2 className="font-headline text-[24px] leading-[32px] md:text-[32px] md:leading-[40px] font-bold text-on-surface mb-xs">
          Welcome back, {currentUserStudent.name.split(' ')[0]}
        </h2>
        <p className="font-body text-[14px] leading-[20px] text-on-surface-variant">
          Here is your academic overview for today.
        </p>
      </div>

      {/* Overview Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-md mb-lg">
        <StatCard 
          title="Overall Performance" 
          value={`${studentStats.overallPerformance}%`} 
          iconType="performance" 
        />
        <StatCard 
          title="Attendance" 
          value={`${studentStats.attendancePercentage}%`} 
          iconType="attendance" 
        />
        <StatCard 
          title="Pending Assignments" 
          value={studentStats.pendingAssignmentsCount} 
          iconType="assignments" 
        />
        <StatCard 
          title="Upcoming Exam" 
          value={studentStats.upcomingExam.subject} 
          subtitle={studentStats.upcomingExam.daysLeft}
          isErrorSubtitle={true}
          iconType="exam" 
        />
      </div>

      {/* Main Grid Layout: 2 Columns on XL screens */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-lg">
        {/* Left Column: Performance Chart & Course Progress */}
        <div className="xl:col-span-2 flex flex-col gap-lg">
          <PerformanceChart />
          <CourseProgressCard />
        </div>

        {/* Right Column: AI Assistant & Upcoming Activities */}
        <div className="flex flex-col gap-lg">
          <AIRecommendationCard onViewInsights={() => navigate('/student/ai')} />
          <UpcomingActivitiesCard />
        </div>
      </div>
    </div>
  );
};
