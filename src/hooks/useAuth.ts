
import { useContext } from 'react';
import { AuthContextProvider } from '@/contexts/AuthContext';
import { AuthContext } from '@/types/tenant';

export const useAuth = (): AuthContext => {
  const context = useContext(AuthContextProvider);
  if (!context) {
    // Return a default context for demo mode
    return {
      user: { id: 'demo-user', email: 'demo@example.com', firstName: 'Demo', lastName: 'User' },
      currentTenant: { id: 'demo-tenant', name: 'Demo Tenant', type: 'demo' },
      availableTenants: [{ id: 'demo-tenant', name: 'Demo Tenant', type: 'demo' }],
      isLoading: false,
      login: async () => ({ data: null, error: null }),
      signUp: async () => ({ data: null, error: null }),
      logout: async () => {},
      switchTenant: async () => {},
      switchDemoAccount: async () => {},
      hasPermission: () => true,
      hasRole: () => true,
      isAuthenticated: true,
    };
  }
  return context;
};
