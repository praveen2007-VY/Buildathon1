import { Router, Response } from 'express';
import { db } from '../db.js';
import { authenticate, optionalAuth, AuthRequest, requireRole } from '../middleware/auth.js';
import { AtRiskStudent, AdminTeacher } from '../types.js';

export const usersRouter = Router();

// ==================== STUDENTS DIRECTORY ====================
usersRouter.get('/students', optionalAuth, (req, res: Response): void => {
  const { search, department, riskLevel } = req.query;
  let students = db.get('students');

  if (search && typeof search === 'string') {
    const s = search.toLowerCase();
    students = students.filter(
      (st) =>
        st.name.toLowerCase().includes(s) ||
        (st.studentId && st.studentId.toLowerCase().includes(s)) ||
        (st.course && st.course.toLowerCase().includes(s))
    );
  }

  if (department && typeof department === 'string' && department !== 'All') {
    students = students.filter((st) => st.department === department);
  }

  if (riskLevel && typeof riskLevel === 'string' && riskLevel !== 'All') {
    students = students.filter((st) => st.riskLevel === riskLevel);
  }

  res.json({ students });
});

usersRouter.post('/students', authenticate, requireRole('admin'), (req: AuthRequest, res: Response): void => {
  const { name, studentId, department, course, attendance = 90, performance = 85, riskLevel = 'Low Risk', status = 'Active' } = req.body;

  if (!name) {
    res.status(400).json({ error: 'Student name is required.' });
    return;
  }

  const id = `std_${Date.now()}`;
  const initials = name
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const newStudent: AtRiskStudent = {
    id,
    initials,
    name,
    studentId: studentId || `EDU-${Math.floor(1000 + Math.random() * 9000)}`,
    department: department || 'School of Computing',
    course: course || 'CS-201',
    attendance: Number(attendance),
    performance: Number(performance),
    riskLevel,
    status,
    primaryIssue: riskLevel === 'High Risk' ? 'Low Assignment Score' : riskLevel === 'Medium Risk' ? 'Declining Quiz Grades' : 'None'
  };

  db.insert('students', newStudent);

  // Log system action
  db.insert('systemLogs', {
    id: `log_${Date.now()}`,
    title: `Student Enrolled: ${name}`,
    time: 'Just now',
    source: 'Admin Directory',
    type: 'user',
    userRole: 'Admin',
    action: 'Create Student',
    module: 'Students',
    status: 'Success'
  });

  res.status(201).json({ student: newStudent });
});

usersRouter.put('/students/:id', authenticate, requireRole('admin'), (req: AuthRequest, res: Response): void => {
  const { id } = req.params;
  const updates = req.body;

  const updated = db.update('students', id, (student) => ({
    ...student,
    ...updates
  }));

  if (!updated) {
    res.status(404).json({ error: 'Student not found.' });
    return;
  }

  res.json({ student: updated });
});

usersRouter.delete('/students/:id', authenticate, requireRole('admin'), (req: AuthRequest, res: Response): void => {
  const { id } = req.params;
  const deleted = db.delete('students', id);

  if (!deleted) {
    res.status(404).json({ error: 'Student not found.' });
    return;
  }

  res.json({ success: true, message: 'Student removed successfully.' });
});

// ==================== TEACHERS DIRECTORY ====================
usersRouter.get('/teachers', optionalAuth, (req, res: Response): void => {
  const { search, department } = req.query;
  let teachers = db.get('teachers');

  if (search && typeof search === 'string') {
    const s = search.toLowerCase();
    teachers = teachers.filter(
      (t) =>
        t.name.toLowerCase().includes(s) ||
        t.email.toLowerCase().includes(s) ||
        t.employeeId.toLowerCase().includes(s)
    );
  }

  if (department && typeof department === 'string' && department !== 'All') {
    teachers = teachers.filter((t) => t.department === department);
  }

  res.json({ teachers });
});

usersRouter.post('/teachers', authenticate, requireRole('admin'), (req: AuthRequest, res: Response): void => {
  const { name, email, department, designation, employeeId, coursesCount = 1, studentsCount = 30, phone } = req.body;

  if (!name || !email) {
    res.status(400).json({ error: 'Name and email are required.' });
    return;
  }

  const id = `tch_${Date.now()}`;
  const newTeacher: AdminTeacher = {
    id,
    name,
    email,
    employeeId: employeeId || `TCH-${Math.floor(100 + Math.random() * 900)}`,
    department: department || 'Applied Mathematics',
    designation: designation || 'Assistant Professor',
    coursesCount: Number(coursesCount),
    studentsCount: Number(studentsCount),
    status: 'Active',
    phone: phone || '+1 (555) 000-0000'
  };

  db.insert('teachers', newTeacher);

  // Log system action
  db.insert('systemLogs', {
    id: `log_${Date.now()}`,
    title: `Faculty Member Added: ${name}`,
    time: 'Just now',
    source: 'Admin Directory',
    type: 'user',
    userRole: 'Admin',
    action: 'Create Faculty',
    module: 'Teachers',
    status: 'Success'
  });

  res.status(201).json({ teacher: newTeacher });
});

usersRouter.put('/teachers/:id', authenticate, requireRole('admin'), (req: AuthRequest, res: Response): void => {
  const { id } = req.params;
  const updates = req.body;

  const updated = db.update('teachers', id, (teacher) => ({
    ...teacher,
    ...updates
  }));

  if (!updated) {
    res.status(404).json({ error: 'Teacher not found.' });
    return;
  }

  res.json({ teacher: updated });
});

usersRouter.delete('/teachers/:id', authenticate, requireRole('admin'), (req: AuthRequest, res: Response): void => {
  const { id } = req.params;
  const deleted = db.delete('teachers', id);

  if (!deleted) {
    res.status(404).json({ error: 'Teacher not found.' });
    return;
  }

  res.json({ success: true, message: 'Teacher removed successfully.' });
});

// ==================== USER PROFILE ====================
usersRouter.get('/profile', authenticate, (req: AuthRequest, res: Response): void => {
  if (!req.user) {
    res.status(401).json({ error: 'Unauthorized.' });
    return;
  }
  const { password: _, ...userSafe } = req.user;
  res.json({ user: userSafe });
});

usersRouter.put('/profile', authenticate, (req: AuthRequest, res: Response): void => {
  if (!req.user) {
    res.status(401).json({ error: 'Unauthorized.' });
    return;
  }

  const { name, phone, title, officeRoom, department } = req.body;
  const updatedUser = db.update('users', req.user.id, (u) => ({
    ...u,
    ...(name ? { name } : {}),
    ...(phone ? { phone } : {}),
    ...(title ? { title } : {}),
    ...(officeRoom ? { officeRoom } : {}),
    ...(department ? { department } : {})
  }));

  if (!updatedUser) {
    res.status(404).json({ error: 'User not found.' });
    return;
  }

  const { password: _, ...userSafe } = updatedUser;
  res.json({ user: userSafe });
});
