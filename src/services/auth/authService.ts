
import { supabase } from '@/integrations/supabase/client';

export const authService = {
  async signInWithPassword(email: string, password: string) {
    console.log('Attempting to sign in with:', email);
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Sign in error:', error);
      throw error;
    }

    console.log('Sign in successful:', data.user?.email);
    return { data, error };
  },

  async signUp(email: string, password: string, metadata?: any) {
    console.log('Attempting to sign up with:', email);
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata,
        emailRedirectTo: undefined // Disable email confirmation for dev
      }
    });

    if (error) {
      console.error('Sign up error:', error);
      throw error;
    }

    console.log('Sign up successful:', data.user?.email);
    return { data, error };
  },

  async signOut() {
    console.log('Signing out user');
    
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      console.error('Sign out error:', error);
      throw error;
    }

    console.log('Sign out successful');
    return { error };
  },

  async getSession() {
    return await supabase.auth.getSession();
  },

  onAuthStateChange(callback: (event: any, session: any) => void) {
    return supabase.auth.onAuthStateChange(callback);
  },

  async getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  },

  async createSampleUserIfNotExists(email: string, password: string, firstName: string, lastName: string) {
    console.log('Creating sample user if not exists:', email);
    
    // First try to sign in
    try {
      const { data, error } = await this.signInWithPassword(email, password);
      if (!error && data.user) {
        console.log('Sample user already exists and can sign in:', email);
        return { data, error: null };
      }
    } catch (signInError) {
      console.log('Sample user does not exist or cannot sign in, creating:', email);
    }
    
    // If sign in failed, try to create the user
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
  }
};
