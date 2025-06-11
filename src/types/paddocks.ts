
export interface Paddock {
  id: string;
  name: string;
  number: string;
  type: 'grazing' | 'exercise' | 'turnout' | 'breeding' | 'quarantine' | 'rehabilitation';
  status: 'available' | 'occupied' | 'maintenance' | 'reserved';
  size: {
    length: number;
    width: number;
    area?: number;
    unit: 'm' | 'ft' | 'acres' | 'hectares';
  };
  location: {
    section: string;
    block?: string;
    coordinates?: { lat: number; lng: number };
  };
  capacity: number;
  currentOccupancy: number;
  features: string[];
  amenities: string[];
  grassType?: string;
  soilCondition?: 'excellent' | 'good' | 'fair' | 'poor';
  drainageQuality?: 'excellent' | 'good' | 'fair' | 'poor';
  fencing: {
    type: string;
    condition: 'excellent' | 'good' | 'fair' | 'poor';
    height: number;
    lastInspection?: Date;
  };
  waterAccess: {
    available: boolean;
    type?: 'automatic' | 'manual' | 'natural';
    condition?: 'excellent' | 'good' | 'fair' | 'poor';
  };
  shelter: {
    available: boolean;
    type?: 'natural' | 'artificial';
    capacity?: number;
  };
  assignedHorses?: {
    horseId: string;
    horseName: string;
    assignedDate: Date;
    expectedRotation?: Date;
  }[];
  rotationSchedule?: {
    nextRotation: Date;
    rotationDuration: number; // days
    restPeriod: number; // days
  };
  maintenanceHistory: PaddockMaintenanceRecord[];
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PaddockMaintenanceRecord {
  id: string;
  paddockId: string;
  type: 'grass_maintenance' | 'fence_repair' | 'drainage' | 'soil_treatment' | 'weed_control' | 'fertilization' | 'reseeding';
  description: string;
  scheduledDate: Date;
  completedDate?: Date;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  assignedTo?: string;
  cost?: number;
  notes?: string;
  nextMaintenanceDate?: Date;
  createdAt: Date;
}

export interface PaddockAssignment {
  id: string;
  paddockId: string;
  horseId: string;
  horseName: string;
  assignedDate: Date;
  expectedEndDate?: Date;
  actualEndDate?: Date;
  assignmentType: 'grazing' | 'exercise' | 'turnout' | 'breeding' | 'quarantine' | 'rehabilitation';
  status: 'active' | 'completed' | 'cancelled';
  assignedBy: string;
  notes?: string;
  cost?: {
    dailyRate: number;
    totalCost?: number;
    currency: string;
  };
}

export interface PaddockRotationPlan {
  id: string;
  name: string;
  paddockIds: string[];
  horseGroups: {
    groupId: string;
    groupName: string;
    horseIds: string[];
    currentPaddockId: string;
    rotationOrder: number;
  }[];
  rotationInterval: number; // days
  restPeriod: number; // days
  startDate: Date;
  endDate?: Date;
  status: 'active' | 'paused' | 'completed' | 'cancelled';
  automaticRotation: boolean;
  notifications: {
    enabled: boolean;
    daysBeforeRotation: number;
    recipients: string[];
  };
  createdAt: Date;
  updatedAt: Date;
}
