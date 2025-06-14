
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useAccessMode } from '@/contexts/AccessModeContext';
import { Skeleton } from '@/components/ui/skeleton';

interface EnhancedAuthGuardProps {
  children: React.ReactNode;
}

const EnhancedAuthGuard = ({ children }: EnhancedAuthGuardProps) => {
  const { user, currentTenant, isLoading } = useAuth();
  const { isPublicMode, isDemoMode } = useAccessMode();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('EnhancedAuthGuard - Access mode:', { isPublicMode, isDemoMode });
    console.log('EnhancedAuthGuard - Auth state:', { user: !!user, currentTenant: !!currentTenant, isLoading });
    
    // In public mode, always allow access immediately
    if (isPublicMode) {
      console.log('Public mode - allowing access');
      return;
    }
    
    // In demo mode, check if we have proper auth state
    if (isDemoMode && !isLoading) {
      if (!user || !currentTenant) {
        console.log('Demo mode but no user/tenant - redirecting to marketplace');
        navigate('/');
        return;
      }
    }
    
    // Only redirect to login in demo mode when user is not authenticated after loading
    if (!isLoading && !user && isDemoMode) {
      console.log('Demo mode, not loading, no user - redirecting to login');
      navigate('/login');
    }
  }, [user, currentTenant, isLoading, navigate, isPublicMode, isDemoMode]);

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
  if (!user && isDemoMode) {
    return null;
  }

  return <>{children}</>;
};

export default EnhancedAuthGuard;
