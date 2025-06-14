
import { ReactNode } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useAccessMode } from '@/contexts/AccessModeContext';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface TenantProviderProps {
  children: ReactNode;
}

const TenantProvider = ({ children }: TenantProviderProps) => {
  const { currentTenant, isLoading } = useAuth();
  const { isPublicMode, isDemoMode, setAccessMode } = useAccessMode();
  const navigate = useNavigate();

  console.log('TenantProvider - Access mode:', { isPublicMode, isDemoMode });
  console.log('TenantProvider - Tenant state:', { currentTenant: !!currentTenant, isLoading });

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

  if (!currentTenant) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Alert className="max-w-md">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription className="space-y-4">
            <p>No tenant selected. Please select an access mode to continue.</p>
            <div className="flex gap-2">
              <Button 
                onClick={() => {
                  setAccessMode('public');
                  window.location.reload();
                }}
                size="sm"
              >
                Public Mode
              </Button>
              <Button 
                onClick={() => {
                  setAccessMode('demo');
                  navigate('/');
                }}
                variant="outline"
                size="sm"
              >
                Demo Mode
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return <>{children}</>;
};

export default TenantProvider;
