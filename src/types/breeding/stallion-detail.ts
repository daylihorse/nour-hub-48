
export interface StallionDetail {
  id: string;
  horseId: string;
  horseName: string;
  registrationNumber: string;
  breed: string;
  age: number;
  color: string;
  height: string;
  weight: string;
  status: string;
  studFee: number;
  location: string;
  owner: string;
  manager: string;
  veterinarian: string;
  description: string;
  totalMares: number;
  successfulBreedings: number;
  livefoals: number;
  successRate: number;
  nextAvailable: string;
  bookings: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CollectedSemen {
  id: string;
  stallionId: string;
  collectionDate: string;
  technician: string;
  volume: string;
  concentration: string;
  motility: string;
  quality: string;
  status: string;
  notes?: string;
  createdAt: Date;
}

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

export interface BreedingRecord {
  id: string;
  stallionId: string;
  mareName: string;
  mareOwner: string;
  date: string;
  method: string;
  veterinarian: string;
  status: string;
  result: string;
  expectedFoaling?: string;
  notes?: string;
  createdAt: Date;
}

export interface StallionDetailFilters {
  searchTerm?: string;
  quality?: string[];
  status?: string[];
  dateRange?: {
    from: Date;
    to: Date;
  };
}
