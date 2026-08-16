import { Router, Response } from 'express';
import { db } from '../db.js';
import { authenticate, optionalAuth, AuthRequest, requireRole } from '../middleware/auth.js';
import { Course } from '../types.js';

export const coursesRouter = Router();

// GET all courses with filtering
coursesRouter.get('/', optionalAuth, (req: AuthRequest, res: Response): void => {
  const { search, category, department, difficulty, status } = req.query;
  let courses = db.get('courses');

  if (search && typeof search === 'string') {
    const s = search.toLowerCase();
    courses = courses.filter(
      (c) =>
        c.name.toLowerCase().includes(s) ||
        (c.title && c.title.toLowerCase().includes(s)) ||
        c.code.toLowerCase().includes(s) ||
        c.instructor.toLowerCase().includes(s) ||
        (c.description && c.description.toLowerCase().includes(s))
    );
  }

  if (category && typeof category === 'string' && category !== 'All') {
    courses = courses.filter((c) => c.category === category);
  }

  if (department && typeof department === 'string' && department !== 'All') {
    courses = courses.filter((c) => c.department === department);
  }

  if (difficulty && typeof difficulty === 'string' && difficulty !== 'All') {
    courses = courses.filter((c) => c.difficulty === difficulty);
  }

  if (status && typeof status === 'string' && status !== 'All') {
    courses = courses.filter((c) => c.status === status);
  }

  res.json({ courses });
});

// GET single course
coursesRouter.get('/:id', optionalAuth, (req, res: Response): void => {
  const { id } = req.params;
  const courses = db.get('courses');
  const course = courses.find((c) => c.id === id || c.code.toLowerCase() === id.toLowerCase());

  if (!course) {
    res.status(404).json({ error: 'Course not found.' });
    return;
  }

  res.json({ course });
});

// CREATE course (Teacher or Admin)
coursesRouter.post('/', authenticate, requireRole('teacher', 'admin'), (req: AuthRequest, res: Response): void => {
  const {
    name,
    title,
    code,
    category = 'Computer Science',
    department = 'School of Computing',
    difficulty = 'Intermediate',
    instructor,
    schedule = 'Mon/Wed 10:00 AM',
    credits = 4,
    description = '',
    outcomes = [],
    syllabus = []
  } = req.body;

  if (!name || !code) {
    res.status(400).json({ error: 'Course name and code are required.' });
    return;
  }

  const courseTitle = title || name;
  const courseId = code.replace(/\s+/g, '-');
  const instructorName = instructor || req.user?.name || 'Faculty Member';

  const newCourse: Course = {
    id: courseId,
    name: courseTitle,
    title: courseTitle,
    code: code.toUpperCase(),
    category,
    department,
    difficulty,
    instructor: instructorName,
    instructorId: req.user?.id,
    rating: 5.0,
    reviewsCount: 1,
    enrolledCount: 1,
    duration: '12 Weeks',
    schedule,
    studentCount: 20,
    avgGrade: 'A',
    credits: Number(credits),
    status: 'Active',
    description,
    outcomes: outcomes.length > 0 ? outcomes : ['Master essential course concepts', 'Complete hands-on practical assignments'],
    syllabus: syllabus.length > 0 ? syllabus : [
      { week: 'Week 1-4', topic: 'Core Foundations & Principles' },
      { week: 'Week 5-8', topic: 'Advanced Practical Implementation' },
      { week: 'Week 9-12', topic: 'Comprehensive Capstone & Review' }
    ]
  };

  db.insert('courses', newCourse);

  // Log system action
  db.insert('systemLogs', {
    id: `log_${Date.now()}`,
    title: `Course Created: ${code} - ${courseTitle}`,
    time: 'Just now',
    source: 'Academic Management',
    type: 'sync',
    userRole: req.user?.role || 'Admin',
    action: 'Create Course',
    module: 'Courses',
    status: 'Success'
  });

  res.status(201).json({ course: newCourse });
});

// UPDATE course
coursesRouter.put('/:id', authenticate, requireRole('teacher', 'admin'), (req: AuthRequest, res: Response): void => {
  const { id } = req.params;
  const updates = req.body;

  const updated = db.update('courses', id, (c) => ({
    ...c,
    ...updates
  }));

  if (!updated) {
    res.status(404).json({ error: 'Course not found.' });
    return;
  }

  res.json({ course: updated });
});

// DELETE course
coursesRouter.delete('/:id', authenticate, requireRole('admin'), (req: AuthRequest, res: Response): void => {
  const { id } = req.params;
  const deleted = db.delete('courses', id);

  if (!deleted) {
    res.status(404).json({ error: 'Course not found.' });
    return;
  }

  res.json({ success: true, message: 'Course deleted successfully.' });
});

// ENROLL student in course
coursesRouter.post('/:id/enroll', authenticate, (req: AuthRequest, res: Response): void => {
  const { id } = req.params;
  const courses = db.get('courses');
  const course = courses.find((c) => c.id === id || c.code.toLowerCase() === id.toLowerCase());

  if (!course) {
    res.status(404).json({ error: 'Course not found.' });
    return;
  }

  // Increment enrolled count
  db.update('courses', course.id, (c) => ({
    ...c,
    enrolledCount: (c.enrolledCount || 0) + 1,
    studentCount: (c.studentCount || 0) + 1
  }));

  res.json({ success: true, message: `Successfully enrolled in ${course.name}!` });
});
