
import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { authService } from '@/services/auth/authService';
import { useToast } from '@/hooks/use-toast';
import { useAuthState } from '@/hooks/auth/useAuthState';

export const useAuth = () => {
  const { user, currentTenant, availableTenants, isLoading, switchTenant, switchDemoAccount, setIsLoading } = useAuthState();
  const [session, setSession] = useState<Session | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = authService.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        setSession(session);
        setIsLoading(false);
      }
    );

    // Get initial session
    authService.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [setIsLoading]);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await authService.login(email, password);
      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      console.error('Login error:', error);
      return { data: null, error };
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string, firstName?: string, lastName?: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await authService.signUp(email, password, firstName, lastName);
      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      console.error('Signup error:', error);
      return { data: null, error };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      const { error } = await authService.logout();
      if (error) throw error;
      toast({
        title: 'Success',
        description: 'Logged out successfully',
      });
    } catch (error: any) {
      console.error('Logout error:', error);
      toast({
        title: 'Error',
        description: 'Failed to logout',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const hasPermission = (permission: string): boolean => {
    if (!currentTenant || !currentTenant.user_permissions) return false;
    return currentTenant.user_permissions.includes(permission);
  };

  const hasRole = (role: string): boolean => {
    if (!currentTenant || !currentTenant.user_role) return false;
    return currentTenant.user_role === role;
  };

  return {
    user,
    session,
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
};
