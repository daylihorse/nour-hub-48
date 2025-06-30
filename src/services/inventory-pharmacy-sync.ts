import { 
  EnhancedInventoryItem, 
  ModuleSyncResult, 
  BusinessType, 
  UsageIntent, 
  DestinationModule,
  BusinessContext 
} from '@/types/inventory-integration';
import { PharmacyItem } from '@/types/pharmacy';

export class InventoryPharmacySyncService {
  private static instance: InventoryPharmacySyncService;
  private static businessContext: BusinessContext;
  
  private constructor() {}
  
  public static getInstance(): InventoryPharmacySyncService {
    if (!InventoryPharmacySyncService.instance) {
      InventoryPharmacySyncService.instance = new InventoryPharmacySyncService();
    }
    return InventoryPharmacySyncService.instance;
  }

  /**
   * Set the business context for the sync service
   */
  public static setBusinessContext(context: BusinessContext): void {
    InventoryPharmacySyncService.businessContext = context;
  }

  /**
   * Get the current business context
   */
  public static getBusinessContext(): BusinessContext | undefined {
    return InventoryPharmacySyncService.businessContext;
  }

  /**
   * Sync an enhanced inventory item across multiple modules
   */
  public static async syncItemAcrossModules(item: EnhancedInventoryItem): Promise<ModuleSyncResult[]> {
    const results: ModuleSyncResult[] = [];
    
    for (const module of item.destinationModules) {
      try {
        let success = false;
        
        switch (module) {
          case 'inventory':
            success = await this.syncToInventory(item);
            break;
          case 'pharmacy':
            success = await this.syncToPharmacy(item);
            break;
          case 'store':
            success = await this.syncToStore(item);
            break;
          case 'marketplace':
            success = await this.syncToMarketplace(item);
            break;
        }
        
        results.push({
          success,
          module,
          itemId: item.id,
          syncedAt: new Date(),
        });
        
      } catch (error) {
        results.push({
          success: false,
          module,
          itemId: item.id,
          error: error instanceof Error ? error.message : 'Unknown error',
          syncedAt: new Date(),
        });
      }
    }
    
    return results;
  }

  /**
   * Validate item before syncing
   */
  public static validateItemForSync(item: EnhancedInventoryItem): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    // Basic validation
    if (!item.productName?.trim()) {
      errors.push('Product name is required');
    }
    
    if (item.quantitiesPurchased <= 0) {
      errors.push('Quantity must be greater than 0');
    }
    
    if (item.purchasePrice < 0) {
      errors.push('Purchase price cannot be negative');
    }
    
    // Pharmacy-specific validation
    if (item.destinationModules.includes('pharmacy')) {
      if (item.isMedicalItem && !item.pharmacySettings) {
        errors.push('Pharmacy settings required for medical items');
      }
      
      if (item.pharmacySettings?.controlledSubstance && !item.pharmacySettings?.requiresPrescription) {
        errors.push('Controlled substances must require prescription');
      }
    }
    
