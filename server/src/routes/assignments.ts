import { Router, Response } from 'express';
import { db } from '../db.js';
import { authenticate, optionalAuth, AuthRequest, requireRole } from '../middleware/auth.js';
import { StudentAssignment, TeacherSubmission } from '../types.js';

export const assignmentsRouter = Router();

// GET all assignments
assignmentsRouter.get('/', optionalAuth, (req: AuthRequest, res: Response): void => {
  const { courseCode, status } = req.query;
  let assignments = db.get('assignments');

  if (courseCode && typeof courseCode === 'string') {
    assignments = assignments.filter((a) => a.courseCode.toLowerCase() === courseCode.toLowerCase());
  }

  if (status && typeof status === 'string' && status !== 'All') {
    assignments = assignments.filter((a) => a.status === status);
  }

  res.json({ assignments });
});

// GET single assignment
assignmentsRouter.get('/:id', optionalAuth, (req, res: Response): void => {
  const { id } = req.params;
  const assignments = db.get('assignments');
  const assignment = assignments.find((a) => a.id === id);

  if (!assignment) {
    res.status(404).json({ error: 'Assignment not found.' });
    return;
  }

  res.json({ assignment });
});

// CREATE assignment (Teacher or Admin)
assignmentsRouter.post('/', optionalAuth, (req: AuthRequest, res: Response): void => {
  const {
    title,
    course,
    courseCode,
    dueDate,
    description,
    instructions,
    maxScore = 100,
    assignedClass,
    assignedClasses,
    assignedStudents,
    attachments,
    fileAttachment
  } = req.body;

  if (!title || (!course && !courseCode) || !dueDate) {
    res.status(400).json({ error: 'Title, course (or course code), and due date are required.' });
    return;
  }

  const id = `asg_${Date.now()}`;
  const newAssignment: StudentAssignment = {
    id,
    title,
    course: course || 'Advanced Calculus',
    courseCode: courseCode || (course?.includes('(') ? course.split('(')[1].replace(')', '') : 'MATH-401'),
    dueDate,
    status: 'Pending',
    description: description || 'Complete all problem sets according to course specifications.',
    instructions: instructions || 'Submit solutions in PDF or source archive format before deadline.',
    teacher: req.user?.name || 'Prof. Henderson',
    submissionsCount: 0,
    maxScore: Number(maxScore),
    assignedClass: assignedClass || 'Section A',
    assignedClasses: assignedClasses || (assignedClass ? [assignedClass] : ['Section A', 'Section B']),
    assignedStudents: assignedStudents || [],
    attachments: attachments || (fileAttachment ? [fileAttachment] : []),
    fileAttachment: fileAttachment || (attachments && attachments[0]),
    createdAt: new Date().toISOString()
  };

  db.insert('assignments', newAssignment);

  // Log action
  db.insert('systemLogs', {
    id: `log_${Date.now()}`,
    title: `Assignment Created: ${title}`,
    time: 'Just now',
    source: 'Coursework Engine',
    type: 'sync',
    userRole: req.user?.role === 'admin' ? 'Admin' : 'Teacher',
    action: 'Create Assignment',
    module: 'Assignments',
    status: 'Success'
  });

  res.status(201).json({ assignment: newAssignment });
});

// UPDATE assignment
assignmentsRouter.put('/:id', authenticate, requireRole('teacher', 'admin'), (req: AuthRequest, res: Response): void => {
  const { id } = req.params;
  const updates = req.body;

  const updated = db.update('assignments', id, (a) => ({
    ...a,
    ...updates
  }));

  if (!updated) {
    res.status(404).json({ error: 'Assignment not found.' });
    return;
  }

  res.json({ assignment: updated });
});

// DELETE assignment
assignmentsRouter.delete('/:id', authenticate, requireRole('teacher', 'admin'), (req: AuthRequest, res: Response): void => {
  const { id } = req.params;
  const deleted = db.delete('assignments', id);

  if (!deleted) {
    res.status(404).json({ error: 'Assignment not found.' });
    return;
  }

  res.json({ success: true, message: 'Assignment deleted.' });
});

// SUBMIT assignment (Student)
assignmentsRouter.post('/:id/submit', authenticate, (req: AuthRequest, res: Response): void => {
  const { id } = req.params;
  const { submissionContent, fileAttachment } = req.body;

  const assignments = db.get('assignments');
  const assignment = assignments.find((a) => a.id === id);

  if (!assignment) {
    res.status(404).json({ error: 'Assignment not found.' });
    return;
  }

  const studentName = req.user?.name || 'Alex Rivera';
  const studentId = req.user?.studentId || 'EDU-8842';

  // Create submission
  const newSubmission: TeacherSubmission = {
    id: `sub_${Date.now()}`,
    assignmentId: id,
    studentName,
    studentId,
    assignmentTitle: assignment.title,
    submittedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    maxScore: assignment.maxScore || 100,
    status: 'Pending Grade',
    submissionContent: submissionContent || 'Solution submitted by student.',
    fileAttachment
  };

  db.insert('submissions', newSubmission);

  // Update assignment status
  db.update('assignments', id, (a) => ({
    ...a,
    status: 'Submitted',
    submissionsCount: (a.submissionsCount || 0) + 1
  }));

  res.status(201).json({
    success: true,
    message: 'Assignment submitted successfully!',
    submission: newSubmission
  });
});

// GET all submissions for teacher review
assignmentsRouter.get('/submissions/all', optionalAuth, (req, res: Response): void => {
  const submissions = db.get('submissions');
  res.json({ submissions });
});

// GRADE submission (Teacher)
assignmentsRouter.put('/submissions/:id/grade', authenticate, requireRole('teacher', 'admin'), (req: AuthRequest, res: Response): void => {
  const { id } = req.params;
  const { score, teacherFeedback, aiFeedback } = req.body;

  if (score === undefined) {
    res.status(400).json({ error: 'Score is required.' });
    return;
  }

  const updated = db.update('submissions', id, (sub) => ({
    ...sub,
    score: Number(score),
    status: 'Graded',
    teacherFeedback: teacherFeedback || 'Good effort on the assignment.',
    aiFeedback: aiFeedback || 'Automated code and syntax analysis verified.'
  }));

  if (!updated) {
    res.status(404).json({ error: 'Submission not found.' });
    return;
  }

  // If this submission had an associated assignment, update it
  if (updated.assignmentId) {
    db.update('assignments', updated.assignmentId, (a) => ({
      ...a,
      status: 'Evaluated',
      score: `${score}/${updated.maxScore}`,
      teacherFeedback: updated.teacherFeedback,
      aiFeedback: updated.aiFeedback
    }));
  }

  res.json({ submission: updated });
});
