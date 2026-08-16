import React, { useState } from 'react';
import { Plus, FileText, CheckCircle, Clock, X, CheckCircle2, Sparkles } from 'lucide-react';
import { teacherSubmissionsList } from '../../data/mockData';
import { TeacherSubmission } from '../../types';

export const TeacherAssignments: React.FC = () => {
  const [submissions, setSubmissions] = useState<TeacherSubmission[]>(teacherSubmissionsList);
  const [selectedSubmission, setSelectedSubmission] = useState<TeacherSubmission | null>(null);
  const [gradeInput, setGradeInput] = useState<number>(85);
  const [feedbackInput, setFeedbackInput] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [createdSuccess, setCreatedSuccess] = useState(false);
  const [gradedSuccess, setGradedSuccess] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [course, setCourse] = useState('MATH-401');
  const [dueDate, setDueDate] = useState('');
  const [maxScore, setMaxScore] = useState(100);

  const handleEvaluateSubmission = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSubmission) return;

    setSubmissions((prev) =>
      prev.map((s) =>
        s.id === selectedSubmission.id
          ? { ...s, score: gradeInput, teacherFeedback: feedbackInput, status: 'Graded' }
          : s
      )
    );
    setGradedSuccess(true);
    setTimeout(() => {
      setGradedSuccess(false);
      setSelectedSubmission(null);
    }, 1200);
  };

  const handleCreateAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    setCreatedSuccess(true);
    setTimeout(() => {
      setCreatedSuccess(false);
      setIsCreateModalOpen(false);
      setTitle('');
    }, 1500);
  };

  return (
    <div className="space-y-lg max-w-7xl mx-auto pb-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-headline text-[24px] md:text-[32px] font-bold text-on-surface">
            Assignment Management & Grading
          </h2>
          <p className="font-body text-[14px] text-on-surface-variant mt-1">
            Create coursework assignments, review student submissions, and submit grades.
          </p>
        </div>

        <button 
          onClick={() => setIsCreateModalOpen(true)}
          className="px-4 py-2 bg-primary text-on-primary font-label text-[12px] font-semibold rounded-lg flex items-center gap-2 hover:bg-primary/90 transition-colors shadow-xs cursor-pointer self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Create Assignment</span>
        </button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-md">
        <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/30 shadow-card flex flex-col justify-between">
          <span className="font-label text-[12px] text-on-surface-variant uppercase font-medium">Total Assignments</span>
          <span className="font-display text-[28px] font-bold text-on-surface">6</span>
        </div>
        <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/30 shadow-card flex flex-col justify-between">
          <span className="font-label text-[12px] text-[#d97706] uppercase font-medium">Pending Grade</span>
          <span className="font-display text-[28px] font-bold text-[#d97706]">
            {submissions.filter((s) => s.status === 'Pending Grade').length}
          </span>
        </div>
        <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/30 shadow-card flex flex-col justify-between">
          <span className="font-label text-[12px] text-tertiary uppercase font-medium">Evaluated</span>
          <span className="font-display text-[28px] font-bold text-tertiary">
            {submissions.filter((s) => s.status === 'Graded').length}
          </span>
        </div>
        <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/30 shadow-card flex flex-col justify-between">
          <span className="font-label text-[12px] text-primary uppercase font-medium">Avg Grade</span>
          <span className="font-display text-[28px] font-bold text-primary">84%</span>
        </div>
      </div>

      {/* Submissions Table */}
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-card overflow-hidden">
        <div className="p-md border-b border-outline-variant/30 bg-surface-bright flex justify-between items-center">
          <h3 className="font-title text-[18px] font-semibold text-on-surface">Student Submissions Queue</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-bright border-b border-outline-variant/30 font-label text-[12px] uppercase text-on-surface-variant">
                <th className="p-sm pl-md">Student</th>
                <th className="p-sm">Assignment Title</th>
                <th className="p-sm">Submitted Date</th>
                <th className="p-sm">Score</th>
                <th className="p-sm">Status</th>
                <th className="p-sm pr-md text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {submissions.map((sub) => (
                <tr key={sub.id} className="hover:bg-surface-container-low transition-colors">
                  <td className="p-sm pl-md font-medium text-on-surface">{sub.studentName} ({sub.studentId})</td>
                  <td className="p-sm font-body text-[14px] text-on-surface-variant">{sub.assignmentTitle}</td>
                  <td className="p-sm font-body text-[14px] text-on-surface-variant">{sub.submittedDate}</td>
                  <td className="p-sm font-body text-[14px] font-bold text-on-surface">
                    {sub.score ? `${sub.score}/${sub.maxScore}` : '-'}
                  </td>
                  <td className="p-sm">
                    <span className={`px-2.5 py-1 font-label text-[11px] font-bold rounded-full ${sub.status === 'Graded' ? 'bg-tertiary/10 text-tertiary' : 'bg-[#d97706]/10 text-[#d97706]'}`}>
                      {sub.status}
                    </span>
                  </td>
                  <td className="p-sm pr-md text-right">
                    <button 
                      onClick={() => { setSelectedSubmission(sub); setGradeInput(sub.score || 85); setFeedbackInput(sub.teacherFeedback || ''); }}
                      className="px-3 py-1 bg-surface-container-low text-primary hover:bg-primary-container hover:text-on-primary-container font-label text-[12px] font-semibold rounded transition-colors cursor-pointer"
                    >
                      {sub.status === 'Graded' ? 'Review Grade' : 'Evaluate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Evaluate Submission Modal */}
      {selectedSubmission && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-md">
          <div className="bg-surface rounded-2xl border border-outline-variant shadow-floating w-full max-w-lg p-lg relative animate-fadeIn space-y-md">
            <button onClick={() => setSelectedSubmission(null)} className="absolute top-4 right-4 p-1 text-on-surface-variant">
              <X className="w-5 h-5" />
            </button>

            {gradedSuccess ? (
              <div className="py-xl text-center space-y-md">
                <CheckCircle2 className="w-12 h-12 text-tertiary mx-auto" />
                <h3 className="font-headline text-[22px] font-bold text-on-surface">Grade Recorded!</h3>
                <p className="font-body text-[14px] text-on-surface-variant">Student grade and feedback updated.</p>
              </div>
            ) : (
              <form onSubmit={handleEvaluateSubmission} className="space-y-md">
                <div>
                  <span className="font-label text-[12px] text-primary uppercase font-bold">{selectedSubmission.studentName} ({selectedSubmission.studentId})</span>
                  <h3 className="font-title text-[20px] font-bold text-on-surface mt-1">{selectedSubmission.assignmentTitle}</h3>
                </div>

                {selectedSubmission.aiFeedback && (
                  <div className="ai-gradient p-sm rounded-lg border border-secondary/20 flex items-start gap-2 text-[13px]">
                    <Sparkles className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                    <span>{selectedSubmission.aiFeedback}</span>
                  </div>
                )}

                <div className="space-y-xs">
                  <label className="font-label text-[12px] text-on-surface font-medium">Score (Max {selectedSubmission.maxScore})</label>
                  <input 
                    type="number" 
                    min={0} max={selectedSubmission.maxScore}
                    value={gradeInput}
                    onChange={(e) => setGradeInput(Number(e.target.value))}
                    className="w-full p-2.5 bg-surface-container-lowest border border-outline-variant/60 rounded-lg text-[14px] font-bold text-on-surface outline-none focus:border-primary"
                  />
                </div>

                <div className="space-y-xs">
                  <label className="font-label text-[12px] text-on-surface font-medium">Teacher Feedback & Guidance</label>
                  <textarea 
                    rows={3}
                    value={feedbackInput}
                    onChange={(e) => setFeedbackInput(e.target.value)}
                    placeholder="Provide comments on solution methodology..."
                    className="w-full p-2.5 bg-surface-container-lowest border border-outline-variant/60 rounded-lg text-[14px] text-on-surface outline-none focus:border-primary"
                  />
                </div>

                <div className="pt-sm border-t border-outline-variant/30 flex justify-end gap-sm">
                  <button type="button" onClick={() => setSelectedSubmission(null)} className="px-4 py-2 bg-surface-container-low text-on-surface font-label text-[12px] font-semibold rounded-lg">
                    Cancel
                  </button>
                  <button type="submit" className="px-4 py-2 bg-primary text-on-primary font-label text-[12px] font-semibold rounded-lg cursor-pointer">
                    Save Evaluation
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Create Assignment Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-md">
          <div className="bg-surface rounded-2xl border border-outline-variant shadow-floating w-full max-w-lg p-lg relative animate-fadeIn space-y-md">
            <button onClick={() => setIsCreateModalOpen(false)} className="absolute top-4 right-4 p-1 text-on-surface-variant">
              <X className="w-5 h-5" />
            </button>

            {createdSuccess ? (
              <div className="py-xl text-center space-y-md">
                <CheckCircle2 className="w-12 h-12 text-tertiary mx-auto" />
                <h3 className="font-headline text-[22px] font-bold text-on-surface">Assignment Created!</h3>
                <p className="font-body text-[14px] text-on-surface-variant">Published to class student portals.</p>
              </div>
            ) : (
              <form onSubmit={handleCreateAssignment} className="space-y-md">
                <h3 className="font-title text-[22px] font-bold text-on-surface">Create New Assignment</h3>

                <div className="space-y-xs">
                  <label className="font-label text-[12px] text-on-surface font-medium">Assignment Title</label>
                  <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Fourier Transform Analysis" className="w-full p-2.5 bg-surface-container-lowest border border-outline-variant/60 rounded-lg text-[14px] text-on-surface outline-none" />
                </div>

                <div className="grid grid-cols-2 gap-md">
                  <div className="space-y-xs">
                    <label className="font-label text-[12px] text-on-surface font-medium">Due Date</label>
                    <input type="text" required value={dueDate} onChange={(e) => setDueDate(e.target.value)} placeholder="Nov 10, 2024" className="w-full p-2.5 bg-surface-container-lowest border border-outline-variant/60 rounded-lg text-[14px] text-on-surface outline-none" />
                  </div>

                  <div className="space-y-xs">
                    <label className="font-label text-[12px] text-on-surface font-medium">Max Score</label>
                    <input type="number" value={maxScore} onChange={(e) => setMaxScore(Number(e.target.value))} className="w-full p-2.5 bg-surface-container-lowest border border-outline-variant/60 rounded-lg text-[14px] text-on-surface outline-none" />
                  </div>
                </div>

                <div className="pt-sm border-t border-outline-variant/30 flex justify-end gap-sm">
                  <button type="button" onClick={() => setIsCreateModalOpen(false)} className="px-4 py-2 bg-surface-container-low text-on-surface font-label text-[12px] font-semibold rounded-lg">
                    Cancel
                  </button>
                  <button type="submit" className="px-4 py-2 bg-primary text-on-primary font-label text-[12px] font-semibold rounded-lg cursor-pointer">
                    Publish Assignment
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
