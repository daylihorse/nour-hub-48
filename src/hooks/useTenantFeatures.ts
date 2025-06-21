
import { useAuth } from './useAuth';

export interface FeatureDefinition {
  id: string;
  name: string;
  description: string;
  requiredSubscription: string[];
  icon?: string;
}

// Feature matrix defining which features are available on which subscription tiers
export const FEATURE_MATRIX: Record<string, FeatureDefinition> = {
  horses: {
    id: 'horses',
    name: 'Horse Management',
    description: 'Comprehensive horse records and health tracking',
    requiredSubscription: ['basic', 'professional', 'premium', 'enterprise'],
  },
  laboratory: {
    id: 'laboratory',
    name: 'Laboratory',
    description: 'Lab tests, results, and medical analysis',
    requiredSubscription: ['professional', 'premium', 'enterprise'],
  },
  clinic: {
    id: 'clinic',
    name: 'Clinic',
    description: 'Veterinary care, appointments, and medical records',
    requiredSubscription: ['professional', 'premium', 'enterprise'],
  },
  pharmacy: {
    id: 'pharmacy',
    name: 'Pharmacy',
    description: 'Medication management and prescriptions',
    requiredSubscription: ['professional', 'premium', 'enterprise'],
  },
  finance: {
    id: 'finance',
    name: 'Finance',
    description: 'Financial management, invoicing, and accounting',
    requiredSubscription: ['basic', 'professional', 'premium', 'enterprise'],
  },
  hr: {
    id: 'hr',
    name: 'Human Resources',
    description: 'Employee management, payroll, and scheduling',
    requiredSubscription: ['premium', 'enterprise'],
  },
  inventory: {
    id: 'inventory',
    name: 'Inventory',
    description: 'Stock management, supplies, and equipment',
    requiredSubscription: ['basic', 'professional', 'premium', 'enterprise'],
  },
  marketplace: {
    id: 'marketplace',
    name: 'Marketplace',
    description: 'Buy, sell, and trade horses and equipment',
    requiredSubscription: ['professional', 'premium', 'enterprise'],
  },
  training: {
    id: 'training',
    name: 'Training Center',
    description: 'Training programs and progress tracking',
    requiredSubscription: ['premium', 'enterprise'],
  },
  rooms: {
    id: 'rooms',
    name: 'Stable Rooms',
    description: 'Room assignments and facility management',
    requiredSubscription: ['basic', 'professional', 'premium', 'enterprise'],
  },
  maintenance: {
    id: 'maintenance',
    name: 'Maintenance',
    description: 'Facility maintenance and repairs',
    requiredSubscription: ['premium', 'enterprise'],
  },
  messages: {
    id: 'messages',
    name: 'Messaging',
    description: 'Internal communications and notifications',
    requiredSubscription: ['basic', 'professional', 'premium', 'enterprise'],
  },
};

export const useTenantFeatures = () => {
  const { currentTenant } = useAuth();
  
  // Check if a feature is enabled both in tenant settings and by subscription tier
  const isFeatureEnabled = (featureId: string): boolean => {
    if (!currentTenant?.settings?.features || !currentTenant.subscriptionTier) return false;
    
    // First check if it's enabled in tenant settings
    const isEnabledInSettings = currentTenant.settings.features[featureId as keyof typeof currentTenant.settings.features] || false;
    
    // Then check if the subscription tier allows it
    const featureDefinition = FEATURE_MATRIX[featureId];
    if (!featureDefinition) return false;
    
    const isAllowedBySubscription = featureDefinition.requiredSubscription.includes(currentTenant.subscriptionTier);
    
    // Feature must be both enabled in settings and allowed by subscription
    return isEnabledInSettings && isAllowedBySubscription;
  };

  const getEnabledFeatures = () => {
    if (!currentTenant?.settings?.features) return [];
    
    return Object.keys(FEATURE_MATRIX).filter(featureId => isFeatureEnabled(featureId));
  };

  const getDisabledFeatures = () => {
    if (!currentTenant?.settings?.features) return [];
    
    return Object.keys(FEATURE_MATRIX).filter(featureId => !isFeatureEnabled(featureId));
  };

  const getAvailableFeatures = () => {
    if (!currentTenant?.subscriptionTier) return [];
    
    // Return features available on current subscription tier
    return Object.values(FEATURE_MATRIX).filter(feature => 
      feature.requiredSubscription.includes(currentTenant.subscriptionTier)
    );
  };

  const getUnavailableFeatures = () => {
    if (!currentTenant?.subscriptionTier) return [];
    
    // Return features not available on current subscription tier
    return Object.values(FEATURE_MATRIX).filter(feature => 
      !feature.requiredSubscription.includes(currentTenant.subscriptionTier)
    );
  };

  const getFeatureDefinition = (featureId: string): FeatureDefinition | undefined => {
    return FEATURE_MATRIX[featureId];
  };

  const getSubscriptionTierFeatures = (tier: string): FeatureDefinition[] => {
    return Object.values(FEATURE_MATRIX).filter(feature => 
      feature.requiredSubscription.includes(tier)
    );
  };

  return {
    isFeatureEnabled,
    getEnabledFeatures,
    getDisabledFeatures,
    getAvailableFeatures,
    getUnavailableFeatures,
    getFeatureDefinition,
    getSubscriptionTierFeatures,
    features: currentTenant?.settings?.features,
    subscriptionTier: currentTenant?.subscriptionTier,
    featureMatrix: FEATURE_MATRIX,
  };
};
