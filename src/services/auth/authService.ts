
import { mockAuthService } from './mockAuthService';

export const authService = {
  async signInWithPassword(email: string, password: string) {
    console.log('Attempting to sign in with:', email);
    
    try {
      const { data, error } = await mockAuthService.signInWithPassword(email, password);

      if (error) {
        console.error('Sign in error:', error);
        throw error;
      }

      console.log('Sign in successful:', data.user?.email);
      return { data, error };
    } catch (error) {
      console.error('Authentication error:', error);
      throw error;
    }
  },

  async signUp(email: string, password: string, metadata?: any) {
    console.log('Attempting to sign up with:', email);
    
    try {
      const { data, error } = await mockAuthService.signUp(email, password, {
        data: metadata
      });

      if (error) {
        console.error('Sign up error:', error);
        throw error;
      }

      console.log('Sign up successful:', data.user?.email);
      return { data, error };
    } catch (error) {
      console.error('Authentication error during signup:', error);
      throw error;
    }
  },

  async signOut() {
    console.log('Signing out user');
    
    try {
      const { error } = await mockAuthService.signOut();
      
      if (error) {
        console.error('Sign out error:', error);
        throw error;
      }

      console.log('Sign out successful');
      return { error };
    } catch (error) {
      console.error('Authentication error during signout:', error);
      return { error: null };
    }
  },

  async getSession() {
    try {
      return await mockAuthService.getSession();
    } catch (error) {
      console.error('Failed to get session:', error);
      return { data: { session: null }, error };
    }
  },

  onAuthStateChange(callback: (event: any, session: any) => void) {
    try {
      return mockAuthService.onAuthStateChange(callback);
    } catch (error) {
      console.error('Failed to listen to auth changes:', error);
      return {
        data: {
          subscription: {
            unsubscribe: () => console.log('Mock auth subscription unsubscribed')
          }
        }
      };
    }
  },

  async getCurrentUser() {
    try {
      const { data: { user } } = await mockAuthService.getUser();
      return user;
    } catch (error) {
      console.error('Failed to get current user:', error);
      return null;
    }
  },

  async ensureUserProfile(user: any, metadata?: any) {
    console.log('Mock: User profile ensured for:', user.email);
    return Promise.resolve();
  },

  async createSampleUserIfNotExists(email: string, password: string, firstName: string, lastName: string) {
    console.log('Creating sample user if not exists:', email);
    
    try {
      const { data, error } = await this.signInWithPassword(email, password);
      if (!error && data.user) {
        console.log('Sample user already exists and can sign in:', email);
        return { data, error: null };
      }
    } catch (signInError) {
      console.log('Sample user does not exist or cannot sign in, creating:', email);
    }
    
    try {
      const { data, error } = await this.signUp(email, password, {
        first_name: firstName,
        last_name: lastName
      });
      
      if (error) {
        console.error('Error creating sample user:', error);
        throw error;
      }
      
      console.log('Sample user created successfully:', email);
      return { data, error };
    } catch (createError) {
      console.error('Failed to create sample user:', createError);
      throw createError;
    }
  },

  async ensureTenantAssociations(email: string) {
    console.log('Mock: Tenant associations ensured for:', email);
    return Promise.resolve();
  }
};
