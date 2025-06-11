
import { supabase } from '@/integrations/supabase/client';
import { User, Tenant, TenantUser, TenantSettings, TenantMetadata } from '@/types/tenant';
import type { User as SupabaseUser } from '@supabase/supabase-js';

export const userDataService = {
  async loadUserData(supabaseUser: SupabaseUser): Promise<{
    user: User;
    tenants: Tenant[];
  }> {
    // Get user profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', supabaseUser.id)
      .single();

    if (profileError) {
      console.error('Error loading profile:', profileError);
      throw profileError;
    }

    // Get user's tenant memberships
    const { data: tenantUsers, error: tenantUsersError } = await supabase
      .from('tenant_users')
      .select('*')
      .eq('user_id', supabaseUser.id)
      .eq('status', 'active');

    if (tenantUsersError) {
      console.error('Error loading tenant users:', tenantUsersError);
      throw tenantUsersError;
    }

    // Get tenant details for user's memberships
    const tenantIds = tenantUsers.map(tu => tu.tenant_id);
    const { data: tenants, error: tenantsError } = await supabase
      .from('tenants')
      .select('*')
      .in('id', tenantIds);

    if (tenantsError) {
      console.error('Error loading tenants:', tenantsError);
      throw tenantsError;
    }

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

    return {
      user: transformedUser,
      tenants: transformedTenants
    };
  },
};
