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

export interface ComplianceAudit {
  id: string;
  type: 'dea' | 'state' | 'fda' | 'internal';
  date: Date;
  status: 'passed' | 'conditional' | 'failed' | 'in_progress';
  score: number;
  violations: ComplianceViolation[];
  recommendations: string[];
  auditor: string;
  nextAuditDate?: Date;
  reportUrl?: string;
}

export interface ComplianceViolation {
  id: string;
  severity: 'minor' | 'major' | 'critical';
  description: string;
  regulation: string;
  correctionRequired: boolean;
  correctionDeadline?: Date;
  status: 'open' | 'corrected' | 'pending_review';
}

export interface DrugInteraction {
  id: string;
  medications: string[];
  severity: 'minor' | 'moderate' | 'major' | 'contraindicated';
  type: 'additive_toxicity' | 'efficacy_reduction' | 'pharmacokinetic' | 'pharmacodynamic';
  description: string;
  mechanism: string;
  recommendation: string;
  clinicalImportance: 'low' | 'medium' | 'high';
  references?: string[];
}

export interface TreatmentProtocol {
  id: string;
  title: string;
  condition: string;
  severity: 'mild' | 'moderate' | 'severe';
  medications: ProtocolMedication[];
  monitoring: string[];
  duration: string;
  contraindications: string[];
  warnings: string[];
  notes?: string;
  references?: string[];
  lastUpdated: Date;
  version: string;
}

export interface ProtocolMedication {
  pharmacyItemId: string;
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  route: 'PO' | 'IV' | 'IM' | 'SC' | 'topical' | 'inhalation';
  isRequired: boolean;
  alternatives?: string[];
}

export interface AutomationRule {
  id: string;
  name: string;
  type: 'low_stock' | 'expiration' | 'refill_reminder' | 'maintenance' | 'compliance';
  isActive: boolean;
  conditions: RuleCondition[];
  actions: RuleAction[];
  lastTriggered?: Date;
  timesTriggered: number;
}

export interface RuleCondition {
  field: string;
  operator: 'equals' | 'less_than' | 'greater_than' | 'contains' | 'between';
  value: string | number;
}

export interface RuleAction {
  type: 'send_alert' | 'create_order' | 'send_email' | 'update_status' | 'generate_report';
  parameters: Record<string, any>;
}

export interface PharmacyEquipment {
  id: string;
  name: string;
  type: 'refrigerator' | 'freezer' | 'scale' | 'counting_machine' | 'labeling_machine';
  location: string;
  serialNumber: string;
  manufacturer: string;
  model: string;
  installDate: Date;
  lastMaintenance: Date;
  nextMaintenance: Date;
  status: 'operational' | 'maintenance_required' | 'out_of_service';
  temperatureRange?: {
    min: number;
    max: number;
  };
  calibrationDate?: Date;
  warrantyExpiration?: Date;
}
