import React from 'react';
import { NavLink } from 'react-router-dom';
import { Search, Bell, Menu } from 'lucide-react';
import { currentUserAdmin } from '../../data/mockData';

interface AdminHeaderProps {
  onToggleMobileMenu?: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ onToggleMobileMenu }) => {
  return (
    <header className="bg-surface/80 backdrop-blur-md top-0 sticky z-30 border-b border-outline-variant shadow-sm flex justify-between items-center w-full h-16 px-lg transition-colors">
      {/* Mobile Menu Button & Brand */}
      <div className="flex items-center gap-4 md:hidden">
        <button 
          onClick={onToggleMobileMenu}
          className="text-on-surface-variant hover:text-primary transition-colors p-xs"
          aria-label="Open Admin Menu"
        >
          <Menu className="w-6 h-6" />
        </button>
        <span className="font-headline text-[24px] font-bold text-primary">EduAI</span>
      </div>

      {/* Search Bar */}
      <div className="hidden md:flex flex-1 max-w-md items-center">
        <div className="relative w-full">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant" />
          <input 
            type="text"
            placeholder="Search students, courses, or reports..."
            className="w-full bg-surface-container-lowest border border-outline-variant rounded-full py-2 pl-10 pr-4 text-[14px] leading-[20px] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-shadow placeholder:text-outline-variant text-on-surface"
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

      {/* Actions */}
      <div className="flex items-center gap-4 ml-auto">
        <button 
          className="text-on-surface-variant hover:text-primary transition-colors relative p-1.5 rounded-full hover:bg-surface-container-low"
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full" />
        </button>

        <NavLink to="/admin/profile" className="w-8 h-8 rounded-full bg-surface-container-high overflow-hidden shrink-0 ml-2 cursor-pointer">
          <img 
            src={currentUserAdmin.avatar} 
            alt={currentUserAdmin.name}
            className="w-full h-full object-cover" 
          />
        </NavLink>
      </div>
    </header>
  );
};
