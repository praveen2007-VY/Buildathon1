import React from 'react';
import { NavLink } from 'react-router-dom';
import { Search, Bell, BookOpenCheck, HelpCircle, Menu } from 'lucide-react';
import { currentUserTeacher } from '../../data/mockData';

interface TeacherHeaderProps {
  onToggleMobileMenu?: () => void;
}

export const TeacherHeader: React.FC<TeacherHeaderProps> = ({ onToggleMobileMenu }) => {
  return (
    <header className="flex justify-between items-center h-16 px-lg bg-surface/80 backdrop-blur-md sticky top-0 z-30 w-full shadow-sm border-b border-outline-variant/50">
      {/* Mobile Menu & Search */}
      <div className="flex-1 flex items-center gap-md">
        <button 
          onClick={onToggleMobileMenu}
          className="md:hidden text-on-surface-variant hover:text-primary transition-colors p-xs"
          aria-label="Open Navigation"
        >
          <Menu className="w-6 h-6" />
        </button>

        <div className="relative w-64 hidden md:block">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
          <input 
            type="text"
            placeholder="Search students, courses..."
            className="w-full pl-10 pr-4 py-2 bg-surface-container-low border border-outline-variant rounded-full font-body text-[14px] leading-[20px] text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
          />
        </div>
      </div>

      {/* Role Switcher Pill */}
      <div className="hidden lg:flex items-center bg-surface-container p-1 rounded-full gap-1 border border-outline-variant/30 ml-md">
        <NavLink 
          to="/student"
          className={({ isActive }) => `px-3 py-1 rounded-full font-label text-[11px] font-bold transition-all ${isActive ? 'bg-primary text-on-primary shadow-xs' : 'text-on-surface-variant hover:text-on-surface'}`}
        >
          Student
        </NavLink>
        <NavLink 
          to="/teacher"
          className={({ isActive }) => `px-3 py-1 rounded-full font-label text-[11px] font-bold transition-all ${isActive ? 'bg-primary text-on-primary shadow-xs' : 'text-on-surface-variant hover:text-on-surface'}`}
        >
          Teacher
        </NavLink>
        <NavLink 
          to="/admin"
          className={({ isActive }) => `px-3 py-1 rounded-full font-label text-[11px] font-bold transition-all ${isActive ? 'bg-primary text-on-primary shadow-xs' : 'text-on-surface-variant hover:text-on-surface'}`}
        >
          Admin
        </NavLink>
      </div>

      {/* Actions & Avatar */}
      <div className="flex items-center gap-md ml-auto">
        <button 
          className="text-on-surface-variant hover:text-primary transition-all duration-200 cursor-pointer relative p-1.5 rounded-full hover:bg-surface-container-low"
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full" />
        </button>

        <NavLink to="/teacher/profile" className="w-8 h-8 rounded-full overflow-hidden border border-outline-variant ml-sm cursor-pointer shrink-0">
          <img 
            src={currentUserTeacher.avatar} 
            alt={currentUserTeacher.name}
            className="w-full h-full object-cover" 
          />
        </NavLink>
      </div>
    </header>
  );
};
