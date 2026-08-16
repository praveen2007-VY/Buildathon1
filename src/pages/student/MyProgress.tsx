import React from 'react';
import { TrendingUp, AlertCircle, CheckCircle, Sparkles, Award } from 'lucide-react';
import { studentEnrolledCourses, semesterPerformanceData } from '../../data/mockData';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip 
} from 'recharts';

export const MyProgress: React.FC = () => {
  return (
    <div className="space-y-lg max-w-7xl mx-auto pb-8">
      {/* Header */}
      <div>
        <h2 className="font-headline text-[24px] md:text-[32px] font-bold text-on-surface">
          My Academic Progress
        </h2>
        <p className="font-body text-[14px] text-on-surface-variant mt-1">
          Detailed breakdown of your strengths, subject progress, and AI recommendations for growth.
        </p>
      </div>

      {/* Progress Overview Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
        {/* Overall Completion Indicator */}
        <div className="bg-surface-container-lowest p-lg rounded-xl border border-outline-variant/30 shadow-card flex flex-col justify-between">
          <div>
            <span className="font-label text-[12px] text-on-surface-variant uppercase font-medium">Overall Progress</span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="font-display text-[48px] font-bold text-primary">78%</span>
              <span className="font-label text-[14px] text-tertiary font-medium">+4% this month</span>
            </div>
          </div>
          <div className="w-full bg-surface-container-high rounded-full h-3 mt-md">
            <div className="bg-primary h-3 rounded-full" style={{ width: '78%' }} />
          </div>
        </div>

        {/* Strong Subjects Summary */}
        <div className="bg-surface-container-lowest p-lg rounded-xl border border-outline-variant/30 shadow-card flex flex-col justify-between">
          <div className="flex items-center gap-2 mb-sm">
            <CheckCircle className="w-5 h-5 text-tertiary" />
            <h3 className="font-title text-[16px] font-bold text-on-surface">Strongest Subjects</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center text-[14px]">
              <span className="font-medium text-on-surface">AI & Machine Learning</span>
              <span className="font-bold text-tertiary">88% (A)</span>
            </div>
            <div className="flex justify-between items-center text-[14px]">
              <span className="font-medium text-on-surface">Mathematics</span>
              <span className="font-bold text-tertiary">82% (A-)</span>
            </div>
          </div>
          <span className="font-label text-[12px] text-on-surface-variant mt-sm">Consistently meeting target mastery thresholds.</span>
        </div>

        {/* Needs Improvement Summary */}
        <div className="bg-surface-container-lowest p-lg rounded-xl border border-outline-variant/30 shadow-card flex flex-col justify-between">
          <div className="flex items-center gap-2 mb-sm">
            <AlertCircle className="w-5 h-5 text-error" />
            <h3 className="font-title text-[16px] font-bold text-on-surface">Subjects Needing Focus</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center text-[14px]">
              <span className="font-medium text-on-surface">Database Systems</span>
              <span className="font-bold text-error">69% (C+)</span>
            </div>
            <div className="flex justify-between items-center text-[14px]">
              <span className="font-medium text-on-surface">Data Structures</span>
              <span className="font-bold text-[#d97706]">74% (B+)</span>
            </div>
          </div>
          <span className="font-label text-[12px] text-error font-medium mt-sm">AI recommendation generated for Database Systems.</span>
        </div>
      </div>

      {/* Interactive Performance Trend Chart */}
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 p-lg shadow-card space-y-md">
        <div className="flex justify-between items-center">
          <h3 className="font-title text-[18px] font-bold text-on-surface">Semester Master Score Trend</h3>
          <span className="font-label text-[12px] text-primary font-medium">Target: 85% Score</span>
        </div>

        <div className="w-full h-64 bg-surface-container-low/50 rounded-lg p-sm border border-dashed border-outline-variant">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={semesterPerformanceData} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#c2c6d6" opacity={0.3} />
              <XAxis dataKey="month" stroke="#727785" fontSize={12} tickLine={false} />
              <YAxis domain={[50, 100]} stroke="#727785" fontSize={12} tickLine={false} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#ffffff', 
                  borderRadius: '8px', 
                  border: '1px solid #c2c6d6',
                  fontSize: '13px'
                }}
              />
              <Line type="monotone" dataKey="score" stroke="#0058be" strokeWidth={3} dot={{ fill: '#0058be', r: 5 }} />
              <Line type="monotone" dataKey="target" stroke="#6063ee" strokeWidth={2} strokeDasharray="4 4" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Subject Breakdown */}
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 p-lg shadow-card space-y-md">
        <h3 className="font-title text-[18px] font-bold text-on-surface">Subject-wise Mastery Status</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
          {studentEnrolledCourses.map((c) => (
            <div key={c.id} className="p-md rounded-lg border border-outline-variant/30 bg-surface-container-low/30 space-y-sm">
              <div className="flex justify-between items-center">
                <span className="font-title text-[16px] font-bold text-on-surface">{c.name}</span>
                <span className={`px-2.5 py-0.5 text-[11px] font-bold rounded-full ${c.isRisk ? 'bg-error/10 text-error' : 'bg-tertiary/10 text-tertiary'}`}>
                  {c.isRisk ? 'Needs Focus' : 'On Track'}
                </span>
              </div>
              <div className="flex justify-between text-[13px] text-on-surface-variant">
                <span>Code: {c.code}</span>
                <span>Current Mastery: <strong>{c.progress}%</strong></span>
              </div>
              <div className="w-full bg-surface-container-high rounded-full h-2">
                <div className={`${c.color} h-2 rounded-full`} style={{ width: `${c.progress}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
