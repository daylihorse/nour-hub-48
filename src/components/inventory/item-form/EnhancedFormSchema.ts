import { z } from "zod";
import { formSchema } from "./FormSchema";
import { BusinessType, UsageIntent, DestinationModule, DosageForm } from "@/types/inventory-integration";

// Enhanced form schema that extends the original
export const enhancedFormSchema = formSchema.extend({
  // Business Context
  businessType: z.enum(['stable_owner', 'pharmacy_owner', 'mixed_business']).default('stable_owner'),
  usageIntent: z.enum(['personal_use', 'for_sale', 'both']).default('personal_use'),
  destinationModules: z.array(z.enum(['inventory', 'pharmacy', 'store', 'marketplace'])).default(['inventory']),
  
  // Pharmacy-specific settings (optional for non-medical items)
  pharmacySettings: z.object({
    requiresPrescription: z.boolean().default(false),
    controlledSubstance: z.boolean().default(false),
    dosageForm: z.enum(['tablet', 'injection', 'liquid', 'powder', 'ointment', 'paste', 'capsule']).optional(),
    strength: z.string().optional(),
    activeIngredient: z.string().optional(),
    storageRequirements: z.string().optional(),
    genericName: z.string().optional(),
    brandName: z.string().optional(),
    administrationRoute: z.string().optional(),
    withdrawalPeriod: z.number().min(0).optional(),
    doseCalculationNotes: z.string().optional(),
  }).optional(),
  
  // Sales configuration
  salesConfiguration: z.object({
    markupPercentage: z.number().min(0).max(1000).optional(),
    minimumOrderQuantity: z.number().min(1).optional(),
    bulkDiscountTiers: z.array(z.object({
      quantity: z.number().min(1),
      discountPercentage: z.number().min(0).max(100),
    })).optional(),
    availableForOnlineOrders: z.boolean().default(true),
    requiresConsultation: z.boolean().default(false),
  }).optional(),
  
  // Auto-calculated fields (computed)
  isMedicalItem: z.boolean().default(false),
  requiresSpecialHandling: z.boolean().default(false),
  suggestedMarkup: z.number().optional(),
  profitMargin: z.number().optional(),
});

export type EnhancedFormValues = z.infer<typeof enhancedFormSchema>;

// Business type options for dropdown
export const businessTypeOptions = [
  { label: "Stable Owner", value: "stable_owner", description: "I own a stable and use items for my horses" },
  { label: "Pharmacy Owner", value: "pharmacy_owner", description: "I run a pharmacy and sell medications" },
  { label: "Mixed Business", value: "mixed_business", description: "I have both stable and pharmacy operations" },
];

// Usage intent options
export const usageIntentOptions = [
  { label: "Personal Use Only", value: "personal_use", description: "For my own horses/facility only" },
  { label: "For Sale Only", value: "for_sale", description: "To sell to customers" },
  { label: "Both Personal & Sale", value: "both", description: "Some for personal use, some for sale" },
];

// Dosage form options for pharmacy items
export const dosageFormOptions = [
  { label: "Tablet", value: "tablet" },
  { label: "Injection", value: "injection" },
  { label: "Liquid/Oral", value: "liquid" },
  { label: "Powder", value: "powder" },
  { label: "Ointment/Topical", value: "ointment" },
  { label: "Paste", value: "paste" },
  { label: "Capsule", value: "capsule" },
];

// Administration route options
export const administrationRouteOptions = [
  { label: "Oral", value: "oral" },
  { label: "Intramuscular (IM)", value: "intramuscular" },
  { label: "Intravenous (IV)", value: "intravenous" },
  { label: "Subcutaneous (SC)", value: "subcutaneous" },
  { label: "Topical", value: "topical" },
  { label: "Intranasal", value: "intranasal" },
  { label: "Intra-articular", value: "intra_articular" },
];

// Storage requirement options
export const storageRequirementOptions = [
  { label: "Room Temperature", value: "room_temperature" },
  { label: "Refrigerate (2-8°C)", value: "refrigerate" },
  { label: "Freeze (-20°C)", value: "freeze" },
  { label: "Protect from Light", value: "protect_light" },
  { label: "Controlled Temperature", value: "controlled_temp" },
  { label: "Dry Storage", value: "dry_storage" },
];

// Helper function to get smart defaults
export const getFormSmartDefaults = (businessType: BusinessType, classification: string) => {
  const isMedical = ['medical', 'vet', 'veterinary'].some(term => 
    classification.toLowerCase().includes(term.toLowerCase())
  );
  
  if (businessType === 'pharmacy_owner') {
    return {
      listForSale: true,
      usageIntent: 'for_sale' as UsageIntent,
      destinationModules: ['inventory', 'pharmacy', 'store'] as DestinationModule[],
      pharmacySettings: isMedical ? {
        requiresPrescription: false,
        controlledSubstance: false,
        storageRequirements: 'room_temperature',
      } : undefined,
      salesConfiguration: {
        markupPercentage: 40,
        availableForOnlineOrders: true,
        requiresConsultation: isMedical,
      }
    };
  } else if (businessType === 'stable_owner' && isMedical) {
    return {
      listForSale: false,
      usageIntent: 'personal_use' as UsageIntent,
      destinationModules: ['inventory', 'pharmacy'] as DestinationModule[],
      pharmacySettings: {
        requiresPrescription: false,
        controlledSubstance: false,
        storageRequirements: 'room_temperature',
      }
    };
  }
  
  return {
    listForSale: false,
    usageIntent: 'personal_use' as UsageIntent,
    destinationModules: ['inventory'] as DestinationModule[],
  };
}; 