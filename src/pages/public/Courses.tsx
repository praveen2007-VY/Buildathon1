import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Star, Users, ChevronRight, Sparkles, X } from 'lucide-react';
import { publicCoursesData, Course } from '../../data/publicData';

export const Courses: React.FC = () => {
  const navigate = useNavigate();

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');

  // Filter logic
  const filteredCourses = useMemo(() => {
    return publicCoursesData.filter((course) => {
      const matchesSearch = 
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
      const matchesDepartment = selectedDepartment === 'All' || course.department === selectedDepartment;
      const matchesDifficulty = selectedDifficulty === 'All' || course.difficulty === selectedDifficulty;

      return matchesSearch && matchesCategory && matchesDepartment && matchesDifficulty;
    });
  }, [searchQuery, selectedCategory, selectedDepartment, selectedDifficulty]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedDepartment('All');
    setSelectedDifficulty('All');
  };

  return (
    <div className="p-margin-mobile md:p-margin-desktop flex-1 flex flex-col gap-lg max-w-7xl mx-auto w-full min-h-screen">
      {/* Header Section */}
      <section className="flex flex-col gap-sm pt-md">
        <h2 className="font-headline text-[32px] md:text-[48px] font-bold text-on-surface">
          Discover Courses
        </h2>
        <p className="font-body text-[16px] text-on-surface-variant max-w-2xl">
          Explore our comprehensive catalog of AI-enhanced curriculums designed to accelerate your academic journey.
        </p>
      </section>

      {/* Search & Filters Glassmorphic Bar */}
      <section className="glass-panel rounded-xl p-md flex flex-wrap items-center gap-md z-20 sticky top-[68px] shadow-sm">
        {/* Search Bar */}
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search courses, instructors, or topics..."
            className="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-lg py-2 pl-10 pr-4 text-[14px] leading-[20px] focus:border-primary outline-none transition-all text-on-surface"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="flex items-center gap-sm flex-wrap">
          <div className="flex items-center gap-2 text-on-surface-variant mr-xs hidden lg:flex">
            <Filter className="w-4 h-4 text-on-surface-variant" />
            <span className="font-label text-[12px] font-semibold uppercase tracking-wider">Filters</span>
          </div>

          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-surface-container-lowest border border-outline-variant/50 rounded-lg px-3 py-2 text-[14px] focus:border-primary outline-none cursor-pointer text-on-surface"
          >
            <option value="All">Category: All</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Data Science">Data Science</option>
            <option value="Engineering">Engineering</option>
            <option value="Humanities">Humanities</option>
            <option value="Sciences">Sciences</option>
          </select>

          <select 
            value={selectedDepartment} 
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="bg-surface-container-lowest border border-outline-variant/50 rounded-lg px-3 py-2 text-[14px] focus:border-primary outline-none cursor-pointer text-on-surface"
          >
            <option value="All">Department: All</option>
            <option value="Computing">Computing</option>
            <option value="Engineering">Engineering</option>
            <option value="Sciences">Sciences</option>
            <option value="Humanities">Humanities</option>
          </select>

          <select 
            value={selectedDifficulty} 
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="bg-surface-container-lowest border border-outline-variant/50 rounded-lg px-3 py-2 text-[14px] focus:border-primary outline-none cursor-pointer text-on-surface"
          >
            <option value="All">Difficulty: All</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>

          {(searchQuery || selectedCategory !== 'All' || selectedDepartment !== 'All' || selectedDifficulty !== 'All') && (
            <button 
              onClick={clearFilters}
              className="bg-primary/10 text-primary hover:bg-primary/20 px-3 py-2 rounded-lg font-label text-[12px] font-semibold transition-colors flex items-center gap-1 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          )}
        </div>
      </section>

      {/* Main Course Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <article 
              key={course.id}
              className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 overflow-hidden shadow-card hover:shadow-floating transition-all duration-300 flex flex-col group"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                {course.isAiRecommended && (
                  <div className="absolute top-4 left-4 bg-surface/90 backdrop-blur-sm px-3 py-1 rounded-full border border-outline-variant/20 flex items-center gap-1 shadow-xs">
                    <Sparkles className="w-3.5 h-3.5 text-tertiary" />
                    <span className="font-label text-[12px] font-medium text-on-surface">AI Recommended</span>
                  </div>
                )}
              </div>

              <div className="p-md flex flex-col flex-1 gap-sm">
                <div className="flex justify-between items-start">
                  <span className="text-primary font-label text-[12px] font-semibold uppercase tracking-wide">
                    {course.category}
                  </span>
                  <div className="flex items-center gap-1 text-on-surface-variant">
                    <Star className="w-4 h-4 text-[#F59E0B] fill-[#F59E0B]" />
                    <span className="font-label text-[12px] font-medium">{course.rating}</span>
                  </div>
                </div>

                <h3 className="font-title text-[18px] leading-[26px] font-semibold text-on-surface line-clamp-2">
                  {course.title}
                </h3>
                <p className="font-body text-[14px] leading-[20px] text-on-surface-variant line-clamp-2">
                  {course.description}
                </p>

                <div className="mt-auto pt-md border-t border-outline-variant/20 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-on-surface-variant" />
                    <span className="font-label text-[12px] text-on-surface-variant">
                      {course.enrolledCount.toLocaleString()} Enrolled
                    </span>
                  </div>

                  <button 
                    onClick={() => navigate(`/courses/${course.id}`)}
                    className="bg-primary text-on-primary px-4 py-2 rounded-lg font-label text-[12px] font-semibold hover:bg-primary/90 transition-colors cursor-pointer shadow-xs"
                  >
                    View Course
                  </button>
                </div>
              </div>
            </article>
          ))
        ) : (
          <div className="col-span-full py-2xl text-center bg-surface-container-lowest rounded-xl border border-outline-variant/30 p-xl">
            <h3 className="font-headline text-[20px] font-bold text-on-surface">No courses match your filter criteria</h3>
            <p className="font-body text-[14px] text-on-surface-variant mt-2">Try clearing your search query or expanding your filter options.</p>
            <button 
              onClick={clearFilters}
              className="mt-md px-lg py-sm bg-primary text-on-primary rounded-lg font-label text-[14px] font-semibold cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </section>

      {/* Top Rated Courses Section */}
      <section className="mt-xl flex flex-col gap-md pb-xl">
        <h3 className="font-headline text-[24px] font-bold text-on-surface pb-sm border-b border-outline-variant/20">
          Top Rated Courses
        </h3>

        <div className="flex flex-col gap-sm">
          {publicCoursesData.filter((c) => c.rating >= 4.85).map((course) => (
            <div 
              key={course.id}
              onClick={() => navigate(`/courses/${course.id}`)}
              className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 p-md flex items-center gap-lg hover:bg-surface-container-low transition-colors shadow-xs cursor-pointer group"
            >
              <img 
                src={course.image} 
                alt={course.title}
                className="w-16 h-16 rounded-lg object-cover hidden sm:block shrink-0" 
              />
              <div className="flex-1">
                <h4 className="font-title text-[16px] font-semibold text-on-surface group-hover:text-primary transition-colors">
                  {course.title}
                </h4>
                <p className="font-body text-[14px] text-on-surface-variant">
                  {course.department} Department • {course.instructor}
                </p>
              </div>

              <div className="text-right hidden md:block px-lg border-r border-outline-variant/20">
                <p className="font-title text-[18px] font-bold text-on-surface">★ {course.rating}</p>
                <p className="font-label text-[12px] text-on-surface-variant">{course.reviewsCount} Reviews</p>
              </div>

              <button className="text-primary hover:text-primary-fixed-dim font-label text-[14px] font-semibold ml-auto flex items-center gap-1">
                <span>Details</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
