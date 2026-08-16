import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { api } from '../services/api';

interface AuthContextType {
  user: User | null;
  token: string | null;
  role: UserRole | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password?: string, role?: UserRole) => Promise<User>;
  register: (name: string, email: string, password?: string, role?: UserRole) => Promise<User>;
  logout: () => void;
  switchRole: (role: UserRole) => Promise<void>;
  updateUser: (updates: Partial<User>) => Promise<void>;
  isAuthorized: (allowedRoles: UserRole[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('eduai_token'));
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('eduai_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    return null;
  });
  const [isLoading, setIsLoading] = useState(true);

  // Validate session against backend on mount
  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = localStorage.getItem('eduai_token');
      if (storedToken) {
        try {
          const res = await api.getCurrentUser();
          if (res.user) {
            setUser(res.user);
            localStorage.setItem('eduai_user', JSON.stringify(res.user));
          } else {
            // Token invalid
            logout();
          }
        } catch (e) {
          // If offline but token and user cached, keep session; otherwise clear
          const savedUser = localStorage.getItem('eduai_user');
          if (!savedUser) {
            logout();
          }
        }
      } else {
        setUser(null);
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password?: string, role: UserRole = 'student'): Promise<User> => {
    setIsLoading(true);
    try {
      const res = await api.login({ email, password, role });
      setToken(res.token);
      setUser(res.user);
      localStorage.setItem('eduai_token', res.token);
      localStorage.setItem('eduai_user', JSON.stringify(res.user));
      return res.user;
    } catch (err: any) {
      throw new Error(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password?: string, role: UserRole = 'student'): Promise<User> => {
    setIsLoading(true);
    try {
      const res = await api.register({ name, email, password, role });
      setToken(res.token);
      setUser(res.user);
      localStorage.setItem('eduai_token', res.token);
      localStorage.setItem('eduai_user', JSON.stringify(res.user));
      return res.user;
    } catch (err: any) {
      throw new Error(err.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('eduai_token');
    localStorage.removeItem('eduai_user');
  };

  const switchRole = async (newRole: UserRole) => {
    setIsLoading(true);
    try {
      const res = await api.switchDemoRole(newRole);
      setToken(res.token);
      setUser(res.user);
      localStorage.setItem('eduai_token', res.token);
      localStorage.setItem('eduai_user', JSON.stringify(res.user));
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = async (updates: Partial<User>) => {
    try {
      const res = await api.updateProfile(updates);
      if (res.user) {
        setUser(res.user);
        localStorage.setItem('eduai_user', JSON.stringify(res.user));
      }
    } catch {
      if (user) {
        const updated = { ...user, ...updates };
        setUser(updated);
        localStorage.setItem('eduai_user', JSON.stringify(updated));
      }
    }
  };

  const isAuthorized = (allowedRoles: UserRole[]): boolean => {
    if (!user || !token) return false;
    return allowedRoles.includes(user.role);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        role: user ? user.role : null,
        isAuthenticated: !!token && !!user,
        isLoading,
        login,
        register,
        logout,
        switchRole,
        updateUser,
        isAuthorized,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
