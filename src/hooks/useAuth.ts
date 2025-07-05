
import { useState, useEffect } from 'react';

interface AuthUser {
  id: string;
  email?: string;
  name?: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock authentication - in a real app this would connect to your auth provider
    const initAuth = async () => {
      try {
        // Simulate loading time
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // For demo purposes, we'll create a mock user
        // In a real app, this would check for existing sessions
        setUser({
          id: 'demo-user-123',
          email: 'demo@example.com',
          name: 'Demo User'
        });
      } catch (error) {
        console.error('Auth initialization error:', error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Mock login logic
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockUser = {
        id: 'demo-user-123',
        email,
        name: 'Demo User'
      };
      setUser(mockUser);
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Login failed' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setUser(null);
  };

  return {
    user,
    isLoading,
    login,
    logout,
  };
};
