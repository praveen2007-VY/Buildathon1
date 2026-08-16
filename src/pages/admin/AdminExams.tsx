import React, { useState } from 'react';
import { Plus, Calendar, Clock, MapPin, X, CheckCircle2 } from 'lucide-react';
import { studentExamsList } from '../../data/mockData';
import { StudentExam } from '../../types';

export const AdminExams: React.FC = () => {
  const [exams, setExams] = useState<StudentExam[]>(studentExamsList);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('Mathematics (MATH-101)');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [duration, setDuration] = useState('2 Hours');

  const handleCreateExam = (e: React.FormEvent) => {
    e.preventDefault();
    const newExam: StudentExam = {
      id: `ex_${Date.now()}`,
      title,
      subject,
      date,
      time,
      duration,
      location: 'Hall B - Room 302',
      isUpcoming: true,
      instructor: 'Prof. Henderson'
    };

    setExams([newExam, ...exams]);
    setToastMessage(`Examination "${title}" scheduled!`);
    setIsModalOpen(false);
    setTitle('');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handlePublishResults = (title: string) => {
    setToastMessage(`Official exam results for "${title}" published to student ledgers!`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="space-y-lg max-w-7xl mx-auto pb-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-headline text-[24px] md:text-[32px] font-bold text-on-surface">
            Institutional Examination Portal
          </h2>
          <p className="font-body text-[14px] text-on-surface-variant mt-1">
            Coordinate campus-wide examination schedules, invigilation logistics, and result publication.
          </p>
        </div>

        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-primary text-on-primary font-label text-[12px] font-semibold rounded-lg flex items-center gap-2 hover:bg-primary/90 transition-colors shadow-xs cursor-pointer self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Schedule Examination</span>
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
          <span className="font-label text-[12px] text-primary uppercase font-medium">Upcoming Exams</span>
          <span className="font-display text-[28px] font-bold text-primary">12</span>
        </div>
        <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/30 shadow-card flex flex-col justify-between">
          <span className="font-label text-[12px] text-tertiary uppercase font-medium">Completed</span>
          <span className="font-display text-[28px] font-bold text-tertiary">84</span>
        </div>
        <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/30 shadow-card flex flex-col justify-between">
          <span className="font-label text-[12px] text-[#d97706] uppercase font-medium">Results Pending</span>
          <span className="font-display text-[28px] font-bold text-[#d97706]">4</span>
        </div>
        <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/30 shadow-card flex flex-col justify-between">
          <span className="font-label text-[12px] text-secondary uppercase font-medium">Venues Allocated</span>
          <span className="font-display text-[28px] font-bold text-secondary">18</span>
        </div>
      </div>

      {/* Exam Table */}
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-bright border-b border-outline-variant/30 font-label text-[12px] uppercase text-on-surface-variant">
                <th className="p-sm pl-md">Exam Title</th>
                <th className="p-sm">Subject</th>
                <th className="p-sm">Lead Instructor</th>
                <th className="p-sm">Date & Time</th>
                <th className="p-sm">Venue</th>
                <th className="p-sm">Status</th>
                <th className="p-sm pr-md text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {exams.map((ex) => (
                <tr key={ex.id} className="hover:bg-surface-container-low transition-colors">
                  <td className="p-sm pl-md font-medium text-on-surface">{ex.title}</td>
                  <td className="p-sm font-body text-[14px] text-on-surface-variant">{ex.subject}</td>
                  <td className="p-sm font-body text-[14px] text-on-surface">{ex.instructor || 'Prof. Henderson'}</td>
                  <td className="p-sm font-body text-[14px] text-on-surface-variant">{ex.date} • {ex.time}</td>
                  <td className="p-sm font-body text-[14px] text-on-surface-variant">{ex.location}</td>
                  <td className="p-sm">
                    <span className={`px-2.5 py-1 font-label text-[11px] font-bold rounded-full ${ex.isUpcoming ? 'bg-primary/10 text-primary' : 'bg-tertiary/10 text-tertiary'}`}>
                      {ex.isUpcoming ? 'Upcoming' : 'Completed'}
                    </span>
                  </td>
                  <td className="p-sm pr-md text-right">
                    <button 
                      onClick={() => handlePublishResults(ex.title)}
                      className="px-2.5 py-1 bg-surface-container-low text-primary font-label text-[12px] font-semibold rounded hover:bg-primary-container cursor-pointer"
                    >
                      Publish Results
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Exam Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-md">
          <div className="bg-surface rounded-2xl border border-outline-variant shadow-floating w-full max-w-lg p-lg relative animate-fadeIn space-y-md">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 p-1 text-on-surface-variant">
              <X className="w-5 h-5" />
            </button>

            <form onSubmit={handleCreateExam} className="space-y-md">
              <h3 className="font-title text-[22px] font-bold text-on-surface">Schedule Institutional Exam</h3>

              <div className="space-y-xs">
                <label className="font-label text-[12px] text-on-surface font-medium">Exam Title</label>
                <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Fall Semester Final Exam" className="w-full p-2.5 bg-surface-container-lowest border border-outline-variant/60 rounded-lg text-[14px] outline-none" />
              </div>

              <div className="grid grid-cols-2 gap-md">
                <div className="space-y-xs">
                  <label className="font-label text-[12px] text-on-surface font-medium">Exam Date</label>
                  <input type="text" required value={date} onChange={(e) => setDate(e.target.value)} placeholder="Nov 20, 2024" className="w-full p-2.5 bg-surface-container-lowest border border-outline-variant/60 rounded-lg text-[14px] outline-none" />
                </div>
                <div className="space-y-xs">
                  <label className="font-label text-[12px] text-on-surface font-medium">Time Slot</label>
                  <input type="text" required value={time} onChange={(e) => setTime(e.target.value)} placeholder="9:00 AM" className="w-full p-2.5 bg-surface-container-lowest border border-outline-variant/60 rounded-lg text-[14px] outline-none" />
                </div>
              </div>

              <div className="pt-sm border-t border-outline-variant/30 flex justify-end gap-sm">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-surface-container-low font-label text-[12px] font-semibold rounded-lg">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-primary text-on-primary font-label text-[12px] font-semibold rounded-lg cursor-pointer">Publish Exam Schedule</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
