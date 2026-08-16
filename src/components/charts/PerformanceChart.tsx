import React from 'react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip 
} from 'recharts';
import { semesterPerformanceData } from '../../data/mockData';

export const PerformanceChart: React.FC = () => {
  return (
    <div className="bg-surface-container-lowest rounded-xl p-md border border-outline-variant/30 shadow-card flex flex-col h-[320px]">
      <h3 className="font-title text-[18px] leading-[28px] font-semibold text-on-surface mb-md">
        Performance Over Semester
      </h3>
      <div className="flex-1 w-full bg-surface-container-low/50 rounded-lg p-sm border border-outline-variant/30">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={semesterPerformanceData} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#c2c6d6" opacity={0.3} />
            <XAxis 
              dataKey="month" 
              stroke="#727785" 
              fontSize={12}
              tickLine={false} 
            />
            <YAxis 
              stroke="#727785" 
              fontSize={12} 
              domain={[50, 100]}
              tickLine={false}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#ffffff', 
                borderRadius: '8px', 
                border: '1px solid #c2c6d6',
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)',
                fontSize: '13px'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="score" 
              name="Student Score"
              stroke="#0058be" 
              strokeWidth={3} 
              dot={{ fill: '#0058be', r: 5 }}
              activeDot={{ r: 7 }}
            />
            <Line 
              type="monotone" 
              dataKey="target" 
              name="Target Average"
              stroke="#6063ee" 
              strokeWidth={2} 
              strokeDasharray="4 4"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
