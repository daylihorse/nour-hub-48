
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
    
    // Immediately ensure profile exists for the new user
    if (data.user && !error) {
      await this.ensureUserProfile(data.user, metadata);
    }
    
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

  async ensureUserProfile(user: any, metadata?: any) {
    console.log('Ensuring user profile exists for:', user.email);
    
    try {
      const firstName = metadata?.first_name || user.user_metadata?.first_name || '';
      const lastName = metadata?.last_name || user.user_metadata?.last_name || '';
      
      const { error } = await supabase.rpc('ensure_user_profile_exists', {
        p_user_id: user.id,
        p_email: user.email,
        p_first_name: firstName,
        p_last_name: lastName
      });
      
      if (error) {
        console.error('Error ensuring user profile:', error);
      } else {
        console.log('User profile ensured for:', user.email);
      }
    } catch (error) {
      console.error('Exception ensuring user profile:', error);
    }
  },

  async createSampleUserIfNotExists(email: string, password: string, firstName: string, lastName: string) {
    console.log('Creating sample user if not exists:', email);
    
    // First try to sign in to check if user exists
    try {
      const { data, error } = await this.signInWithPassword(email, password);
      if (!error && data.user) {
        console.log('Sample user already exists and can sign in:', email);
        
        // Ensure profile and tenant associations exist
        await this.ensureUserProfile(data.user, { first_name: firstName, last_name: lastName });
        await this.ensureTenantAssociations(email);
        
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
      
      // Wait a moment then ensure tenant associations
      setTimeout(async () => {
        await this.ensureTenantAssociations(email);
      }, 1500);
      
      return { data, error };
    } catch (createError) {
      console.error('Failed to create sample user:', createError);
      throw createError;
    }
  },

  async ensureTenantAssociations(email: string) {
    console.log('Ensuring tenant associations for:', email);
    
    try {
      // Call the database function to ensure all sample tenant associations exist
      const { error } = await supabase.rpc('ensure_all_sample_tenant_associations');
      
      if (error) {
        console.error('Error ensuring tenant associations:', error);
      } else {
        console.log('Tenant associations ensured for:', email);
      }
    } catch (error) {
      console.error('Exception ensuring tenant associations:', error);
    }
  }
};
