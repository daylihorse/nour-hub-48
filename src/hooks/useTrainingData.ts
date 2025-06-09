
import { useState, useMemo } from 'react';
import { TrainingProgram, TrainingSession, TrainingFacility, TrainingWorkflow } from '@/types/training';

export interface UseTrainingDataReturn {
  programs: TrainingProgram[];
  sessions: TrainingSession[];
  facilities: TrainingFacility[];
  workflows: TrainingWorkflow[];
  metrics: {
    activePrograms: number;
    horsesInTraining: number;
    todaySessions: number;
    availableFacilities: number;
  };
  isLoading: boolean;
  createProgram: (program: Omit<TrainingProgram, 'id' | 'createdAt' | 'updatedAt'>) => void;
  scheduleSession: (session: Omit<TrainingSession, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateSessionStatus: (sessionId: string, status: TrainingSession['status']) => void;
  createWorkflow: (workflow: Omit<TrainingWorkflow, 'id' | 'createdAt' | 'updatedAt'>) => void;
}

// Mock data
const mockPrograms: TrainingProgram[] = [
  {
    id: 'prog_001',
    name: 'Basic Riding Fundamentals',
    description: 'Introduction to basic riding techniques and horse handling',
    type: 'basic',
    discipline: 'General Riding',
    duration: 8,
    intensity: 'low',
    maxParticipants: 6,
    currentParticipants: 4,
    trainer: {
      id: 'trainer_001',
      name: 'Sarah Johnson',
      specializations: ['Basic Training', 'Horse Psychology'],
      certifications: ['Certified Riding Instructor', 'Horse Behavior Specialist']
    },
    schedule: {
      days: ['Monday', 'Wednesday', 'Friday'],
      timeSlots: ['09:00-11:00', '14:00-16:00'],
      location: 'Main Arena'
    },
    requirements: {
      minimumAge: 2,
      healthClearance: true,
      experienceLevel: 'beginner',
      equipment: ['halter', 'lead rope', 'basic tack']
    },
    status: 'active',
    startDate: new Date('2024-01-15'),
    endDate: new Date('2024-03-15'),
    cost: 2500,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-10')
  },
  {
    id: 'prog_002',
    name: 'Advanced Dressage Training',
    description: 'Advanced dressage movements and competition preparation',
    type: 'advanced',
    discipline: 'Dressage',
    duration: 12,
    intensity: 'high',
    maxParticipants: 4,
    currentParticipants: 3,
    trainer: {
      id: 'trainer_002',
      name: 'Dr. Martinez',
      specializations: ['Dressage', 'Competition Training'],
      certifications: ['FEI Dressage Trainer', 'Olympic Level Certification']
    },
    schedule: {
      days: ['Tuesday', 'Thursday', 'Saturday'],
      timeSlots: ['08:00-10:00', '16:00-18:00'],
      location: 'Dressage Arena'
    },
    requirements: {
      minimumAge: 5,
      healthClearance: true,
      experienceLevel: 'advanced',
      equipment: ['dressage saddle', 'specialized bridle', 'protective boots']
    },
    status: 'active',
    startDate: new Date('2024-02-01'),
    endDate: new Date('2024-05-01'),
    cost: 5000,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20')
  }
];

const mockSessions: TrainingSession[] = [
  {
    id: 'session_001',
    programId: 'prog_001',
    horseId: 'H001',
    trainerId: 'trainer_001',
    date: new Date(),
    duration: 120,
    type: 'group',
    activities: ['warm-up', 'basic commands', 'cool-down'],
    location: 'Main Arena',
    equipment: ['halter', 'lead rope'],
    status: 'scheduled',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'session_002',
    programId: 'prog_002',
    horseId: 'H002',
    trainerId: 'trainer_002',
    date: new Date(),
    duration: 90,
    type: 'individual',
    activities: ['collection exercises', 'lateral movements'],
    location: 'Dressage Arena',
    equipment: ['dressage saddle', 'specialized bridle'],
    status: 'in_progress',
    performanceMetrics: {
      endurance: 8,
      technique: 9,
      behavior: 7,
      improvement: 8
    },
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

const mockFacilities: TrainingFacility[] = [
  {
    id: 'facility_001',
    name: 'Main Arena',
    type: 'arena',
    capacity: 8,
    equipment: ['jumps', 'cones', 'poles'],
    status: 'available',
    schedule: [],
    maintenanceHistory: [],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'facility_002',
    name: 'Dressage Arena',
    type: 'dressage',
    capacity: 4,
    equipment: ['dressage letters', 'mirrors', 'sound system'],
    status: 'occupied',
    schedule: [],
    maintenanceHistory: [],
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

const mockWorkflows: TrainingWorkflow[] = [
  {
    id: 'workflow_001',
    type: 'enrollment',
    horseId: 'H001',
    programId: 'prog_001',
    status: 'in_progress',
    steps: [
      {
        id: 'step_001',
        title: 'Health Clearance',
        department: 'Clinic',
        status: 'completed',
        assignedTo: 'Dr. Martinez',
        estimatedTime: '30 mins',
        actions: ['Physical examination', 'Vaccination check', 'Fitness assessment'],
        completedAt: new Date()
      },
      {
        id: 'step_002',
        title: 'Equipment Assignment',
        department: 'Inventory',
        status: 'in_progress',
        assignedTo: 'Equipment Manager',
        estimatedTime: '15 mins',
        dependencies: ['step_001'],
        actions: ['Allocate training equipment', 'Fit check', 'Safety inspection']
      },
      {
        id: 'step_003',
        title: 'Financial Setup',
        department: 'Finance',
        status: 'pending',
        estimatedTime: '10 mins',
        dependencies: ['step_002'],
        actions: ['Create billing account', 'Setup payment plan', 'Generate invoice']
      }
    ],
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export const useTrainingData = (): UseTrainingDataReturn => {
  const [programs] = useState<TrainingProgram[]>(mockPrograms);
  const [sessions] = useState<TrainingSession[]>(mockSessions);
  const [facilities] = useState<TrainingFacility[]>(mockFacilities);
  const [workflows] = useState<TrainingWorkflow[]>(mockWorkflows);
  const [isLoading] = useState(false);

  const metrics = useMemo(() => {
    const today = new Date();
    const todaySessions = sessions.filter(session => 
      session.date.toDateString() === today.toDateString()
    ).length;

    return {
      activePrograms: programs.filter(p => p.status === 'active').length,
      horsesInTraining: new Set(sessions.map(s => s.horseId)).size,
      todaySessions,
      availableFacilities: facilities.filter(f => f.status === 'available').length
    };
  }, [programs, sessions, facilities]);

  const createProgram = (programData: Omit<TrainingProgram, 'id' | 'createdAt' | 'updatedAt'>) => {
    console.log('Creating program:', programData);
    // Implementation would update state and trigger workflows
  };

  const scheduleSession = (sessionData: Omit<TrainingSession, 'id' | 'createdAt' | 'updatedAt'>) => {
    console.log('Scheduling session:', sessionData);
    // Implementation would update state and check facility availability
  };

  const updateSessionStatus = (sessionId: string, status: TrainingSession['status']) => {
    console.log('Updating session status:', sessionId, status);
    // Implementation would update session status and trigger integrations
  };

  const createWorkflow = (workflowData: Omit<TrainingWorkflow, 'id' | 'createdAt' | 'updatedAt'>) => {
    console.log('Creating workflow:', workflowData);
    // Implementation would create cross-departmental workflow
  };

  return {
    programs,
    sessions,
    facilities,
    workflows,
    metrics,
    isLoading,
    createProgram,
    scheduleSession,
    updateSessionStatus,
    createWorkflow
  };
};
