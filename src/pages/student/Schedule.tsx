import React, { useState } from 'react';
import { Calendar, Clock, MapPin, User, CheckCircle2 } from 'lucide-react';
import { studentScheduleList } from '../../data/mockData';

export const Schedule: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday'>('Monday');

  const days: ('Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday')[] = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'
  ];

  const daySchedule = studentScheduleList.filter((s) => s.day === selectedDay);

  return (
    <div className="space-y-lg max-w-7xl mx-auto pb-8">
      {/* Header */}
      <div>
        <h2 className="font-headline text-[24px] md:text-[32px] font-bold text-on-surface">
          Academic Class Schedule
        </h2>
        <p className="font-body text-[14px] text-on-surface-variant mt-1">
          Weekly timetable, lecture locations, and upcoming class indicators.
        </p>
      </div>

      {/* Day Selector Buttons */}
      <div className="flex bg-surface-container-lowest p-1.5 rounded-xl border border-outline-variant/30 shadow-card gap-1 overflow-x-auto">
        {days.map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`flex-1 min-w-[100px] py-2.5 rounded-lg font-label text-[13px] font-semibold transition-all cursor-pointer ${
              selectedDay === day
                ? 'bg-primary text-on-primary shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Schedule Items List */}
      <div className="space-y-md">
        <h3 className="font-title text-[18px] font-bold text-on-surface">
          Classes for {selectedDay}
        </h3>

        {daySchedule.length > 0 ? (
          <div className="space-y-md">
            {daySchedule.map((item) => (
              <div 
                key={item.id}
                className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 p-lg shadow-card flex flex-col md:flex-row md:items-center justify-between gap-md hover:shadow-floating transition-all duration-300"
              >
                <div className="flex items-start gap-md">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold shrink-0">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-xs">
                      <span className="font-label text-[12px] font-bold text-primary uppercase">{item.code}</span>
                      {item.isUpcoming && (
                        <span className="px-2.5 py-0.5 bg-tertiary/10 text-tertiary font-label text-[10px] font-bold rounded-full">
                          Next Class
                        </span>
                      )}
                    </div>
                    <h4 className="font-title text-[18px] font-bold text-on-surface">{item.subject}</h4>
                    <p className="font-body text-[14px] text-on-surface-variant mt-0.5">Instructor: {item.instructor}</p>
                  </div>
                </div>

                <div className="flex flex-col md:items-end gap-1 text-[14px] text-on-surface-variant pt-md md:pt-0 border-t md:border-t-0 border-outline-variant/20">
                  <div className="flex items-center gap-1.5 font-semibold text-on-surface">
                    <Clock className="w-4 h-4 text-secondary" />
                    <span>{item.time}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-tertiary" />
                    <span>{item.room}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-xl text-center bg-surface-container-lowest rounded-xl border border-outline-variant/30 p-xl">
            <CheckCircle2 className="w-10 h-10 text-tertiary mx-auto mb-2" />
            <h4 className="font-title text-[18px] font-bold text-on-surface">No Classes Scheduled</h4>
            <p className="font-body text-[14px] text-on-surface-variant">Enjoy your free study block or catch up on coursework assignments.</p>
          </div>
        )}
      </div>
    </div>
  );
};
