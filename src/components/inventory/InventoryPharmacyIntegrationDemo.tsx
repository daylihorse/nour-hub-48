
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { EnhancedInventoryItem, DestinationModule } from '@/types/inventory-integration';

const InventoryPharmacyIntegrationDemo = () => {
  // Mock data with proper types
  const mockInventoryItems: EnhancedInventoryItem[] = [
    {
      id: '1',
      productName: 'Banamine Injectable',
      warehouse: 'Medicine Warehouse',
      classification: 'Veterinary Medicine',
      entryDate: new Date('2024-01-15'),
      expiryDate: new Date('2025-06-30'),
      batchNumber: 'BAN-2024-001',
      supplier: 'Arabian Horse Pharmacy',
      quantitiesPurchased: 50,
      unitOfMeasure: 'vial',
      alertThreshold: 10,
      purchasePrice: 25.50,
      listForSale: true,
      sellingPrice: 35.00,
      businessType: 'mixed_business',
      usageIntent: 'both',
      destinationModules: ['inventory', 'pharmacy', 'store', 'marketplace'] as DestinationModule[],
      isMedicalItem: true,
      requiresSpecialHandling: true,
      pharmacySettings: {
        requiresPrescription: true,
        controlledSubstance: false,
        dosageForm: 'injection',
        strength: '50mg/ml',
        activeIngredient: 'Flunixin Meglumine',
        storageRequirements: 'Store at room temperature'
      },
      salesConfiguration: {
        markupPercentage: 37,
        minimumOrderQuantity: 1,
        availableForOnlineOrders: false,
        requiresConsultation: true
      },
      syncStatus: {
        inventory: true,
        pharmacy: true,
        store: true,
        marketplace: false
      },
      suggestedMarkup: 40,
      profitMargin: 37
    },
    {
      id: '2',
      productName: 'Horse Feed Supplement',
      warehouse: 'Feed Storage',
      classification: 'Feed Supplement',
      entryDate: new Date('2024-02-01'),
      supplier: 'Feed Supply Co',
      quantitiesPurchased: 100,
      unitOfMeasure: 'bag',
      alertThreshold: 20,
      purchasePrice: 15.00,
      listForSale: true,
      sellingPrice: 22.50,
      businessType: 'stable_owner',
      usageIntent: 'for_sale',
      destinationModules: ['inventory', 'store'] as DestinationModule[],
      isMedicalItem: false,
      requiresSpecialHandling: false,
      salesConfiguration: {
        markupPercentage: 50,
        minimumOrderQuantity: 5,
        availableForOnlineOrders: true,
        requiresConsultation: false
      },
      syncStatus: {
        inventory: true,
        pharmacy: false,
        store: true,
        marketplace: true
      },
      suggestedMarkup: 45,
      profitMargin: 50
    }
  ];

  const [selectedItem, setSelectedItem] = useState<EnhancedInventoryItem | null>(null);

  const getStatusBadge = (synced: boolean) => (
    <Badge variant={synced ? "default" : "secondary"}>
      {synced ? "Synced" : "Not Synced"}
    </Badge>
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Inventory-Pharmacy Integration Demo</CardTitle>
          <CardDescription>
            Demonstration of enhanced inventory items with pharmacy integration
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {mockInventoryItems.map((item) => (
              <Card key={item.id} className="cursor-pointer hover:bg-muted/50" 
                    onClick={() => setSelectedItem(item)}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{item.productName}</h3>
                      <p className="text-sm text-muted-foreground">{item.classification}</p>
                      <div className="flex gap-2 mt-2">
                        <Badge variant="outline">{item.businessType}</Badge>
                        <Badge variant="outline">{item.usageIntent}</Badge>
                        {item.isMedicalItem && <Badge variant="destructive">Medical</Badge>}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${item.sellingPrice}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.profitMargin}% margin
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-4 grid grid-cols-4 gap-2">
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Inventory</p>
                      {getStatusBadge(item.syncStatus.inventory)}
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Pharmacy</p>
                      {getStatusBadge(item.syncStatus.pharmacy)}
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Store</p>
                      {getStatusBadge(item.syncStatus.store)}
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Marketplace</p>
                      {getStatusBadge(item.syncStatus.marketplace)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {selectedItem && (
        <Card>
          <CardHeader>
            <CardTitle>Item Details: {selectedItem.productName}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Basic Information</h4>
                <div className="space-y-1">
                  <p><span className="font-medium">Classification:</span> {selectedItem.classification}</p>
                  <p><span className="font-medium">Supplier:</span> {selectedItem.supplier}</p>
                  <p><span className="font-medium">Quantity:</span> {selectedItem.quantitiesPurchased} {selectedItem.unitOfMeasure}</p>
                  <p><span className="font-medium">Purchase Price:</span> ${selectedItem.purchasePrice}</p>
                  <p><span className="font-medium">Selling Price:</span> ${selectedItem.sellingPrice}</p>
                </div>
              </div>
              
              {selectedItem.pharmacySettings && (
                <div>
                  <h4 className="font-semibold mb-2">Pharmacy Settings</h4>
                  <div className="space-y-1">
                    <p><span className="font-medium">Requires Prescription:</span> {selectedItem.pharmacySettings.requiresPrescription ? 'Yes' : 'No'}</p>
                    <p><span className="font-medium">Controlled Substance:</span> {selectedItem.pharmacySettings.controlledSubstance ? 'Yes' : 'No'}</p>
                    {selectedItem.pharmacySettings.dosageForm && (
                      <p><span className="font-medium">Dosage Form:</span> {selectedItem.pharmacySettings.dosageForm}</p>
                    )}
                    {selectedItem.pharmacySettings.strength && (
                      <p><span className="font-medium">Strength:</span> {selectedItem.pharmacySettings.strength}</p>
                    )}
                    {selectedItem.pharmacySettings.activeIngredient && (
                      <p><span className="font-medium">Active Ingredient:</span> {selectedItem.pharmacySettings.activeIngredient}</p>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            <div className="mt-4">
              <Button variant="outline" onClick={() => setSelectedItem(null)}>
                Close Details
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default InventoryPharmacyIntegrationDemo;
