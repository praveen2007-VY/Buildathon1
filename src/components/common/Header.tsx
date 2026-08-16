import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Search, Bell, Menu, LogOut, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface HeaderProps {
  onToggleMobileMenu?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onToggleMobileMenu }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-lg py-sm w-full border-b border-outline-variant/30 backdrop-blur-md bg-surface/80 shadow-sm">
      {/* Mobile Menu & Branding */}
      <div className="flex items-center gap-md lg:hidden">
        <button 
          onClick={onToggleMobileMenu}
          className="p-xs text-on-surface-variant hover:text-on-surface focus:outline-none"
          aria-label="Open Mobile Navigation"
        >
          <Menu className="w-6 h-6" />
        </button>
        <div className="font-headline text-[24px] leading-[32px] font-bold text-primary">EduAI</div>
      </div>

      {/* Search Input */}
      <div className="hidden md:flex items-center bg-surface-container-lowest border border-outline-variant rounded-full px-md py-xs flex-1 max-w-md focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all">
        <Search className="w-4 h-4 text-outline mr-sm" />
        <input 
          type="text"
          placeholder="Search courses, assignments..."
          className="bg-transparent border-none focus:ring-0 outline-none w-full font-body text-[14px] leading-[20px] text-on-surface placeholder:text-outline"
        />
      </div>

      {/* Role Pill */}
      {user?.role === 'admin' ? (
        <div className="hidden lg:flex items-center bg-surface-container p-1 rounded-full gap-1 border border-outline-variant/30 ml-md">
          <NavLink 
            to="/student"
            className={({ isActive }) => `px-3 py-1 rounded-full font-label text-[11px] font-bold transition-all ${isActive ? 'bg-primary text-on-primary shadow-xs' : 'text-on-surface-variant hover:text-on-surface'}`}
          >
            Student View
          </NavLink>
          <NavLink 
            to="/teacher"
            className={({ isActive }) => `px-3 py-1 rounded-full font-label text-[11px] font-bold transition-all ${isActive ? 'bg-primary text-on-primary shadow-xs' : 'text-on-surface-variant hover:text-on-surface'}`}
          >
            Teacher View
          </NavLink>
          <NavLink 
            to="/admin"
            className={({ isActive }) => `px-3 py-1 rounded-full font-label text-[11px] font-bold transition-all ${isActive ? 'bg-primary text-on-primary shadow-xs' : 'text-on-surface-variant hover:text-on-surface'}`}
          >
            Admin Panel
          </NavLink>
        </div>
      ) : (
        <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary border border-primary/20 rounded-full font-label text-[12px] font-bold ml-md">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Student Account</span>
        </div>
      )}

      {/* Actions & Profile */}
      <div className="flex items-center gap-md ml-auto">
        <button 
          className="p-sm text-on-surface-variant hover:bg-surface-container-low rounded-full transition-colors relative"
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full" />
        </button>

        <NavLink to="/student/profile" className="flex items-center gap-sm cursor-pointer pl-xs">
          <img 
            src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'} 
            alt={user?.name || 'Student'} 
            className="w-8 h-8 rounded-full object-cover border border-outline-variant/50"
          />
        </NavLink>

        <button 
          onClick={handleLogout}
          title="Sign Out"
          className="p-1.5 text-on-surface-variant hover:text-error hover:bg-surface-container-low rounded-full transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
