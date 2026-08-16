import React, { useState } from 'react';
import { Search, Plus, Filter, UserCheck, AlertTriangle, ShieldAlert, X, CheckCircle2 } from 'lucide-react';
import { adminStudentsDirectory } from '../../data/mockData';
import { AtRiskStudent } from '../../types';

export const AdminStudents: React.FC = () => {
  const [students, setStudents] = useState<AtRiskStudent[]>(adminStudentsDirectory);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedRisk, setSelectedRisk] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [department, setDepartment] = useState('School of Computing');

  const filteredStudents = students.filter((std) => {
    const matchesSearch = 
      std.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (std.studentId && std.studentId.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesDept = selectedDept === 'All' || std.department === selectedDept;
    const matchesRisk = selectedRisk === 'All' || std.riskLevel === selectedRisk;

    return matchesSearch && matchesDept && matchesRisk;
  });

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    const newStudent: AtRiskStudent = {
      id: `std_${Date.now()}`,
      initials: name.split(' ').map(n => n[0]).join(''),
      name,
      studentId: studentId || `EDU-${Math.floor(1000 + Math.random() * 9000)}`,
      department,
      course: 'CS-101',
      attendance: 95,
      performance: 85,
      riskLevel: 'Low Risk',
      status: 'Active',
      primaryIssue: 'None'
    };

    setStudents([newStudent, ...students]);
    setToastMessage(`Student "${name}" added successfully!`);
    setIsModalOpen(false);
    setName('');
    setStudentId('');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleToggleStatus = (id: string) => {
    setStudents((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, status: s.status === 'Active' ? 'Disabled' : 'Active' } : s
      )
    );
    setToastMessage('Student account status updated.');
    setTimeout(() => setToastMessage(null), 2500);
  };

  return (
    <div className="space-y-lg max-w-7xl mx-auto pb-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-headline text-[24px] md:text-[32px] font-bold text-on-surface">
            Student Directory & Management
          </h2>
          <p className="font-body text-[14px] text-on-surface-variant mt-1">
            Manage student registrations, department enrollments, and academic risk profiles.
          </p>
        </div>

        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-primary text-on-primary font-label text-[12px] font-semibold rounded-lg flex items-center gap-2 hover:bg-primary/90 transition-colors shadow-xs cursor-pointer self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Student</span>
        </button>
      </div>

      {toastMessage && (
        <div className="p-md bg-tertiary/10 border border-tertiary/30 rounded-xl text-tertiary flex items-center gap-2 font-body text-[14px] font-medium animate-fadeIn">
          <CheckCircle2 className="w-5 h-5" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-md">
        <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/30 shadow-card flex flex-col justify-between">
          <span className="font-label text-[12px] text-on-surface-variant uppercase font-medium">Total Students</span>
          <span className="font-display text-[28px] font-bold text-on-surface">12,450</span>
        </div>
        <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/30 shadow-card flex flex-col justify-between">
          <span className="font-label text-[12px] text-tertiary uppercase font-medium">Active Enrolled</span>
          <span className="font-display text-[28px] font-bold text-tertiary">11,800</span>
        </div>
        <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/30 shadow-card flex flex-col justify-between">
          <span className="font-label text-[12px] text-error uppercase font-medium">High/Med Risk</span>
          <span className="font-display text-[28px] font-bold text-error">374</span>
        </div>
        <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/30 shadow-card flex flex-col justify-between">
          <span className="font-label text-[12px] text-primary uppercase font-medium">New Intake</span>
          <span className="font-display text-[28px] font-bold text-primary">+240</span>
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
            placeholder="Search students by name or ID..."
            className="w-full bg-surface-container-low border border-outline-variant/50 rounded-lg py-2 pl-10 pr-4 text-[14px] outline-none text-on-surface focus:border-primary"
          />
        </div>

        <div className="flex items-center gap-sm">
          <Filter className="w-4 h-4 text-on-surface-variant" />
          <select 
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="bg-surface-container-low border border-outline-variant/50 rounded-lg px-3 py-2 text-[14px] outline-none text-on-surface cursor-pointer"
          >
            <option value="All">All Departments</option>
            <option value="School of Computing">School of Computing</option>
            <option value="Applied Mathematics">Applied Mathematics</option>
            <option value="School of Engineering">School of Engineering</option>
          </select>

          <select 
            value={selectedRisk}
            onChange={(e) => setSelectedRisk(e.target.value)}
            className="bg-surface-container-low border border-outline-variant/50 rounded-lg px-3 py-2 text-[14px] outline-none text-on-surface cursor-pointer"
          >
            <option value="All">All Risk Levels</option>
            <option value="Low Risk">Low Risk</option>
            <option value="Medium Risk">Medium Risk</option>
            <option value="High Risk">High Risk</option>
          </select>
        </div>
      </div>

      {/* Student Directory Table */}
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-bright border-b border-outline-variant/30 font-label text-[12px] uppercase text-on-surface-variant">
                <th className="p-sm pl-md">Student ID</th>
                <th className="p-sm">Full Name</th>
                <th className="p-sm">Department</th>
                <th className="p-sm">Attendance</th>
                <th className="p-sm">Score</th>
                <th className="p-sm">Academic Risk</th>
                <th className="p-sm">Status</th>
                <th className="p-sm pr-md text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {filteredStudents.map((std) => (
                <tr key={std.id} className="hover:bg-surface-container-low transition-colors">
                  <td className="p-sm pl-md font-mono text-[13px] text-outline-variant">{std.studentId}</td>
                  <td className="p-sm font-medium text-on-surface">{std.name}</td>
                  <td className="p-sm font-body text-[14px] text-on-surface-variant">{std.department}</td>
                  <td className="p-sm font-body text-[14px] text-on-surface">{std.attendance}%</td>
                  <td className="p-sm font-body text-[14px] font-bold text-on-surface">{std.performance}%</td>
                  <td className="p-sm">
                    <span className={`px-2.5 py-1 font-label text-[11px] font-bold rounded-full ${std.riskLevel === 'High Risk' ? 'bg-error/10 text-error' : std.riskLevel === 'Medium Risk' ? 'bg-[#d97706]/10 text-[#d97706]' : 'bg-tertiary/10 text-tertiary'}`}>
                      {std.riskLevel}
                    </span>
                  </td>
                  <td className="p-sm">
                    <span className={`px-2.5 py-1 font-label text-[11px] font-bold rounded-full ${std.status === 'Disabled' ? 'bg-surface-container-highest text-on-surface-variant' : 'bg-primary/10 text-primary'}`}>
                      {std.status || 'Active'}
                    </span>
                  </td>
                  <td className="p-sm pr-md text-right">
                    <div className="inline-flex gap-2">
                      <button 
                        onClick={() => handleToggleStatus(std.id)}
                        className="px-2.5 py-1 bg-surface-container-low text-on-surface font-label text-[12px] font-semibold rounded hover:bg-surface-container-high cursor-pointer"
                      >
                        {std.status === 'Disabled' ? 'Enable' : 'Disable'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Student Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-md">
          <div className="bg-surface rounded-2xl border border-outline-variant shadow-floating w-full max-w-lg p-lg relative animate-fadeIn space-y-md">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 p-1 text-on-surface-variant">
              <X className="w-5 h-5" />
            </button>

            <form onSubmit={handleAddStudent} className="space-y-md">
              <h3 className="font-title text-[22px] font-bold text-on-surface">Add New Student Registration</h3>

              <div className="space-y-xs">
                <label className="font-label text-[12px] text-on-surface font-medium">Full Name</label>
                <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Maya Lin" className="w-full p-2.5 bg-surface-container-lowest border border-outline-variant/60 rounded-lg text-[14px] outline-none" />
              </div>

              <div className="space-y-xs">
                <label className="font-label text-[12px] text-on-surface font-medium">Student ID</label>
                <input type="text" value={studentId} onChange={(e) => setStudentId(e.target.value)} placeholder="EDU-8848 (Auto-generated if empty)" className="w-full p-2.5 bg-surface-container-lowest border border-outline-variant/60 rounded-lg text-[14px] outline-none" />
              </div>

              <div className="space-y-xs">
                <label className="font-label text-[12px] text-on-surface font-medium">Department</label>
                <select value={department} onChange={(e) => setDepartment(e.target.value)} className="w-full p-2.5 bg-surface-container-lowest border border-outline-variant/60 rounded-lg text-[14px] outline-none">
                  <option value="School of Computing">School of Computing</option>
                  <option value="Applied Mathematics">Applied Mathematics</option>
                  <option value="School of Engineering">School of Engineering</option>
                </select>
              </div>

              <div className="pt-sm border-t border-outline-variant/30 flex justify-end gap-sm">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-surface-container-low font-label text-[12px] font-semibold rounded-lg">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-primary text-on-primary font-label text-[12px] font-semibold rounded-lg cursor-pointer">Register Student</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
