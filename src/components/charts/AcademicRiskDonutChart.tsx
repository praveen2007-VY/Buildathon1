import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { Info } from 'lucide-react';
import { adminRiskDistributionData } from '../../data/mockData';

export const AcademicRiskDonutChart: React.FC = () => {
  return (
    <div className="lg:col-span-4 bg-surface-container-lowest rounded-xl border border-outline-variant shadow-card p-md flex flex-col min-h-[340px]">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-title text-[18px] leading-[28px] font-semibold text-on-surface">
          Academic Risk
        </h3>
        <Info className="w-5 h-5 text-outline-variant cursor-pointer" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center relative min-h-[220px]">
        <div className="w-full h-48 relative flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={adminRiskDistributionData}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={4}
                dataKey="value"
              >
                {adminRiskDistributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#ffffff', 
                  borderRadius: '8px', 
                  border: '1px solid #c2c6d6',
                  fontSize: '12px'
                }} 
              />
            </PieChart>
          </ResponsiveContainer>

          {/* Center text overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="font-headline text-[24px] font-bold text-on-surface">12.4k</span>
            <span className="font-label text-[11px] text-outline-variant">Total Evaluated</span>
          </div>
        </div>

        {/* Legend */}
        <div className="w-full mt-4 space-y-2">
          {adminRiskDistributionData.map((item) => (
            <div key={item.name} className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2 font-body text-[14px] leading-[20px] text-on-surface">
                <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                <span>{item.name}</span>
              </div>
              <span className="font-medium text-on-surface">{item.percentage}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
