import { Router, Response } from 'express';
import { db } from '../db.js';
import { authenticate, optionalAuth, AuthRequest, requireRole } from '../middleware/auth.js';
import { StudentExam } from '../types.js';

export const examsRouter = Router();

// GET all exams
examsRouter.get('/', optionalAuth, (req, res: Response): void => {
  const { isUpcoming } = req.query;
  let exams = db.get('exams');

  if (isUpcoming !== undefined) {
    const boolVal = isUpcoming === 'true';
    exams = exams.filter((e) => e.isUpcoming === boolVal);
  }

  res.json({ exams });
});

// CREATE exam
examsRouter.post('/', authenticate, requireRole('teacher', 'admin'), (req: AuthRequest, res: Response): void => {
  const { title, subject, date, time, duration = '2 Hours', location = 'Hall B - 302', maxMarks = 100, instructions } = req.body;

  if (!title || !subject || !date || !time) {
    res.status(400).json({ error: 'Title, subject, date, and time are required.' });
    return;
  }

  const id = `ex_${Date.now()}`;
  const newExam: StudentExam = {
    id,
    title,
    subject,
    date,
    time,
    duration,
    location,
    isUpcoming: true,
    instructor: req.user?.name || 'Prof. Henderson',
    studentsCount: 40,
    maxMarks: Number(maxMarks),
    instructions: instructions || ['Standard examination rules apply', 'Bring student ID card']
  };

  db.insert('exams', newExam);

  // Log action
  db.insert('systemLogs', {
    id: `log_${Date.now()}`,
    title: `Exam Scheduled: ${title}`,
    time: 'Just now',
    source: 'Academic Management',
    type: 'sync',
    userRole: 'Teacher',
    action: 'Schedule Exam',
    module: 'Exams',
    status: 'Success'
  });

  res.status(201).json({ exam: newExam });
});

// UPDATE exam
examsRouter.put('/:id', authenticate, requireRole('teacher', 'admin'), (req: AuthRequest, res: Response): void => {
  const { id } = req.params;
  const updates = req.body;

  const updated = db.update('exams', id, (e) => ({
    ...e,
    ...updates
  }));

  if (!updated) {
    res.status(404).json({ error: 'Exam not found.' });
    return;
  }

  res.json({ exam: updated });
});

// SUBMIT test results (Student)
examsRouter.post('/submit', authenticate, (req: AuthRequest, res: Response): void => {
  const { title, subject, score, totalQuestions, testType } = req.body;
  if (!title || !subject || score === undefined || !totalQuestions) {
    res.status(400).json({ error: 'Title, subject, score, and totalQuestions are required.' });
    return;
  }

  const percentage = Math.round((Number(score) / Number(totalQuestions)) * 100);
  let grade = 'F';
  if (percentage >= 90) grade = 'A';
  else if (percentage >= 80) grade = 'B';
  else if (percentage >= 70) grade = 'C';
  else if (percentage >= 60) grade = 'D';

  const result = percentage >= 60 ? 'Passed' : 'Needs Practice';

  const id = `ex_${Date.now()}`;
  const newExamRecord: StudentExam = {
    id,
    title,
    subject,
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    time: 'Completed',
    duration: 'Completed',
    location: testType === 'practice' ? 'Practice Portal' : 'Online Assessment',
    isUpcoming: false,
    score: `${score}/${totalQuestions}`,
    grade,
    result,
    instructor: 'System Evaluator',
    maxMarks: totalQuestions
  };

  db.insert('exams', newExamRecord);

  // Insert grade record for student
  db.insert('grades', {
    id: `grd_${Date.now()}`,
    subject,
    code: subject.split(' ')[0] || 'TEST',
    instructor: 'System Evaluator',
    credits: 3,
    score: percentage,
    letterGrade: grade,
    status: result,
    studentId: req.user?.id
  });

  // Log activity
  db.insert('systemLogs', {
    id: `log_${Date.now()}`,
    title: `Test Completed: ${title} (${percentage}%)`,
    time: 'Just now',
    source: 'Analytics Portal',
    type: 'user',
    userRole: req.user?.role || 'student',
    action: 'Complete Test',
    module: 'Exams',
    status: 'Success'
  });

  res.status(201).json({ success: true, exam: newExamRecord });
});

// DELETE exam
examsRouter.delete('/:id', authenticate, requireRole('teacher', 'admin'), (req: AuthRequest, res: Response): void => {
  const { id } = req.params;
  const deleted = db.delete('exams', id);

  if (!deleted) {
    res.status(404).json({ error: 'Exam not found.' });
    return;
  }

  res.json({ success: true, message: 'Exam deleted.' });
});
