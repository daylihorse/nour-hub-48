
import { PregnancyRecord } from './pregnancy';

// Main interface for Mare records - this will be the standard across the app
export interface Mare {
  id: string;
  horseId: string;
  horseName: string;
  status: 'open' | 'bred' | 'pregnant' | 'nursing' | 'retired';
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

// Extended interface for advanced breeding management
export interface MareRecord extends Mare {
  // Breeding history
  pregnancies: PregnancyRecord[];
  nextExpectedHeat?: Date | null;
  
  // Additional tracking fields
  createdAt: Date;
  updatedAt: Date;
}

// Helper function to transform Mare to MareRecord
export const mareToMareRecord = (mare: Mare): MareRecord => ({
  ...mare,
  pregnancies: [],
  nextExpectedHeat: mare.nextHeat ? new Date(mare.nextHeat) : null,
  createdAt: new Date(),
  updatedAt: new Date()
});
