export type BusinessType = 'stable_owner' | 'pharmacy_owner' | 'mixed_business';
export type UsageIntent = 'personal_use' | 'for_sale' | 'both';
export type DestinationModule = 'inventory' | 'pharmacy' | 'store' | 'marketplace';
export type DosageForm = 'tablet' | 'injection' | 'liquid' | 'powder' | 'ointment' | 'paste' | 'capsule';

export interface PharmacySettings {
  requiresPrescription: boolean;
  controlledSubstance: boolean;
  dosageForm?: DosageForm;
  strength?: string;
  activeIngredient?: string;
  storageRequirements?: string;
  genericName?: string;
  brandName?: string;
  administrationRoute?: string;
  withdrawalPeriod?: number; // Days
  doseCalculationNotes?: string;
}

export interface SalesConfiguration {
  markupPercentage?: number;
  minimumOrderQuantity?: number;
  bulkDiscountTiers?: Array<{
    quantity: number;
    discountPercentage: number;
  }>;
  availableForOnlineOrders?: boolean;
  requiresConsultation?: boolean;
}

export interface EnhancedInventoryItem {
  id: string;
  productName: string;
  warehouse: string;
  classification: string;
  entryDate: Date;
  expiryDate?: Date;
  serialNumber?: string;
  batchNumber?: string;
  supplier: string;
  group?: string;
  additionalNotes?: string;
  quantitiesPurchased: number;
  unitOfMeasure: string;
  unitContains?: string;
  alertThreshold: number;
  purchasePrice: number;
  listForSale: boolean;
  sellingPrice?: number;
  images?: string[];
  
  // Enhanced Integration Fields
  businessType: BusinessType;
  usageIntent: UsageIntent;
  destinationModules: DestinationModule[];
  pharmacySettings?: PharmacySettings;
  salesConfiguration?: SalesConfiguration;
  
  // Sync Status
  syncStatus: {
    inventory: boolean;
    pharmacy: boolean;
    store: boolean;
    marketplace: boolean;
  };
  lastSyncDate?: Date;
  
  // Auto-calculated fields
  suggestedMarkup?: number;
  profitMargin?: number;
  isMedicalItem: boolean;
  requiresSpecialHandling: boolean;
}

export interface ModuleSyncResult {
  success: boolean;
  module: DestinationModule;
  itemId: string;
  error?: string;
  syncedAt: Date;
}

export interface BusinessContext {
  businessType: BusinessType;
  hasPharmacyLicense: boolean;
  hasDEALicense: boolean;
  allowsControlledSubstances: boolean;
  defaultMarkupPercentage: number;
  autoSyncEnabled: boolean;
  complianceSettings: {
    requiresBatchTracking: boolean;
    requiresExpiryTracking: boolean;
    requiresPrescriptionArchival: boolean;
  };
}

export interface InventoryFilter {
  businessType?: BusinessType;
  usageIntent?: UsageIntent;
  destinationModule?: DestinationModule;
  isMedicalItem?: boolean;
  requiresPrescription?: boolean;
  controlledSubstance?: boolean;
  stockStatus?: 'all' | 'in_stock' | 'low_stock' | 'out_of_stock' | 'expiring_soon';
  classification?: string;
  supplier?: string;
} 