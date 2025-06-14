
import { useState, useEffect } from 'react';
import { User, Tenant } from '@/types/tenant';
import { authService } from '@/services/auth/authService';
import { userDataService } from '@/services/auth/userDataService';
import { useAccessMode } from '@/contexts/AccessModeContext';
import { publicDemoService } from '@/services/auth/publicDemoService';

export const useAuthState = () => {
  const { accessMode } = useAccessMode();
  const [user, setUser] = useState<User | null>(null);
  const [currentTenant, setCurrentTenant] = useState<Tenant | null>(null);
  const [availableTenants, setAvailableTenants] = useState<Tenant[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      console.log('useAuthState: Initializing auth with mode:', accessMode);
      
      if (accessMode === 'demo') {
        // In demo mode, start with the first demo account
        const demoAccounts = publicDemoService.getDemoAccounts();
        if (demoAccounts.length > 0) {
          const firstAccount = demoAccounts[0];
          const tenant = publicDemoService.createTenantFromDemoAccount(firstAccount);
          const user = publicDemoService.createUserFromDemoAccount(firstAccount, tenant);
          
          console.log('useAuthState: Setting up demo user:', user.email);
          setUser(user);
          setCurrentTenant(tenant);
          setAvailableTenants([tenant]);
        }
        setIsLoading(false);
      } else {
        // Regular auth mode - get session from mock auth service
        try {
          const { data: { session } } = await authService.getSession();
          if (session) {
            console.log('useAuthState: Found existing session:', session.user.email);
            await loadUserData(session.user);
          }
        } catch (error) {
          console.error('useAuthState: Auth initialization error:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    initializeAuth();

    // Listen for auth changes only in non-demo mode
    if (accessMode !== 'demo') {
      const { data: { subscription } } = authService.onAuthStateChange(async (event, session) => {
        console.log('useAuthState: Auth state changed:', event, session?.user?.email);
        if (session) {
          await loadUserData(session.user);
        } else {
          setUser(null);
          setCurrentTenant(null);
          setAvailableTenants([]);
        }
      });

      return () => {
        subscription?.unsubscribe();
      };
    }
  }, [accessMode]);

  const loadUserData = async (mockUser: any) => {
    try {
      setIsLoading(true);
      const { user, tenants } = await userDataService.loadUserData(mockUser);
      
      setUser(user);
      setAvailableTenants(tenants);
      
      if (tenants.length > 0) {
        setCurrentTenant(tenants[0]);
      }
    } catch (error) {
      console.error('useAuthState: Error loading user data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const switchTenant = async (tenantId: string) => {
    const tenant = availableTenants.find(t => t.id === tenantId);
    if (tenant) {
      setCurrentTenant(tenant);
    }
  };

  const switchDemoAccount = async (account: any) => {
    console.log('useAuthState: switchDemoAccount called with:', account);
    
    setIsLoading(true);
    try {
      const tenant = publicDemoService.createTenantFromDemoAccount(account);
      const user = publicDemoService.createUserFromDemoAccount(account, tenant);
      
      console.log('useAuthState: Created demo user and tenant:', user.email, tenant.name);
      setUser(user);
      setCurrentTenant(tenant);
      setAvailableTenants([tenant]);
      
      console.log('useAuthState: Demo account switched successfully:', account.tenantName);
    } catch (error) {
      console.error('useAuthState: Demo account switch error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    user,
    currentTenant,
    availableTenants,
    isLoading,
    switchTenant,
    switchDemoAccount,
    setIsLoading,
  };
};
