
import { User, Tenant, TenantUser } from '@/types/tenant';

class PublicDemoService {
  createPublicUser(): User {
    const publicUser: User = {
      id: 'public-user-id',
      email: 'demo@equitech.com',
      firstName: 'Demo',
      lastName: 'User',
      createdAt: new Date(),
      updatedAt: new Date(),
      tenants: [{
        id: 'public-tenant-user-id',
        tenantId: 'public-tenant-id',
        userId: 'public-user-id',
        role: 'owner',
        permissions: ['*'],
        status: 'active',
        joinedAt: new Date(),
      }],
    };
    return publicUser;
  }

  createPublicTenant(): Tenant {
    const publicTenant: Tenant = {
      id: 'public-tenant-id',
      name: 'Public Demo - Elite Equestrian Center',
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
      metadata: {
        address: {
          street: '123 Demo Street',
          city: 'Demo City',
          state: 'Demo State',
          zipCode: '12345',
          country: 'USA'
        },
        contact: {
          phone: '+1 (555) 123-4567',
          email: 'info@demo-stable.com',
          website: 'https://demo-stable.com'
        }
      }
    };
    return publicTenant;
  }

  getDemoAccounts() {
    return [
      {
        email: 'owner@eliteequestrian.com',
        password: 'password123',
        tenantType: 'stable',
        role: 'owner',
        tenantName: 'Elite Equestrian Center',
        description: 'Premium stable with full features enabled',
      },
      {
        email: 'director@advancedvetclinic.com',
        password: 'password123',
        tenantType: 'clinic',
        role: 'owner',
        tenantName: 'Advanced Veterinary Clinic',
        description: 'Professional clinic with medical features',
      },
      {
        email: 'director@equinediagnostics.com',
        password: 'password123',
        tenantType: 'laboratory',
        role: 'owner',
        tenantName: 'Equine Diagnostics Lab',
        description: 'Professional laboratory with diagnostic tools',
      },
      {
        email: 'admin@regionalequinehospital.com',
        password: 'password123',
        tenantType: 'hospital',
        role: 'owner',
        tenantName: 'Regional Equine Hospital',
        description: 'Enterprise hospital with all features',
      },
      {
        email: 'admin@horsetrader.com',
        password: 'password123',
        tenantType: 'marketplace',
        role: 'owner',
        tenantName: 'HorseTrader Marketplace',
        description: 'Premium marketplace platform',
      },
      {
        email: 'ceo@globalequinesolutions.com',
        password: 'password123',
        tenantType: 'enterprise',
        role: 'owner',
        tenantName: 'Global Equine Solutions',
        description: 'Enterprise solution with complete feature set',
      }
    ];
  }
}

export const publicDemoService = new PublicDemoService();
