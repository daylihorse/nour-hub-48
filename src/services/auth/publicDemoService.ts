
export const publicDemoService = {
  getDemoAccounts: () => [
    {
      tenantName: 'Al Shaqab Racing',
      tenantType: 'racing',
      email: 'admin@alshaqab.qa',
      password: 'demo123',
      role: 'owner'
    },
    {
      tenantName: 'Desert Rose Stables',
      tenantType: 'training',
      email: 'manager@desertroses.com',
      password: 'demo123',
      role: 'manager'
    },
    {
      tenantName: 'Emirates Equestrian',
      tenantType: 'facility',
      email: 'owner@emirateseq.ae',
      password: 'demo123',
      role: 'owner'
    }
  ],

  createPublicUser: () => ({
    id: 'public-user',
    email: 'public@demo.com',
    name: 'Public User',
    firstName: 'Public',
    lastName: 'User',
    tenants: []
  }),

  createPublicTenant: () => ({
    id: 'public-tenant',
    name: 'Public Demo Facility',
    type: 'facility'
  }),

  createTenantFromDemoAccount: (account: any) => ({
    id: `tenant-${account.tenantName.toLowerCase().replace(/\s+/g, '-')}`,
    name: account.tenantName,
    type: account.tenantType
  }),

  createUserFromDemoAccount: (account: any, tenant: any) => ({
    id: 'demo-user',
    email: account.email,
    name: 'Demo User',
    firstName: 'Demo',
    lastName: 'User',
    tenants: [{
      tenantId: tenant.id,
      role: account.role,
      permissions: ['*']
    }]
  })
};
