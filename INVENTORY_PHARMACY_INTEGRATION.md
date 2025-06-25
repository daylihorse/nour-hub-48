# Inventory-Pharmacy Integration System

## Overview

This document describes the comprehensive integration system between the Inventory/Warehouse and Pharmacy modules that automatically adapts to different business types and synchronizes data across relevant systems.

## Problem Solved

**Original Challenge**: Users needed a way to handle different scenarios:
1. **Stable owners** with pharmacy modules who use medications for their own horses and sometimes sell surplus
2. **Pharmacy owners** who primarily sell medications commercially
3. **Mixed businesses** that need flexibility for both personal use and sales

The system needed to automatically determine where items should be synced (Inventory, Pharmacy, Store, Marketplace) based on business context.

## Solution Architecture

### 1. Enhanced Type System (`src/types/inventory-integration.ts`)

```typescript
// Core business types
export type BusinessType = 'stable_owner' | 'pharmacy_owner' | 'mixed_business';
export type UsageIntent = 'personal_use' | 'for_sale' | 'both';
export type DestinationModule = 'inventory' | 'pharmacy' | 'store' | 'marketplace';

// Enhanced inventory item with integration fields
export interface EnhancedInventoryItem {
  // ... existing fields ...
  
  // Integration fields
  businessType: BusinessType;
  usageIntent: UsageIntent;
  destinationModules: DestinationModule[];
  pharmacySettings?: PharmacySettings;
  salesConfiguration?: SalesConfiguration;
  
  // Auto-calculated
  isMedicalItem: boolean;
  requiresSpecialHandling: boolean;
  suggestedMarkup?: number;
  profitMargin?: number;
}
```

### 2. Cross-Module Synchronization Service (`src/services/inventory-pharmacy-sync.ts`)

**Key Features**:
- **Smart Module Detection**: Automatically determines which modules to sync to based on business logic
- **Medical Item Recognition**: Identifies medical items by classification keywords
- **Business-Specific Defaults**: Applies appropriate defaults based on business type
- **Markup Calculation**: Suggests pricing based on item type and business context

**Core Logic**:
```typescript
static determineDestinationModules(
  businessType: BusinessType,
  classification: string,
  listForSale: boolean,
  usageIntent: UsageIntent,
  isMedicalItem: boolean
): DestinationModule[] {
  const modules = ['inventory']; // Always include inventory
  
  if (isMedicalItem) {
    modules.push('pharmacy'); // Medical items always go to pharmacy
    
    if (businessType === 'pharmacy_owner') {
      // Pharmacy owners: everything potentially for sale
      if (listForSale !== false) {
        modules.push('store', 'marketplace');
      }
    } else if (businessType === 'stable_owner') {
      // Stable owners: only if explicitly marked for sale
      if (listForSale && usageIntent !== 'personal_use') {
        modules.push('store', 'marketplace');
      }
    }
  }
  
  return modules;
}
```

### 3. Enhanced Form Components

#### Enhanced Product Details Section (`src/components/inventory/item-form/EnhancedProductDetailsSection.tsx`)
- **Business Context Selector**: Choose between stable owner, pharmacy owner, or mixed business
- **Usage Intent Options**: Personal use, for sale, or both
- **Pharmacy Settings**: Medical-specific fields (prescription requirements, controlled substance, dosage form, storage requirements)
- **Sales Configuration**: Pricing, markup suggestions, minimum order quantities
- **Real-time Module Preview**: Shows which modules the item will sync to
- **Smart Validation**: Business-specific validation rules

#### Integration Showcase (`src/components/inventory/IntegrationShowcase.tsx`)
- **Visual Business Scenarios**: Shows how different business types handle the same items
- **Module Flow Diagrams**: Illustrates data flow across modules
- **Benefits Overview**: Key advantages of the integration
- **Implementation Details**: Technical explanation of how it works

### 4. Business Context Management (`src/contexts/BusinessContextProvider.tsx`)

Manages global business settings:
- Business type and licensing information
- Default markup percentages
- Compliance requirements
- Auto-sync preferences

## Business Scenarios

### Scenario 1: Stable Owner
```
Item: Penicillin Injectable
Classification: Antibiotic
Usage Intent: Personal Use
Modules: Inventory → Pharmacy
For Sale: No
```

