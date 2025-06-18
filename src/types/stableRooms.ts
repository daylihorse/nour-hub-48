
export type PaddockStatus = 'available' | 'occupied' | 'maintenance' | 'reserved';
export type PaddockType = 'grazing' | 'exercise' | 'turnout' | 'breeding' | 'quarantine' | 'rehabilitation';
export type MaintenanceType = 'fence_repair' | 'gate_maintenance' | 'drainage' | 'grass_maintenance' | 'water_system' | 'shelter_repair';
export type MaintenanceStatus = 'scheduled' | 'in_progress' | 'completed' | 'cancelled';

export interface Room {
  id: string;
  number: string;
  name: string;
  type: 'stall' | 'paddock' | 'quarantine' | 'breeding' | 'foaling' | 'recovery' | 'warehouse' | 'feed_storage' | 'equipment' | 'office' | 'medical' | 'tack_room';
  status: 'available' | 'occupied' | 'maintenance' | 'reserved' | 'out_of_order';
  capacity: number;
  currentOccupancy: number;
  size: {
    length: number;
    width: number;
    height?: number;
    unit: 'm' | 'ft';
  };
  location: {
    building: string;
    floor?: string;
    section: string;
    coordinates?: {
      x: number;
      y: number;
    };
  };
  features: string[];
  amenities: string[];
  maintenanceSchedule?: {
    lastMaintenance: Date;
    nextMaintenance: Date;
    frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'annually';
  };
  assignedTo?: {
    type: 'horse' | 'equipment' | 'supplies';
    entityId: string;
    entityName: string;
    assignedDate: Date;
    expectedVacate?: Date;
  };
  pricing?: {
    dailyRate: number;
    monthlyRate: number;
    currency: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface Assignment {
  id: string;
  roomId: string;
  entityId: string;
  entityName: string;
  entityType: 'horse' | 'equipment';
  assignedDate: Date;
  scheduledVacate?: Date;
  actualVacate?: Date;
  assignedBy: string;
  reason?: string;
  status: 'active' | 'completed' | 'scheduled';
  createdAt: Date;
  updatedAt: Date;
  expectedVacate?: Date;
  notes?: string;
  cost?: {
    dailyRate: number;
    totalCost: number;
    currency: string;
  };
}

export interface MaintenanceRecord {
  id: string;
  roomId: string;
  type: 'routine' | 'emergency' | 'preventive' | 'repair';
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  scheduledDate: Date;
  completedDate?: Date;
  assignedTo?: string;
  description: string;
  cost?: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OccupancyAnalytics {
  totalRooms: number;
  occupiedRooms: number;
  availableRooms: number;
  maintenanceRooms: number;
  occupancyRate: number;
  revenueData: {
    daily: number;
    monthly: number;
    yearly: number;
  };
  utilizationByType: Record<Room['type'], number>;
  averageStayDuration: number;
}
