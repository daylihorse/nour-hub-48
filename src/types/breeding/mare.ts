
import { PregnancyRecord } from './pregnancy';

export interface MareRecord {
  id: string;
  horseId: string;
  horseName: string;
  status: 'open' | 'bred' | 'pregnant' | 'nursing' | 'retired';
  age: number;
  breed: string;
  
  // Breeding history
  pregnancies: PregnancyRecord[];
  lastBreedingDate?: Date;
  nextExpectedHeat?: Date;
  
  // Foaling history
  totalFoals: number;
  liveFoals: number;
  
  // Additional fields for compatibility
  expectedDueDate?: Date | null;
  pregnancyDay?: number;
  nextHeat?: Date | null;
  stallionName?: string | null;
  foalBirthDate?: Date;
  
  createdAt: Date;
  updatedAt: Date;
}

// Legacy interface for backward compatibility
export interface Mare {
  id: string;
  horseId: string;
  horseName: string;
  status: string;
  age: number;
  breed: string;
  totalFoals: number;
  liveFoals: number;
  lastBreedingDate: string | null;
  expectedDueDate: string | null;
  pregnancyDay: number;
  nextHeat: string | null;
  stallionName: string | null;
  foalBirthDate?: string;
}
