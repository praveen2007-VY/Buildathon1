import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { UserRole } from '../../types';

export const Login: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Frontend mock redirect based on role
    if (selectedRole === 'student') {
      navigate('/student');
    } else if (selectedRole === 'teacher') {
      navigate('/teacher');
    } else if (selectedRole === 'admin') {
      navigate('/admin');
    }
  };

  return (
    <div className="min-h-[calc(100vh-140px)] flex items-center justify-center relative overflow-hidden font-sans p-margin-mobile md:p-margin-desktop py-xl">
      {/* Ambient Background Gradients */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[60vw] h-[60vw] rounded-full bg-primary/10 blur-[100px] opacity-70" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[50vw] h-[50vw] rounded-full bg-secondary-container/10 blur-[100px] opacity-70" />
      </div>

      {/* Login Card Container */}
      <div className="w-full max-w-[440px] z-10">
        {/* Logo Area */}
        <div className="text-center mb-lg">
          <h1 className="font-display text-[48px] leading-[60px] font-bold text-primary tracking-tight">
            EduAI
          </h1>
          <p className="font-body text-[14px] leading-[20px] text-on-surface-variant mt-xs">
            Intelligent Academic Management
          </p>
        </div>

        {/* Main Card */}
        <div className="glass-panel rounded-xl shadow-floating p-lg md:p-xl flex flex-col gap-lg">
          {/* Role Selection Tabs */}
          <div className="flex p-[4px] bg-surface-container rounded-lg gap-[4px]">
            <button
              type="button"
              onClick={() => setSelectedRole('student')}
              className={`flex-1 py-sm font-label text-[12px] leading-[16px] rounded transition-all font-semibold cursor-pointer ${
                selectedRole === 'student'
                  ? 'text-primary bg-surface-container-lowest shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
              }`}
            >
              Student
            </button>
            <button
              type="button"
              onClick={() => setSelectedRole('teacher')}
              className={`flex-1 py-sm font-label text-[12px] leading-[16px] rounded transition-all font-semibold cursor-pointer ${
                selectedRole === 'teacher'
                  ? 'text-primary bg-surface-container-lowest shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
              }`}
            >
              Teacher
            </button>
            <button
              type="button"
              onClick={() => setSelectedRole('admin')}
              className={`flex-1 py-sm font-label text-[12px] leading-[16px] rounded transition-all font-semibold cursor-pointer ${
                selectedRole === 'admin'
                  ? 'text-primary bg-surface-container-lowest shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
              }`}
            >
              Admin
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="flex flex-col gap-md">
            {/* Email Input */}
            <div className="flex flex-col gap-xs">
              <label className="font-label text-[12px] text-on-surface font-medium" htmlFor="email">
                Email Address
              </label>
              <div className="relative flex items-center">
                <Mail className="w-4 h-4 absolute left-3 text-outline-variant" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={
                    selectedRole === 'student'
                      ? 'alex.rivera@eduai.edu'
                      : selectedRole === 'teacher'
                      ? 'henderson@eduai.edu'
                      : 's.jenkins@eduai.edu'
                  }
                  required
                  className="w-full pl-10 pr-sm py-[10px] border border-outline-variant/60 rounded-lg font-body text-[14px] leading-[20px] bg-surface-container-lowest focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-outline-variant text-on-surface"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="flex flex-col gap-xs">
              <label className="font-label text-[12px] text-on-surface font-medium" htmlFor="password">
                Password
              </label>
              <div className="relative flex items-center">
                <Lock className="w-4 h-4 absolute left-3 text-outline-variant" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-sm py-[10px] border border-outline-variant/60 rounded-lg font-body text-[14px] leading-[20px] bg-surface-container-lowest focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-outline-variant text-on-surface"
                />
              </div>
            </div>

            {/* Options Row */}
            <div className="flex items-center justify-between mt-[4px]">
              <label className="flex items-center gap-xs cursor-pointer group">
                <input 
                  type="checkbox"
                  defaultChecked
                  className="rounded border-outline-variant text-primary focus:ring-primary w-4 h-4 cursor-pointer"
                />
                <span className="font-body text-[13px] text-on-surface-variant group-hover:text-on-surface transition-colors">
                  Remember me
                </span>
              </label>
              <a href="#" className="font-label text-[13px] text-primary hover:underline">
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-primary text-on-primary font-label text-[14px] leading-[20px] font-semibold py-[12px] rounded-lg mt-sm hover:bg-primary/90 transition-all shadow-sm active:scale-[0.98] flex justify-center items-center gap-xs cursor-pointer"
            >
              <span>Sign In as {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </button>
          </form>
        </div>

        {/* Footer Link */}
        <div className="text-center mt-lg">
          <p className="font-body text-[14px] text-on-surface-variant">
            Don't have an account?{' '}
            <NavLink to="/register" className="text-primary font-semibold hover:underline">
              Register
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};