    // Sales validation
    if (item.listForSale) {
      if (!item.sellingPrice || item.sellingPrice <= 0) {
        errors.push('Selling price required for items listed for sale');
      }
      
      if (item.sellingPrice && item.sellingPrice <= item.purchasePrice) {
        errors.push('Selling price should be higher than purchase price');
      }
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Determine if an item is medical based on classification
   */
  public static isMedicalItem(classification: string): boolean {
    const medicalKeywords = [
      'medical', 'medicine', 'medication', 'drug', 'pharmaceutical',
      'veterinary', 'vet', 'antibiotic', 'vaccine', 'treatment',
      'therapy', 'clinical', 'prescription', 'injectable', 'oral'
    ];
    
    return medicalKeywords.some(keyword => 
      classification.toLowerCase().includes(keyword.toLowerCase())
    );
  }

  /**
   * Calculate suggested markup based on item type and business context
   */
  public static calculateSuggestedMarkup(
    purchasePrice: number, 
    classification: string, 
    businessType: BusinessType
  ): number {
    let baseMarkup = 30; // 30% default
    
    // Adjust based on business type
    if (businessType === 'pharmacy_owner') {
      baseMarkup = 40; // Higher markup for pharmacy
    } else if (businessType === 'mixed_business') {
      baseMarkup = 35; // Moderate markup for mixed business
    }
    
    // Adjust based on item type
    if (this.isMedicalItem(classification)) {
      baseMarkup += 10; // Medical items typically have higher markup
    }
    
    // Adjust based on price range
    if (purchasePrice > 100) {
      baseMarkup -= 5; // Lower markup for expensive items
    } else if (purchasePrice < 10) {
      baseMarkup += 10; // Higher markup for cheap items
    }
    
    return Math.max(15, Math.min(baseMarkup, 100)); // Keep between 15% and 100%
  }

  /**
   * Get smart defaults based on business type and classification
   */
  public static getSmartDefaults(businessType: BusinessType, classification: string) {
    const isMedical = this.isMedicalItem(classification);
    
    const defaults = {
      listForSale: false,
      usageIntent: 'personal_use' as UsageIntent,
      destinationModules: ['inventory'] as DestinationModule[],
      requiresSpecialHandling: false,
      pharmacySettings: undefined as any,
      salesConfiguration: undefined as any,
    };
    
    if (businessType === 'pharmacy_owner') {
      defaults.listForSale = true;
      defaults.usageIntent = 'for_sale';
      defaults.destinationModules = ['inventory', 'pharmacy', 'store'];
      
      if (isMedical) {
        defaults.requiresSpecialHandling = true;
        defaults.pharmacySettings = {
          requiresPrescription: false,
          controlledSubstance: false,
          storageRequirements: 'room_temperature',
        };
        defaults.salesConfiguration = {
          availableForOnlineOrders: false,
          requiresConsultation: true,
        };
      }
    } else if (businessType === 'mixed_business') {
      defaults.usageIntent = 'both';
      defaults.destinationModules = isMedical ? ['inventory', 'pharmacy'] : ['inventory', 'store'];
      
      if (isMedical) {
        defaults.requiresSpecialHandling = true;
        defaults.pharmacySettings = {
          requiresPrescription: false,
          controlledSubstance: false,
        };
      }
    }
    
    return defaults;
  }

  /**
   * Convert enhanced inventory item to pharmacy item
   */
  public static convertToPharmacyItem(item: EnhancedInventoryItem): PharmacyItem {
    return {
      id: item.id,
      name: item.productName,
      category: this.mapToPharmacyCategory(item.classification),
      currentStock: item.quantitiesPurchased,
      minimumStock: item.alertThreshold,
      maximumStock: item.quantitiesPurchased * 2,
      supplier: item.supplier,
      unitCost: item.purchasePrice,
      sellingPrice: item.sellingPrice || item.purchasePrice * 1.4,
      requiresPrescription: item.pharmacySettings?.requiresPrescription || false,
      controlledSubstance: item.pharmacySettings?.controlledSubstance || false,
      isActive: true,
      dosageForm: this.mapDosageForm(item.pharmacySettings?.dosageForm),
      strength: item.pharmacySettings?.strength || '',
      unit: item.unitOfMeasure,
      expiryDate: item.expiryDate?.toISOString().split('T')[0] || '',
      batchNumber: item.batchNumber || '',
      location: item.warehouse || '',
      storageRequirements: item.pharmacySettings?.storageRequirements || '',
      activeIngredient: item.pharmacySettings?.activeIngredient || '',
      genericName: item.pharmacySettings?.genericName,
      brandName: item.pharmacySettings?.brandName,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as PharmacyItem;
  }

  /**
   * Map classification to pharmacy category
   */
  private static mapToPharmacyCategory(classification: string): PharmacyItem['category'] {
    const lower = classification.toLowerCase();
    
    if (lower.includes('antibiotic')) return 'antibiotic';
    if (lower.includes('anti-inflammatory') || lower.includes('pain')) return 'anti_inflammatory';
    if (lower.includes('sedative') || lower.includes('tranquilizer')) return 'sedative';
    if (lower.includes('vitamin') || lower.includes('supplement')) return 'vitamin';
    if (lower.includes('vaccine') || lower.includes('immunization')) return 'vaccine';
    
    return 'other';
  }

  /**
   * Map dosage form from enhanced schema to pharmacy schema
   */
  private static mapDosageForm(dosageForm?: string): PharmacyItem['dosageForm'] {
    if (!dosageForm) return 'tablet';
    
    switch (dosageForm) {
      case 'tablet':
      case 'capsule':
        return 'tablet';
      case 'injection':
        return 'injection';
      case 'liquid':
        return 'liquid';
      case 'powder':
        return 'powder';
      case 'ointment':
      case 'paste':
        return 'ointment';
      default:
        return 'tablet';
    }
  }

  // Individual sync methods
  private static async syncToInventory(item: EnhancedInventoryItem): Promise<boolean> {
    // Simulate inventory sync
    console.log(`Syncing ${item.productName} to inventory system`);
    await new Promise(resolve => setTimeout(resolve, 500));
    return true;
  }

  private static async syncToPharmacy(item: EnhancedInventoryItem): Promise<boolean> {
    if (!item.isMedicalItem) {
      throw new Error('Only medical items can be synced to pharmacy');
    }
    
    console.log(`Syncing ${item.productName} to pharmacy system`);
    const pharmacyItem = this.convertToPharmacyItem(item);
    
    // Simulate pharmacy sync
    await new Promise(resolve => setTimeout(resolve, 800));
    return true;
  }

  private static async syncToStore(item: EnhancedInventoryItem): Promise<boolean> {
    if (!item.listForSale) {
      throw new Error('Only items listed for sale can be synced to store');
    }
    
    console.log(`Syncing ${item.productName} to online store`);
    await new Promise(resolve => setTimeout(resolve, 600));
    return true;
  }

  private static async syncToMarketplace(item: EnhancedInventoryItem): Promise<boolean> {
    if (!item.listForSale || !item.salesConfiguration?.availableForOnlineOrders) {
      throw new Error('Item must be listed for sale and available for online orders');
    }
    
    console.log(`Syncing ${item.productName} to marketplace`);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate occasional marketplace failures
    return Math.random() > 0.2;
  }
}

// Export singleton instance
export const inventoryPharmacySync = InventoryPharmacySyncService.getInstance();
