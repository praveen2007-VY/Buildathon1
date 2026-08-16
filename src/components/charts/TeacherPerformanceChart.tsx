import React from 'react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip 
} from 'recharts';
import { teacherClassPerformanceData } from '../../data/mockData';

export const TeacherPerformanceChart: React.FC = () => {
  return (
    <div className="bg-surface-container-lowest p-lg rounded-xl border border-outline-variant shadow-card flex flex-col min-h-[340px]">
      <div className="flex justify-between items-center mb-md">
        <h3 className="font-title text-[18px] leading-[28px] font-semibold text-on-surface">
          Class Performance Trends
        </h3>
        <button className="font-label text-[12px] leading-[16px] text-primary hover:text-primary-container transition-colors font-medium">
          View Detailed
        </button>
      </div>

      <div className="flex-1 w-full bg-surface-container-low/50 rounded-lg p-sm border border-dashed border-outline-variant min-h-[240px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={teacherClassPerformanceData} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorAvgScore" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2170e4" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#2170e4" stopOpacity={0.0}/>
              </linearGradient>
              <linearGradient id="colorAttendance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00855b" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#00855b" stopOpacity={0.0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#c2c6d6" opacity={0.3} />
            <XAxis dataKey="week" stroke="#727785" fontSize={12} tickLine={false} />
            <YAxis domain={[50, 100]} stroke="#727785" fontSize={12} tickLine={false} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#ffffff', 
                borderRadius: '8px', 
                border: '1px solid #c2c6d6',
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)',
                fontSize: '13px'
              }}
            />
            <Area 
              type="monotone" 
              dataKey="avgScore" 
              name="Avg Score (%)"
              stroke="#2170e4" 
              strokeWidth={3} 
              fillOpacity={1} 
              fill="url(#colorAvgScore)" 
            />
            <Area 
              type="monotone" 
              dataKey="attendance" 
              name="Attendance (%)"
              stroke="#00855b" 
              strokeWidth={2} 
              fillOpacity={1} 
              fill="url(#colorAttendance)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
