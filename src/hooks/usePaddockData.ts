/**
 * Hook: usePaddockData
 * 
 * PURPOSE:
 * Centralized data management hook for paddock operations providing
 * comprehensive CRUD operations, rotation planning, maintenance scheduling,
 * and integration with housing services for complete paddock lifecycle management.
 * 
 * ARCHITECTURAL PATTERN:
 * - Custom React hook for centralized state management
 * - Mock data simulation for development and testing
 * - Integration interface for external services
 * - Type-safe operations with comprehensive error handling
 * 
 * DESIGN PRINCIPLES:
 * - Single source of truth for paddock-related data
 * - Consistent API interface across all paddock operations
 * - Mock data providing realistic scenarios for development
 * - Integration-ready architecture for production deployment
 * 
 * DATA MANAGEMENT CONTEXT:
 * This hook manages all paddock-related operations:
 * - Basic paddock CRUD operations and status management
 * - Horse assignment and movement coordination
 * - Rotation planning and execution tracking
 * - Maintenance scheduling and task management
 * 
 * INTEGRATION FEATURES:
 * The hook provides comprehensive data management:
 * - Housing service integration for cross-system coordination
 * - Real-time data synchronization capabilities
 * - Batch operations for efficient bulk updates
 * - Event-driven updates for reactive UI components
 * 
 * DEVELOPMENT CONTEXT:
 * Currently uses mock data for development purposes with
 * production-ready interfaces for seamless transition to
 * actual backend services and database integration.
 * 
 * ACCESSIBILITY FEATURES:
 * - Type-safe operations preventing runtime errors
 * - Consistent error handling for user feedback
 * - Optimistic updates for responsive user experience
 * - Status tracking for UI state management
 */

import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from './use-toast';
import { 
  Paddock, 
  PaddockMaintenanceRecord, 
  PaddockRotationPlan, 
  HorseAssignment,
  PaddockStatus 
} from '@/types/paddocks';
import { useHousingService } from '@/services/housing';

// Mock data for development
const mockPaddocks: Paddock[] = [
  {
    id: "p1",
    name: "North Pasture",
    number: "NP-001",
    status: "available",
    type: "grazing",
    size: {
      length: 200,
      width: 150,
      unit: "meters"
    },
    capacity: 8,
    currentOccupancy: 0,
    location: {
      section: "North Section",
      coordinates: {
        latitude: 51.5074,
        longitude: -0.1278
      }
    },
    features: ["Water trough", "Natural shade", "Automatic gate"],
    createdAt: new Date("2023-01-15"),
    updatedAt: new Date("2023-01-15")
  },
  {
    id: "p2",
    name: "East Exercise Area",
    number: "EA-002",
    status: "occupied",
    type: "exercise",
    size: {
      length: 100,
      width: 80,
      unit: "meters"
    },
    capacity: 4,
    currentOccupancy: 3,
    location: {
      section: "East Section"
    },
    assignedHorses: [
      {
        horseId: "h1",
        horseName: "Thunder",
        assignedDate: new Date("2023-05-10")
      },
      {
        horseId: "h2",
        horseName: "Storm",
        assignedDate: new Date("2023-05-12")
      },
      {
        horseId: "h3",
        horseName: "Lightning",
        assignedDate: new Date("2023-05-15")
      }
    ],
    rotationSchedule: {
      inRotationPlan: true,
      lastRotation: new Date("2023-05-01"),
      nextRotation: new Date("2023-06-01"),
      restPeriod: 14
    },
    createdAt: new Date("2023-01-20"),
    updatedAt: new Date("2023-05-15")
  },
  {
    id: "p3",
    name: "South Turnout",
    number: "ST-003",
    status: "maintenance",
    type: "turnout",
    size: {
      length: 80,
      width: 60,
      unit: "meters"
    },
    capacity: 6,
    currentOccupancy: 0,
    location: {
      section: "South Section"
    },
    maintenanceHistory: {
      lastMaintenance: new Date("2023-05-20"),
      nextScheduledMaintenance: new Date("2023-05-25"),
      maintenanceType: "drainage"
    },
    createdAt: new Date("2023-02-05"),
    updatedAt: new Date("2023-05-20")
  },
  {
    id: "p4",
    name: "Breeding Paddock",
    number: "BP-004",
    status: "occupied",
    type: "breeding",
    size: {
      length: 150,
      width: 120,
      unit: "meters"
    },
    capacity: 2,
    currentOccupancy: 2,
    location: {
      section: "West Section"
    },
    assignedHorses: [
      {
        horseId: "h4",
        horseName: "Midnight",
        assignedDate: new Date("2023-04-15")
      },
      {
        horseId: "h5",
        horseName: "Starlight",
        assignedDate: new Date("2023-04-15")
      }
    ],
    createdAt: new Date("2023-02-10"),
    updatedAt: new Date("2023-04-15")
  },
  {
    id: "p5",
    name: "Quarantine Area",
    number: "QA-005",
    status: "reserved",
    type: "quarantine",
    size: {
      length: 60,
      width: 40,
      unit: "meters"
    },
    capacity: 2,
    currentOccupancy: 0,
    location: {
      section: "East Section"
    },
    createdAt: new Date("2023-03-01"),
    updatedAt: new Date("2023-03-01")
  },
  {
    id: "p6",
    name: "Rehabilitation Paddock",
    number: "RP-006",
    status: "occupied",
    type: "rehabilitation",
    size: {
      length: 50,
      width: 40,
      unit: "meters"
    },
    capacity: 1,
    currentOccupancy: 1,
    location: {
      section: "Central Section"
    },
    assignedHorses: [
      {
        horseId: "h6",
        horseName: "Shadow",
        assignedDate: new Date("2023-05-05")
      }
    ],
    createdAt: new Date("2023-03-15"),
    updatedAt: new Date("2023-05-05")
  }
];

