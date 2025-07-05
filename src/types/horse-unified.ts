
export type HorseGender = 'stallion' | 'mare' | 'gelding';
export type HorseStatus = 'active' | 'inactive' | 'transferred' | 'deceased';

export interface Horse {
  id: string;
  name: string;
  arabicName?: string;
  breed: string;
  gender: HorseGender;
  birthDate: string;
  color: string;
  status: HorseStatus;
  ownerName: string;
  registrationNumber: string;
  microchipId?: string;
  height?: number;
  weight?: number;
}

// Form-related types
export type OwnerType = 'individual' | 'company' | 'partnership';
export type HealthStatus = 'healthy' | 'under_treatment' | 'quarantine';
export type VaccinationStatus = 'up_to_date' | 'partial' | 'none';
export type AgeClass = 'foal' | 'yearling' | 'adult';
export type AdultMaleType = 'stallion' | 'gelding';

export interface HorseFormData {
  // Basic Information
  name: string;
  arabicName?: string;
  breed: string;
  gender: HorseGender;
  ageClass?: AgeClass;
  adultMaleType?: AdultMaleType;
  castrationDate?: string;
  isPregnant?: boolean;
  pregnancyDuration?: number;
  birthDate: string;
  color: string;
  height?: number;
  weight?: number;
  
  // Identification
  registrationNumber?: string;
  passportNumber?: string;
  microchipId?: string;
  
  // Ownership
  ownerType: OwnerType;
  ownerName: string;
  ownerContact: string;
  
  // Pedigree
  sire?: string;
  dam?: string;
  bloodlineOrigin?: string;
  
  // Health & Medical
  healthStatus: HealthStatus;
  vaccinationStatus: VaccinationStatus;
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
  
  // Files
  images: File[];
  documents: File[];
  
  // Status
  status: HorseStatus;
}

export interface FormStage {
  id: string;
  title: string;
  description: string;
  fields: string[];
  isComplete: boolean;
  isRequired: boolean;
}
