
import { supabase } from '@/integrations/supabase/client';
import type { User as SupabaseUser } from '@supabase/supabase-js';

export const authService = {
  async signInWithPassword(email: string, password: string) {
    return await supabase.auth.signInWithPassword({
      email,
      password,
    });
  },

  async signOut() {
    return await supabase.auth.signOut();
  },

  async getSession() {
    return await supabase.auth.getSession();
  },

  onAuthStateChange(callback: (event: string, session: any) => void) {
    return supabase.auth.onAuthStateChange(callback);
  },
};
