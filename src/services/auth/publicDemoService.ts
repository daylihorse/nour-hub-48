
export const publicDemoService = {
  getDemoAccounts: () => [
    {
      email: 'demo@horseranch.com',
      password: 'demo123',
      tenantName: 'Sunset Horse Ranch',
      tenantType: 'ranch',
      role: 'owner'
    },
    {
      email: 'demo@vetclinic.com',
      password: 'demo123',
      tenantName: 'Equine Veterinary Clinic',
      tenantType: 'clinic',
      role: 'veterinarian'
    }
  ],
  
  createTenantFromDemoAccount: (account: any) => ({
    id: `tenant-${account.tenantType}`,
    name: account.tenantName,
    type: account.tenantType
  }),
  
  createUserFromDemoAccount: (account: any, tenant: any) => ({
    id: `user-${account.role}`,
    email: account.email,
    firstName: 'Demo',
    lastName: 'User',
    role: account.role
  })
};
