import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';

export const Register: React.FC = () => {
  const [role, setRole] = useState<'student' | 'teacher'>('student');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === 'student') {
      navigate('/student');
    } else {
      navigate('/teacher');
    }
  };

  return (
    <div className="min-h-[calc(100vh-140px)] flex items-center justify-center relative overflow-hidden font-sans p-margin-mobile md:p-margin-desktop py-xl">
      {/* Ambient Background Gradients */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[60vw] h-[60vw] rounded-full bg-primary/10 blur-[100px] opacity-70" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[50vw] h-[50vw] rounded-full bg-secondary-container/10 blur-[100px] opacity-70" />
      </div>

      <div className="w-full max-w-[480px] z-10">
        <div className="text-center mb-lg">
          <h1 className="font-display text-[40px] leading-[48px] font-bold text-primary tracking-tight">
            Join EduAI
          </h1>
          <p className="font-body text-[14px] text-on-surface-variant mt-xs">
            Create your account to access AI academic tools
          </p>
        </div>

        <div className="glass-panel rounded-xl shadow-floating p-lg md:p-xl flex flex-col gap-lg">
          {/* Role Switcher */}
          <div className="flex p-[4px] bg-surface-container rounded-lg gap-[4px]">
            <button
              type="button"
              onClick={() => setRole('student')}
              className={`flex-1 py-sm font-label text-[12px] rounded transition-all font-semibold cursor-pointer ${
                role === 'student'
                  ? 'text-primary bg-surface-container-lowest shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Student Account
            </button>
            <button
              type="button"
              onClick={() => setRole('teacher')}
              className={`flex-1 py-sm font-label text-[12px] rounded transition-all font-semibold cursor-pointer ${
                role === 'teacher'
                  ? 'text-primary bg-surface-container-lowest shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Teacher Account
            </button>
          </div>

          <form onSubmit={handleRegister} className="flex flex-col gap-md">
            {/* Full Name */}
            <div className="flex flex-col gap-xs">
              <label className="font-label text-[12px] text-on-surface font-medium" htmlFor="name">
                Full Name
              </label>
              <div className="relative flex items-center">
                <User className="w-4 h-4 absolute left-3 text-outline-variant" />
                <input
                  id="name"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Alex Rivera"
                  required
                  className="w-full pl-10 pr-sm py-[10px] border border-outline-variant/60 rounded-lg font-body text-[14px] bg-surface-container-lowest focus:border-primary outline-none text-on-surface"
                />
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-xs">
              <label className="font-label text-[12px] text-on-surface font-medium" htmlFor="email">
                Institutional Email
              </label>
              <div className="relative flex items-center">
                <Mail className="w-4 h-4 absolute left-3 text-outline-variant" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@eduai.edu"
                  required
                  className="w-full pl-10 pr-sm py-[10px] border border-outline-variant/60 rounded-lg font-body text-[14px] bg-surface-container-lowest focus:border-primary outline-none text-on-surface"
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-xs">
              <label className="font-label text-[12px] text-on-surface font-medium" htmlFor="password">
                Password
              </label>
              <div className="relative flex items-center">
                <Lock className="w-4 h-4 absolute left-3 text-outline-variant" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-10 py-[10px] border border-outline-variant/60 rounded-lg font-body text-[14px] bg-surface-container-lowest focus:border-primary outline-none text-on-surface"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-outline-variant hover:text-on-surface"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col gap-xs">
              <label className="font-label text-[12px] text-on-surface font-medium" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <div className="relative flex items-center">
                <Lock className="w-4 h-4 absolute left-3 text-outline-variant" />
                <input
                  id="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-sm py-[10px] border border-outline-variant/60 rounded-lg font-body text-[14px] bg-surface-container-lowest focus:border-primary outline-none text-on-surface"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-primary text-on-primary font-label text-[14px] font-semibold py-[12px] rounded-lg mt-sm hover:bg-primary/90 transition-all shadow-sm flex justify-center items-center gap-xs cursor-pointer"
            >
              <span>Create {role === 'student' ? 'Student' : 'Teacher'} Account</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </button>
          </form>
        </div>

        <div className="text-center mt-lg">
          <p className="font-body text-[14px] text-on-surface-variant">
            Already registered?{' '}
            <NavLink to="/login" className="text-primary font-semibold hover:underline">
              Sign In
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};
