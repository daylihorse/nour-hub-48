
import { ReactNode } from 'react';
import { AuthContext } from '@/types/tenant';
import { authService } from '@/services/auth/authService';
import { useAuthState } from '@/hooks/auth/useAuthState';
import { usePermissions } from '@/hooks/auth/usePermissions';
import { AuthContextProvider } from '@/contexts/AuthContext';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const {
    user,
    currentTenant,
    availableTenants,
    isLoading,
    switchTenant,
    setIsLoading,
  } = useAuthState();

  const { hasPermission, hasRole } = usePermissions(user, currentTenant);

  const login = async (email: string, password: string) => {
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
    try {
      const { error } = await authService.logout();
      if (error) throw error;
    } catch (error) {
      console.error('Logout error:', error);
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
