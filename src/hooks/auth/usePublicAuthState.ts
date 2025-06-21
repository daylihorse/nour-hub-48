
import { useState } from 'react';
import { User, Tenant } from '@/types/tenant';

export const usePublicAuthState = () => {
  const [user] = useState<User | null>({
    id: 'public-user',
    email: 'public@example.com',
    firstName: 'Public',
    lastName: 'User'
  });
  
  const [currentTenant] = useState<Tenant | null>({
    id: 'public-tenant',
    name: 'Public Access',
    type: 'enterprise'
  });
  
  const [availableTenants] = useState<Tenant[]>([{
    id: 'public-tenant',
    name: 'Public Access',
    type: 'enterprise'
  }]);
  
  const [isLoading] = useState(false);

  const switchTenant = async (tenantId: string) => {
    console.log('Public mode: switching tenant:', tenantId);
  };

  const switchDemoAccount = async (account: any) => {
    console.log('Public mode: switching demo account:', account);
  };

  return {
    user,
    currentTenant,
    availableTenants,
    isLoading,
    switchTenant,
    switchDemoAccount,
    setIsLoading: () => {},
  };
};
