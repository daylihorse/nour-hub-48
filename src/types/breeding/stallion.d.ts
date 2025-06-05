
import { BreedingBooking, AvailabilitySlot } from './contracts';

export interface StallionRecord {
  id: string;
  horseId: string;
  horseName: string;
  status: 'active' | 'retired' | 'unavailable';
  
  // Breeding performance
  totalMares: number;
  successfulBreedings: number;
  livefoals: number;
  successRate: number;
  
  // Breeding schedule
  bookings: BreedingBooking[];
  availabilitySchedule: AvailabilitySlot[];
  
  // Fees and contracts
  studFee: number;
  livefoalGuarantee: boolean;
  
  createdAt: Date;
  updatedAt: Date;
}
