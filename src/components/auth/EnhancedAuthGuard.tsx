
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useAccessMode } from '@/contexts/AccessModeContext';
import { Skeleton } from '@/components/ui/skeleton';

interface EnhancedAuthGuardProps {
  children: React.ReactNode;
}

const EnhancedAuthGuard = ({ children }: EnhancedAuthGuardProps) => {
  const { user, isLoading } = useAuth();
  const { isPublicMode } = useAccessMode();
  const navigate = useNavigate();

  useEffect(() => {
    // In public mode, always allow access immediately
    if (isPublicMode) {
      return;
    }
    
    // Only redirect to login in demo mode when user is not authenticated
    if (!isLoading && !user) {
      navigate('/login');
    }
  }, [user, isLoading, navigate, isPublicMode]);

  // In public mode, render children immediately without any loading states
  if (isPublicMode) {
    return <>{children}</>;
  }

  // In demo mode, show loading state while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="space-y-4 w-full max-w-md">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-8 w-1/2" />
        </div>
      </div>
    );
  }

  // In demo mode, don't render anything if no user (will redirect to login)
  if (!user) {
    return null;
  }

  return <>{children}</>;
};

export default EnhancedAuthGuard;
