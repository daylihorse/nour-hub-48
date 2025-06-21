import { Paddock, PaddockAssignment, PaddockMaintenanceRecord } from '@/types/paddocks';
import { validateTenantId, debugTenantInfo } from '@/utils/tenantUtils';

// Mock data service for demonstration - in production this would connect to your database
class PaddockService {
  private mockPaddocks: Paddock[] = [
    {
      id: 'p1',
      tenantId: '550e8400-e29b-41d4-a716-446655440001',
      name: 'North Pasture',
      number: 'P001',
      type: 'grazing',
      status: 'available',
      size: { length: 100, width: 50, unit: 'meters' },
      capacity: 4,
      currentOccupancy: 2,
      location: { section: 'North Field', coordinates: { lat: 0, lng: 0 } },
      features: ['water_trough', 'shelter', 'gate_access'],
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-15')
    },
    {
      id: 'p2', 
      tenantId: '550e8400-e29b-41d4-a716-446655440001',
      name: 'South Pasture',
      number: 'P002',
      type: 'exercise',
      status: 'occupied',
      size: { length: 80, width: 40, unit: 'meters' },
      capacity: 3,
      currentOccupancy: 3,
      location: { section: 'South Field', coordinates: { lat: 0, lng: 0 } },
      features: ['water_trough', 'lighting'],
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-10')
    },
    {
      id: 'p3',
      tenantId: '550e8400-e29b-41d4-a716-446655440001', 
      name: 'East Training Area',
      number: 'P003',
      type: 'exercise',
      status: 'maintenance',
      size: { length: 60, width: 30, unit: 'meters' },
      capacity: 2,
      currentOccupancy: 0,
      location: { section: 'East Side', coordinates: { lat: 0, lng: 0 } },
      features: ['shelter', 'gate_access'],
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-20')
    }
  ];

  private mockAssignments: PaddockAssignment[] = [
    {
      id: 'a1',
      paddockId: 'p1',
      horseId: 'h1',
      horseName: 'Thunder',
      assignedDate: new Date('2024-01-10'),
      assignmentType: 'grazing',
      status: 'active',
      assignedBy: 'user1',
      reason: 'Regular grazing rotation'
    },
    {
      id: 'a2',
      paddockId: 'p2',
      horseId: 'h2', 
      horseName: 'Lightning',
      assignedDate: new Date('2024-01-12'),
      assignmentType: 'exercise',
      status: 'active',
      assignedBy: 'user1',
      reason: 'Daily exercise routine'
    }
  ];

  private mockMaintenanceRecords: PaddockMaintenanceRecord[] = [
    {
      id: 'm1',
      paddockId: 'p3',
      type: 'fence_repair',
      title: 'Fence Post Replacement',
      description: 'Replace damaged fence posts on east side',
      status: 'in_progress',
      scheduledDate: new Date('2024-01-25'),
      assignedTo: 'maintenance-team',
      createdAt: new Date('2024-01-20')
    }
  ];

  async getAllPaddocks(tenantId?: string | null): Promise<Paddock[]> {
    console.group('🏇 PaddockService.getAllPaddocks');
    console.log('Input tenant ID:', tenantId);
    
    const validTenantId = validateTenantId(tenantId);
    
    if (!validTenantId) {
      console.error('❌ Invalid tenant ID, returning empty array');
      console.groupEnd();
      return [];
    }

    // Filter paddocks by tenant ID
    const filteredPaddocks = this.mockPaddocks.filter(paddock => {
      const matches = paddock.tenantId === validTenantId;
      console.log(`Paddock ${paddock.name} (${paddock.tenantId}) matches tenant ${validTenantId}: ${matches}`);
      return matches;
    });

    console.log(`✓ Found ${filteredPaddocks.length} paddocks for tenant ${validTenantId}`);
    console.groupEnd();
    
    return filteredPaddocks;
  }

  async getPaddockAssignments(tenantId?: string | null, paddockId?: string): Promise<PaddockAssignment[]> {
    console.group('🏇 PaddockService.getPaddockAssignments');
    console.log('Input tenant ID:', tenantId);
    console.log('Paddock ID filter:', paddockId);
    
    const validTenantId = validateTenantId(tenantId);
    
    if (!validTenantId) {
      console.error('❌ Invalid tenant ID, returning empty array');
      console.groupEnd();
      return [];
    }

    // Get paddocks for this tenant first
    const tenantPaddocks = await this.getAllPaddocks(validTenantId);
    const tenantPaddockIds = tenantPaddocks.map(p => p.id);

    // Filter assignments by tenant's paddocks
    let filteredAssignments = this.mockAssignments.filter(assignment => {
      return tenantPaddockIds.includes(assignment.paddockId);
    });

    // Further filter by specific paddock if provided
    if (paddockId) {
      filteredAssignments = filteredAssignments.filter(assignment => 
        assignment.paddockId === paddockId
      );
    }

    console.log(`✓ Found ${filteredAssignments.length} assignments for tenant ${validTenantId}`);
    console.groupEnd();
    
    return filteredAssignments;
  }

