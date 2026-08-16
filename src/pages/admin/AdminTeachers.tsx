import React, { useState } from 'react';
import { Search, Plus, Filter, UserCheck, X, CheckCircle2 } from 'lucide-react';
import { adminTeachersDirectory } from '../../data/mockData';
import { AdminTeacher } from '../../types';

export const AdminTeachers: React.FC = () => {
  const [teachers, setTeachers] = useState<AdminTeacher[]>(adminTeachersDirectory);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('School of Computing');

  const filteredTeachers = teachers.filter((t) =>
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.employeeId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    const newTeacher: AdminTeacher = {
      id: `t_${Date.now()}`,
      name,
      employeeId: employeeId || `TCH-${Math.floor(100 + Math.random() * 900)}`,
      email: email || `${name.toLowerCase().replace(' ', '.')}@eduai.edu`,
      department,
      coursesCount: 2,
      studentsCount: 60,
      designation: 'Assistant Professor',
      status: 'Active'
    };

    setTeachers([newTeacher, ...teachers]);
    setToastMessage(`Faculty member "${name}" added!`);
    setIsModalOpen(false);
    setName('');
    setEmployeeId('');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleToggleStatus = (id: string) => {
    setTeachers((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: t.status === 'Active' ? 'Disabled' : 'Active' } : t))
    );
    setToastMessage('Faculty status updated.');
    setTimeout(() => setToastMessage(null), 2500);
  };

  return (
    <div className="space-y-lg max-w-7xl mx-auto pb-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-headline text-[24px] md:text-[32px] font-bold text-on-surface">
            Faculty & Teacher Directory
          </h2>
          <p className="font-body text-[14px] text-on-surface-variant mt-1">
            Manage academic professors, department assignments, and course loads.
          </p>
        </div>

        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-primary text-on-primary font-label text-[12px] font-semibold rounded-lg flex items-center gap-2 hover:bg-primary/90 transition-colors shadow-xs cursor-pointer self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Faculty Member</span>
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
          <span className="font-label text-[12px] text-on-surface-variant uppercase font-medium">Total Teachers</span>
          <span className="font-display text-[28px] font-bold text-on-surface">840</span>
        </div>
        <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/30 shadow-card flex flex-col justify-between">
          <span className="font-label text-[12px] text-tertiary uppercase font-medium">Active Faculty</span>
          <span className="font-display text-[28px] font-bold text-tertiary">820</span>
        </div>
        <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/30 shadow-card flex flex-col justify-between">
          <span className="font-label text-[12px] text-primary uppercase font-medium">Departments</span>
          <span className="font-display text-[28px] font-bold text-primary">12</span>
        </div>
        <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/30 shadow-card flex flex-col justify-between">
          <span className="font-label text-[12px] text-secondary uppercase font-medium">Courses Managed</span>
          <span className="font-display text-[28px] font-bold text-secondary">320</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-surface-container-lowest rounded-xl p-md border border-outline-variant/30 shadow-card flex items-center">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search faculty by name or ID..."
            className="w-full bg-surface-container-low border border-outline-variant/50 rounded-lg py-2 pl-10 pr-4 text-[14px] outline-none text-on-surface focus:border-primary"
          />
        </div>
      </div>

      {/* Faculty Table */}
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-bright border-b border-outline-variant/30 font-label text-[12px] uppercase text-on-surface-variant">
                <th className="p-sm pl-md">Employee ID</th>
                <th className="p-sm">Teacher Name</th>
                <th className="p-sm">Department</th>
                <th className="p-sm">Designation</th>
                <th className="p-sm">Courses</th>
                <th className="p-sm">Students</th>
                <th className="p-sm">Status</th>
                <th className="p-sm pr-md text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {filteredTeachers.map((tch) => (
                <tr key={tch.id} className="hover:bg-surface-container-low transition-colors">
                  <td className="p-sm pl-md font-mono text-[13px] text-outline-variant">{tch.employeeId}</td>
                  <td className="p-sm font-medium text-on-surface">{tch.name}</td>
                  <td className="p-sm font-body text-[14px] text-on-surface-variant">{tch.department}</td>
                  <td className="p-sm font-body text-[14px] text-on-surface">{tch.designation}</td>
                  <td className="p-sm font-body text-[14px] font-bold text-primary">{tch.coursesCount}</td>
                  <td className="p-sm font-body text-[14px] text-on-surface">{tch.studentsCount}</td>
                  <td className="p-sm">
                    <span className={`px-2.5 py-1 font-label text-[11px] font-bold rounded-full ${tch.status === 'Disabled' ? 'bg-surface-container-highest text-on-surface-variant' : 'bg-tertiary/10 text-tertiary'}`}>
                      {tch.status}
                    </span>
                  </td>
                  <td className="p-sm pr-md text-right">
                    <button 
                      onClick={() => handleToggleStatus(tch.id)}
                      className="px-2.5 py-1 bg-surface-container-low text-on-surface font-label text-[12px] font-semibold rounded hover:bg-surface-container-high cursor-pointer"
                    >
                      {tch.status === 'Disabled' ? 'Enable' : 'Disable'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Teacher Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-md">
          <div className="bg-surface rounded-2xl border border-outline-variant shadow-floating w-full max-w-lg p-lg relative animate-fadeIn space-y-md">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 p-1 text-on-surface-variant">
              <X className="w-5 h-5" />
            </button>

            <form onSubmit={handleAddTeacher} className="space-y-md">
              <h3 className="font-title text-[22px] font-bold text-on-surface">Add New Faculty Member</h3>

              <div className="space-y-xs">
                <label className="font-label text-[12px] text-on-surface font-medium">Faculty Name</label>
                <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Dr. Alan Turing" className="w-full p-2.5 bg-surface-container-lowest border border-outline-variant/60 rounded-lg text-[14px] outline-none" />
              </div>

              <div className="grid grid-cols-2 gap-md">
                <div className="space-y-xs">
                  <label className="font-label text-[12px] text-on-surface font-medium">Employee ID</label>
                  <input type="text" value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} placeholder="TCH-405" className="w-full p-2.5 bg-surface-container-lowest border border-outline-variant/60 rounded-lg text-[14px] outline-none" />
                </div>
                <div className="space-y-xs">
                  <label className="font-label text-[12px] text-on-surface font-medium">Email</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@eduai.edu" className="w-full p-2.5 bg-surface-container-lowest border border-outline-variant/60 rounded-lg text-[14px] outline-none" />
                </div>
              </div>

              <div className="pt-sm border-t border-outline-variant/30 flex justify-end gap-sm">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-surface-container-low font-label text-[12px] font-semibold rounded-lg">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-primary text-on-primary font-label text-[12px] font-semibold rounded-lg cursor-pointer">Add Faculty</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
