import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Users, Clock, BookOpen, CheckCircle, ArrowLeft, ShieldCheck } from 'lucide-react';
import { publicCoursesData } from '../../data/publicData';

export const CourseDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'syllabus' | 'instructor'>('overview');

  const course = publicCoursesData.find((c) => c.id === id) || publicCoursesData[0];

  return (
    <div className="p-margin-mobile md:p-margin-desktop max-w-7xl mx-auto w-full min-h-screen space-y-lg py-md">
      {/* Back button */}
      <button 
        onClick={() => navigate('/courses')}
        className="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary font-label text-[14px] font-medium transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Courses</span>
      </button>

      {/* Hero Header Card */}
      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/30 overflow-hidden shadow-card grid grid-cols-1 lg:grid-cols-3 gap-lg p-lg md:p-xl">
        <div className="lg:col-span-2 flex flex-col justify-between gap-md">
          <div>
            <div className="flex items-center gap-sm mb-xs flex-wrap">
              <span className="px-3 py-1 bg-primary/10 text-primary font-label text-[12px] font-semibold rounded-full uppercase">
                {course.category}
              </span>
              <span className="px-3 py-1 bg-surface-container-high text-on-surface-variant font-label text-[12px] font-medium rounded-full">
                {course.difficulty}
              </span>
            </div>
            <h1 className="font-headline text-[28px] md:text-[40px] leading-[36px] md:leading-[48px] font-bold text-on-surface mb-sm">
              {course.title}
            </h1>
            <p className="font-body text-[16px] leading-[24px] text-on-surface-variant max-w-2xl">
              {course.description}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-lg pt-md border-t border-outline-variant/20">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-[#F59E0B] fill-[#F59E0B]" />
              <span className="font-title text-[16px] font-bold text-on-surface">{course.rating}</span>
              <span className="font-body text-[14px] text-on-surface-variant">({course.reviewsCount} reviews)</span>
            </div>

            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-on-surface-variant" />
              <span className="font-body text-[14px] text-on-surface font-medium">{course.enrolledCount.toLocaleString()} Students</span>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-on-surface-variant" />
              <span className="font-body text-[14px] text-on-surface font-medium">{course.duration}</span>
            </div>
          </div>
        </div>

        {/* Enrollment Box */}
        <div className="bg-surface-container-low rounded-xl border border-outline-variant/50 p-md flex flex-col justify-between gap-md shadow-xs">
          <img 
            src={course.image} 
            alt={course.title}
            className="w-full h-40 rounded-lg object-cover shadow-xs" 
          />
          <div className="space-y-sm">
            <div className="flex items-center gap-2 text-tertiary font-label text-[13px] font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Verified Institution Certificate</span>
            </div>
            <button 
              onClick={() => navigate('/register')}
              className="w-full bg-primary text-on-primary font-label text-[14px] font-semibold py-3 rounded-lg hover:bg-primary/90 transition-colors shadow-sm cursor-pointer"
            >
              Enroll in Course
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-outline-variant/30 gap-md">
        <button
          onClick={() => setActiveTab('overview')}
          className={`pb-sm font-label text-[14px] font-semibold border-b-2 transition-colors cursor-pointer ${
            activeTab === 'overview'
              ? 'border-primary text-primary'
              : 'border-transparent text-on-surface-variant hover:text-on-surface'
          }`}
        >
          Overview & Outcomes
        </button>
        <button
          onClick={() => setActiveTab('syllabus')}
          className={`pb-sm font-label text-[14px] font-semibold border-b-2 transition-colors cursor-pointer ${
            activeTab === 'syllabus'
              ? 'border-primary text-primary'
              : 'border-transparent text-on-surface-variant hover:text-on-surface'
          }`}
        >
          Syllabus ({course.syllabus.length} Modules)
        </button>
        <button
          onClick={() => setActiveTab('instructor')}
          className={`pb-sm font-label text-[14px] font-semibold border-b-2 transition-colors cursor-pointer ${
            activeTab === 'instructor'
              ? 'border-primary text-primary'
              : 'border-transparent text-on-surface-variant hover:text-on-surface'
          }`}
        >
          Instructor
        </button>
      </div>

      {/* Tab Contents */}
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 p-lg shadow-card">
        {activeTab === 'overview' && (
          <div className="space-y-md">
            <h3 className="font-title text-[20px] font-semibold text-on-surface">What You Will Learn</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
              {course.outcomes.map((outcome, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-tertiary shrink-0 mt-0.5" />
                  <span className="font-body text-[15px] leading-[22px] text-on-surface">{outcome}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'syllabus' && (
          <div className="space-y-md">
            <h3 className="font-title text-[20px] font-semibold text-on-surface mb-md">Course Curriculum</h3>
            <div className="divide-y divide-outline-variant/20">
              {course.syllabus.map((item, idx) => (
                <div key={idx} className="py-md flex items-center gap-md">
                  <span className="font-label text-[12px] font-semibold text-primary bg-primary-container/20 px-3 py-1 rounded-md shrink-0">
                    {item.week}
                  </span>
                  <span className="font-body text-[16px] font-medium text-on-surface">{item.topic}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'instructor' && (
          <div className="flex items-center gap-md">
            <div className="w-16 h-16 rounded-full bg-primary-container/20 text-primary flex items-center justify-center font-bold text-[20px] shrink-0">
              {course.instructor.split(' ').map((n) => n[0]).join('')}
            </div>
            <div>
              <h4 className="font-title text-[18px] font-bold text-on-surface">{course.instructor}</h4>
              <p className="font-body text-[14px] text-on-surface-variant">{course.department} Department</p>
              <p className="font-body text-[14px] text-on-surface mt-1">Leading research faculty in computational modeling & machine learning systems.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
