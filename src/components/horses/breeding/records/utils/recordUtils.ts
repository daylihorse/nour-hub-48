
import { 
  RecordType, 
  RecordStatus, 
  RecordPriority,
  BaseRecord 
} from "@/types/breeding/unified-records";
import { 
  Stethoscope, 
  Camera, 
  Pill, 
  Calendar, 
  Heart, 
  Baby, 
  Activity,
  Shield,
  Thermometer,
  LucideIcon
} from "lucide-react";

export const generateRecordId = (type: string): string => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substr(2, 5);
  return `${type}_${timestamp}_${random}`;
};

export const getRecordStatusColor = (status: RecordStatus): string => {
  switch (status) {
    case 'completed':
      return 'bg-green-500 text-white hover:bg-green-600';
    case 'in_progress':
      return 'bg-blue-500 text-white hover:bg-blue-600';
    case 'scheduled':
      return 'bg-orange-500 text-white hover:bg-orange-600';
    case 'overdue':
      return 'bg-red-500 text-white hover:bg-red-600';
    case 'cancelled':
      return 'bg-gray-500 text-white hover:bg-gray-600';
    case 'draft':
      return 'bg-gray-300 text-gray-700 hover:bg-gray-400';
    default:
      return 'bg-gray-500 text-white hover:bg-gray-600';
  }
};

export const getRecordPriorityColor = (priority: RecordPriority): string => {
  switch (priority) {
    case 'urgent':
      return 'bg-red-600 text-white hover:bg-red-700';
    case 'high':
      return 'bg-orange-500 text-white hover:bg-orange-600';
    case 'medium':
      return 'bg-blue-500 text-white hover:bg-blue-600';
    case 'low':
      return 'bg-green-500 text-white hover:bg-green-600';
    default:
      return 'bg-gray-500 text-white hover:bg-gray-600';
  }
};

export const getRecordTypeLabel = (type: RecordType): string => {
  switch (type) {
    case 'veterinary_checkup':
      return 'Veterinary Checkup';
    case 'ultrasound':
      return 'Ultrasound';
    case 'medication':
      return 'Medication';
    case 'appointment':
      return 'Appointment';
    case 'breeding':
      return 'Breeding Record';
    case 'pregnancy':
      return 'Pregnancy Record';
    case 'foaling':
      return 'Foaling Record';
    case 'health_assessment':
      return 'Health Assessment';
    case 'heat_cycle':
      return 'Heat Cycle';
    default:
      return 'Unknown Record';
  }
};

export const getRecordTypeIcon = (type: RecordType): LucideIcon => {
  switch (type) {
    case 'veterinary_checkup':
      return Stethoscope;
    case 'ultrasound':
      return Camera;
    case 'medication':
      return Pill;
    case 'appointment':
      return Calendar;
    case 'breeding':
      return Heart;
    case 'pregnancy':
      return Baby;
    case 'foaling':
      return Baby;
    case 'health_assessment':
      return Activity;
    case 'heat_cycle':
      return Thermometer;
    default:
      return Shield;
  }
};

export const getRecordTypeDescription = (type: RecordType): string => {
  switch (type) {
    case 'veterinary_checkup':
      return 'Regular or emergency veterinary examinations';
    case 'ultrasound':
      return 'Pregnancy monitoring and diagnostic ultrasounds';
    case 'medication':
      return 'Medication administration and tracking';
    case 'appointment':
      return 'Scheduled appointments and services';
    case 'breeding':
      return 'Breeding activities and records';
    case 'pregnancy':
      return 'Pregnancy monitoring and care';
    case 'foaling':
      return 'Birth records and foal care';
    case 'health_assessment':
      return 'General health evaluations';
    case 'heat_cycle':
      return 'Mare heat cycle tracking';
    default:
      return 'Unknown record type';
  }
};

export const isRecordOverdue = (record: BaseRecord): boolean => {
  if (!record.dueDate || record.status === 'completed') {
    return false;
  }
  return record.dueDate < new Date();
};

export const isRecordUpcoming = (record: BaseRecord, days: number = 7): boolean => {
  if (!record.scheduledDate || record.status === 'completed') {
    return false;
  }
  const now = new Date();
  const futureDate = new Date(now.getTime() + (days * 24 * 60 * 60 * 1000));
  return record.scheduledDate >= now && record.scheduledDate <= futureDate;
};

export const getRecordStatusBadgeText = (status: RecordStatus): string => {
  switch (status) {
    case 'in_progress':
      return 'In Progress';
    default:
      return status.charAt(0).toUpperCase() + status.slice(1);
  }
};

export const formatRecordDate = (date: Date | undefined, includeTime: boolean = false): string => {
  if (!date) return 'Not set';
  
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  
  if (includeTime) {
    options.hour = '2-digit';
    options.minute = '2-digit';
  }
  
  return date.toLocaleDateString(undefined, options);
};
