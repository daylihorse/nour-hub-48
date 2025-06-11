
export interface Room {
  id: string;
  number: string;
  name: string;
  type: 'stall' | 'office' | 'tack_room' | 'feed_room' | 'wash_bay' | 'medical_room' | 'storage';
  status: 'available' | 'occupied' | 'maintenance' | 'reserved';
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
    section: string;
    floor?: string;
  };
  features: string[];
  amenities: string[];
  assignedTo?: {
    type: 'horse' | 'staff' | 'equipment' | 'supplies';
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
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Assignment {
  id: string;
  roomId: string;
  entityType: 'horse' | 'staff' | 'equipment' | 'supplies';
  entityId: string;
  entityName: string;
  assignedDate: Date;
  expectedVacate?: Date;
  actualVacate?: Date;
  status: 'active' | 'completed' | 'cancelled';
  assignedBy: string;
  notes?: string;
  cost?: {
    dailyRate: number;
    totalCost?: number;
    currency: string;
  };
}

export interface MaintenanceRecord {
  id: string;
  roomId: string;
  type: 'cleaning' | 'repair' | 'upgrade' | 'inspection' | 'pest_control';
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
