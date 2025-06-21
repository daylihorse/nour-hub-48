
export const userDataService = {
  loadUserData: async (authUser: any) => {
    return {
      user: {
        id: authUser.id,
        email: authUser.email,
        firstName: 'Demo',
        lastName: 'User'
      },
      tenants: [{
        id: 'demo-tenant',
        name: 'Demo Tenant',
        type: 'demo'
      }]
    };
  }
};
