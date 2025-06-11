
import { useAuth } from './useAuth';

export const useTenantFeatures = () => {
  const { currentTenant } = useAuth();

  const isFeatureEnabled = (feature: string): boolean => {
    if (!currentTenant?.settings?.features) return false;
    return currentTenant.settings.features[feature as keyof typeof currentTenant.settings.features] || false;
  };

  const getEnabledFeatures = () => {
    if (!currentTenant?.settings?.features) return [];
    return Object.entries(currentTenant.settings.features)
      .filter(([_, enabled]) => enabled)
      .map(([feature]) => feature);
  };

  const getDisabledFeatures = () => {
    if (!currentTenant?.settings?.features) return [];
    return Object.entries(currentTenant.settings.features)
      .filter(([_, enabled]) => !enabled)
      .map(([feature]) => feature);
  };

  return {
    isFeatureEnabled,
    getEnabledFeatures,
    getDisabledFeatures,
    features: currentTenant?.settings?.features,
  };
};
