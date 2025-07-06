import { Paddock, MaintenanceTask, RotationPlan, AssignedHorse } from '@/types/paddocks';

// Mock data for demonstration
const mockPaddocks: Paddock[] = [
  {
    id: '1',
    name: 'Paddock Alpha',
    number: 'P-001',
    type: 'pasture',
    status: 'occupied',
    location: {
      section: 'North Field',
      coordinates: { lat: 40.7128, lng: -74.0060 }
    },
    size: {
      length: 100,
      width: 80,
      unit: 'meters',
      area: 8000
    },
    capacity: 8,
    currentOccupancy: 5,
    assignedHorses: [
      { horseId: '1', horseName: 'Thunder', assignedAt: new Date('2024-01-15'), notes: 'Grazing rotation' },
      { horseId: '2', horseName: 'Lightning', assignedAt: new Date('2024-01-15') },
      { horseId: '3', horseName: 'Storm', assignedAt: new Date('2024-01-16') },
      { horseId: '4', horseName: 'Blaze', assignedAt: new Date('2024-01-16') },
      { horseId: '5', horseName: 'Spirit', assignedAt: new Date('2024-01-17') }
    ],
    facilities: {
      waterSource: true,
      shelter: true,
      fencing: 'wood',
      gates: 2,
      lighting: false
    },
    soilCondition: {
      type: 'grass',
      drainage: 'good',
      lastTested: new Date('2024-01-01')
    },
    rotationSchedule: {
      nextRotation: new Date('2024-02-15'),
      restPeriod: 14,
      lastRotation: new Date('2024-01-01')
    },
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-17'),
    tenantId: 'tenant-1'
  },
  {
    id: '2',
    name: 'Exercise Arena',
    number: 'P-002',
    type: 'exercise',
    status: 'available',
    location: {
      section: 'Training Complex'
    },
    size: {
      length: 60,
      width: 40,
      unit: 'meters',
      area: 2400
    },
    capacity: 4,
    currentOccupancy: 0,
    facilities: {
      waterSource: true,
      shelter: false,
      fencing: 'metal',
      gates: 1,
      lighting: true
    },
    soilCondition: {
      type: 'sand',
      drainage: 'excellent',
      lastTested: new Date('2024-01-10')
    },
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-10'),
    tenantId: 'tenant-1'
  },
  {
    id: '3',
    name: 'Quarantine Area',
    number: 'P-003',
    type: 'quarantine',
    status: 'maintenance',
    location: {
      section: 'Isolation Block'
    },
    size: {
      length: 30,
      width: 20,
      unit: 'meters',
      area: 600
    },
    capacity: 2,
    currentOccupancy: 0,
    facilities: {
      waterSource: true,
      shelter: true,
      fencing: 'electric',
      gates: 1,
      lighting: true
    },
    soilCondition: {
      type: 'dirt',
      drainage: 'fair',
      lastTested: new Date('2024-01-05')
    },
    maintenanceSchedule: {
      lastMaintenance: new Date('2024-01-05'),
      nextMaintenance: new Date('2024-02-05'),
      type: 'Fence Repair'
    },
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-18'),
    tenantId: 'tenant-1'
  }
];

const mockMaintenanceTasks: MaintenanceTask[] = [
  {
    id: '1',
    paddockId: '3',
    paddockName: 'Quarantine Area',
    type: 'fence_repair',
    priority: 'high',
    status: 'scheduled',
    scheduledDate: new Date('2024-02-05'),
    estimatedDuration: 4,
    assignedTo: 'John Smith',
    description: 'Replace damaged fence posts and wire',
    cost: 500,
    createdAt: new Date('2024-01-18'),
    updatedAt: new Date('2024-01-18'),
    tenantId: 'tenant-1'
  },
  {
    id: '2',
    paddockId: '1',
    paddockName: 'Paddock Alpha',
    type: 'water_system',
    priority: 'medium',
    status: 'completed',
    scheduledDate: new Date('2024-01-20'),
    completedDate: new Date('2024-01-20'),
    estimatedDuration: 2,
    assignedTo: 'Mike Johnson',
    description: 'Check and clean water troughs',
    cost: 100,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20'),
    tenantId: 'tenant-1'
  }
];

