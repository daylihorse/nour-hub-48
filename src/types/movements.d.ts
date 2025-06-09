
export interface Movement {
  id: string;
  type: 'arrival' | 'departure' | 'transfer' | 'emergency_evacuation';
  entityType: 'horse' | 'equipment' | 'supplies';
  entityId: string;
  entityName: string;
  date: Date;
  estimatedTime?: Date;
  actualTime?: Date;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled' | 'delayed';
  
  // Location information
  origin?: {
    facilityName: string;
    address: string;
    contactPerson: string;
    contactPhone: string;
  };
  
  destination?: {
    facilityName: string;
    address: string;
    contactPerson: string;
    contactPhone: string;
  };
  
  // Transportation details
  transportMethod: 'truck' | 'trailer' | 'van' | 'walking' | 'other';
  transportCompany?: string;
  driverName?: string;
  vehicleInfo?: string;
  
  // Assignment integration
  assignmentId?: string;
  roomId?: string;
  terminationReason?: string;
  
  // Documentation
  documents: string[];
  photos: string[];
  
  // Health and safety
  healthCertificate?: boolean;
  emergencyContacts: {
    name: string;
    relationship: string;
    phone: string;
  }[];
  
  // Special requirements
  specialInstructions?: string;
  equipmentNeeded: string[];
  weatherConsiderations?: string;
  
  // Tracking
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  notes?: string;
}

export interface MovementIntegration {
  assignmentId: string;
  movementId: string;
  integrationType: 'termination' | 'transfer' | 'emergency';
  createdAt: Date;
  synchronizedData: {
    entityDetails: boolean;
    dates: boolean;
    documentation: boolean;
    costs: boolean;
  };
}
