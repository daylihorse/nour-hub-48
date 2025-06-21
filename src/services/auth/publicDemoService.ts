
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
        tenant_id: 'public-tenant-id',
        tenantId: 'public-tenant-id',
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
      id: 'public-tenant-id',
      name: 'Demo Stable',
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
        tenantName: 'Green Valley Stables',
        tenantType: 'stable',
        email: 'owner@greenvalley.com',
        password: 'demo123',
        role: 'owner'
      },
      {
        tenantName: 'Elite Veterinary Clinic',
        tenantType: 'clinic',
        email: 'vet@eliteclinic.com',
        password: 'demo123',
        role: 'admin'
      },
      {
        tenantName: 'Arabian Horse Laboratory',
        tenantType: 'laboratory',
        email: 'lab@arabianlab.com',
        password: 'demo123',
        role: 'manager'
      }
    ];
  },

  createTenantFromDemoAccount(account: any): Tenant {
    return {
      id: `demo-tenant-${account.tenantType}`,
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
