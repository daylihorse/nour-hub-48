
export interface BreedingRecord {
  id: string;
  horseId: string;
  horseName: string;
  type: 'breeding' | 'pregnancy' | 'birth';
  status: 'planned' | 'active' | 'completed' | 'cancelled' | 'failed';
  
  // Breeding specific fields
  mateId?: string;
  mateName?: string;
  breedingDate?: Date;
  breedingMethod?: 'natural' | 'artificial_insemination' | 'embryo_transfer';
  
  // Pregnancy specific fields
  pregnancyStartDate?: Date;
  expectedDueDate?: Date;
  actualDueDate?: Date;
  pregnancyDuration?: number; // in days
  
  // Birth specific fields
  birthDate?: Date;
  foalId?: string;
  foalName?: string;
  foalGender?: 'male' | 'female';
  birthWeight?: number;
  birthComplications?: string;
  
  // General fields
  veterinarian?: string;
  notes?: string;
  cost?: number;
  
  createdAt: Date;
  updatedAt: Date;
}

export interface BreedingEvent {
  id: string;
  type: 'breeding' | 'ultrasound' | 'foaling';
  horse: string;
  date: string;
  status: 'scheduled' | 'confirmed' | 'monitoring' | 'completed';
  mate?: string;
  method?: 'natural' | 'artificial_insemination';
  veterinarian?: string;
  expectedDate?: string;
  daysRemaining?: number;
}

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

export interface PregnancyRecord {
  id: string;
  mareId: string;
  stallionId?: string;
  breedingDate: Date;
  expectedDueDate: Date;
  actualDueDate?: Date;
  status: 'confirmed' | 'monitoring' | 'delivered' | 'lost';
  
  // Veterinary monitoring
  ultrasounds: UltrasoundRecord[];
  checkups: VetCheckup[];
  
  // Birth details
  foalDetails?: FoalDetails;
  
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface BreedingBooking {
  id: string;
  stallionId: string;
  mareId: string;
  requestedDate: Date;
  confirmedDate?: Date;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  method: 'natural' | 'artificial_insemination';
  cost: number;
  notes?: string;
  createdAt: Date;
}

export interface AvailabilitySlot {
  id: string;
  date: Date;
  timeSlot: string;
  isAvailable: boolean;
  isBooked: boolean;
  bookingId?: string;
}

export interface UltrasoundRecord {
  id: string;
  pregnancyId: string;
  date: Date;
  gestationDay: number;
  findings: string;
  images?: string[];
  veterinarian: string;
}

export interface VetCheckup {
  id: string;
  pregnancyId: string;
  date: Date;
  type: 'routine' | 'emergency' | 'ultrasound' | 'vaccination';
  findings: string;
  recommendations?: string;
  nextCheckupDate?: Date;
  veterinarian: string;
}

export interface FoalDetails {
  id: string;
  name?: string;
  gender: 'male' | 'female';
  birthDate: Date;
  birthTime?: string;
  birthWeight?: number;
  height?: number;
  color?: string;
  markings?: string;
  complications?: string;
  healthStatus: 'healthy' | 'needs_attention' | 'critical';
  registrationNumber?: string;
}

export interface BreedingFormData {
  stallionId: string;
  mareId: string;
  breedingDate: Date;
  method: 'natural' | 'artificial_insemination' | 'embryo_transfer';
  veterinarian?: string;
  notes?: string;
  cost?: number;
}

export interface PregnancyFormData {
  mareId: string;
  stallionId?: string;
  breedingDate: Date;
  expectedDueDate: Date;
  veterinarian?: string;
  notes?: string;
}

export interface BreedingFilters {
  status?: string;
  dateRange?: {
    start: Date;
    end: Date;
  };
  horseId?: string;
  veterinarian?: string;
  type?: string;
}
