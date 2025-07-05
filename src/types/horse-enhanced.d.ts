import { Gender, AgeClass, AdultMaleType, PregnancyStatus } from "./horse-classification";

export interface EnhancedHorse {
  id: string;
  // Basic Information
  name: string;
  arabicName?: string;
  breed: string;
  
  // Enhanced Gender & Age Classification
  gender: Gender;
  ageClass?: AgeClass;
  adultMaleType?: AdultMaleType;
  castrationDate?: string;
  isPregnant?: PregnancyStatus;
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

export interface EnhancedHorseFormData extends Omit<EnhancedHorse, 'id'> {}