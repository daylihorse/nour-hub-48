
import { ReactNode } from 'react';
import { AuthContext } from '@/types/tenant';
import { authService } from '@/services/auth/authService';
import { useAuthState } from '@/hooks/auth/useAuthState';
import { usePublicAuthState } from '@/hooks/auth/usePublicAuthState';
import { usePermissions } from '@/hooks/auth/usePermissions';
import { AuthContextProvider } from '@/contexts/AuthContext';
import { useAccessMode } from '@/contexts/AccessModeContext';
import { publicDemoService } from '@/services/auth/publicDemoService';

interface EnhancedAuthProviderProps {
  children: ReactNode;
}

export const EnhancedAuthProvider = ({ children }: EnhancedAuthProviderProps) => {
  const { accessMode, setAccessMode } = useAccessMode();
  
  // Use different auth states based on access mode
  const regularAuth = useAuthState();
  const publicAuth = usePublicAuthState();
  
  // Choose which auth state to use
  const {
    user,
    currentTenant,
    availableTenants,
    isLoading,
    switchTenant,
    setIsLoading,
  } = accessMode === 'public' ? publicAuth : regularAuth;

  const { hasPermission, hasRole } = usePermissions(user, currentTenant);

  const login = async (email: string, password: string) => {
    if (accessMode === 'public') {
      // In public mode, login is not needed
      console.log('Login not required in public mode');
      return;
    }
    
    setIsLoading(true);
    try {
      const { error } = await authService.signInWithPassword(email, password);
      if (error) throw error;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    if (accessMode === 'public') {
      // In public mode, logout doesn't need to call auth service
      // Navigation will be handled by the calling component
      console.log('Logout from public mode');
      return;
    }
    
    try {
      const { error } = await authService.signOut();
      if (error) throw error;
    } catch (error) {
      console.error('Logout error:', error);
      // Don't re-throw logout errors to prevent app crashes
    }
  };

  const switchDemoAccount = async (account: any) => {
    console.log('Switching to demo account:', account);
    
    setIsLoading(true);
    try {
      // Set to demo mode
      setAccessMode('demo');
      
      // Create tenant and user from account data
      const tenant = publicDemoService.createTenantFromDemoAccount(account);
      const user = publicDemoService.createUserFromDemoAccount(account, tenant);
      
      // Update auth state directly (this will be handled by the auth hooks)
      // The actual state update will happen through the auth state hooks
      console.log('Demo account switch completed for:', account.tenantName);
      
    } catch (error) {
      console.error('Demo account switch error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const value: AuthContext = {
    user,
    currentTenant,
    availableTenants,
    isLoading,
    login,
    logout,
    switchTenant,
    switchDemoAccount,
    hasPermission,
    hasRole,
  };

  return (
    <AuthContextProvider.Provider value={value}>
      {children}
    </AuthContextProvider.Provider>
  );
};
