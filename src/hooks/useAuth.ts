
import { useContext } from 'react';
import { AuthContextProvider } from '@/contexts/AuthContext';
import { AuthContext } from '@/types/tenant';

export const useAuth = (): AuthContext => {
  const context = useContext(AuthContextProvider);
  if (!context) {
    // Return a robust default context for demo mode with all features enabled
    return {
      user: { 
        id: 'demo-user', 
        email: 'demo@eliteequestrian.com', 
        firstName: 'Demo', 
        lastName: 'User' 
      },
      currentTenant: { 
        id: 'demo-tenant', 
        name: 'Elite Equestrian Center', 
        type: 'stable',
        subscriptionTier: 'premium',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date(),
        settings: {
          timezone: 'UTC',
          currency: 'USD',
          language: 'en',
          features: {
            horses: true,
            laboratory: true,
            clinic: true,
            pharmacy: true,
            marketplace: true,
            finance: true,
            hr: true,
            inventory: true,
            training: true,
            rooms: true,
            maintenance: true,
            messages: true,
          }
        },
        metadata: {}
      },
      availableTenants: [{ 
        id: 'demo-tenant', 
        name: 'Elite Equestrian Center', 
        type: 'stable',
        subscriptionTier: 'premium',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date(),
        settings: {
          timezone: 'UTC',
          currency: 'USD',
          language: 'en',
          features: {
            horses: true,
            laboratory: true,
            clinic: true,
            pharmacy: true,
            marketplace: true,
            finance: true,
            hr: true,
            inventory: true,
            training: true,
            rooms: true,
            maintenance: true,
            messages: true,
          }
        },
        metadata: {}
      }],
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
