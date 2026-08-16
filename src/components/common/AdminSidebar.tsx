import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  UserCheck, 
  BookOpen, 
  School, 
  FileText, 
  HelpCircle, 
  Award, 
  BarChart3, 
  Sparkles, 
  Activity,
  User as UserIcon,
  LogOut
} from 'lucide-react';
import { currentUserAdmin } from '../../data/mockData';

interface AdminSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ isOpen = true, onClose }) => {
  const adminNavItems = [
    { label: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { label: 'Students', path: '/admin/students', icon: Users },
    { label: 'Teachers', path: '/admin/teachers', icon: UserCheck },
    { label: 'Courses', path: '/admin/courses', icon: BookOpen },
    { label: 'Classes', path: '/admin/classes', icon: School },
    { label: 'Assignments', path: '/admin/assignments', icon: FileText },
    { label: 'Exams', path: '/admin/exams', icon: HelpCircle },
    { label: 'Grades', path: '/admin/grades', icon: Award },
    { label: 'Reports & Analytics', path: '/admin/reports', icon: BarChart3 },
  ];

  const intelligenceNavItems = [
    { label: 'AI Insights', path: '/admin/ai', icon: Sparkles, isAI: true },
    { label: 'System Monitoring', path: '/admin/system', icon: Activity },
    { label: 'Profile Settings', path: '/admin/profile', icon: UserIcon },
  ];

  return (
    <aside 
      className={`
        w-[280px] h-full fixed left-0 top-0 bg-surface border-r border-outline-variant shadow-sm flex flex-col py-md px-md overflow-y-auto transition-transform duration-300 z-40
        ${isOpen ? 'flex translate-x-0' : 'hidden md:flex -translate-x-full md:translate-x-0'}
      `}
    >
      {/* Brand Header */}
      <div className="mb-lg px-sm">
        <h1 className="font-headline text-[24px] leading-[32px] font-bold text-primary">EduAI</h1>
        <p className="font-label text-[12px] leading-[16px] text-on-surface-variant uppercase mt-1 tracking-wider font-semibold">
          Admin Portal
        </p>
      </div>

      {/* Main Nav Items */}
      <ul className="flex-1 space-y-2">
        {adminNavItems.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              end={item.path === '/admin'}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-150 text-[14px] leading-[20px] ${
                  isActive
                    ? 'text-primary font-bold bg-primary-container/10 scale-[0.98]'
                    : 'text-on-surface-variant hover:bg-surface-container-high'
                }`
              }
            >
              <item.icon className="w-5 h-5 shrink-0" />
              <span>{item.label}</span>
            </NavLink>
          </li>
        ))}

        {/* Intelligence Section Header */}
        <li className="mt-4 mb-2 px-3">
          <span className="font-label text-[12px] leading-[16px] text-outline uppercase tracking-wider font-semibold">
            Intelligence & System
          </span>
        </li>

        {intelligenceNavItems.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-150 text-[14px] leading-[20px] ${
                  isActive
                    ? 'text-secondary font-bold bg-secondary-container/10 scale-[0.98]'
                    : item.isAI
                    ? 'text-secondary hover:bg-surface-container-high font-medium'
                    : 'text-on-surface-variant hover:bg-surface-container-high'
                }`
              }
            >
              <item.icon className={`w-5 h-5 shrink-0 ${item.isAI ? 'text-secondary' : ''}`} />
              <span>{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>

      {/* User Profile Footer */}
      <div className="mt-auto pt-lg border-t border-outline-variant flex items-center justify-between px-3">
        <NavLink to="/admin/profile" className="flex items-center gap-3 overflow-hidden">
          <div className="w-9 h-9 rounded-full bg-surface-container-high overflow-hidden shrink-0">
            <img 
              src={currentUserAdmin.avatar} 
              alt={currentUserAdmin.name}
              className="w-full h-full object-cover" 
            />
          </div>
          <div className="min-w-0">
            <p className="font-body text-[13px] font-medium text-on-surface truncate">
              {currentUserAdmin.name}
            </p>
            <p className="font-label text-[11px] text-on-surface-variant truncate">
              Super Admin
            </p>
          </div>
        </NavLink>
        <NavLink to="/login" title="Logout" className="text-on-surface-variant hover:text-on-surface p-1">
          <LogOut className="w-4 h-4" />
        </NavLink>
      </div>
    </aside>
  );
};
