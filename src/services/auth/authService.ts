
export const authService = {
  login: async (email: string, password: string) => {
    // Mock login
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      data: { user: { id: '1', email, name: 'Demo User' } },
      error: null
    };
  },

  signUp: async (email: string, password: string, firstName?: string, lastName?: string) => {
    // Mock signup
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      data: { user: { id: '1', email, name: `${firstName} ${lastName}` } },
      error: null
    };
  },

  logout: async () => {
    return { error: null };
  },

  getSession: async () => {
    return {
      data: { session: null }
    };
  },

  onAuthStateChange: (callback: (event: string, session: any) => void) => {
    return {
      data: {
        subscription: {
          unsubscribe: () => {}
        }
      }
    };
  }
};
