
import { RecordType, RecordStatus, RecordPriority, BaseRecord } from "@/types/breeding/unified-records";

export const getRecordTypeLabel = (type: RecordType): string => {
  const labels: Record<RecordType, string> = {
    veterinary_checkup: "Veterinary Checkup",
    ultrasound: "Ultrasound",
    medication: "Medication",
    appointment: "Appointment",
    breeding: "Breeding",
    pregnancy: "Pregnancy",
    foaling: "Foaling",
    health_assessment: "Health Assessment",
    heat_cycle: "Heat Cycle",
  };
  return labels[type];
};

export const getRecordStatusLabel = (status: RecordStatus): string => {
  const labels: Record<RecordStatus, string> = {
    draft: "Draft",
    scheduled: "Scheduled",
    in_progress: "In Progress",
    completed: "Completed",
    cancelled: "Cancelled",
    overdue: "Overdue",
  };
  return labels[status];
};

export const getRecordPriorityLabel = (priority: RecordPriority): string => {
  const labels: Record<RecordPriority, string> = {
    low: "Low",
    medium: "Medium",
    high: "High",
    urgent: "Urgent",
  };
  return labels[priority];
};

export const getRecordStatusColor = (status: RecordStatus): string => {
  const colors: Record<RecordStatus, string> = {
    draft: "bg-gray-100 text-gray-800",
    scheduled: "bg-blue-100 text-blue-800",
    in_progress: "bg-yellow-100 text-yellow-800",
    completed: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
    overdue: "bg-red-100 text-red-800",
  };
  return colors[status];
};

export const getRecordPriorityColor = (priority: RecordPriority): string => {
  const colors: Record<RecordPriority, string> = {
    low: "bg-gray-100 text-gray-800",
    medium: "bg-blue-100 text-blue-800",
    high: "bg-orange-100 text-orange-800",
    urgent: "bg-red-100 text-red-800",
  };
  return colors[priority];
};

export const getRecordTypeIcon = (type: RecordType): string => {
  const icons: Record<RecordType, string> = {
    veterinary_checkup: "Stethoscope",
    ultrasound: "Activity",
    medication: "Pill",
    appointment: "Calendar",
    breeding: "Heart",
    pregnancy: "Baby",
    foaling: "Users",
    health_assessment: "FileText",
    heat_cycle: "Calendar",
  };
  return icons[type];
};

export const isRecordOverdue = (record: BaseRecord): boolean => {
  if (!record.dueDate || record.status === 'completed') {
    return false;
  }
  return record.dueDate < new Date();
};

export const isRecordUpcoming = (record: BaseRecord, days: number = 7): boolean => {
  if (!record.scheduledDate) {
    return false;
  }
  
  const now = new Date();
  const futureDate = new Date(now.getTime() + (days * 24 * 60 * 60 * 1000));
  
  return record.scheduledDate >= now && record.scheduledDate <= futureDate;
};

export const sortRecordsByPriority = (records: BaseRecord[]): BaseRecord[] => {
  const priorityOrder: Record<RecordPriority, number> = {
    urgent: 0,
    high: 1,
    medium: 2,
    low: 3,
  };

  return [...records].sort((a, b) => {
    // First sort by priority
    const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
    if (priorityDiff !== 0) return priorityDiff;
    
    // Then by due date or scheduled date
    const aDate = a.dueDate || a.scheduledDate || a.createdAt;
    const bDate = b.dueDate || b.scheduledDate || b.createdAt;
    
    return aDate.getTime() - bDate.getTime();
  });
};

export const sortRecordsByDate = (records: BaseRecord[], ascending: boolean = true): BaseRecord[] => {
  return [...records].sort((a, b) => {
    const aDate = a.scheduledDate || a.createdAt;
    const bDate = b.scheduledDate || b.createdAt;
    
    const diff = aDate.getTime() - bDate.getTime();
    return ascending ? diff : -diff;
  });
};

export const generateRecordId = (type: RecordType): string => {
  const prefix = type.toUpperCase().replace('_', '');
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substr(2, 5);
  return `${prefix}_${timestamp}_${random}`;
};
