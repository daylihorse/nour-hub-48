
export const authService = {
  login: async (email: string, password: string) => {
    console.log('Demo login:', email);
    return { data: { user: { email } }, error: null };
  },
  
  signUp: async (email: string, password: string, firstName?: string, lastName?: string) => {
    console.log('Demo signup:', email);
    return { data: { user: { email, firstName, lastName } }, error: null };
  },
  
  logout: async () => {
    console.log('Demo logout');
    return { error: null };
  },
  
  getSession: async () => {
    return { data: { session: null } };
  },
  
  onAuthStateChange: (callback: any) => {
    return { data: { subscription: { unsubscribe: () => {} } } };
  },
  
  getCurrentUser: async () => {
    return { id: 'demo-user', email: 'demo@example.com' };
  },
  
  createSampleUserIfNotExists: async (email: string, password: string) => {
    console.log('Creating sample user:', email);
    return Promise.resolve();
  }
};
