
import { useState, useCallback } from 'react';
import { Paddock, PaddockAssignment, PaddockMaintenanceRecord, PaddockRotationPlan } from '@/types/paddocks';
import { v4 as uuidv4 } from 'uuid';

const initialPaddocks: Paddock[] = [
  {
    id: "1",
    name: "North Grazing Field",
    number: "P-01",
    type: "grazing",
    status: "occupied",
    size: { length: 100, width: 80, area: 8000, unit: "m" },
    location: { section: "North Field", block: "A" },
    capacity: 8,
    currentOccupancy: 6,
    features: ["Natural shade", "Stream access", "Hill terrain"],
    amenities: ["Automatic water", "Field shelter"],
    grassType: "Timothy and Clover mix",
    soilCondition: "good",
    drainageQuality: "excellent",
    fencing: {
      type: "Post and rail",
      condition: "good",
      height: 1.5,
      lastInspection: new Date("2024-01-15")
    },
    waterAccess: {
      available: true,
      type: "automatic",
      condition: "excellent"
    },
    shelter: {
      available: true,
      type: "artificial",
      capacity: 10
    },
    assignedHorses: [
      { horseId: "h1", horseName: "Thunder", assignedDate: new Date("2024-01-10") },
      { horseId: "h2", horseName: "Lightning", assignedDate: new Date("2024-01-10") }
    ],
    rotationSchedule: {
      nextRotation: new Date("2024-02-10"),
      rotationDuration: 30,
      restPeriod: 14
    },
    maintenanceHistory: [],
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-15")
  },
  {
    id: "2",
    name: "Exercise Arena",
    number: "P-02", 
    type: "exercise",
    status: "available",
    size: { length: 60, width: 40, area: 2400, unit: "m" },
    location: { section: "Training Complex", block: "B" },
    capacity: 4,
    currentOccupancy: 0,
    features: ["Sand footing", "Fenced perimeter", "Training equipment"],
    amenities: ["Lighting", "Viewing area"],
    fencing: {
      type: "Board fence",
      condition: "excellent",
      height: 1.8,
      lastInspection: new Date("2024-01-20")
    },
    waterAccess: {
      available: true,
      type: "manual",
      condition: "good"
    },
    shelter: {
      available: false
    },
    maintenanceHistory: [],
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01")
  }
];

export const usePaddockData = () => {
  const [paddocks, setPaddocks] = useState<Paddock[]>(initialPaddocks);
  const [assignments, setAssignments] = useState<PaddockAssignment[]>([]);
  const [maintenanceRecords, setMaintenanceRecords] = useState<PaddockMaintenanceRecord[]>([]);
  const [rotationPlans, setRotationPlans] = useState<PaddockRotationPlan[]>([]);

  const addPaddock = useCallback((paddockData: Omit<Paddock, 'id' | 'createdAt' | 'updatedAt' | 'maintenanceHistory'>) => {
    const newPaddock: Paddock = {
      ...paddockData,
      id: uuidv4(),
      maintenanceHistory: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setPaddocks(prev => [...prev, newPaddock]);
    console.log('Added new paddock:', newPaddock);
  }, []);

  const updatePaddock = useCallback((updatedPaddock: Paddock) => {
    setPaddocks(prev => prev.map(paddock => 
      paddock.id === updatedPaddock.id 
        ? { ...updatedPaddock, updatedAt: new Date() }
        : paddock
    ));
    console.log('Updated paddock:', updatedPaddock);
  }, []);

  const deletePaddock = useCallback((paddockId: string) => {
    setPaddocks(prev => prev.filter(paddock => paddock.id !== paddockId));
    setAssignments(prev => prev.filter(assignment => assignment.paddockId !== paddockId));
    console.log('Deleted paddock:', paddockId);
  }, []);

  const assignHorseToPaddock = useCallback((assignmentData: Omit<PaddockAssignment, 'id'>) => {
    const newAssignment: PaddockAssignment = {
      ...assignmentData,
      id: uuidv4()
    };
    
    setAssignments(prev => [...prev, newAssignment]);
    
    // Update paddock occupancy
    setPaddocks(prev => prev.map(paddock => {
      if (paddock.id === assignmentData.paddockId) {
        const updatedHorses = paddock.assignedHorses || [];
        return {
          ...paddock,
          status: 'occupied' as const,
          currentOccupancy: paddock.currentOccupancy + 1,
          assignedHorses: [...updatedHorses, {
            horseId: assignmentData.horseId,
            horseName: assignmentData.horseName,
            assignedDate: assignmentData.assignedDate,
            expectedRotation: assignmentData.expectedEndDate
          }],
          updatedAt: new Date()
        };
      }
      return paddock;
    }));
    
    console.log('Created paddock assignment:', newAssignment);
  }, []);

  const getPaddockStats = useCallback(() => {
    const totalPaddocks = paddocks.length;
    const occupiedPaddocks = paddocks.filter(p => p.status === 'occupied').length;
    const availablePaddocks = paddocks.filter(p => p.status === 'available').length;
    const maintenancePaddocks = paddocks.filter(p => p.status === 'maintenance').length;
    const occupancyRate = totalPaddocks > 0 ? (occupiedPaddocks / totalPaddocks) * 100 : 0;
    
    const totalCapacity = paddocks.reduce((sum, p) => sum + p.capacity, 0);
    const totalOccupancy = paddocks.reduce((sum, p) => sum + p.currentOccupancy, 0);
    const utilizationRate = totalCapacity > 0 ? (totalOccupancy / totalCapacity) * 100 : 0;

    return {
      totalPaddocks,
      occupiedPaddocks,
      availablePaddocks,
      maintenancePaddocks,
      occupancyRate: parseFloat(occupancyRate.toFixed(1)),
      totalCapacity,
      totalOccupancy,
      utilizationRate: parseFloat(utilizationRate.toFixed(1))
    };
  }, [paddocks]);

  return {
    paddocks,
    assignments,
    maintenanceRecords,
    rotationPlans,
    addPaddock,
    updatePaddock,
    deletePaddock,
    assignHorseToPaddock,
    getPaddockStats
  };
};
