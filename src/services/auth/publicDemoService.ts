
import { User, Tenant, TenantUser } from '@/types/tenant';

export const publicDemoService = {
  createPublicUser(): User {
    return {
      id: 'public-user-id',
      email: 'demo@example.com',
      first_name: 'Demo',
      last_name: 'User',
      firstName: 'Demo',
      lastName: 'User',
      avatar: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      tenants: [{
        id: 'public-tenant-user-id',
        tenant_id: '550e8400-e29b-41d4-a716-446655440001',
        tenantId: '550e8400-e29b-41d4-a716-446655440001',
        user_id: 'public-user-id',
        role: 'owner',
        permissions: ['*'],
        status: 'active',
        joined_at: new Date().toISOString(),
      }]
    };
  },

  createPublicTenant(): Tenant {
    return {
      id: '550e8400-e29b-41d4-a716-446655440001',
      name: 'Elite Equestrian Center',
      type: 'stable',
      subscription_tier: 'premium',
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
    };
  },

  getDemoAccounts() {
    return [
      {
        tenantName: 'Elite Equestrian Center',
        tenantType: 'stable',
        email: 'owner@eliteequestrian.com',
        password: 'demo123',
        role: 'owner'
      },
      {
        tenantName: 'Sunset Stables',
        tenantType: 'stable',
        email: 'owner@sunsetstables.com',
        password: 'demo123',
        role: 'owner'
      },
      {
        tenantName: 'Advanced Veterinary Clinic',
        tenantType: 'clinic',
        email: 'director@advancedvetclinic.com',
        password: 'demo123',
        role: 'admin'
      }
    ];
  },

  createTenantFromDemoAccount(account: any): Tenant {
    // Map demo accounts to their corresponding tenant IDs from the database
    const tenantIdMap: { [key: string]: string } = {
      'Elite Equestrian Center': '550e8400-e29b-41d4-a716-446655440001',
      'Sunset Stables': '550e8400-e29b-41d4-a716-446655440002', 
      'Advanced Veterinary Clinic': '550e8400-e29b-41d4-a716-446655440003'
    };

    const tenantId = tenantIdMap[account.tenantName] || `demo-tenant-${account.tenantType}`;
    
    return {
      id: tenantId,
      name: account.tenantName,
      type: account.tenantType,
      subscription_tier: 'premium',
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
          laboratory: account.tenantType === 'laboratory',
          clinic: account.tenantType === 'clinic',
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
    };
  },

  createUserFromDemoAccount(account: any, tenant: Tenant): User {
    return {
      id: `demo-user-${account.tenantType}`,
      email: account.email,
      first_name: 'Demo',
      last_name: 'User',
      firstName: 'Demo',
      lastName: 'User',
      avatar: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      tenants: [{
        id: `demo-tenant-user-${account.tenantType}`,
        tenant_id: tenant.id,
        tenantId: tenant.id,
        user_id: `demo-user-${account.tenantType}`,
        role: account.role,
        permissions: account.role === 'owner' ? ['*'] : ['read', 'write'],
        status: 'active',
        joined_at: new Date().toISOString(),
      }]
    };
  }
};
