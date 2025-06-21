
import { useState, useEffect } from 'react';
import { User, Tenant } from '@/types/tenant';
import { publicDemoService } from '@/services/auth/publicDemoService';
import { useAccessMode } from '@/contexts/AccessModeContext';

export const usePublicAuthState = () => {
  const { accessMode } = useAccessMode();
  const [user, setUser] = useState<User | null>(null);
  const [currentTenant, setCurrentTenant] = useState<Tenant | null>(null);
  const [availableTenants, setAvailableTenants] = useState<Tenant[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (accessMode === 'public') {
      // In public mode, create a generic user and tenant
      const publicUser = publicDemoService.createPublicUser();
      const publicTenant = publicDemoService.createPublicTenant();
      
      setUser(publicUser);
      setCurrentTenant(publicTenant);
      setAvailableTenants([publicTenant]);
      setIsLoading(false);
    } else {
      // In demo mode, clear state (will be handled by regular auth)
      setUser(null);
      setCurrentTenant(null);
      setAvailableTenants([]);
      setIsLoading(false);
    }
  }, [accessMode]);

  const switchTenant = async (tenantId: string) => {
    if (accessMode === 'public') {
      // In public mode, switching doesn't do anything
      return;
    }
    // In demo mode, this will be handled by regular auth
  };

  const switchDemoAccount = async (account: any) => {
    // In public mode, this function doesn't need to do anything
    // since account switching is handled by the regular auth state
    console.log('switchDemoAccount called in public auth state for:', account.tenantName);
    return Promise.resolve();
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
