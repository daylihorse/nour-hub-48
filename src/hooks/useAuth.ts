
import { useState, useEffect } from 'react';

interface AuthUser {
  id: string;
  email?: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  tenants?: Array<{
    id: string;
    name: string;
    role: string;
  }>;
}

interface Tenant {
  id: string;
  name: string;
  type: string;
}

interface AuthContextType {
  user: AuthUser | null;
  currentTenant: Tenant | null;
  availableTenants: Tenant[];
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string; data?: any }>;
  signUp: (email: string, password: string, firstName?: string, lastName?: string) => Promise<{ success: boolean; error?: string; data?: any }>;
  logout: () => Promise<void>;
  switchTenant: (tenantId: string) => Promise<void>;
  switchDemoAccount: (account: any) => Promise<void>;
  hasPermission: (permission: string) => boolean;
}

export const useAuth = (): AuthContextType => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [currentTenant, setCurrentTenant] = useState<Tenant | null>(null);
  const [availableTenants, setAvailableTenants] = useState<Tenant[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock authentication - in a real app this would connect to your auth provider
    const initAuth = async () => {
      try {
        // Simulate loading time
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // For demo purposes, we'll create a mock user
        const mockUser: AuthUser = {
          id: 'demo-user-123',
          email: 'demo@example.com',
          name: 'Demo User',
          firstName: 'Demo',
          lastName: 'User',
          tenants: [{
            id: 'tenant-1',
            name: 'Demo Equine Facility',
            role: 'owner'
          }]
        };

        const mockTenant: Tenant = {
          id: 'tenant-1',
          name: 'Demo Equine Facility',
          type: 'facility'
        };

        setUser(mockUser);
        setCurrentTenant(mockTenant);
        setAvailableTenants([mockTenant]);
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
      const mockUser: AuthUser = {
        id: 'demo-user-123',
        email,
        name: 'Demo User',
        firstName: 'Demo',
        lastName: 'User',
        tenants: [{
          id: 'tenant-1',
          name: 'Demo Equine Facility',
          role: 'owner'
        }]
      };

      const mockTenant: Tenant = {
        id: 'tenant-1',
        name: 'Demo Equine Facility',
        type: 'facility'
      };

      setUser(mockUser);
      setCurrentTenant(mockTenant);
      setAvailableTenants([mockTenant]);
      
      return { 
        success: true, 
        data: { user: mockUser } 
      };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Login failed' };
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string, firstName?: string, lastName?: string) => {
    setIsLoading(true);
    try {
      // Mock signup logic
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockUser: AuthUser = {
        id: 'demo-user-123',
        email,
        name: `${firstName || 'Demo'} ${lastName || 'User'}`,
        firstName: firstName || 'Demo',
        lastName: lastName || 'User',
        tenants: [{
          id: 'tenant-1',
          name: 'Demo Equine Facility',
          role: 'owner'
        }]
      };

      const mockTenant: Tenant = {
        id: 'tenant-1',
        name: 'Demo Equine Facility',
        type: 'facility'
      };

      setUser(mockUser);
      setCurrentTenant(mockTenant);
      setAvailableTenants([mockTenant]);
      
      return { 
        success: true, 
        data: { user: mockUser } 
      };
    } catch (error) {
      console.error('Sign up error:', error);
      return { success: false, error: 'Sign up failed' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setUser(null);
    setCurrentTenant(null);
    setAvailableTenants([]);
  };

  const switchTenant = async (tenantId: string) => {
    const tenant = availableTenants.find(t => t.id === tenantId);
    if (tenant) {
      setCurrentTenant(tenant);
    }
  };

  const switchDemoAccount = async (account: any) => {
    // Mock demo account switching
    const mockTenant: Tenant = {
      id: account.tenantId || 'tenant-demo',
      name: account.tenantName || 'Demo Account',
      type: account.tenantType || 'facility'
    };

    const mockUser: AuthUser = {
      id: 'demo-user-123',
      email: account.email,
      name: 'Demo User',
      firstName: 'Demo',
      lastName: 'User',
      tenants: [{
        id: mockTenant.id,
        name: mockTenant.name,
        role: account.role || 'owner'
      }]
    };

    setUser(mockUser);
    setCurrentTenant(mockTenant);
    setAvailableTenants([mockTenant]);
  };

  const hasPermission = (permission: string): boolean => {
    // Mock permission check - in real app would check actual permissions
    return true;
  };

  return {
    user,
    currentTenant,
    availableTenants,
    isLoading,
    isAuthenticated: !!user,
    login,
    signUp,
    logout,
    switchTenant,
    switchDemoAccount,
    hasPermission,
  };
};
