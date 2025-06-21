
import { useMemo } from 'react';
import { useAuth } from '@/hooks/useAuth';

export interface FeatureDefinition {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  category: string;
  requiredSubscription: string[];
}

interface Feature {
  id: string;
  name: string;
  enabled: boolean;
  category: string;
}

export type SubscriptionTier = 'basic' | 'professional' | 'premium' | 'enterprise';

export const FEATURE_MATRIX: Record<string, FeatureDefinition> = {
  horses: { 
    id: 'horses', 
    name: 'Horse Management', 
    description: 'Comprehensive horse profiles and management', 
    enabled: true, 
    category: 'core',
    requiredSubscription: ['basic', 'professional', 'premium', 'enterprise']
  },
  laboratory: { 
    id: 'laboratory', 
    name: 'Laboratory Services', 
    description: 'Lab testing, sample management, and diagnostic services', 
    enabled: false, 
    category: 'medical',
    requiredSubscription: ['professional', 'premium', 'enterprise']
  },
  clinic: { 
    id: 'clinic', 
    name: 'Veterinary Clinic', 
    description: 'Medical records and treatments', 
    enabled: false, 
    category: 'medical',
    requiredSubscription: ['professional', 'premium', 'enterprise']
  },
  pharmacy: { 
    id: 'pharmacy', 
    name: 'Pharmacy Services', 
    description: 'Medication management and pharmaceutical operations', 
    enabled: false, 
    category: 'medical',
    requiredSubscription: ['professional', 'premium', 'enterprise']
  },
  marketplace: { 
    id: 'marketplace', 
    name: 'Marketplace', 
    description: 'Buy and sell horses, equipment, and services', 
    enabled: false, 
    category: 'commercial',
    requiredSubscription: ['premium', 'enterprise']
  },
  finance: { 
    id: 'finance', 
    name: 'Finance Management', 
    description: 'Financial tracking and reporting', 
    enabled: false, 
    category: 'business',
    requiredSubscription: ['professional', 'premium', 'enterprise']
  },
  hr: { 
    id: 'hr', 
    name: 'HR Department', 
    description: 'Human resources and employee management', 
    enabled: false, 
    category: 'business',
    requiredSubscription: ['premium', 'enterprise']
  },
  inventory: { 
    id: 'inventory', 
    name: 'Inventory Management', 
    description: 'Stock and supply management', 
    enabled: false, 
    category: 'operations',
    requiredSubscription: ['premium', 'enterprise']
  },
  training: { 
    id: 'training', 
    name: 'Training Center', 
    description: 'Training programs and tracking', 
    enabled: false, 
    category: 'operations',
    requiredSubscription: ['premium', 'enterprise']
  },
  rooms: { 
    id: 'rooms', 
    name: 'Stable Rooms', 
    description: 'Room and facility management', 
    enabled: false, 
    category: 'facilities',
    requiredSubscription: ['basic', 'professional', 'premium', 'enterprise']
  },
  maintenance: { 
    id: 'maintenance', 
    name: 'Maintenance', 
    description: 'Equipment and facility maintenance tracking', 
    enabled: false, 
    category: 'facilities',
    requiredSubscription: ['professional', 'premium', 'enterprise']
  },
  messages: { 
    id: 'messages', 
    name: 'Messages', 
    description: 'Internal messaging and communication', 
    enabled: false, 
    category: 'communication',
    requiredSubscription: ['basic', 'professional', 'premium', 'enterprise']
  },
  clients: { 
    id: 'clients', 
    name: 'Client Management', 
    description: 'Customer relationship management', 
    enabled: true, 
    category: 'business',
    requiredSubscription: ['basic', 'professional', 'premium', 'enterprise']
  },
  analytics: { 
    id: 'analytics', 
    name: 'Analytics & Reports', 
    description: 'Business intelligence and reporting', 
    enabled: false, 
    category: 'insights',
    requiredSubscription: ['premium', 'enterprise']
  },
  paddocks: { 
    id: 'paddocks', 
    name: 'Paddock Management', 
    description: 'Paddock and pasture management', 
    enabled: false, 
    category: 'facilities',
    requiredSubscription: ['basic', 'professional', 'premium', 'enterprise']
  }
};

export const useTenantFeatures = () => {
  const { currentTenant } = useAuth();

  const features: Feature[] = useMemo(() => {
    // If we have a tenant with settings, use its feature configuration
    if (currentTenant?.settings?.features) {
      const tenantFeatures = currentTenant.settings.features;
      
      return Object.entries(FEATURE_MATRIX).map(([key, definition]) => ({
        id: key,
        name: definition.name,
        enabled: tenantFeatures[key as keyof typeof tenantFeatures] ?? false,
        category: definition.category
      }));
    }

    // Fallback to basic configuration for demo mode
    return Object.values(FEATURE_MATRIX).map(definition => ({
      id: definition.id,
      name: definition.name,
      enabled: definition.enabled,
      category: definition.category
    }));
  }, [currentTenant]);

  const subscriptionTier: SubscriptionTier = currentTenant?.subscriptionTier || 'basic';

  const getEnabledFeatures = () => features.filter(f => f.enabled);
  const getAvailableFeatures = () => features;
  const getUnavailableFeatures = () => features.filter(f => !f.enabled);
  
  const isFeatureEnabled = (featureId: string) => {
    const feature = features.find(f => f.id === featureId);
    return feature?.enabled || false;
  };

  const getFeatureDefinition = (featureId: string) => {
    return FEATURE_MATRIX[featureId];
  };

  const getSubscriptionTierFeatures = (tier: SubscriptionTier) => {
    return Object.values(FEATURE_MATRIX).filter(feature => 
      feature.requiredSubscription.includes(tier)
    );
  };
  
  return {
    features,
    featureMatrix: FEATURE_MATRIX,
    subscriptionTier,
    getEnabledFeatures,
    getAvailableFeatures,
    getUnavailableFeatures,
    isFeatureEnabled,
    getFeatureDefinition,
    getSubscriptionTierFeatures
  };
};
