import { 
  User, 
  CourseProgressItem, 
  UpcomingActivity, 
  AIRecommendation, 
  SemesterPerformancePoint,
  TeacherCourse,
  TeacherClass,
  AtRiskStudent,
  AdminTeacher,
  ClassPerformanceTrendPoint,
  DepartmentPerformancePoint,
  SystemMonitoringLog,
  SystemHealthItem,
  RiskDistribution,
  StudentAssignment,
  TeacherSubmission,
  SubjectAttendance,
  TeacherAttendanceRecord,
  StudentExam,
  StudentGradeRecord,
  TeacherGradeEntry,
  ScheduleItem,
  WeakTopic
} from '../types';

export const currentUserStudent: User = {
  id: 'std_01',
  name: 'Alex Rivera',
  email: 'alex.rivera@eduai.edu',
  role: 'student',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  title: 'Computer Science Undergraduate',
  department: 'School of Computing',
  studentId: 'EDU-2024-8842',
  semester: 'Fall Semester 2024 (Term 5)',
  phone: '+1 (555) 234-5678'
};

export const currentUserTeacher: User = {
  id: 'tch_01',
  name: 'Prof. Henderson',
  email: 'henderson@eduai.edu',
  role: 'teacher',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  title: 'Senior Mathematics & CS Professor',
  department: 'Department of Applied Mathematics',
  employeeId: 'TCH-2024-402',
  designation: 'Senior Faculty Professor',
  officeRoom: 'Science Building - Room 402B',
  phone: '+1 (555) 876-5432'
};

export const currentUserAdmin: User = {
  id: 'adm_01',
  name: 'Dr. Sarah Jenkins',
  email: 's.jenkins@eduai.edu',
  role: 'admin',
  avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
  title: 'Super Admin',
  department: 'Institutional Administration'
};

export const studentAIInsightsDetailed = [
  { 
    id: 'ai_1', 
    targetSubject: 'Database Systems (CS-303)', 
    scoreChange: '-12%', 
    riskLevel: 'Medium' as const, 
    priority: 'High' as const, 
    insightText: 'Your recent assignment scores have declined by 12% in Database Systems while attendance remains stable at 81%.', 
    reason: 'Struggles detected in relational normalization (3NF/BCNF) and SQL subquery optimizations.', 
    suggestedAction: 'Complete Practice Exercise #4 on SQL Joins and review Module 3 lecture slides.', 
    recommendations: ['Revise 3NF and Boyce-Codd Normal Form rules.', 'Practice INNER JOIN vs LEFT OUTER JOIN query patterns.', 'Schedule tutorial session with Prof. Marcus Vance.'], 
    actionText: 'Start SQL Practice' 
  },
  { 
    id: 'ai_2', 
    targetSubject: 'Mathematics (MATH-101)', 
    scoreChange: '+6%', 
    riskLevel: 'Low' as const, 
    priority: 'Medium' as const, 
    insightText: 'Strong performance trend in Calculus with 94% attendance and 92/100 score on latest Problem Set.', 
    reason: 'High problem set completion rate and solid understanding of differential equations.', 
    suggestedAction: 'Maintain current study rhythm before Midterm Exam on Oct 28.', 
    recommendations: ['Review integration by parts sample problems.', 'Attempt mock midterm exam #1 under timed conditions.'], 
    actionText: 'Take Practice Test' 
  }
];

export const studentGradesSummary = { 
  currentGPA: 3.42, 
  percentage: 84.5, 
  totalCredits: 16, 
  completedSubjects: 5 
};

export const studentScheduleList: ScheduleItem[] = [
  { id: 'sch_1', day: 'Monday', time: '9:00 AM - 10:30 AM', subject: 'Mathematics (MATH-101)', code: 'MATH-101', instructor: 'Prof. Henderson', room: 'Hall B - 302', isUpcoming: true },
  { id: 'sch_2', day: 'Monday', time: '11:00 AM - 12:30 PM', subject: 'AI & Machine Learning (CS-405)', code: 'CS-405', instructor: 'Dr. Sarah Jenkins', room: 'Lab 2', isUpcoming: true },
  { id: 'sch_3', day: 'Tuesday', time: '2:00 PM - 3:30 PM', subject: 'Data Structures (CS-201)', code: 'CS-201', instructor: 'Dr. Alan Turing', room: 'Lab 4', isUpcoming: true },
  { id: 'sch_4', day: 'Wednesday', time: '10:00 AM - 11:30 AM', subject: 'Database Systems (CS-303)', code: 'CS-303', instructor: 'Prof. Marcus Vance', room: 'Hall A - 104' },
  { id: 'sch_5', day: 'Thursday', time: '2:00 PM - 3:30 PM', subject: 'Data Structures (CS-201)', code: 'CS-201', instructor: 'Dr. Alan Turing', room: 'Lab 4' },
  { id: 'sch_6', day: 'Friday', time: '1:00 PM - 2:30 PM', subject: 'AI & ML Lab Tutorial', code: 'CS-405L', instructor: 'Teaching Asst. Chen', room: 'Lab 1' }
];

