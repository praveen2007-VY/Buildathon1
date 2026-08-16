import { Router, Response } from 'express';
import { db } from '../db.js';
import { authenticate, optionalAuth, AuthRequest, requireRole } from '../middleware/auth.js';
import { TeacherAttendanceRecord, SubjectAttendance } from '../types.js';

export const attendanceRouter = Router();

// GET student attendance
attendanceRouter.get('/student', optionalAuth, (req: AuthRequest, res: Response): void => {
  const attendanceList = db.get('attendance');
  
  // Calculate summary
  let totalClasses = 0;
  let totalPresent = 0;
  let totalAbsent = 0;
  let totalLate = 0;

  attendanceList.forEach((att) => {
    totalClasses += att.classesHeld;
    totalPresent += att.present;
    totalAbsent += att.absent;
    totalLate += att.late;
  });

  const overallPercentage = totalClasses > 0 ? Math.round(((totalPresent + totalLate * 0.5) / totalClasses) * 100) : 91;

  res.json({
    summary: {
      overallPercentage,
      totalClasses,
      present: totalPresent,
      absent: totalAbsent,
      late: totalLate
    },
    subjects: attendanceList,
    chartData: [
      { month: 'Aug', percentage: 96 },
      { month: 'Sep', percentage: 94 },
      { month: 'Oct', percentage: overallPercentage }
    ]
  });
});

// GET teacher attendance roster
attendanceRouter.get('/teacher', optionalAuth, (req: AuthRequest, res: Response): void => {
  const { courseCode, section } = req.query;
  let records = db.get('teacherAttendanceRecords');

  if (courseCode && typeof courseCode === 'string') {
    records = records.filter((r) => r.courseCode?.toLowerCase() === courseCode.toLowerCase());
  }

  if (section && typeof section === 'string') {
    records = records.filter((r) => r.section?.toLowerCase() === section.toLowerCase());
  }

  res.json({ students: records });
});

// POST teacher marks attendance
attendanceRouter.post('/mark', authenticate, requireRole('teacher', 'admin'), (req: AuthRequest, res: Response): void => {
  const { records } = req.body as { records: { studentId: string; status: 'Present' | 'Absent' | 'Late' }[] };

  if (!records || !Array.isArray(records)) {
    res.status(400).json({ error: 'Records array is required.' });
    return;
  }

  const existingRecords = db.get('teacherAttendanceRecords');
  const updatedRecords = existingRecords.map((item) => {
    const update = records.find((r) => r.studentId === item.studentId);
    if (update) {
      // Calculate adjusted attendance percentage
      let newPct = item.attendancePercentage;
      if (update.status === 'Present' && item.status !== 'Present') {
        newPct = Math.min(100, item.attendancePercentage + 2);
      } else if (update.status === 'Absent' && item.status !== 'Absent') {
        newPct = Math.max(0, item.attendancePercentage - 3);
      }
      return {
        ...item,
        status: update.status,
        attendancePercentage: newPct
      };
    }
    return item;
  });

  db.set('teacherAttendanceRecords', updatedRecords);

  // Also sync student directory records
  const allStudents = db.get('students');
  const updatedStudents = allStudents.map((st) => {
    const update = records.find((r) => r.studentId === st.studentId);
    if (update) {
      const match = updatedRecords.find((ur) => ur.studentId === st.studentId);
      return {
        ...st,
        attendance: match ? match.attendancePercentage : st.attendance
      };
    }
    return st;
  });
  db.set('students', updatedStudents);

  // Log action
  db.insert('systemLogs', {
    id: `log_${Date.now()}`,
    title: `Attendance Session Logged (${records.length} students)`,
    time: 'Just now',
    source: 'Teacher Portal',
    type: 'sync',
    userRole: 'Teacher',
    action: 'Mark Attendance',
    module: 'Attendance',
    status: 'Success'
  });

  res.json({
    success: true,
    message: 'Attendance saved successfully.',
    students: updatedRecords
  });
});
