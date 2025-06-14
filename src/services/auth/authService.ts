
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

  // Alternative method name for compatibility
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

  // Alternative method name for compatibility
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

  // Create sample user if not exists (for dev purposes)
  async createSampleUserIfNotExists(email: string, password: string, firstName?: string, lastName?: string) {
    // First try to sign up
    const { data, error } = await this.signUp(email, password, firstName, lastName);
    
    // If user already exists, that's fine - they can just login
    if (error && error.message.includes('User already registered')) {
      console.log(`User ${email} already exists`);
      return { data: null, error: null };
    }
    
    return { data, error };
  }
};
