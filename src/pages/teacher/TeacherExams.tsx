import React, { useState } from 'react';
import { Plus, Calendar, Clock, MapPin, X, CheckCircle2 } from 'lucide-react';
import { studentExamsList } from '../../data/mockData';
import { StudentExam } from '../../types';

export const TeacherExams: React.FC = () => {
  const [exams, setExams] = useState<StudentExam[]>(studentExamsList);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [createdSuccess, setCreatedSuccess] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('Mathematics (MATH-401)');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [duration, setDuration] = useState('2 Hours');
  const [maxMarks, setMaxMarks] = useState(100);

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
      isUpcoming: true
    };

    setExams([newExam, ...exams]);
    setCreatedSuccess(true);
    setTimeout(() => {
      setCreatedSuccess(false);
      setIsModalOpen(false);
      setTitle('');
    }, 1500);
  };

  return (
    <div className="space-y-lg max-w-7xl mx-auto pb-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-headline text-[24px] md:text-[32px] font-bold text-on-surface">
            Examinations & Assessment Portal
          </h2>
          <p className="font-body text-[14px] text-on-surface-variant mt-1">
            Schedule midterms, final examinations, online quizzes, and manage venue logistics.
          </p>
        </div>

        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-primary text-on-primary font-label text-[12px] font-semibold rounded-lg flex items-center gap-2 hover:bg-primary/90 transition-colors shadow-xs cursor-pointer self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Schedule New Exam</span>
        </button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-md">
        <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/30 shadow-card flex flex-col justify-between">
          <span className="font-label text-[12px] text-primary uppercase font-medium">Upcoming Exams</span>
          <span className="font-display text-[28px] font-bold text-primary">2</span>
        </div>
        <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/30 shadow-card flex flex-col justify-between">
          <span className="font-label text-[12px] text-tertiary uppercase font-medium">Completed</span>
          <span className="font-display text-[28px] font-bold text-tertiary">2</span>
        </div>
        <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/30 shadow-card flex flex-col justify-between">
          <span className="font-label text-[12px] text-on-surface-variant uppercase font-medium">Drafts</span>
          <span className="font-display text-[28px] font-bold text-on-surface">1</span>
        </div>
        <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/30 shadow-card flex flex-col justify-between">
          <span className="font-label text-[12px] text-[#d97706] uppercase font-medium">Results Pending</span>
          <span className="font-display text-[28px] font-bold text-[#d97706]">1</span>
        </div>
      </div>

      {/* Exam Schedule Table */}
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-card overflow-hidden">
        <div className="p-md border-b border-outline-variant/30 bg-surface-bright flex justify-between items-center">
          <h3 className="font-title text-[18px] font-semibold text-on-surface">Scheduled Examinations</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-bright border-b border-outline-variant/30 font-label text-[12px] uppercase text-on-surface-variant">
                <th className="p-sm pl-md">Exam Title</th>
                <th className="p-sm">Subject</th>
                <th className="p-sm">Date & Time</th>
                <th className="p-sm">Duration</th>
                <th className="p-sm">Venue</th>
                <th className="p-sm pr-md font-label text-[12px] uppercase text-on-surface-variant">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {exams.map((exam) => (
                <tr key={exam.id} className="hover:bg-surface-container-low transition-colors">
                  <td className="p-sm pl-md font-body text-[14px] font-medium text-on-surface">{exam.title}</td>
                  <td className="p-sm font-body text-[14px] text-on-surface-variant">{exam.subject}</td>
                  <td className="p-sm font-body text-[14px] text-on-surface-variant">{exam.date} • {exam.time}</td>
                  <td className="p-sm font-body text-[14px] text-on-surface-variant">{exam.duration}</td>
                  <td className="p-sm font-body text-[14px] text-on-surface-variant">{exam.location}</td>
                  <td className="p-sm pr-md">
                    <span className={`px-2.5 py-1 font-label text-[11px] font-bold rounded-full ${exam.isUpcoming ? 'bg-primary/10 text-primary' : 'bg-tertiary/10 text-tertiary'}`}>
                      {exam.isUpcoming ? 'Upcoming' : 'Completed'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Schedule Exam Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-md">
          <div className="bg-surface rounded-2xl border border-outline-variant shadow-floating w-full max-w-lg p-lg relative animate-fadeIn space-y-md">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 p-1 text-on-surface-variant">
              <X className="w-5 h-5" />
            </button>

            {createdSuccess ? (
              <div className="py-xl text-center space-y-md">
                <CheckCircle2 className="w-12 h-12 text-tertiary mx-auto" />
                <h3 className="font-headline text-[22px] font-bold text-on-surface">Exam Scheduled!</h3>
                <p className="font-body text-[14px] text-on-surface-variant">Venue and notifications published.</p>
              </div>
            ) : (
              <form onSubmit={handleCreateExam} className="space-y-md">
                <h3 className="font-title text-[22px] font-bold text-on-surface">Schedule New Examination</h3>

                <div className="space-y-xs">
                  <label className="font-label text-[12px] text-on-surface font-medium">Exam Title</label>
                  <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Advanced Calculus Midterm" className="w-full p-2.5 bg-surface-container-lowest border border-outline-variant/60 rounded-lg text-[14px] outline-none" />
                </div>

                <div className="grid grid-cols-2 gap-md">
                  <div className="space-y-xs">
                    <label className="font-label text-[12px] text-on-surface font-medium">Exam Date</label>
                    <input type="text" required value={date} onChange={(e) => setDate(e.target.value)} placeholder="Nov 15, 2024" className="w-full p-2.5 bg-surface-container-lowest border border-outline-variant/60 rounded-lg text-[14px] outline-none" />
                  </div>
                  <div className="space-y-xs">
                    <label className="font-label text-[12px] text-on-surface font-medium">Start Time</label>
                    <input type="text" required value={time} onChange={(e) => setTime(e.target.value)} placeholder="9:00 AM" className="w-full p-2.5 bg-surface-container-lowest border border-outline-variant/60 rounded-lg text-[14px] outline-none" />
                  </div>
                </div>

                <div className="pt-sm border-t border-outline-variant/30 flex justify-end gap-sm">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-surface-container-low font-label text-[12px] font-semibold rounded-lg">
                    Cancel
                  </button>
                  <button type="submit" className="px-4 py-2 bg-primary text-on-primary font-label text-[12px] font-semibold rounded-lg cursor-pointer">
                    Schedule Exam
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
