
import { useState, useEffect } from 'react';

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: any | null;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    isLoading: true,
    user: null
  });

  useEffect(() => {
    // Simulate auth check
    const checkAuth = async () => {
      try {
        // In demo mode, always authenticated
        setAuthState({
          isAuthenticated: true,
          isLoading: false,
          user: { id: 'demo-user', name: 'Demo User' }
        });
      } catch (error) {
        setAuthState({
          isAuthenticated: false,
          isLoading: false,
          user: null
        });
      }
    };

    checkAuth();
  }, []);

  return authState;
};