const mockRotationPlans: RotationPlan[] = [
  {
    id: '1',
    name: 'Summer Grazing Plan',
    description: 'Rotational grazing for summer months',
    duration: 14,
    restPeriod: 7,
    paddockIds: ['1', '2'],
    horseGroups: [
      {
        id: '1',
        name: 'Group A',
        horseIds: ['1', '2', '3'],
        currentPaddockId: '1',
        rotationOrder: 1
      },
      {
        id: '2',
        name: 'Group B',
        horseIds: ['4', '5'],
        rotationOrder: 2
      }
    ],
    status: 'active',
    startDate: new Date('2024-01-01'),
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    tenantId: 'tenant-1'
  }
];

class HousingService {
  async getAllPaddocks(): Promise<Paddock[]> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockPaddocks;
  }

  async getPaddockById(id: string): Promise<Paddock | null> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockPaddocks.find(p => p.id === id) || null;
  }

  async createPaddock(paddockData: Omit<Paddock, 'id' | 'createdAt' | 'updatedAt' | 'tenantId'>): Promise<Paddock> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const newPaddock: Paddock = {
      ...paddockData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
      tenantId: 'tenant-1'
    };
    
    mockPaddocks.push(newPaddock);
    return newPaddock;
  }

  async updatePaddock(id: string, updates: Partial<Paddock>): Promise<Paddock> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const index = mockPaddocks.findIndex(p => p.id === id);
    if (index === -1) {
      throw new Error('Paddock not found');
    }
    
    mockPaddocks[index] = {
      ...mockPaddocks[index],
      ...updates,
      updatedAt: new Date()
    };
    
    return mockPaddocks[index];
  }

  async deletePaddock(id: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const index = mockPaddocks.findIndex(p => p.id === id);
    if (index === -1) {
      throw new Error('Paddock not found');
    }
    
    mockPaddocks.splice(index, 1);
  }

  async assignHorseToPaddock(paddockId: string, horseId: string, horseName: string, notes?: string): Promise<Paddock> {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const paddock = mockPaddocks.find(p => p.id === paddockId);
    if (!paddock) {
      throw new Error('Paddock not found');
    }
    
    if (paddock.currentOccupancy >= paddock.capacity) {
      throw new Error('Paddock is at full capacity');
    }
    
    const assignedHorse: AssignedHorse = {
      horseId,
      horseName,
      assignedAt: new Date(),
      notes
    };
    
    paddock.assignedHorses = paddock.assignedHorses || [];
    paddock.assignedHorses.push(assignedHorse);
    paddock.currentOccupancy = paddock.assignedHorses.length;
    paddock.updatedAt = new Date();
    
    return paddock;
  }

  async unassignHorseFromPaddock(paddockId: string, horseId: string): Promise<Paddock> {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const paddock = mockPaddocks.find(p => p.id === paddockId);
    if (!paddock) {
      throw new Error('Paddock not found');
    }
    
    paddock.assignedHorses = paddock.assignedHorses?.filter(h => h.horseId !== horseId) || [];
    paddock.currentOccupancy = paddock.assignedHorses.length;
    paddock.updatedAt = new Date();
    
    return paddock;
  }

  async getMaintenanceTasks(): Promise<MaintenanceTask[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockMaintenanceTasks;
  }

  async createMaintenanceTask(taskData: Omit<MaintenanceTask, 'id' | 'createdAt' | 'updatedAt' | 'tenantId'>): Promise<MaintenanceTask> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const newTask: MaintenanceTask = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
      tenantId: 'tenant-1'
    };
    
    mockMaintenanceTasks.push(newTask);
    return newTask;
  }

  async updateMaintenanceTask(id: string, updates: Partial<MaintenanceTask>): Promise<MaintenanceTask> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const index = mockMaintenanceTasks.findIndex(t => t.id === id);
    if (index === -1) {
      throw new Error('Maintenance task not found');
    }
    
    mockMaintenanceTasks[index] = {
      ...mockMaintenanceTasks[index],
      ...updates,
      updatedAt: new Date()
    };
    
    return mockMaintenanceTasks[index];
  }

  async getRotationPlans(): Promise<RotationPlan[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockRotationPlans;
  }

  async createRotationPlan(planData: Omit<RotationPlan, 'id' | 'createdAt' | 'updatedAt' | 'tenantId'>): Promise<RotationPlan> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const newPlan: RotationPlan = {
      ...planData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
      tenantId: 'tenant-1'
    };
    
    mockRotationPlans.push(newPlan);
    return newPlan;
  }
}

export const housingService = new HousingService();