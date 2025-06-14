
import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { authService } from '@/services/auth/authService';
import { useToast } from '@/hooks/use-toast';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = authService.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        setSession(session);
        setUser(session?.user ?? null);
        setIsLoading(false);
      }
    );

    // Get initial session
    authService.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

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
      setUser(null);
      setSession(null);
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

  return {
    user,
    session,
    isLoading,
    login,
    signUp,
    logout,
    isAuthenticated: !!user,
  };
};
