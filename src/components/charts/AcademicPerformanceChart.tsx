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
import { adminAcademicPerformanceData } from '../../data/mockData';

export const AcademicPerformanceChart: React.FC = () => {
  return (
    <div className="lg:col-span-8 bg-surface-container-lowest rounded-xl border border-outline-variant shadow-card p-md flex flex-col min-h-[340px]">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-title text-[18px] leading-[28px] font-semibold text-on-surface">
          Academic Performance Trends
        </h3>
        <button className="text-primary font-label text-[12px] leading-[16px] font-medium hover:underline">
          View Details
        </button>
      </div>

      <div className="flex-1 w-full bg-surface-container-low/50 rounded-lg p-sm border border-dashed border-outline-variant min-h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={adminAcademicPerformanceData} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorGpa" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0058be" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#0058be" stopOpacity={0.0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#c2c6d6" opacity={0.3} />
            <XAxis dataKey="month" stroke="#727785" fontSize={12} tickLine={false} />
            <YAxis domain={[2.0, 4.0]} stroke="#727785" fontSize={12} tickLine={false} />
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
              dataKey="gpa" 
              name="Average GPA"
              stroke="#0058be" 
              strokeWidth={3} 
              fillOpacity={1} 
              fill="url(#colorGpa)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
