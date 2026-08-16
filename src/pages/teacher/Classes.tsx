import React, { useState } from 'react';
import { Users, MapPin, Clock, Search, ChevronRight, UserCheck, BarChart2 } from 'lucide-react';
import { teacherClassesList, teacherAttendanceStudents } from '../../data/mockData';
import { TeacherClass } from '../../types';

export const Classes: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState<TeacherClass>(teacherClassesList[0]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredClasses = teacherClassesList.filter((cls) =>
    cls.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cls.section.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-lg max-w-7xl mx-auto pb-8">
      {/* Header */}
      <div>
        <h2 className="font-headline text-[24px] md:text-[32px] font-bold text-on-surface">
          Active Classrooms & Sections
        </h2>
        <p className="font-body text-[14px] text-on-surface-variant mt-1">
          View assigned classroom sections, active student rosters, and performance benchmarks.
        </p>
      </div>

      {/* Main Grid: Class List & Class Detail View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-lg">
        {/* Left Column: Class Roster Cards */}
        <div className="lg:col-span-5 space-y-md">
          <div className="bg-surface-container-lowest rounded-xl p-sm border border-outline-variant/30 shadow-card flex items-center">
            <Search className="w-4 h-4 text-on-surface-variant ml-2 mr-2" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by course or section..."
              className="w-full bg-transparent border-none py-1.5 text-[14px] outline-none text-on-surface"
            />
          </div>

          <div className="space-y-sm">
            {filteredClasses.map((cls) => (
              <div 
                key={cls.id}
                onClick={() => setSelectedClass(cls)}
                className={`p-md rounded-xl border transition-all duration-200 cursor-pointer shadow-card ${
                  selectedClass.id === cls.id
                    ? 'bg-primary-container/10 border-primary text-on-surface'
                    : 'bg-surface-container-lowest border-outline-variant/30 hover:bg-surface-container-low'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-label text-[12px] font-bold text-primary uppercase">{cls.section}</span>
                    <h3 className="font-title text-[18px] font-bold text-on-surface">{cls.courseName}</h3>
                  </div>
                  <ChevronRight className="w-5 h-5 text-on-surface-variant" />
                </div>

                <div className="flex items-center gap-md mt-sm text-[13px] text-on-surface-variant">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4 text-primary" />
                    <span>{cls.studentCount} Students</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-tertiary" />
                    <span>{cls.room}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Selected Class Analytics & Roster */}
        <div className="lg:col-span-7 bg-surface-container-lowest rounded-xl border border-outline-variant/30 p-lg shadow-card space-y-md">
          <div className="flex justify-between items-start border-b border-outline-variant/20 pb-md">
            <div>
              <span className="px-3 py-1 bg-primary/10 text-primary font-label text-[12px] font-bold rounded-full uppercase">
                {selectedClass.section} • {selectedClass.courseCode}
              </span>
              <h3 className="font-headline text-[24px] font-bold text-on-surface mt-2">{selectedClass.courseName}</h3>
              <p className="font-body text-[14px] text-on-surface-variant">{selectedClass.room} • {selectedClass.schedule}</p>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-md">
            <div className="p-md rounded-lg bg-surface-container-low border border-outline-variant/30 text-center">
              <span className="font-label text-[11px] text-on-surface-variant uppercase font-medium">Class Roster</span>
              <p className="font-display text-[24px] font-bold text-on-surface mt-1">{selectedClass.studentCount}</p>
            </div>
            <div className="p-md rounded-lg bg-surface-container-low border border-outline-variant/30 text-center">
              <span className="font-label text-[11px] text-on-surface-variant uppercase font-medium">Avg Score</span>
              <p className="font-display text-[24px] font-bold text-primary mt-1">{selectedClass.avgPerformance}%</p>
            </div>
            <div className="p-md rounded-lg bg-surface-container-low border border-outline-variant/30 text-center">
              <span className="font-label text-[11px] text-on-surface-variant uppercase font-medium">Attendance</span>
              <p className="font-display text-[24px] font-bold text-tertiary mt-1">{selectedClass.attendanceRate}%</p>
            </div>
          </div>

          {/* Roster Table */}
          <div>
            <h4 className="font-title text-[16px] font-semibold text-on-surface mb-sm">Section Student Roster</h4>
            <div className="overflow-x-auto border border-outline-variant/30 rounded-lg">
              <table className="w-full text-left border-collapse text-[14px]">
                <thead>
                  <tr className="bg-surface-bright border-b border-outline-variant/30 font-label text-[12px] uppercase text-on-surface-variant">
                    <th className="p-sm pl-md">Student ID</th>
                    <th className="p-sm">Name</th>
                    <th className="p-sm">Status</th>
                    <th className="p-sm pr-md">Attendance Rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/20">
                  {teacherAttendanceStudents.map((std) => (
                    <tr key={std.studentId} className="hover:bg-surface-container-low transition-colors">
                      <td className="p-sm pl-md font-mono text-[13px] text-outline-variant">{std.studentId}</td>
                      <td className="p-sm font-medium text-on-surface">{std.studentName}</td>
                      <td className="p-sm">
                        <span className={`px-2 py-0.5 font-label text-[11px] font-bold rounded-full ${std.status === 'Present' ? 'bg-tertiary/10 text-tertiary' : 'bg-error/10 text-error'}`}>
                          {std.status}
                        </span>
                      </td>
                      <td className="p-sm pr-md font-bold text-on-surface">{std.attendancePercentage}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
