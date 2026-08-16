import React from 'react';
import { studentCourseProgress } from '../../data/mockData';

export const CourseProgressCard: React.FC = () => {
  return (
    <div className="bg-surface-container-lowest rounded-xl p-md border border-outline-variant/30 shadow-card">
      <h3 className="font-title text-[18px] leading-[28px] font-semibold text-on-surface mb-md">
        Course Progress
      </h3>
      <div className="space-y-sm">
        {studentCourseProgress.map((course) => (
          <div key={course.id}>
            <div className="flex justify-between font-label text-[12px] leading-[16px] font-medium mb-xs">
              <span className="text-on-surface">{course.name}</span>
              <span className={course.isRisk ? 'text-error font-semibold' : 'text-on-surface-variant'}>
                {course.progress}%
              </span>
            </div>
            <div className="w-full bg-surface-container-high rounded-full h-2">
              <div 
                className={`${course.color} h-2 rounded-full transition-all duration-500`} 
                style={{ width: `${course.progress}%` }} 
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
