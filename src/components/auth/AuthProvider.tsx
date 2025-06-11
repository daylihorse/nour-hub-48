
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
    try {
      const { error } = await authService.signOut();
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
    logout,
    switchTenant,
    hasPermission,
    hasRole,
  };

  return (
    <AuthContextProvider.Provider value={value}>
      {children}
    </AuthContextProvider.Provider>
  );
};
