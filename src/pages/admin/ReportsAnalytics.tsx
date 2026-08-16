import React, { useState } from 'react';
import { BarChart2, TrendingUp, Download, Filter, FileText, CheckCircle2 } from 'lucide-react';
import { 
  adminAcademicPerformanceData, 
  adminDepartmentPerformanceData, 
  studentAttendanceChartData 
} from '../../data/mockData';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip 
} from 'recharts';

export const ReportsAnalytics: React.FC = () => {
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedReportType, setSelectedReportType] = useState('Academic Performance');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleGenerateReport = (title: string) => {
    setToastMessage(`Report "${title}" generated and exported to PDF!`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="space-y-lg max-w-7xl mx-auto pb-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-headline text-[24px] md:text-[32px] font-bold text-on-surface">
            Reports & Institutional Analytics
          </h2>
          <p className="font-body text-[14px] text-on-surface-variant mt-1">
            Generate cross-departmental reports on student achievement, attendance compliance, and risk metrics.
          </p>
        </div>

        <button 
          onClick={() => handleGenerateReport('Executive Comprehensive Analytics')}
          className="px-4 py-2 bg-primary text-on-primary font-label text-[12px] font-semibold rounded-lg flex items-center gap-2 hover:bg-primary/90 transition-colors shadow-xs cursor-pointer self-start md:self-auto"
        >
          <Download className="w-4 h-4" />
          <span>Export Master Analytics PDF</span>
        </button>
      </div>

      {toastMessage && (
        <div className="p-md bg-tertiary/10 border border-tertiary/30 rounded-xl text-tertiary flex items-center gap-2 font-body text-[14px] font-medium animate-fadeIn">
          <CheckCircle2 className="w-5 h-5" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Report Filter Controls */}
      <div className="bg-surface-container-lowest rounded-xl p-md border border-outline-variant/30 shadow-card flex flex-wrap items-center gap-md">
        <div className="flex items-center gap-2 text-on-surface-variant">
          <Filter className="w-4 h-4" />
          <span className="font-label text-[12px] font-bold uppercase">Analytics Filters:</span>
        </div>

        <select 
          value={selectedDept}
          onChange={(e) => setSelectedDept(e.target.value)}
          className="bg-surface-container-low border border-outline-variant/50 rounded-lg px-3 py-2 text-[14px] outline-none cursor-pointer text-on-surface"
        >
          <option value="All">Department: All</option>
          <option value="Comp Sci">School of Computing</option>
          <option value="Engineering">School of Engineering</option>
          <option value="Applied Mathematics">Applied Mathematics</option>
        </select>

        <select 
          value={selectedReportType}
          onChange={(e) => setSelectedReportType(e.target.value)}
          className="bg-surface-container-low border border-outline-variant/50 rounded-lg px-3 py-2 text-[14px] outline-none cursor-pointer text-on-surface"
        >
          <option value="Academic Performance">Report: Academic Performance</option>
          <option value="Attendance Compliance">Report: Attendance Compliance</option>
          <option value="Examination Analytics">Report: Examination Analytics</option>
          <option value="Risk Analysis">Report: Risk Analysis</option>
        </select>
      </div>

      {/* Main Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-lg">
        {/* Overall GPA & Performance Trend */}
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 p-lg shadow-card space-y-md">
          <h3 className="font-title text-[18px] font-bold text-on-surface">Institutional GPA Performance Trend</h3>
          <div className="w-full h-64 bg-surface-container-low/50 rounded-lg p-sm border border-dashed border-outline-variant">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={adminAcademicPerformanceData} margin={{ top: 10, right: 15, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#c2c6d6" opacity={0.3} />
                <XAxis dataKey="month" stroke="#727785" fontSize={12} tickLine={false} />
                <YAxis domain={[2.5, 4.0]} stroke="#727785" fontSize={12} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #c2c6d6', fontSize: '12px' }} />
                <Line type="monotone" dataKey="gpa" name="GPA (4.0 scale)" stroke="#0058be" strokeWidth={3} dot={{ fill: '#0058be', r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Department Comparison Chart */}
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 p-lg shadow-card space-y-md">
          <h3 className="font-title text-[18px] font-bold text-on-surface">Department Performance Comparison</h3>
          <div className="w-full h-64 bg-surface-container-low/50 rounded-lg p-sm border border-dashed border-outline-variant">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={adminDepartmentPerformanceData} margin={{ top: 10, right: 15, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#c2c6d6" opacity={0.3} />
                <XAxis dataKey="department" stroke="#727785" fontSize={12} tickLine={false} />
                <YAxis domain={[50, 100]} stroke="#727785" fontSize={12} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #c2c6d6', fontSize: '12px' }} />
                <Bar dataKey="currentTerm" name="Current Term Score (%)" fill="#0058be" radius={[4, 4, 0, 0]} />
                <Bar dataKey="previousTerm" name="Previous Term Score (%)" fill="#4648d4" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Exportable Report Cards Grid */}
      <div className="space-y-md">
        <h3 className="font-title text-[20px] font-bold text-on-surface">Exportable Institutional Reports</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
          {[
            { title: 'Academic Performance Report', desc: 'Semester GPA averages, grade distribution curves, and department performance rankings.' },
            { title: 'Attendance Compliance Report', desc: 'Cross-faculty presence tracking, absenteeism alerts, and lecture attendance logs.' },
            { title: 'Examination Analytics Report', desc: 'Midterm and final exam outcome metrics, score variance, and pass/fail distributions.' },
            { title: 'Institutional Risk Analysis Report', desc: 'Comprehensive identification of at-risk student cohorts and recommended interventions.' }
          ].map((rep, idx) => (
            <div key={idx} className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 p-lg shadow-card flex flex-col justify-between gap-md">
              <div>
                <div className="flex items-center gap-2 mb-xs">
                  <FileText className="w-5 h-5 text-primary" />
                  <h4 className="font-title text-[18px] font-bold text-on-surface">{rep.title}</h4>
                </div>
                <p className="font-body text-[14px] text-on-surface-variant">{rep.desc}</p>
              </div>

              <div className="pt-md border-t border-outline-variant/20 flex justify-between items-center">
                <span className="font-label text-[12px] text-on-surface-variant font-medium">Format: PDF / CSV</span>
                <button 
                  onClick={() => handleGenerateReport(rep.title)}
                  className="px-4 py-2 bg-primary text-on-primary font-label text-[12px] font-semibold rounded-lg hover:bg-primary/90 transition-colors shadow-xs cursor-pointer"
                >
                  Generate Report
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
