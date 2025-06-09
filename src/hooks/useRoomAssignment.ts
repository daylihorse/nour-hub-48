
import { useState, useMemo } from 'react';
import { Room } from '@/types/stableRooms';

export interface HorseAwaitingAssignment {
  id: string;
  name: string;
  type: string;
  owner: string;
  arrivalDate: Date;
  specialRequirements: string[];
  priority: 'low' | 'normal' | 'high' | 'critical';
}

export interface UseRoomAssignmentReturn {
  availableRooms: Room[];
  awaitingAssignment: HorseAwaitingAssignment[];
  selectedRoom: string;
  setSelectedRoom: (roomId: string) => void;
  selectedHorse: string;
  setSelectedHorse: (horseId: string) => void;
  getRecommendedRoom: (horseId: string) => Room | null;
  calculateCosts: (roomId: string, duration?: number) => {
    daily: number;
    monthly: number;
    estimated: number;
  };
  assignRoom: (roomId: string, horseId: string) => void;
  setupSuppliesForRoom: (roomId: string, horseId: string) => void;
  createBillingAccount: (roomId: string, horseId: string) => void;
}

const mockAvailableRooms: Room[] = [
  {
    id: '1',
    number: 'A101',
    name: 'Premium Stall A101',
    type: 'stall',
    status: 'available',
    capacity: 1,
    currentOccupancy: 0,
    size: { length: 12, width: 12, unit: 'ft' },
    location: { building: 'Building A', section: 'North Wing' },
    features: ['climate_controlled', 'automatic_waterer', 'premium_bedding'],
    amenities: ['hay_rack', 'feed_bin', 'salt_lick_holder'],
    pricing: { dailyRate: 50, monthlyRate: 1200, currency: 'USD' },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    number: 'B205',
    name: 'Standard Stall B205',
    type: 'stall',
    status: 'available',
    capacity: 1,
    currentOccupancy: 0,
    size: { length: 10, width: 10, unit: 'ft' },
    location: { building: 'Building B', section: 'South Wing' },
    features: ['natural_ventilation', 'automatic_waterer'],
    amenities: ['hay_rack', 'feed_bin'],
    pricing: { dailyRate: 35, monthlyRate: 850, currency: 'USD' },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '3',
    number: 'C301',
    name: 'Medical Stall C301',
    type: 'quarantine',
    status: 'available',
    capacity: 1,
    currentOccupancy: 0,
    size: { length: 14, width: 12, unit: 'ft' },
    location: { building: 'Medical Center', section: 'Isolation Wing' },
    features: ['medical_equipment', 'isolation_ventilation', 'monitoring_cameras'],
    amenities: ['medical_feed_system', 'emergency_alert'],
    pricing: { dailyRate: 75, monthlyRate: 1800, currency: 'USD' },
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

const mockAwaitingAssignment: HorseAwaitingAssignment[] = [
  {
    id: '1',
    name: 'Thunder',
    type: 'horse',
    owner: 'John Smith',
    arrivalDate: new Date('2024-01-28'),
    specialRequirements: ['medical_monitoring', 'premium_feed'],
    priority: 'high'
  },
  {
    id: '2',
    name: 'Lightning',
    type: 'horse',
    owner: 'Sarah Johnson',
    arrivalDate: new Date('2024-01-29'),
    specialRequirements: ['standard_care'],
    priority: 'normal'
  }
];

export const useRoomAssignment = (): UseRoomAssignmentReturn => {
  const [selectedRoom, setSelectedRoom] = useState<string>('');
  const [selectedHorse, setSelectedHorse] = useState<string>('');
  const [availableRooms] = useState<Room[]>(mockAvailableRooms);
  const [awaitingAssignment] = useState<HorseAwaitingAssignment[]>(mockAwaitingAssignment);

  const getRecommendedRoom = (horseId: string) => {
    const horse = awaitingAssignment.find(h => h.id === horseId);
    if (!horse) return null;

    if (horse.specialRequirements.includes('medical_monitoring')) {
      return availableRooms.find(r => r.type === 'quarantine') || null;
    }
    if (horse.specialRequirements.includes('premium_feed')) {
      return availableRooms.find(r => r.features.includes('climate_controlled')) || null;
    }
    return availableRooms.find(r => r.type === 'stall' && r.status === 'available') || null;
  };

  const calculateCosts = (roomId: string, duration: number = 30) => {
    const room = availableRooms.find(r => r.id === roomId);
    if (!room?.pricing) return { daily: 0, monthly: 0, estimated: 0 };
    
    return {
      daily: room.pricing.dailyRate,
      monthly: room.pricing.monthlyRate,
      estimated: room.pricing.dailyRate * duration
    };
  };

  const assignRoom = (roomId: string, horseId: string) => {
    const horse = awaitingAssignment.find(h => h.id === horseId);
    const room = availableRooms.find(r => r.id === roomId);
    
    if (horse && room) {
      console.log(`Assigning ${horse.name} to room ${room.number}`);
      // In a real implementation, this would call an API
    }
  };

  const setupSuppliesForRoom = (roomId: string, horseId: string) => {
    const horse = awaitingAssignment.find(h => h.id === horseId);
    const room = availableRooms.find(r => r.id === roomId);
    
    console.log(`Setting up supplies for ${horse?.name} in room ${room?.number}`);
    // This would integrate with inventory system to allocate supplies
  };

  const createBillingAccount = (roomId: string, horseId: string) => {
    const costs = calculateCosts(roomId);
    console.log(`Creating billing account with daily rate: $${costs.daily}`);
    // This would integrate with finance system
  };

  return {
    availableRooms,
    awaitingAssignment,
    selectedRoom,
    setSelectedRoom,
    selectedHorse,
    setSelectedHorse,
    getRecommendedRoom,
    calculateCosts,
    assignRoom,
    setupSuppliesForRoom,
    createBillingAccount
  };
};
