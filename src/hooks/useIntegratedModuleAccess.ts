
import { useTenantFeatures } from './useTenantFeatures';
import { useModuleAccess } from '@/contexts/ModuleAccessContext';

export const useIntegratedModuleAccess = () => {
  const { isFeatureEnabled } = useTenantFeatures();
  const { isModuleActive, isSubmoduleActive } = useModuleAccess();

  // A module is accessible if both the tenant feature is enabled AND the module is active
  const isModuleAccessible = (moduleId: string, featureId?: string): boolean => {
    // First check if module is active in module access center
    if (!isModuleActive(moduleId)) {
      return false;
    }
    
    // Then check tenant feature if specified
    if (featureId && !isFeatureEnabled(featureId)) {
      return false;
    }
    
    return true;
  };

  // A submodule is accessible if the parent module is accessible AND the submodule is active
  const isSubmoduleAccessible = (moduleId: string, submoduleId: string, featureId?: string): boolean => {
    // First check if parent module is accessible
    if (!isModuleAccessible(moduleId, featureId)) {
      return false;
    }
    
    // Then check if submodule is active
    return isSubmoduleActive(moduleId, submoduleId);
  };

  return {
    isModuleAccessible,
    isSubmoduleAccessible,
    isModuleActive,
    isSubmoduleActive
  };
};
