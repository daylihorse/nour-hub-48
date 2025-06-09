
export interface InventoryItem {
  id: string;
  name: string;
  genericName: string;
  brandName?: string;
  category: 'antibiotic' | 'anti_inflammatory' | 'sedative' | 'vitamin' | 'vaccine' | 'other';
  dosageForm: 'injection' | 'liquid' | 'powder' | 'ointment' | 'tablet';
  strength: string;
  unit: string;
  currentStock: number;
  minimumStock: number;
  maximumStock: number;
  expiryDate: string;
  batchNumber: string;
  supplier: string;
  unitCost: number;
  sellingPrice: number;
  location: string;
  requiresPrescription: boolean;
  controlledSubstance: boolean;
  storageRequirements: string;
}

export interface StockStatus {
  status: 'out_of_stock' | 'low_stock' | 'in_stock';
  color: string;
  text: string;
}
