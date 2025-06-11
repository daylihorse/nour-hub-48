
import { supabase } from '@/integrations/supabase/client';
import { User, Tenant, TenantUser, TenantSettings, TenantMetadata } from '@/types/tenant';
import type { User as SupabaseUser } from '@supabase/supabase-js';

export const userDataService = {
  async loadUserData(supabaseUser: SupabaseUser): Promise<{
    user: User;
    tenants: Tenant[];
  }> {
    console.log('Loading user data for user ID:', supabaseUser.id);

    try {
      // Ensure profile exists first
      await this.ensureProfileExists(supabaseUser);

      // Get user profile with retry logic
      const profile = await this.getUserProfile(supabaseUser);
      console.log('Profile loaded:', profile);

      // Get user's tenant memberships with retry logic
      const tenantUsers = await this.getUserTenantMemberships(supabaseUser.id, supabaseUser.email);
      console.log('Tenant users loaded:', tenantUsers);

      if (!tenantUsers || tenantUsers.length === 0) {
        console.warn('No tenant associations found for user, ensuring they exist...');
        
        // Try to ensure tenant associations exist
        await this.ensureTenantAssociationsWithRetry(supabaseUser.email);
        
        // Retry getting tenant memberships
        const retryTenantUsers = await this.getUserTenantMemberships(supabaseUser.id, supabaseUser.email);
        
        if (!retryTenantUsers || retryTenantUsers.length === 0) {
          console.warn('Still no tenant associations found after retry');
          // Return user with empty tenants array
          const transformedUser: User = {
            id: profile.id,
            email: profile.email,
            firstName: profile.first_name,
            lastName: profile.last_name,
            avatar: profile.avatar,
            createdAt: new Date(profile.created_at),
            updatedAt: new Date(profile.updated_at),
            tenants: [],
          };

          return {
            user: transformedUser,
            tenants: []
          };
        }
        
        // Use the retry results
        return this.transformUserData(profile, retryTenantUsers);
      }

      return this.transformUserData(profile, tenantUsers);
    } catch (error) {
      console.error('Detailed error in loadUserData:', error);
      throw error;
    }
  },

  async ensureProfileExists(supabaseUser: SupabaseUser) {
    console.log('Ensuring profile exists for user:', supabaseUser.email);
    
    try {
      const firstName = supabaseUser.user_metadata?.first_name || '';
      const lastName = supabaseUser.user_metadata?.last_name || '';
      
      const { error } = await supabase.rpc('ensure_user_profile_exists', {
        p_user_id: supabaseUser.id,
        p_email: supabaseUser.email,
        p_first_name: firstName,
        p_last_name: lastName
      });
      
      if (error) {
        console.error('Error ensuring profile exists:', error);
      }
    } catch (error) {
      console.error('Exception ensuring profile exists:', error);
    }
  },

  async transformUserData(profile: any, tenantUsers: any[]) {
    // Get tenant details for user's memberships
    const tenantIds = tenantUsers.map(tu => tu.tenant_id);
    console.log('Fetching tenants for IDs:', tenantIds);
    
    const { data: tenants, error: tenantsError } = await supabase
      .from('tenants')
      .select('*')
      .in('id', tenantIds);

    if (tenantsError) {
      console.error('Error loading tenants:', tenantsError);
      throw tenantsError;
    }

    console.log('Tenants loaded:', tenants);

    // Transform data to match our types
    const transformedTenantUsers: TenantUser[] = tenantUsers.map(tu => ({
      id: tu.id,
      tenantId: tu.tenant_id,
      userId: tu.user_id,
      role: tu.role as any,
      permissions: tu.permissions || [],
      status: tu.status as any,
      joinedAt: new Date(tu.joined_at),
      lastLoginAt: tu.last_login_at ? new Date(tu.last_login_at) : undefined,
    }));

    // Create default settings and metadata with proper typing
    const defaultSettings: TenantSettings = {
      timezone: 'UTC',
      currency: 'USD',
      language: 'en',
      features: {
        horses: true,
        laboratory: true,
        clinic: true,
        pharmacy: true,
        marketplace: true,
        finance: true,
        hr: true,
        inventory: true,
        training: true,
        rooms: true,
        maintenance: true,
        messages: true,
      }
    };

    const defaultMetadata: TenantMetadata = {};

    const transformedTenants: Tenant[] = tenants.map(t => ({
      id: t.id,
      name: t.name,
      type: t.type as any,
      subscriptionTier: t.subscription_tier as any,
      status: t.status as any,
      createdAt: new Date(t.created_at),
      updatedAt: new Date(t.updated_at),
      settings: (typeof t.settings === 'object' && t.settings !== null) 
        ? { ...defaultSettings, ...t.settings as Partial<TenantSettings> }
        : defaultSettings,
      metadata: (typeof t.metadata === 'object' && t.metadata !== null) 
        ? { ...defaultMetadata, ...t.metadata as Partial<TenantMetadata> }
        : defaultMetadata,
    }));

    const transformedUser: User = {
      id: profile.id,
      email: profile.email,
      firstName: profile.first_name,
      lastName: profile.last_name,
      avatar: profile.avatar,
      createdAt: new Date(profile.created_at),
      updatedAt: new Date(profile.updated_at),
      tenants: transformedTenantUsers,
    };

    console.log('User data transformation complete:', {
      user: transformedUser,
      tenants: transformedTenants
    });

    return {
      user: transformedUser,
      tenants: transformedTenants
    };
  },

  async getUserProfile(supabaseUser: SupabaseUser, retryCount = 0): Promise<any> {
    console.log(`Fetching profile (attempt ${retryCount + 1})...`);
    
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', supabaseUser.id)
      .single();

    if (profileError) {
      if (profileError.code === 'PGRST116' && retryCount < 5) {
        // Profile doesn't exist, wait a bit and retry (for newly created users)
        console.log('Profile not found, retrying in 1000ms...');
        await new Promise(resolve => setTimeout(resolve, 1000));
        return this.getUserProfile(supabaseUser, retryCount + 1);
      }
      console.error('Error loading profile:', profileError);
      throw profileError;
    }

    return profile;
  },

  async getUserTenantMemberships(userId: string, email: string): Promise<any[]> {
    console.log('Fetching tenant users...');
    
    const { data: tenantUsers, error: tenantUsersError } = await supabase
      .from('tenant_users')
      .select('*')
      .eq('user_id', userId)
      .eq('status', 'active');

    if (tenantUsersError) {
      console.error('Error loading tenant users:', tenantUsersError);
      throw tenantUsersError;
    }

    return tenantUsers || [];
  },

  async ensureTenantAssociationsWithRetry(email: string, retryCount = 0): Promise<void> {
    console.log(`Ensuring tenant associations (attempt ${retryCount + 1}) for:`, email);
    
    try {
      const { error } = await supabase.rpc('ensure_all_sample_tenant_associations');
      if (error) {
        console.error('Error ensuring tenant associations:', error);
        if (retryCount < 2) {
          await new Promise(resolve => setTimeout(resolve, 1000));
          return this.ensureTenantAssociationsWithRetry(email, retryCount + 1);
        }
      } else {
        console.log('Sample tenant associations ensured');
      }
    } catch (error) {
      console.error('Exception ensuring tenant associations:', error);
      if (retryCount < 2) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return this.ensureTenantAssociationsWithRetry(email, retryCount + 1);
      }
    }
  }
};
