
import { useMemo } from 'react';

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
  clinic: { 
    id: 'clinic', 
    name: 'Veterinary Clinic', 
    description: 'Medical records and treatments', 
    enabled: true, 
    category: 'medical',
    requiredSubscription: ['professional', 'premium', 'enterprise']
  },
  finance: { 
    id: 'finance', 
    name: 'Finance Management', 
    description: 'Financial tracking and reporting', 
    enabled: true, 
    category: 'business',
    requiredSubscription: ['professional', 'premium', 'enterprise']
  },
  inventory: { 
    id: 'inventory', 
    name: 'Inventory Management', 
    description: 'Stock and supply management', 
    enabled: true, 
    category: 'operations',
    requiredSubscription: ['premium', 'enterprise']
  },
  clients: { 
    id: 'clients', 
    name: 'Client Management', 
    description: 'Customer relationship management', 
    enabled: true, 
    category: 'business',
    requiredSubscription: ['basic', 'professional', 'premium', 'enterprise']
  },
  training: { 
    id: 'training', 
    name: 'Training Center', 
    description: 'Training programs and tracking', 
    enabled: true, 
    category: 'operations',
    requiredSubscription: ['premium', 'enterprise']
  },
  analytics: { 
    id: 'analytics', 
    name: 'Analytics & Reports', 
    description: 'Business intelligence and reporting', 
    enabled: true, 
    category: 'insights',
    requiredSubscription: ['premium', 'enterprise']
  },
  scheduling: { 
    id: 'scheduling', 
    name: 'Scheduling', 
    description: 'Appointment and calendar management', 
    enabled: false, 
    category: 'operations',
    requiredSubscription: ['enterprise']
  }
};

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

  const subscriptionTier: SubscriptionTier = 'premium';

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
