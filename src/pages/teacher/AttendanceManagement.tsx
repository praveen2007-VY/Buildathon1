import React, { useState } from 'react';
import { UserCheck, Save, CheckCircle2, AlertTriangle, Clock } from 'lucide-react';
import { teacherAttendanceStudents } from '../../data/mockData';
import { TeacherAttendanceRecord } from '../../types';

export const AttendanceManagement: React.FC = () => {
  const [students, setStudents] = useState<TeacherAttendanceRecord[]>(teacherAttendanceStudents);
  const [selectedCourse, setSelectedCourse] = useState('Advanced Calculus (MATH-401)');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const presentCount = students.filter((s) => s.status === 'Present').length;
  const absentCount = students.filter((s) => s.status === 'Absent').length;
  const lateCount = students.filter((s) => s.status === 'Late').length;
  const attendanceRate = Math.round((presentCount / students.length) * 100);

  const handleMarkStatus = (studentId: string, status: 'Present' | 'Absent' | 'Late') => {
    setStudents((prev) =>
      prev.map((s) => (s.studentId === studentId ? { ...s, status } : s))
    );
  };

  const handleMarkAllPresent = () => {
    setStudents((prev) => prev.map((s) => ({ ...s, status: 'Present' })));
  };

  const handleSaveAttendance = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  return (
    <div className="space-y-lg max-w-7xl mx-auto pb-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-headline text-[24px] md:text-[32px] font-bold text-on-surface">
            Attendance Management
          </h2>
          <p className="font-body text-[14px] text-on-surface-variant mt-1">
            Mark live roll call attendance and update class presence logs.
          </p>
        </div>

        <div className="flex gap-2">
          <button 
            onClick={handleMarkAllPresent}
            className="px-3.5 py-2 bg-surface-container-lowest border border-outline-variant text-on-surface font-label text-[12px] font-semibold rounded-lg hover:bg-surface-container-low transition-colors shadow-xs cursor-pointer"
          >
            Mark All Present
          </button>
          <button 
            onClick={handleSaveAttendance}
            className="px-4 py-2 bg-primary text-on-primary font-label text-[12px] font-semibold rounded-lg flex items-center gap-2 hover:bg-primary/90 transition-colors shadow-xs cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save Attendance</span>
          </button>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-md bg-tertiary/10 border border-tertiary/30 rounded-xl text-tertiary flex items-center gap-2 font-body text-[14px] font-medium animate-fadeIn">
          <CheckCircle2 className="w-5 h-5" />
          <span>Attendance log saved successfully! Roster records updated.</span>
        </div>
      )}

      {/* Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-md">
        <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/30 shadow-card flex flex-col justify-between">
          <span className="font-label text-[12px] text-on-surface-variant uppercase font-medium">Class Today</span>
          <span className="font-display text-[28px] font-bold text-on-surface">MATH-401</span>
        </div>
        <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/30 shadow-card flex flex-col justify-between">
          <span className="font-label text-[12px] text-on-surface-variant uppercase font-medium">Total Roster</span>
          <span className="font-display text-[28px] font-bold text-on-surface">{students.length}</span>
        </div>
        <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/30 shadow-card flex flex-col justify-between">
          <span className="font-label text-[12px] text-tertiary uppercase font-medium">Present</span>
          <span className="font-display text-[28px] font-bold text-tertiary">{presentCount}</span>
        </div>
        <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/30 shadow-card flex flex-col justify-between">
          <span className="font-label text-[12px] text-error uppercase font-medium">Absent</span>
          <span className="font-display text-[28px] font-bold text-error">{absentCount}</span>
        </div>
        <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/30 shadow-card flex flex-col justify-between">
          <span className="font-label text-[12px] text-primary uppercase font-medium">Attendance Rate</span>
          <span className="font-display text-[28px] font-bold text-primary">{attendanceRate}%</span>
        </div>
      </div>

      {/* Student Attendance Table */}
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-card overflow-hidden">
        <div className="p-md border-b border-outline-variant/30 bg-surface-bright flex justify-between items-center">
          <h3 className="font-title text-[18px] font-semibold text-on-surface">Live Class Roll Call</h3>
          <select 
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="bg-surface-container-lowest border border-outline-variant/60 rounded-lg px-3 py-1.5 text-[13px] outline-none font-medium cursor-pointer"
          >
            <option>Advanced Calculus (MATH-401)</option>
            <option>Linear Algebra (MATH-302)</option>
            <option>Discrete Mathematics (MATH-205)</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-bright border-b border-outline-variant/30 font-label text-[12px] uppercase text-on-surface-variant">
                <th className="p-sm pl-md">Student ID</th>
                <th className="p-sm">Student Name</th>
                <th className="p-sm">Overall Attendance</th>
                <th className="p-sm pr-md text-right">Mark Today's Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {students.map((student) => (
                <tr key={student.studentId} className="hover:bg-surface-container-low transition-colors">
                  <td className="p-sm pl-md font-mono text-[13px] text-outline-variant">{student.studentId}</td>
                  <td className="p-sm font-medium text-on-surface">{student.studentName}</td>
                  <td className="p-sm font-bold text-on-surface">{student.attendancePercentage}%</td>
                  <td className="p-sm pr-md text-right">
                    <div className="inline-flex bg-surface-container-low p-1 rounded-lg gap-1 border border-outline-variant/30">
                      <button
                        onClick={() => handleMarkStatus(student.studentId, 'Present')}
                        className={`px-3 py-1 font-label text-[12px] font-bold rounded transition-all cursor-pointer ${
                          student.status === 'Present'
                            ? 'bg-tertiary text-on-tertiary shadow-xs'
                            : 'text-on-surface-variant hover:text-on-surface'
                        }`}
                      >
                        Present
                      </button>
                      <button
                        onClick={() => handleMarkStatus(student.studentId, 'Absent')}
                        className={`px-3 py-1 font-label text-[12px] font-bold rounded transition-all cursor-pointer ${
                          student.status === 'Absent'
                            ? 'bg-error text-on-error shadow-xs'
                            : 'text-on-surface-variant hover:text-on-surface'
                        }`}
                      >
                        Absent
                      </button>
                      <button
                        onClick={() => handleMarkStatus(student.studentId, 'Late')}
                        className={`px-3 py-1 font-label text-[12px] font-bold rounded transition-all cursor-pointer ${
                          student.status === 'Late'
                            ? 'bg-[#d97706] text-white shadow-xs'
                            : 'text-on-surface-variant hover:text-on-surface'
                        }`}
                      >
                        Late
                      </button>
                    </div>
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
