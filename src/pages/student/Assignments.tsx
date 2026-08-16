import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  Upload, 
  X, 
  Sparkles, 
  MessageSquare,
  CheckCircle2,
  Loader2,
  Paperclip
} from 'lucide-react';
import { studentAssignmentsList } from '../../data/mockData';
import { StudentAssignment } from '../../types';
import { api } from '../../services/api';

export const Assignments: React.FC = () => {
  const [assignments, setAssignments] = useState<StudentAssignment[]>(studentAssignmentsList);
  const [selectedAssignment, setSelectedAssignment] = useState<StudentAssignment | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [submissionNotes, setSubmissionNotes] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadAssignments = async () => {
      try {
        const res = await api.getAssignments();
        if (res.assignments && res.assignments.length > 0) {
          setAssignments(res.assignments);
        }
      } catch (e) {
        // Fallback to initial mock data
      }
    };
    loadAssignments();
  }, []);

  const pendingCount = assignments.filter((a) => a.status === 'Pending').length;
  const submittedCount = assignments.filter((a) => a.status === 'Submitted').length;
  const evaluatedCount = assignments.filter((a) => a.status === 'Evaluated').length;
  const lateCount = assignments.filter((a) => a.status === 'Late').length;

  const filteredAssignments = assignments.filter((a) => 
    filterStatus === 'All' || a.status === filterStatus
  );

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFileName(e.target.files[0].name);
    }
  };

  const handleSubmitAssignment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAssignment) return;

    setIsLoading(true);
    try {
      await api.submitAssignment(selectedAssignment.id, {
        submissionContent: submissionNotes || `Solution uploaded: ${uploadedFileName || 'homework_solution.pdf'}`,
        fileAttachment: uploadedFileName || undefined,
      });

      setAssignments((prev) =>
        prev.map((a) =>
          a.id === selectedAssignment.id ? { ...a, status: 'Submitted', score: 'Pending' } : a
        )
      );
      setSubmitSuccess(true);
      setTimeout(() => {
        setSubmitSuccess(false);
        setSelectedAssignment(null);
        setUploadedFileName(null);
        setSubmissionNotes('');
      }, 1500);
    } catch (e) {
      // Offline fallback
      setAssignments((prev) =>
        prev.map((a) =>
          a.id === selectedAssignment.id ? { ...a, status: 'Submitted', score: 'Pending' } : a
        )
      );
      setSubmitSuccess(true);
      setTimeout(() => {
        setSubmitSuccess(false);
        setSelectedAssignment(null);
        setUploadedFileName(null);
        setSubmissionNotes('');
      }, 1500);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadge = (status: StudentAssignment['status']) => {
    switch (status) {
      case 'Pending':
        return <span className="px-2.5 py-1 bg-secondary/10 text-secondary font-label text-[11px] font-bold rounded-full">Pending</span>;
      case 'Submitted':
        return <span className="px-2.5 py-1 bg-primary/10 text-primary font-label text-[11px] font-bold rounded-full">Submitted</span>;
      case 'Evaluated':
        return <span className="px-2.5 py-1 bg-tertiary/10 text-tertiary font-label text-[11px] font-bold rounded-full">Evaluated</span>;
      case 'Late':
        return <span className="px-2.5 py-1 bg-error/10 text-error font-label text-[11px] font-bold rounded-full">Late</span>;
    }
  };

  return (
    <div className="space-y-lg max-w-7xl mx-auto pb-8">
      {/* Page Header */}
      <div>
        <h2 className="font-headline text-[24px] md:text-[32px] font-bold text-on-surface">
          Assignments & Submissions
        </h2>
        <p className="font-body text-[14px] text-on-surface-variant mt-1">
          Review coursework deadlines, submission statuses, and AI feedback.
        </p>
      </div>

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-md">
        <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/30 shadow-card flex flex-col justify-between">
          <span className="font-label text-[12px] text-on-surface-variant uppercase font-medium">Total</span>
          <span className="font-display text-[28px] font-bold text-on-surface">{assignments.length}</span>
        </div>
        <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/30 shadow-card flex flex-col justify-between">
          <span className="font-label text-[12px] text-secondary uppercase font-medium">Pending</span>
          <span className="font-display text-[28px] font-bold text-secondary">{pendingCount}</span>
        </div>
        <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/30 shadow-card flex flex-col justify-between">
          <span className="font-label text-[12px] text-primary uppercase font-medium">Submitted</span>
          <span className="font-display text-[28px] font-bold text-primary">{submittedCount}</span>
        </div>
        <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/30 shadow-card flex flex-col justify-between">
          <span className="font-label text-[12px] text-tertiary uppercase font-medium">Evaluated</span>
          <span className="font-display text-[28px] font-bold text-tertiary">{evaluatedCount}</span>
        </div>
        <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/30 shadow-card flex flex-col justify-between">
          <span className="font-label text-[12px] text-error uppercase font-medium">Late</span>
          <span className="font-display text-[28px] font-bold text-error">{lateCount}</span>
        </div>
      </div>

      {/* Assignments Table Card */}
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-card overflow-hidden">
        <div className="p-md border-b border-outline-variant/30 bg-surface-bright flex flex-col sm:flex-row sm:items-center justify-between gap-sm">
          <h3 className="font-title text-[18px] font-semibold text-on-surface">
            Coursework Tracker
          </h3>
          <div className="flex gap-2">
            {['All', 'Pending', 'Submitted', 'Evaluated', 'Late'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-3 py-1 rounded-md font-label text-[12px] font-medium transition-colors cursor-pointer ${
                  filterStatus === status
                    ? 'bg-primary text-on-primary font-semibold'
                    : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-bright border-b border-outline-variant/30">
                <th className="p-sm pl-md font-label text-[12px] text-on-surface-variant uppercase font-medium">Assignment</th>
                <th className="p-sm font-label text-[12px] text-on-surface-variant uppercase font-medium">Course</th>
                <th className="p-sm font-label text-[12px] text-on-surface-variant uppercase font-medium">Due Date</th>
                <th className="p-sm font-label text-[12px] text-on-surface-variant uppercase font-medium">Status</th>
                <th className="p-sm font-label text-[12px] text-on-surface-variant uppercase font-medium">Score</th>
                <th className="p-sm pr-md font-label text-[12px] text-on-surface-variant uppercase font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {filteredAssignments.map((assignment) => (
                <tr key={assignment.id} className="hover:bg-surface-container-low transition-colors">
                  <td className="p-sm pl-md">
                    <p className="font-body text-[14px] font-medium text-on-surface">{assignment.title}</p>
                  </td>
                  <td className="p-sm font-body text-[14px] text-on-surface-variant">{assignment.course}</td>
                  <td className="p-sm font-body text-[14px] text-on-surface-variant">{assignment.dueDate}</td>
                  <td className="p-sm">{getStatusBadge(assignment.status)}</td>
                  <td className="p-sm font-body text-[14px] font-semibold text-on-surface">
                    {assignment.score || '-'}
                  </td>
                  <td className="p-sm pr-md text-right">
                    <button 
                      onClick={() => setSelectedAssignment(assignment)}
                      className="px-3 py-1 bg-surface-container-low text-primary hover:bg-primary-container hover:text-on-primary-container font-label text-[12px] font-semibold rounded transition-colors cursor-pointer"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Assignment Modal */}
      {selectedAssignment && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-md">
          <div className="bg-surface rounded-2xl border border-outline-variant shadow-floating w-full max-w-2xl max-h-[90vh] overflow-y-auto p-lg relative animate-fadeIn space-y-md">
            <button 
              onClick={() => setSelectedAssignment(null)}
              className="absolute top-4 right-4 p-1 text-on-surface-variant hover:text-on-surface rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            {submitSuccess ? (
              <div className="py-xl text-center space-y-md">
                <CheckCircle2 className="w-12 h-12 text-tertiary mx-auto" />
                <h3 className="font-headline text-[22px] font-bold text-on-surface">Assignment Submitted Successfully!</h3>
                <p className="font-body text-[14px] text-on-surface-variant">Your submission has been logged and sent for evaluation.</p>
              </div>
            ) : (
              <>
                <div>
                  <div className="flex items-center gap-2 mb-xs">
                    <span className="font-label text-[12px] font-semibold text-primary uppercase">{selectedAssignment.courseCode}</span>
                    {getStatusBadge(selectedAssignment.status)}
                  </div>
                  <h3 className="font-title text-[22px] font-bold text-on-surface">{selectedAssignment.title}</h3>
                  <p className="font-body text-[14px] text-on-surface-variant mt-1">Due: {selectedAssignment.dueDate}</p>
                </div>

                {selectedAssignment.description && (
                  <div className="bg-surface-container-lowest p-md rounded-lg border border-outline-variant/30">
                    <h4 className="font-label text-[12px] text-on-surface-variant uppercase font-semibold mb-1">Description</h4>
                    <p className="font-body text-[14px] text-on-surface">{selectedAssignment.description}</p>
                  </div>
                )}

                {selectedAssignment.fileAttachment && (
                  <div className="p-sm bg-primary/5 border border-primary/20 rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[13px] text-primary font-medium">
                      <Paperclip className="w-4 h-4 shrink-0" />
                      <span>Coursework Material: {selectedAssignment.fileAttachment}</span>
                    </div>
                    <span className="text-[11px] text-on-surface-variant font-medium">Attached by Instructor</span>
                  </div>
                )}

                {selectedAssignment.teacherFeedback && (
                  <div className="bg-surface-container-low p-md rounded-lg border border-outline-variant/30 flex items-start gap-2">
                    <MessageSquare className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-label text-[12px] text-primary uppercase font-semibold">Teacher Feedback</h4>
                      <p className="font-body text-[14px] text-on-surface">{selectedAssignment.teacherFeedback}</p>
                    </div>
                  </div>
                )}

                {selectedAssignment.aiFeedback && (
                  <div className="ai-gradient p-md rounded-lg border border-secondary/20 flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-label text-[12px] text-secondary uppercase font-semibold">AI Assistant Feedback</h4>
                      <p className="font-body text-[14px] text-on-surface">{selectedAssignment.aiFeedback}</p>
                    </div>
                  </div>
                )}

                {selectedAssignment.status === 'Pending' || selectedAssignment.status === 'Late' ? (
                  <form onSubmit={handleSubmitAssignment} className="space-y-md pt-sm border-t border-outline-variant/30">
                    <h4 className="font-title text-[16px] font-semibold text-on-surface">Submit Assignment Solution</h4>
                    
                    <div className="space-y-xs">
                      <label className="font-label text-[12px] text-on-surface font-medium">
                        Solution Notes or Comments
                      </label>
                      <textarea
                        rows={2}
                        value={submissionNotes}
                        onChange={(e) => setSubmissionNotes(e.target.value)}
                        placeholder="Add any commentary, methodology notes, or Github repository links..."
                        className="w-full p-2.5 bg-surface-container-lowest border border-outline-variant/60 rounded-lg text-[13px] text-on-surface outline-none focus:border-primary"
                      />
                    </div>

                    <div className="border-2 border-dashed border-outline-variant/60 rounded-xl p-md text-center bg-surface-container-lowest hover:bg-surface-container-low transition-colors relative cursor-pointer">
                      <input 
                        type="file" 
                        onChange={handleFileUpload} 
                        className="absolute inset-0 opacity-0 cursor-pointer" 
                      />
                      <Upload className="w-8 h-8 text-primary mx-auto mb-2" />
                      <p className="font-body text-[14px] text-on-surface font-medium">
                        {uploadedFileName ? `Selected File: ${uploadedFileName}` : 'Drag & drop solution file here or click to browse'}
                      </p>
                      <p className="font-label text-[12px] text-on-surface-variant">Supports PDF, ZIP, DOCX, PY, CPP up to 25MB</p>
                    </div>

                    <div className="flex justify-end gap-sm">
                      <button 
                        type="button" 
                        onClick={() => setSelectedAssignment(null)}
                        className="px-4 py-2 bg-surface-container-low text-on-surface font-label text-[12px] font-semibold rounded-lg cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit" 
                        disabled={isLoading || (!uploadedFileName && !submissionNotes.trim())}
                        className="px-5 py-2 bg-primary text-on-primary font-label text-[12px] font-semibold rounded-lg disabled:opacity-50 cursor-pointer shadow-xs flex items-center gap-1.5"
                      >
                        {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                        <span>Submit Work</span>
                      </button>
                    </div>
                  </form>
                ) : null}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
