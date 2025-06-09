
import { useState, useEffect, useMemo } from 'react';

// Mock data for room assignment functionality
const mockRooms = [
  {
    id: 'room_1',
    name: 'Stable A1',
    type: 'standard',
    capacity: 1,
    status: 'available',
    pricing: { dailyRate: 150, weeklyRate: 1000, monthlyRate: 4000 },
    amenities: ['water', 'hay_feeder', 'exercise_yard'],
    size: 'large'
  },
  {
    id: 'room_2',
    name: 'Stable B2',
    type: 'premium',
    capacity: 1,
    status: 'available',
    pricing: { dailyRate: 250, weeklyRate: 1500, monthlyRate: 6000 },
    amenities: ['water', 'hay_feeder', 'exercise_yard', 'climate_control'],
    size: 'extra_large'
  }
];

const mockHorses = [
  {
    id: 'horse_1',
    name: 'Thunder',
    breed: 'Arabian',
    age: 5,
    specialNeeds: ['daily_exercise', 'special_diet'],
    currentLocation: 'transport'
  },
  {
    id: 'horse_2',
    name: 'Lightning',
    breed: 'Thoroughbred', 
    age: 3,
    specialNeeds: ['medical_monitoring'],
    currentLocation: 'transport'
  }
];

export const useRoomAssignment = () => {
  const [availableRooms, setAvailableRooms] = useState(mockRooms);
  const [awaitingAssignment, setAwaitingAssignment] = useState(mockHorses);
  const [selectedRoom, setSelectedRoom] = useState('');
  const [selectedHorse, setSelectedHorse] = useState('');

  const getRecommendedRoom = (horseId: string) => {
    const horse = awaitingAssignment.find(h => h.id === horseId);
    if (!horse) return null;

    // Simple recommendation logic based on horse needs
    const recommendedRoom = availableRooms.find(room => {
      if (horse.specialNeeds.includes('medical_monitoring')) {
        return room.amenities.includes('climate_control');
      }
      return room.status === 'available';
    });

    return recommendedRoom || availableRooms[0];
  };

  const calculateCosts = (roomId: string, duration: number, period: 'daily' | 'weekly' | 'monthly') => {
    const room = availableRooms.find(r => r.id === roomId);
    if (!room) return 0;

    const rate = room.pricing[`${period}Rate`];
    return rate * duration;
  };

  const assignRoom = (roomId: string, horseId: string) => {
    console.log(`Assigning room ${roomId} to horse ${horseId}`);
    // Update room status
    setAvailableRooms(prev => 
      prev.map(room => 
        room.id === roomId 
          ? { ...room, status: 'occupied' as const }
          : room
      )
    );
    
    // Remove horse from awaiting list
    setAwaitingAssignment(prev => 
      prev.filter(horse => horse.id !== horseId)
    );
  };

  const setupSuppliesForRoom = (roomId: string) => {
    console.log(`Setting up supplies for room ${roomId}`);
    return Promise.resolve();
  };

  const createBillingAccount = (horseId: string, roomId: string) => {
    console.log(`Creating billing account for horse ${horseId} in room ${roomId}`);
    return Promise.resolve();
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
