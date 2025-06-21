
export interface SampleAccount {
  email: string;
  password: string;
  role: string;
  tenantName: string;
  tenantType: string;
}

export const sampleAccounts: SampleAccount[] = [
  {
    email: 'demo@horseranch.com',
    password: 'demo123',
    role: 'owner',
    tenantName: 'Sunset Horse Ranch',
    tenantType: 'ranch'
  },
  {
    email: 'demo@vetclinic.com',
    password: 'demo123',
    role: 'veterinarian',
    tenantName: 'Equine Veterinary Clinic',
    tenantType: 'clinic'
  }
];