const mockMaintenanceRecords: PaddockMaintenanceRecord[] = [
  {
    id: "m1",
    paddockId: "p3",
    type: "drainage",
    description: "Install new drainage system to prevent water pooling",
    scheduledDate: new Date("2023-05-25"),
    status: "scheduled",
    assignedTo: "staff1",
    cost: 1500,
    notes: "Focus on the north corner where water tends to accumulate",
    createdAt: new Date("2023-05-20")
  },
  {
    id: "m2",
    paddockId: "p1",
    type: "grass_maintenance",
    description: "Mow and reseed thin areas",
    scheduledDate: new Date("2023-05-15"),
    completedDate: new Date("2023-05-16"),
    status: "completed",
    assignedTo: "staff2",
    cost: 350,
    nextMaintenanceDate: new Date("2023-06-15"),
    createdAt: new Date("2023-05-10")
  },
  {
    id: "m3",
    paddockId: "p4",
    type: "fence_repair",
    description: "Repair damaged fence posts on west side",
    scheduledDate: new Date("2023-05-28"),
    status: "scheduled",
    assignedTo: "staff3",
    cost: 200,
    createdAt: new Date("2023-05-22")
  }
];

const mockRotationPlans: PaddockRotationPlan[] = [
  {
    id: "r1",
    name: "Summer Rotation 2023",
    paddockIds: ["p1", "p2", "p6"],
    horseGroups: [
      {
        groupId: "g1",
        groupName: "Group A",
        horseIds: ["h1", "h2"],
        currentPaddockId: "p2",
        rotationOrder: 0
      },
      {
        groupId: "g2",
        groupName: "Group B",
        horseIds: ["h3"],
        currentPaddockId: "p1",
        rotationOrder: 1
      }
    ],
    rotationInterval: 30,
    restPeriod: 14,
    startDate: new Date("2023-05-01"),
    status: "active",
    automaticRotation: true,
    notifications: {
      enabled: true,
      daysBeforeRotation: 3,
      recipients: ["user1", "user2"]
    },
    createdAt: new Date("2023-04-25"),
    updatedAt: new Date("2023-05-01")
  }
];

const mockHorseAssignments: HorseAssignment[] = [
  {
    id: "a1",
    horseId: "h1",
    horseName: "Thunder",
    paddockId: "p2",
    assignedDate: new Date("2023-05-10"),
    assignedBy: "user1",
    status: "active",
    createdAt: new Date("2023-05-10"),
    updatedAt: new Date("2023-05-10")
  },
  {
    id: "a2",
    horseId: "h2",
    horseName: "Storm",
    paddockId: "p2",
    assignedDate: new Date("2023-05-12"),
    assignedBy: "user1",
    status: "active",
    createdAt: new Date("2023-05-12"),
    updatedAt: new Date("2023-05-12")
  }
];

