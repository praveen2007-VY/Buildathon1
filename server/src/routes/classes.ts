import { Router, Response } from 'express';
import { db } from '../db.js';
import { authenticate, optionalAuth, AuthRequest, requireRole } from '../middleware/auth.js';
import { TeacherClass } from '../types.js';

export const classesRouter = Router();

classesRouter.get('/', optionalAuth, (req, res: Response): void => {
  const { instructor, courseCode } = req.query;
  let classes = db.get('classes');

  if (instructor && typeof instructor === 'string') {
    classes = classes.filter((c) => c.instructor?.toLowerCase().includes(instructor.toLowerCase()));
  }

  if (courseCode && typeof courseCode === 'string') {
    classes = classes.filter((c) => c.courseCode.toLowerCase() === courseCode.toLowerCase());
  }

  res.json({ classes });
});

classesRouter.post('/', authenticate, requireRole('teacher', 'admin'), (req: AuthRequest, res: Response): void => {
  const { courseName, courseCode, section, room, schedule, capacity = 30, instructor } = req.body;

  if (!courseName || !courseCode || !section) {
    res.status(400).json({ error: 'Course name, code, and section are required.' });
    return;
  }

  const id = `cls_${Date.now()}`;
  const newClass: TeacherClass = {
    id,
    courseName,
    courseCode: courseCode.toUpperCase(),
    section,
    studentCount: 0,
    room: room || 'Hall A - Room 101',
    schedule: schedule || 'Mon/Wed 10:00 AM',
    status: 'Active',
    avgPerformance: 80,
    attendanceRate: 95,
    instructor: instructor || req.user?.name || 'Faculty Member',
    capacity: Number(capacity)
  };

  db.insert('classes', newClass);

  res.status(201).json({ class: newClass });
});

classesRouter.put('/:id', authenticate, requireRole('teacher', 'admin'), (req: AuthRequest, res: Response): void => {
  const { id } = req.params;
  const updates = req.body;

  const updated = db.update('classes', id, (c) => ({
    ...c,
    ...updates
  }));

  if (!updated) {
    res.status(404).json({ error: 'Class section not found.' });
    return;
  }

  res.json({ class: updated });
});

classesRouter.delete('/:id', authenticate, requireRole('admin'), (req: AuthRequest, res: Response): void => {
  const { id } = req.params;
  const deleted = db.delete('classes', id);

  if (!deleted) {
    res.status(404).json({ error: 'Class section not found.' });
    return;
  }

  res.json({ success: true, message: 'Class section removed.' });
});
