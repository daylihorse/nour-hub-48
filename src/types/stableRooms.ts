
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
}
