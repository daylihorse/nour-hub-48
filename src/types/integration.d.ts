
export interface IntegrationEvent {
  id: string;
  sourceModule: 'breeding' | 'clinic' | 'horses';
  targetModule: 'breeding' | 'clinic' | 'horses';
  eventType: string;
  payload: any;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  createdAt: Date;
  processedAt?: Date;
  error?: string;
}

export interface BreedingClinicIntegration {
  breedingEventId: string;
  clinicAppointmentId?: string;
  triggerType: 'breeding_scheduled' | 'pregnancy_confirmed' | 'foaling_due' | 'health_check_needed';
  status: 'pending' | 'scheduled' | 'completed';
  scheduledDate?: Date;
  notes?: string;
}

export interface ClinicHorsesIntegration {
  clinicRecordId: string;
  horseId: string;
  updateType: 'health_status' | 'breeding_eligibility' | 'medical_clearance';
  findings: any;
  recommendations: string[];
  followUpRequired: boolean;
}

export interface AutomationRule {
  id: string;
  name: string;
  sourceEvent: string;
  targetAction: string;
  conditions: any[];
  enabled: boolean;
  createdAt: Date;
}
