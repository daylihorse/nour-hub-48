
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
    if (isPublicMode) {
      // In public mode, always allow access
      return;
    }
    
    if (!isLoading && !user) {
      navigate('/login');
    }
  }, [user, isLoading, navigate, isPublicMode]);

  if (!isPublicMode && isLoading) {
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

  if (!isPublicMode && !user) {
    return null;
  }

  return <>{children}</>;
};

export default EnhancedAuthGuard;
