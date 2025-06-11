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

  // Mock data for demonstration - multiple diverse tenants
  useEffect(() => {
    // Simulate loading user data
    setTimeout(() => {
      const mockUser: User = {
        id: '1',
        email: 'admin@example.com',
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
          },
          {
            id: 'tu2',
            tenantId: 'tenant2',
            userId: '1',
            role: 'admin',
            permissions: ['horses:read', 'horses:write', 'clinic:read', 'clinic:write', 'laboratory:read'],
            status: 'active',
            joinedAt: new Date(),
            lastLoginAt: new Date(),
          },
          {
            id: 'tu3',
            tenantId: 'tenant3',
            userId: '1',
            role: 'manager',
            permissions: ['laboratory:read', 'laboratory:write', 'finance:read'],
            status: 'active',
            joinedAt: new Date(),
            lastLoginAt: new Date(),
          },
          {
            id: 'tu4',
            tenantId: 'tenant4',
            userId: '1',
            role: 'employee',
            permissions: ['marketplace:read', 'inventory:read', 'hr:read'],
            status: 'active',
            joinedAt: new Date(),
            lastLoginAt: new Date(),
          },
          {
            id: 'tu5',
            tenantId: 'tenant5',
            userId: '1',
            role: 'admin',
            permissions: ['*'],
            status: 'active',
            joinedAt: new Date(),
            lastLoginAt: new Date(),
          }
        ]
      };

      const mockTenants: Tenant[] = [
        {
          id: 'tenant1',
          name: 'Elite Equestrian Center',
          type: 'stable',
          subscriptionTier: 'professional',
          status: 'active',
          createdAt: new Date('2022-01-15'),
          updatedAt: new Date(),
          settings: {
            timezone: 'America/New_York',
            currency: 'USD',
            language: 'en',
            customBranding: {
              primaryColor: '#2563eb',
              secondaryColor: '#1e40af'
            },
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
              email: 'contact@eliteequestrian.com',
              website: 'https://eliteequestrian.com'
            },
            businessInfo: {
              registrationNumber: 'EQ-2022-001',
              taxId: '12-3456789',
              industry: 'Equestrian Sports'
            }
          }
        },
        {
          id: 'tenant2',
          name: 'Dubai Veterinary Hospital',
          type: 'hospital',
          subscriptionTier: 'enterprise',
          status: 'active',
          createdAt: new Date('2021-06-20'),
          updatedAt: new Date(),
          settings: {
            timezone: 'Asia/Dubai',
            currency: 'AED',
            language: 'en',
            customBranding: {
              primaryColor: '#059669',
              secondaryColor: '#047857'
            },
            features: {
              horses: true,
              laboratory: true,
              clinic: true,
              pharmacy: true,
              marketplace: false,
              finance: true,
              hr: true,
              inventory: true,
              training: false,
              rooms: true,
              maintenance: true,
              messages: true,
            }
          },
          metadata: {
            address: {
              street: 'Al Khaleej Street, Building 15',
              city: 'Dubai',
              state: 'Dubai',
              zipCode: '00000',
              country: 'UAE'
            },
            contact: {
              phone: '+971-4-123-4567',
              email: 'info@dubaivethospital.ae',
              website: 'https://dubaivethospital.ae'
            },
            businessInfo: {
              registrationNumber: 'DU-VET-2021',
              taxId: '100123456700003',
              industry: 'Veterinary Medicine'
            }
          }
        },
        {
          id: 'tenant3',
          name: 'Equine Lab Solutions',
          type: 'laboratory',
          subscriptionTier: 'premium',
          status: 'active',
          createdAt: new Date('2023-03-10'),
          updatedAt: new Date(),
          settings: {
            timezone: 'Europe/London',
            currency: 'GBP',
            language: 'en',
            customBranding: {
              primaryColor: '#7c3aed',
              secondaryColor: '#6d28d9'
            },
            features: {
              horses: true,
              laboratory: true,
              clinic: false,
              pharmacy: false,
              marketplace: false,
              finance: true,
              hr: false,
              inventory: true,
              training: false,
              rooms: false,
              maintenance: true,
              messages: true,
            }
          },
          metadata: {
            address: {
              street: '45 Cambridge Science Park',
              city: 'Cambridge',
              state: 'Cambridgeshire',
              zipCode: 'CB4 0FW',
              country: 'UK'
            },
            contact: {
              phone: '+44-1223-123456',
              email: 'lab@equinelabsolutions.co.uk',
              website: 'https://equinelabsolutions.co.uk'
            },
            businessInfo: {
              registrationNumber: 'GB-LAB-2023',
              taxId: 'GB123456789',
              industry: 'Laboratory Services'
            }
          }
        },
        {
          id: 'tenant4',
          name: 'Horse Marketplace Pro',
          type: 'marketplace',
          subscriptionTier: 'basic',
          status: 'trial',
          createdAt: new Date('2024-01-05'),
          updatedAt: new Date(),
          settings: {
            timezone: 'America/Los_Angeles',
            currency: 'USD',
            language: 'en',
            features: {
              horses: true,
              laboratory: false,
              clinic: false,
              pharmacy: false,
              marketplace: true,
              finance: true,
              hr: false,
              inventory: true,
              training: false,
              rooms: false,
              maintenance: false,
              messages: true,
            }
          },
          metadata: {
            address: {
              street: '789 Tech Boulevard',
              city: 'San Francisco',
              state: 'CA',
              zipCode: '94107',
              country: 'USA'
            },
            contact: {
              phone: '+1-415-555-0123',
              email: 'support@horsemarketplacepro.com',
              website: 'https://horsemarketplacepro.com'
            },
            businessInfo: {
              registrationNumber: 'CA-MP-2024',
              taxId: '98-7654321',
              industry: 'E-commerce'
            }
          }
        },
        {
          id: 'tenant5',
          name: 'Global Equine Enterprise',
          type: 'enterprise',
          subscriptionTier: 'enterprise',
          status: 'active',
          createdAt: new Date('2020-09-12'),
          updatedAt: new Date(),
          settings: {
            timezone: 'Australia/Sydney',
            currency: 'AUD',
            language: 'en',
            customBranding: {
              primaryColor: '#dc2626',
              secondaryColor: '#b91c1c'
            },
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
          metadata: {
            address: {
              street: '200 Collins Street',
              city: 'Melbourne',
              state: 'Victoria',
              zipCode: '3000',
              country: 'Australia'
            },
            contact: {
              phone: '+61-3-9000-1234',
              email: 'contact@globalequine.com.au',
              website: 'https://globalequine.com.au'
            },
            businessInfo: {
              registrationNumber: 'AU-ENT-2020',
              taxId: 'ABN 12 345 678 901',
              industry: 'Equine Management'
            }
          }
        }
      ];

      setUser(mockUser);
      // Set the first tenant as current by default
      setCurrentTenant(mockTenants[0]);
      setAvailableTenants(mockTenants);
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
