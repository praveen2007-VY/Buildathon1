import React from 'react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip 
} from 'recharts';
import { adminDepartmentPerformanceData } from '../../data/mockData';

export const DepartmentPerformanceBarChart: React.FC = () => {
  return (
    <div className="lg:col-span-8 bg-surface-container-lowest rounded-xl border border-outline-variant shadow-card p-md flex flex-col min-h-[300px]">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-title text-[18px] leading-[28px] font-semibold text-on-surface">
          Department Performance
        </h3>
        <div className="flex gap-4">
          <span className="flex items-center gap-1 font-label text-[12px] text-outline-variant">
            <div className="w-2.5 h-2.5 bg-primary rounded-full" /> Current Term
          </span>
          <span className="flex items-center gap-1 font-label text-[12px] text-outline-variant">
            <div className="w-2.5 h-2.5 bg-surface-container-high rounded-full border border-outline-variant" /> Previous Term
          </span>
        </div>
      </div>

      <div className="flex-1 w-full min-h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={adminDepartmentPerformanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#c2c6d6" opacity={0.3} />
            <XAxis dataKey="department" stroke="#727785" fontSize={12} tickLine={false} />
            <YAxis domain={[0, 100]} stroke="#727785" fontSize={12} tickLine={false} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#ffffff', 
                borderRadius: '8px', 
                border: '1px solid #c2c6d6',
                fontSize: '13px'
              }}
            />
            <Bar dataKey="previousTerm" name="Previous Term" fill="#dce2f3" radius={[4, 4, 0, 0]} />
            <Bar dataKey="currentTerm" name="Current Term" fill="#0058be" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
