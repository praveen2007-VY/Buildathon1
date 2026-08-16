import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, BookOpen, Clock, PlayCircle, Filter } from 'lucide-react';
import { studentEnrolledCourses } from '../../data/mockData';

export const MyCourses: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  const filteredCourses = useMemo(() => {
    return studentEnrolledCourses.filter((course) => {
      const matchesSearch = 
        course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (course.instructor && course.instructor.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
      const matchesStatus = statusFilter === 'All' || course.status === statusFilter;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [searchQuery, selectedCategory, statusFilter]);

  return (
    <div className="space-y-lg max-w-7xl mx-auto pb-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-headline text-[24px] md:text-[32px] font-bold text-on-surface">
            My Enrolled Courses
          </h2>
          <p className="font-body text-[14px] text-on-surface-variant mt-1">
            Track your current academic course progress and continue learning.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-surface-container-lowest rounded-xl p-md border border-outline-variant/30 shadow-card flex flex-wrap items-center gap-md">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search enrolled courses or instructors..."
            className="w-full bg-surface-container-low border border-outline-variant/50 rounded-lg py-2 pl-10 pr-4 text-[14px] outline-none text-on-surface focus:border-primary"
          />
        </div>

        <div className="flex items-center gap-sm">
          <Filter className="w-4 h-4 text-on-surface-variant" />
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-surface-container-low border border-outline-variant/50 rounded-lg px-3 py-2 text-[14px] outline-none text-on-surface cursor-pointer"
          >
            <option value="All">All Categories</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Computer Science">Computer Science</option>
          </select>

          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-surface-container-low border border-outline-variant/50 rounded-lg px-3 py-2 text-[14px] outline-none text-on-surface cursor-pointer"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Completed">Completed</option>
          </select>
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
                <span className="font-label text-[12px] font-semibold text-primary uppercase">
                  {course.code}
                </span>
                {course.isRisk && (
                  <span className="px-2 py-0.5 bg-error/10 text-error font-label text-[11px] font-bold rounded-full">
                    Attention Needed
                  </span>
                )}
              </div>

              <h3 className="font-title text-[18px] font-bold text-on-surface">
                {course.name}
              </h3>
              <p className="font-body text-[14px] text-on-surface-variant mt-1">
                Instructor: {course.instructor}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="space-y-xs">
              <div className="flex justify-between font-label text-[12px] font-medium">
                <span className="text-on-surface-variant">Course Completion</span>
                <span className={course.isRisk ? 'text-error font-semibold' : 'text-on-surface font-semibold'}>
                  {course.progress}% (Grade: {course.grade})
                </span>
              </div>
              <div className="w-full bg-surface-container-high rounded-full h-2.5">
                <div 
                  className={`${course.color} h-2.5 rounded-full transition-all duration-500`}
                  style={{ width: `${course.progress}%` }}
                />
              </div>
            </div>

            {/* Footer Row */}
            <div className="flex items-center justify-between pt-md border-t border-outline-variant/20">
              <div className="flex items-center gap-1.5 text-on-surface-variant font-label text-[12px]">
                <Clock className="w-3.5 h-3.5" />
                <span>Accessed {course.lastAccessed}</span>
              </div>

              <div className="flex items-center gap-2">
                <button 
                  onClick={() => navigate('/courses/cs-ml-101')}
                  className="px-3 py-1.5 bg-surface-container-low text-on-surface font-label text-[12px] font-semibold rounded-md hover:bg-surface-container-high transition-colors"
                >
                  Details
                </button>
                <button 
                  onClick={() => navigate('/courses/cs-ml-101')}
                  className="px-3 py-1.5 bg-primary text-on-primary font-label text-[12px] font-semibold rounded-md hover:bg-primary/90 transition-colors flex items-center gap-1 cursor-pointer shadow-xs"
                >
                  <PlayCircle className="w-3.5 h-3.5" />
                  <span>Continue</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
