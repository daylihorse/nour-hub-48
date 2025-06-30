
import { supabase } from '@/integrations/supabase/client';
import { User } from '@/types/tenant';

export interface AuthenticationResult {
  isAuthenticated: boolean;
  user: User | null;
  tenantId: string | null;
  error?: string;
}

export class AuthenticationService {
  /**
   * Check if user is properly authenticated and has tenant access
   */
  static async checkAuthentication(): Promise<AuthenticationResult> {
    try {
      // Get current session
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) {
        console.error('Session error:', sessionError);
        return {
          isAuthenticated: false,
          user: null,
          tenantId: null,
          error: 'Failed to check authentication status'
        };
      }

      if (!session?.user) {
        return {
          isAuthenticated: false,
          user: null,
          tenantId: null,
          error: 'No active session found'
        };
      }

      // Get user profile
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (profileError && profileError.code !== 'PGRST116') {
        console.error('Profile error:', profileError);
        return {
          isAuthenticated: false,
          user: null,
          tenantId: null,
          error: 'Failed to load user profile'
        };
      }

      // Get user's tenant associations
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
            status
          )
        `)
        .eq('user_id', session.user.id)
        .eq('status', 'active');

      if (tenantError) {
        console.error('Tenant association error:', tenantError);
        return {
          isAuthenticated: false,
          user: null,
          tenantId: null,
          error: 'Failed to load tenant associations'
        };
      }

      if (!tenantUsers || tenantUsers.length === 0) {
        return {
          isAuthenticated: true,
          user: {
            id: session.user.id,
            email: session.user.email || '',
            first_name: profile?.first_name || session.user.user_metadata?.first_name || '',
            last_name: profile?.last_name || session.user.user_metadata?.last_name || '',
            firstName: profile?.first_name || session.user.user_metadata?.first_name || '',
            lastName: profile?.last_name || session.user.user_metadata?.last_name || '',
            avatar: profile?.avatar,
            created_at: profile?.created_at || session.user.created_at,
            updated_at: profile?.updated_at || session.user.updated_at || session.user.created_at,
            tenants: []
          },
          tenantId: null,
          error: 'No tenant associations found. Please contact your administrator.'
        };
      }

      // Use the first active tenant
      const firstTenant = tenantUsers[0];
      
      return {
        isAuthenticated: true,
        user: {
          id: session.user.id,
          email: session.user.email || '',
          first_name: profile?.first_name || session.user.user_metadata?.first_name || '',
          last_name: profile?.last_name || session.user.user_metadata?.last_name || '',
          firstName: profile?.first_name || session.user.user_metadata?.first_name || '',
          lastName: profile?.last_name || session.user.user_metadata?.last_name || '',
          avatar: profile?.avatar,
          created_at: profile?.created_at || session.user.created_at,
          updated_at: profile?.updated_at || session.user.updated_at || session.user.created_at,
          tenants: tenantUsers.map(tu => ({
            id: `tenant-user-${tu.tenant_id}`,
            tenant_id: tu.tenant_id,
            tenantId: tu.tenant_id,
            user_id: session.user.id,
            role: tu.role,
            permissions: tu.permissions || [],
            status: 'active' as const,
            joined_at: new Date().toISOString(),
          }))
        },
        tenantId: firstTenant.tenant_id,
      };

    } catch (error) {
      console.error('Authentication check failed:', error);
      return {
        isAuthenticated: false,
        user: null,
        tenantId: null,
        error: 'Authentication check failed'
      };
    }
  }

  /**
   * Create a demo tenant and user association for development
   */
  static async createDemoTenantAssociation(): Promise<AuthenticationResult> {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) {
        return {
          isAuthenticated: false,
          user: null,
          tenantId: null,
          error: 'No active session for demo setup'
        };
      }

      // Check if user already has tenant associations
      const { data: existingTenants } = await supabase
        .from('tenant_users')
        .select('tenant_id')
        .eq('user_id', session.user.id)
        .eq('status', 'active');

      if (existingTenants && existingTenants.length > 0) {
        // User already has tenant associations, return current auth status
        return await this.checkAuthentication();
      }

      // Create a demo tenant for this user
      const { data: tenant, error: tenantError } = await supabase
        .from('tenants')
        .insert([{
          name: `Demo Stable - ${session.user.email}`,
          type: 'stable',
          subscription_tier: 'basic',
          status: 'active',
          settings: {
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
          },
          metadata: {}
        }])
        .select()
        .single();

      if (tenantError) {
        console.error('Demo tenant creation error:', tenantError);
        return {
          isAuthenticated: false,
          user: null,
          tenantId: null,
          error: 'Failed to create demo tenant'
        };
      }

      // Associate user with the demo tenant
      const { error: associationError } = await supabase
        .from('tenant_users')
        .insert([{
          tenant_id: tenant.id,
          user_id: session.user.id,
          role: 'owner',
          permissions: ['*'],
          status: 'active',
          joined_at: new Date().toISOString()
        }]);

      if (associationError) {
        console.error('Demo tenant association error:', associationError);
        return {
          isAuthenticated: false,
          user: null,
          tenantId: null,
          error: 'Failed to associate user with demo tenant'
        };
      }

      // Return updated authentication status
      return await this.checkAuthentication();

    } catch (error) {
      console.error('Demo tenant setup failed:', error);
      return {
        isAuthenticated: false,
        user: null,
        tenantId: null,
        error: 'Demo tenant setup failed'
      };
    }
  }
}
