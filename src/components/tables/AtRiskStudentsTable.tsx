import React from 'react';
import { teacherAtRiskStudents } from '../../data/mockData';

export const AtRiskStudentsTable: React.FC = () => {
  return (
    <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-card overflow-hidden">
      <div className="p-md border-b border-outline-variant bg-surface-bright flex justify-between items-center">
        <h3 className="font-title text-[18px] leading-[28px] font-semibold text-on-surface">
          At-Risk Students
        </h3>
        <span className="bg-error/10 text-error font-label text-[12px] leading-[16px] font-semibold px-2 py-1 rounded-full">
          Action Needed
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-bright border-b border-outline-variant">
              <th className="p-sm pl-md font-label text-[12px] leading-[16px] text-on-surface-variant uppercase font-medium">
                Student
              </th>
              <th className="p-sm font-label text-[12px] leading-[16px] text-on-surface-variant uppercase font-medium">
                Status
              </th>
              <th className="p-sm font-label text-[12px] leading-[16px] text-on-surface-variant uppercase font-medium">
                Primary Issue
              </th>
              <th className="p-sm pr-md font-label text-[12px] leading-[16px] text-on-surface-variant uppercase font-medium text-right">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-outline-variant">
            {teacherAtRiskStudents.map((student) => (
              <tr key={student.id} className="hover:bg-surface-container-low transition-colors">
                <td className="p-sm pl-md flex items-center gap-sm">
                  <div className={`w-8 h-8 rounded-full ${student.avatarBgColor || 'bg-primary-container/20'} ${student.avatarTextColor || 'text-primary'} flex items-center justify-center font-bold text-[12px]`}>
                    {student.initials}
                  </div>
                  <span className="font-body text-[14px] leading-[20px] text-on-surface font-medium">
                    {student.name}
                  </span>
                </td>

                <td className="p-sm">
                  <span 
                    className={`inline-block px-2 py-1 font-label text-[10px] leading-[14px] rounded-full uppercase tracking-wide font-bold ${
                      student.riskLevel === 'High Risk'
                        ? 'bg-error/10 text-error'
                        : 'bg-[#d97706]/10 text-[#d97706]'
                    }`}
                  >
                    {student.riskLevel}
                  </span>
                </td>

                <td className="p-sm font-body text-[14px] leading-[20px] text-on-surface-variant">
                  {student.primaryIssue}
                </td>

                <td className="p-sm pr-md text-right">
                  <button className="font-label text-[12px] leading-[16px] text-primary hover:text-primary-container transition-colors font-medium">
                    View Profile
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
