import React from 'react';
import { studentUpcomingActivities } from '../../data/mockData';

export const UpcomingActivitiesCard: React.FC = () => {
  return (
    <div className="bg-surface-container-lowest rounded-xl p-md border border-outline-variant/30 shadow-card flex-1">
      <h3 className="font-title text-[18px] leading-[28px] font-semibold text-on-surface mb-md">
        Upcoming Activities
      </h3>
      <div className="relative border-l-2 border-outline-variant/30 ml-sm space-y-md">
        {studentUpcomingActivities.map((activity) => (
          <div key={activity.id} className="relative pl-md">
            <div className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full ${activity.color} border-2 border-surface-container-lowest`} />
            <div className="font-label text-[12px] leading-[16px] text-primary font-medium mb-xs">
              {activity.date}, {activity.time}
            </div>
            <div className="font-body text-[14px] leading-[20px] text-on-surface font-medium">
              {activity.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
