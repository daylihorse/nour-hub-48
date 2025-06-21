
import { useState } from 'react';
import { User, Tenant } from '@/types/tenant';
import { publicDemoService } from '@/services/auth/publicDemoService';

export const usePublicAuthState = () => {
  // Get a random demo account for public mode
  const demoAccount = publicDemoService.getRandomDemoAccount();
  
  const [user] = useState<User | null>({
    id: 'public-user',
    email: demoAccount.email,
    firstName: 'Demo',
    lastName: 'User'
  });
  
  // Use Elite Equestrian Center as the default public demo tenant (has most features)
  const [currentTenant] = useState<Tenant | null>({
    id: '550e8400-e29b-41d4-a716-446655440001',
    name: 'Elite Equestrian Center',
    type: 'stable',
    subscriptionTier: 'premium',
    status: 'active',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    settings: {
      timezone: 'UTC',
      currency: 'USD',
      language: 'en',
      features: {
        horses: true,
        laboratory: true,
        clinic: true,
        pharmacy: true,
        marketplace: true,
        finance: true,
        hr: true,
        inventory: true,
        training: true,
        rooms: true,
        maintenance: true,
        messages: true,
      }
    },
    metadata: {}
  });
  
  const [availableTenants] = useState<Tenant[]>([currentTenant!]);
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
