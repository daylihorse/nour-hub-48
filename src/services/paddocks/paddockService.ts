
import { supabase } from '@/integrations/supabase/client';
import { Paddock, PaddockAssignment, PaddockMaintenanceRecord, PaddockRotationPlan, HorseGroup } from '@/types/paddocks';
import { validateTenantId, resolveTenantId } from '@/utils/tenantUtils';

export interface DatabasePaddock {
  id: string;
  tenant_id: string;
  name: string;
  paddock_number: string;
  status: string;
  paddock_type: string;
  size_length: number | null;
  size_width: number | null;
  size_unit: string | null;
  capacity: number;
  current_occupancy: number;
  location_section: string | null;
  location_coordinates: any;
  features: any;
  created_at: string;
  updated_at: string;
  created_by: string | null;
}

export interface DatabasePaddockAssignment {
  id: string;
  tenant_id: string;
  paddock_id: string;
  horse_id: string;
  horse_name: string;
  assigned_date: string;
  scheduled_end_date: string | null;
  actual_end_date: string | null;
  assignment_type: string | null;
  status: string;
  assigned_by: string;
  notes: string | null;
  reason: string | null;
  created_at: string;
  updated_at: string;
}

export interface DatabasePaddockMaintenance {
  id: string;
  tenant_id: string;
  paddock_id: string;
  maintenance_type: string;
  title: string;
  description: string;
  scheduled_date: string;
  completed_date: string | null;
  status: string;
  assigned_to: string | null;
  cost: number | null;
  notes: string | null;
  next_maintenance_date: string | null;
  created_at: string;
  updated_at: string;
  created_by: string | null;
}

class PaddockService {
  private mapDatabasePaddockToType(dbPaddock: DatabasePaddock): Paddock {
    return {
      id: dbPaddock.id,
      name: dbPaddock.name,
      number: dbPaddock.paddock_number,
      status: dbPaddock.status as any,
      type: dbPaddock.paddock_type as any,
      size: {
        length: dbPaddock.size_length || 0,
        width: dbPaddock.size_width || 0,
        unit: dbPaddock.size_unit || 'meters'
      },
      capacity: dbPaddock.capacity,
      currentOccupancy: dbPaddock.current_occupancy,
      location: {
        section: dbPaddock.location_section || '',
        coordinates: dbPaddock.location_coordinates
      },
      features: Array.isArray(dbPaddock.features) ? dbPaddock.features : [],
      assignedHorses: [],
      createdAt: new Date(dbPaddock.created_at),
      updatedAt: new Date(dbPaddock.updated_at)
    };
  }

  private mapDatabaseAssignmentToType(dbAssignment: DatabasePaddockAssignment): PaddockAssignment {
    return {
      id: dbAssignment.id,
      paddockId: dbAssignment.paddock_id,
      horseId: dbAssignment.horse_id,
      horseName: dbAssignment.horse_name,
      assignedDate: new Date(dbAssignment.assigned_date),
      scheduledEndDate: dbAssignment.scheduled_end_date ? new Date(dbAssignment.scheduled_end_date) : undefined,
      actualEndDate: dbAssignment.actual_end_date ? new Date(dbAssignment.actual_end_date) : undefined,
      assignmentType: dbAssignment.assignment_type || undefined,
      status: dbAssignment.status as any,
      assignedBy: dbAssignment.assigned_by,
      notes: dbAssignment.notes || undefined,
      reason: dbAssignment.reason || undefined,
      createdAt: new Date(dbAssignment.created_at),
      updatedAt: new Date(dbAssignment.updated_at)
    };
  }

