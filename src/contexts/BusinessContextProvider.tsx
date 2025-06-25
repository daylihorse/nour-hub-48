import React, { createContext, useContext, useState, useEffect } from 'react';
import { BusinessType, BusinessContext } from '@/types/inventory-integration';
import { InventoryPharmacySyncService } from '@/services/inventory-pharmacy-sync';

interface BusinessContextProviderProps {
  children: React.ReactNode;
}

interface BusinessContextValue {
  businessContext: BusinessContext;
  updateBusinessContext: (updates: Partial<BusinessContext>) => void;
  setBusinessType: (type: BusinessType) => void;
  isPharmacyBusiness: boolean;
  isStableBusiness: boolean;
  isMixedBusiness: boolean;
}

const BusinessContextContext = createContext<BusinessContextValue | undefined>(undefined);

export const useBusinessContext = () => {
  const context = useContext(BusinessContextContext);
  if (!context) {
    throw new Error('useBusinessContext must be used within a BusinessContextProvider');
  }
  return context;
};

export const BusinessContextProvider: React.FC<BusinessContextProviderProps> = ({ children }) => {
  const [businessContext, setBusinessContext] = useState<BusinessContext>(() => {
    // Try to load from localStorage or use defaults
    const saved = localStorage.getItem('businessContext');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (error) {
        console.error('Error parsing saved business context:', error);
      }
    }
    
    return {
      businessType: 'stable_owner',
      hasPharmacyLicense: false,
      hasDEALicense: false,
      allowsControlledSubstances: false,
      defaultMarkupPercentage: 50,
      autoSyncEnabled: true,
      complianceSettings: {
        requiresBatchTracking: true,
        requiresExpiryTracking: true,
        requiresPrescriptionArchival: false,
      }
    };
  });

  // Update the sync service whenever context changes
  useEffect(() => {
    InventoryPharmacySyncService.setBusinessContext(businessContext);
  }, [businessContext]);

  // Save to localStorage whenever context changes
  useEffect(() => {
    localStorage.setItem('businessContext', JSON.stringify(businessContext));
  }, [businessContext]);

  const updateBusinessContext = (updates: Partial<BusinessContext>) => {
    setBusinessContext(prev => {
      const updated = { ...prev, ...updates };
      
      // Auto-update related settings based on business type
      if (updates.businessType) {
        switch (updates.businessType) {
          case 'pharmacy_owner':
            updated.hasPharmacyLicense = true;
            updated.defaultMarkupPercentage = 40;
            updated.complianceSettings = {
              ...updated.complianceSettings,
              requiresBatchTracking: true,
              requiresExpiryTracking: true,
              requiresPrescriptionArchival: true,
            };
            break;
          case 'stable_owner':
            updated.hasPharmacyLicense = false;
            updated.hasDEALicense = false;
            updated.allowsControlledSubstances = false;
            updated.defaultMarkupPercentage = 60;
            updated.complianceSettings = {
              ...updated.complianceSettings,
              requiresPrescriptionArchival: false,
            };
            break;
          case 'mixed_business':
            updated.defaultMarkupPercentage = 50;
            break;
        }
      }
      
      return updated;
    });
  };

  const setBusinessType = (type: BusinessType) => {
    updateBusinessContext({ businessType: type });
  };

  const value: BusinessContextValue = {
    businessContext,
    updateBusinessContext,
    setBusinessType,
    isPharmacyBusiness: businessContext.businessType === 'pharmacy_owner',
    isStableBusiness: businessContext.businessType === 'stable_owner',
    isMixedBusiness: businessContext.businessType === 'mixed_business',
  };

  return (
    <BusinessContextContext.Provider value={value}>
      {children}
    </BusinessContextContext.Provider>
  );
}; 