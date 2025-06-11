
import { useState, useEffect } from 'react';
import { User, Tenant } from '@/types/tenant';
import { authService } from '@/services/auth/authService';
import { userDataService } from '@/services/auth/userDataService';
import { tenantService } from '@/services/auth/tenantService';

export const useAuthState = () => {
  const [user, setUser] = useState<User | null>(null);
  const [currentTenant, setCurrentTenant] = useState<Tenant | null>(null);
  const [availableTenants, setAvailableTenants] = useState<Tenant[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load user data and tenants from Supabase
  const loadUserData = async (supabaseUser: any) => {
    try {
      const { user: transformedUser, tenants: transformedTenants } = await userDataService.loadUserData(supabaseUser);

      setUser(transformedUser);
      setAvailableTenants(transformedTenants);

      // Set current tenant
      const defaultTenant = tenantService.getCurrentTenant(transformedTenants);
      setCurrentTenant(defaultTenant);
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  useEffect(() => {
    // Get initial session
    authService.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        loadUserData(session.user);
      }
      setIsLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = authService.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          await loadUserData(session.user);
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setCurrentTenant(null);
          setAvailableTenants([]);
          tenantService.clearCurrentTenant();
        }
        setIsLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const switchTenant = async (tenantId: string) => {
    const tenant = availableTenants.find(t => t.id === tenantId);
    if (tenant) {
      setCurrentTenant(tenant);
      tenantService.setCurrentTenant(tenantId);
    }
  };

  return {
    user,
    currentTenant,
    availableTenants,
    isLoading,
    switchTenant,
  };
};
