
import { useState, useEffect } from 'react';
import { User, Tenant } from '@/types/tenant';
import { publicDemoService } from '@/services/auth/publicDemoService';

export const usePublicAuthState = () => {
  const [user, setUser] = useState<User | null>(null);
  const [currentTenant, setCurrentTenant] = useState<Tenant | null>(null);
  const [availableTenants, setAvailableTenants] = useState<Tenant[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // In public mode, start with the first demo account
    const demoAccounts = publicDemoService.getDemoAccounts();
    if (demoAccounts.length > 0) {
      const firstAccount = demoAccounts[0];
      const tenant = publicDemoService.createTenantFromDemoAccount(firstAccount);
      const user = publicDemoService.createUserFromDemoAccount(firstAccount, tenant);
      
      setUser(user);
      setCurrentTenant(tenant);
      setAvailableTenants([tenant]);
    }
  }, []);

  const switchTenant = async (tenantId: string) => {
    const tenant = availableTenants.find(t => t.id === tenantId);
    if (tenant) {
      setCurrentTenant(tenant);
    }
  };

  const switchDemoAccount = async (account: any) => {
    setIsLoading(true);
    try {
      const tenant = publicDemoService.createTenantFromDemoAccount(account);
      const user = publicDemoService.createUserFromDemoAccount(account, tenant);
      
      setUser(user);
      setCurrentTenant(tenant);
      setAvailableTenants([tenant]);
      
      console.log('Public demo account switched successfully:', account.tenantName);
    } catch (error) {
      console.error('Public demo account switch error:', error);
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
