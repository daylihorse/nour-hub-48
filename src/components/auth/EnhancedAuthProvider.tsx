
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

  const login = async (email: string, password: string) => {
    if (accessMode === 'public') {
      console.log('Login not required in public mode');
      return { data: null, error: null };
    }
    
    setIsLoading(true);
    try {
      const { data, error } = await authService.login(email, password);
      if (error) throw error;
      return { data, error };
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string, firstName?: string, lastName?: string) => {
    if (accessMode === 'public') {
      console.log('Sign up not required in public mode');
      return { data: null, error: null };
    }
    
    setIsLoading(true);
    try {
      const { data, error } = await authService.signUp(email, password, firstName, lastName);
      if (error) throw error;
      return { data, error };
    } catch (error) {
      console.error('Sign up error:', error);
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
      const { error } = await authService.logout();
      if (error) throw error;
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const switchDemoAccount = async (account: any) => {
    console.log('Switching to demo account:', account);
    
    try {
      setAccessMode('demo');
      await new Promise(resolve => setTimeout(resolve, 50));
      
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
    signUp,
    logout,
    switchTenant,
    switchDemoAccount,
    hasPermission,
    hasRole,
    isAuthenticated: !!user,
  };

  return (
    <AuthContextProvider.Provider value={value}>
      {children}
    </AuthContextProvider.Provider>
  );
};
