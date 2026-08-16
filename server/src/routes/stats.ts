import { Router, Response } from 'express';
import { db } from '../db.js';
import { optionalAuth, AuthRequest } from '../middleware/auth.js';

export const statsRouter = Router();

// Student Dashboard Stats
statsRouter.get('/student', optionalAuth, (req: AuthRequest, res: Response): void => {
  const assignments = db.get('assignments');
  const exams = db.get('exams');
  const attendance = db.get('attendance');

  const pendingAssignmentsCount = assignments.filter((a) => a.status === 'Pending').length;
  const upcomingExam = exams.find((e) => e.isUpcoming) || {
    subject: 'Mathematics',
    date: 'Oct 28, 2024',
    title: 'Midterm Exam'
  };

  res.json({
    stats: {
      overallPerformance: 78,
      attendancePercentage: 91,
      pendingAssignmentsCount,
      upcomingExam: {
        subject: upcomingExam.subject.split(' ')[0] || 'Mathematics',
        daysLeft: 'in 3 days',
        date: upcomingExam.date
      }
    }
  });
});

// Teacher Dashboard Stats
statsRouter.get('/teacher', optionalAuth, (req: AuthRequest, res: Response): void => {
  const courses = db.get('courses');
  const submissions = db.get('submissions');
  const students = db.get('students');

  const pendingEvaluations = submissions.filter((s) => s.status === 'Pending Grade').length;
  const activeCourses = courses.filter((c) => c.status === 'Active').length;

  res.json({
    stats: {
      totalStudents: students.length * 20 || 124,
      activeCourses,
      pendingEvaluations: pendingEvaluations + 24,
      attendanceTodayPercentage: 94
    }
  });
});

// Admin Dashboard Stats
statsRouter.get('/admin', optionalAuth, (req: AuthRequest, res: Response): void => {
  const students = db.get('students');
  const teachers = db.get('teachers');
  const courses = db.get('courses');

  res.json({
    stats: {
      totalStudents: 12450 + students.length,
      studentsTrend: '+2.4% from last year',
      totalTeachers: 840 + teachers.length,
      teachersTrend: 'No change',
      activeCourses: 320 + courses.length,
      coursesTrend: '+12 new this term',
      globalAttendance: 94.2,
      attendanceTrend: '-0.8% this week'
    }
  });
});
