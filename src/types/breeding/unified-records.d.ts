
export type RecordType = 
  | 'veterinary_checkup'
  | 'ultrasound'
  | 'medication'
  | 'appointment'
  | 'breeding'
  | 'pregnancy'
  | 'foaling'
  | 'health_assessment'
  | 'heat_cycle';

export type RecordStatus = 
  | 'draft'
  | 'scheduled'
  | 'in_progress' 
  | 'completed'
  | 'cancelled'
  | 'overdue';

export type RecordPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface BaseRecord {
  id: string;
  type: RecordType;
  title: string;
  description?: string;
  status: RecordStatus;
  priority: RecordPriority;
  
  // Associated entities
  horseId: string;
  horseName: string;
  pregnancyId?: string;
  
  // Dates
  createdAt: Date;
  updatedAt: Date;
  scheduledDate?: Date;
  completedDate?: Date;
  dueDate?: Date;
  
  // Personnel
  veterinarian?: string;
  createdBy: string;
  assignedTo?: string;
  
  // Location and cost
  location?: string;
  estimatedCost?: number;
  actualCost?: number;
  
  // Relationships
  parentRecordId?: string;
  relatedRecordIds?: string[];
  
  // Metadata
  tags?: string[];
  notes?: string;
  attachments?: RecordAttachment[];
  reminders?: RecordReminder[];
}

export interface RecordAttachment {
  id: string;
  name: string;
  type: string;
  url: string;
  size: number;
  uploadedAt: Date;
}

export interface RecordReminder {
  id: string;
  message: string;
  reminderDate: Date;
  method: 'email' | 'sms' | 'notification';
  sent: boolean;
}

export interface VeterinaryCheckupRecord extends BaseRecord {
  type: 'veterinary_checkup';
  checkupType: 'routine' | 'emergency' | 'follow_up' | 'specialist';
  findings?: string;
  recommendations?: string;
  nextCheckupDate?: Date;
  vitalSigns?: {
    temperature?: number;
    heartRate?: number;
    respiratoryRate?: number;
    weight?: number;
  };
}

export interface UltrasoundRecord extends BaseRecord {
  type: 'ultrasound';
  gestationDay?: number;
  findings: string;
  images?: string[];
  measurements?: {
    crownRumpLength?: number;
    biparietal?: number;
    heartRate?: number;
  };
  nextUltrasoundDate?: Date;
}

export interface MedicationRecord extends BaseRecord {
  type: 'medication';
  medicationName: string;
  dosage: string;
  frequency: string;
  route: string;
  startDate: Date;
  endDate?: Date;
  purpose: string;
  sideEffects?: string;
  instructions?: string;
  requiresMonitoring: boolean;
  isControlledSubstance: boolean;
}

export interface AppointmentRecord extends BaseRecord {
  type: 'appointment';
  appointmentType: string;
  duration: number;
  provider: string;
  reminderBefore: number;
}

export interface RecordFilters {
  type?: RecordType[];
  status?: RecordStatus[];
  priority?: RecordPriority[];
  horseId?: string;
  veterinarian?: string;
  dateRange?: {
    start: Date;
    end: Date;
  };
  tags?: string[];
  searchTerm?: string;
}

export interface RecordStats {
  total: number;
  byType: Record<RecordType, number>;
  byStatus: Record<RecordStatus, number>;
  byPriority: Record<RecordPriority, number>;
  overdue: number;
  upcoming: number;
}
