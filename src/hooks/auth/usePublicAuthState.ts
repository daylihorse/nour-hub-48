
import { useState } from 'react';
import { User, Tenant } from '@/types/tenant';

export const usePublicAuthState = () => {
  const [user, setUser] = useState<User | null>({
    id: 'public-user',
    email: 'public@example.com',
    firstName: 'Public',
    lastName: 'User'
  });
  
  const [currentTenant, setCurrentTenant] = useState<Tenant | null>({
    id: 'public-tenant',
    name: 'Public Demo',
    type: 'public'
  });
  
  const [availableTenants, setAvailableTenants] = useState<Tenant[]>([{
    id: 'public-tenant',
    name: 'Public Demo',
    type: 'public'
  }]);
  
  const [isLoading, setIsLoading] = useState(false);

  const switchTenant = async (tenantId: string) => {
    console.log('Switching tenant:', tenantId);
  };

  const switchDemoAccount = async (account: any) => {
    console.log('Switching demo account:', account);
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