export const adminStudentsDirectory: AtRiskStudent[] = [
  { id: 'std_1', initials: 'AR', name: 'Alex Rivera', studentId: 'EDU-8842', department: 'School of Computing', course: 'CS-201', attendance: 91, performance: 78, riskLevel: 'Low Risk', status: 'Active', primaryIssue: 'None' },
  { id: 'std_2', initials: 'ES', name: 'Emma Stone', studentId: 'EDU-8843', department: 'Applied Mathematics', course: 'MATH-401', attendance: 68, performance: 60, riskLevel: 'High Risk', status: 'Active', primaryIssue: 'Low Assignment Score' },
  { id: 'std_3', initials: 'JW', name: 'James Wilson', studentId: 'EDU-8844', department: 'Applied Mathematics', course: 'MATH-302', attendance: 72, performance: 65, riskLevel: 'High Risk', status: 'Active', primaryIssue: 'Frequent Absences' },
  { id: 'std_4', initials: 'MP', name: 'Mia Patel', studentId: 'EDU-8845', department: 'School of Computing', course: 'CS-303', attendance: 81, performance: 76, riskLevel: 'Medium Risk', status: 'Active', primaryIssue: 'Declining Quiz Grades' },
  { id: 'std_5', initials: 'LZ', name: 'Lucas Zhang', studentId: 'EDU-8846', department: 'School of Engineering', course: 'ENG-301', attendance: 96, performance: 95, riskLevel: 'Low Risk', status: 'Active', primaryIssue: 'None' },
  { id: 'std_6', initials: 'SM', name: 'Sophia Miller', studentId: 'EDU-8847', department: 'School of Computing', course: 'CS-405', attendance: 94, performance: 88, riskLevel: 'Low Risk', status: 'Active', primaryIssue: 'None' }
];

export const adminTeachersDirectory: AdminTeacher[] = [
  { id: 't_1', name: 'Prof. Henderson', employeeId: 'TCH-402', email: 'henderson@eduai.edu', department: 'Applied Mathematics', coursesCount: 4, studentsCount: 124, designation: 'Senior Faculty Professor', status: 'Active', phone: '+1 (555) 876-5432' },
  { id: 't_2', name: 'Dr. Alan Turing', employeeId: 'TCH-101', email: 'turing@eduai.edu', department: 'School of Computing', coursesCount: 3, studentsCount: 180, designation: 'Department Chair', status: 'Active', phone: '+1 (555) 123-4567' },
  { id: 't_3', name: 'Dr. Sarah Jenkins', employeeId: 'TCH-205', email: 's.jenkins@eduai.edu', department: 'School of Computing', coursesCount: 2, studentsCount: 95, designation: 'Associate Professor', status: 'Active', phone: '+1 (555) 987-6543' },
  { id: 't_4', name: 'Prof. Marcus Vance', employeeId: 'TCH-308', email: 'vance@eduai.edu', department: 'School of Computing', coursesCount: 3, studentsCount: 140, designation: 'Assistant Professor', status: 'Active', phone: '+1 (555) 456-7890' }
];

export const adminSystemHealthItems: SystemHealthItem[] = [
  { name: 'Core API Gateway', status: 'Operational', uptime: '99.98%', latency: '24ms' },
  { name: 'PostgreSQL Database Cluster', status: 'Operational', uptime: '99.95%', latency: '8ms' },
  { name: 'OAuth2 Authentication Service', status: 'Operational', uptime: '100.0%', latency: '15ms' },
  { name: 'AI Recommendation Inference Engine', status: 'Operational', uptime: '99.90%', latency: '45ms' },
  { name: 'LMS Storage & Media Service', status: 'Operational', uptime: '99.99%', latency: '18ms' }
];

