
export interface MareFrozenEmbryoInventory {
  id: string;
  mareId: string;
  mareName: string;
  stallionId: string;
  stallionName: string;
  creationDate: string;
  stage: string;
  grade: string;
  viability: string;
  tank: string;
  location: string;
  diameter?: string;
  freezingMethod?: string;
  transferDate?: string;
  transferResult?: string;
  notes?: string;
  createdAt: Date;
}

export interface MareFrozenEmbryoFilters {
  searchTerm: string;
  grade: string[];
  stage: string[];
  stallion: string[];
  dateRange?: {
    from?: Date;
    to?: Date;
  };
}
