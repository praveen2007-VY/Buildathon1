import React, { useState, useEffect } from 'react';
import { 
  Users, 
  UserCheck, 
  BookOpen, 
  CheckSquare, 
  Calendar, 
  Download, 
  TrendingUp, 
  Minus 
} from 'lucide-react';
import { AcademicRiskDonutChart } from '../../components/charts/AcademicRiskDonutChart';
import { InstitutionalAIInsightCard } from '../../components/admin/InstitutionalAIInsightCard';
import { SystemMonitoringWidget } from '../../components/admin/SystemMonitoringWidget';
import { api } from '../../services/api';

export const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalTeachers: 0,
    activeCourses: 0,
    globalAttendance: 0
  });

  useEffect(() => {
    const loadStats = async () => {
      try {
        const res = await api.getAdminStats();
        if (res.stats) {
          setStats(res.stats);
        }
      } catch (e) {
        // Fallback
      }
    };
    loadStats();
  }, []);

  return (
    <div className="space-y-lg max-w-7xl mx-auto pb-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-headline text-[24px] leading-[32px] md:text-[32px] md:leading-[40px] font-bold text-on-surface">
            Institutional Overview
          </h2>
          <p className="font-body text-[14px] leading-[20px] text-on-surface-variant mt-1">
            System Academic Summary
          </p>
        </div>

        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-surface-container-lowest border border-outline-variant text-on-surface rounded-lg font-label text-[12px] font-medium hover:bg-surface-container-low transition-colors shadow-xs cursor-pointer">
            <Calendar className="w-4 h-4" />
            <span>Academic Term</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-lg font-label text-[12px] font-medium hover:bg-primary/90 transition-colors shadow-sm cursor-pointer">
            <Download className="w-4 h-4" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Top Section: Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Students */}
        <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant shadow-card flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="font-label text-[12px] text-on-surface-variant uppercase tracking-wider font-medium">
              Total Students
            </span>
            <div className="w-8 h-8 rounded-full bg-primary-container/10 flex items-center justify-center text-primary">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="font-headline text-[24px] md:text-[32px] font-bold text-on-surface">
              {stats.totalStudents}
            </div>
            <div className="flex items-center gap-1 mt-1 text-tertiary font-label text-[12px]">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Registered</span>
            </div>
          </div>
        </div>

        {/* Card 2: Total Teachers */}
        <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant shadow-card flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="font-label text-[12px] text-on-surface-variant uppercase tracking-wider font-medium">
              Total Teachers
            </span>
            <div className="w-8 h-8 rounded-full bg-tertiary/10 flex items-center justify-center text-tertiary">
              <UserCheck className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="font-headline text-[24px] md:text-[32px] font-bold text-on-surface">
              {stats.totalTeachers}
            </div>
            <div className="flex items-center gap-1 mt-1 text-outline font-label text-[12px]">
              <Minus className="w-3.5 h-3.5" />
              <span>Active Faculty</span>
            </div>
          </div>
        </div>

        {/* Card 3: Active Courses */}
        <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant shadow-card flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="font-label text-[12px] text-on-surface-variant uppercase tracking-wider font-medium">
              Active Courses
            </span>
            <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
              <BookOpen className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="font-headline text-[24px] md:text-[32px] font-bold text-on-surface">
              {stats.activeCourses}
            </div>
            <div className="flex items-center gap-1 mt-1 text-tertiary font-label text-[12px]">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>In Session</span>
            </div>
          </div>
        </div>

        {/* Card 4: Global Attendance */}
        <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant shadow-card flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="font-label text-[12px] text-on-surface-variant uppercase tracking-wider font-medium">
              Global Attendance
            </span>
            <div className="w-8 h-8 rounded-full bg-primary-container/10 flex items-center justify-center text-primary">
              <CheckSquare className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="font-headline text-[24px] md:text-[32px] font-bold text-on-surface">
              {stats.globalAttendance}%
            </div>
            <div className="flex items-center gap-1 mt-1 text-tertiary font-label text-[12px]">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Overall Rate</span>
            </div>
          </div>
        </div>
      </div>

      {/* Institutional AI Insights & Risk Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-lg">
        <div className="lg:col-span-8">
          <InstitutionalAIInsightCard />
        </div>
        <div className="lg:col-span-4">
          <AcademicRiskDonutChart />
        </div>
      </div>

      {/* System Monitoring */}
      <SystemMonitoringWidget />
    </div>
  );
};
