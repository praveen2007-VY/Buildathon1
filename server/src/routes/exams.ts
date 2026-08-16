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
