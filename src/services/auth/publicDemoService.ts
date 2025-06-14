
import { User, Tenant, TenantUser } from '@/types/tenant';

class PublicDemoService {
  createPublicUser(): User {
    const publicUser: User = {
      id: 'public-user-id',
      email: 'demo@dailyhorse.com',
      first_name: 'Demo',
      last_name: 'User',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      tenants: [{
        id: 'public-tenant-user-id',
        tenant_id: 'public-tenant-id',
        user_id: 'public-user-id',
        role: 'owner',
        permissions: ['*'],
        status: 'active',
        joined_at: new Date().toISOString(),
        tenantId: 'public-tenant-id',
      }],
    };
    return publicUser;
  }

  createPublicTenant(): Tenant {
    const publicTenant: Tenant = {
      id: 'public-tenant-id',
      name: 'Public Demo - Elite Equestrian Center',
      type: 'stable',
      subscription_tier: 'premium',
      status: 'active',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
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

  // Method to create a tenant from demo account data
  createTenantFromDemoAccount(account: any): Tenant {
    const baseId = account.email.split('@')[0];
    
    return {
      id: `${baseId}-tenant-id`,
      name: account.tenantName,
      type: account.tenantType,
      subscription_tier: this.getSubscriptionTierForType(account.tenantType),
      status: 'active',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      settings: {
        timezone: 'UTC',
        currency: 'USD',
        language: 'en',
        features: this.getFeaturesForType(account.tenantType),
      },
      metadata: this.getMetadataForType(account.tenantType, account.tenantName),
    };
  }

  // Method to create a user from demo account data
  createUserFromDemoAccount(account: any, tenant: Tenant): User {
    const baseId = account.email.split('@')[0];
    const [firstName, ...lastNameParts] = account.description.split(' ');
    
    return {
      id: `${baseId}-user-id`,
      email: account.email,
      first_name: firstName || 'Demo',
      last_name: lastNameParts.join(' ') || 'User',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      tenants: [{
        id: `${baseId}-tenant-user-id`,
        tenant_id: tenant.id,
        user_id: `${baseId}-user-id`,
        role: account.role,
        permissions: ['*'],
        status: 'active',
        joined_at: new Date().toISOString(),
        tenantId: tenant.id,
      }],
    };
  }

  private getSubscriptionTierForType(type: string) {
    switch (type) {
      case 'stable': return 'premium';
      case 'clinic': return 'professional';
      case 'laboratory': return 'professional';
      case 'hospital': return 'enterprise';
      case 'marketplace': return 'premium';
      case 'enterprise': return 'enterprise';
      default: return 'basic';
    }
  }

  private getFeaturesForType(type: string) {
    const baseFeatures = {
      horses: true,
      laboratory: false,
      clinic: false,
      pharmacy: false,
      marketplace: false,
      finance: true,
      hr: true,
      inventory: true,
      training: true,
      rooms: true,
      maintenance: true,
      messages: true,
    };

    switch (type) {
      case 'stable':
        return { ...baseFeatures, horses: true, training: true, rooms: true };
      case 'clinic':
        return { ...baseFeatures, clinic: true, pharmacy: true, laboratory: true };
      case 'laboratory':
        return { ...baseFeatures, laboratory: true, clinic: true };
      case 'hospital':
        return { ...baseFeatures, clinic: true, pharmacy: true, laboratory: true, hr: true };
      case 'marketplace':
        return { ...baseFeatures, marketplace: true, inventory: true, finance: true };
      case 'enterprise':
        return {
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
        };
      default:
        return baseFeatures;
    }
  }

  private getMetadataForType(type: string, name: string) {
    return {
      address: {
        street: '123 Demo Street',
        city: 'Demo City',
        state: 'Demo State',
        zipCode: '12345',
        country: 'USA'
      },
      contact: {
        phone: '+1 (555) 123-4567',
        email: `info@${name.toLowerCase().replace(/\s+/g, '-')}.com`,
        website: `https://${name.toLowerCase().replace(/\s+/g, '-')}.com`
      }
    };
  }
}

export const publicDemoService = new PublicDemoService();
