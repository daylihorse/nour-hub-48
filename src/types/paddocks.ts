export interface Paddock {
  id: string;
  name: string;
  number: string;
  type: 'pasture' | 'exercise' | 'quarantine' | 'breeding' | 'training';
  status: 'available' | 'occupied' | 'maintenance' | 'reserved';
  location: {
    section: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  size: {
    length: number;
    width: number;
    unit: 'meters' | 'feet';
    area?: number;
  };
  capacity: number;
  currentOccupancy: number;
  assignedHorses?: AssignedHorse[];
  facilities: {
    waterSource: boolean;
    shelter: boolean;
    fencing: 'wood' | 'metal' | 'electric' | 'composite';
    gates: number;
    lighting: boolean;
  };
  soilCondition: {
    type: 'grass' | 'sand' | 'dirt' | 'mixed';
    drainage: 'excellent' | 'good' | 'fair' | 'poor';
    lastTested: Date;
  };
  rotationSchedule?: {
    nextRotation: Date;
    restPeriod: number; // days
    lastRotation?: Date;
  };
  maintenanceSchedule?: {
    lastMaintenance: Date;
    nextMaintenance: Date;
    type: string;
  };
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  tenantId: string;
  createdBy?: string;
}

export interface AssignedHorse {
  horseId: string;
  horseName: string;
  assignedAt: Date;
  expectedDuration?: number; // days
  notes?: string;
}

export interface PaddockFilters {
  status?: string;
  type?: string;
  availability?: 'available' | 'occupied' | 'all';
  section?: string;
}

export interface MaintenanceTask {
  id: string;
  paddockId: string;
  paddockName: string;
  type: 'fence_repair' | 'gate_maintenance' | 'water_system' | 'drainage' | 'soil_treatment' | 'general';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  scheduledDate: Date;
  completedDate?: Date;
  estimatedDuration: number; // hours
  assignedTo?: string;
  description: string;
  cost?: number;
  notes?: string;
  attachments?: string[];
  createdAt: Date;
  updatedAt: Date;
  tenantId: string;
}

export interface RotationPlan {
  id: string;
  name: string;
  description?: string;
  duration: number; // days per rotation
  restPeriod: number; // days of rest
  paddockIds: string[];
  horseGroups: HorseGroup[];
  status: 'active' | 'paused' | 'completed';
  startDate: Date;
  endDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  tenantId: string;
}

export interface HorseGroup {
  id: string;
  name: string;
  horseIds: string[];
  currentPaddockId?: string;
  rotationOrder: number;
}

export interface PaddockStats {
  totalPaddocks: number;
  availablePaddocks: number;
  occupiedPaddocks: number;
  maintenancePaddocks: number;
  totalCapacity: number;
  currentOccupancy: number;
  utilizationRate: number;
  upcomingMaintenance: number;
}