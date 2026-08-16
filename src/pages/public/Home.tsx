import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, TrendingUp, BarChart2, AlertCircle, CheckCircle, Award } from 'lucide-react';
import { publicCoursesData } from '../../data/publicData';

export const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-2xl pb-xl px-margin-mobile md:px-margin-desktop max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-xl overflow-hidden min-h-[720px] w-full">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary-fixed/30 rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary-fixed/20 rounded-full blur-[100px] -z-10 -translate-x-1/3 translate-y-1/3 pointer-events-none" />

        {/* Left Column: Text & CTAs */}
        <div className="flex-1 flex flex-col items-start z-10">
          <div className="inline-flex items-center gap-2 px-sm py-1 bg-surface-container-high rounded-full border border-outline-variant/50 mb-lg shadow-xs">
            <Sparkles className="w-4 h-4 text-primary shrink-0" />
            <span className="font-label text-[12px] leading-[16px] text-on-surface-variant font-medium">
              AI-Powered Learning Platform
            </span>
          </div>

          <h1 className="font-display text-[40px] leading-[48px] md:text-[64px] md:leading-[72px] font-bold text-on-surface mb-md">
            Smarter Education.<br />
            <span className="ai-gradient-text">Better Academic Outcomes.</span>
          </h1>

          <p className="font-body text-[16px] md:text-[18px] leading-[26px] text-on-surface-variant mb-xl max-w-xl">
            Empower educators and students with real-time AI insights, predictive analytics, and personalized learning pathways designed for modern academic institutions.
          </p>

          <div className="flex flex-col sm:flex-row gap-sm w-full sm:w-auto">
            <button 
              onClick={() => navigate('/register')}
              className="px-lg py-md bg-primary text-on-primary rounded-lg font-title text-[18px] leading-[28px] font-semibold hover:bg-surface-tint transition-colors shadow-sm flex justify-center items-center gap-2 cursor-pointer"
            >
              <span>Start Your Journey</span>
              <ArrowRight className="w-5 h-5 shrink-0" />
            </button>
            <button 
              onClick={() => navigate('/student/courses')}
              className="px-lg py-md bg-surface text-on-surface border border-outline-variant rounded-lg font-title text-[18px] leading-[28px] font-semibold hover:bg-surface-container-low transition-colors flex justify-center items-center cursor-pointer"
            >
              Explore Courses
            </button>
          </div>
        </div>

        {/* Right Column: Interactive Mockup Container */}
        <div className="flex-1 relative w-full z-10">
          <div className="relative w-full aspect-square md:aspect-[4/3] rounded-xl border border-outline-variant/30 shadow-[0_24px_48px_rgba(0,0,0,0.08)] bg-surface-container-lowest overflow-hidden">
            {/* Mockup Header */}
            <div className="h-10 border-b border-outline-variant/20 bg-surface-container-lowest flex items-center px-4 gap-2">
              <div className="w-3 h-3 rounded-full bg-error/50" />
              <div className="w-3 h-3 rounded-full bg-tertiary-container/50" />
              <div className="w-3 h-3 rounded-full bg-tertiary-fixed-dim/50" />
            </div>

            {/* Mockup Content */}
            <div className="p-md h-full bg-surface/50 flex flex-col gap-md">
              {/* Top Widgets */}
              <div className="grid grid-cols-2 gap-md">
                <div className="bg-surface-container-lowest p-md rounded-lg border border-outline-variant/20 shadow-xs flex flex-col justify-between">
                  <span className="font-label text-[12px] text-on-surface-variant uppercase font-medium">Overall Attendance</span>
                  <div className="flex items-end justify-between mt-2">
                    <span className="font-headline text-[24px] font-bold text-on-surface">94.2%</span>
                    <TrendingUp className="w-5 h-5 text-tertiary-container" />
                  </div>
                </div>

                <div className="bg-surface-container-lowest p-md rounded-lg border border-outline-variant/20 shadow-xs flex flex-col justify-between">
                  <span className="font-label text-[12px] text-on-surface-variant uppercase font-medium">Class Average</span>
                  <div className="flex items-end justify-between mt-2">
                    <span className="font-headline text-[24px] font-bold text-on-surface">A-</span>
                    <BarChart2 className="w-5 h-5 text-primary" />
                  </div>
                </div>
              </div>

              {/* AI Insights Widget */}
              <div className="bg-inverse-on-surface p-md rounded-lg border border-primary-fixed flex-1 flex flex-col relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
                <div className="flex items-center gap-2 mb-sm">
                  <Sparkles className="w-4 h-4 text-primary shrink-0" />
                  <span className="font-title text-[16px] font-semibold text-on-surface">AI Recommendations</span>
                </div>
                <div className="space-y-sm flex-1 mt-2">
                  <div className="bg-surface-container-lowest p-sm rounded border border-outline-variant/10 text-[13px] text-on-surface-variant flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                    <span>3 students showing potential risk of falling behind in Advanced Calculus. Recommended intervention paths generated.</span>
                  </div>
                  <div className="bg-surface-container-lowest p-sm rounded border border-outline-variant/10 text-[13px] text-on-surface-variant flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-tertiary-container shrink-0 mt-0.5" />
                    <span>Syllabus pacing is optimal. Engagement metrics are up 12% this week.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Badge */}
          <div className="absolute -right-4 top-1/4 glass-panel p-sm rounded-lg shadow-lg hidden sm:flex items-center gap-sm animate-pulse">
            <div className="w-10 h-10 rounded-full bg-tertiary-container flex items-center justify-center text-on-tertiary">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <p className="font-label text-[12px] text-on-surface-variant font-medium">New Milestone</p>
              <p className="font-body text-[14px] font-semibold text-on-surface">Class Goal Met</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses Showcase Section */}
      <section className="py-2xl bg-surface-container-low/40 border-y border-outline-variant/20 w-full">
        <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-xl gap-md">
            <div>
              <span className="font-label text-[12px] text-primary uppercase tracking-wider font-semibold">Curriculum Catalog</span>
              <h2 className="font-headline text-[32px] font-bold text-on-surface mt-1">Featured Academic Courses</h2>
            </div>
            <button 
              onClick={() => navigate('/student/courses')}
              className="text-primary font-label text-[14px] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>View All Courses</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
            {publicCoursesData.slice(0, 3).map((course) => (
              <div 
                key={course.id}
                onClick={() => navigate(`/courses/${course.id}`)}
                className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 overflow-hidden shadow-card hover:shadow-floating transition-all duration-300 flex flex-col group cursor-pointer"
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
                    <span className="text-primary font-label text-[12px] font-semibold uppercase">{course.category}</span>
                    <span className="font-label text-[12px] text-on-surface-variant font-medium">★ {course.rating}</span>
                  </div>
                  <h3 className="font-title text-[18px] leading-[26px] font-semibold text-on-surface line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="font-body text-[14px] text-on-surface-variant line-clamp-2">
                    {course.description}
                  </p>
                  <div className="mt-auto pt-md border-t border-outline-variant/20 flex items-center justify-between">
                    <span className="font-label text-[12px] text-on-surface-variant">{course.enrolledCount} Enrolled</span>
                    <span className="text-primary font-label text-[12px] font-semibold group-hover:underline">View Course →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
