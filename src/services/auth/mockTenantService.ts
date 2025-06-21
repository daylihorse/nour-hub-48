
import { Tenant, User, TenantUser, TenantSettings, TenantMetadata } from '@/types/tenant';

interface MockTenantData {
  tenant: Tenant;
  userAssociations: Array<{
    userId: string;
    email: string;
    role: string;
    permissions: string[];
  }>;
}

class MockTenantService {
  private tenants: Map<string, MockTenantData> = new Map();

  constructor() {
    this.initializeMockTenants();
  }

  private initializeMockTenants() {
    const mockTenants: MockTenantData[] = [
      {
        tenant: {
          id: '550e8400-e29b-41d4-a716-446655440001',
          name: 'Elite Equestrian Center',
          type: 'stable',
          subscription_tier: 'premium',
          subscriptionTier: 'premium',
          status: 'active',
          createdAt: new Date('2024-01-01'),
          updatedAt: new Date('2024-01-01'),
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
        userAssociations: [
          { userId: '', email: 'owner@eliteequestrian.com', role: 'owner', permissions: ['*'] },
          { userId: '', email: 'manager@eliteequestrian.com', role: 'manager', permissions: ['horses:read', 'horses:write', 'inventory:read', 'inventory:write', 'finance:read'] }
        ]
      },
      {
        tenant: {
          id: '550e8400-e29b-41d4-a716-446655440002',
          name: 'Sunset Stables',
          type: 'stable',
          subscription_tier: 'basic',
          subscriptionTier: 'basic',
          status: 'active',
          createdAt: new Date('2024-01-01'),
          updatedAt: new Date('2024-01-01'),
          settings: {
            timezone: 'UTC',
            currency: 'USD',
            language: 'en',
            features: {
              horses: true,
              laboratory: false,
              clinic: false,
              pharmacy: false,
              marketplace: false,
              finance: true,
              hr: false,
              inventory: true,
              training: false,
              rooms: true,
              maintenance: false,
              messages: true,
            }
          },
          metadata: {}
        },
        userAssociations: [
          { userId: '', email: 'owner@sunsetstables.com', role: 'owner', permissions: ['*'] }
        ]
      },
      {
        tenant: {
          id: '550e8400-e29b-41d4-a716-446655440003',
          name: 'Advanced Veterinary Clinic',
          type: 'clinic',
          subscription_tier: 'professional',
          subscriptionTier: 'professional',
          status: 'active',
          createdAt: new Date('2024-01-01'),
          updatedAt: new Date('2024-01-01'),
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
              training: false,
              rooms: false,
              maintenance: true,
              messages: true,
            }
          },
          metadata: {}
        },
        userAssociations: [
          { userId: '', email: 'director@advancedvetclinic.com', role: 'owner', permissions: ['*'] }
        ]
      },
      {
        tenant: {
          id: '550e8400-e29b-41d4-a716-446655440004',
          name: 'Equine Diagnostics Lab',
          type: 'laboratory',
          subscription_tier: 'professional',
          subscriptionTier: 'professional',
          status: 'active',
          createdAt: new Date('2024-01-01'),
          updatedAt: new Date('2024-01-01'),
          settings: {
            timezone: 'UTC',
            currency: 'USD',
            language: 'en',
            features: {
              horses: true,
              laboratory: true,
              clinic: false,
              pharmacy: false,
              marketplace: false,
              finance: true,
              hr: true,
              inventory: true,
              training: false,
              rooms: false,
              maintenance: true,
              messages: true,
            }
          },
          metadata: {}
        },
        userAssociations: [
          { userId: '', email: 'director@equinediagnostics.com', role: 'owner', permissions: ['*'] }
        ]
      },
      {
        tenant: {
          id: '550e8400-e29b-41d4-a716-446655440005',
          name: 'Regional Equine Hospital',
          type: 'hospital',
          subscription_tier: 'enterprise',
          subscriptionTier: 'enterprise',
          status: 'active',
          createdAt: new Date('2024-01-01'),
          updatedAt: new Date('2024-01-01'),
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
        userAssociations: [
          { userId: '', email: 'admin@regionalequinehospital.com', role: 'owner', permissions: ['*'] }
        ]
      },
      {
        tenant: {
          id: '550e8400-e29b-41d4-a716-446655440006',
          name: 'HorseTrader Marketplace',
          type: 'marketplace',
          subscription_tier: 'premium',
          subscriptionTier: 'premium',
          status: 'active',
          createdAt: new Date('2024-01-01'),
          updatedAt: new Date('2024-01-01'),
          settings: {
            timezone: 'UTC',
            currency: 'USD',
            language: 'en',
            features: {
              horses: true,
              laboratory: false,
              clinic: false,
              pharmacy: false,
              marketplace: true,
              finance: true,
              hr: true,
              inventory: true,
              training: false,
              rooms: false,
              maintenance: false,
              messages: true,
            }
          },
          metadata: {}
        },
        userAssociations: [
          { userId: '', email: 'admin@horsetrader.com', role: 'owner', permissions: ['*'] }
        ]
      },
      {
        tenant: {
          id: '550e8400-e29b-41d4-a716-446655440007',
          name: 'Global Equine Solutions',
          type: 'enterprise',
          subscription_tier: 'enterprise',
          subscriptionTier: 'enterprise',
          status: 'active',
          createdAt: new Date('2024-01-01'),
          updatedAt: new Date('2024-01-01'),
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
        userAssociations: [
          { userId: '', email: 'ceo@globalequinesolutions.com', role: 'owner', permissions: ['*'] }
        ]
      }
    ];

    mockTenants.forEach(mockTenant => {
      this.tenants.set(mockTenant.tenant.id, mockTenant);
    });
  }

  async getUserTenants(userEmail: string): Promise<{ tenants: Tenant[], tenantUsers: TenantUser[] }> {
    console.log('Getting tenants for user:', userEmail);
    
    const userTenants: Tenant[] = [];
    const userTenantUsers: TenantUser[] = [];

    this.tenants.forEach((mockTenantData, tenantId) => {
      const userAssociation = mockTenantData.userAssociations.find(
        assoc => assoc.email === userEmail
      );

      if (userAssociation) {
        userTenants.push(mockTenantData.tenant);
        
        const tenantUser: TenantUser = {
          id: this.generateId(),
          tenant_id: tenantId,
          tenantId: tenantId,
          user_id: userAssociation.userId,
          role: userAssociation.role as any,
          permissions: userAssociation.permissions,
          status: 'active',
          joined_at: new Date().toISOString(),
          last_login_at: new Date().toISOString()
        };
        
        userTenantUsers.push(tenantUser);
      }
    });

    return { tenants: userTenants, tenantUsers: userTenantUsers };
  }

  async getTenant(tenantId: string): Promise<Tenant | null> {
    const mockTenantData = this.tenants.get(tenantId);
    return mockTenantData ? mockTenantData.tenant : null;
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}

export const mockTenantService = new MockTenantService();
