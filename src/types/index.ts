export type UserRole = 'student' | 'teacher' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  title?: string;
  department?: string;
  studentId?: string;
  employeeId?: string;
  designation?: string;
  officeRoom?: string;
  semester?: string;
  phone?: string;
}

export interface StatCardProps {
  title: string;
  value: string | number;
  icon: string;
  iconBgColor?: string;
  iconTextColor?: string;
  trend?: {
    value: string;
    isPositive?: boolean;
    isWarning?: boolean;
    label?: string;
  };
  subtitle?: string;
}

export interface CourseProgressItem {
  id: string;
  name: string;
  code: string;
  progress: number;
  grade?: string;
  color?: string;
  isRisk?: boolean;
  instructor?: string;
  lastAccessed?: string;
  category?: string;
  status?: 'Active' | 'Completed' | 'Upcoming';
}

export interface UpcomingActivity {
  id: string;
  title: string;
  type: 'lecture' | 'assignment' | 'exam' | 'quiz';
  date: string;
  time: string;
  course: string;
  color: string;
}

export interface AIRecommendation {
  id: string;
  targetSubject: string;
  scoreChange: string;
  insightText: string;
  recommendations: string[];
  riskLevel: 'Low' | 'Medium' | 'High';
  actionText: string;
  priority?: 'High' | 'Medium' | 'Low';
  reason?: string;
  suggestedAction?: string;
}

export interface SemesterPerformancePoint {
  month: string;
  score: number;
  target: number;
}

export interface TeacherCourse {
  id: string;
  name: string;
  code: string;
  schedule: string;
  studentCount: number;
  avgGrade: string;
  department?: string;
  credits?: number;
  status?: 'Active' | 'Draft' | 'Archived';
  instructor?: string;
}

export interface TeacherClass {
  id: string;
  courseName: string;
  courseCode: string;
  section: string;
  studentCount: number;
  room: string;
  schedule: string;
  status: 'Active' | 'Completed';
  avgPerformance: number;
  attendanceRate: number;
  instructor?: string;
  capacity?: number;
}

export interface AtRiskStudent {
  id: string;
  initials: string;
  name: string;
  riskLevel: 'High Risk' | 'Medium Risk' | 'Low Risk';
  primaryIssue?: string;
  avatarBgColor?: string;
  avatarTextColor?: string;
  studentId?: string;
  department?: string;
  course?: string;
  attendance?: number;
  performance?: number;
  status?: 'Active' | 'Disabled';
}

export interface AdminTeacher {
  id: string;
  name: string;
  employeeId: string;
  email: string;
  department: string;
  coursesCount: number;
  studentsCount: number;
  designation: string;
  status: 'Active' | 'Disabled';
  phone?: string;
}

export interface ClassPerformanceTrendPoint {
  week: string;
  avgScore: number;
  attendance: number;
}

export interface DepartmentPerformancePoint {
  department: string;
  currentTerm: number;
  previousTerm: number;
}

export interface SystemMonitoringLog {
  id: string;
  title: string;
  time: string;
  source: string;
  type: 'sync' | 'security' | 'user' | 'warning';
  userRole?: string;
  action?: string;
  module?: string;
  status?: 'Success' | 'Warning' | 'Error';
}

export interface SystemHealthItem {
  name: string;
  status: 'Operational' | 'Warning' | 'Critical';
  uptime: string;
  latency: string;
}

export interface RiskDistribution {
  name: string;
  value: number;
  percentage: number;
  color: string;
}

export interface StudentAssignment {
  id: string;
  title: string;
  course: string;
  courseCode: string;
  dueDate: string;
  status: 'Pending' | 'Submitted' | 'Evaluated' | 'Late';
  score?: string;
  maxScore?: number;
  description?: string;
  instructions?: string;
  teacherFeedback?: string;
  aiFeedback?: string;
  submissionsCount?: number;
  teacher?: string;
}

export interface TeacherSubmission {
  id: string;
  studentName: string;
  studentId: string;
  assignmentTitle: string;
  submittedDate: string;
  score?: number;
  maxScore: number;
  teacherFeedback?: string;
  aiFeedback?: string;
  status: 'Graded' | 'Pending Grade';
}

export interface SubjectAttendance {
  id: string;
  subject: string;
  code: string;
  classesHeld: number;
  present: number;
  absent: number;
  late: number;
  percentage: number;
  status: 'Excellent' | 'Good' | 'Warning' | 'Critical';
}

export interface TeacherAttendanceRecord {
  studentId: string;
  studentName: string;
  status: 'Present' | 'Absent' | 'Late';
  attendancePercentage: number;
}

export interface StudentExam {
  id: string;
  title: string;
  subject: string;
  date: string;
  time: string;
  duration: string;
  location: string;
  isUpcoming: boolean;
  score?: string;
  grade?: string;
  result?: 'Pass' | 'Fail' | 'Distinction';
  instructions?: string[];
  maxMarks?: number;
  instructor?: string;
  studentsCount?: number;
}

export interface StudentGradeRecord {
  id: string;
  subject: string;
  code: string;
  assessment: string;
  score: number;
  maxScore: number;
  grade: string;
  status: 'Pass' | 'Fail' | 'Pending';
  semester: string;
  department?: string;
  studentName?: string;
  studentId?: string;
}

export interface TeacherGradeEntry {
  id: string;
  studentName: string;
  studentId: string;
  assignmentScore: number;
  examScore: number;
  totalScore: number;
  grade: string;
  status: 'Pass' | 'Fail' | 'Pending';
}

export interface ScheduleItem {
  id: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';
  time: string;
  subject: string;
  code: string;
  instructor: string;
  room: string;
  isUpcoming?: boolean;
}

export interface WeakTopic {
  id: string;
  topic: string;
  course: string;
  studentsAffectedPercentage: number;
  severity: 'High' | 'Medium' | 'Low';
  recommendedAction: string;
}
