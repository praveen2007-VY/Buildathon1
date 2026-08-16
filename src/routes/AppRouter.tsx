import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import { PublicLayout } from '../layouts/PublicLayout';
import { StudentLayout } from '../layouts/StudentLayout';
import { TeacherLayout } from '../layouts/TeacherLayout';
import { AdminLayout } from '../layouts/AdminLayout';

// Public Pages
import { Home } from '../pages/public/Home';
import { Courses } from '../pages/public/Courses';
import { CourseDetails } from '../pages/public/CourseDetails';
import { Contact } from '../pages/public/Contact';
import { Login } from '../pages/public/Login';
import { Register } from '../pages/public/Register';

// Student Pages
import { StudentDashboard } from '../pages/student/StudentDashboard';
import { MyCourses } from '../pages/student/MyCourses';
import { Assignments } from '../pages/student/Assignments';
import { Attendance } from '../pages/student/Attendance';
import { Exams } from '../pages/student/Exams';
import { Grades } from '../pages/student/Grades';
import { MyProgress } from '../pages/student/MyProgress';
import { AIRecommendations } from '../pages/student/AIRecommendations';
import { Profile } from '../pages/student/Profile';
import { Schedule } from '../pages/student/Schedule';

// Teacher Pages
import { TeacherDashboard } from '../pages/teacher/TeacherDashboard';
import { TeacherCourses } from '../pages/teacher/TeacherCourses';
import { Classes } from '../pages/teacher/Classes';
import { AttendanceManagement } from '../pages/teacher/AttendanceManagement';
import { TeacherAssignments } from '../pages/teacher/TeacherAssignments';
import { TeacherExams } from '../pages/teacher/TeacherExams';
import { TeacherGrades } from '../pages/teacher/TeacherGrades';
import { StudentPerformance } from '../pages/teacher/StudentPerformance';
import { TeacherAIInsights } from '../pages/teacher/TeacherAIInsights';
import { TeacherProfile } from '../pages/teacher/TeacherProfile';

// Admin Pages
import { AdminDashboard } from '../pages/admin/AdminDashboard';
import { AdminStudents } from '../pages/admin/AdminStudents';
import { AdminTeachers } from '../pages/admin/AdminTeachers';
import { AdminCourses } from '../pages/admin/AdminCourses';
import { AdminClasses } from '../pages/admin/AdminClasses';
import { AdminAssignments } from '../pages/admin/AdminAssignments';
import { AdminExams } from '../pages/admin/AdminExams';
import { AdminGrades } from '../pages/admin/AdminGrades';
import { ReportsAnalytics } from '../pages/admin/ReportsAnalytics';
import { AIInsights } from '../pages/admin/AIInsights';
import { SystemMonitoring } from '../pages/admin/SystemMonitoring';
import { AdminProfile } from '../pages/admin/AdminProfile';

import { ProtectedRoute } from '../components/common/ProtectedRoute';

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="courses" element={<Courses />} />
          <Route path="courses/:id" element={<CourseDetails />} />
          <Route path="contact" element={<Contact />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        {/* Student Portal Routes */}
        <Route 
          path="/student" 
          element={
            <ProtectedRoute allowedRoles={['student', 'admin']}>
              <StudentLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<StudentDashboard />} />
          <Route path="courses" element={<MyCourses />} />
          <Route path="assignments" element={<Assignments />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="exams" element={<Exams />} />
          <Route path="grades" element={<Grades />} />
          <Route path="progress" element={<MyProgress />} />
          <Route path="schedule" element={<Schedule />} />
          <Route path="ai" element={<AIRecommendations />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* Teacher Portal Routes */}
        <Route 
          path="/teacher" 
          element={
            <ProtectedRoute allowedRoles={['teacher', 'admin']}>
              <TeacherLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<TeacherDashboard />} />
          <Route path="courses" element={<TeacherCourses />} />
          <Route path="classes" element={<Classes />} />
          <Route path="attendance" element={<AttendanceManagement />} />
          <Route path="assignments" element={<TeacherAssignments />} />
          <Route path="exams" element={<TeacherExams />} />
          <Route path="grades" element={<TeacherGrades />} />
          <Route path="students" element={<StudentPerformance />} />
          <Route path="ai" element={<TeacherAIInsights />} />
          <Route path="profile" element={<TeacherProfile />} />
        </Route>

        {/* Admin Portal Routes */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="students" element={<AdminStudents />} />
          <Route path="teachers" element={<AdminTeachers />} />
          <Route path="courses" element={<AdminCourses />} />
          <Route path="classes" element={<AdminClasses />} />
          <Route path="assignments" element={<AdminAssignments />} />
          <Route path="exams" element={<AdminExams />} />
          <Route path="grades" element={<AdminGrades />} />
          <Route path="reports" element={<ReportsAnalytics />} />
          <Route path="ai" element={<AIInsights />} />
          <Route path="monitoring" element={<SystemMonitoring />} />
          <Route path="system" element={<SystemMonitoring />} />
          <Route path="profile" element={<AdminProfile />} />
        </Route>

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
