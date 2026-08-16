import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  UserCheck, 
  FileText, 
  HelpCircle, 
  Award,
  BarChart3, 
  Sparkles, 
  User as UserIcon, 
  Settings, 
  LogOut 
} from 'lucide-react';

interface TeacherSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const TeacherSidebar: React.FC<TeacherSidebarProps> = ({ isOpen = true, onClose }) => {
  const teacherNavItems = [
    { label: 'Dashboard', path: '/teacher', icon: LayoutDashboard },
    { label: 'My Courses', path: '/teacher/courses', icon: BookOpen },
    { label: 'Classes', path: '/teacher/classes', icon: Users },
    { label: 'Attendance', path: '/teacher/attendance', icon: UserCheck },
    { label: 'Assignments', path: '/teacher/assignments', icon: FileText },
    { label: 'Exams', path: '/teacher/exams', icon: HelpCircle },
    { label: 'Grades', path: '/teacher/grades', icon: Award },
    { label: 'AI Insights', path: '/teacher/ai', icon: Sparkles, isAI: true },
    { label: 'Profile', path: '/teacher/profile', icon: UserIcon },
  ];

  return (
    <aside 
      className={`
        fixed left-0 top-0 z-40 h-screen w-[280px] flex-col p-lg bg-surface-container-lowest border-r border-outline-variant shadow-sm transition-transform duration-300 overflow-y-auto
        ${isOpen ? 'flex translate-x-0' : 'hidden md:flex -translate-x-full md:translate-x-0'}
      `}
    >
      {/* Brand Header */}
      <div className="flex items-center gap-md mb-xl">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold shadow-sm shrink-0">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <h1 className="font-headline text-[24px] leading-[32px] font-bold text-primary">EduAI</h1>
          <p className="font-label text-[12px] leading-[16px] text-on-surface-variant font-medium">
            Teacher Dashboard
          </p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-sm">
        {teacherNavItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/teacher'}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-md px-md py-sm rounded-lg font-medium text-[14px] leading-[20px] transition-all duration-150 ${
                isActive
                  ? 'bg-primary-container text-on-primary-container font-semibold opacity-90 shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
              }`
            }
          >
            <item.icon className={`w-5 h-5 shrink-0 ${item.isAI ? 'text-secondary' : ''}`} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="mt-auto space-y-sm pt-md border-t border-outline-variant">
        <NavLink
          to="/login"
          onClick={onClose}
          className="flex items-center gap-md px-md py-sm text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors duration-200 rounded-lg text-[14px]"
        >
          <LogOut className="w-5 h-5 shrink-0" />
          <span>Logout</span>
        </NavLink>
      </div>
    </aside>
  );
};
