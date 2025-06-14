
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
  volume: number;
  concentration: number;
  motility: number;
  morphology: number;
  pH: number;
  collectedBy: string;
  status: string;
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
  collectionDate: string;
  freezingDate: string;
  grade: string;
  stage: string;
  storageLocation: string;
  recipientMare?: string;
  transferDate?: string;
  status: string;
  notes?: string;
  createdAt: Date;
}
