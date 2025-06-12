
export interface CollectedSemen {
  id: string;
  stallionId: string;
  collectionDate: string;
  volume: string;
  concentration: string;
  motility: string;
  quality: 'Excellent' | 'Good' | 'Fair' | 'Poor';
  technician: string;
  status: 'Fresh' | 'Used' | 'Frozen' | 'Discarded';
  notes?: string;
  temperature?: string;
  ph?: string;
  createdAt: Date;
}

export interface FrozenSemenInventory {
  id: string;
  stallionId: string;
  freezeDate: string;
  straws: number;
  tank: string;
  quality: 'Grade A' | 'Grade B' | 'Grade C';
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
  grade: 'Grade 1' | 'Grade 2' | 'Grade 3' | 'Grade 4';
  stage: 'Morula' | 'Early Blastocyst' | 'Blastocyst' | 'Expanded Blastocyst' | 'Hatched Blastocyst';
  viability: string;
  tank: string;
  location: string;
  diameter?: string;
  freezingMethod?: string;
  createdAt: Date;
}

export interface BreedingRecord {
  id: string;
  stallionId: string;
  date: string;
  mareName: string;
  mareId?: string;
  mareOwner: string;
  method: 'AI Fresh' | 'AI Frozen' | 'Natural Cover' | 'Embryo Transfer';
  result: 'Confirmed Pregnant' | 'Not Pregnant' | 'Pending' | 'Live Foal' | 'Lost Pregnancy';
  status: 'Active' | 'Completed' | 'Monitoring' | 'Cancelled';
  expectedFoaling?: string;
  veterinarian: string;
  contractId?: string;
  studFee?: number;
  notes?: string;
  createdAt: Date;
}

export type StallionDetailRecord = CollectedSemen | FrozenSemenInventory | FrozenEmbryoInventory | BreedingRecord;

export interface StallionDetailFilters {
  dateRange?: { start: string; end: string };
  status?: string[];
  quality?: string[];
  technician?: string[];
  method?: string[];
  searchTerm?: string;
}