  async getAllPaddocks(tenantId: string | null | undefined): Promise<Paddock[]> {
    const validTenantId = validateTenantId(tenantId);
    
    if (!validTenantId) {
      console.error('Cannot fetch paddocks: invalid tenant ID');
      throw new Error('Invalid tenant ID provided');
    }

    console.log('Fetching paddocks for tenant:', validTenantId);

    try {
      const { data: paddocksData, error: paddocksError } = await supabase
        .from('paddocks')
        .select('*')
        .eq('tenant_id', validTenantId)
        .order('name');

      if (paddocksError) {
        console.error('Error fetching paddocks:', paddocksError);
        throw new Error(`Failed to fetch paddocks: ${paddocksError.message}`);
      }

      const { data: assignmentsData } = await supabase
        .from('paddock_assignments')
        .select('*')
        .eq('tenant_id', validTenantId)
        .eq('status', 'active');

      const paddocks = paddocksData.map(paddock => {
        const mapped = this.mapDatabasePaddockToType(paddock);
        
        // Add assigned horses
        const assignments = assignmentsData?.filter(a => a.paddock_id === paddock.id) || [];
        mapped.assignedHorses = assignments.map(assignment => ({
          horseId: assignment.horse_id,
          horseName: assignment.horse_name,
          assignedDate: new Date(assignment.assigned_date)
        }));

        return mapped;
      });

      console.log(`Successfully fetched ${paddocks.length} paddocks`);
      return paddocks;
    } catch (error) {
      console.error('Database error while fetching paddocks:', error);
      throw error;
    }
  }

