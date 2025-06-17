/**
 * Types: Paddock Management System
 * 
 * PURPOSE:
 * Comprehensive type definitions for paddock management system providing
 * type safety, data consistency, and clear interface contracts for all
 * paddock-related operations and data structures.
 * 
 * ARCHITECTURAL PATTERN:
 * - Centralized type definitions for system-wide consistency
 * - Hierarchical type organization with base types and extensions
 * - Strict typing for data integrity and error prevention
 * - Extensible interfaces for future feature development
 * 
 * DESIGN PRINCIPLES:
 * - Type safety preventing runtime errors
 * - Clear data contracts for API integration
 * - Consistent naming conventions across the system
 * - Comprehensive coverage of all paddock operations
 * 
 * TYPE ORGANIZATION:
 * This file defines types for all paddock management aspects:
 * - Basic paddock entities and status enumerations
 * - Rotation planning and scheduling data structures
 * - Maintenance tracking and task management types
 * - Horse assignment and movement coordination types
 * 
 * INTEGRATION CONTEXT:
 * These types provide the foundation for:
 * - Database schema definition and validation
 * - API request/response type checking
 * - Component prop validation and IntelliSense
 * - Cross-system data exchange standardization
 * 
 * DEVELOPMENT BENEFITS:
 * - Compile-time error detection for data inconsistencies
 * - Enhanced IDE support with autocomplete and validation
 * - Self-documenting code through descriptive type definitions
 * - Easier refactoring with type-guided transformations
 */

/**
 * Enumeration of possible paddock availability and operational states.
 * Used throughout the system for filtering, status tracking, and workflow management.
 */
export type PaddockStatus = 'available' | 'occupied' | 'maintenance' | 'reserved';

/**
 * Classification of paddock functional types for specialized use cases.
 * Determines appropriate management strategies and operational procedures.
 */
export type PaddockType = 'grazing' | 'exercise' | 'turnout' | 'breeding' | 'quarantine' | 'rehabilitation';

/**
 * Maintenance task workflow status tracking for task management.
 * Enables progress monitoring and resource allocation planning.
 */
export type MaintenanceStatus = 'scheduled' | 'in_progress' | 'completed' | 'cancelled';

/**
 * Categorization of maintenance activities for scheduling and resource planning.
 * Allows for specialized workflow management and cost tracking.
 */
export type MaintenanceType = 
  | 'grass_maintenance' 
  | 'fence_repair' 
  | 'drainage' 
  | 'soil_treatment' 
  | 'weed_control'
  | 'fertilization'
  | 'reseeding';

/**
 * Core paddock entity representing physical paddock infrastructure and status.
 * Central data structure for all paddock management operations.
 * 
 * ENTITY RELATIONSHIPS:
 * - Links to horse assignments through assignedHorses array
 * - Connects to rotation plans via rotationSchedule
 * - Associates with maintenance records through maintenanceHistory
 * 
 * OPERATIONAL CONTEXT:
 * This interface serves as the primary data model for:
 * - Daily paddock status monitoring and updates
 * - Capacity management and occupancy tracking
 * - Location-based operations and spatial organization
 * - Feature tracking for operational capabilities
 */
export interface Paddock {
  /** Unique identifier for database operations and cross-references */
  id: string;
  
  /** Human-readable paddock name for identification and communication */
  name: string;
  
  /** Official paddock number for systematic organization and documentation */
  number: string;
  
  /** Current operational status affecting availability and operations */
  status: PaddockStatus;
  
  /** Functional classification determining appropriate use cases */
  type: PaddockType;
  
  /** Physical dimensions for capacity calculation and space planning */
  size: {
    /** Length dimension in specified units */
    length: number;
    /** Width dimension in specified units */
    width: number;
    /** Measurement unit for standardized calculations */
    unit: 'meters' | 'feet';
  };
  
  /** Maximum number of horses the paddock can safely accommodate */
  capacity: number;
  
  /** Current number of horses assigned to the paddock */
  currentOccupancy: number;
  
