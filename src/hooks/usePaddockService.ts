import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { paddockService } from '@/services/paddocks/paddockService';
import { Paddock, PaddockAssignment, PaddockMaintenanceRecord } from '@/types/paddocks';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';
import { debugTenantInfo } from '@/utils/tenantUtils';

export const usePaddockService = () => {
  const { currentTenant } = useAuth();
  const queryClient = useQueryClient();
  const tenantId = currentTenant?.id;

  // Debug tenant information
  debugTenantInfo('usePaddockService hook', currentTenant);

  // Queries
  const usePaddocks = () => {
    return useQuery({
      queryKey: ['paddocks', tenantId],
      queryFn: async () => {
        console.log('🔍 Query: Fetching paddocks for tenant:', tenantId);
        try {
          const result = await paddockService.getAllPaddocks(tenantId);
          console.log('✅ Query: Successfully fetched paddocks:', result.length);
          return result;
        } catch (error) {
          console.error('❌ Query: Error fetching paddocks:', error);
          throw error;
        }
      },
      enabled: !!tenantId,
      retry: (failureCount, error) => {
        console.log(`🔄 Query retry attempt ${failureCount} for paddocks:`, error);
        return failureCount < 2; // Only retry twice
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    });
  };

  const usePaddockAssignments = (paddockId?: string) => {
    return useQuery({
      queryKey: ['paddock-assignments', tenantId, paddockId],
      queryFn: async () => {
        console.log('🔍 Query: Fetching assignments for tenant:', tenantId, 'paddock:', paddockId);
        try {
          const result = await paddockService.getPaddockAssignments(tenantId, paddockId);
          console.log('✅ Query: Successfully fetched assignments:', result.length);
          return result;
        } catch (error) {
          console.error('❌ Query: Error fetching assignments:', error);
          throw error;
        }
      },
      enabled: !!tenantId,
      retry: (failureCount, error) => {
        console.log(`🔄 Query retry attempt ${failureCount} for assignments:`, error);
        return failureCount < 2;
      },
    });
  };

  const useMaintenanceRecords = (paddockId?: string) => {
    return useQuery({
      queryKey: ['paddock-maintenance', tenantId, paddockId],
      queryFn: async () => {
        console.log('🔍 Query: Fetching maintenance records for tenant:', tenantId, 'paddock:', paddockId);
        try {
          const result = await paddockService.getMaintenanceRecords(tenantId, paddockId);
          console.log('✅ Query: Successfully fetched maintenance records:', result.length);
          return result;
        } catch (error) {
          console.error('❌ Query: Error fetching maintenance records:', error);
          throw error;
        }
      },
      enabled: !!tenantId,
      retry: (failureCount, error) => {
        console.log(`🔄 Query retry attempt ${failureCount} for maintenance:`, error);
        return failureCount < 2;
      },
    });
  };

  // Mutations
  const createPaddockMutation = useMutation({
    mutationFn: async (paddockData: Partial<Paddock>) => {
      console.log('🔧 Mutation: Creating paddock for tenant:', tenantId, paddockData);
      try {
        const result = await paddockService.createPaddock(tenantId, paddockData);
        console.log('✅ Mutation: Successfully created paddock:', result.id);
        return result;
      } catch (error) {
        console.error('❌ Mutation: Error creating paddock:', error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['paddocks', tenantId] });
      toast({
        title: "Success",
        description: "Paddock created successfully",
      });
    },
    onError: (error: any) => {
      console.error('❌ Mutation error creating paddock:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to create paddock",
        variant: "destructive",
      });
    },
  });

  const updatePaddockMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Paddock> }) => {
      console.log('🔧 Mutation: Updating paddock:', id, data);
      try {
        const result = await paddockService.updatePaddock(id, data);
        console.log('✅ Mutation: Successfully updated paddock:', id);
        return result;
      } catch (error) {
        console.error('❌ Mutation: Error updating paddock:', error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['paddocks', tenantId] });
      toast({
        title: "Success",
        description: "Paddock updated successfully",
      });
    },
    onError: (error: any) => {
      console.error('❌ Mutation error updating paddock:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to update paddock",
        variant: "destructive",
      });
    },
  });

  const deletePaddockMutation = useMutation({
    mutationFn: async (paddockId: string) => {
      console.log('🔧 Mutation: Deleting paddock:', paddockId);
      try {
        await paddockService.deletePaddock(paddockId);
        console.log('✅ Mutation: Successfully deleted paddock:', paddockId);
      } catch (error) {
        console.error('❌ Mutation: Error deleting paddock:', error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['paddocks', tenantId] });
      toast({
        title: "Success",
        description: "Paddock deleted successfully",
      });
    },
    onError: (error: any) => {
      console.error('❌ Mutation error deleting paddock:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to delete paddock",
        variant: "destructive",
      });
    },
  });

  const assignHorseMutation = useMutation({
    mutationFn: async (assignment: Omit<PaddockAssignment, 'id' | 'createdAt' | 'updatedAt'>) => {
      console.log('🔧 Mutation: Assigning horse for tenant:', tenantId, assignment);
      try {
        const result = await paddockService.assignHorseToPaddock(tenantId, assignment);
        console.log('✅ Mutation: Successfully assigned horse:', result.id);
        return result;
      } catch (error) {
        console.error('❌ Mutation: Error assigning horse:', error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['paddocks', tenantId] });
      queryClient.invalidateQueries({ queryKey: ['paddock-assignments', tenantId] });
      toast({
        title: "Success",
        description: "Horse assigned to paddock successfully",
      });
    },
    onError: (error: any) => {
      console.error('❌ Mutation error assigning horse:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to assign horse to paddock",
        variant: "destructive",
      });
    },
  });

  const createMaintenanceMutation = useMutation({
    mutationFn: async (maintenance: Omit<PaddockMaintenanceRecord, 'id' | 'createdAt'>) => {
      console.log('🔧 Mutation: Creating maintenance record for tenant:', tenantId, maintenance);
      try {
        const result = await paddockService.createMaintenanceRecord(tenantId, maintenance);
        console.log('✅ Mutation: Successfully created maintenance record:', result.id);
        return result;
      } catch (error) {
        console.error('❌ Mutation: Error creating maintenance record:', error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['paddock-maintenance', tenantId] });
      toast({
        title: "Success",
        description: "Maintenance record created successfully",
      });
    },
    onError: (error: any) => {
      console.error('❌ Mutation error creating maintenance:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to create maintenance record",
        variant: "destructive",
      });
    },
  });

  return {
    // Queries
    usePaddocks,
    usePaddockAssignments,
    useMaintenanceRecords,
    
    // Mutations
    createPaddock: createPaddockMutation.mutate,
    updatePaddock: updatePaddockMutation.mutate,
    deletePaddock: deletePaddockMutation.mutate,
    assignHorse: assignHorseMutation.mutate,
    createMaintenance: createMaintenanceMutation.mutate,
    
    // Loading states
    isCreatingPaddock: createPaddockMutation.isPending,
    isUpdatingPaddock: updatePaddockMutation.isPending,
    isDeletingPaddock: deletePaddockMutation.isPending,
    isAssigningHorse: assignHorseMutation.isPending,
    isCreatingMaintenance: createMaintenanceMutation.isPending,
  };
};
