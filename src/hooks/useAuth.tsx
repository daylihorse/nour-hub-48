
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthContext, User, Tenant, TenantUser } from '@/types/tenant';

const AuthContextProvider = createContext<AuthContext | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContextProvider);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [currentTenant, setCurrentTenant] = useState<Tenant | null>(null);
  const [availableTenants, setAvailableTenants] = useState<Tenant[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data for demonstration
  useEffect(() => {
    // Simulate loading user data
    setTimeout(() => {
      const mockUser: User = {
        id: '1',
        email: 'admin@stablemanagement.com',
        firstName: 'John',
        lastName: 'Doe',
        createdAt: new Date(),
        updatedAt: new Date(),
        tenants: [
          {
            id: 'tu1',
            tenantId: 'tenant1',
            userId: '1',
            role: 'owner',
            permissions: ['*'],
            status: 'active',
            joinedAt: new Date(),
            lastLoginAt: new Date(),
          }
        ]
      };

      const mockTenant: Tenant = {
        id: 'tenant1',
        name: 'Elite Equestrian Center',
        type: 'stable',
        subscriptionTier: 'professional',
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
            marketplace: false,
            finance: true,
            hr: true,
            inventory: true,
            training: true,
            rooms: true,
            maintenance: true,
            messages: true,
          }
        },
        metadata: {
          address: {
            street: '123 Horse Lane',
            city: 'Lexington',
            state: 'KY',
            zipCode: '40503',
            country: 'USA'
          },
          contact: {
            phone: '+1-555-123-4567',
            email: 'contact@eliteequestrian.com'
          }
        }
      };

      setUser(mockUser);
      setCurrentTenant(mockTenant);
      setAvailableTenants([mockTenant]);
      setIsLoading(false);
    }, 1000);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    // Implement login logic here
    console.log('Login attempt:', email);
    setIsLoading(false);
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
      localStorage.setItem('currentTenantId', tenantId);
    }
  };

  const hasPermission = (permission: string): boolean => {
    if (!user || !currentTenant) return false;
    const tenantUser = user.tenants.find(tu => tu.tenantId === currentTenant.id);
    return tenantUser?.permissions.includes('*') || tenantUser?.permissions.includes(permission) || false;
  };

  const hasRole = (role: string): boolean => {
    if (!user || !currentTenant) return false;
    const tenantUser = user.tenants.find(tu => tu.tenantId === currentTenant.id);
    return tenantUser?.role === role;
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
