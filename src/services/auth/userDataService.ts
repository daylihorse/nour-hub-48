
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
      // Get user profile
      console.log('Fetching profile...');
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', supabaseUser.id)
        .single();

      if (profileError) {
        console.error('Error loading profile:', profileError);
        throw profileError;
      }

      console.log('Profile loaded:', profile);

      // Get user's tenant memberships
      console.log('Fetching tenant users...');
      const { data: tenantUsers, error: tenantUsersError } = await supabase
        .from('tenant_users')
        .select('*')
        .eq('user_id', supabaseUser.id)
        .eq('status', 'active');

      if (tenantUsersError) {
        console.error('Error loading tenant users:', tenantUsersError);
        throw tenantUsersError;
      }

      console.log('Tenant users loaded:', tenantUsers);

      if (!tenantUsers || tenantUsers.length === 0) {
        console.warn('No tenant associations found for user, attempting to create association');
        
        // Try to create tenant association based on email
        await this.createTenantAssociationIfNeeded(supabaseUser.email, supabaseUser.id);
        
        // Retry fetching tenant users
        const { data: retryTenantUsers } = await supabase
          .from('tenant_users')
          .select('*')
          .eq('user_id', supabaseUser.id)
          .eq('status', 'active');
        
        if (!retryTenantUsers || retryTenantUsers.length === 0) {
          console.warn('Still no tenant associations found after creation attempt');
          // Return user with empty tenants array instead of throwing error
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
        
        // Use the retry results if they exist
        tenantUsers.push(...(retryTenantUsers || []));
      }

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
    } catch (error) {
      console.error('Detailed error in loadUserData:', error);
      throw error;
    }
  },

  async createTenantAssociationIfNeeded(email: string, userId: string) {
    console.log('Attempting to create tenant association for:', email);
    
    // Define the email to tenant mapping
    const emailTenantMap: Record<string, { tenantId: string; role: string; permissions: string[] }> = {
      'owner@eliteequestrian.com': {
        tenantId: '550e8400-e29b-41d4-a716-446655440001',
        role: 'owner',
        permissions: ['*']
      },
      'manager@eliteequestrian.com': {
        tenantId: '550e8400-e29b-41d4-a716-446655440001',
        role: 'manager',
        permissions: ['horses:read', 'horses:write', 'inventory:read', 'inventory:write', 'finance:read']
      },
      'owner@sunsetstables.com': {
        tenantId: '550e8400-e29b-41d4-a716-446655440002',
        role: 'owner',
        permissions: ['*']
      },
      'director@advancedvetclinic.com': {
        tenantId: '550e8400-e29b-41d4-a716-446655440003',
        role: 'owner',
        permissions: ['*']
      },
      'director@equinediagnostics.com': {
        tenantId: '550e8400-e29b-41d4-a716-446655440004',
        role: 'owner',
        permissions: ['*']
      },
      'admin@regionalequinehospital.com': {
        tenantId: '550e8400-e29b-41d4-a716-446655440005',
        role: 'owner',
        permissions: ['*']
      },
      'admin@horsetrader.com': {
        tenantId: '550e8400-e29b-41d4-a716-446655440006',
        role: 'owner',
        permissions: ['*']
      },
      'ceo@globalequinesolutions.com': {
        tenantId: '550e8400-e29b-41d4-a716-446655440007',
        role: 'owner',
        permissions: ['*']
      }
    };

    const association = emailTenantMap[email];
    if (!association) {
      console.log('No predefined tenant association for email:', email);
      return;
    }

    try {
      const { error } = await supabase
        .from('tenant_users')
        .insert({
          tenant_id: association.tenantId,
          user_id: userId,
          role: association.role,
          permissions: association.permissions,
          status: 'active',
          joined_at: new Date().toISOString()
        });

      if (error) {
        console.error('Error creating tenant association:', error);
      } else {
        console.log('Successfully created tenant association for:', email);
      }
    } catch (error) {
      console.error('Exception creating tenant association:', error);
    }
  }
};
