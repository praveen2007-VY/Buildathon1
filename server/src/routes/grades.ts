import { Router, Response } from 'express';
import { db } from '../db.js';
import { authenticate, optionalAuth, AuthRequest, requireRole } from '../middleware/auth.js';
import { StudentGradeRecord, TeacherGradeEntry } from '../types.js';

export const gradesRouter = Router();

// GET student grades and GPA metrics
gradesRouter.get('/student', optionalAuth, (req: AuthRequest, res: Response): void => {
  const grades = db.get('grades');

  // Compute summary
  let totalScore = 0;
  grades.forEach((g) => {
    totalScore += (g.score / g.maxScore) * 100;
  });

  const percentage = grades.length > 0 ? Number((totalScore / grades.length).toFixed(1)) : 84.5;
  const currentGPA = Number(((percentage / 100) * 4).toFixed(2));

  res.json({
    summary: {
      currentGPA: Math.min(4.0, currentGPA),
      percentage,
      totalCredits: 16,
      completedSubjects: grades.length
    },
    records: grades,
    semesterPerformance: [
      { month: 'Sep', score: 68, target: 75 },
      { month: 'Oct', score: 74, target: 78 },
      { month: 'Nov', score: 72, target: 80 },
      { month: 'Dec', score: 79, target: 82 },
      { month: 'Jan', score: 78, target: 85 }
    ]
  });
});

// GET teacher gradebook entries
gradesRouter.get('/teacher', optionalAuth, (req, res: Response): void => {
  const entries = db.get('teacherGrades');
  res.json({ entries });
});

// UPDATE teacher grade entry
gradesRouter.put('/teacher/:id', authenticate, requireRole('teacher', 'admin'), (req: AuthRequest, res: Response): void => {
  const { id } = req.params;
  const { assignmentScore, examScore } = req.body;

  const entries = db.get('teacherGrades');
  const existing = entries.find((e) => e.id === id);

  if (!existing) {
    res.status(404).json({ error: 'Grade record not found.' });
    return;
  }

  const asg = assignmentScore !== undefined ? Number(assignmentScore) : existing.assignmentScore;
  const ex = examScore !== undefined ? Number(examScore) : existing.examScore;
  const total = Math.round((asg * 0.4) + (ex * 0.6));

  let grade = 'F';
  if (total >= 90) grade = 'A';
  else if (total >= 85) grade = 'A-';
  else if (total >= 80) grade = 'B+';
  else if (total >= 75) grade = 'B';
  else if (total >= 70) grade = 'B-';
  else if (total >= 65) grade = 'C+';
  else if (total >= 60) grade = 'C';
  else if (total >= 50) grade = 'D';

  const updated = db.update('teacherGrades', id, (g) => ({
    ...g,
    assignmentScore: asg,
    examScore: ex,
    totalScore: total,
    grade,
    status: total >= 50 ? 'Pass' : 'Fail'
  }));

  res.json({ entry: updated });
});

// GET all grade records (Admin)
gradesRouter.get('/all', optionalAuth, (req, res: Response): void => {
  const records = db.get('grades');
  res.json({ records });
});
