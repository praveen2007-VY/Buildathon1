import React, { useState } from 'react';
import { Search, Plus, BookOpen, Users, Clock, Edit, X, CheckCircle2 } from 'lucide-react';
import { teacherActiveCourses } from '../../data/mockData';
import { TeacherCourse } from '../../types';

export const TeacherCourses: React.FC = () => {
  const [courses, setCourses] = useState<TeacherCourse[]>(teacherActiveCourses);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [createdSuccess, setCreatedSuccess] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [department, setDepartment] = useState('Applied Mathematics');
  const [schedule, setSchedule] = useState('');
  const [credits, setCredits] = useState(3);

  const filteredCourses = courses.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    const newCourse: TeacherCourse = {
      id: `tc_${Date.now()}`,
      name,
      code,
      department,
      schedule,
      credits,
      studentCount: 0,
      avgGrade: 'N/A',
      status: 'Active'
    };

    setCourses([newCourse, ...courses]);
    setCreatedSuccess(true);
    setTimeout(() => {
      setCreatedSuccess(false);
      setIsModalOpen(false);
      setName('');
      setCode('');
      setSchedule('');
    }, 1500);
  };

  return (
    <div className="space-y-lg max-w-7xl mx-auto pb-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-headline text-[24px] md:text-[32px] font-bold text-on-surface">
            My Teaching Courses
          </h2>
          <p className="font-body text-[14px] text-on-surface-variant mt-1">
            Manage your assigned course curriculums, student rosters, and schedules.
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

      {/* Search Bar */}
      <div className="bg-surface-container-lowest rounded-xl p-md border border-outline-variant/30 shadow-card flex items-center">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search courses by name or code..."
            className="w-full bg-surface-container-low border border-outline-variant/50 rounded-lg py-2 pl-10 pr-4 text-[14px] outline-none text-on-surface focus:border-primary"
          />
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
        {filteredCourses.map((course) => (
          <div 
            key={course.id}
            className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 p-lg shadow-card flex flex-col justify-between gap-md hover:shadow-floating transition-all duration-300"
          >
            <div>
              <div className="flex items-center justify-between mb-xs">
                <span className="font-label text-[12px] font-bold text-primary uppercase">{course.code}</span>
                <span className="px-2.5 py-0.5 bg-tertiary/10 text-tertiary font-label text-[11px] font-bold rounded-full">
                  {course.status || 'Active'}
                </span>
              </div>
              <h3 className="font-title text-[20px] font-bold text-on-surface">{course.name}</h3>
              <p className="font-body text-[14px] text-on-surface-variant mt-1">{course.department || 'School of Computing'}</p>
            </div>

            <div className="grid grid-cols-3 gap-sm py-sm border-y border-outline-variant/20 text-center">
              <div>
                <p className="font-label text-[11px] text-on-surface-variant uppercase">Students</p>
                <p className="font-body font-bold text-on-surface text-[16px]">{course.studentCount}</p>
              </div>
              <div>
                <p className="font-label text-[11px] text-on-surface-variant uppercase">Avg Grade</p>
                <p className="font-body font-bold text-primary text-[16px]">{course.avgGrade}</p>
              </div>
              <div>
                <p className="font-label text-[11px] text-on-surface-variant uppercase">Credits</p>
                <p className="font-body font-bold text-on-surface text-[16px]">{course.credits || 3}</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-on-surface-variant font-label text-[12px]">
                <Clock className="w-3.5 h-3.5" />
                <span>{course.schedule}</span>
              </div>

              <div className="flex gap-2">
                <button className="px-3 py-1.5 bg-surface-container-low text-on-surface font-label text-[12px] font-semibold rounded-md hover:bg-surface-container-high transition-colors">
                  Edit
                </button>
                <button className="px-3 py-1.5 bg-primary text-on-primary font-label text-[12px] font-semibold rounded-md hover:bg-primary/90 transition-colors cursor-pointer shadow-xs">
                  Manage Course
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Course Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-md">
          <div className="bg-surface rounded-2xl border border-outline-variant shadow-floating w-full max-w-lg p-lg relative animate-fadeIn space-y-md">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-1 text-on-surface-variant hover:text-on-surface rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            {createdSuccess ? (
              <div className="py-xl text-center space-y-md">
                <CheckCircle2 className="w-12 h-12 text-tertiary mx-auto" />
                <h3 className="font-headline text-[22px] font-bold text-on-surface">Course Created Successfully!</h3>
                <p className="font-body text-[14px] text-on-surface-variant">The course has been added to your teaching portal.</p>
              </div>
            ) : (
              <form onSubmit={handleCreateCourse} className="space-y-md">
                <h3 className="font-title text-[22px] font-bold text-on-surface">Create New Course</h3>

                <div className="space-y-xs">
                  <label className="font-label text-[12px] text-on-surface font-medium">Course Title</label>
                  <input 
                    type="text" 
                    required 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    placeholder="e.g. Real-Time Distributed Systems"
                    className="w-full p-2.5 bg-surface-container-lowest border border-outline-variant/60 rounded-lg text-[14px] text-on-surface outline-none focus:border-primary"
                  />
                </div>

                <div className="grid grid-cols-2 gap-md">
                  <div className="space-y-xs">
                    <label className="font-label text-[12px] text-on-surface font-medium">Course Code</label>
                    <input 
                      type="text" 
                      required 
                      value={code} 
                      onChange={(e) => setCode(e.target.value)} 
                      placeholder="e.g. CS-450"
                      className="w-full p-2.5 bg-surface-container-lowest border border-outline-variant/60 rounded-lg text-[14px] text-on-surface outline-none focus:border-primary"
                    />
                  </div>

                  <div className="space-y-xs">
                    <label className="font-label text-[12px] text-on-surface font-medium">Credits</label>
                    <input 
                      type="number" 
                      min={1} max={6}
                      value={credits} 
                      onChange={(e) => setCredits(Number(e.target.value))} 
                      className="w-full p-2.5 bg-surface-container-lowest border border-outline-variant/60 rounded-lg text-[14px] text-on-surface outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <div className="space-y-xs">
                  <label className="font-label text-[12px] text-on-surface font-medium">Class Schedule</label>
                  <input 
                    type="text" 
                    required 
                    value={schedule} 
                    onChange={(e) => setSchedule(e.target.value)} 
                    placeholder="e.g. Mon/Wed 10:00 AM - 11:30 AM"
                    className="w-full p-2.5 bg-surface-container-lowest border border-outline-variant/60 rounded-lg text-[14px] text-on-surface outline-none focus:border-primary"
                  />
                </div>

                <div className="pt-sm border-t border-outline-variant/30 flex justify-end gap-sm">
                  <button 
                    type="button" 
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 bg-surface-container-low text-on-surface font-label text-[12px] font-semibold rounded-lg"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="px-4 py-2 bg-primary text-on-primary font-label text-[12px] font-semibold rounded-lg shadow-xs cursor-pointer"
                  >
                    Create Course
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
