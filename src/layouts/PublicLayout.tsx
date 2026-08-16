import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Menu, X, ArrowRight, LayoutDashboard, LogOut, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const PublicLayout: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Contact', path: '/contact' },
  ];

  const getDashboardPath = () => {
    if (!user) return '/login';
    if (user.role === 'teacher') return '/teacher';
    if (user.role === 'admin') return '/admin';
    return '/student';
  };

  return (
    <div className="bg-background text-on-background font-sans min-h-screen flex flex-col antialiased overflow-x-hidden">
      {/* Top Navigation Bar */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-lg py-sm w-full border-b border-outline-variant/30 backdrop-blur-md bg-surface/80 shadow-sm transition-all duration-300">
        <div className="flex items-center gap-md">
          <NavLink to="/" className="text-title-md font-display text-[24px] text-primary tracking-tight font-bold">
            EduAI
          </NavLink>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-lg">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === '/'}
              className={({ isActive }) =>
                `font-body text-[14px] leading-[20px] px-2 py-1 transition-colors ${
                  isActive
                    ? 'text-primary font-bold border-b-2 border-primary'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low rounded'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-sm">
          {isAuthenticated && user ? (
            <div className="flex items-center gap-sm">
              <button 
                onClick={() => navigate(getDashboardPath())}
                className="px-md py-sm bg-primary text-on-primary font-label text-[12px] leading-[16px] font-semibold rounded-lg hover:opacity-90 transition-opacity cursor-pointer shadow-xs flex items-center gap-1.5"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>{user.role.charAt(0).toUpperCase() + user.role.slice(1)} Portal</span>
              </button>
              <button 
                onClick={logout}
                title="Sign Out"
                className="p-2 text-on-surface-variant hover:text-error hover:bg-surface-container-low rounded-lg transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <>
              <button 
                onClick={() => navigate('/login')}
                className="px-md py-sm text-on-surface-variant font-label text-[12px] leading-[16px] font-medium hover:bg-surface-container-low rounded-lg transition-colors cursor-pointer"
              >
                Login
              </button>
              <button 
                onClick={() => navigate('/register')}
                className="px-md py-sm bg-primary text-on-primary font-label text-[12px] leading-[16px] font-semibold rounded-lg hover:opacity-90 transition-opacity cursor-pointer shadow-xs"
              >
                Register
              </button>
            </>
          )}
          
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-on-surface-variant p-2 hover:bg-surface-container-low rounded-lg"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden sticky top-[57px] z-40 bg-surface border-b border-outline-variant/30 p-md flex flex-col gap-sm shadow-md animate-fadeIn">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === '/'}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `px-md py-sm rounded-lg font-body text-[15px] font-medium transition-colors ${
                  isActive
                    ? 'bg-primary-container text-on-primary-container font-semibold'
                    : 'text-on-surface-variant hover:bg-surface-container-high'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <div className="pt-sm border-t border-outline-variant/30 flex gap-sm mt-xs">
            {isAuthenticated && user ? (
              <>
                <button 
                  onClick={() => { setMobileMenuOpen(false); navigate(getDashboardPath()); }}
                  className="flex-1 py-sm bg-primary text-on-primary font-label text-[12px] font-semibold rounded-lg"
                >
                  Go to {user.role} Dashboard
                </button>
                <button 
                  onClick={() => { setMobileMenuOpen(false); logout(); }}
                  className="px-4 py-sm bg-surface-container-low text-error font-label text-[12px] font-semibold rounded-lg"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={() => { setMobileMenuOpen(false); navigate('/login'); }}
                  className="flex-1 py-sm bg-surface-container-low text-on-surface font-label text-[12px] font-semibold rounded-lg"
                >
                  Login
                </button>
                <button 
                  onClick={() => { setMobileMenuOpen(false); navigate('/register'); }}
                  className="flex-1 py-sm bg-primary text-on-primary font-label text-[12px] font-semibold rounded-lg"
                >
                  Register
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Main Content Viewport */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Shared Footer */}
      <footer className="w-full py-xl px-lg mt-auto flex flex-col md:flex-row justify-between items-center gap-md bg-surface-container-lowest border-t border-outline-variant/30">
        <div className="flex flex-col items-center md:items-start gap-1">
          <span className="font-headline text-[24px] text-on-surface font-bold">EduAI</span>
          <p className="font-body text-[14px] text-secondary">© 2024 EduAI Management Systems. All rights reserved.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-lg">
          <a href="#" className="font-label text-[12px] text-on-surface-variant hover:text-primary transition-all">Privacy Policy</a>
          <a href="#" className="font-label text-[12px] text-on-surface-variant hover:text-primary transition-all">Terms of Service</a>
          <a href="#" className="font-label text-[12px] text-on-surface-variant hover:text-primary transition-all">Accessibility</a>
          <NavLink to="/contact" className="font-label text-[12px] text-on-surface-variant hover:text-primary transition-all">Contact Support</NavLink>
        </div>
      </footer>
    </div>
  );
};
