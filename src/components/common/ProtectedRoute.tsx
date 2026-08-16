import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-primary">
        <Loader2 className="w-10 h-10 animate-spin mb-4" />
        <p className="font-body text-[14px] text-on-surface-variant font-medium">
          Verifying your session permissions...
        </p>
      </div>
    );
  }

  // Check authentication
  if (!isAuthenticated || !user) {
    return (
      <Navigate 
        to={`/login?redirect=${encodeURIComponent(location.pathname)}`} 
        replace 
        state={{ message: 'Authentication required. Please sign in to access this portal.' }} 
      />
    );
  }

  // Check role authorization
  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    // Redirect to user's authorized dashboard with an error message
    const defaultPath = user.role === 'teacher' ? '/teacher' : user.role === 'admin' ? '/admin' : '/student';
    return (
      <Navigate 
        to={defaultPath} 
        replace 
        state={{ 
          accessError: `Access Denied: Your account role (${user.role}) is not authorized to access ${location.pathname}.` 
        }} 
      />
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
