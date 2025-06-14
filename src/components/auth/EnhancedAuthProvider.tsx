
import { ReactNode } from 'react';
import { AuthContext } from '@/types/tenant';
import { authService } from '@/services/auth/authService';
import { useAuthState } from '@/hooks/auth/useAuthState';
import { usePublicAuthState } from '@/hooks/auth/usePublicAuthState';
import { usePermissions } from '@/hooks/auth/usePermissions';
import { AuthContextProvider } from '@/contexts/AuthContext';
import { useAccessMode } from '@/contexts/AccessModeContext';

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
    switchDemoAccount: authSwitchDemoAccount,
  } = accessMode === 'public' ? publicAuth : regularAuth;

  const { hasPermission, hasRole } = usePermissions(user, currentTenant);

  console.log('EnhancedAuthProvider - Current state:', {
    accessMode,
    user: !!user,
    currentTenant: !!currentTenant,
    isLoading
  });

  const login = async (email: string, password: string) => {
    if (accessMode === 'public') {
      // In public mode, login is not needed
      console.log('Login not required in public mode');
      return;
    }
    
    console.log('Attempting login for:', email);
    setIsLoading(true);
    try {
      const { error } = await authService.signInWithPassword(email, password);
      if (error) {
        console.error('Login error:', error);
        throw error;
      }
      console.log('Login successful');
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
      console.log('Logout successful');
    } catch (error) {
      console.error('Logout error:', error);
      // Don't re-throw logout errors to prevent app crashes
    }
  };

  const switchDemoAccount = async (account: any) => {
    console.log('Switching to demo account:', account);
    
    try {
      // Set to demo mode first
      setAccessMode('demo');
      
      // Wait a bit for the access mode to propagate
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Use the auth hook's switchDemoAccount function
      if (authSwitchDemoAccount) {
        await authSwitchDemoAccount(account);
        console.log('Demo account switch completed for:', account.tenantName);
      }
      
    } catch (error) {
      console.error('Demo account switch error:', error);
      throw error;
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
