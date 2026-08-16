import React, { useState, useEffect } from 'react';
import { Search, Filter, FileText, CheckCircle2 } from 'lucide-react';
import { studentAssignmentsList } from '../../data/mockData';
import { StudentAssignment } from '../../types';
import { api } from '../../services/api';

export const AdminAssignments: React.FC = () => {
  const [assignments, setAssignments] = useState<StudentAssignment[]>(studentAssignmentsList);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    const loadAssignments = async () => {
      try {
        const res = await api.getAssignments();
        if (res.assignments && res.assignments.length > 0) {
          setAssignments(res.assignments);
        }
      } catch (e) {
        // Fallback
      }
    };
    loadAssignments();
  }, []);

  const filteredAssignments = assignments.filter((a) => {
    const matchesSearch = 
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.course.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || a.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-lg max-w-7xl mx-auto pb-8">
      {/* Header */}
      <div>
        <h2 className="font-headline text-[24px] md:text-[32px] font-bold text-on-surface">
          Institutional Assignment Oversight
        </h2>
        <p className="font-body text-[14px] text-on-surface-variant mt-1">
          Monitor coursework distribution, submission rates, and teacher evaluation timeliness.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-md">
        <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/30 shadow-card flex flex-col justify-between">
          <span className="font-label text-[12px] text-on-surface-variant uppercase font-medium">Total Assignments</span>
          <span className="font-display text-[28px] font-bold text-on-surface">1,240</span>
        </div>
        <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/30 shadow-card flex flex-col justify-between">
          <span className="font-label text-[12px] text-primary uppercase font-medium">Active Submissions</span>
          <span className="font-display text-[28px] font-bold text-primary">820</span>
        </div>
        <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/30 shadow-card flex flex-col justify-between">
          <span className="font-label text-[12px] text-[#d97706] uppercase font-medium">Pending Grade</span>
          <span className="font-display text-[28px] font-bold text-[#d97706]">180</span>
        </div>
        <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/30 shadow-card flex flex-col justify-between">
          <span className="font-label text-[12px] text-tertiary uppercase font-medium">Evaluated</span>
          <span className="font-display text-[28px] font-bold text-tertiary">240</span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-surface-container-lowest rounded-xl p-md border border-outline-variant/30 shadow-card flex flex-wrap items-center gap-md">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search assignments or courses..."
            className="w-full bg-surface-container-low border border-outline-variant/50 rounded-lg py-2 pl-10 pr-4 text-[14px] outline-none text-on-surface focus:border-primary"
          />
        </div>

        <div className="flex items-center gap-sm">
          <Filter className="w-4 h-4 text-on-surface-variant" />
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-surface-container-low border border-outline-variant/50 rounded-lg px-3 py-2 text-[14px] outline-none text-on-surface cursor-pointer"
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Submitted">Submitted</option>
            <option value="Evaluated">Evaluated</option>
          </select>
        </div>
      </div>

      {/* Assignment Table */}
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-bright border-b border-outline-variant/30 font-label text-[12px] uppercase text-on-surface-variant">
                <th className="p-sm pl-md">Assignment Title</th>
                <th className="p-sm">Course</th>
                <th className="p-sm">Teacher</th>
                <th className="p-sm">Due Date</th>
                <th className="p-sm">Submissions</th>
                <th className="p-sm pr-md">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {filteredAssignments.map((a) => (
                <tr key={a.id} className="hover:bg-surface-container-low transition-colors">
                  <td className="p-sm pl-md font-medium text-on-surface">{a.title}</td>
                  <td className="p-sm font-body text-[14px] text-on-surface-variant">{a.course} ({a.courseCode})</td>
                  <td className="p-sm font-body text-[14px] text-on-surface">{a.teacher || 'Prof. Henderson'}</td>
                  <td className="p-sm font-body text-[14px] text-on-surface-variant">{a.dueDate}</td>
                  <td className="p-sm font-body text-[14px] font-bold text-primary">{a.submissionsCount || 42}</td>
                  <td className="p-sm pr-md">
                    <span className="px-2.5 py-1 bg-tertiary/10 text-tertiary font-label text-[11px] font-bold rounded-full">
                      {a.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
