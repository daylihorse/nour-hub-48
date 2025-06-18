
export interface BreedingRecord {
  id: string;
  stallionId: string;
  date: string;
  mareName: string;
  mareId: string;
  mareOwner: string;
  method: string;
  result: string;
  status: string;
  expectedFoaling: string;
  veterinarian: string;
  contractId?: string;
  studFee?: number;
  notes?: string;
  createdAt: Date;
}

export interface CollectedSemen {
  id: string;
  stallionId: string;
  collectionDate: string;
  volume: string;
  concentration: string;
  motility: string;
  morphology?: number;
  pH?: number;
  technician: string;
  status: string;
  quality: string;
  qualityGrade: string;
  temperature?: string;
  ph?: string;
  notes?: string;
  createdAt: Date;
}

export interface FrozenSemen {
  id: string;
  stallionId: string;
  batchNumber: string;
  freezingDate: string;
  dosesProduced: number;
  dosesAvailable: number;
  motilityPreFreeze: number;
  motilityPostThaw: number;
  storageLocation: string;
  expiryDate: string;
  status: string;
  notes?: string;
  createdAt: Date;
}

export interface FrozenEmbryo {
  id: string;
  stallionId: string;
  embryoId: string;
  donorMare: string;
  mareName: string;
  mareOwner: string;
  collectionDate: string;
  freezingDate: string;
  grade: string;
  qualityGrade: string;
  stage: string;
  storageLocation: string;
  recipientMare?: string;
  transferDate?: string;
  status: string;
  notes?: string;
  createdAt: Date;
}

// Additional interfaces for inventory management
export interface FrozenSemenInventory {
  id: string;
  stallionId: string;
  freezeDate: string;
  straws: number;
  tank: string;
  quality: string;
  viability: string;
  location: string;
  expiry: string;
  batchNumber?: string;
  freezingProtocol?: string;
  createdAt: Date;
}

export interface FrozenEmbryoInventory {
  id: string;
  stallionId: string;
  creationDate: string;
  mareName: string;
  mareId?: string;
  grade: string;
  stage: string;
  viability: string;
  tank: string;
  location: string;
  diameter?: string;
  freezingMethod?: string;
  createdAt: Date;
}

// Base record interface
export interface StallionDetailRecord {
  id: string;
  stallionId: string;
  createdAt: Date;
}

// Filter interfaces
export interface StallionDetailFilters {
  searchTerm?: string;
  dateRange?: {
    start: string;
    end: string;
  };
  status?: string[];
  quality?: string[];
  technician?: string[];
  method?: string[];
}
