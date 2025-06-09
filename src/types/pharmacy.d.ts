
export interface PharmacyItem {
  id: string;
  name: string;
  genericName?: string;
  brandName?: string;
  category: 'antibiotic' | 'anti_inflammatory' | 'sedative' | 'vitamin' | 'vaccine' | 'other';
  dosageForm: 'tablet' | 'injection' | 'liquid' | 'powder' | 'ointment';
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
  activeIngredient: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Prescription {
  id: string;
  prescriptionNumber: string;
  horseId: string;
  horseName: string;
  veterinarianId: string;
  veterinarianName: string;
  clientId: string;
  clientName: string;
  prescriptionDate: Date;
  medications: PrescriptionMedication[];
  diagnosis: string;
  instructions: string;
  status: 'pending' | 'dispensed' | 'partially_dispensed' | 'cancelled';
  totalAmount: number;
  dispensedBy?: string;
  dispensedDate?: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PrescriptionMedication {
  id: string;
  pharmacyItemId: string;
  medicationName: string;
  dosage: string;
  frequency: string;
  duration: string;
  quantity: number;
  quantityDispensed: number;
  unitPrice: number;
  totalPrice: number;
  instructions: string;
  substitutionAllowed: boolean;
}

export interface PharmacyTransaction {
  id: string;
  type: 'sale' | 'prescription' | 'return' | 'adjustment';
  referenceNumber: string;
  horseId?: string;
  clientId?: string;
  prescriptionId?: string;
  items: TransactionItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  paymentMethod: 'cash' | 'card' | 'account' | 'insurance';
  processedBy: string;
  createdAt: Date;
}

export interface TransactionItem {
  pharmacyItemId: string;
  itemName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  batchNumber: string;
  expiryDate: string;
}

export interface PharmacySupplier {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  licenseNumber: string;
  specialties: string[];
  isActive: boolean;
  createdAt: Date;
}

export interface PharmacyAlert {
  id: string;
  type: 'low_stock' | 'expiry_warning' | 'expired' | 'controlled_substance' | 'prescription_due';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  message: string;
  itemId?: string;
  prescriptionId?: string;
  createdAt: Date;
  isRead: boolean;
  actionRequired: boolean;
}
