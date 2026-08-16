import React from 'react';
import { MoreHorizontal } from 'lucide-react';
import { teacherActiveCourses } from '../../data/mockData';

export const ActiveCoursesList: React.FC = () => {
  return (
    <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-card overflow-hidden">
      <div className="p-md border-b border-outline-variant bg-surface-bright flex justify-between items-center">
        <h3 className="font-title text-[18px] leading-[28px] font-semibold text-on-surface">
          My Active Courses
        </h3>
        <button className="text-on-surface-variant hover:text-primary transition-colors p-1 rounded">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      <div className="divide-y divide-outline-variant">
        {teacherActiveCourses.map((course) => (
          <div 
            key={course.id} 
            className="p-md flex items-center justify-between hover:bg-surface-container-low transition-colors group"
          >
            <div>
              <h4 className="font-body text-[16px] leading-[24px] text-on-surface font-medium">
                {course.name}
              </h4>
              <p className="font-body text-[14px] leading-[20px] text-on-surface-variant">
                {course.code} • {course.schedule}
              </p>
            </div>

            <div className="flex items-center gap-lg">
              <div className="text-right hidden sm:block">
                <p className="font-label text-[12px] leading-[16px] text-on-surface-variant uppercase font-medium">
                  Students
                </p>
                <p className="font-body text-[14px] leading-[20px] text-on-surface font-medium">
                  {course.studentCount}
                </p>
              </div>

              <div className="text-right hidden sm:block">
                <p className="font-label text-[12px] leading-[16px] text-on-surface-variant uppercase font-medium">
                  Avg Grade
                </p>
                <p className="font-body text-[14px] leading-[20px] text-on-surface font-medium">
                  {course.avgGrade}
                </p>
              </div>

              <button className="bg-white border border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary font-label text-[12px] leading-[16px] font-medium py-1.5 px-3 rounded-md transition-all">
                Manage
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
