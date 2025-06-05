
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
