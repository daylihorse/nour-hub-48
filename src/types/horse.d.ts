
export interface Horse {
  id: string;
  // Basic Information
  name: string;
  arabicName?: string;
  breed: string;
  gender: 'stallion' | 'mare' | 'gelding';
  birthDate: Date;
  color: string;
  height?: number;
  weight?: number;
  
  // Ownership & Documentation
  ownerType: 'individual' | 'company' | 'partnership';
  ownerName: string;
  ownerContact: string;
  registrationNumber?: string;
  passportNumber?: string;
  microchipId?: string;
  
  // Pedigree
  sire?: string;
  dam?: string;
  bloodlineOrigin?: string;
  
  // Health & Medical
  healthStatus: 'healthy' | 'under_treatment' | 'quarantine';
  vaccinationStatus: 'up_to_date' | 'partial' | 'none';
  lastVetCheckup?: Date;
  medicalConditions?: string[];
  allergies?: string[];
  
  // Training & Performance
  trainingLevel: 'untrained' | 'basic' | 'intermediate' | 'advanced' | 'professional';
  disciplines?: string[];
  competitionHistory?: string[];
  achievements?: string[];
  
  // Stable Management
  stallNumber?: string;
  feedingSchedule?: string;
  exerciseRoutine?: string;
  specialNeeds?: string[];
  
  // Insurance & Financial
  insured: boolean;
  insuranceProvider?: string;
  insuranceValue?: number;
  purchasePrice?: number;
  marketValue?: number;
  
  // Documents & Images
  images: string[];
  documents: string[];
  
  // System fields
  createdAt: Date;
  updatedAt: Date;
  status: 'active' | 'inactive' | 'transferred' | 'deceased';
}

export interface HorseFormData extends Omit<Horse, 'id' | 'createdAt' | 'updatedAt'> {}

export interface FormStage {
  id: string;
  title: string;
  description: string;
  fields: string[];
  isComplete: boolean;
  isRequired: boolean;
}