  /** Geographic and organizational location information */
  location: {
    /** Administrative section or zone designation */
    section: string;
    /** Optional GPS coordinates for mapping and navigation */
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  
  /** Optional list of available amenities and infrastructure features */
  features?: string[];
  
  /** Currently assigned horses with assignment tracking information */
  assignedHorses?: {
    /** Reference to horse entity in main registry */
    horseId: string;
    /** Display name for quick identification */
    horseName: string;
    /** Date when horse was assigned to this paddock */
    assignedDate: Date;
  }[];
  
  /** Rotation schedule information if paddock participates in rotation plans */
  rotationSchedule?: {
    /** Whether paddock is included in active rotation planning */
    inRotationPlan: boolean;
    /** Most recent rotation execution date */
    lastRotation: Date;
    /** Scheduled date for next rotation */
    nextRotation: Date;
    /** Required rest period between rotations in days */
    restPeriod: number;
  };
  
  /** Historical maintenance information for scheduling and tracking */
  maintenanceHistory?: {
    /** Date of most recent maintenance activity */
    lastMaintenance: Date;
    /** Optional date for next scheduled maintenance */
    nextScheduledMaintenance?: Date;
    /** Type of last performed maintenance for record keeping */
    maintenanceType?: MaintenanceType;
  };
  
  /** Entity creation timestamp for audit trails */
  createdAt: Date;
  
  /** Last modification timestamp for change tracking */
  updatedAt: Date;
}

/**
 * Rotation planning and execution tracking for systematic paddock management.
 * Coordinates horse group movements across multiple paddocks for optimal utilization.
 * 
 * PLANNING CONTEXT:
 * This interface manages complex rotation scenarios involving:
 * - Multiple horse groups with different requirements
 * - Coordinated paddock rest periods for grass recovery
 * - Automated scheduling with manual override capabilities
 * - Notification systems for stakeholder communication
 */
export interface PaddockRotationPlan {
  /** Unique identifier for plan tracking and reference */
  id: string;
  
  /** Descriptive name for plan identification and communication */
  name: string;
  
  /** Array of paddock IDs participating in the rotation cycle */
  paddockIds: string[];
  
  /** Horse groups involved in the rotation with current assignments */
  horseGroups: {
    /** Unique identifier for the horse group */
    groupId: string;
    /** Display name for group identification */
    groupName: string;
    /** Array of horse IDs comprising the group */
    horseIds: string[];
    /** Current paddock assignment for the group */
    currentPaddockId: string;
    /** Sequence position in rotation cycle */
    rotationOrder: number;
  }[];
  
  /** Number of days between rotation executions */
  rotationInterval: number;
  
  /** Minimum rest period for paddocks between uses in days */
  restPeriod: number;
  
  /** Date when rotation plan becomes active */
  startDate: Date;
  
  /** Current execution status of the rotation plan */
  status: 'active' | 'paused' | 'completed';
  
  /** Whether rotations execute automatically or require manual intervention */
  automaticRotation: boolean;
  
  /** Notification configuration for stakeholder communication */
  notifications: {
    /** Whether notifications are enabled for this plan */
    enabled: boolean;
    /** Number of days before rotation to send advance notice */
    daysBeforeRotation: number;
    /** List of notification recipients (user IDs or email addresses) */
    recipients: string[];
  };
  
  /** Plan creation timestamp */
  createdAt: Date;
  
  /** Last modification timestamp */
  updatedAt: Date;
}

// Paddock maintenance record
export interface PaddockMaintenanceRecord {
  id: string;
  paddockId: string;
  type: MaintenanceType;
  description: string;
  scheduledDate: Date;
  completedDate?: Date;
  status: MaintenanceStatus;
  assignedTo?: string; // Staff ID
  cost?: number;
  notes?: string;
  nextMaintenanceDate?: Date;
  createdAt: Date;
}

// Horse assignment record
export interface HorseAssignment {
  id: string;
  horseId: string;
  horseName: string;
  paddockId: string;
  assignedDate: Date;
  scheduledEndDate?: Date;
  assignedBy: string;
  reason?: string;
  status: 'active' | 'completed' | 'scheduled';
  createdAt: Date;
  updatedAt: Date;
}

// Paddock soil analysis
export interface PaddockSoilAnalysis {
  id: string;
  paddockId: string;
  analysisDate: Date;
  pH: number;
  nutrients: {
    nitrogen: number;
    phosphorus: number;
    potassium: number;
  };
  organicMatter: number;
  recommendations?: string;
  createdAt: Date;
}

// Paddock vegetation assessment
export interface PaddockVegetationAssessment {
  id: string;
  paddockId: string;
  assessmentDate: Date;
  grassCoverage: number; // percentage
  dominantSpecies: string[];
  weedPresence: number; // percentage
  healthScore: number; // 1-10
  recommendations?: string;
  createdAt: Date;
}

// Paddock weather impact
export interface PaddockWeatherImpact {
  id: string;
  paddockId: string;
  date: Date;
  weatherType: 'rain' | 'drought' | 'frost' | 'snow' | 'heat';
  severity: 'low' | 'medium' | 'high';
  impact: string;
  mitigationActions?: string;
  createdAt: Date;
}

// Paddock usage statistics
export interface PaddockUsageStatistics {
  paddockId: string;
  totalDaysUsed: number;
  totalHorsesHoused: number;
  averageOccupancyRate: number;
  usageByMonth: {
    month: number;
    year: number;
    daysUsed: number;
    averageOccupancy: number;
  }[];
  maintenanceDays: number;
  rotationEfficiency?: number; // 0-100%
}