**Behavior**:
- Item tracked in inventory for stock management
- Added to pharmacy module for medical compliance
- NOT added to store or marketplace
- No selling price required

### Scenario 2: Pharmacy Owner
```
Item: Horse Vitamins Premium
Classification: Vitamin Supplement
Usage Intent: For Sale
Modules: Inventory → Pharmacy → Store → Marketplace
For Sale: Yes (automatic)
```

**Behavior**:
- Full module integration
- Selling price required
- Automatic markup suggestions
- Complete compliance tracking

### Scenario 3: Mixed Business
```
Item: Anti-inflammatory Paste
Classification: Pain Management
Usage Intent: Both Personal & Sale
Modules: Inventory → Pharmacy → Store
For Sale: Yes (selective)
```

**Behavior**:
- Flexible configuration
- Partial module sync based on intent
- User controls sales channels

## Key Features

### 1. Automatic Module Detection
- System analyzes item classification, business type, and usage intent
- Automatically determines appropriate destination modules
- No manual module selection required

### 2. Medical Item Recognition
Keywords that trigger pharmacy module inclusion:
- `medical`, `vet`, `veterinary`
- `antibiotic`, `anti_inflammatory`, `sedative`
- `vitamin`, `vaccine`, `medication`, `drug`, `pharmaceutical`

### 3. Smart Pricing
- Automatic markup calculation based on item type
- Business-specific markup percentages:
  - Pharmacy owners: 40% for medical items
  - Stable owners: 60% for medical items
  - Feed items: 25% markup
  - Equipment: 75% markup

### 4. Compliance Integration
For medical items:
- Prescription requirements
- Controlled substance tracking
- Storage requirements
- Withdrawal periods
- Dosage forms and strengths

### 5. Data Synchronization
- Real-time sync across modules
- Consistent pricing and stock levels
- Automatic record creation in destination modules
- Sync status tracking and error handling

## Implementation Benefits

### For Stable Owners
- ✅ Medical items automatically tracked for compliance
- ✅ Personal use items not cluttering sales channels
- ✅ Option to sell surplus medications when needed
- ✅ Simplified inventory management

### For Pharmacy Owners
- ✅ All items automatically configured for sales
- ✅ Required pricing and compliance fields
- ✅ Full integration with store and marketplace
- ✅ Professional pharmaceutical management

### For Mixed Businesses
- ✅ Maximum flexibility per item
- ✅ Clear separation between personal and commercial use
- ✅ Comprehensive business management
- ✅ Scalable as business grows

## Technical Integration Points

### Form Enhancement
- Extended form schema with integration fields
- Real-time module preview
- Context-aware field visibility
- Smart defaults based on business type

### Data Flow
1. User adds item in Inventory module
2. System analyzes business context and item properties
3. Determines destination modules automatically
4. Creates records in relevant modules with appropriate data transformation
5. Maintains sync status and handles errors

### Module Transformations
- **Inventory → Pharmacy**: Adds medical compliance fields, dosage information
- **Inventory → Store**: Adds pricing, sales configuration
- **Inventory → Marketplace**: Adds public listing information

## Future Enhancements

### Planned Features
- [ ] Bulk import with automatic classification
- [ ] Advanced pricing rules and discount tiers
- [ ] Integration with external pharmacy databases
- [ ] Automated reorder suggestions
- [ ] Compliance reporting and auditing
- [ ] Multi-location inventory tracking

### API Integration Points
- [ ] DEA database integration for controlled substances
- [ ] Veterinary drug database lookups
- [ ] Automated pricing from supplier catalogs
- [ ] Real-time inventory synchronization

## Usage Instructions

### Getting Started
1. Navigate to **Inventory Management** → **Pharmacy Integration** tab
2. Review the business scenarios and select your business type
3. Add items using the enhanced form with automatic module detection
4. Monitor sync status and module integration

### Best Practices
- Set up business context first for optimal defaults
- Use clear, descriptive item classifications
- Review suggested pricing before saving
- Monitor sync status for any integration issues
- Regularly audit compliance settings for medical items

## Conclusion

This integration system provides a seamless, intelligent way to manage inventory across multiple business contexts while maintaining compliance and operational efficiency. The automatic module detection and business-specific defaults significantly reduce manual configuration while ensuring items are properly categorized and synced across all relevant systems. 