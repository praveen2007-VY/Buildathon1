import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, BookOpen, Clock, PlayCircle, Filter, Sparkles, PlusCircle, CheckCircle } from 'lucide-react';
import { api } from '../../services/api';
import { CourseProgressItem } from '../../types';

export const MyCourses: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'enrolled' | 'discover'>('enrolled');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [enrolledCourses, setEnrolledCourses] = useState<CourseProgressItem[]>([]);
  const [catalogCourses, setCatalogCourses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [studentRes, catalogRes] = await Promise.all([
        api.getStudentCourses(),
        api.getCourses()
      ]);
      setEnrolledCourses(studentRes.courses || []);
      setCatalogCourses(catalogRes.courses || []);
    } catch (e) {
      setEnrolledCourses([]);
      setCatalogCourses([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleEnroll = async (courseId: string, courseName: string) => {
    try {
      await api.enrollCourse(courseId);
      setActionMessage(`Successfully enrolled in "${courseName}"!`);
      setTimeout(() => setActionMessage(null), 3000);
      loadData();
    } catch (err: any) {
      setActionMessage(err.message || 'Enrollment failed.');
      setTimeout(() => setActionMessage(null), 3000);
    }
  };

  const filteredEnrolled = useMemo(() => {
    return enrolledCourses.filter((course) => {
      const matchesSearch = 
        course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.code.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [enrolledCourses, searchQuery, selectedCategory]);

  const filteredCatalog = useMemo(() => {
    return catalogCourses.filter((course) => {
      const matchesSearch = 
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [catalogCourses, searchQuery, selectedCategory]);

  return (
    <div className="space-y-lg max-w-7xl mx-auto pb-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-headline text-[24px] md:text-[32px] font-bold text-on-surface">
            Student Course Hub
          </h2>
          <p className="font-body text-[14px] text-on-surface-variant mt-1">
            Access your active enrolled courses or discover new academic course modules.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex p-1 bg-surface-container-low rounded-xl border border-outline-variant/30 gap-1 self-start md:self-auto">
          <button
            onClick={() => setActiveTab('enrolled')}
            className={`px-md py-2 font-label text-[13px] font-semibold rounded-lg transition-all cursor-pointer ${
              activeTab === 'enrolled'
                ? 'bg-primary text-on-primary shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            My Enrolled ({enrolledCourses.length})
          </button>
          <button
            onClick={() => setActiveTab('discover')}
            className={`px-md py-2 font-label text-[13px] font-semibold rounded-lg transition-all cursor-pointer ${
              activeTab === 'discover'
                ? 'bg-primary text-on-primary shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Discover Courses Catalog ({catalogCourses.length})
          </button>
        </div>
      </div>

      {actionMessage && (
        <div className="p-md bg-tertiary/10 border border-tertiary/30 rounded-xl text-tertiary font-body text-[14px] font-medium flex items-center gap-2 animate-fadeIn">
          <CheckCircle className="w-5 h-5 shrink-0" />
          <span>{actionMessage}</span>
        </div>
      )}

      {/* Filter Bar */}
      <div className="bg-surface-container-lowest rounded-xl p-md border border-outline-variant/30 shadow-card flex flex-wrap items-center gap-md">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={activeTab === 'enrolled' ? "Search enrolled courses..." : "Search course catalog, code, or instructors..."}
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
            <option value="Engineering">Engineering</option>
            <option value="Data Science">Data Science</option>
          </select>
        </div>
      </div>

      {/* Content Grid */}
      {activeTab === 'enrolled' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
          {filteredEnrolled.length > 0 ? (
            filteredEnrolled.map((course) => (
              <div 
                key={course.id}
                className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 p-lg shadow-card flex flex-col justify-between gap-md hover:shadow-floating transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-xs">
                    <span className="font-label text-[12px] font-semibold text-primary uppercase">
                      {course.code}
                    </span>
                    <span className="px-2.5 py-0.5 bg-tertiary/10 text-tertiary font-label text-[11px] font-bold rounded-full">
                      {course.status || 'Active'}
                    </span>
                  </div>

                  <h3 className="font-title text-[18px] font-bold text-on-surface">
                    {course.name}
                  </h3>
                  <p className="font-body text-[14px] text-on-surface-variant mt-1">
                    Instructor: {course.instructor || 'Faculty Instructor'}
                  </p>
                </div>

                {/* Progress Bar */}
                <div className="space-y-xs">
                  <div className="flex justify-between font-label text-[12px] font-medium">
                    <span className="text-on-surface-variant">Course Completion</span>
                    <span className="text-on-surface font-semibold">
                      {course.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-surface-container-high rounded-full h-2.5">
                    <div 
                      className="bg-primary h-2.5 rounded-full transition-all duration-500"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>

                {/* Footer Row */}
                <div className="flex items-center justify-between pt-md border-t border-outline-variant/20">
                  <div className="flex items-center gap-1.5 text-on-surface-variant font-label text-[12px]">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Accessed {course.lastAccessed || 'Recently'}</span>
                  </div>

                  <button 
                    onClick={() => navigate('/student/progress')}
                    className="px-3.5 py-1.5 bg-primary text-on-primary font-label text-[12px] font-semibold rounded-md hover:bg-primary/90 transition-colors flex items-center gap-1 cursor-pointer shadow-xs"
                  >
                    <PlayCircle className="w-3.5 h-3.5" />
                    <span>Open Module</span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-2xl text-center bg-surface-container-lowest rounded-xl border border-outline-variant/30 p-xl space-y-sm">
              <h3 className="font-title text-[18px] font-bold text-on-surface">No Enrolled Courses Yet</h3>
              <p className="font-body text-[14px] text-on-surface-variant max-w-md mx-auto">
                You have not enrolled in any course modules yet. Switch to the <strong>Discover Courses Catalog</strong> tab to explore available curriculums.
              </p>
              <button
                onClick={() => setActiveTab('discover')}
                className="mt-xs px-lg py-sm bg-primary text-on-primary font-label text-[13px] font-semibold rounded-lg cursor-pointer"
              >
                Browse Courses Catalog
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Discover Catalog Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
          {filteredCatalog.length > 0 ? (
            filteredCatalog.map((course) => {
              const isEnrolled = enrolledCourses.some(c => c.id === course.id || c.code === course.code);

              return (
                <div 
                  key={course.id}
                  className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 p-lg shadow-card flex flex-col justify-between gap-md hover:shadow-floating transition-all duration-300"
                >
                  <div className="space-y-sm">
                    <div className="flex justify-between items-start">
                      <span className="text-primary font-label text-[12px] font-semibold uppercase">{course.code || course.category}</span>
                      <span className="font-label text-[12px] text-on-surface-variant font-medium">★ {course.rating || '4.8'}</span>
                    </div>

                    <h3 className="font-title text-[18px] font-bold text-on-surface">{course.title || course.name}</h3>
                    <p className="font-body text-[14px] text-on-surface-variant line-clamp-2">{course.description}</p>
                  </div>

                  <div className="pt-md border-t border-outline-variant/20 flex justify-between items-center">
                    <span className="font-label text-[12px] text-on-surface-variant font-medium">Instructor: {course.instructor}</span>

                    {isEnrolled ? (
                      <span className="px-3 py-1.5 bg-tertiary/10 text-tertiary font-label text-[12px] font-semibold rounded-lg flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>Enrolled</span>
                      </span>
                    ) : (
                      <button
                        onClick={() => handleEnroll(course.id, course.title || course.name)}
                        className="px-3.5 py-1.5 bg-primary text-on-primary font-label text-[12px] font-semibold rounded-lg hover:bg-primary/90 transition-colors shadow-xs flex items-center gap-1 cursor-pointer"
                      >
                        <PlusCircle className="w-3.5 h-3.5" />
                        <span>Enroll Now</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full py-2xl text-center bg-surface-container-lowest rounded-xl border border-outline-variant/30 p-xl space-y-sm">
              <h3 className="font-title text-[18px] font-bold text-on-surface">No Courses in Catalog</h3>
              <p className="font-body text-[14px] text-on-surface-variant max-w-md mx-auto">
                No courses match your filter criteria or course catalog is initializing.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
