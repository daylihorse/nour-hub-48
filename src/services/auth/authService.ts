
import { supabase } from '@/integrations/supabase/client';
import type { User, Session } from '@supabase/supabase-js';

export const authService = {
  // Get current session
  async getSession() {
    return await supabase.auth.getSession();
  },

  // Login with email and password
  async login(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  },

  // Sign in with password (alias for login)
  async signInWithPassword(email: string, password: string) {
    return this.login(email, password);
  },

  // Sign up with email and password
  async signUp(email: string, password: string, firstName?: string, lastName?: string) {
    const redirectUrl = `${window.location.origin}/dashboard`;
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          first_name: firstName || '',
          last_name: lastName || '',
        }
      }
    });
    return { data, error };
  },

  // Logout
  async logout() {
    const { error } = await supabase.auth.signOut();
    return { error };
  },

  // Sign out (alias for logout)
  async signOut() {
    return this.logout();
  },

  // Listen to auth state changes
  onAuthStateChange(callback: (event: string, session: Session | null) => void) {
    return supabase.auth.onAuthStateChange(callback);
  },

  // Get current user
  async getCurrentUser(): Promise<User | null> {
    const { data: { session } } = await supabase.auth.getSession();
    return session?.user || null;
  },

  // Create sample user if not exists (for dev login)
  async createSampleUserIfNotExists(email: string, password: string) {
    try {
      const { data, error } = await this.signUp(email, password);
      return { data, error };
    } catch (error) {
      console.error('Error creating sample user:', error);
      return { data: null, error };
    }
  }
};
