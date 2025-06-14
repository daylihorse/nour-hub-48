
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
  const { accessMode } = useAccessMode();
  const navigate = useNavigate();

  console.log('EnhancedAuthGuard: Guard check', {
    user: user?.email,
    isLoading,
    accessMode
  });

  useEffect(() => {
    // In public mode, always allow access immediately
    if (accessMode === 'public') {
      console.log('EnhancedAuthGuard: Public mode - allowing access');
      return;
    }
    
    // Only redirect to login in demo mode when user is not authenticated
    if (!isLoading && !user && accessMode === 'demo') {
      console.log('EnhancedAuthGuard: Demo mode without user - redirecting to login');
      navigate('/login');
    }
  }, [user, isLoading, navigate, accessMode]);

  // In public mode, render children immediately without any loading states
  if (accessMode === 'public') {
    console.log('EnhancedAuthGuard: Rendering children in public mode');
    return <>{children}</>;
  }

  // In demo mode, show loading state while checking auth
  if (isLoading) {
    console.log('EnhancedAuthGuard: Showing loading state');
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
  if (!user && accessMode === 'demo') {
    console.log('EnhancedAuthGuard: Demo mode without user - not rendering');
    return null;
  }

  console.log('EnhancedAuthGuard: Rendering children');
  return <>{children}</>;
};

export default EnhancedAuthGuard;
