import React, { useState } from 'react';
import { Save, CheckCircle2, Search, Filter } from 'lucide-react';
import { studentGradesRecords } from '../../data/mockData';
import { StudentGradeRecord } from '../../types';

export const AdminGrades: React.FC = () => {
  const [grades, setGrades] = useState<StudentGradeRecord[]>(studentGradesRecords);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleScoreChange = (id: string, newScore: number) => {
    setGrades((prev) =>
      prev.map((g) => {
        if (g.id === id) {
          const letter = newScore >= 90 ? 'A' : newScore >= 80 ? 'B' : newScore >= 70 ? 'C' : 'F';
          return { ...g, score: newScore, grade: letter, status: newScore >= 60 ? 'Pass' : 'Fail' };
        }
        return g;
      })
    );
  };

  const handlePublishLedger = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const filteredGrades = grades.filter((g) =>
    (g.studentName && g.studentName.toLowerCase().includes(searchQuery.toLowerCase())) ||
    g.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    g.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-lg max-w-7xl mx-auto pb-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-headline text-[24px] md:text-[32px] font-bold text-on-surface">
            Institutional Grade Ledger
          </h2>
          <p className="font-body text-[14px] text-on-surface-variant mt-1">
            Centralized academic transcript verification, grade auditing, and official ledger publishing.
          </p>
        </div>

        <button 
          onClick={handlePublishLedger}
          className="px-4 py-2 bg-tertiary text-on-tertiary font-label text-[12px] font-semibold rounded-lg flex items-center gap-2 hover:bg-tertiary/90 transition-colors shadow-xs cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>Publish Master Ledger</span>
        </button>
      </div>

      {saveSuccess && (
        <div className="p-md bg-tertiary/10 border border-tertiary/30 rounded-xl text-tertiary flex items-center gap-2 font-body text-[14px] font-medium animate-fadeIn">
          <CheckCircle2 className="w-5 h-5" />
          <span>Master grade ledger published to university transcripts database!</span>
        </div>
      )}

      {/* Summary Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-md">
        <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/30 shadow-card flex flex-col justify-between">
          <span className="font-label text-[12px] text-on-surface-variant uppercase font-medium">Institutional GPA Avg</span>
          <span className="font-display text-[28px] font-bold text-primary">3.42 / 4.0</span>
        </div>
        <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/30 shadow-card flex flex-col justify-between">
          <span className="font-label text-[12px] text-tertiary uppercase font-medium">Pass Rate</span>
          <span className="font-display text-[28px] font-bold text-tertiary">96.5%</span>
        </div>
        <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/30 shadow-card flex flex-col justify-between">
          <span className="font-label text-[12px] text-secondary uppercase font-medium">Highest Grade</span>
          <span className="font-display text-[28px] font-bold text-secondary">98% (A+)</span>
        </div>
        <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/30 shadow-card flex flex-col justify-between">
          <span className="font-label text-[12px] text-error uppercase font-medium">Underperforming</span>
          <span className="font-display text-[28px] font-bold text-error">3.5%</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-surface-container-lowest rounded-xl p-md border border-outline-variant/30 shadow-card flex items-center">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search transcripts by student name or course..."
            className="w-full bg-surface-container-low border border-outline-variant/50 rounded-lg py-2 pl-10 pr-4 text-[14px] outline-none text-on-surface focus:border-primary"
          />
        </div>
      </div>

      {/* Grade Ledger Table */}
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-bright border-b border-outline-variant/30 font-label text-[12px] uppercase text-on-surface-variant">
                <th className="p-sm pl-md">Student</th>
                <th className="p-sm">Subject</th>
                <th className="p-sm">Assessment</th>
                <th className="p-sm">Score Marks</th>
                <th className="p-sm">Letter Grade</th>
                <th className="p-sm">Semester</th>
                <th className="p-sm pr-md">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {filteredGrades.map((g) => (
                <tr key={g.id} className="hover:bg-surface-container-low transition-colors">
                  <td className="p-sm pl-md font-medium text-on-surface">{g.studentName || 'Alex Rivera'} ({g.studentId || 'EDU-8842'})</td>
                  <td className="p-sm font-body text-[14px] text-on-surface-variant">{g.subject} ({g.code})</td>
                  <td className="p-sm font-body text-[14px] text-on-surface-variant">{g.assessment}</td>
                  <td className="p-sm">
                    <input 
                      type="number" min={0} max={100}
                      value={g.score}
                      onChange={(e) => handleScoreChange(g.id, Number(e.target.value))}
                      className="w-20 p-1.5 bg-surface-container-lowest border border-outline-variant/60 rounded text-[14px] font-bold text-on-surface outline-none focus:border-primary"
                    />
                  </td>
                  <td className="p-sm font-title text-[16px] font-bold text-primary">{g.grade}</td>
                  <td className="p-sm font-body text-[14px] text-on-surface-variant">{g.semester}</td>
                  <td className="p-sm pr-md">
                    <span className="px-2.5 py-1 bg-tertiary/10 text-tertiary font-label text-[11px] font-bold rounded-full">
                      {g.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
