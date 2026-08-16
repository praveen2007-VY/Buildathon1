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

export const currentUserStudent: User | null = null;
export const currentUserTeacher: User | null = null;
export const currentUserAdmin: User | null = null;

export const studentAIInsightsDetailed: AIRecommendation[] = [];

export const studentGradesSummary = { 
  currentGPA: 0, 
  percentage: 0, 
  totalCredits: 0, 
  completedSubjects: 0 
};

export const studentScheduleList: ScheduleItem[] = [];

export const adminStudentsDirectory: AtRiskStudent[] = [];

export const adminTeachersDirectory: AdminTeacher[] = [];

export const adminSystemHealthItems: SystemHealthItem[] = [];

export const teacherActiveCourses: TeacherCourse[] = [];

export const teacherClassesList: TeacherClass[] = [];

export const studentAssignmentsList: StudentAssignment[] = [];

export const studentExamsList: StudentExam[] = [];

export const studentGradesRecords: StudentGradeRecord[] = [];

export const teacherAttendanceStudents: TeacherAttendanceRecord[] = [];

export const teacherSubmissionsList: TeacherSubmission[] = [];

export const teacherGradeEntriesList: TeacherGradeEntry[] = [];

export const teacherWeakTopicsList: WeakTopic[] = [];

export const studentStats = { 
  overallPerformance: 0, 
  attendancePercentage: 0, 
  pendingAssignmentsCount: 0, 
  upcomingExam: null 
};

export const teacherStats = { 
  totalStudents: 0, 
  activeCourses: 0, 
  pendingEvaluations: 0, 
  attendanceTodayPercentage: 0 
};

export const adminStats = { 
  totalStudents: 0, 
  studentsTrend: '0%', 
  totalTeachers: 0, 
  teachersTrend: '0%', 
  activeCourses: 0, 
  coursesTrend: '0%', 
  globalAttendance: 0, 
  attendanceTrend: '0%' 
};

export const semesterPerformanceData: SemesterPerformancePoint[] = [];

export const adminAcademicPerformanceData: any[] = [];

export const adminRiskDistributionData: RiskDistribution[] = [];

export const adminDepartmentPerformanceData: DepartmentPerformancePoint[] = [];

export const adminSystemMonitoringLogs: SystemMonitoringLog[] = [];

export const teacherClassPerformanceData: ClassPerformanceTrendPoint[] = [];

export const studentEnrolledCourses: CourseProgressItem[] = [];

export const studentCourseProgress: CourseProgressItem[] = [];

export const teacherAtRiskStudents: AtRiskStudent[] = [];

export const studentAIRecommendation: AIRecommendation | null = null;

export const studentUpcomingActivities: UpcomingActivity[] = [];

export const studentAttendanceSummary = { 
  overallPercentage: 0, 
  totalClasses: 0, 
  present: 0, 
  absent: 0, 
  late: 0 
};

export const studentSubjectAttendanceList: SubjectAttendance[] = [];

export const studentAttendanceChartData: any[] = [];
