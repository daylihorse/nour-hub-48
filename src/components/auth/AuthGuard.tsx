import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useAccessMode } from '@/contexts/AccessModeContext';

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const { isAuthenticated, isLoading } = useAuth();
  const { accessMode } = useAccessMode();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // In demo mode, always allow access
    if (accessMode === 'demo') {
      return;
    }

    // If still loading, don't redirect
    if (isLoading) {
      return;
    }

    // If not authenticated and not on login page, redirect to login
    if (!isAuthenticated && location.pathname !== '/login') {
      navigate('/login', { replace: true });
    }

    // If authenticated and on login page, redirect to dashboard
    if (isAuthenticated && location.pathname === '/login') {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate, location.pathname, accessMode]);

  // Show loading while checking auth
  if (isLoading && accessMode !== 'demo') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // In demo mode or authenticated, show children
  if (accessMode === 'demo' || isAuthenticated) {
    return <>{children}</>;
  }

  // If on login page and not authenticated, show children (login form)
  if (location.pathname === '/login') {
    return <>{children}</>;
  }

  // Otherwise, show loading (redirect will happen via useEffect)
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
    </div>
  );
};

export default AuthGuard;
