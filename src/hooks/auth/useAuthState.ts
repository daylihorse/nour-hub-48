
import { useState, useEffect } from 'react';
import { User, Tenant } from '@/types/tenant';

export const useAuthState = () => {
  const [user, setUser] = useState<User | null>({
    id: 'demo-user',
    email: 'demo@example.com',
    firstName: 'Demo',
    lastName: 'User'
  });
  
  const [currentTenant, setCurrentTenant] = useState<Tenant | null>({
    id: 'demo-tenant',
    name: 'Demo Tenant',
    type: 'demo'
  });
  
  const [availableTenants, setAvailableTenants] = useState<Tenant[]>([{
    id: 'demo-tenant',
    name: 'Demo Tenant',
    type: 'demo'
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
