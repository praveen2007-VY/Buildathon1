import { db } from '../db.js';
import { User } from '../types.js';

export interface AIContextData {
  role: string;
  userName: string;
  userEmail: string;
  department?: string;
  studentId?: string;
  employeeId?: string;
  page: string;
  contextSummary: string;
}

export class AIContextService {
  /**
   * Builds privacy-safe, role-specific platform context for Groq system prompt
   */
  public static buildContext(user: User | undefined, page: string = '/'): AIContextData {
    const role = user?.role || 'student';
    const userName = user?.name || 'Guest User';
    const userEmail = user?.email || 'guest@eduai.local';

    let contextSummary = '';

    if (role === 'student') {
      contextSummary = this.buildStudentContext(user, page);
    } else if (role === 'teacher') {
      contextSummary = this.buildTeacherContext(user, page);
    } else if (role === 'admin') {
      contextSummary = this.buildAdminContext(page);
    } else {
      contextSummary = `User is currently browsing ${page} in public mode.`;
    }

    return {
      role,
      userName,
      userEmail,
      department: user?.department,
      studentId: user?.studentId,
      employeeId: user?.employeeId,
      page,
      contextSummary,
    };
  }

  /**
   * Strictly student-isolated academic context
   */
  private static buildStudentContext(user: User | undefined, page: string): string {
    const lines: string[] = [];

    lines.push(`--- AUTHENTICATED STUDENT CONTEXT ---`);
    lines.push(`Student Name: ${user?.name || 'Student'}`);
    if (user?.studentId) lines.push(`Student ID: ${user.studentId}`);
    if (user?.department) lines.push(`Department: ${user.department}`);
    if (user?.semester) lines.push(`Semester: ${user.semester}`);
    lines.push(`Current Page: ${page}`);
    lines.push(``);

    // 1. AI Recommendations & Diagnostic info
    const recommendations = db.get('aiRecommendations') || [];
    if (recommendations.length > 0) {
      lines.push(`[Active AI Diagnostic Recommendations]`);
      recommendations.forEach((rec, idx) => {
        lines.push(`- Recommendation ${idx + 1}: Subject: "${rec.targetSubject}", Risk Level: ${rec.riskLevel || 'Medium'}, Status: "${rec.scoreChange}"`);
        lines.push(`  Insight: ${rec.insightText}`);
        if (rec.reason) lines.push(`  Reason: ${rec.reason}`);
        if (rec.suggestedAction) lines.push(`  Suggested Action: ${rec.suggestedAction}`);
        if (rec.recommendations && rec.recommendations.length > 0) {
          lines.push(`  Key Steps: ${rec.recommendations.join('; ')}`);
        }
      });
      lines.push(``);
    }

    // 2. Courses
    const courses = db.get('courses') || [];
    if (courses.length > 0) {
      lines.push(`[Enrolled Courses (${courses.length})]`);
      courses.slice(0, 5).forEach((c) => {
        lines.push(`- ${c.name} (${c.code}) - Instructor: ${c.instructor}, Status: ${c.status || 'Active'}`);
      });
      lines.push(``);
    }

    // 3. Assignments
    const assignments = db.get('assignments') || [];
    if (assignments.length > 0) {
      lines.push(`[Assignments Status]`);
      const pending = assignments.filter((a) => a.status === 'Pending');
      const submitted = assignments.filter((a) => a.status === 'Submitted' || a.status === 'Evaluated');
      lines.push(`- Total: ${assignments.length} (${pending.length} pending, ${submitted.length} submitted)`);
      pending.slice(0, 3).forEach((a) => {
        lines.push(`  • Pending: "${a.title}" (${a.course}) - Due: ${a.dueDate}`);
      });
      lines.push(``);
    }

    // 4. Grades
    const grades = db.get('grades') || [];
    if (grades.length > 0) {
      lines.push(`[Academic Grades & Scores]`);
      grades.slice(0, 5).forEach((g) => {
        lines.push(`- ${g.subject} (${g.code}): Score ${g.score}% (Grade: ${g.grade || g.letterGrade || 'In Progress'}, Status: ${g.status || 'Pass'})`);
      });
      lines.push(``);
    }

    // 5. Attendance
    const attendance = db.get('attendance') || [];
    if (attendance.length > 0) {
      lines.push(`[Attendance Records]`);
      let totalClasses = 0;
      let totalPresent = 0;
      attendance.forEach((att) => {
        totalClasses += att.classesHeld || 0;
        totalPresent += att.present || 0;
        lines.push(`- ${att.subject} (${att.code}): ${att.percentage}% (${att.present}/${att.classesHeld} classes, Status: ${att.status})`);
      });
      const avgAtt = totalClasses > 0 ? Math.round((totalPresent / totalClasses) * 100) : 90;
      lines.push(`Overall Attendance Average: ${avgAtt}%`);
      lines.push(``);
    }

    // 6. Upcoming Exams
    const exams = db.get('exams') || [];
    const upcomingExams = exams.filter((e) => e.isUpcoming);
    if (upcomingExams.length > 0) {
      lines.push(`[Upcoming Exams]`);
      upcomingExams.slice(0, 3).forEach((e) => {
        lines.push(`- ${e.title} (${e.subject}) - Date: ${e.date} at ${e.time} (${e.location})`);
      });
      lines.push(``);
    }

    // 7. Schedule
    const schedules = db.get('schedules') || [];
    if (schedules.length > 0) {
      lines.push(`[Weekly Lecture Schedule]`);
      schedules.slice(0, 4).forEach((s) => {
        lines.push(`- ${s.day} ${s.time}: ${s.subject} (${s.code}) - Room ${s.room}, Instructor: ${s.instructor}`);
      });
      lines.push(``);
    }

    return lines.join('\n');
  }

