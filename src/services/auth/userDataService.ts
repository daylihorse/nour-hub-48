
export const userDataService = {
  loadUserData: async (authUser: any) => {
    // Mock user data loading
    const user = {
      id: authUser.id,
      email: authUser.email,
      name: authUser.name || 'Demo User',
      firstName: 'Demo',
      lastName: 'User',
      tenants: [{
        tenantId: 'tenant-1',
        role: 'owner',
        permissions: ['*']
      }]
    };

    const tenants = [{
      id: 'tenant-1',
      name: 'Demo Equine Facility',
      type: 'facility'
    }];

    return { user, tenants };
  }
};
