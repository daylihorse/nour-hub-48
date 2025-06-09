
import { CartItem, Sale } from '@/types/store';
import { Client } from '@/types/client';

export interface PharmacyPOSState {
  cart: CartItem[];
  client?: PharmacyClient;
  prescriptionId?: string;
  saleType: 'prescription' | 'otc' | 'consultation';
  paymentMethod: 'cash' | 'card' | 'insurance' | 'account';
  insuranceInfo?: InsuranceInfo;
  discount: number;
  requiresConsultation: boolean;
}

export interface PharmacyClient extends Client {
  insuranceInfo?: InsuranceInfo;
  allergies?: string[];
  currentMedications?: string[];
  prescriptionHistory?: PrescriptionHistoryItem[];
  pickupNotifications: boolean;
}

export interface InsuranceInfo {
  provider: string;
  policyNumber: string;
  groupNumber?: string;
  copayAmount?: number;
  deductibleMet: boolean;
  coveragePercentage: number;
  preAuthRequired: boolean;
}

export interface PrescriptionHistoryItem {
  id: string;
  prescriptionNumber: string;
  medication: string;
  dosage: string;
  quantity: number;
  fillDate: Date;
  veterinarian: string;
  horseId: string;
  horseName: string;
}

export interface PharmacySale extends Sale {
  saleType: 'prescription' | 'otc' | 'consultation';
  prescriptionId?: string;
  clientId?: string;
  insuranceClaim?: InsuranceClaim;
  consultationNotes?: string;
  requiresFollowUp: boolean;
}

export interface InsuranceClaim {
  id: string;
  claimNumber: string;
  amount: number;
  status: 'pending' | 'approved' | 'denied' | 'partial';
  submissionDate: Date;
  responseDate?: Date;
  denialReason?: string;
}

export interface MedicationPickupNotification {
  id: string;
  clientId: string;
  prescriptionId: string;
  medication: string;
  readyForPickup: Date;
  notificationSent: boolean;
  pickedUp: boolean;
  pickupDate?: Date;
}
