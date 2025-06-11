
import { useState, useEffect } from 'react';
import { User, Tenant } from '@/types/tenant';
import { authService } from '@/services/auth/authService';
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
      if (accessMode === 'demo') {
        // In demo mode, start with the first demo account
        const demoAccounts = publicDemoService.getDemoAccounts();
        if (demoAccounts.length > 0) {
          const firstAccount = demoAccounts[0];
          const tenant = publicDemoService.createTenantFromDemoAccount(firstAccount);
          const user = publicDemoService.createUserFromDemoAccount(firstAccount, tenant);
          
          setUser(user);
          setCurrentTenant(tenant);
          setAvailableTenants([tenant]);
        }
        setIsLoading(false);
      } else {
        // Regular auth mode - get session from Supabase
        try {
          const { data: { session } } = await authService.getSession();
          if (session) {
            // Handle regular auth session
            // This would typically load user and tenant data from the database
            console.log('Regular auth session:', session);
          }
        } catch (error) {
          console.error('Auth initialization error:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    initializeAuth();

    // Listen for auth changes
    const { data: { subscription } } = authService.onAuthStateChange((event, session) => {
      console.log('Auth state changed:', event, session);
      if (accessMode !== 'demo') {
        // Handle regular auth state changes
        if (!session) {
          setUser(null);
          setCurrentTenant(null);
          setAvailableTenants([]);
        }
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, [accessMode]);

  const switchTenant = async (tenantId: string) => {
    if (accessMode === 'demo') {
      // In demo mode, find the tenant by ID and switch to it
      const tenant = availableTenants.find(t => t.id === tenantId);
      if (tenant) {
        setCurrentTenant(tenant);
      }
    } else {
      // Regular tenant switching logic would go here
      console.log('Regular tenant switch:', tenantId);
    }
  };

  // Function to handle demo account switching
  const switchDemoAccount = (account: any) => {
    if (accessMode === 'demo') {
      const tenant = publicDemoService.createTenantFromDemoAccount(account);
      const user = publicDemoService.createUserFromDemoAccount(account, tenant);
      
      setUser(user);
      setCurrentTenant(tenant);
      setAvailableTenants([tenant]);
      
      console.log('Switched to demo account:', account.tenantName);
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
