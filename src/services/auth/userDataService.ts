
import { supabase } from '@/integrations/supabase/client';
import { User, Tenant } from '@/types/tenant';

export const userDataService = {
  async loadUserData(authUser: any): Promise<{ user: User; tenants: Tenant[] }> {
    console.log('Loading user data for:', authUser.email);
    
    // Get user profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', authUser.id)
      .single();

    if (profileError) {
      console.error('Error loading profile:', profileError);
      // If profile doesn't exist, create it
      if (profileError.code === 'PGRST116') {
        await supabase.functions.invoke('ensure_user_profile_exists', {
          body: {
            user_id: authUser.id,
            email: authUser.email,
            first_name: authUser.user_metadata?.first_name || '',
            last_name: authUser.user_metadata?.last_name || ''
          }
        });
        
        // Try to get profile again
        const { data: newProfile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', authUser.id)
          .single();
        
        if (newProfile) {
          console.log('Profile created successfully');
        }
      }
    }

    // Get user's tenants
    const { data: tenantUsers, error: tenantError } = await supabase
      .from('tenant_users')
      .select(`
        tenant_id,
        role,
        permissions,
        tenants (
          id,
          name,
          type,
          subscription_tier,
          status,
          settings,
          metadata,
          created_at,
          updated_at
        )
      `)
      .eq('user_id', authUser.id)
      .eq('status', 'active');

    if (tenantError) {
      console.error('Error loading tenants:', tenantError);
      throw tenantError;
    }

    const tenants: Tenant[] = tenantUsers?.map((tu: any) => ({
      id: tu.tenants.id,
      name: tu.tenants.name,
      type: tu.tenants.type,
      subscription_tier: tu.tenants.subscription_tier,
      status: tu.tenants.status,
      settings: tu.tenants.settings,
      metadata: tu.tenants.metadata,
      user_role: tu.role,
      user_permissions: tu.permissions,
      created_at: tu.tenants.created_at,
      updated_at: tu.tenants.updated_at
    })) || [];

    const user: User = {
      id: authUser.id,
      email: authUser.email,
      first_name: profile?.first_name || authUser.user_metadata?.first_name || '',
      last_name: profile?.last_name || authUser.user_metadata?.last_name || '',
      avatar: profile?.avatar || null,
      created_at: profile?.created_at || authUser.created_at,
      updated_at: profile?.updated_at || authUser.updated_at,
      tenants: tenantUsers?.map((tu: any) => ({
        id: tu.id || this.generateId(),
        tenant_id: tu.tenant_id,
        user_id: authUser.id,
        role: tu.role,
        permissions: tu.permissions,
        status: 'active',
        joined_at: new Date().toISOString(),
        tenantId: tu.tenant_id
      })) || []
    };

    console.log('User data loaded successfully:', { user, tenants: tenants.length });
    return { user, tenants };
  },

  generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
};
