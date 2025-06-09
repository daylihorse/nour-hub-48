
export interface TrainingProgram {
  id: string;
  name: string;
  description: string;
  type: 'basic' | 'advanced' | 'specialized' | 'rehabilitation' | 'competition';
  discipline: string;
  duration: number; // weeks
  intensity: 'low' | 'medium' | 'high';
  maxParticipants: number;
  currentParticipants: number;
  trainer: {
    id: string;
    name: string;
    specializations: string[];
    certifications: string[];
  };
  schedule: {
    days: string[];
    timeSlots: string[];
    location: string;
  };
  requirements: {
    minimumAge: number;
    healthClearance: boolean;
    experienceLevel: string;
    equipment: string[];
  };
  status: 'active' | 'inactive' | 'full' | 'completed';
  startDate: Date;
  endDate: Date;
  cost: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface TrainingSession {
  id: string;
  programId: string;
  horseId: string;
  trainerId: string;
  date: Date;
  duration: number; // minutes
  type: 'group' | 'individual' | 'assessment';
  activities: string[];
  location: string;
  equipment: string[];
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  notes?: string;
  performanceMetrics?: {
    endurance: number;
    technique: number;
    behavior: number;
    improvement: number;
  };
  veterinaryNotes?: string;
  injuries?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface TrainingAssessment {
  id: string;
  horseId: string;
  assessorId: string;
  type: 'initial' | 'progress' | 'final' | 'monthly';
  date: Date;
  scores: {
    physicalFitness: number;
    technicalSkills: number;
    mentalReadiness: number;
    overallProgress: number;
  };
  strengths: string[];
  areasForImprovement: string[];
  recommendations: string[];
  nextAssessmentDate: Date;
  createdAt: Date;
}

export interface TrainingFacility {
  id: string;
  name: string;
  type: 'arena' | 'paddock' | 'track' | 'jumps' | 'dressage' | 'cross_country';
  capacity: number;
  equipment: string[];
  status: 'available' | 'occupied' | 'maintenance' | 'reserved';
  schedule: {
    date: Date;
    timeSlot: string;
    programId?: string;
    reserved: boolean;
  }[];
  maintenanceHistory: {
    date: Date;
    type: string;
    description: string;
    cost: number;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

export interface TrainingWorkflow {
  id: string;
  type: 'enrollment' | 'assessment' | 'program_completion' | 'injury_management';
  horseId: string;
  programId?: string;
  status: 'pending' | 'in_progress' | 'completed' | 'blocked';
  steps: {
    id: string;
    title: string;
    department: string;
    status: 'pending' | 'in_progress' | 'completed' | 'blocked';
    assignedTo?: string;
    estimatedTime: string;
    dependencies?: string[];
    actions: string[];
    completedAt?: Date;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

export interface TrainingIntegration {
  horseManagement: {
    horseProfiles: any[];
    healthRecords: any[];
    performanceHistory: any[];
  };
  clinicIntegration: {
    healthClearances: any[];
    injuryReports: any[];
    veterinaryRecommendations: any[];
  };
  inventoryManagement: {
    equipmentAllocations: any[];
    facilityBookings: any[];
    supplyRequests: any[];
  };
  financeIntegration: {
    programCosts: any[];
    trainerPayments: any[];
    facilityMaintenance: any[];
  };
  hrIntegration: {
    trainerSchedules: any[];
    staffAllocations: any[];
    performanceReviews: any[];
  };
}
