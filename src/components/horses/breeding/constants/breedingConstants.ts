
export const BREEDING_PRIORITIES = {
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low'
} as const;

export const BREEDING_STATUS = {
  SUCCESS: 'success',
  PENDING: 'pending',
  FAILED: 'failed'
} as const;

export const BREEDING_EVENTS = {
  BREEDING: 'breeding',
  PREGNANCY: 'pregnancy',
  BOOKING: 'booking',
  BIRTH: 'birth',
  DUE_DATE: 'due_date',
  CHECKUP: 'checkup'
} as const;

export const PREGNANCY_DEFAULTS = {
  TOTAL_DAYS: 340,
  WARNING_DAYS: 30
} as const;

export const BREEDING_METRICS = {
  DEFAULT_SUCCESS_RATE: 85.5,
  IMPROVEMENT_RATE: 2.5
} as const;