export const usePaddockData = () => {
  const [paddocks, setPaddocks] = useState<Paddock[]>(mockPaddocks);
  const [maintenanceRecords, setMaintenanceRecords] = useState<PaddockMaintenanceRecord[]>(mockMaintenanceRecords);
  const [rotationPlans, setRotationPlans] = useState<PaddockRotationPlan[]>(mockRotationPlans);
  const [horseAssignments, setHorseAssignments] = useState<HorseAssignment[]>(mockHorseAssignments);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const housingService = useHousingService();

  // Paddock CRUD operations
  const createPaddock = (paddockData: Omit<Paddock, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const newPaddock: Paddock = {
        ...paddockData,
        id: uuidv4(),
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      setPaddocks([...paddocks, newPaddock]);
      toast({
        title: "Success",
        description: `Paddock ${newPaddock.name} created successfully`,
      });
      
      return newPaddock;
    } catch (err) {
      setError(`Failed to create paddock: ${err}`);
      toast({
        title: "Error",
        description: `Failed to create paddock: ${err}`,
        variant: "destructive",
      });
      return null;
    }
  };
  
  const updatePaddock = (id: string, paddockData: Partial<Paddock>) => {
    try {
      const updatedPaddocks = paddocks.map(paddock => 
        paddock.id === id 
          ? { ...paddock, ...paddockData, updatedAt: new Date() } 
          : paddock
      );
      
      setPaddocks(updatedPaddocks);
      toast({
        title: "Success",
        description: "Paddock updated successfully",
      });
      
      return updatedPaddocks.find(p => p.id === id) || null;
    } catch (err) {
      setError(`Failed to update paddock: ${err}`);
      toast({
        title: "Error",
        description: `Failed to update paddock: ${err}`,
        variant: "destructive",
      });
      return null;
    }
  };
  
  const deletePaddock = (id: string) => {
    try {
      // Check if paddock has assigned horses
      const paddock = paddocks.find(p => p.id === id);
      if (paddock?.assignedHorses && paddock.assignedHorses.length > 0) {
        toast({
          title: "Error",
          description: "Cannot delete paddock with assigned horses",
          variant: "destructive",
        });
        return false;
      }
      
      // Check if paddock is part of an active rotation plan
      const isInRotationPlan = rotationPlans
        .filter(plan => plan.status === 'active')
        .some(plan => plan.paddockIds.includes(id));
      
      if (isInRotationPlan) {
        toast({
          title: "Error",
          description: "Cannot delete paddock that is part of an active rotation plan",
          variant: "destructive",
        });
        return false;
      }
      
      setPaddocks(paddocks.filter(paddock => paddock.id !== id));
      toast({
        title: "Success",
        description: "Paddock deleted successfully",
      });
      
      return true;
    } catch (err) {
      setError(`Failed to delete paddock: ${err}`);
      toast({
        title: "Error",
        description: `Failed to delete paddock: ${err}`,
        variant: "destructive",
      });
      return false;
    }
  };
  
  // Horse assignment operations
  const assignHorseToPaddock = (horseId: string, horseName: string, paddockId: string, reason?: string) => {
    try {
      // Use the housing service to handle the assignment
      const result = housingService.assignHorseToPaddock({
        paddockId,
        horseId,
        horseName,
        assignedDate: new Date(),
        assignmentType: 'general',
        status: 'active' as const,
        assignedBy: "current-user",
        reason,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      
      if (!result) {
        throw new Error("Failed to assign horse to paddock");
      }
      
      // Create assignment record
      const newAssignment: HorseAssignment = {
        id: uuidv4(),
        horseId,
        horseName,
        paddockId,
        assignedDate: new Date(),
        assignedBy: "current-user", // In a real app, this would come from auth context
        reason,
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      setHorseAssignments([...horseAssignments, newAssignment]);
      
      // Update paddock data
      const updatedPaddocks = paddocks.map(paddock => {
        if (paddock.id === paddockId) {
          const newHorse = {
            horseId,
            horseName,
            assignedDate: new Date()
          };
          
          const updatedAssignedHorses = paddock.assignedHorses 
            ? [...paddock.assignedHorses, newHorse]
            : [newHorse];
            
          return {
            ...paddock,
            assignedHorses: updatedAssignedHorses,
            currentOccupancy: paddock.currentOccupancy + 1,
            status: "occupied" as PaddockStatus,
            updatedAt: new Date()
          };
        }
        return paddock;
      });
      
      setPaddocks(updatedPaddocks);
      
      toast({
        title: "Success",
        description: `Horse ${horseName} assigned to paddock successfully`,
      });
      
      return true;
    } catch (err) {
      setError(`Failed to assign horse to paddock: ${err}`);
      toast({
        title: "Error",
        description: `Failed to assign horse to paddock: ${err}`,
        variant: "destructive",
      });
      return false;
    }
  };
  
  const removeHorseFromPaddock = (horseId: string, paddockId: string) => {
    try {
      // Update assignment status
      const updatedAssignments = horseAssignments.map(assignment => {
        if (assignment.horseId === horseId && assignment.paddockId === paddockId && assignment.status === "active") {
          return {
            ...assignment,
            status: "completed" as const,
            updatedAt: new Date()
          };
        }
        return assignment;
      });
      
      setHorseAssignments(updatedAssignments);
      
      // Update paddock data
      const updatedPaddocks = paddocks.map(paddock => {
        if (paddock.id === paddockId) {
          const updatedAssignedHorses = paddock.assignedHorses
            ? paddock.assignedHorses.filter(horse => horse.horseId !== horseId)
            : [];
            
          const newOccupancy = Math.max(0, paddock.currentOccupancy - 1);
          
          return {
            ...paddock,
            assignedHorses: updatedAssignedHorses,
            currentOccupancy: newOccupancy,
            status: (newOccupancy === 0 ? "available" : "occupied") as PaddockStatus,
            updatedAt: new Date()
          };
        }
        return paddock;
      });
      
      setPaddocks(updatedPaddocks);
      
      toast({
        title: "Success",
        description: "Horse removed from paddock successfully",
      });
      
      return true;
    } catch (err) {
      setError(`Failed to remove horse from paddock: ${err}`);
      toast({
        title: "Error",
        description: `Failed to remove horse from paddock: ${err}`,
        variant: "destructive",
      });
      return false;
    }
  };
  
  // Maintenance operations
  const scheduleMaintenanceTask = (maintenanceData: Omit<PaddockMaintenanceRecord, 'id' | 'createdAt'>) => {
    try {
      const newRecord: PaddockMaintenanceRecord = {
        ...maintenanceData,
        id: uuidv4(),
        createdAt: new Date()
      };
      
      setMaintenanceRecords([...maintenanceRecords, newRecord]);
      
      // Update paddock status if it's not already in maintenance
      const updatedPaddocks = paddocks.map(paddock => {
        if (paddock.id === maintenanceData.paddockId && paddock.status !== "maintenance") {
          return {
            ...paddock,
            status: "maintenance" as PaddockStatus,
            maintenanceHistory: {
              lastMaintenance: paddock.maintenanceHistory?.lastMaintenance || new Date(),
              nextScheduledMaintenance: maintenanceData.scheduledDate,
              maintenanceType: maintenanceData.type
            },
            updatedAt: new Date()
          };
        }
        return paddock;
      });
      
      setPaddocks(updatedPaddocks);
      
      toast({
        title: "Success",
        description: "Maintenance task scheduled successfully",
      });
      
      return newRecord;
    } catch (err) {
      setError(`Failed to schedule maintenance: ${err}`);
      toast({
        title: "Error",
        description: `Failed to schedule maintenance: ${err}`,
        variant: "destructive",
      });
      return null;
    }
  };
  
  const completeMaintenanceTask = (recordId: string) => {
    try {
      // Update maintenance record
      const updatedRecords = maintenanceRecords.map(record => {
        if (record.id === recordId) {
          return {
            ...record,
            status: "completed" as const,
            completedDate: new Date()
          };
        }
        return record;
      });
      
      setMaintenanceRecords(updatedRecords);
      
      // Find the completed record
      const completedRecord = updatedRecords.find(r => r.id === recordId);
      
      if (completedRecord) {
        // Check if there are any other active maintenance tasks for this paddock
        const hasOtherActiveTasks = updatedRecords.some(
          r => r.paddockId === completedRecord.paddockId && 
               r.id !== recordId && 
               (r.status === "scheduled" || r.status === "in_progress")
        );
        
        if (!hasOtherActiveTasks) {
          // Update paddock status back to available
          const updatedPaddocks = paddocks.map(paddock => {
            if (paddock.id === completedRecord.paddockId) {
              return {
                ...paddock,
                status: (paddock.currentOccupancy > 0 ? "occupied" : "available") as PaddockStatus,
                maintenanceHistory: {
                  lastMaintenance: new Date(),
                  nextScheduledMaintenance: completedRecord.nextMaintenanceDate,
                  maintenanceType: completedRecord.type
                },
                updatedAt: new Date()
              };
            }
            return paddock;
          });
          
          setPaddocks(updatedPaddocks);
        }
      }
      
      toast({
        title: "Success",
        description: "Maintenance task completed successfully",
      });
      
      return true;
    } catch (err) {
      setError(`Failed to complete maintenance task: ${err}`);
      toast({
        title: "Error",
        description: `Failed to complete maintenance task: ${err}`,
        variant: "destructive",
      });
      return false;
    }
  };
  
  // Rotation plan operations
  const createRotationPlan = (planData: Omit<PaddockRotationPlan, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const newPlan: PaddockRotationPlan = {
        ...planData,
        id: uuidv4(),
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      setRotationPlans([...rotationPlans, newPlan]);
      
      // Update paddock rotation schedules
      const updatedPaddocks = paddocks.map(paddock => {
        if (planData.paddockIds.includes(paddock.id)) {
          return {
            ...paddock,
            rotationSchedule: {
              inRotationPlan: true,
              lastRotation: new Date(),
              nextRotation: new Date(planData.startDate.getTime() + planData.rotationInterval * 24 * 60 * 60 * 1000),
              restPeriod: planData.restPeriod
            },
            updatedAt: new Date()
          };
        }
        return paddock;
      });
      
      setPaddocks(updatedPaddocks);
      
      toast({
        title: "Success",
        description: "Rotation plan created successfully",
      });
      
      return newPlan;
    } catch (err) {
      setError(`Failed to create rotation plan: ${err}`);
      toast({
        title: "Error",
        description: `Failed to create rotation plan: ${err}`,
        variant: "destructive",
      });
      return null;
    }
  };
  
  const executeRotation = (planId: string) => {
    try {
      const plan = rotationPlans.find(p => p.id === planId);
      
      if (!plan) {
        throw new Error("Rotation plan not found");
      }
      
      // Rotate horse groups to next paddocks
      const rotatedGroups = plan.horseGroups.map((group, index) => {
        const nextIndex = (index + 1) % plan.paddockIds.length;
        const nextPaddockId = plan.paddockIds[nextIndex];
        
        return {
          ...group,
          currentPaddockId: nextPaddockId
        };
      });
      
      // Update the rotation plan
      const updatedPlans = rotationPlans.map(p => {
        if (p.id === planId) {
          return {
            ...p,
            horseGroups: rotatedGroups,
            updatedAt: new Date()
          };
        }
        return p;
      });
      
      setRotationPlans(updatedPlans);
      
      // Update paddock rotation schedules
      const updatedPaddocks = paddocks.map(paddock => {
        if (plan.paddockIds.includes(paddock.id)) {
          return {
            ...paddock,
            rotationSchedule: {
              inRotationPlan: true,
              lastRotation: new Date(),
              nextRotation: new Date(Date.now() + plan.rotationInterval * 24 * 60 * 60 * 1000),
              restPeriod: plan.restPeriod
            },
            updatedAt: new Date()
          };
        }
        return paddock;
      });
      
      setPaddocks(updatedPaddocks);
      
      // In a real app, we would also update horse assignments here
      
      toast({
        title: "Success",
        description: "Rotation executed successfully",
      });
      
      return true;
    } catch (err) {
      setError(`Failed to execute rotation: ${err}`);
      toast({
        title: "Error",
        description: `Failed to execute rotation: ${err}`,
        variant: "destructive",
      });
      return false;
    }
  };
  
  return {
    paddocks,
    maintenanceRecords,
    rotationPlans,
    horseAssignments,
    loading,
    error,
    createPaddock,
    updatePaddock,
    deletePaddock,
    assignHorseToPaddock,
    removeHorseFromPaddock,
    scheduleMaintenanceTask,
    completeMaintenanceTask,
    createRotationPlan,
    executeRotation
  };
};
