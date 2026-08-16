import React, { useState, useEffect } from 'react';
import { Award, GraduationCap, Calendar } from 'lucide-react';
import { StudentGradeRecord } from '../../types';
import { api } from '../../services/api';

export const Grades: React.FC = () => {
  const [grades, setGrades] = useState<StudentGradeRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadGrades = async () => {
      setIsLoading(true);
      try {
        const res = await api.getStudentGrades();
        setGrades(res.grades || []);
      } catch (e) {
        setGrades([]);
      } finally {
        setIsLoading(false);
      }
    };
    loadGrades();
  }, []);

  const totalScoreSum = grades.reduce((acc, g) => acc + (g.score || 0), 0);
  const avgPercentage = grades.length > 0 ? Math.round(totalScoreSum / grades.length) : 0;
  let gpa = (avgPercentage / 25).toFixed(2);

  return (
    <div className="space-y-lg max-w-7xl mx-auto pb-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-headline text-[24px] md:text-[32px] font-bold text-on-surface">
            Grades & Academic Transcripts
          </h2>
          <p className="font-body text-[14px] text-on-surface-variant mt-1">
            Review detailed assessment grades, credits, and recorded academic ledger.
          </p>
        </div>
      </div>

      {/* Academic Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-md">
        <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/30 shadow-card flex flex-col justify-between">
          <span className="font-label text-[12px] text-on-surface-variant uppercase font-medium">Average Score</span>
          <span className="font-display text-[32px] font-bold text-primary">{avgPercentage}%</span>
        </div>
        <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/30 shadow-card flex flex-col justify-between">
          <span className="font-label text-[12px] text-on-surface-variant uppercase font-medium">Estimated GPA</span>
          <span className="font-display text-[32px] font-bold text-tertiary">{gpa} / 4.0</span>
        </div>
        <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/30 shadow-card flex flex-col justify-between">
          <span className="font-label text-[12px] text-on-surface-variant uppercase font-medium">Assessments Recorded</span>
          <span className="font-display text-[32px] font-bold text-secondary">{grades.length} Assessments</span>
        </div>
        <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/30 shadow-card flex flex-col justify-between">
          <span className="font-label text-[12px] text-on-surface-variant uppercase font-medium">Passing Rate</span>
          <span className="font-display text-[32px] font-bold text-on-surface">
            {grades.length > 0 ? `${Math.round((grades.filter(g => (g.score || 0) >= 60).length / grades.length) * 100)}%` : 'N/A'}
          </span>
        </div>
      </div>

      {/* Grade Records Table */}
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 p-md shadow-card overflow-hidden">
        <h3 className="font-title text-[18px] font-semibold text-on-surface mb-md">Assessment Grade Ledger</h3>
        {grades.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-bright border-b border-outline-variant/30">
                  <th className="p-sm pl-md font-label text-[12px] text-on-surface-variant uppercase font-medium">Subject</th>
                  <th className="p-sm font-label text-[12px] text-on-surface-variant uppercase font-medium">Assessment / Code</th>
                  <th className="p-sm font-label text-[12px] text-on-surface-variant uppercase font-medium">Score</th>
                  <th className="p-sm font-label text-[12px] text-on-surface-variant uppercase font-medium">Grade</th>
                  <th className="p-sm pr-md font-label text-[12px] text-on-surface-variant uppercase font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20">
                {grades.map((record, idx) => (
                  <tr key={record.id || idx} className="hover:bg-surface-container-low transition-colors">
                    <td className="p-sm pl-md font-body text-[14px] font-medium text-on-surface">
                      {record.subject}
                    </td>
                    <td className="p-sm font-body text-[14px] text-on-surface-variant">
                      {record.code || record.assessment || 'Test Assessment'}
                    </td>
                    <td className="p-sm font-body text-[14px] font-bold text-on-surface">
                      {record.score} %
                    </td>
                    <td className="p-sm font-body text-[14px] font-bold text-primary">
                      {record.letterGrade || record.grade || 'B'}
                    </td>
                    <td className="p-sm pr-md">
                      <span className={`px-2.5 py-1 font-label text-[11px] font-bold rounded-full ${(record.status === 'Passed' || record.status === 'Pass') ? 'bg-tertiary/10 text-tertiary' : 'bg-error/10 text-error'}`}>
                        {record.status || 'Completed'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-xl text-center text-on-surface-variant font-body text-[14px]">
            No assessment grades recorded yet. Take practice or assessment tests to record your grades.
          </div>
        )}
      </div>
    </div>
  );
};
