
export interface SampleAccount {
  email: string;
  password: string;
  tenantType: string;
  role: string;
  tenantId: string;
  tenantName: string;
  description: string;
  firstName: string;
  lastName: string;
}

export const sampleAccounts: SampleAccount[] = [
  {
    email: 'owner@eliteequestrian.com',
    password: 'password123',
    tenantType: 'stable',
    role: 'owner',
    tenantId: '550e8400-e29b-41d4-a716-446655440001',
    tenantName: 'Elite Equestrian Center',
    description: 'Premium stable with full features enabled',
    firstName: 'Elite',
    lastName: 'Owner'
  },
  {
    email: 'manager@eliteequestrian.com',
    password: 'password123',
    tenantType: 'stable',
    role: 'manager',
    tenantId: '550e8400-e29b-41d4-a716-446655440001',
    tenantName: 'Elite Equestrian Center',
    description: 'Manager with limited permissions',
    firstName: 'Elite',
    lastName: 'Manager'
  },
  {
    email: 'owner@sunsetstables.com',
    password: 'password123',
    tenantType: 'stable',
    role: 'owner',
    tenantId: '550e8400-e29b-41d4-a716-446655440002',
    tenantName: 'Sunset Stables',
    description: 'Basic stable with essential features only',
    firstName: 'Sunset',
    lastName: 'Owner'
  },
  {
    email: 'director@advancedvetclinic.com',
    password: 'password123',
    tenantType: 'clinic',
    role: 'owner',
    tenantId: '550e8400-e29b-41d4-a716-446655440003',
    tenantName: 'Advanced Veterinary Clinic',
    description: 'Professional clinic with medical features',
    firstName: 'Clinic',
    lastName: 'Director'
  },
  {
    email: 'director@equinediagnostics.com',
    password: 'password123',
    tenantType: 'laboratory',
    role: 'owner',
    tenantId: '550e8400-e29b-41d4-a716-446655440004',
    tenantName: 'Equine Diagnostics Lab',
    description: 'Professional laboratory with diagnostic tools',
    firstName: 'Lab',
    lastName: 'Director'
  },
  {
    email: 'admin@regionalequinehospital.com',
    password: 'password123',
    tenantType: 'hospital',
    role: 'owner',
    tenantId: '550e8400-e29b-41d4-a716-446655440005',
    tenantName: 'Regional Equine Hospital',
    description: 'Enterprise hospital with all features',
    firstName: 'Hospital',
    lastName: 'Admin'
  },
  {
    email: 'admin@horsetrader.com',
    password: 'password123',
    tenantType: 'marketplace',
    role: 'owner',
    tenantId: '550e8400-e29b-41d4-a716-446655440006',
    tenantName: 'HorseTrader Marketplace',
    description: 'Premium marketplace platform',
    firstName: 'Marketplace',
    lastName: 'Admin'
  },
  {
    email: 'ceo@globalequinesolutions.com',
    password: 'password123',
    tenantType: 'enterprise',
    role: 'owner',
    tenantId: '550e8400-e29b-41d4-a716-446655440007',
    tenantName: 'Global Equine Solutions',
    description: 'Enterprise solution with complete feature set',
    firstName: 'Global',
    lastName: 'CEO'
  }
];
