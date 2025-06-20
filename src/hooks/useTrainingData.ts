
import { useState, useEffect } from 'react';

export interface TrainingProgram {
  id: string;
  name: string;
  description: string;
  type: 'basic' | 'intermediate' | 'advanced' | 'specialized' | 'rehabilitation' | 'competition_prep';
  discipline: string;
  intensity: 'low' | 'medium' | 'high';
  duration: number; // weeks
  cost: number;
  status: 'active' | 'inactive' | 'draft';
  currentParticipants: number;
  maxParticipants: number;
  startDate: Date;
  trainer: {
    name: string;
    id: string;
  };
  schedule: {
    days: string[];
    time: string;
  };
  requirements?: {
    minimumAge: number;
    healthClearance: boolean;
    experienceLevel: string;
  };
}

// Mock data for training programs
const mockPrograms: TrainingProgram[] = [
  {
    id: '1',
    name: 'Basic Riding Foundation',
    description: 'Introduction to horse riding fundamentals and safety protocols',
    type: 'basic',
    discipline: 'General Riding',
    intensity: 'low',
    duration: 8,
    cost: 800,
    status: 'active',
    currentParticipants: 5,
    maxParticipants: 8,
    startDate: new Date('2024-01-15'),
    trainer: {
      name: 'Sarah Johnson',
      id: 'trainer-1'
    },
    schedule: {
      days: ['Monday', 'Wednesday', 'Friday'],
      time: '10:00 AM'
    },
    requirements: {
      minimumAge: 8,
      healthClearance: true,
      experienceLevel: 'beginner'
    }
  },
  {
    id: '2',
    name: 'Advanced Dressage Training',
    description: 'High-level dressage techniques and competition preparation',
    type: 'advanced',
    discipline: 'Dressage',
    intensity: 'high',
    duration: 12,
    cost: 1800,
    status: 'active',
    currentParticipants: 3,
    maxParticipants: 6,
    startDate: new Date('2024-02-01'),
    trainer: {
      name: 'Michael Chen',
      id: 'trainer-2'
    },
    schedule: {
      days: ['Tuesday', 'Thursday', 'Saturday'],
      time: '2:00 PM'
    },
    requirements: {
      minimumAge: 16,
      healthClearance: true,
      experienceLevel: 'advanced'
    }
  },
  {
    id: '3',
    name: 'Show Jumping Intensive',
    description: 'Comprehensive show jumping training for competitions',
    type: 'competition_prep',
    discipline: 'Show Jumping',
    intensity: 'high',
    duration: 10,
    cost: 1500,
    status: 'active',
    currentParticipants: 4,
    maxParticipants: 8,
    startDate: new Date('2024-02-15'),
    trainer: {
      name: 'Emma Rodriguez',
      id: 'trainer-3'
    },
    schedule: {
      days: ['Monday', 'Thursday', 'Sunday'],
      time: '9:00 AM'
    },
    requirements: {
      minimumAge: 14,
      healthClearance: true,
      experienceLevel: 'intermediate'
    }
  },
  {
    id: '4',
    name: 'Therapeutic Riding Program',
    description: 'Specialized program for riders with physical or cognitive challenges',
    type: 'specialized',
    discipline: 'Therapeutic Riding',
    intensity: 'low',
    duration: 16,
    cost: 1200,
    status: 'active',
    currentParticipants: 6,
    maxParticipants: 10,
    startDate: new Date('2024-01-08'),
    trainer: {
      name: 'Dr. Lisa Harper',
      id: 'trainer-4'
    },
    schedule: {
      days: ['Tuesday', 'Friday'],
      time: '11:00 AM'
    },
    requirements: {
      minimumAge: 5,
      healthClearance: true,
      experienceLevel: 'beginner'
    }
  },
  {
    id: '5',
    name: 'Horse Rehabilitation Training',
    description: 'Training program for horses recovering from injury or layoff',
    type: 'rehabilitation',
    discipline: 'Rehabilitation',
    intensity: 'medium',
    duration: 20,
    cost: 2000,
    status: 'active',
    currentParticipants: 2,
    maxParticipants: 4,
    startDate: new Date('2024-01-22'),
    trainer: {
      name: 'Robert Kim',
      id: 'trainer-5'
    },
    schedule: {
      days: ['Monday', 'Wednesday', 'Friday'],
      time: '3:00 PM'
    },
    requirements: {
      minimumAge: 18,
      healthClearance: true,
      experienceLevel: 'advanced'
    }
  }
];

export const useTrainingData = () => {
  const [programs, setPrograms] = useState<TrainingProgram[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchPrograms = async () => {
      setIsLoading(true);
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setPrograms(mockPrograms);
      setIsLoading(false);
    };

    fetchPrograms();
  }, []);

  const addProgram = async (program: Omit<TrainingProgram, 'id'>) => {
    const newProgram: TrainingProgram = {
      ...program,
      id: `program-${Date.now()}`
    };
    setPrograms(prev => [...prev, newProgram]);
    return newProgram;
  };

  const updateProgram = async (id: string, updates: Partial<TrainingProgram>) => {
    setPrograms(prev => prev.map(program => 
      program.id === id ? { ...program, ...updates } : program
    ));
  };

  const deleteProgram = async (id: string) => {
    setPrograms(prev => prev.filter(program => program.id !== id));
  };

  return {
    programs,
    isLoading,
    addProgram,
    updateProgram,
    deleteProgram
  };
};