  /**
   * Teacher course/class aggregate context
   */
  private static buildTeacherContext(user: User | undefined, page: string): string {
    const lines: string[] = [];

    lines.push(`--- AUTHENTICATED TEACHER CONTEXT ---`);
    lines.push(`Faculty Name: ${user?.name || 'Teacher'}`);
    if (user?.employeeId) lines.push(`Employee ID: ${user.employeeId}`);
    if (user?.department) lines.push(`Department: ${user.department}`);
    lines.push(`Current Page: ${page}`);
    lines.push(``);

    // Classes
    const classes = db.get('classes') || [];
    if (classes.length > 0) {
      lines.push(`[Assigned Classes (${classes.length})]`);
      classes.forEach((c) => {
        lines.push(`- ${c.courseName} (${c.courseCode}, Section ${c.section}) - ${c.studentCount} Students, Avg Performance: ${c.avgPerformance}%, Attendance Rate: ${c.attendanceRate}%`);
      });
      lines.push(``);
    }

    // Weak topics
    const weakTopics = db.get('weakTopics') || [];
    if (weakTopics.length > 0) {
      lines.push(`[Identified Course Weak Topics]`);
      weakTopics.forEach((w) => {
        lines.push(`- ${w.topic} (${w.course}): ${w.studentsAffectedPercentage}% students affected (Severity: ${w.severity}). Recommendation: ${w.recommendedAction}`);
      });
      lines.push(``);
    }

    // At-Risk Students (Aggregate and allowed student list)
    const students = db.get('students') || [];
    const atRisk = students.filter((s) => s.riskLevel === 'High Risk' || s.riskLevel === 'Medium Risk');
    lines.push(`[At-Risk Students Overview]`);
    lines.push(`Total Students Monitored: ${students.length}`);
    lines.push(`Students Requiring Academic Attention: ${atRisk.length}`);
    atRisk.slice(0, 5).forEach((s) => {
      lines.push(`- ${s.name} (${s.studentId || s.id}) - Risk: ${s.riskLevel}, Issue: ${s.primaryIssue || 'Low Assessment Scores'}, Attendance: ${s.attendance}%, Score: ${s.performance}%`);
    });
    lines.push(``);

    // Submissions
    const submissions = db.get('submissions') || [];
    const pendingSubmissions = submissions.filter((sub) => sub.status === 'Pending Grade');
    lines.push(`[Assignment Submissions]`);
    lines.push(`Total Submissions: ${submissions.length} (${pendingSubmissions.length} pending grading)`);
    lines.push(``);

    return lines.join('\n');
  }

  /**
   * Admin institutional summary context
   */
  private static buildAdminContext(page: string): string {
    const lines: string[] = [];
    lines.push(`--- AUTHENTICATED ADMIN CONTEXT ---`);
    lines.push(`Current Page: ${page}`);
    const students = db.get('students') || [];
    const teachers = db.get('teachers') || [];
    const courses = db.get('courses') || [];
    lines.push(`Total Students: ${students.length}`);
    lines.push(`Total Faculty: ${teachers.length}`);
    lines.push(`Total Active Courses: ${courses.length}`);
    return lines.join('\n');
  }
}
