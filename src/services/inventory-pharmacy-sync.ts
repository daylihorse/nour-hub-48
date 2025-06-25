import { 
  EnhancedInventoryItem, 
  ModuleSyncResult, 
  BusinessType, 
  UsageIntent, 
  DestinationModule,
  BusinessContext 
} from '@/types/inventory-integration';
import { InventoryItem as PharmacyItem } from '@/components/pharmacy/inventory/types';

// Cross-module synchronization service
export class InventoryPharmacySyncService {
  private static businessContext: BusinessContext = {
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

  static setBusinessContext(context: Partial<BusinessContext>) {
    this.businessContext = { ...this.businessContext, ...context };
  }

  static getBusinessContext(): BusinessContext {
    return this.businessContext;
  }

  /**
   * Determines which modules an item should be synced to based on business logic
   */
  static determineDestinationModules(
    businessType: BusinessType,
    classification: string,
    listForSale: boolean,
    usageIntent: UsageIntent,
    isMedicalItem: boolean
  ): DestinationModule[] {
    const modules: DestinationModule[] = ['inventory']; // Always include inventory as base
    
    // Medical items logic
    if (isMedicalItem) {
      modules.push('pharmacy'); // Always add medical items to pharmacy for tracking
      
      if (businessType === 'pharmacy_owner') {
        // Pharmacy owners: everything is potentially for sale
        if (listForSale !== false) {
          modules.push('store', 'marketplace');
        }
      } else if (businessType === 'stable_owner') {
        // Stable owners: only add to store/marketplace if explicitly marked for sale
        if (listForSale && usageIntent !== 'personal_use') {
          modules.push('store', 'marketplace');
        }
      } else if (businessType === 'mixed_business') {
        // Mixed business: follow usage intent
        if (usageIntent === 'for_sale' || usageIntent === 'both') {
          modules.push('store', 'marketplace');
        }
      }
    } else {
      // Non-medical items
      if (listForSale && (usageIntent === 'for_sale' || usageIntent === 'both')) {
        modules.push('store', 'marketplace');
      }
    }
    
    return [...new Set(modules)]; // Remove duplicates
  }

  /**
   * Checks if an item is medical/pharmaceutical based on classification
   */
  static isMedicalItem(classification: string): boolean {
    const medicalClassifications = [
      'medical', 'vet', 'veterinary', 'antibiotic', 'anti_inflammatory', 
      'sedative', 'vitamin', 'vaccine', 'medication', 'drug', 'pharmaceutical'
    ];
    
    return medicalClassifications.some(medClass => 
      classification.toLowerCase().includes(medClass.toLowerCase())
    );
  }

  /**
   * Calculates suggested markup based on item type and business context
   */
  static calculateSuggestedMarkup(
    purchasePrice: number, 
    classification: string, 
    businessType: BusinessType
  ): number {
    const baseMarkup = this.businessContext.defaultMarkupPercentage;
    
    // Adjust markup based on item type
    let adjustedMarkup = baseMarkup;
    
    if (this.isMedicalItem(classification)) {
      // Medical items typically have regulated markups
      adjustedMarkup = businessType === 'pharmacy_owner' ? 40 : 60;
    } else if (classification.includes('feed')) {
      adjustedMarkup = 25; // Lower markup for feed
    } else if (classification.includes('equipment')) {
      adjustedMarkup = 75; // Higher markup for equipment
    }
    
    return Math.round((purchasePrice * adjustedMarkup) / 100 * 100) / 100;
  }

  /**
   * Main sync function - syncs an item across all determined modules
   */
  static async syncItemAcrossModules(item: EnhancedInventoryItem): Promise<ModuleSyncResult[]> {
    const results: ModuleSyncResult[] = [];
    
    try {
      // Determine destination modules
      const destinationModules = this.determineDestinationModules(
        item.businessType,
        item.classification,
        item.listForSale,
        item.usageIntent,
        item.isMedicalItem
      );

      // Update the item's destination modules
      item.destinationModules = destinationModules;

      // Sync to each module
      for (const module of destinationModules) {
        try {
          let syncResult: ModuleSyncResult;
          
          switch (module) {
            case 'inventory':
              syncResult = await this.syncToInventory(item);
              break;
            case 'pharmacy':
              syncResult = await this.syncToPharmacy(item);
              break;
            case 'store':
              syncResult = await this.syncToStore(item);
              break;
            case 'marketplace':
              syncResult = await this.syncToMarketplace(item);
              break;
            default:
              throw new Error(`Unknown module: ${module}`);
          }
          
          results.push(syncResult);
        } catch (error) {
          results.push({
            success: false,
            module,
            itemId: item.id,
            error: error instanceof Error ? error.message : 'Unknown error',
            syncedAt: new Date()
          });
        }
      }

      // Update sync status
      item.syncStatus = {
        inventory: results.some(r => r.module === 'inventory' && r.success),
        pharmacy: results.some(r => r.module === 'pharmacy' && r.success),
        store: results.some(r => r.module === 'store' && r.success),
        marketplace: results.some(r => r.module === 'marketplace' && r.success),
      };
      item.lastSyncDate = new Date();

    } catch (error) {
      console.error('Error syncing item across modules:', error);
    }

    return results;
  }

  /**
   * Sync to Inventory Module (base module)
   */
  private static async syncToInventory(item: EnhancedInventoryItem): Promise<ModuleSyncResult> {
    // In a real app, this would call the inventory API
    console.log('Syncing to Inventory:', item.productName);
    
    return {
      success: true,
      module: 'inventory',
      itemId: item.id,
      syncedAt: new Date()
    };
  }

  /**
   * Sync to Pharmacy Module
   */
  private static async syncToPharmacy(item: EnhancedInventoryItem): Promise<ModuleSyncResult> {
    const pharmacyItem = this.transformToPharmacyItem(item);
    
    // In a real app, this would call the pharmacy API
    console.log('Syncing to Pharmacy:', pharmacyItem.name);
    
    return {
      success: true,
      module: 'pharmacy',
      itemId: `pharmacy_${item.id}`,
      syncedAt: new Date()
    };
  }

  /**
   * Sync to Store Module
   */
  private static async syncToStore(item: EnhancedInventoryItem): Promise<ModuleSyncResult> {
    // In a real app, this would call the store API
    console.log('Syncing to Store:', item.productName);
    
    return {
      success: true,
      module: 'store',
      itemId: `store_${item.id}`,
      syncedAt: new Date()
    };
  }

  /**
   * Sync to Marketplace Module
   */
  private static async syncToMarketplace(item: EnhancedInventoryItem): Promise<ModuleSyncResult> {
    // In a real app, this would call the marketplace API
    console.log('Syncing to Marketplace:', item.productName);
    
    return {
      success: true,
      module: 'marketplace',
      itemId: `marketplace_${item.id}`,
      syncedAt: new Date()
    };
  }

  /**
   * Transform inventory item to pharmacy item format
   */
  private static transformToPharmacyItem(item: EnhancedInventoryItem): PharmacyItem {
    return {
      id: `pharmacy_${item.id}`,
      name: item.productName,
      genericName: item.pharmacySettings?.genericName || item.pharmacySettings?.activeIngredient || item.productName,
      brandName: item.pharmacySettings?.brandName,
      category: this.mapToPharmacyCategory(item.classification),
      dosageForm: item.pharmacySettings?.dosageForm || 'liquid',
      strength: item.pharmacySettings?.strength || '',
      unit: item.unitOfMeasure,
      currentStock: item.quantitiesPurchased,
      minimumStock: item.alertThreshold,
      maximumStock: item.alertThreshold * 5, // Auto-calculate max stock
      expiryDate: item.expiryDate?.toISOString().split('T')[0] || '',
      batchNumber: item.batchNumber || '',
      supplier: item.supplier,
      unitCost: item.purchasePrice,
      sellingPrice: item.sellingPrice || this.calculateSuggestedMarkup(item.purchasePrice, item.classification, item.businessType),
      location: item.warehouse,
      requiresPrescription: item.pharmacySettings?.requiresPrescription || false,
      controlledSubstance: item.pharmacySettings?.controlledSubstance || false,
      storageRequirements: item.pharmacySettings?.storageRequirements || 'Room temperature',
    };
  }

  /**
   * Map inventory classification to pharmacy category
   */
  private static mapToPharmacyCategory(classification: string): 'antibiotic' | 'anti_inflammatory' | 'sedative' | 'vitamin' | 'vaccine' | 'other' {
    const lowerClass = classification.toLowerCase();
    
    if (lowerClass.includes('antibiotic')) return 'antibiotic';
    if (lowerClass.includes('anti_inflammatory') || lowerClass.includes('pain')) return 'anti_inflammatory';
    if (lowerClass.includes('sedative') || lowerClass.includes('tranquilizer')) return 'sedative';
    if (lowerClass.includes('vitamin') || lowerClass.includes('supplement')) return 'vitamin';
    if (lowerClass.includes('vaccine')) return 'vaccine';
    
    return 'other';
  }

  /**
   * Get smart defaults based on business type and classification
   */
  static getSmartDefaults(businessType: BusinessType, classification: string) {
    const isMedical = this.isMedicalItem(classification);
    
    if (businessType === 'pharmacy_owner') {
      return {
        listForSale: true,
        usageIntent: 'for_sale' as UsageIntent,
        destinationModules: ['inventory', 'pharmacy', 'store'] as DestinationModule[],
        requiresSellingPrice: true,
        suggestedMarkup: this.calculateSuggestedMarkup(0, classification, businessType),
      };
    } else if (businessType === 'stable_owner' && isMedical) {
      return {
        listForSale: false,
        usageIntent: 'personal_use' as UsageIntent,
        destinationModules: ['inventory', 'pharmacy'] as DestinationModule[],
        requiresSellingPrice: false,
        suggestedMarkup: 0,
      };
    }
    
    return {
      listForSale: false,
      usageIntent: 'personal_use' as UsageIntent,
      destinationModules: ['inventory'] as DestinationModule[],
      requiresSellingPrice: false,
      suggestedMarkup: 0,
    };
  }

  /**
   * Validate item before sync
   */
  static validateItemForSync(item: EnhancedInventoryItem): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Basic validation
    if (!item.productName?.trim()) {
      errors.push('Product name is required');
    }

    if (item.purchasePrice < 0) {
      errors.push('Purchase price cannot be negative');
    }

    // Business-specific validation
    if (item.businessType === 'pharmacy_owner' && item.listForSale && !item.sellingPrice) {
      errors.push('Selling price is required for pharmacy items marked for sale');
    }

    // Medical item validation
    if (item.isMedicalItem && item.pharmacySettings?.controlledSubstance && !this.businessContext.allowsControlledSubstances) {
      errors.push('Business is not licensed to handle controlled substances');
    }

    // Expiry date validation for medical items
    if (item.isMedicalItem && !item.expiryDate) {
      errors.push('Expiry date is required for medical items');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
} 