export const teacherActiveCourses: TeacherCourse[] = [
  { id: 'tc1', name: 'Advanced Calculus', code: 'MATH-401', schedule: 'Tue/Thu 10:00 AM', studentCount: 48, avgGrade: 'B+', department: 'Applied Mathematics', credits: 4, status: 'Active', instructor: 'Prof. Henderson' },
  { id: 'tc2', name: 'Linear Algebra & Matrices', code: 'MATH-302', schedule: 'Mon/Wed 1:00 PM', studentCount: 35, avgGrade: 'A-', department: 'Applied Mathematics', credits: 3, status: 'Active', instructor: 'Prof. Henderson' },
  { id: 'tc3', name: 'Discrete Mathematics', code: 'MATH-205', schedule: 'Fri 9:00 AM', studentCount: 41, avgGrade: 'B-', department: 'Applied Mathematics', credits: 3, status: 'Active', instructor: 'Prof. Henderson' },
  { id: 'tc4', name: 'Database Systems & SQL', code: 'CS-303', schedule: 'Wed 3:00 PM', studentCount: 65, avgGrade: 'C+', department: 'School of Computing', credits: 4, status: 'Active', instructor: 'Prof. Marcus Vance' }
];

export const teacherClassesList: TeacherClass[] = [
  { id: 'cls_1', courseName: 'Advanced Calculus', courseCode: 'MATH-401', section: 'Sec A01', studentCount: 24, room: 'Hall B - Room 302', schedule: 'Tue/Thu 10:00 AM', status: 'Active', avgPerformance: 84, attendanceRate: 94, instructor: 'Prof. Henderson', capacity: 30 },
  { id: 'cls_2', courseName: 'Advanced Calculus', courseCode: 'MATH-401', section: 'Sec A02', studentCount: 24, room: 'Hall B - Room 304', schedule: 'Tue/Thu 2:00 PM', status: 'Active', avgPerformance: 79, attendanceRate: 91, instructor: 'Prof. Henderson', capacity: 30 },
  { id: 'cls_3', courseName: 'Linear Algebra', courseCode: 'MATH-302', section: 'Sec B01', studentCount: 35, room: 'Lab 4', schedule: 'Mon/Wed 1:00 PM', status: 'Active', avgPerformance: 88, attendanceRate: 96, instructor: 'Prof. Henderson', capacity: 40 },
  { id: 'cls_4', courseName: 'Discrete Mathematics', courseCode: 'MATH-205', section: 'Sec C01', studentCount: 41, room: 'Hall A - Room 104', schedule: 'Fri 9:00 AM', status: 'Active', avgPerformance: 76, attendanceRate: 89, instructor: 'Dr. Alan Turing', capacity: 45 }
];

export const studentAssignmentsList: StudentAssignment[] = [
  { id: 'asg_1', title: 'Relational Database Normalization Project', course: 'Database Systems', courseCode: 'CS-303', dueDate: 'Oct 25, 2024', status: 'Pending', description: 'Design a 3NF relational schema.', teacher: 'Prof. Marcus Vance', submissionsCount: 42 },
  { id: 'asg_2', title: 'Neural Network Classifier Implementation', course: 'AI & Machine Learning', courseCode: 'CS-405', dueDate: 'Tomorrow (11:59 PM)', status: 'Pending', description: 'Build a PyTorch MLP classifier.', teacher: 'Dr. Sarah Jenkins', submissionsCount: 88 },
  { id: 'asg_3', title: 'Differential Equations Problem Set #3', course: 'Mathematics', courseCode: 'MATH-101', dueDate: 'Oct 15, 2024', status: 'Evaluated', score: '92/100', teacher: 'Prof. Henderson', submissionsCount: 48 }
];

export const studentExamsList: StudentExam[] = [
  { id: 'ex_1', title: 'Mathematics Midterm Exam', subject: 'Mathematics (MATH-101)', date: 'Oct 28, 2024', time: '9:00 AM', duration: '2 Hours', location: 'Hall B - Room 302', isUpcoming: true, instructor: 'Prof. Henderson', studentsCount: 48 },
  { id: 'ex_2', title: 'Data Structures Practicum', subject: 'Data Structures (CS-201)', date: 'Nov 04, 2024', time: '1:00 PM', duration: '2 Hours', location: 'Computer Lab 4', isUpcoming: true, instructor: 'Dr. Alan Turing', studentsCount: 35 }
];

