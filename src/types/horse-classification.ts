export type Gender = 'male' | 'female';
export type AgeClass = 'foal' | 'colt' | 'filly' | 'stallion' | 'gelding' | 'mare';
export type AdultMaleType = 'stallion' | 'gelding';
export type PregnancyStatus = 'yes' | 'no';

export interface HorseClassification {
  gender: Gender;
  birthDate: string;
  ageClass?: AgeClass;
  adultMaleType?: AdultMaleType;
  castrationDate?: string;
  isPregnant?: PregnancyStatus;
  pregnancyDuration?: number;
}

export interface AgeCalculationResult {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  isUnder3Years: boolean;
}

export interface ClassificationRules {
  isUnder3Years: boolean;
  isMale: boolean;
  isFemale: boolean;
  availableClasses: AgeClass[];
  requiresAdultMaleType: boolean;
  allowsPregnancy: boolean;
}