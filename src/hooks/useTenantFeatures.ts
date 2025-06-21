
import { useMemo } from 'react';

interface Feature {
  id: string;
  name: string;
  enabled: boolean;
  category: string;
}

export const useTenantFeatures = () => {
  const features: Feature[] = useMemo(() => [
    { id: 'horses', name: 'Horse Management', enabled: true, category: 'core' },
    { id: 'clinic', name: 'Veterinary Clinic', enabled: true, category: 'medical' },
    { id: 'finance', name: 'Finance Management', enabled: true, category: 'business' },
    { id: 'inventory', name: 'Inventory Management', enabled: true, category: 'operations' },
    { id: 'clients', name: 'Client Management', enabled: true, category: 'business' },
    { id: 'training', name: 'Training Center', enabled: true, category: 'operations' },
    { id: 'analytics', name: 'Analytics & Reports', enabled: true, category: 'insights' },
    { id: 'scheduling', name: 'Scheduling', enabled: false, category: 'operations' }
  ], []);

  const getEnabledFeatures = () => features.filter(f => f.enabled);
  const getAvailableFeatures = () => features;
  
  return {
    features,
    getEnabledFeatures,
    getAvailableFeatures
  };
};