export const studentGradesRecords: StudentGradeRecord[] = [
  { id: 'gr_1', subject: 'Mathematics', code: 'MATH-101', assessment: 'Midterm Exam', score: 92, maxScore: 100, grade: 'A', status: 'Pass', semester: 'Fall 2024', department: 'Applied Mathematics', studentName: 'Alex Rivera', studentId: 'EDU-8842' },
  { id: 'gr_2', subject: 'Data Structures', code: 'CS-201', assessment: 'Midterm Exam', score: 78, maxScore: 100, grade: 'B+', status: 'Pass', semester: 'Fall 2024', department: 'School of Computing', studentName: 'Emma Stone', studentId: 'EDU-8843' },
  { id: 'gr_3', subject: 'Database Systems', code: 'CS-303', assessment: 'Midterm Exam', score: 64, maxScore: 100, grade: 'C', status: 'Pass', semester: 'Fall 2024', department: 'School of Computing', studentName: 'James Wilson', studentId: 'EDU-8844' }
];

export const teacherAttendanceStudents: TeacherAttendanceRecord[] = [
  { studentId: 'EDU-8842', studentName: 'Alex Rivera', status: 'Present', attendancePercentage: 91 },
  { studentId: 'EDU-8843', studentName: 'Emma Stone', status: 'Absent', attendancePercentage: 68 },
  { studentId: 'EDU-8844', studentName: 'James Wilson', status: 'Absent', attendancePercentage: 72 },
  { studentId: 'EDU-8845', studentName: 'Mia Patel', status: 'Late', attendancePercentage: 81 },
  { studentId: 'EDU-8846', studentName: 'Lucas Zhang', status: 'Present', attendancePercentage: 96 },
  { studentId: 'EDU-8847', studentName: 'Sophia Miller', status: 'Present', attendancePercentage: 94 }
];

export const teacherSubmissionsList: TeacherSubmission[] = [
  { id: 'sub_1', studentName: 'Emma Stone', studentId: 'EDU-8843', assignmentTitle: 'Calculus Optimization Problem Set', submittedDate: 'Oct 22, 2024', maxScore: 100, status: 'Pending Grade' },
  { id: 'sub_2', studentName: 'Alex Rivera', studentId: 'EDU-8842', assignmentTitle: 'Calculus Optimization Problem Set', submittedDate: 'Oct 21, 2024', score: 92, maxScore: 100, status: 'Graded' }
];

export const teacherGradeEntriesList: TeacherGradeEntry[] = [
  { id: 'g_1', studentName: 'Alex Rivera', studentId: 'EDU-8842', assignmentScore: 92, examScore: 88, totalScore: 90, grade: 'A-', status: 'Pass' },
  { id: 'g_2', studentName: 'Emma Stone', studentId: 'EDU-8843', assignmentScore: 58, examScore: 62, totalScore: 60, grade: 'C-', status: 'Pass' }
];

export const teacherWeakTopicsList: WeakTopic[] = [
  { id: 'wt_1', topic: 'Advanced Integration by Parts (Module 4)', course: 'MATH-401', studentsAffectedPercentage: 42, severity: 'High', recommendedAction: 'Schedule a 45-minute revision workshop.' }
];

export const studentStats = { overallPerformance: 78, attendancePercentage: 91, pendingAssignmentsCount: 4, upcomingExam: { subject: 'Mathematics', daysLeft: 'in 3 days', date: 'Oct 28, 2024' } };

export const teacherStats = { totalStudents: 124, activeCourses: 4, pendingEvaluations: 28, attendanceTodayPercentage: 94 };

export const adminStats = { totalStudents: 12450, studentsTrend: '+2.4% from last year', totalTeachers: 840, teachersTrend: 'No change', activeCourses: 320, coursesTrend: '+12 new this term', globalAttendance: 94.2, attendanceTrend: '-0.8% this week' };

export const semesterPerformanceData: SemesterPerformancePoint[] = [
  { month: 'Sep', score: 68, target: 75 },
  { month: 'Oct', score: 74, target: 78 },
  { month: 'Nov', score: 72, target: 80 },
  { month: 'Dec', score: 79, target: 82 },
  { month: 'Jan', score: 78, target: 85 }
];

export const adminAcademicPerformanceData = [
  { month: 'Sep', gpa: 3.1, score: 76 },
  { month: 'Oct', gpa: 3.3, score: 81 },
  { month: 'Nov', gpa: 3.2, score: 79 },
  { month: 'Dec', gpa: 3.6, score: 87 },
  { month: 'Jan', gpa: 3.5, score: 85 }
];

export const adminRiskDistributionData: RiskDistribution[] = [
  { name: 'Low Risk', value: 10582, percentage: 85, color: '#0058be' },
  { name: 'Medium Risk', value: 1494, percentage: 12, color: '#4648d4' },
  { name: 'High Risk', value: 374, percentage: 3, color: '#ba1a1a' }
];

