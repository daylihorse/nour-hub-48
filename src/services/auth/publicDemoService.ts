
import { mockTenantService } from './mockTenantService';

export interface DemoAccount {
  email: string;
  password: string;
  role: string;
  tenantName: string;
  tenantType: string;
  description?: string;
}

class PublicDemoService {
  private demoAccounts: DemoAccount[] = [
    {
      email: 'owner@eliteequestrian.com',
      password: 'password123',
      role: 'owner',
      tenantName: 'Elite Equestrian Center',
      tenantType: 'stable',
      description: 'Premium stable with all features enabled'
    },
    {
      email: 'director@advancedvetclinic.com',
      password: 'password123',
      role: 'owner',
      tenantName: 'Advanced Veterinary Clinic',
      tenantType: 'clinic',
      description: 'Professional veterinary clinic'
    },
    {
      email: 'director@equinediagnostics.com',
      password: 'password123',
      role: 'owner',
      tenantName: 'Equine Diagnostics Lab',
      tenantType: 'laboratory',
      description: 'Specialized diagnostic laboratory'
    },
    {
      email: 'admin@regionalequinehospital.com',
      password: 'password123',
      role: 'owner',
      tenantName: 'Regional Equine Hospital',
      tenantType: 'hospital',
      description: 'Full-service equine hospital with all features'
    },
    {
      email: 'admin@horsetrader.com',
      password: 'password123',
      role: 'owner',
      tenantName: 'HorseTrader Marketplace',
      tenantType: 'marketplace',
      description: 'Horse trading marketplace platform'
    }
  ];

  getDemoAccounts(): DemoAccount[] {
    return this.demoAccounts;
  }

  async getDemoTenantForAccount(email: string) {
    const { tenants } = await mockTenantService.getUserTenants(email);
    return tenants[0] || null;
  }

  getRandomDemoAccount(): DemoAccount {
    const randomIndex = Math.floor(Math.random() * this.demoAccounts.length);
    return this.demoAccounts[randomIndex];
  }
}

export const publicDemoService = new PublicDemoService();
