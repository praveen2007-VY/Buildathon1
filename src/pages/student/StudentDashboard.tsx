import React, { useState, useEffect } from 'react';
import { StatCard } from '../../components/common/StatCard';
import { PerformanceChart } from '../../components/charts/PerformanceChart';
import { CourseProgressCard } from '../../components/common/CourseProgress';
import { AIRecommendationCard } from '../../components/ai/AIRecommendationCard';
import { UpcomingActivitiesCard } from '../../components/common/UpcomingActivities';
import { studentStats as initialStats, currentUserStudent } from '../../data/mockData';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';

export const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(initialStats);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const res = await api.getStudentStats();
        if (res.stats) {
          setStats((prev) => ({
            ...prev,
            overallPerformance: res.stats.overallPerformance ?? prev.overallPerformance,
            attendancePercentage: res.stats.attendancePercentage ?? prev.attendancePercentage,
            pendingAssignmentsCount: res.stats.pendingAssignmentsCount ?? prev.pendingAssignmentsCount,
          }));
        }
      } catch (e) {
        // Fallback
      }
    };
    loadStats();
  }, []);

  return (
    <div className="space-y-lg max-w-7xl mx-auto">
      {/* Welcome Header */}
      <div className="mb-lg">
        <h2 className="font-headline text-[24px] leading-[32px] md:text-[32px] md:leading-[40px] font-bold text-on-surface mb-xs">
          Welcome back, {user?.name ? user.name.split(' ')[0] : 'Alex'}
        </h2>
        <p className="font-body text-[14px] leading-[20px] text-on-surface-variant">
          Here is your academic overview for today.
        </p>
      </div>

      {/* Overview Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-md mb-lg">
        <StatCard 
          title="Overall Performance" 
          value={`${stats.overallPerformance}%`} 
          iconType="performance" 
        />
        <StatCard 
          title="Attendance" 
          value={`${stats.attendancePercentage}%`} 
          iconType="attendance" 
        />
        <StatCard 
          title="Pending Assignments" 
          value={stats.pendingAssignmentsCount} 
          iconType="assignments" 
        />
        <StatCard 
          title="Upcoming Exam" 
          value={stats.upcomingExam.subject} 
          subtitle={stats.upcomingExam.daysLeft}
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
