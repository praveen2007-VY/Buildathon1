import React, { useState } from 'react';
import { Plus, Users, MapPin, Clock, X, CheckCircle2 } from 'lucide-react';
import { teacherClassesList } from '../../data/mockData';
import { TeacherClass } from '../../types';

export const AdminClasses: React.FC = () => {
  const [classes, setClasses] = useState<TeacherClass[]>(teacherClassesList);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form State
  const [courseName, setCourseName] = useState('Advanced Calculus');
  const [section, setSection] = useState('Sec A03');
  const [instructor, setInstructor] = useState('Prof. Henderson');
  const [room, setRoom] = useState('Hall B - Room 306');
  const [schedule, setSchedule] = useState('Mon/Wed 11:00 AM');

  const handleCreateClass = (e: React.FormEvent) => {
    e.preventDefault();
    const newClass: TeacherClass = {
      id: `cls_${Date.now()}`,
      courseName,
      courseCode: 'MATH-401',
      section,
      instructor,
      studentCount: 20,
      capacity: 30,
      room,
      schedule,
      status: 'Active',
      avgPerformance: 85,
      attendanceRate: 95
    };

    setClasses([newClass, ...classes]);
    setToastMessage(`Section "${section}" created successfully!`);
    setIsModalOpen(false);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="space-y-lg max-w-7xl mx-auto pb-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-headline text-[24px] md:text-[32px] font-bold text-on-surface">
            Classrooms & Section Schedules
          </h2>
          <p className="font-body text-[14px] text-on-surface-variant mt-1">
            Oversee classroom allocations, section capacity, and instructor assignments.
          </p>
        </div>

        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-primary text-on-primary font-label text-[12px] font-semibold rounded-lg flex items-center gap-2 hover:bg-primary/90 transition-colors shadow-xs cursor-pointer self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Class Section</span>
        </button>
      </div>

      {toastMessage && (
        <div className="p-md bg-tertiary/10 border border-tertiary/30 rounded-xl text-tertiary flex items-center gap-2 font-body text-[14px] font-medium animate-fadeIn">
          <CheckCircle2 className="w-5 h-5" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-md">
        <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/30 shadow-card flex flex-col justify-between">
          <span className="font-label text-[12px] text-on-surface-variant uppercase font-medium">Total Sections</span>
          <span className="font-display text-[28px] font-bold text-on-surface">140</span>
        </div>
        <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/30 shadow-card flex flex-col justify-between">
          <span className="font-label text-[12px] text-tertiary uppercase font-medium">Active Classes</span>
          <span className="font-display text-[28px] font-bold text-tertiary">132</span>
        </div>
        <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/30 shadow-card flex flex-col justify-between">
          <span className="font-label text-[12px] text-primary uppercase font-medium">Total Enrolled</span>
          <span className="font-display text-[28px] font-bold text-primary">12,450</span>
        </div>
        <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/30 shadow-card flex flex-col justify-between">
          <span className="font-label text-[12px] text-secondary uppercase font-medium">Classrooms</span>
          <span className="font-display text-[28px] font-bold text-secondary">48</span>
        </div>
      </div>

      {/* Class Sections Table */}
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-bright border-b border-outline-variant/30 font-label text-[12px] uppercase text-on-surface-variant">
                <th className="p-sm pl-md">Section</th>
                <th className="p-sm">Course Name</th>
                <th className="p-sm">Instructor</th>
                <th className="p-sm">Enrolled / Cap</th>
                <th className="p-sm">Venue</th>
                <th className="p-sm">Schedule</th>
                <th className="p-sm pr-md font-label text-[12px] uppercase text-on-surface-variant">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {classes.map((cls) => (
                <tr key={cls.id} className="hover:bg-surface-container-low transition-colors">
                  <td className="p-sm pl-md font-mono text-[13px] font-bold text-primary">{cls.section}</td>
                  <td className="p-sm font-medium text-on-surface">{cls.courseName}</td>
                  <td className="p-sm font-body text-[14px] text-on-surface-variant">{cls.instructor || 'Prof. Henderson'}</td>
                  <td className="p-sm font-body text-[14px] font-bold text-on-surface">{cls.studentCount} / {cls.capacity || 30}</td>
                  <td className="p-sm font-body text-[14px] text-on-surface-variant">{cls.room}</td>
                  <td className="p-sm font-body text-[14px] text-on-surface-variant">{cls.schedule}</td>
                  <td className="p-sm pr-md">
                    <span className="px-2.5 py-1 bg-tertiary/10 text-tertiary font-label text-[11px] font-bold rounded-full">
                      {cls.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Class Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-md">
          <div className="bg-surface rounded-2xl border border-outline-variant shadow-floating w-full max-w-lg p-lg relative animate-fadeIn space-y-md">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 p-1 text-on-surface-variant">
              <X className="w-5 h-5" />
            </button>

            <form onSubmit={handleCreateClass} className="space-y-md">
              <h3 className="font-title text-[22px] font-bold text-on-surface">Create Class Section</h3>

              <div className="grid grid-cols-2 gap-md">
                <div className="space-y-xs">
                  <label className="font-label text-[12px] text-on-surface font-medium">Course</label>
                  <input type="text" required value={courseName} onChange={(e) => setCourseName(e.target.value)} className="w-full p-2.5 bg-surface-container-lowest border border-outline-variant/60 rounded-lg text-[14px] outline-none" />
                </div>
                <div className="space-y-xs">
                  <label className="font-label text-[12px] text-on-surface font-medium">Section Code</label>
                  <input type="text" required value={section} onChange={(e) => setSection(e.target.value)} className="w-full p-2.5 bg-surface-container-lowest border border-outline-variant/60 rounded-lg text-[14px] outline-none" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-md">
                <div className="space-y-xs">
                  <label className="font-label text-[12px] text-on-surface font-medium">Venue Room</label>
                  <input type="text" required value={room} onChange={(e) => setRoom(e.target.value)} className="w-full p-2.5 bg-surface-container-lowest border border-outline-variant/60 rounded-lg text-[14px] outline-none" />
                </div>
                <div className="space-y-xs">
                  <label className="font-label text-[12px] text-on-surface font-medium">Schedule</label>
                  <input type="text" required value={schedule} onChange={(e) => setSchedule(e.target.value)} className="w-full p-2.5 bg-surface-container-lowest border border-outline-variant/60 rounded-lg text-[14px] outline-none" />
                </div>
              </div>

              <div className="pt-sm border-t border-outline-variant/30 flex justify-end gap-sm">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-surface-container-low font-label text-[12px] font-semibold rounded-lg">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-primary text-on-primary font-label text-[12px] font-semibold rounded-lg cursor-pointer">Create Section</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
