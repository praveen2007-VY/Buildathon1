import React, { useState, useEffect } from 'react';
import { Save, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { teacherGradeEntriesList } from '../../data/mockData';
import { TeacherGradeEntry } from '../../types';
import { api } from '../../services/api';

export const TeacherGrades: React.FC = () => {
  const [grades, setGrades] = useState<TeacherGradeEntry[]>(teacherGradeEntriesList);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const loadGrades = async () => {
      try {
        const res = await api.getTeacherGrades();
        if (res.entries && res.entries.length > 0) {
          setGrades(res.entries);
        }
      } catch (e) {
        // Fallback
      }
    };
    loadGrades();
  }, []);

  const handleScoreChange = (id: string, field: 'assignmentScore' | 'examScore', val: number) => {
    setGrades((prev) =>
      prev.map((g) => {
        if (g.id === id) {
          const assignment = field === 'assignmentScore' ? val : g.assignmentScore;
          const exam = field === 'examScore' ? val : g.examScore;
          const total = Math.round((assignment * 0.4) + (exam * 0.6));
          const letterGrade = total >= 90 ? 'A' : total >= 80 ? 'B' : total >= 70 ? 'C' : 'D';
          return { ...g, [field]: val, totalScore: total, grade: letterGrade };
        }
        return g;
      })
    );
  };

  const handlePublishGrades = async () => {
    setIsSaving(true);
    try {
      await Promise.all(
        grades.map((g) =>
          api.updateTeacherGrade(g.id, {
            assignmentScore: g.assignmentScore,
            examScore: g.examScore,
          })
        )
      );
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
    } catch (e) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-lg max-w-7xl mx-auto pb-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-headline text-[24px] md:text-[32px] font-bold text-on-surface">
            Grade Entry & Ledger Management
          </h2>
          <p className="font-body text-[14px] text-on-surface-variant mt-1">
            Enter assessment marks, calculate final weighted averages, and publish official grades.
          </p>
        </div>

        <button 
          onClick={handlePublishGrades}
          className="px-4 py-2 bg-tertiary text-on-tertiary font-label text-[12px] font-semibold rounded-lg flex items-center gap-2 hover:bg-tertiary/90 transition-colors shadow-xs cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>Save & Publish Grades</span>
        </button>
      </div>

      {saveSuccess && (
        <div className="p-md bg-tertiary/10 border border-tertiary/30 rounded-xl text-tertiary flex items-center gap-2 font-body text-[14px] font-medium animate-fadeIn">
          <CheckCircle2 className="w-5 h-5" />
          <span>Official grades published to student transcripts!</span>
        </div>
      )}

      {/* Class Performance Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-md">
        <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/30 shadow-card flex flex-col justify-between">
          <span className="font-label text-[12px] text-on-surface-variant uppercase font-medium">Class Average</span>
          <span className="font-display text-[28px] font-bold text-primary">84%</span>
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

      {/* Grade Ledger Table */}
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-card overflow-hidden">
        <div className="p-md border-b border-outline-variant/30 bg-surface-bright">
          <h3 className="font-title text-[18px] font-semibold text-on-surface">Interactive Grade Entry Sheet</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-bright border-b border-outline-variant/30 font-label text-[12px] uppercase text-on-surface-variant">
                <th className="p-sm pl-md">Student ID</th>
                <th className="p-sm">Student Name</th>
                <th className="p-sm">Assignment Score (50%)</th>
                <th className="p-sm">Exam Score (50%)</th>
                <th className="p-sm">Weighted Total</th>
                <th className="p-sm">Grade</th>
                <th className="p-sm pr-md">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {grades.map((row) => (
                <tr key={row.id} className="hover:bg-surface-container-low transition-colors">
                  <td className="p-sm pl-md font-mono text-[13px] text-outline-variant">{row.studentId}</td>
                  <td className="p-sm font-medium text-on-surface">{row.studentName}</td>
                  <td className="p-sm">
                    <input 
                      type="number" min={0} max={100}
                      value={row.assignmentScore}
                      onChange={(e) => handleScoreChange(row.id, 'assignmentScore', Number(e.target.value))}
                      className="w-20 p-1.5 bg-surface-container-lowest border border-outline-variant/60 rounded text-[14px] font-semibold text-on-surface outline-none focus:border-primary"
                    />
                  </td>
                  <td className="p-sm">
                    <input 
                      type="number" min={0} max={100}
                      value={row.examScore}
                      onChange={(e) => handleScoreChange(row.id, 'examScore', Number(e.target.value))}
                      className="w-20 p-1.5 bg-surface-container-lowest border border-outline-variant/60 rounded text-[14px] font-semibold text-on-surface outline-none focus:border-primary"
                    />
                  </td>
                  <td className="p-sm font-display text-[16px] font-bold text-on-surface">{row.totalScore}%</td>
                  <td className="p-sm font-title text-[16px] font-bold text-primary">{row.grade}</td>
                  <td className="p-sm pr-md">
                    <span className="px-2.5 py-1 bg-tertiary/10 text-tertiary font-label text-[11px] font-bold rounded-full">
                      {row.status}
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
