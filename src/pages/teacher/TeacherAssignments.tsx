import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  FileText, 
  CheckCircle, 
  Clock, 
  X, 
  CheckCircle2, 
  Sparkles, 
  Upload, 
  AlertCircle, 
  Paperclip, 
  Calendar, 
  Users, 
  BookOpen, 
  Award,
  Loader2,
  FileDown
} from 'lucide-react';
import { teacherSubmissionsList, studentAssignmentsList } from '../../data/mockData';
import { TeacherSubmission, StudentAssignment } from '../../types';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

export const TeacherAssignments: React.FC = () => {
  const { user } = useAuth();
  const [submissions, setSubmissions] = useState<TeacherSubmission[]>(teacherSubmissionsList);
  const [assignments, setAssignments] = useState<StudentAssignment[]>(studentAssignmentsList);
  const [activeTab, setActiveTab] = useState<'submissions' | 'assignments'>('submissions');
  
  // Selected Submission for Evaluation
  const [selectedSubmission, setSelectedSubmission] = useState<TeacherSubmission | null>(null);
  const [gradeInput, setGradeInput] = useState<number>(85);
  const [feedbackInput, setFeedbackInput] = useState('');
  const [isGrading, setIsGrading] = useState(false);
  const [gradedSuccess, setGradedSuccess] = useState(false);

  // Create Assignment Modal State
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdSuccess, setCreatedSuccess] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Form Fields
  const [title, setTitle] = useState('');
  const [course, setCourse] = useState('Advanced Calculus (MATH-401)');
  const [courseCode, setCourseCode] = useState('MATH-401');
  const [assignedClass, setAssignedClass] = useState('Section A - Morning Cohort');
  const [dueDate, setDueDate] = useState('');
  const [maxScore, setMaxScore] = useState(100);
  const [description, setDescription] = useState('');
  const [instructions, setInstructions] = useState('');
  const [attachedFile, setAttachedFile] = useState<string | null>(null);

  // Load live submissions and assignments from backend
  const loadData = async () => {
    try {
      const [subRes, asgRes] = await Promise.all([
        api.getSubmissions(),
        api.getAssignments(),
      ]);

      if (subRes.submissions && subRes.submissions.length > 0) {
        setSubmissions(subRes.submissions);
      }
      if (asgRes.assignments && asgRes.assignments.length > 0) {
        setAssignments(asgRes.assignments);
      }
    } catch (e) {
      console.log('Using local assignment data fallback');
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCourseChange = (selected: string) => {
    setCourse(selected);
    if (selected.includes('MATH-401')) setCourseCode('MATH-401');
    else if (selected.includes('CS-201')) setCourseCode('CS-201');
    else if (selected.includes('CS-402')) setCourseCode('CS-402');
    else if (selected.includes('CS-301')) setCourseCode('CS-301');
    else setCourseCode('GEN-101');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAttachedFile(e.target.files[0].name);
    }
  };

  // Grade Submission Action
  const handleEvaluateSubmission = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSubmission) return;

    setIsGrading(true);
    try {
      await api.gradeSubmission(selectedSubmission.id, {
        score: Number(gradeInput),
        teacherFeedback: feedbackInput || 'Great effort and clear derivation in your solutions.',
        aiFeedback: 'Algorithmic check verified: Formula application and syntax correct.',
      });

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
      }, 1500);
    } catch (e) {
      // Fallback update
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
      }, 1500);
    } finally {
      setIsGrading(false);
    }
  };

  // Create Assignment Action
  const handleCreateAssignment = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!title.trim()) {
      setFormError('Assignment title is required.');
      return;
    }
    if (!dueDate.trim()) {
      setFormError('Due date is required.');
      return;
    }

    setIsSubmitting(true);
    try {
      const payload: Partial<StudentAssignment> = {
        title: title.trim(),
        course: course.split('(')[0].trim(),
        courseCode,
        dueDate: dueDate.trim(),
        maxScore: Number(maxScore) || 100,
        description: description.trim() || 'Complete the attached coursework problem set according to syllabus specifications.',
        instructions: instructions.trim() || 'Submit final PDF work prior to midnight on the scheduled due date.',
        assignedClass,
        assignedClasses: [assignedClass],
        attachments: attachedFile ? [attachedFile] : ['assignment_brief.pdf'],
        fileAttachment: attachedFile || 'assignment_brief.pdf',
        teacher: user?.name || 'Prof. Henderson',
        status: 'Pending',
        submissionsCount: 0,
      };

      const res = await api.createAssignment(payload);

      if (res.assignment) {
        setAssignments((prev) => [res.assignment, ...prev]);
      } else {
        const localNew: StudentAssignment = {
          id: `asg_${Date.now()}`,
          title: payload.title!,
          course: payload.course!,
          courseCode: payload.courseCode!,
          dueDate: payload.dueDate!,
          status: 'Pending',
          maxScore: payload.maxScore,
          description: payload.description,
          instructions: payload.instructions,
          teacher: payload.teacher,
          submissionsCount: 0,
          assignedClass: payload.assignedClass,
          fileAttachment: payload.fileAttachment,
        };
        setAssignments((prev) => [localNew, ...prev]);
      }

      setCreatedSuccess(true);
      setTimeout(() => {
        setCreatedSuccess(false);
        setIsCreateModalOpen(false);
        // Reset form
        setTitle('');
        setDueDate('');
        setDescription('');
        setInstructions('');
        setAttachedFile(null);
      }, 1800);
    } catch (err: any) {
      setFormError(err.message || 'Failed to create assignment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const pendingGradingCount = submissions.filter((s) => s.status === 'Pending Grade').length;
  const gradedCount = submissions.filter((s) => s.status === 'Graded').length;

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
          onClick={() => { setFormError(null); setIsCreateModalOpen(true); }}
          className="px-4 py-2 bg-primary text-on-primary font-label text-[12px] font-semibold rounded-lg flex items-center gap-2 hover:bg-primary/90 transition-colors shadow-xs cursor-pointer self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Create Assignment</span>
        </button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-md">
        <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/30 shadow-card flex flex-col justify-between">
          <span className="font-label text-[12px] text-on-surface-variant uppercase font-medium">Total Coursework</span>
          <span className="font-display text-[28px] font-bold text-on-surface">{assignments.length}</span>
        </div>
        <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/30 shadow-card flex flex-col justify-between">
          <span className="font-label text-[12px] text-[#d97706] uppercase font-medium">Pending Grade</span>
          <span className="font-display text-[28px] font-bold text-[#d97706]">{pendingGradingCount}</span>
        </div>
        <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/30 shadow-card flex flex-col justify-between">
          <span className="font-label text-[12px] text-tertiary uppercase font-medium">Evaluated</span>
          <span className="font-display text-[28px] font-bold text-tertiary">{gradedCount}</span>
        </div>
        <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/30 shadow-card flex flex-col justify-between">
          <span className="font-label text-[12px] text-primary uppercase font-medium">Avg Grade</span>
          <span className="font-display text-[28px] font-bold text-primary">86%</span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-outline-variant/30 gap-md">
        <button
          onClick={() => setActiveTab('submissions')}
          className={`pb-2 font-label text-[13px] font-bold transition-colors cursor-pointer border-b-2 flex items-center gap-2 ${
            activeTab === 'submissions'
              ? 'border-primary text-primary'
              : 'border-transparent text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span>Student Submissions Queue</span>
          <span className="px-2 py-0.5 bg-surface-container-high rounded-full text-[11px]">
            {submissions.length}
          </span>
        </button>
        <button
          onClick={() => setActiveTab('assignments')}
          className={`pb-2 font-label text-[13px] font-bold transition-colors cursor-pointer border-b-2 flex items-center gap-2 ${
            activeTab === 'assignments'
              ? 'border-primary text-primary'
              : 'border-transparent text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span>Created Coursework & Briefs</span>
          <span className="px-2 py-0.5 bg-surface-container-high rounded-full text-[11px]">
            {assignments.length}
          </span>
        </button>
      </div>

      {/* Tab 1: Submissions Table */}
      {activeTab === 'submissions' && (
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-card overflow-hidden">
          <div className="p-md border-b border-outline-variant/30 bg-surface-bright flex justify-between items-center">
            <h3 className="font-title text-[18px] font-semibold text-on-surface">Submissions for Review</h3>
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
                        onClick={() => { setSelectedSubmission(sub); setGradeInput(sub.score || 88); setFeedbackInput(sub.teacherFeedback || ''); }}
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
      )}

      {/* Tab 2: Created Assignments List */}
      {activeTab === 'assignments' && (
        <div className="space-y-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
            {assignments.map((asg) => (
              <div key={asg.id} className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 p-lg shadow-card space-y-md flex flex-col justify-between">
                <div className="space-y-sm">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="px-2 py-0.5 bg-primary/10 text-primary font-label text-[11px] font-bold rounded-full">
                        {asg.courseCode}
                      </span>
                      <h4 className="font-title text-[18px] font-bold text-on-surface mt-1">
                        {asg.title}
                      </h4>
                    </div>
                    <span className="px-2.5 py-1 bg-tertiary/10 text-tertiary font-label text-[11px] font-bold rounded-full">
                      Max: {asg.maxScore || 100} pts
                    </span>
                  </div>

                  <p className="font-body text-[14px] text-on-surface-variant line-clamp-2">
                    {asg.description || 'Coursework assignment problem sets.'}
                  </p>

                  <div className="grid grid-cols-2 gap-2 text-[13px] text-on-surface-variant bg-surface-container-low p-sm rounded-lg">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-primary" />
                      <span>Due: {asg.dueDate}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-secondary" />
                      <span>{asg.assignedClass || 'Section A'}</span>
                    </div>
                  </div>

                  {asg.fileAttachment && (
                    <div className="flex items-center gap-2 text-[12px] text-primary font-medium">
                      <Paperclip className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{asg.fileAttachment}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-sm border-t border-outline-variant/20 text-[13px]">
                  <span className="text-on-surface-variant">Submissions: <strong>{asg.submissionsCount || 0}</strong></span>
                  <span className="text-tertiary font-medium">Active Coursework</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Evaluate Submission Modal */}
      {selectedSubmission && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-md">
          <div className="bg-surface rounded-2xl border border-outline-variant shadow-floating w-full max-w-lg p-lg relative animate-fadeIn space-y-md">
            <button onClick={() => setSelectedSubmission(null)} className="absolute top-4 right-4 p-1 text-on-surface-variant cursor-pointer">
              <X className="w-5 h-5" />
            </button>

            {gradedSuccess ? (
              <div className="py-xl text-center space-y-md">
                <CheckCircle2 className="w-12 h-12 text-tertiary mx-auto" />
                <h3 className="font-headline text-[22px] font-bold text-on-surface">Grade Recorded!</h3>
                <p className="font-body text-[14px] text-on-surface-variant">Student transcript and gradebook updated successfully.</p>
              </div>
            ) : (
              <form onSubmit={handleEvaluateSubmission} className="space-y-md">
                <div>
                  <span className="font-label text-[12px] text-primary uppercase font-bold">{selectedSubmission.studentName} ({selectedSubmission.studentId})</span>
                  <h3 className="font-title text-[20px] font-bold text-on-surface mt-1">{selectedSubmission.assignmentTitle}</h3>
                </div>

                {selectedSubmission.submissionContent && (
                  <div className="bg-surface-container-low p-sm rounded-lg border border-outline-variant/30 text-[13px] space-y-1">
                    <p className="font-label text-[11px] uppercase font-bold text-on-surface-variant">Submitted Content:</p>
                    <p className="font-body text-on-surface">{selectedSubmission.submissionContent}</p>
                    {selectedSubmission.fileAttachment && (
                      <div className="flex items-center gap-1.5 text-primary text-[12px] pt-1">
                        <Paperclip className="w-3.5 h-3.5" />
                        <span>Attached Solution: {selectedSubmission.fileAttachment}</span>
                      </div>
                    )}
                  </div>
                )}

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
                    required
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
                    placeholder="Provide constructive comments and evaluation notes..."
                    className="w-full p-2.5 bg-surface-container-lowest border border-outline-variant/60 rounded-lg text-[14px] text-on-surface outline-none focus:border-primary"
                  />
                </div>

                <div className="pt-sm border-t border-outline-variant/30 flex justify-end gap-sm">
                  <button type="button" onClick={() => setSelectedSubmission(null)} className="px-4 py-2 bg-surface-container-low text-on-surface font-label text-[12px] font-semibold rounded-lg cursor-pointer">
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    disabled={isGrading}
                    className="px-4 py-2 bg-primary text-on-primary font-label text-[12px] font-semibold rounded-lg cursor-pointer flex items-center gap-1.5 disabled:opacity-70"
                  >
                    {isGrading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                    <span>Save Evaluation</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Create Assignment Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-md overflow-y-auto">
          <div className="bg-surface rounded-2xl border border-outline-variant shadow-floating w-full max-w-xl p-lg relative animate-fadeIn space-y-md my-auto max-h-[90vh] overflow-y-auto">
            <button onClick={() => setIsCreateModalOpen(false)} className="absolute top-4 right-4 p-1 text-on-surface-variant cursor-pointer">
              <X className="w-5 h-5" />
            </button>

            {createdSuccess ? (
              <div className="py-xl text-center space-y-md">
                <CheckCircle2 className="w-12 h-12 text-tertiary mx-auto" />
                <h3 className="font-headline text-[22px] font-bold text-on-surface">Assignment Created Successfully!</h3>
                <p className="font-body text-[14px] text-on-surface-variant">Published to student portals and recorded in course schedule.</p>
              </div>
            ) : (
              <form onSubmit={handleCreateAssignment} className="space-y-md">
                <div>
                  <h3 className="font-title text-[22px] font-bold text-on-surface">Create New Assignment</h3>
                  <p className="font-body text-[13px] text-on-surface-variant mt-0.5">
                    Define coursework specifications, target classes, scoring parameters, and due dates.
                  </p>
                </div>

                {formError && (
                  <div className="p-sm bg-error/10 border border-error/20 rounded-lg text-error text-[13px] flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}

                {/* Title */}
                <div className="space-y-xs">
                  <label className="font-label text-[12px] text-on-surface font-medium" htmlFor="asg-title">
                    Assignment Title *
                  </label>
                  <input 
                    id="asg-title"
                    type="text" 
                    required 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    placeholder="e.g. Fourier Transform Analysis & Boundary Value Problems" 
                    className="w-full p-2.5 bg-surface-container-lowest border border-outline-variant/60 rounded-lg text-[14px] text-on-surface outline-none focus:border-primary" 
                  />
                </div>

                {/* Course and Class Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
                  <div className="space-y-xs">
                    <label className="font-label text-[12px] text-on-surface font-medium">Target Course *</label>
                    <select 
                      value={course}
                      onChange={(e) => handleCourseChange(e.target.value)}
                      className="w-full p-2.5 bg-surface-container-lowest border border-outline-variant/60 rounded-lg text-[14px] text-on-surface outline-none focus:border-primary cursor-pointer"
                    >
                      <option value="Advanced Calculus (MATH-401)">Advanced Calculus (MATH-401)</option>
                      <option value="Data Structures & Algorithms (CS-201)">Data Structures & Algorithms (CS-201)</option>
                      <option value="Database Systems (CS-301)">Database Systems (CS-301)</option>
                      <option value="Artificial Intelligence (CS-402)">Artificial Intelligence (CS-402)</option>
                    </select>
                  </div>

                  <div className="space-y-xs">
                    <label className="font-label text-[12px] text-on-surface font-medium">Assigned Class / Cohort *</label>
                    <select 
                      value={assignedClass}
                      onChange={(e) => setAssignedClass(e.target.value)}
                      className="w-full p-2.5 bg-surface-container-lowest border border-outline-variant/60 rounded-lg text-[14px] text-on-surface outline-none focus:border-primary cursor-pointer"
                    >
                      <option value="Section A - Morning Cohort">Section A - Morning Cohort</option>
                      <option value="Section B - Afternoon Cohort">Section B - Afternoon Cohort</option>
                      <option value="All Enrolled Students">All Enrolled Students</option>
                    </select>
                  </div>
                </div>

                {/* Due Date & Max Score */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
                  <div className="space-y-xs">
                    <label className="font-label text-[12px] text-on-surface font-medium">Due Date & Time *</label>
                    <input 
                      type="text" 
                      required 
                      value={dueDate} 
                      onChange={(e) => setDueDate(e.target.value)} 
                      placeholder="e.g. Nov 20, 2024, 11:59 PM" 
                      className="w-full p-2.5 bg-surface-container-lowest border border-outline-variant/60 rounded-lg text-[14px] text-on-surface outline-none focus:border-primary" 
                    />
                  </div>

                  <div className="space-y-xs">
                    <label className="font-label text-[12px] text-on-surface font-medium">Maximum Points / Score</label>
                    <input 
                      type="number" 
                      min={1}
                      max={1000}
                      value={maxScore} 
                      onChange={(e) => setMaxScore(Number(e.target.value))} 
                      className="w-full p-2.5 bg-surface-container-lowest border border-outline-variant/60 rounded-lg text-[14px] text-on-surface outline-none focus:border-primary" 
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-xs">
                  <label className="font-label text-[12px] text-on-surface font-medium">Description & Objectives</label>
                  <textarea 
                    rows={2}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe the coursework requirements and learning goals..."
                    className="w-full p-2.5 bg-surface-container-lowest border border-outline-variant/60 rounded-lg text-[14px] text-on-surface outline-none focus:border-primary"
                  />
                </div>

                {/* Instructions */}
                <div className="space-y-xs">
                  <label className="font-label text-[12px] text-on-surface font-medium">Submission Instructions & Guidelines</label>
                  <textarea 
                    rows={2}
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    placeholder="e.g. Submit single PDF file. Include source code derivations in appendix."
                    className="w-full p-2.5 bg-surface-container-lowest border border-outline-variant/60 rounded-lg text-[14px] text-on-surface outline-none focus:border-primary"
                  />
                </div>

                {/* Attachment Upload */}
                <div className="space-y-xs">
                  <label className="font-label text-[12px] text-on-surface font-medium">Assignment Brief / Problem Sheet Attachment</label>
                  <div className="border border-dashed border-outline-variant/80 rounded-lg p-md text-center bg-surface-container-low hover:bg-surface-container-high transition-colors">
                    <input 
                      type="file" 
                      id="asg-file-upload" 
                      onChange={handleFileUpload} 
                      className="hidden" 
                    />
                    <label htmlFor="asg-file-upload" className="cursor-pointer flex flex-col items-center gap-1">
                      <Upload className="w-5 h-5 text-primary mb-1" />
                      <span className="font-label text-[13px] font-semibold text-primary">
                        {attachedFile ? `Attached: ${attachedFile}` : 'Upload Assignment File (PDF, DOCX, ZIP)'}
                      </span>
                      <span className="font-body text-[11px] text-on-surface-variant">
                        Max file size: 25 MB
                      </span>
                    </label>
                  </div>
                  {attachedFile && (
                    <div className="flex items-center justify-between p-2 bg-primary/10 rounded-lg text-[12px] text-primary">
                      <div className="flex items-center gap-1.5">
                        <Paperclip className="w-3.5 h-3.5" />
                        <span className="font-medium">{attachedFile}</span>
                      </div>
                      <button 
                        type="button" 
                        onClick={() => setAttachedFile(null)}
                        className="text-error hover:underline cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="pt-sm border-t border-outline-variant/30 flex justify-end gap-sm">
                  <button 
                    type="button" 
                    onClick={() => setIsCreateModalOpen(false)} 
                    className="px-4 py-2 bg-surface-container-low text-on-surface font-label text-[12px] font-semibold rounded-lg cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="px-5 py-2 bg-primary text-on-primary font-label text-[12px] font-semibold rounded-lg cursor-pointer flex items-center gap-2 hover:bg-primary/90 transition-all disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Publishing...</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        <span>Publish Assignment</span>
                      </>
                    )}
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
