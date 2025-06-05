
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
