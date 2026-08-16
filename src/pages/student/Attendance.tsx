import React from 'react';
import { UserCheck, Clock, AlertTriangle, Sparkles, CheckCircle2 } from 'lucide-react';
import { 
  studentAttendanceSummary, 
  studentSubjectAttendanceList, 
  studentAttendanceChartData 
} from '../../data/mockData';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip 
} from 'recharts';

export const Attendance: React.FC = () => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Excellent':
        return <span className="px-2.5 py-1 bg-tertiary/10 text-tertiary font-label text-[11px] font-bold rounded-full">Excellent</span>;
      case 'Good':
        return <span className="px-2.5 py-1 bg-primary/10 text-primary font-label text-[11px] font-bold rounded-full">Good</span>;
      case 'Warning':
        return <span className="px-2.5 py-1 bg-[#d97706]/10 text-[#d97706] font-label text-[11px] font-bold rounded-full">Warning</span>;
      case 'Critical':
        return <span className="px-2.5 py-1 bg-error/10 text-error font-label text-[11px] font-bold rounded-full">Critical</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-lg max-w-7xl mx-auto pb-8">
      {/* Header */}
      <div>
        <h2 className="font-headline text-[24px] md:text-[32px] font-bold text-on-surface">
          Attendance Record
        </h2>
        <p className="font-body text-[14px] text-on-surface-variant mt-1">
          Monitor your presence across all enrolled subjects and track compliance.
        </p>
      </div>

      {/* AI Low Attendance Alert */}
      <div className="ai-gradient p-md rounded-xl border border-secondary/20 shadow-card flex items-start gap-md">
        <Sparkles className="w-6 h-6 text-secondary shrink-0 mt-0.5" />
        <div className="flex-1">
          <h3 className="font-title text-[16px] font-bold text-on-surface">AI Attendance Insight</h3>
          <p className="font-body text-[14px] text-on-surface-variant mt-0.5">
            Your attendance in <strong className="text-on-surface font-semibold">Database Systems (CS-303)</strong> is at <strong className="text-error font-bold">81%</strong>, which is near the 80% mandatory requirement limit. Attending the next two lectures will raise your threshold safely to 86%.
          </p>
        </div>
      </div>

      {/* Attendance Overview Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-md">
        <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/30 shadow-card flex flex-col justify-between">
          <span className="font-label text-[12px] text-on-surface-variant uppercase font-medium">Overall Attendance</span>
          <span className="font-display text-[32px] font-bold text-primary">{studentAttendanceSummary.overallPercentage}%</span>
        </div>
        <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/30 shadow-card flex flex-col justify-between">
          <span className="font-label text-[12px] text-on-surface-variant uppercase font-medium">Total Classes</span>
          <span className="font-display text-[32px] font-bold text-on-surface">{studentAttendanceSummary.totalClasses}</span>
        </div>
        <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/30 shadow-card flex flex-col justify-between">
          <span className="font-label text-[12px] text-tertiary uppercase font-medium">Present</span>
          <span className="font-display text-[32px] font-bold text-tertiary">{studentAttendanceSummary.present}</span>
        </div>
        <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/30 shadow-card flex flex-col justify-between">
          <span className="font-label text-[12px] text-error uppercase font-medium">Absent</span>
          <span className="font-display text-[32px] font-bold text-error">{studentAttendanceSummary.absent}</span>
        </div>
        <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/30 shadow-card flex flex-col justify-between">
          <span className="font-label text-[12px] text-[#d97706] uppercase font-medium">Late</span>
          <span className="font-display text-[32px] font-bold text-[#d97706]">{studentAttendanceSummary.late}</span>
        </div>
      </div>

      {/* Main Grid: Chart & Subject Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-lg">
        {/* Attendance Chart */}
        <div className="lg:col-span-5 bg-surface-container-lowest rounded-xl border border-outline-variant/30 p-md shadow-card flex flex-col min-h-[320px]">
          <h3 className="font-title text-[18px] font-semibold text-on-surface mb-md">Monthly Attendance Trend</h3>
          <div className="flex-1 w-full bg-surface-container-low/50 rounded-lg p-sm border border-dashed border-outline-variant min-h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={studentAttendanceChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#c2c6d6" opacity={0.3} />
                <XAxis dataKey="month" stroke="#727785" fontSize={12} tickLine={false} />
                <YAxis domain={[70, 100]} stroke="#727785" fontSize={12} tickLine={false} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#ffffff', 
                    borderRadius: '8px', 
                    border: '1px solid #c2c6d6',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="percentage" name="Attendance (%)" fill="#0058be" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Subject Attendance Table */}
        <div className="lg:col-span-7 bg-surface-container-lowest rounded-xl border border-outline-variant/30 p-md shadow-card overflow-hidden">
          <h3 className="font-title text-[18px] font-semibold text-on-surface mb-md">Subject Attendance Breakdown</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-bright border-b border-outline-variant/30">
                  <th className="p-sm pl-md font-label text-[12px] text-on-surface-variant uppercase font-medium">Subject</th>
                  <th className="p-sm font-label text-[12px] text-on-surface-variant uppercase font-medium">Held</th>
                  <th className="p-sm font-label text-[12px] text-on-surface-variant uppercase font-medium">Present</th>
                  <th className="p-sm font-label text-[12px] text-on-surface-variant uppercase font-medium">Absent</th>
                  <th className="p-sm font-label text-[12px] text-on-surface-variant uppercase font-medium">Rate</th>
                  <th className="p-sm pr-md font-label text-[12px] text-on-surface-variant uppercase font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20">
                {studentSubjectAttendanceList.map((subject) => (
                  <tr key={subject.id} className="hover:bg-surface-container-low transition-colors">
                    <td className="p-sm pl-md font-body text-[14px] font-medium text-on-surface">{subject.subject}</td>
                    <td className="p-sm font-body text-[14px] text-on-surface-variant">{subject.classesHeld}</td>
                    <td className="p-sm font-body text-[14px] text-tertiary font-semibold">{subject.present}</td>
                    <td className="p-sm font-body text-[14px] text-error font-semibold">{subject.absent}</td>
                    <td className="p-sm font-body text-[14px] font-bold text-on-surface">{subject.percentage}%</td>
                    <td className="p-sm pr-md">{getStatusBadge(subject.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