export const adminDepartmentPerformanceData: DepartmentPerformancePoint[] = [
  { department: 'Comp Sci', currentTerm: 75, previousTerm: 60 },
  { department: 'Business', currentTerm: 65, previousTerm: 70 },
  { department: 'Arts', currentTerm: 60, previousTerm: 55 },
  { department: 'Engineering', currentTerm: 85, previousTerm: 80 }
];

export const adminSystemMonitoringLogs: SystemMonitoringLog[] = [
  { id: 'log_1', title: 'LMS Data Sync Completed', time: '10 mins ago', source: 'System Auto', type: 'sync', userRole: 'System', action: 'Data Sync', module: 'Database', status: 'Success' },
  { id: 'log_2', title: 'New Security Patch Deployed', time: '1 hour ago', source: 'IT Ops', type: 'security', userRole: 'Admin', action: 'Security Update', module: 'Auth', status: 'Success' },
  { id: 'log_3', title: 'Batch User Import (240)', time: '3 hours ago', source: 'Admin Portal', type: 'user', userRole: 'Admin', action: 'User Import', module: 'Students', status: 'Success' },
  { id: 'log_4', title: 'API Rate Limit Warning', time: 'Yesterday', source: 'External Integration', type: 'warning', userRole: 'System', action: 'Rate Limit', module: 'API', status: 'Warning' }
];

export const teacherClassPerformanceData: ClassPerformanceTrendPoint[] = [
  { week: 'W1', avgScore: 72, attendance: 95 },
  { week: 'W2', avgScore: 76, attendance: 93 },
  { week: 'W3', avgScore: 71, attendance: 96 },
  { week: 'W4', avgScore: 82, attendance: 92 },
  { week: 'W5', avgScore: 79, attendance: 94 },
  { week: 'W6', avgScore: 85, attendance: 97 }
];

export const studentEnrolledCourses: CourseProgressItem[] = [
  { id: 'c1', name: 'Mathematics (Calculus & Linear Algebra)', code: 'MATH-101', progress: 82, grade: 'A-', color: 'bg-primary', instructor: 'Prof. Henderson', lastAccessed: '2 hours ago', category: 'Mathematics', status: 'Active' },
  { id: 'c2', name: 'Data Structures & Algorithms', code: 'CS-201', progress: 74, grade: 'B+', color: 'bg-secondary', instructor: 'Dr. Alan Turing', lastAccessed: 'Yesterday', category: 'Computer Science', status: 'Active' }
];

export const studentCourseProgress: CourseProgressItem[] = studentEnrolledCourses;

export const teacherAtRiskStudents: AtRiskStudent[] = [
  { id: 'r1', initials: 'ES', name: 'Emma Stone', riskLevel: 'High Risk', primaryIssue: 'Low Assignment Score', avatarBgColor: 'bg-primary-container/20', avatarTextColor: 'text-primary' },
  { id: 'r2', initials: 'JW', name: 'James Wilson', riskLevel: 'High Risk', primaryIssue: 'Frequent Absences', avatarBgColor: 'bg-tertiary/20', avatarTextColor: 'text-tertiary' }
];

export const studentAIRecommendation: AIRecommendation = {
  id: 'rec_01',
  targetSubject: 'Database Systems',
  scoreChange: '-12%',
  riskLevel: 'Medium',
  insightText: 'Your performance in Database Systems has decreased by 12% over the last three assessments.',
  recommendations: ['Revise relational normalization & SQL join operations.'],
  actionText: 'View AI Insights'
};

export const studentUpcomingActivities: UpcomingActivity[] = [
  { id: 'act_01', title: 'Data Structures Lecture', type: 'lecture', date: 'Today', time: '2:00 PM', course: 'CS-201', color: 'bg-primary-container' }
];

export const studentAttendanceSummary = { overallPercentage: 91, totalClasses: 120, present: 109, absent: 7, late: 4 };

export const studentSubjectAttendanceList: SubjectAttendance[] = [
  { id: 'att_1', subject: 'Mathematics (MATH-101)', code: 'MATH-101', classesHeld: 30, present: 28, absent: 1, late: 1, percentage: 94, status: 'Excellent' }
];

export const studentAttendanceChartData = [
  { month: 'Aug', percentage: 96 },
  { month: 'Sep', percentage: 94 },
  { month: 'Oct', percentage: 88 }
];
