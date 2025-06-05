
import { PregnancyRecord } from './pregnancy';

export interface MareRecord {
  id: string;
  horseId: string;
  horseName: string;
  status: 'open' | 'bred' | 'pregnant' | 'nursing' | 'retired';
  
  // Breeding history
  pregnancies: PregnancyRecord[];
  lastBreedingDate?: Date;
  nextExpectedHeat?: Date;
  
  // Foaling history
  totalFoals: number;
  liveFoals: number;
  
  createdAt: Date;
  updatedAt: Date;
}
