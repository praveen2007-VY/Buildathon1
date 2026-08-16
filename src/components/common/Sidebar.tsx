import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  GraduationCap, 
  FileText, 
  UserCheck,
  HelpCircle,
  Award, 
  TrendingUp,
  Calendar, 
  Sparkles, 
  User as UserIcon,
  LogOut, 
  LifeBuoy 
} from 'lucide-react';

interface SidebarProps {
  role?: 'student' | 'teacher' | 'admin';
  isOpen?: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ role = 'student', isOpen = true, onClose }) => {
  const studentNavItems = [
    { label: 'Dashboard', path: '/student', icon: LayoutDashboard },
    { label: 'My Courses', path: '/student/courses', icon: GraduationCap },
    { label: 'Assignments', path: '/student/assignments', icon: FileText },
    { label: 'Attendance', path: '/student/attendance', icon: UserCheck },
    { label: 'Exams', path: '/student/exams', icon: HelpCircle },
    { label: 'Grades', path: '/student/grades', icon: Award },
    { label: 'My Progress', path: '/student/progress', icon: TrendingUp },
    { label: 'Schedule', path: '/student/schedule', icon: Calendar },
    { label: 'AI Analytics', path: '/student/ai', icon: Sparkles },
    { label: 'Profile', path: '/student/profile', icon: UserIcon },
  ];

  return (
    <aside 
      className={`
        fixed left-0 top-0 z-40 h-screen w-[280px] flex-col p-md bg-surface border-r border-outline-variant/20 shadow-md transition-transform duration-300 overflow-y-auto
        ${isOpen ? 'flex translate-x-0' : 'hidden lg:flex -translate-x-full lg:translate-x-0'}
      `}
    >
      {/* Brand Header */}
      <div className="mb-lg px-sm">
        <h1 className="font-headline text-[24px] leading-[32px] font-bold text-primary">EduAI</h1>
        <p className="font-label text-[12px] leading-[16px] text-on-surface-variant font-medium">
          Student Portal
        </p>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 flex flex-col gap-xs">
        <ul className="flex flex-col gap-xs">
          {studentNavItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                end={item.path === '/student'}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-md px-md py-sm rounded-lg font-medium text-[14px] leading-[20px] transition-all duration-150 ${
                    isActive
                      ? 'bg-primary-container text-on-primary-container font-semibold translate-x-1 shadow-sm'
                      : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
                  }`
                }
              >
                <item.icon className="w-5 h-5 shrink-0" />
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom Section */}
      <div className="mt-auto border-t border-outline-variant/30 pt-md">
        <ul className="flex flex-col gap-sm">
          <li>
            <NavLink
              to="/login"
              onClick={onClose}
              className="flex items-center gap-md text-on-surface-variant px-md py-sm hover:text-on-surface hover:bg-surface-container-high rounded-lg transition-all text-[14px]"
            >
              <LogOut className="w-5 h-5 shrink-0" />
              <span className="font-label text-[12px]">Logout</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </aside>
  );
};
