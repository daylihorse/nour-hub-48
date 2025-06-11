import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { AuthContext, User, Tenant, TenantUser, TenantSettings, TenantMetadata } from '@/types/tenant';
import type { User as SupabaseUser } from '@supabase/supabase-js';

const AuthContextProvider = createContext<AuthContext | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContextProvider);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [currentTenant, setCurrentTenant] = useState<Tenant | null>(null);
  const [availableTenants, setAvailableTenants] = useState<Tenant[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load user data and tenants from Supabase
  const loadUserData = async (supabaseUser: SupabaseUser) => {
    try {
      // Get user profile
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', supabaseUser.id)
        .single();

      if (profileError) {
        console.error('Error loading profile:', profileError);
        return;
      }

      // Get user's tenant memberships
      const { data: tenantUsers, error: tenantUsersError } = await supabase
        .from('tenant_users')
        .select('*')
        .eq('user_id', supabaseUser.id)
        .eq('status', 'active');

      if (tenantUsersError) {
        console.error('Error loading tenant users:', tenantUsersError);
        return;
      }

      // Get tenant details for user's memberships
      const tenantIds = tenantUsers.map(tu => tu.tenant_id);
      const { data: tenants, error: tenantsError } = await supabase
        .from('tenants')
        .select('*')
        .in('id', tenantIds);

      if (tenantsError) {
        console.error('Error loading tenants:', tenantsError);
        return;
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

      setUser(transformedUser);
      setAvailableTenants(transformedTenants);

      // Set current tenant from localStorage or first available
      const savedTenantId = localStorage.getItem('currentTenantId');
      const defaultTenant = savedTenantId 
        ? transformedTenants.find(t => t.id === savedTenantId) || transformedTenants[0]
        : transformedTenants[0];
      
      setCurrentTenant(defaultTenant || null);
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        loadUserData(session.user);
      }
      setIsLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          await loadUserData(session.user);
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setCurrentTenant(null);
          setAvailableTenants([]);
          localStorage.removeItem('currentTenantId');
        }
        setIsLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  const switchTenant = async (tenantId: string) => {
    const tenant = availableTenants.find(t => t.id === tenantId);
    if (tenant) {
      setCurrentTenant(tenant);
      localStorage.setItem('currentTenantId', tenantId);
    }
  };

  const hasPermission = (permission: string): boolean => {
    if (!user || !currentTenant) return false;
    const tenantUser = user.tenants.find(tu => tu.tenantId === currentTenant.id);
    return tenantUser?.permissions.includes('*') || tenantUser?.permissions.includes(permission) || false;
  };

  const hasRole = (role: string): boolean => {
    if (!user || !currentTenant) return false;
    const tenantUser = user.tenants.find(tu => tu.tenantId === currentTenant.id);
    return tenantUser?.role === role;
  };

  const value: AuthContext = {
    user,
    currentTenant,
    availableTenants,
    isLoading,
    login,
    logout,
    switchTenant,
    hasPermission,
    hasRole,
  };

  return (
    <AuthContextProvider.Provider value={value}>
      {children}
    </AuthContextProvider.Provider>
  );
};
