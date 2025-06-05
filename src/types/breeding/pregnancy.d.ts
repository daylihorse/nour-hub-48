
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
