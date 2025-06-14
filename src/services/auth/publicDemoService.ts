
import { User, Tenant, TenantUser } from '@/types/tenant';

interface DemoAccount {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  tenantName: string;
  tenantType: 'stable' | 'clinic' | 'marketplace' | 'enterprise' | 'hospital' | 'laboratory';
  role: 'owner' | 'admin' | 'manager';
}

class PublicDemoService {
  private demoAccounts: DemoAccount[] = [
    {
      id: '1',
      email: 'demo@eliteequestrian.com',
      firstName: 'Elite',
      lastName: 'Owner',
      tenantName: 'Elite Equestrian Center',
      tenantType: 'stable',
      role: 'owner'
    },
    {
      id: '2',
      email: 'demo@sunsetstables.com',
      firstName: 'Sunset',
      lastName: 'Owner',
      tenantName: 'Sunset Stables',
      tenantType: 'stable',
      role: 'owner'
    },
    {
      id: '3',
      email: 'demo@advancedvetclinic.com',
      firstName: 'Clinic',
      lastName: 'Director',
      tenantName: 'Advanced Veterinary Clinic',
      tenantType: 'clinic',
      role: 'owner'
    }
  ];

  getDemoAccounts(): DemoAccount[] {
    return this.demoAccounts;
  }

  createTenantFromDemoAccount(account: DemoAccount): Tenant {
    return {
      id: `demo-tenant-${account.id}`,
      name: account.tenantName,
      type: account.tenantType,
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
          laboratory: account.tenantType === 'clinic' || account.tenantType === 'hospital',
          clinic: account.tenantType === 'clinic' || account.tenantType === 'hospital',
          pharmacy: account.tenantType === 'clinic' || account.tenantType === 'hospital',
          marketplace: account.tenantType === 'marketplace',
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
  }

  createUserFromDemoAccount(account: DemoAccount, tenant: Tenant): User {
    const tenantUser: TenantUser = {
      id: `demo-tenant-user-${account.id}`,
      tenantId: tenant.id,
      userId: `demo-user-${account.id}`,
      role: account.role,
      permissions: ['*'],
      status: 'active',
      joinedAt: new Date(),
      lastLoginAt: new Date()
    };

    return {
      id: `demo-user-${account.id}`,
      email: account.email,
      firstName: account.firstName,
      lastName: account.lastName,
      createdAt: new Date(),
      updatedAt: new Date(),
      tenants: [tenantUser]
    };
  }
}

export const publicDemoService = new PublicDemoService();
