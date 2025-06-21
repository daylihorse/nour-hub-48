
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { paddockService } from '@/services/paddocks/paddockService';
import { Paddock, PaddockAssignment, PaddockMaintenanceRecord } from '@/types/paddocks';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';

export const usePaddockService = () => {
  const { currentTenant } = useAuth();
  const queryClient = useQueryClient();
  const tenantId = currentTenant?.id;

  // Queries
  const usePaddocks = () => {
    return useQuery({
      queryKey: ['paddocks', tenantId],
      queryFn: () => paddockService.getAllPaddocks(tenantId!),
      enabled: !!tenantId,
    });
  };

  const usePaddockAssignments = (paddockId?: string) => {
    return useQuery({
      queryKey: ['paddock-assignments', tenantId, paddockId],
      queryFn: () => paddockService.getPaddockAssignments(tenantId!, paddockId),
      enabled: !!tenantId,
    });
  };

  const useMaintenanceRecords = (paddockId?: string) => {
    return useQuery({
      queryKey: ['paddock-maintenance', tenantId, paddockId],
      queryFn: () => paddockService.getMaintenanceRecords(tenantId!, paddockId),
      enabled: !!tenantId,
    });
  };

  // Mutations
  const createPaddockMutation = useMutation({
    mutationFn: (paddockData: Partial<Paddock>) =>
      paddockService.createPaddock(tenantId!, paddockData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['paddocks', tenantId] });
      toast({
        title: "Success",
        description: "Paddock created successfully",
      });
    },
    onError: (error) => {
      console.error('Error creating paddock:', error);
      toast({
        title: "Error",
        description: "Failed to create paddock",
        variant: "destructive",
      });
    },
  });

  const updatePaddockMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Paddock> }) =>
      paddockService.updatePaddock(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['paddocks', tenantId] });
      toast({
        title: "Success",
        description: "Paddock updated successfully",
      });
    },
    onError: (error) => {
      console.error('Error updating paddock:', error);
      toast({
        title: "Error",
        description: "Failed to update paddock",
        variant: "destructive",
      });
    },
  });

  const deletePaddockMutation = useMutation({
    mutationFn: (paddockId: string) => paddockService.deletePaddock(paddockId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['paddocks', tenantId] });
      toast({
        title: "Success",
        description: "Paddock deleted successfully",
      });
    },
    onError: (error) => {
      console.error('Error deleting paddock:', error);
      toast({
        title: "Error",
        description: "Failed to delete paddock",
        variant: "destructive",
      });
    },
  });

  const assignHorseMutation = useMutation({
    mutationFn: (assignment: Omit<PaddockAssignment, 'id' | 'createdAt' | 'updatedAt'>) =>
      paddockService.assignHorseToPaddock(tenantId!, assignment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['paddocks', tenantId] });
      queryClient.invalidateQueries({ queryKey: ['paddock-assignments', tenantId] });
      toast({
        title: "Success",
        description: "Horse assigned to paddock successfully",
      });
    },
    onError: (error) => {
      console.error('Error assigning horse:', error);
      toast({
        title: "Error",
        description: "Failed to assign horse to paddock",
        variant: "destructive",
      });
    },
  });

  const createMaintenanceMutation = useMutation({
    mutationFn: (maintenance: Omit<PaddockMaintenanceRecord, 'id' | 'createdAt'>) =>
      paddockService.createMaintenanceRecord(tenantId!, maintenance),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['paddock-maintenance', tenantId] });
      toast({
        title: "Success",
        description: "Maintenance record created successfully",
      });
    },
    onError: (error) => {
      console.error('Error creating maintenance record:', error);
      toast({
        title: "Error",
        description: "Failed to create maintenance record",
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
