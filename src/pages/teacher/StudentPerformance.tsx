import React, { useState } from 'react';
import { BarChart2, TrendingUp, Users, AlertCircle } from 'lucide-react';
import { teacherClassPerformanceData, teacherAtRiskStudents } from '../../data/mockData';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip 
} from 'recharts';

export const StudentPerformance: React.FC = () => {
  return (
    <div className="space-y-lg max-w-7xl mx-auto pb-8">
      {/* Header */}
      <div>
        <h2 className="font-headline text-[24px] md:text-[32px] font-bold text-on-surface">
          Student Performance Analytics
        </h2>
        <p className="font-body text-[14px] text-on-surface-variant mt-1">
          Detailed class-wide score distribution, attendance-performance correlation, and academic risk detection.
        </p>
      </div>

      {/* Quick Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-md">
        <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/30 shadow-card flex flex-col justify-between">
          <span className="font-label text-[12px] text-on-surface-variant uppercase font-medium">Class Average</span>
          <span className="font-display text-[28px] font-bold text-primary">84%</span>
        </div>
        <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/30 shadow-card flex flex-col justify-between">
          <span className="font-label text-[12px] text-on-surface-variant uppercase font-medium">Median Score</span>
          <span className="font-display text-[28px] font-bold text-on-surface">85%</span>
        </div>
        <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/30 shadow-card flex flex-col justify-between">
          <span className="font-label text-[12px] text-tertiary uppercase font-medium">Highest Score</span>
          <span className="font-display text-[28px] font-bold text-tertiary">95%</span>
        </div>
        <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/30 shadow-card flex flex-col justify-between">
          <span className="font-label text-[12px] text-error uppercase font-medium">Lowest Score</span>
          <span className="font-display text-[28px] font-bold text-error">60%</span>
        </div>
        <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/30 shadow-card flex flex-col justify-between">
          <span className="font-label text-[12px] text-secondary uppercase font-medium">Pass Rate</span>
          <span className="font-display text-[28px] font-bold text-secondary">100%</span>
        </div>
      </div>

      {/* Class Performance Trend Chart */}
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 p-lg shadow-card space-y-md">
        <div className="flex justify-between items-center">
          <h3 className="font-title text-[18px] font-bold text-on-surface">Weekly Score & Attendance Correlation</h3>
          <span className="font-label text-[12px] text-primary font-semibold">6-Week Semester View</span>
        </div>

        <div className="w-full h-72 bg-surface-container-low/50 rounded-lg p-sm border border-dashed border-outline-variant">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={teacherClassPerformanceData} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#c2c6d6" opacity={0.3} />
              <XAxis dataKey="week" stroke="#727785" fontSize={12} tickLine={false} />
              <YAxis domain={[60, 100]} stroke="#727785" fontSize={12} tickLine={false} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#ffffff', 
                  borderRadius: '8px', 
                  border: '1px solid #c2c6d6',
                  fontSize: '12px'
                }}
              />
              <Area type="monotone" dataKey="avgScore" name="Avg Score (%)" stroke="#0058be" fill="#0058be" fillOpacity={0.2} strokeWidth={3} />
              <Area type="monotone" dataKey="attendance" name="Attendance (%)" stroke="#00855b" fill="#00855b" fillOpacity={0.1} strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* At-Risk Students Summary Section */}
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 p-lg shadow-card space-y-md">
        <h3 className="font-title text-[18px] font-bold text-on-surface">Identified At-Risk Students</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
          {teacherAtRiskStudents.map((std) => (
            <div key={std.id} className="p-md rounded-lg border border-outline-variant/30 bg-surface-container-low/40 space-y-xs">
              <div className="flex justify-between items-center">
                <span className="font-title text-[16px] font-bold text-on-surface">{std.name}</span>
                <span className="px-2.5 py-0.5 bg-error/10 text-error font-label text-[11px] font-bold rounded-full">
                  {std.riskLevel}
                </span>
              </div>
              <p className="font-body text-[13px] text-on-surface-variant">Primary Issue: <strong className="text-on-surface">{std.primaryIssue}</strong></p>
              <button className="mt-xs text-primary font-label text-[12px] font-semibold hover:underline">
                View Support Plan →
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
