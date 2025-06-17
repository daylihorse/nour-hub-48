import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';

// Import types
import { Paddock, PaddockAssignment } from '@/types/paddocks';
import { Assignment } from '@/types/stableRooms';
import { Horse } from '@/types/horse';

// This service integrates paddock management with stable rooms and horse movements
export const useHousingService = () => {
  // State management
  const [paddockAssignments, setPaddockAssignments] = useState<PaddockAssignment[]>([]);
  const [stableAssignments, setStableAssignments] = useState<Assignment[]>([]);
  const [movementRecords, setMovementRecords] = useState<any[]>([]);
  
  // Assign a horse to a paddock
  const assignHorseToPaddock = useCallback((assignmentData: Omit<PaddockAssignment, 'id'>) => {
    const newAssignment: PaddockAssignment = {
      ...assignmentData,
      id: uuidv4()
    };
    
    setPaddockAssignments(prev => [...prev, newAssignment]);
    
    // Check if horse is being moved from another location
    const previousPaddockAssignment = paddockAssignments.find(a => 
      a.horseId === assignmentData.horseId && 
      a.status === 'active' && 
      a.paddockId !== assignmentData.paddockId
    );
    
    const previousStableAssignment = stableAssignments.find(a => 
      a.entityId === assignmentData.horseId && 
      a.status === 'active'
    );
    
    // Create movement record if horse is being moved from somewhere else
    if (previousPaddockAssignment || previousStableAssignment) {
      createMovementRecord({
        horseId: assignmentData.horseId,
        horseName: assignmentData.horseName,
        type: 'internal',
        date: new Date(),
        time: format(new Date(), 'HH:mm'),
        origin: previousPaddockAssignment 
          ? `Paddock: ${previousPaddockAssignment.paddockId}` 
          : `Stable: ${previousStableAssignment?.roomId}`,
        destination: `Paddock: ${assignmentData.paddockId}`,
        transportMethod: 'walking',
        status: 'completed',
        handler: assignmentData.assignedBy,
        healthCertificate: false,
        notes: 'Automatic movement record from housing reassignment'
      });
      
      // End previous assignment
      if (previousPaddockAssignment) {
        endPaddockAssignment(previousPaddockAssignment.id);
      }
      
      if (previousStableAssignment) {
        endStableAssignment(previousStableAssignment.id);
      }
    }
    
    return newAssignment;
  }, [paddockAssignments, stableAssignments]);
  
  // Assign a horse to a stable room
  const assignHorseToStable = useCallback((assignmentData: Omit<Assignment, 'id'>) => {
    const newAssignment: Assignment = {
      ...assignmentData,
      id: uuidv4()
    };
    
    setStableAssignments(prev => [...prev, newAssignment]);
    
    // Check if horse is being moved from another location
    const previousPaddockAssignment = paddockAssignments.find(a => 
      a.horseId === assignmentData.entityId && 
      a.status === 'active'
    );
    
    const previousStableAssignment = stableAssignments.find(a => 
      a.entityId === assignmentData.entityId && 
      a.status === 'active' && 
      a.roomId !== assignmentData.roomId
    );
    
    // Create movement record if horse is being moved from somewhere else
    if (previousPaddockAssignment || previousStableAssignment) {
      createMovementRecord({
        horseId: assignmentData.entityId,
        horseName: assignmentData.entityName,
        type: 'internal',
        date: new Date(),
        time: format(new Date(), 'HH:mm'),
        origin: previousPaddockAssignment 
          ? `Paddock: ${previousPaddockAssignment.paddockId}` 
          : `Stable: ${previousStableAssignment?.roomId}`,
        destination: `Stable: ${assignmentData.roomId}`,
        transportMethod: 'walking',
        status: 'completed',
        handler: assignmentData.assignedBy,
        healthCertificate: false,
        notes: 'Automatic movement record from housing reassignment'
      });
      
      // End previous assignment
      if (previousPaddockAssignment) {
        endPaddockAssignment(previousPaddockAssignment.id);
      }
      
      if (previousStableAssignment) {
        endStableAssignment(previousStableAssignment.id);
      }
    }
    
    return newAssignment;
  }, [paddockAssignments, stableAssignments]);
  
  // End a paddock assignment
  const endPaddockAssignment = useCallback((assignmentId: string) => {
    setPaddockAssignments(prev => prev.map(assignment => 
      assignment.id === assignmentId 
        ? { ...assignment, status: 'completed', actualEndDate: new Date() } 
        : assignment
    ));
  }, []);
  
  // End a stable assignment
  const endStableAssignment = useCallback((assignmentId: string) => {
    setStableAssignments(prev => prev.map(assignment => 
      assignment.id === assignmentId 
        ? { ...assignment, status: 'completed', actualVacate: new Date() } 
        : assignment
    ));
  }, []);
  
  // Create a movement record
  const createMovementRecord = useCallback((movementData: any) => {
    const newMovement = {
      ...movementData,
      id: uuidv4()
    };
    
    setMovementRecords(prev => [...prev, newMovement]);
    return newMovement;
  }, []);
  
  // Assign horse to quarantine paddock
  const assignHorseToQuarantine = useCallback((horseId: string, horseName: string, reason: string, assignedBy: string) => {
    // In a real implementation, we would find an available quarantine paddock from the database
    const quarantinePaddockId = "quarantine-1"; // Mock ID
    
    const assignment = assignHorseToPaddock({
      paddockId: quarantinePaddockId,
      horseId,
      horseName,
      assignedDate: new Date(),
      assignmentType: 'quarantine',
      status: 'active',
      assignedBy,
      notes: `Quarantine reason: ${reason}`
    });
    
    // Update horse health status to quarantine
    // This would call a horse service in a real implementation
    console.log(`Updated horse ${horseId} health status to quarantine`);
    
    return assignment;
  }, [assignHorseToPaddock]);
  
  // Assign breeding pair to breeding paddock
  const assignBreedingPair = useCallback((
    stallionId: string, 
    stallionName: string, 
    mareId: string, 
    mareName: string,
    assignedBy: string
  ) => {
    // In a real implementation, we would find an available breeding paddock from the database
    const breedingPaddockId = "breeding-1"; // Mock ID
    
    // Assign both horses to the breeding paddock
    const stallionAssignment = assignHorseToPaddock({
      paddockId: breedingPaddockId,
      horseId: stallionId,
      horseName: stallionName,
      assignedDate: new Date(),
      assignmentType: 'breeding',
      status: 'active',
      assignedBy
    });
    
    const mareAssignment = assignHorseToPaddock({
      paddockId: breedingPaddockId,
      horseId: mareId,
      horseName: mareName,
      assignedDate: new Date(),
      assignmentType: 'breeding',
      status: 'active',
      assignedBy
    });
    
    // Create breeding record in the breeding system
    // This would call a breeding service in a real implementation
    console.log(`Created breeding record for ${stallionName} and ${mareName}`);
    
    return { stallionAssignment, mareAssignment };
  }, [assignHorseToPaddock]);
  
  // Get current horse location
  const getHorseLocation = useCallback((horseId: string): { locationType: 'paddock' | 'stable' | 'unknown', locationId: string } => {
    // Check paddock assignments
    const activePaddockAssignment = paddockAssignments.find(a => 
      a.horseId === horseId && 
      a.status === 'active'
    );
    
    if (activePaddockAssignment) {
      return {
        locationType: 'paddock',
        locationId: activePaddockAssignment.paddockId
      };
    }
    
    // Check stable assignments
    const activeStableAssignment = stableAssignments.find(a => 
      a.entityId === horseId && 
      a.entityType === 'horse' && 
      a.status === 'active'
    );
    
    if (activeStableAssignment) {
      return {
        locationType: 'stable',
        locationId: activeStableAssignment.roomId
      };
    }
    
    // Horse location not found
    return {
      locationType: 'unknown',
      locationId: ''
    };
  }, [paddockAssignments, stableAssignments]);
  
  return {
    // Assignment functions
    assignHorseToPaddock,
    assignHorseToStable,
    endPaddockAssignment,
    endStableAssignment,
    
    // Specialized assignment functions
    assignHorseToQuarantine,
    assignBreedingPair,
    
    // Movement functions
    createMovementRecord,
    
    // Query functions
    getHorseLocation,
    
    // State
    paddockAssignments,
    stableAssignments,
    movementRecords
  };
};
