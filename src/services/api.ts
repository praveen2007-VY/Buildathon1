import { 
  User, 
  CourseProgressItem, 
  StudentAssignment, 
  SubjectAttendance, 
  StudentExam, 
  StudentGradeRecord, 
  ScheduleItem, 
  AIRecommendation,
  TeacherCourse,
  TeacherClass,
  AtRiskStudent,
  AdminTeacher,
  TeacherSubmission,
  TeacherGradeEntry,
  WeakTopic,
  SystemMonitoringLog,
  SystemHealthItem,
  RiskDistribution,
  DepartmentPerformancePoint,
  UserRole
} from '../types';

const API_BASE = '/api';

class ApiClient {
  private getToken(): string | null {
    return localStorage.getItem('eduai_token');
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const token = this.getToken();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(`${API_BASE}${endpoint}`, {
        ...options,
        headers,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (err: any) {
      console.warn(`[API] Error on ${endpoint}:`, err.message);
      throw err;
    }
  }

  // ==================== AUTH ====================
  async login(credentials: { email: string; password?: string; role?: UserRole }) {
    return this.request<{ token: string; user: User }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async register(data: { name: string; email: string; password?: string; role?: UserRole }) {
    return this.request<{ token: string; user: User }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getCurrentUser() {
    return this.request<{ user: User }>('/auth/me');
  }

  async switchDemoRole(role: UserRole) {
    return this.request<{ token: string; user: User }>('/auth/switch-role', {
      method: 'POST',
      body: JSON.stringify({ role }),
    });
  }

  // ==================== PROFILE ====================
  async updateProfile(updates: Partial<User>) {
    return this.request<{ user: User }>('/profile', {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  // ==================== COURSES ====================
  async getCourses(filters: { search?: string; category?: string; department?: string; difficulty?: string; status?: string } = {}) {
    const params = new URLSearchParams();
    if (filters.search) params.append('search', filters.search);
    if (filters.category) params.append('category', filters.category);
    if (filters.department) params.append('department', filters.department);
    if (filters.difficulty) params.append('difficulty', filters.difficulty);
    if (filters.status) params.append('status', filters.status);

    const queryStr = params.toString() ? `?${params.toString()}` : '';
    return this.request<{ courses: TeacherCourse[] }>(`/courses${queryStr}`);
  }

  async getCourseById(id: string) {
    return this.request<{ course: any }>(`/courses/${id}`);
  }

  async createCourse(data: Partial<TeacherCourse>) {
    return this.request<{ course: TeacherCourse }>('/courses', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateCourse(id: string, updates: Partial<TeacherCourse>) {
    return this.request<{ course: TeacherCourse }>(`/courses/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  async deleteCourse(id: string) {
    return this.request<{ success: boolean; message: string }>(`/courses/${id}`, {
      method: 'DELETE',
    });
  }

  async enrollCourse(courseId: string) {
    return this.request<{ success: boolean; message: string }>(`/courses/${courseId}/enroll`, {
      method: 'POST',
    });
  }

  // ==================== CLASSES ====================
  async getClasses(filters: { instructor?: string; courseCode?: string } = {}) {
    const params = new URLSearchParams();
    if (filters.instructor) params.append('instructor', filters.instructor);
    if (filters.courseCode) params.append('courseCode', filters.courseCode);
    const queryStr = params.toString() ? `?${params.toString()}` : '';
    return this.request<{ classes: TeacherClass[] }>(`/classes${queryStr}`);
  }

  async createClass(data: Partial<TeacherClass>) {
    return this.request<{ class: TeacherClass }>('/classes', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateClass(id: string, updates: Partial<TeacherClass>) {
    return this.request<{ class: TeacherClass }>(`/classes/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  async deleteClass(id: string) {
    return this.request<{ success: boolean; message: string }>(`/classes/${id}`, {
      method: 'DELETE',
    });
  }

  // ==================== ASSIGNMENTS & SUBMISSIONS ====================
  async getAssignments(filters: { courseCode?: string; status?: string } = {}) {
    const params = new URLSearchParams();
    if (filters.courseCode) params.append('courseCode', filters.courseCode);
    if (filters.status) params.append('status', filters.status);
    const queryStr = params.toString() ? `?${params.toString()}` : '';
    return this.request<{ assignments: StudentAssignment[] }>(`/assignments${queryStr}`);
  }

  async createAssignment(data: Partial<StudentAssignment>) {
    return this.request<{ assignment: StudentAssignment }>('/assignments', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateAssignment(id: string, updates: Partial<StudentAssignment>) {
    return this.request<{ assignment: StudentAssignment }>(`/assignments/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  async deleteAssignment(id: string) {
    return this.request<{ success: boolean; message: string }>(`/assignments/${id}`, {
      method: 'DELETE',
    });
  }

  async submitAssignment(id: string, data: { submissionContent: string; fileAttachment?: string }) {
    return this.request<{ success: boolean; message: string; submission: TeacherSubmission }>(`/assignments/${id}/submit`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getSubmissions() {
    return this.request<{ submissions: TeacherSubmission[] }>('/assignments/submissions/all');
  }

  async gradeSubmission(id: string, data: { score: number; teacherFeedback?: string; aiFeedback?: string }) {
    return this.request<{ submission: TeacherSubmission }>(`/assignments/submissions/${id}/grade`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // ==================== ATTENDANCE ====================
  async getStudentAttendance() {
    return this.request<{
      summary: { overallPercentage: number; totalClasses: number; present: number; absent: number; late: number };
      subjects: SubjectAttendance[];
      chartData: { month: string; percentage: number }[];
    }>('/attendance/student');
  }

  async getTeacherAttendance(filters: { courseCode?: string; section?: string } = {}) {
    const params = new URLSearchParams();
    if (filters.courseCode) params.append('courseCode', filters.courseCode);
    if (filters.section) params.append('section', filters.section);
    const queryStr = params.toString() ? `?${params.toString()}` : '';
    return this.request<{ students: any[] }>(`/attendance/teacher${queryStr}`);
  }

  async markAttendance(records: { studentId: string; status: 'Present' | 'Absent' | 'Late' }[]) {
    return this.request<{ success: boolean; message: string; students: any[] }>('/attendance/mark', {
      method: 'POST',
      body: JSON.stringify({ records }),
    });
  }

  // ==================== EXAMS ====================
  async getExams(filters: { isUpcoming?: boolean } = {}) {
    const params = new URLSearchParams();
    if (filters.isUpcoming !== undefined) params.append('isUpcoming', String(filters.isUpcoming));
    const queryStr = params.toString() ? `?${params.toString()}` : '';
    return this.request<{ exams: StudentExam[] }>(`/exams${queryStr}`);
  }

  async createExam(data: Partial<StudentExam>) {
    return this.request<{ exam: StudentExam }>('/exams', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateExam(id: string, updates: Partial<StudentExam>) {
    return this.request<{ exam: StudentExam }>(`/exams/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  async deleteExam(id: string) {
    return this.request<{ success: boolean; message: string }>(`/exams/${id}`, {
      method: 'DELETE',
    });
  }

  // ==================== GRADES ====================
  async getStudentGrades() {
    return this.request<{
      summary: { currentGPA: number; percentage: number; totalCredits: number; completedSubjects: number };
      records: StudentGradeRecord[];
      semesterPerformance: { month: string; score: number; target: number }[];
    }>('/grades/student');
  }

  async getTeacherGrades() {
    return this.request<{ entries: TeacherGradeEntry[] }>('/grades/teacher');
  }

  async updateTeacherGrade(id: string, data: { assignmentScore?: number; examScore?: number }) {
    return this.request<{ entry: TeacherGradeEntry }>(`/grades/teacher/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async getAllGrades() {
    return this.request<{ records: StudentGradeRecord[] }>('/grades/all');
  }

  // ==================== AI INSIGHTS ====================
  async getStudentAIRecommendations() {
    return this.request<{
      recommendations: AIRecommendation[];
      primaryRecommendation: AIRecommendation | null;
    }>('/ai/recommendations');
  }

  async getTeacherWeakTopics() {
    return this.request<{
      weakTopics: WeakTopic[];
      atRiskStudents: AtRiskStudent[];
    }>('/ai/weak-topics');
  }

  async getInstitutionalInsights() {
    return this.request<{
      riskDistribution: RiskDistribution[];
      departmentPerformance: DepartmentPerformancePoint[];
      institutionalSummary: { predictedInterventionsNeeded: number; modelAccuracy: string; lastAnalyzed: string };
    }>('/ai/institutional-insights');
  }

  async generateAIFeedback(topic: string, submissionContent: string) {
    return this.request<{ success: boolean; aiFeedback: string }>('/ai/generate-feedback', {
      method: 'POST',
      body: JSON.stringify({ topic, submissionContent }),
    });
  }

  // ==================== DASHBOARD STATS ====================
  async getStudentStats() {
    return this.request<{ stats: any }>('/stats/student');
  }

  async getTeacherStats() {
    return this.request<{ stats: any }>('/stats/teacher');
  }

  async getAdminStats() {
    return this.request<{ stats: any }>('/stats/admin');
  }

  // ==================== SYSTEM MONITORING ====================
  async getSystemMonitoring() {
    return this.request<{
      logs: SystemMonitoringLog[];
      health: SystemHealthItem[];
    }>('/system/monitoring');
  }

  async triggerSystemSync() {
    return this.request<{ success: boolean; message: string; log: SystemMonitoringLog }>('/system/sync', {
      method: 'POST',
    });
  }

  // ==================== DIRECTORIES (STUDENTS / TEACHERS) ====================
  async getStudents(filters: { search?: string; department?: string; riskLevel?: string } = {}) {
    const params = new URLSearchParams();
    if (filters.search) params.append('search', filters.search);
    if (filters.department) params.append('department', filters.department);
    if (filters.riskLevel) params.append('riskLevel', filters.riskLevel);
    const queryStr = params.toString() ? `?${params.toString()}` : '';
    return this.request<{ students: AtRiskStudent[] }>(`/students${queryStr}`);
  }

  async createStudent(data: Partial<AtRiskStudent>) {
    return this.request<{ student: AtRiskStudent }>('/students', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateStudent(id: string, updates: Partial<AtRiskStudent>) {
    return this.request<{ student: AtRiskStudent }>(`/students/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  async deleteStudent(id: string) {
    return this.request<{ success: boolean; message: string }>(`/students/${id}`, {
      method: 'DELETE',
    });
  }

  async getTeachers(filters: { search?: string; department?: string } = {}) {
    const params = new URLSearchParams();
    if (filters.search) params.append('search', filters.search);
    if (filters.department) params.append('department', filters.department);
    const queryStr = params.toString() ? `?${params.toString()}` : '';
    return this.request<{ teachers: AdminTeacher[] }>(`/teachers${queryStr}`);
  }

  async createTeacher(data: Partial<AdminTeacher>) {
    return this.request<{ teacher: AdminTeacher }>('/teachers', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateTeacher(id: string, updates: Partial<AdminTeacher>) {
    return this.request<{ teacher: AdminTeacher }>(`/teachers/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  async deleteTeacher(id: string) {
    return this.request<{ success: boolean; message: string }>(`/teachers/${id}`, {
      method: 'DELETE',
    });
  }
}

export const api = new ApiClient();
