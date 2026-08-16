import React, { useState } from 'react';
import { Award, GraduationCap, TrendingUp, Calendar } from 'lucide-react';
import { 
  studentGradesSummary, 
  studentGradesRecords, 
  semesterPerformanceData 
} from '../../data/mockData';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip 
} from 'recharts';

export const Grades: React.FC = () => {
  const [selectedSemester, setSelectedSemester] = useState<string>('Fall 2024');

  const filteredGrades = studentGradesRecords.filter(
    (g) => selectedSemester === 'All' || g.semester === selectedSemester
  );

  return (
    <div className="space-y-lg max-w-7xl mx-auto pb-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-headline text-[24px] md:text-[32px] font-bold text-on-surface">
            Grades & Academic Transcripts
          </h2>
          <p className="font-body text-[14px] text-on-surface-variant mt-1">
            Review detailed assessment grades, credit progress, and semester GPA performance.
          </p>
        </div>

        {/* Semester Selector */}
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-on-surface-variant" />
          <select 
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
            className="bg-surface-container-lowest border border-outline-variant/60 rounded-lg px-3 py-2 text-[14px] outline-none text-on-surface cursor-pointer shadow-xs"
          >
            <option value="Fall 2024">Fall Semester 2024</option>
            <option value="Spring 2024">Spring Semester 2024</option>
            <option value="All">All Semesters</option>
          </select>
        </div>
      </div>

      {/* Academic Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-md">
        <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/30 shadow-card flex flex-col justify-between">
          <span className="font-label text-[12px] text-on-surface-variant uppercase font-medium">Cumulative GPA</span>
          <span className="font-display text-[32px] font-bold text-primary">{studentGradesSummary.currentGPA} / 4.0</span>
        </div>
        <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/30 shadow-card flex flex-col justify-between">
          <span className="font-label text-[12px] text-on-surface-variant uppercase font-medium">Overall Percentage</span>
          <span className="font-display text-[32px] font-bold text-tertiary">{studentGradesSummary.percentage}%</span>
        </div>
        <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/30 shadow-card flex flex-col justify-between">
          <span className="font-label text-[12px] text-on-surface-variant uppercase font-medium">Total Credits</span>
          <span className="font-display text-[32px] font-bold text-secondary">{studentGradesSummary.totalCredits} Credits</span>
        </div>
        <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/30 shadow-card flex flex-col justify-between">
          <span className="font-label text-[12px] text-on-surface-variant uppercase font-medium">Subjects Graded</span>
          <span className="font-display text-[32px] font-bold text-on-surface">{studentGradesSummary.completedSubjects}</span>
        </div>
      </div>

      {/* Main Grid: Chart & Grade Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-lg">
        {/* Performance Chart */}
        <div className="lg:col-span-5 bg-surface-container-lowest rounded-xl border border-outline-variant/30 p-md shadow-card flex flex-col min-h-[320px]">
          <h3 className="font-title text-[18px] font-semibold text-on-surface mb-md">GPA & Grade Progress</h3>
          <div className="flex-1 w-full bg-surface-container-low/50 rounded-lg p-sm border border-dashed border-outline-variant min-h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={semesterPerformanceData} margin={{ top: 10, right: 15, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#c2c6d6" opacity={0.3} />
                <XAxis dataKey="month" stroke="#727785" fontSize={12} tickLine={false} />
                <YAxis domain={[50, 100]} stroke="#727785" fontSize={12} tickLine={false} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#ffffff', 
                    borderRadius: '8px', 
                    border: '1px solid #c2c6d6',
                    fontSize: '12px'
                  }}
                />
                <Line type="monotone" dataKey="score" stroke="#0058be" strokeWidth={3} dot={{ fill: '#0058be', r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Grade Records Table */}
        <div className="lg:col-span-7 bg-surface-container-lowest rounded-xl border border-outline-variant/30 p-md shadow-card overflow-hidden">
          <h3 className="font-title text-[18px] font-semibold text-on-surface mb-md">Assessment Grade Ledger</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-bright border-b border-outline-variant/30">
                  <th className="p-sm pl-md font-label text-[12px] text-on-surface-variant uppercase font-medium">Subject</th>
                  <th className="p-sm font-label text-[12px] text-on-surface-variant uppercase font-medium">Assessment</th>
                  <th className="p-sm font-label text-[12px] text-on-surface-variant uppercase font-medium">Score</th>
                  <th className="p-sm font-label text-[12px] text-on-surface-variant uppercase font-medium">Grade</th>
                  <th className="p-sm pr-md font-label text-[12px] text-on-surface-variant uppercase font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20">
                {filteredGrades.map((record) => (
                  <tr key={record.id} className="hover:bg-surface-container-low transition-colors">
                    <td className="p-sm pl-md">
                      <p className="font-body text-[14px] font-medium text-on-surface">{record.subject}</p>
                      <p className="font-label text-[11px] text-on-surface-variant">{record.code}</p>
                    </td>
                    <td className="p-sm font-body text-[14px] text-on-surface-variant">{record.assessment}</td>
                    <td className="p-sm font-body text-[14px] font-bold text-on-surface">{record.score} / {record.maxScore}</td>
                    <td className="p-sm font-body text-[14px] font-bold text-primary">{record.grade}</td>
                    <td className="p-sm pr-md">
                      <span className="px-2.5 py-1 bg-tertiary/10 text-tertiary font-label text-[11px] font-bold rounded-full">
                        {record.status}
                      </span>
                    </td>
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
