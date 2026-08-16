import React, { useState } from 'react';
import { Search, Plus, BookOpen, X, CheckCircle2 } from 'lucide-react';
import { teacherActiveCourses } from '../../data/mockData';
import { TeacherCourse } from '../../types';

export const AdminCourses: React.FC = () => {
  const [courses, setCourses] = useState<TeacherCourse[]>(teacherActiveCourses);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [department, setDepartment] = useState('School of Computing');
  const [instructor, setInstructor] = useState('Dr. Alan Turing');

  const filteredCourses = courses.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    const newCourse: TeacherCourse = {
      id: `c_${Date.now()}`,
      name,
      code,
      department,
      instructor,
      schedule: 'Mon/Wed 2:00 PM',
      studentCount: 45,
      avgGrade: 'B+',
      status: 'Active'
    };

    setCourses([newCourse, ...courses]);
    setToastMessage(`Course "${code}: ${name}" created!`);
    setIsModalOpen(false);
    setName('');
    setCode('');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleArchiveCourse = (id: string) => {
    setCourses((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: 'Archived' } : c))
    );
    setToastMessage('Course archived.');
    setTimeout(() => setToastMessage(null), 2500);
  };

  return (
    <div className="space-y-lg max-w-7xl mx-auto pb-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-headline text-[24px] md:text-[32px] font-bold text-on-surface">
            Institutional Curriculum & Courses
          </h2>
          <p className="font-body text-[14px] text-on-surface-variant mt-1">
            Manage course offerings across all academic departments and degree programs.
          </p>
        </div>

        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-primary text-on-primary font-label text-[12px] font-semibold rounded-lg flex items-center gap-2 hover:bg-primary/90 transition-colors shadow-xs cursor-pointer self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Course</span>
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
          <span className="font-label text-[12px] text-on-surface-variant uppercase font-medium">Total Courses</span>
          <span className="font-display text-[28px] font-bold text-on-surface">320</span>
        </div>
        <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/30 shadow-card flex flex-col justify-between">
          <span className="font-label text-[12px] text-tertiary uppercase font-medium">Active Courses</span>
          <span className="font-display text-[28px] font-bold text-tertiary">295</span>
        </div>
        <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/30 shadow-card flex flex-col justify-between">
          <span className="font-label text-[12px] text-[#d97706] uppercase font-medium">Draft Curriculums</span>
          <span className="font-display text-[28px] font-bold text-[#d97706]">15</span>
        </div>
        <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/30 shadow-card flex flex-col justify-between">
          <span className="font-label text-[12px] text-outline uppercase font-medium">Archived</span>
          <span className="font-display text-[28px] font-bold text-outline">10</span>
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
            placeholder="Search courses by title or code..."
            className="w-full bg-surface-container-low border border-outline-variant/50 rounded-lg py-2 pl-10 pr-4 text-[14px] outline-none text-on-surface focus:border-primary"
          />
        </div>
      </div>

      {/* Course Table */}
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-bright border-b border-outline-variant/30 font-label text-[12px] uppercase text-on-surface-variant">
                <th className="p-sm pl-md">Code</th>
                <th className="p-sm">Course Title</th>
                <th className="p-sm">Department</th>
                <th className="p-sm">Lead Instructor</th>
                <th className="p-sm">Students</th>
                <th className="p-sm">Status</th>
                <th className="p-sm pr-md text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {filteredCourses.map((c) => (
                <tr key={c.id} className="hover:bg-surface-container-low transition-colors">
                  <td className="p-sm pl-md font-mono text-[13px] font-bold text-primary">{c.code}</td>
                  <td className="p-sm font-medium text-on-surface">{c.name}</td>
                  <td className="p-sm font-body text-[14px] text-on-surface-variant">{c.department}</td>
                  <td className="p-sm font-body text-[14px] text-on-surface">{c.instructor || 'Prof. Henderson'}</td>
                  <td className="p-sm font-body text-[14px] text-on-surface font-bold">{c.studentCount}</td>
                  <td className="p-sm">
                    <span className={`px-2.5 py-1 font-label text-[11px] font-bold rounded-full ${c.status === 'Archived' ? 'bg-surface-container-highest text-on-surface-variant' : 'bg-tertiary/10 text-tertiary'}`}>
                      {c.status || 'Active'}
                    </span>
                  </td>
                  <td className="p-sm pr-md text-right">
                    <button 
                      onClick={() => handleArchiveCourse(c.id)}
                      className="px-2.5 py-1 bg-surface-container-low text-on-surface font-label text-[12px] font-semibold rounded hover:bg-surface-container-high cursor-pointer"
                    >
                      {c.status === 'Archived' ? 'Restore' : 'Archive'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Course Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-md">
          <div className="bg-surface rounded-2xl border border-outline-variant shadow-floating w-full max-w-lg p-lg relative animate-fadeIn space-y-md">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 p-1 text-on-surface-variant">
              <X className="w-5 h-5" />
            </button>

            <form onSubmit={handleCreateCourse} className="space-y-md">
              <h3 className="font-title text-[22px] font-bold text-on-surface">Add Institutional Course</h3>

              <div className="space-y-xs">
                <label className="font-label text-[12px] text-on-surface font-medium">Course Title</label>
                <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Distributed Operating Systems" className="w-full p-2.5 bg-surface-container-lowest border border-outline-variant/60 rounded-lg text-[14px] outline-none" />
              </div>

              <div className="grid grid-cols-2 gap-md">
                <div className="space-y-xs">
                  <label className="font-label text-[12px] text-on-surface font-medium">Course Code</label>
                  <input type="text" required value={code} onChange={(e) => setCode(e.target.value)} placeholder="CS-420" className="w-full p-2.5 bg-surface-container-lowest border border-outline-variant/60 rounded-lg text-[14px] outline-none" />
                </div>
                <div className="space-y-xs">
                  <label className="font-label text-[12px] text-on-surface font-medium">Lead Instructor</label>
                  <input type="text" value={instructor} onChange={(e) => setInstructor(e.target.value)} placeholder="Dr. Alan Turing" className="w-full p-2.5 bg-surface-container-lowest border border-outline-variant/60 rounded-lg text-[14px] outline-none" />
                </div>
              </div>

              <div className="pt-sm border-t border-outline-variant/30 flex justify-end gap-sm">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-surface-container-low font-label text-[12px] font-semibold rounded-lg">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-primary text-on-primary font-label text-[12px] font-semibold rounded-lg cursor-pointer">Create Course</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