  async createPaddock(tenantId: string | null | undefined, paddockData: Partial<Paddock>): Promise<Paddock> {
    const validTenantId = validateTenantId(tenantId);
    
    if (!validTenantId) {
      console.error('Cannot create paddock: invalid tenant ID');
      throw new Error('Invalid tenant ID provided');
    }

    if (!paddockData.name || !paddockData.number) {
      throw new Error('Paddock name and number are required');
    }

    console.log('Creating paddock for tenant:', validTenantId, paddockData);

    try {
      const { data, error } = await supabase
        .from('paddocks')
        .insert({
          tenant_id: validTenantId,
          name: paddockData.name,
          paddock_number: paddockData.number,
          status: paddockData.status || 'available',
          paddock_type: paddockData.type || 'grazing',
          size_length: paddockData.size?.length || null,
          size_width: paddockData.size?.width || null,
          size_unit: paddockData.size?.unit || 'meters',
          capacity: paddockData.capacity || 1,
          current_occupancy: paddockData.currentOccupancy || 0,
          location_section: paddockData.location?.section || null,
          location_coordinates: paddockData.location?.coordinates || null,
          features: paddockData.features || []
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating paddock:', error);
        throw new Error(`Failed to create paddock: ${error.message}`);
      }

      console.log('Successfully created paddock:', data.id);
      return this.mapDatabasePaddockToType(data);
    } catch (error) {
      console.error('Database error while creating paddock:', error);
      throw error;
    }
  }

  async updatePaddock(paddockId: string, paddockData: Partial<Paddock>): Promise<Paddock> {
    if (!paddockId) {
      throw new Error('Paddock ID is required');
    }

    console.log('Updating paddock:', paddockId, paddockData);

    try {
      const { data, error } = await supabase
        .from('paddocks')
        .update({
          name: paddockData.name,
          paddock_number: paddockData.number,
          status: paddockData.status,
          paddock_type: paddockData.type,
          size_length: paddockData.size?.length,
          size_width: paddockData.size?.width,
          size_unit: paddockData.size?.unit,
          capacity: paddockData.capacity,
          current_occupancy: paddockData.currentOccupancy,
          location_section: paddockData.location?.section,
          location_coordinates: paddockData.location?.coordinates,
          features: paddockData.features
        })
        .eq('id', paddockId)
        .select()
        .single();

      if (error) {
        console.error('Error updating paddock:', error);
        throw new Error(`Failed to update paddock: ${error.message}`);
      }

      console.log('Successfully updated paddock:', paddockId);
      return this.mapDatabasePaddockToType(data);
    } catch (error) {
      console.error('Database error while updating paddock:', error);
      throw error;
    }
  }

  async deletePaddock(paddockId: string): Promise<void> {
    if (!paddockId) {
      throw new Error('Paddock ID is required');
    }

    console.log('Deleting paddock:', paddockId);

    try {
      const { error } = await supabase
        .from('paddocks')
        .delete()
        .eq('id', paddockId);

      if (error) {
        console.error('Error deleting paddock:', error);
        throw new Error(`Failed to delete paddock: ${error.message}`);
      }

      console.log('Successfully deleted paddock:', paddockId);
    } catch (error) {
      console.error('Database error while deleting paddock:', error);
      throw error;
    }
  }

  async assignHorseToPaddock(tenantId: string | null | undefined, assignment: Omit<PaddockAssignment, 'id' | 'createdAt' | 'updatedAt'>): Promise<PaddockAssignment> {
    const validTenantId = validateTenantId(tenantId);
    
    if (!validTenantId) {
      console.error('Cannot assign horse: invalid tenant ID');
      throw new Error('Invalid tenant ID provided');
    }

    if (!assignment.paddockId || !assignment.horseId || !assignment.assignedBy) {
      throw new Error('Paddock ID, Horse ID, and Assigned By are required');
    }

    console.log('Assigning horse to paddock for tenant:', validTenantId, assignment);

    try {
      const { data, error } = await supabase
        .from('paddock_assignments')
        .insert({
          tenant_id: validTenantId,
          paddock_id: assignment.paddockId,
          horse_id: assignment.horseId,
          horse_name: assignment.horseName,
          assigned_date: assignment.assignedDate.toISOString().split('T')[0],
          scheduled_end_date: assignment.scheduledEndDate?.toISOString().split('T')[0],
          assignment_type: assignment.assignmentType,
          status: assignment.status,
          assigned_by: assignment.assignedBy,
          notes: assignment.notes,
          reason: assignment.reason
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating assignment:', error);
        throw new Error(`Failed to assign horse: ${error.message}`);
      }

      // Update paddock occupancy
      await this.updatePaddockOccupancy(assignment.paddockId);

      console.log('Successfully assigned horse to paddock:', data.id);
      return this.mapDatabaseAssignmentToType(data);
    } catch (error) {
      console.error('Database error while assigning horse:', error);
      throw error;
    }
  }

  async getPaddockAssignments(tenantId: string | null | undefined, paddockId?: string): Promise<PaddockAssignment[]> {
    const validTenantId = validateTenantId(tenantId);
    
    if (!validTenantId) {
      console.error('Cannot fetch assignments: invalid tenant ID');
      throw new Error('Invalid tenant ID provided');
    }

    console.log('Fetching assignments for tenant:', validTenantId, paddockId ? `paddock: ${paddockId}` : 'all paddocks');

    try {
      let query = supabase
        .from('paddock_assignments')
        .select('*')
        .eq('tenant_id', validTenantId);

      if (paddockId) {
        query = query.eq('paddock_id', paddockId);
      }

      const { data, error } = await query.order('assigned_date', { ascending: false });

      if (error) {
        console.error('Error fetching assignments:', error);
        throw new Error(`Failed to fetch assignments: ${error.message}`);
      }

      console.log(`Successfully fetched ${data.length} assignments`);
      return data.map(this.mapDatabaseAssignmentToType);
    } catch (error) {
      console.error('Database error while fetching assignments:', error);
      throw error;
    }
  }

  private async updatePaddockOccupancy(paddockId: string): Promise<void> {
    if (!paddockId) {
      console.warn('Cannot update occupancy: paddock ID is missing');
      return;
    }

    try {
      // Count active assignments for this paddock
      const { count } = await supabase
        .from('paddock_assignments')
        .select('*', { count: 'exact', head: true })
        .eq('paddock_id', paddockId)
        .eq('status', 'active');

      // Update paddock current_occupancy
      const { error } = await supabase
        .from('paddocks')
        .update({ current_occupancy: count || 0 })
        .eq('id', paddockId);

      if (error) {
        console.error('Error updating paddock occupancy:', error);
        throw error;
      }

      console.log(`Updated paddock ${paddockId} occupancy to ${count || 0}`);
    } catch (error) {
      console.error('Error updating paddock occupancy:', error);
    }
  }

  async createMaintenanceRecord(tenantId: string | null | undefined, maintenance: Omit<PaddockMaintenanceRecord, 'id' | 'createdAt'>): Promise<PaddockMaintenanceRecord> {
    const validTenantId = validateTenantId(tenantId);
    
    if (!validTenantId) {
      console.error('Cannot create maintenance record: invalid tenant ID');
      throw new Error('Invalid tenant ID provided');
    }

    if (!maintenance.paddockId || !maintenance.description) {
      throw new Error('Paddock ID and description are required');
    }

    console.log('Creating maintenance record for tenant:', validTenantId, maintenance);

    try {
      const { data, error } = await supabase
        .from('paddock_maintenance')
        .insert({
          tenant_id: validTenantId,
          paddock_id: maintenance.paddockId,
          maintenance_type: maintenance.type,
          title: maintenance.description, // Using description as title for now
          description: maintenance.description,
          scheduled_date: maintenance.scheduledDate.toISOString().split('T')[0],
          completed_date: maintenance.completedDate?.toISOString().split('T')[0],
          status: maintenance.status,
          assigned_to: maintenance.assignedTo,
          cost: maintenance.cost,
          notes: maintenance.notes,
          next_maintenance_date: maintenance.nextMaintenanceDate?.toISOString().split('T')[0]
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating maintenance record:', error);
        throw new Error(`Failed to create maintenance record: ${error.message}`);
      }

      console.log('Successfully created maintenance record:', data.id);
      return {
        id: data.id,
        paddockId: data.paddock_id,
        type: data.maintenance_type as any,
        description: data.description,
        scheduledDate: new Date(data.scheduled_date),
        completedDate: data.completed_date ? new Date(data.completed_date) : undefined,
        status: data.status as any,
        assignedTo: data.assigned_to || undefined,
        cost: data.cost || undefined,
        notes: data.notes || undefined,
        nextMaintenanceDate: data.next_maintenance_date ? new Date(data.next_maintenance_date) : undefined,
        createdAt: new Date(data.created_at)
      };
    } catch (error) {
      console.error('Database error while creating maintenance record:', error);
      throw error;
    }
  }

  async getMaintenanceRecords(tenantId: string | null | undefined, paddockId?: string): Promise<PaddockMaintenanceRecord[]> {
    const validTenantId = validateTenantId(tenantId);
    
    if (!validTenantId) {
      console.error('Cannot fetch maintenance records: invalid tenant ID');
      throw new Error('Invalid tenant ID provided');
    }

    console.log('Fetching maintenance records for tenant:', validTenantId, paddockId ? `paddock: ${paddockId}` : 'all paddocks');

    try {
      let query = supabase
        .from('paddock_maintenance')
        .select('*')
        .eq('tenant_id', validTenantId);

      if (paddockId) {
        query = query.eq('paddock_id', paddockId);
      }

      const { data, error } = await query.order('scheduled_date', { ascending: false });

      if (error) {
        console.error('Error fetching maintenance records:', error);
        throw new Error(`Failed to fetch maintenance records: ${error.message}`);
      }

      console.log(`Successfully fetched ${data.length} maintenance records`);
      return data.map(record => ({
        id: record.id,
        paddockId: record.paddock_id,
        type: record.maintenance_type as any,
        description: record.description,
        scheduledDate: new Date(record.scheduled_date),
        completedDate: record.completed_date ? new Date(record.completed_date) : undefined,
        status: record.status as any,
        assignedTo: record.assigned_to || undefined,
        cost: record.cost || undefined,
        notes: record.notes || undefined,
        nextMaintenanceDate: record.next_maintenance_date ? new Date(record.next_maintenance_date) : undefined,
        createdAt: new Date(record.created_at)
      }));
    } catch (error) {
      console.error('Database error while fetching maintenance records:', error);
      throw error;
    }
  }
}

export const paddockService = new PaddockService();
