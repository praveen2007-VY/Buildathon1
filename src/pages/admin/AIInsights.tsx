import React from 'react';
import { Sparkles, AlertCircle, TrendingUp, ArrowRight, ShieldCheck } from 'lucide-react';
import { adminRiskDistributionData, adminDepartmentPerformanceData } from '../../data/mockData';
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip 
} from 'recharts';

export const AIInsights: React.FC = () => {
  return (
    <div className="space-y-lg max-w-7xl mx-auto pb-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/10 text-secondary rounded-full font-label text-[12px] font-bold mb-xs">
          <Sparkles className="w-4 h-4 shrink-0" />
          <span>Institutional AI Intelligence Hub</span>
        </div>
        <h2 className="font-headline text-[24px] md:text-[32px] font-bold text-on-surface">
          Institutional AI Analytics & Risk Detection
        </h2>
        <p className="font-body text-[14px] text-on-surface-variant mt-1 max-w-3xl">
          Real-time algorithmic risk distribution, cross-departmental trend detection, and predictive policy recommendations.
        </p>
      </div>

      {/* Health Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-md">
        <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/30 shadow-card flex flex-col justify-between">
          <span className="font-label text-[12px] text-on-surface-variant uppercase font-medium">Academic Health Index</span>
          <span className="font-display text-[28px] font-bold text-primary">92 / 100</span>
        </div>
        <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/30 shadow-card flex flex-col justify-between">
          <span className="font-label text-[12px] text-tertiary uppercase font-medium">Low Risk Students</span>
          <span className="font-display text-[28px] font-bold text-tertiary">10,582 (85%)</span>
        </div>
        <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/30 shadow-card flex flex-col justify-between">
          <span className="font-label text-[12px] text-[#d97706] uppercase font-medium">Medium Risk</span>
          <span className="font-display text-[28px] font-bold text-[#d97706]">1,494 (12%)</span>
        </div>
        <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/30 shadow-card flex flex-col justify-between">
          <span className="font-label text-[12px] text-error uppercase font-medium">High Risk</span>
          <span className="font-display text-[28px] font-bold text-error">374 (3%)</span>
        </div>
      </div>

      {/* Main Grid: Risk Donut Chart & AI Trend Detection */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-lg">
        {/* Risk Distribution Donut Chart */}
        <div className="lg:col-span-5 bg-surface-container-lowest rounded-xl border border-outline-variant/30 p-lg shadow-card space-y-md flex flex-col justify-between">
          <h3 className="font-title text-[18px] font-bold text-on-surface">Institutional Academic Risk Distribution</h3>
          
          <div className="h-56 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie 
                  data={adminRiskDistributionData} 
                  cx="50%" cy="50%" 
                  innerRadius={60} 
                  outerRadius={90} 
                  paddingAngle={4}
                  dataKey="value"
                >
                  {adminRiskDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #c2c6d6', fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex justify-center gap-md pt-sm border-t border-outline-variant/20">
            {adminRiskDistributionData.map((item, idx) => (
              <div key={idx} className="flex items-center gap-1.5 text-[12px]">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-on-surface font-medium">{item.name} ({item.percentage}%)</span>
              </div>
            ))}
          </div>
        </div>

        {/* AI Trend Detection Cards */}
        <div className="lg:col-span-7 space-y-md">
          <div className="ai-gradient p-lg rounded-xl border border-secondary/30 shadow-card space-y-sm">
            <div className="flex items-center gap-2 text-secondary font-label text-[12px] font-bold uppercase">
              <Sparkles className="w-4 h-4" />
              <span>AI Trend Alert #1</span>
            </div>
            <h4 className="font-title text-[18px] font-bold text-on-surface">Average performance decreased by 7% in Database Systems (CS-303)</h4>
            <p className="font-body text-[14px] text-on-surface-variant">
              System detected correlation between low assignment submission rate in Module 3 and declining quiz averages.
            </p>
          </div>

          <div className="ai-gradient p-lg rounded-xl border border-secondary/30 shadow-card space-y-sm">
            <div className="flex items-center gap-2 text-tertiary font-label text-[12px] font-bold uppercase">
              <TrendingUp className="w-4 h-4" />
              <span>AI Positive Trend #2</span>
            </div>
            <h4 className="font-title text-[18px] font-bold text-on-surface">Assignment completion improved by 11% this semester across Engineering</h4>
            <p className="font-body text-[14px] text-on-surface-variant">
              New automated reminder system resulted in a 94.2% on-time submission rate across all engineering sections.
            </p>
          </div>
        </div>
      </div>

      {/* Institutional AI Recommendations */}
      <div className="space-y-md">
        <h3 className="font-title text-[20px] font-bold text-on-surface">Strategic AI Policy Recommendations</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
          {[
            { priority: 'High Priority', reason: 'High absenteeism in Friday 8 AM sections.', action: 'Adjust scheduling parameters or deploy attendance recovery notifications.', title: 'Review Scheduling in Lower-Division Math' },
            { priority: 'Medium Priority', reason: 'Database Systems prerequisite gaps detected.', action: 'Mandate supplemental SQL tutorial lab prior to Term 6.', title: 'Institute Supplemental SQL Workshops' }
          ].map((rec, idx) => (
            <div key={idx} className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 p-lg shadow-card space-y-md flex flex-col justify-between">
              <div className="space-y-xs">
                <span className="px-2.5 py-0.5 bg-secondary/10 text-secondary font-label text-[11px] font-bold rounded-full uppercase">
                  {rec.priority}
                </span>
                <h4 className="font-title text-[18px] font-bold text-on-surface mt-1">{rec.title}</h4>
                <p className="font-body text-[14px] text-on-surface-variant"><strong className="text-on-surface">Root Cause:</strong> {rec.reason}</p>
                <p className="font-body text-[14px] text-primary"><strong className="text-on-surface">Action:</strong> {rec.action}</p>
              </div>

              <button className="w-full bg-secondary text-on-secondary font-label text-[12px] font-semibold py-2.5 rounded-lg hover:bg-secondary-container transition-colors flex justify-center items-center gap-2 cursor-pointer shadow-xs">
                <span>Execute Recommendation Policy</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
