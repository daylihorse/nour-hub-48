
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
  const loadUserData = async (supabaseUser: any, retryCount = 0) => {
    try {
      console.log(`Loading user data for: ${supabaseUser.email} (attempt ${retryCount + 1})`);
      setIsLoading(true);
      
      const { user: transformedUser, tenants: transformedTenants } = await userDataService.loadUserData(supabaseUser);

      console.log('Loaded user:', transformedUser);
      console.log('Loaded tenants:', transformedTenants);

      setUser(transformedUser);
      setAvailableTenants(transformedTenants);

      // Set current tenant
      const defaultTenant = tenantService.getCurrentTenant(transformedTenants);
      console.log('Setting current tenant:', defaultTenant);
      setCurrentTenant(defaultTenant);
      
      setIsLoading(false);
    } catch (error) {
      console.error(`Error loading user data (attempt ${retryCount + 1}):`, error);
      
      // Retry logic for newly created users (profile might not exist yet)
      if (retryCount < 3) {
        console.log(`Retrying user data load in ${(retryCount + 1) * 1500}ms...`);
        setTimeout(() => {
          loadUserData(supabaseUser, retryCount + 1);
        }, (retryCount + 1) * 1500);
        return;
      }
      
      // Clear state on final error and stop loading
      console.log('Failed to load user data after retries, clearing auth state');
      setUser(null);
      setCurrentTenant(null);
      setAvailableTenants([]);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        // Get initial session
        const { data: { session }, error } = await authService.getSession();
        
        if (error) {
          console.error('Failed to get initial session:', error);
          if (mounted) setIsLoading(false);
          return;
        }

        console.log('Initial session check:', session);
        if (session?.user && mounted) {
          await loadUserData(session.user);
        } else if (mounted) {
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Auth initialization failed:', error);
        if (mounted) setIsLoading(false);
      }
    };

    initializeAuth();

    // Listen for auth changes with error handling
    let subscription: any = null;
    try {
      const { data } = authService.onAuthStateChange(
        async (event, session) => {
          if (!mounted) return;
          
          console.log('Auth state change:', event, session);
          if (event === 'SIGNED_IN' && session?.user) {
            await loadUserData(session.user);
          } else if (event === 'SIGNED_OUT') {
            console.log('User signed out, clearing state');
            setUser(null);
            setCurrentTenant(null);
            setAvailableTenants([]);
            tenantService.clearCurrentTenant();
            setIsLoading(false);
          }
        }
      );
      subscription = data?.subscription;
    } catch (error) {
      console.error('Failed to setup auth state listener:', error);
      if (mounted) setIsLoading(false);
    }

    return () => {
      mounted = false;
      if (subscription?.unsubscribe) {
        subscription.unsubscribe();
      }
    };
  }, []);

  const switchTenant = async (tenantId: string) => {
    const tenant = availableTenants.find(t => t.id === tenantId);
    if (tenant) {
      console.log('Switching to tenant:', tenant);
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
    setIsLoading,
  };
};
