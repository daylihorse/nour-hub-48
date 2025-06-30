
import { ReactNode, useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, AlertTriangle, UserPlus, Building } from 'lucide-react';
import { AuthenticationService, AuthenticationResult } from '@/services/auth/authenticationService';
import { useNavigate } from 'react-router-dom';

interface ClientManagementGuardProps {
  children: ReactNode;
}

const ClientManagementGuard = ({ children }: ClientManagementGuardProps) => {
  const [authResult, setAuthResult] = useState<AuthenticationResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreatingDemo, setIsCreatingDemo] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthenticationStatus();
  }, []);

  const checkAuthenticationStatus = async () => {
    setIsLoading(true);
    try {
      const result = await AuthenticationService.checkAuthentication();
      setAuthResult(result);
    } catch (error) {
      console.error('Authentication check failed:', error);
      setAuthResult({
        isAuthenticated: false,
        user: null,
        tenantId: null,
        error: 'Failed to check authentication'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateDemoTenant = async () => {
    setIsCreatingDemo(true);
    try {
      const result = await AuthenticationService.createDemoTenantAssociation();
      setAuthResult(result);
      
      if (result.isAuthenticated && result.tenantId) {
        // Refresh the page to ensure all components get the updated auth state
        window.location.reload();
      }
    } catch (error) {
      console.error('Demo tenant creation failed:', error);
    } finally {
      setIsCreatingDemo(false);
    }
  };

  const handleGoToLogin = () => {
    navigate('/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Checking authentication...</span>
        </div>
      </div>
    );
  }

  if (!authResult?.isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <CardTitle>Authentication Required</CardTitle>
            <CardDescription>
              You need to be logged in to manage clients
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <AlertDescription>
                {authResult?.error || 'Please log in to continue'}
              </AlertDescription>
            </Alert>
            <Button onClick={handleGoToLogin} className="w-full">
              <UserPlus className="h-4 w-4 mr-2" />
              Go to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!authResult.tenantId) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <Building className="h-12 w-12 text-orange-500 mx-auto mb-4" />
            <CardTitle>Tenant Setup Required</CardTitle>
            <CardDescription>
              You need to be associated with a tenant organization to manage clients
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <AlertDescription>
                {authResult.error || 'No tenant associations found'}
              </AlertDescription>
            </Alert>
            <div className="space-y-2">
              <Button 
                onClick={handleCreateDemoTenant} 
                className="w-full"
                disabled={isCreatingDemo}
              >
                {isCreatingDemo ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Creating Demo Tenant...
                  </>
                ) : (
                  <>
                    <Building className="h-4 w-4 mr-2" />
                    Create Demo Tenant
                  </>
                )}
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                This will create a demo stable for testing purposes
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // User is properly authenticated and has tenant access
  return <>{children}</>;
};

export default ClientManagementGuard;
