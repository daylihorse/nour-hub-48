
import { useState, useCallback } from 'react';
import { Room, Assignment, MaintenanceRecord } from '@/types/stableRooms';
import { v4 as uuidv4 } from 'uuid';

// Mock initial data
const initialRooms: Room[] = [
  {
    id: "1",
    number: "A-01",
    name: "Premium Stall Alpha",
    type: "stall",
    status: "occupied",
    capacity: 1,
    currentOccupancy: 1,
    size: { length: 4, width: 4, unit: "m" },
    location: { building: "Building A", section: "North Wing" },
    features: ["Automatic waterer", "Rubber matting", "Hay feeder"],
    amenities: ["Climate control", "CCTV"],
    assignedTo: {
      type: "horse",
      entityId: "h1",
      entityName: "Thunder",
      assignedDate: new Date("2024-01-15")
    },
    pricing: { dailyRate: 50, monthlyRate: 1400, currency: "USD" },
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-15")
  },
  {
    id: "2",
    number: "A-02",
    name: "Standard Stall",
    type: "stall",
    status: "available",
    capacity: 1,
    currentOccupancy: 0,
    size: { length: 3.5, width: 3.5, unit: "m" },
    location: { building: "Building A", section: "North Wing" },
    features: ["Manual waterer", "Straw bedding"],
    amenities: [],
    pricing: { dailyRate: 35, monthlyRate: 980, currency: "USD" },
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01")
  },
  {
    id: "3",
    number: "W-01",
    name: "Feed Storage Warehouse",
    type: "warehouse",
    status: "occupied",
    capacity: 100,
    currentOccupancy: 75,
    size: { length: 20, width: 15, height: 5, unit: "m" },
    location: { building: "Warehouse Complex", section: "Central" },
    features: ["Climate controlled", "Pest control", "Loading dock"],
    amenities: ["Forklift access", "Inventory system"],
    assignedTo: {
      type: "supplies",
      entityId: "s1",
      entityName: "Horse Feed & Bedding",
      assignedDate: new Date("2024-01-01")
    },
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-05")
  }
];

const initialAssignments: Assignment[] = [
  {
    id: "1",
    roomId: "1",
    entityType: "horse",
    entityId: "h1",
    entityName: "Thunder",
    assignedDate: new Date("2024-01-15"),
    expectedVacate: new Date("2024-03-15"),
    status: "active",
    assignedBy: "John Smith",
    notes: "Premium stall for breeding stallion",
    cost: {
      dailyRate: 50,
      totalCost: 3000,
      currency: "USD"
    }
  },
  {
    id: "2",
    roomId: "3",
    entityType: "supplies",
    entityId: "s1",
    entityName: "Horse Feed & Bedding",
    assignedDate: new Date("2024-01-01"),
    status: "active",
    assignedBy: "Sarah Johnson",
    notes: "Long-term storage for feed supplies",
    cost: {
      dailyRate: 25,
      totalCost: 4575,
      currency: "USD"
    }
  }
];

export const useStableRoomsData = () => {
  const [rooms, setRooms] = useState<Room[]>(initialRooms);
  const [assignments, setAssignments] = useState<Assignment[]>(initialAssignments);
  const [maintenanceRecords, setMaintenanceRecords] = useState<MaintenanceRecord[]>([]);

  const addRoom = useCallback((roomData: Omit<Room, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newRoom: Room = {
      ...roomData,
      id: uuidv4(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setRooms(prev => [...prev, newRoom]);
    console.log('Added new room:', newRoom);
  }, []);

  const updateRoom = useCallback((updatedRoom: Room) => {
    setRooms(prev => prev.map(room => 
      room.id === updatedRoom.id ? updatedRoom : room
    ));
    console.log('Updated room:', updatedRoom);
  }, []);

  const deleteRoom = useCallback((roomId: string) => {
    setRooms(prev => prev.filter(room => room.id !== roomId));
    setAssignments(prev => prev.filter(assignment => assignment.roomId !== roomId));
    console.log('Deleted room:', roomId);
  }, []);

  const createAssignment = useCallback((assignmentData: Omit<Assignment, 'id'>) => {
    const newAssignment: Assignment = {
      ...assignmentData,
      id: uuidv4()
    };
    
    setAssignments(prev => [...prev, newAssignment]);
    
    // Update room status and occupancy
    setRooms(prev => prev.map(room => {
      if (room.id === assignmentData.roomId) {
        return {
          ...room,
          status: 'occupied' as const,
          currentOccupancy: room.currentOccupancy + 1,
          assignedTo: {
            type: assignmentData.entityType,
            entityId: assignmentData.entityId,
            entityName: assignmentData.entityName,
            assignedDate: assignmentData.assignedDate,
            expectedVacate: assignmentData.expectedVacate
          },
          updatedAt: new Date()
        };
      }
      return room;
    }));
    
    console.log('Created assignment:', newAssignment);
  }, []);

  const endAssignment = useCallback((assignmentId: string) => {
    setAssignments(prev => prev.map(assignment => {
      if (assignment.id === assignmentId) {
        const updatedAssignment = {
          ...assignment,
          status: 'completed' as const,
          actualVacate: new Date()
        };
        
        // Update room status
        setRooms(roomsPrev => roomsPrev.map(room => {
          if (room.id === assignment.roomId) {
            return {
              ...room,
              status: 'available' as const,
              currentOccupancy: Math.max(0, room.currentOccupancy - 1),
              assignedTo: undefined,
              updatedAt: new Date()
            };
          }
          return room;
        }));
        
        return updatedAssignment;
      }
      return assignment;
    }));
    console.log('Ended assignment:', assignmentId);
  }, []);

  const getAvailableRooms = useCallback(() => {
    return rooms.filter(room => room.status === 'available');
  }, [rooms]);

  const getRoomOccupancyStats = useCallback(() => {
    const totalRooms = rooms.length;
    const occupiedRooms = rooms.filter(room => room.status === 'occupied').length;
    const availableRooms = rooms.filter(room => room.status === 'available').length;
    const maintenanceRooms = rooms.filter(room => room.status === 'maintenance').length;
    const occupancyRate = totalRooms > 0 ? (occupiedRooms / totalRooms) * 100 : 0;

    return {
      totalRooms,
      occupiedRooms,
      availableRooms,
      maintenanceRooms,
      occupancyRate: parseFloat(occupancyRate.toFixed(1))
    };
  }, [rooms]);

  return {
    rooms,
    assignments,
    maintenanceRecords,
    addRoom,
    updateRoom,
    deleteRoom,
    createAssignment,
    endAssignment,
    getAvailableRooms,
    getRoomOccupancyStats
  };
};
