
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
  
  // Choose which auth state to use based on access mode
  const currentAuth = accessMode === 'public' ? publicAuth : regularAuth;
  
  const {
    user,
    currentTenant,
    availableTenants,
    isLoading,
    switchTenant,
    setIsLoading,
    switchDemoAccount: authSwitchDemoAccount,
  } = currentAuth;

  const { hasPermission, hasRole } = usePermissions(user, currentTenant);

  const login = async (email: string, password: string) => {
    if (accessMode === 'public') {
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
      console.log('Logout from public mode');
      return;
    }
    
    try {
      const { error } = await authService.signOut();
      if (error) throw error;
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const switchDemoAccount = async (account: any) => {
    console.log('EnhancedAuthProvider: Switching to demo account:', account);
    
    try {
      // Set to demo mode first
      setAccessMode('demo');
      
      // Wait for access mode to update
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Use the appropriate auth hook's switchDemoAccount function
      if (authSwitchDemoAccount) {
        await authSwitchDemoAccount(account);
        console.log('EnhancedAuthProvider: Demo account switch completed for:', account.tenantName);
      } else {
        console.error('EnhancedAuthProvider: switchDemoAccount function not available');
      }
      
    } catch (error) {
      console.error('EnhancedAuthProvider: Demo account switch error:', error);
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
