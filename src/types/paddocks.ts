
export type PaddockStatus = 'available' | 'occupied' | 'maintenance' | 'reserved';
export type PaddockType = 'grazing' | 'exercise' | 'turnout' | 'breeding' | 'quarantine' | 'rehabilitation';
export type MaintenanceType = 'fence_repair' | 'gate_maintenance' | 'drainage' | 'grass_maintenance' | 'water_system' | 'shelter_repair';
export type MaintenanceStatus = 'scheduled' | 'in_progress' | 'completed' | 'cancelled';

export interface PaddockSize {
  length: number;
  width: number;
  unit: string;
}

export interface PaddockLocation {
  section: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

export interface HorseAssignmentInfo {
  horseId: string;
  horseName: string;
  assignedDate: Date;
}

export interface PaddockRotationSchedule {
  inRotationPlan: boolean;
  lastRotation?: Date;
  nextRotation?: Date;
  restPeriod?: number;
}

export interface PaddockMaintenanceHistory {
  lastMaintenance?: Date;
  nextScheduledMaintenance?: Date;
  maintenanceType?: MaintenanceType;
}

export interface Paddock {
  id: string;
  name: string;
  number: string;
  status: PaddockStatus;
  type: PaddockType;
  size: PaddockSize;
  capacity: number;
  currentOccupancy: number;
  location: PaddockLocation;
  features?: string[];
  assignedHorses?: HorseAssignmentInfo[];
  rotationSchedule?: PaddockRotationSchedule;
  maintenanceHistory?: PaddockMaintenanceHistory;
  createdAt: Date;
  updatedAt: Date;
}

export interface PaddockAssignment {
  id: string;
  paddockId: string;
  horseId: string;
  horseName: string;
  assignedDate: Date;
  scheduledEndDate?: Date;
  actualEndDate?: Date;
  assignmentType?: string;
  status: 'active' | 'completed' | 'scheduled';
  assignedBy: string;
  notes?: string;
  reason?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PaddockMaintenanceRecord {
  id: string;
  paddockId: string;
  type: MaintenanceType;
  description: string;
  scheduledDate: Date;
  completedDate?: Date;
  status: MaintenanceStatus;
  assignedTo?: string;
  cost?: number;
  notes?: string;
  nextMaintenanceDate?: Date;
  createdAt: Date;
}

export interface HorseGroup {
  groupId: string;
  groupName: string;
  horseIds: string[];
  currentPaddockId: string;
  rotationOrder: number;
}

export interface PaddockRotationPlan {
  id: string;
  name: string;
  paddockIds: string[];
  horseGroups: HorseGroup[];
  rotationInterval: number;
  restPeriod: number;
  startDate: Date;
  endDate?: Date;
  status: 'active' | 'paused' | 'completed' | 'cancelled';
  automaticRotation: boolean;
  notifications?: {
    enabled: boolean;
    daysBeforeRotation: number;
    recipients: string[];
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface HorseAssignment {
  id: string;
  horseId: string;
  horseName: string;
  paddockId: string;
  assignedDate: Date;
  scheduledEndDate?: Date;
  actualEndDate?: Date;
  assignedBy: string;
  reason?: string;
  status: 'active' | 'completed' | 'scheduled';
  createdAt: Date;
  updatedAt: Date;
}
