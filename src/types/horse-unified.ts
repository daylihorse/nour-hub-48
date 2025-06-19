
export interface Horse {
  id: string;
  // Basic Information
  name: string;
  arabicName?: string;
  breed: string;
  gender: 'stallion' | 'mare' | 'gelding';
  ageClass?: string;
  adultMaleType?: 'stallion' | 'gelding';
  castrationDate?: string;
  isPregnant?: 'yes' | 'no';
  pregnancyDuration?: number;
  birthDate: string;
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
  lastVetCheckup?: string;
  medicalConditions?: string;
  allergies?: string;
  
  // Training & Performance
  trainingLevel?: string;
  disciplines?: string;
  competitionHistory?: string;
  achievements?: string;
  
  // Stable Management
  stallNumber?: string;
  feedingSchedule?: string;
  exerciseRoutine?: string;
  specialNeeds?: string;
  
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
  status: 'active' | 'inactive' | 'transferred' | 'deceased';
}

export interface HorseFormData extends Omit<Horse, 'id'> {}

export interface FormStage {
  id: string;
  title: string;
  description: string;
  fields: string[];
  isComplete: boolean;
  isRequired: boolean;
}

// Gender-specific types for better type safety
export type HorseGender = 'stallion' | 'mare' | 'gelding';
export type OwnerType = 'individual' | 'company' | 'partnership';
export type HealthStatus = 'healthy' | 'under_treatment' | 'quarantine';
export type VaccinationStatus = 'up_to_date' | 'partial' | 'none';
export type HorseStatus = 'active' | 'inactive' | 'transferred' | 'deceased';