  async getMaintenanceRecords(tenantId?: string | null, paddockId?: string): Promise<PaddockMaintenanceRecord[]> {
    console.group('🏇 PaddockService.getMaintenanceRecords');
    console.log('Input tenant ID:', tenantId);
    console.log('Paddock ID filter:', paddockId);
    
    const validTenantId = validateTenantId(tenantId);
    
    if (!validTenantId) {
      console.error('❌ Invalid tenant ID, returning empty array');
      console.groupEnd();
      return [];
    }

    // Get paddocks for this tenant first
    const tenantPaddocks = await this.getAllPaddocks(validTenantId);
    const tenantPaddockIds = tenantPaddocks.map(p => p.id);

    // Filter maintenance records by tenant's paddocks
    let filteredRecords = this.mockMaintenanceRecords.filter(record => {
      return tenantPaddockIds.includes(record.paddockId);
    });

    // Further filter by specific paddock if provided
    if (paddockId) {
      filteredRecords = filteredRecords.filter(record => 
        record.paddockId === paddockId
      );
    }

    console.log(`✓ Found ${filteredRecords.length} maintenance records for tenant ${validTenantId}`);
    console.groupEnd();
    
    return filteredRecords;
  }

  async createPaddock(tenantId?: string | null, paddockData?: Partial<Paddock>): Promise<Paddock> {
    const validTenantId = validateTenantId(tenantId);
    if (!validTenantId) {
      throw new Error('Invalid tenant ID provided');
    }

    const newPaddock: Paddock = {
      id: `p${Date.now()}`,
      tenantId: validTenantId,
      name: paddockData?.name || 'New Paddock',
      number: paddockData?.number || `P${String(this.mockPaddocks.length + 1).padStart(3, '0')}`,
      type: paddockData?.type || 'grazing',
      status: paddockData?.status || 'available',
      size: paddockData?.size || { length: 50, width: 50, unit: 'meters' },
      capacity: paddockData?.capacity || 1,
      currentOccupancy: paddockData?.currentOccupancy || 0,
      location: paddockData?.location || { section: 'Main Area' },
      features: paddockData?.features || [],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.mockPaddocks.push(newPaddock);
    console.log(`✓ Created paddock ${newPaddock.name} for tenant ${validTenantId}`);
    return newPaddock;
  }

  async updatePaddock(paddockId: string, paddockData: Partial<Paddock>): Promise<Paddock> {
    const index = this.mockPaddocks.findIndex(p => p.id === paddockId);
    if (index === -1) {
      throw new Error('Paddock not found');
    }

    this.mockPaddocks[index] = {
      ...this.mockPaddocks[index],
      ...paddockData,
      updatedAt: new Date()
    };

    console.log(`✓ Updated paddock ${paddockId}`);
    return this.mockPaddocks[index];
  }

  async deletePaddock(paddockId: string): Promise<void> {
    const index = this.mockPaddocks.findIndex(p => p.id === paddockId);
    if (index === -1) {
      throw new Error('Paddock not found');
    }

    this.mockPaddocks.splice(index, 1);
    console.log(`✓ Deleted paddock ${paddockId}`);
  }

  async assignHorseToPaddock(tenantId?: string | null, assignment?: Omit<PaddockAssignment, 'id' | 'createdAt' | 'updatedAt'>): Promise<PaddockAssignment> {
    const validTenantId = validateTenantId(tenantId);
    if (!validTenantId) {
      throw new Error('Invalid tenant ID provided');
    }

    if (!assignment) {
      throw new Error('Assignment data is required');
    }

    const newAssignment: PaddockAssignment = {
      ...assignment,
      id: `a${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.mockAssignments.push(newAssignment);
    console.log(`✓ Assigned horse ${assignment.horseName} to paddock for tenant ${validTenantId}`);
    return newAssignment;
  }

  async createMaintenanceRecord(tenantId?: string | null, maintenance?: Omit<PaddockMaintenanceRecord, 'id' | 'createdAt'>): Promise<PaddockMaintenanceRecord> {
    const validTenantId = validateTenantId(tenantId);
    if (!validTenantId) {
      throw new Error('Invalid tenant ID provided');
    }

    if (!maintenance) {
      throw new Error('Maintenance data is required');
    }

    const newRecord: PaddockMaintenanceRecord = {
      ...maintenance,
      id: `m${Date.now()}`,
      createdAt: new Date()
    };

    this.mockMaintenanceRecords.push(newRecord);
    console.log(`✓ Created maintenance record for tenant ${validTenantId}`);
    return newRecord;
  }
}

export const paddockService = new PaddockService();
