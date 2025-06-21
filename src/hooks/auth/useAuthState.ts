
import { useState, useEffect } from 'react';
import { User, Tenant } from '@/types/tenant';
import { mockTenantService } from '@/services/auth/mockTenantService';
import { publicDemoService } from '@/services/auth/publicDemoService';

export const useAuthState = () => {
  // Start with Elite Equestrian Center as default demo
  const [user, setUser] = useState<User | null>({
    id: 'demo-user',
    email: 'owner@eliteequestrian.com',
    firstName: 'Demo',
    lastName: 'User'
  });
  
  const [currentTenant, setCurrentTenant] = useState<Tenant | null>(null);
  const [availableTenants, setAvailableTenants] = useState<Tenant[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load demo tenant data on initialization
  useEffect(() => {
    const loadDemoData = async () => {
      if (user?.email) {
        const { tenants } = await mockTenantService.getUserTenants(user.email);
        setAvailableTenants(tenants);
        setCurrentTenant(tenants[0] || null);
      }
    };
    
    loadDemoData();
  }, [user?.email]);

  const switchTenant = async (tenantId: string) => {
    console.log('Switching tenant:', tenantId);
    const tenant = availableTenants.find(t => t.id === tenantId);
    if (tenant) {
      setCurrentTenant(tenant);
    }
  };

  const switchDemoAccount = async (account: any) => {
    console.log('Switching demo account:', account);
    
    // Update user info
    setUser({
      id: 'demo-user',
      email: account.email,
      firstName: account.tenantName.split(' ')[0],
      lastName: 'Demo'
    });

    // Load tenant data for this account
    const { tenants } = await mockTenantService.getUserTenants(account.email);
    setAvailableTenants(tenants);
    setCurrentTenant(tenants[0] || null);
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
