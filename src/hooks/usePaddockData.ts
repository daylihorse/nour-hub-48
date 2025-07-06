import { useState, useEffect, useMemo } from 'react';
import { Paddock, PaddockFilters, PaddockStats, MaintenanceTask, RotationPlan } from '@/types/paddocks';
import { housingService } from '@/services/housing';
import { useToast } from '@/hooks/use-toast';

export const usePaddockData = () => {
  const [paddocks, setPaddocks] = useState<Paddock[]>([]);
  const [maintenanceTasks, setMaintenanceTasks] = useState<MaintenanceTask[]>([]);
  const [rotationPlans, setRotationPlans] = useState<RotationPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadPaddockData();
  }, []);

  const loadPaddockData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [paddockData, maintenanceData, rotationData] = await Promise.all([
        housingService.getAllPaddocks(),
        housingService.getMaintenanceTasks(),
        housingService.getRotationPlans()
      ]);
      
      setPaddocks(paddockData);
      setMaintenanceTasks(maintenanceData);
      setRotationPlans(rotationData);
    } catch (err) {
      setError('Failed to load paddock data');
      toast({
        title: "Error",
        description: "Failed to load paddock data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addPaddock = async (paddockData: Omit<Paddock, 'id' | 'createdAt' | 'updatedAt' | 'tenantId'>) => {
    try {
      const newPaddock = await housingService.createPaddock(paddockData);
      setPaddocks(prev => [...prev, newPaddock]);
      toast({
        title: "Success",
        description: "Paddock created successfully",
      });
      return newPaddock;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create paddock",
        variant: "destructive",
      });
      throw error;
    }
  };

  const updatePaddock = async (id: string, updates: Partial<Paddock>) => {
    try {
      const updatedPaddock = await housingService.updatePaddock(id, updates);
      setPaddocks(prev => prev.map(p => p.id === id ? updatedPaddock : p));
      toast({
        title: "Success",
        description: "Paddock updated successfully",
      });
      return updatedPaddock;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update paddock",
        variant: "destructive",
      });
      throw error;
    }
  };

  const deletePaddock = async (id: string) => {
    try {
      await housingService.deletePaddock(id);
      setPaddocks(prev => prev.filter(p => p.id !== id));
      toast({
        title: "Success",
        description: "Paddock deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete paddock",
        variant: "destructive",
      });
      throw error;
    }
  };

  const assignHorse = async (paddockId: string, horseId: string, horseName: string, notes?: string) => {
    try {
      const updatedPaddock = await housingService.assignHorseToPaddock(paddockId, horseId, horseName, notes);
      setPaddocks(prev => prev.map(p => p.id === paddockId ? updatedPaddock : p));
      toast({
        title: "Success",
        description: "Horse assigned to paddock successfully",
      });
      return updatedPaddock;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to assign horse to paddock",
        variant: "destructive",
      });
      throw error;
    }
  };

  const unassignHorse = async (paddockId: string, horseId: string) => {
    try {
      const updatedPaddock = await housingService.unassignHorseFromPaddock(paddockId, horseId);
      setPaddocks(prev => prev.map(p => p.id === paddockId ? updatedPaddock : p));
      toast({
        title: "Success",
        description: "Horse unassigned from paddock successfully",
      });
      return updatedPaddock;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to unassign horse from paddock",
        variant: "destructive",
      });
      throw error;
    }
  };

  const getFilteredPaddocks = (filters: PaddockFilters) => {
    return paddocks.filter(paddock => {
      if (filters.status && paddock.status !== filters.status) return false;
      if (filters.type && paddock.type !== filters.type) return false;
      if (filters.section && paddock.location.section !== filters.section) return false;
      if (filters.availability) {
        if (filters.availability === 'available' && paddock.currentOccupancy >= paddock.capacity) return false;
        if (filters.availability === 'occupied' && paddock.currentOccupancy === 0) return false;
      }
      return true;
    });
  };

  const stats: PaddockStats = useMemo(() => {
    const totalPaddocks = paddocks.length;
    const availablePaddocks = paddocks.filter(p => p.currentOccupancy < p.capacity && p.status === 'available').length;
    const occupiedPaddocks = paddocks.filter(p => p.currentOccupancy > 0).length;
    const maintenancePaddocks = paddocks.filter(p => p.status === 'maintenance').length;
    const totalCapacity = paddocks.reduce((sum, p) => sum + p.capacity, 0);
    const currentOccupancy = paddocks.reduce((sum, p) => sum + p.currentOccupancy, 0);
    const utilizationRate = totalCapacity > 0 ? (currentOccupancy / totalCapacity) * 100 : 0;
    const upcomingMaintenance = maintenanceTasks.filter(t => 
      t.status === 'scheduled' && 
      new Date(t.scheduledDate) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    ).length;

    return {
      totalPaddocks,
      availablePaddocks,
      occupiedPaddocks,
      maintenancePaddocks,
      totalCapacity,
      currentOccupancy,
      utilizationRate,
      upcomingMaintenance
    };
  }, [paddocks, maintenanceTasks]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-500 text-white';
      case 'occupied':
        return 'bg-blue-500 text-white';
      case 'maintenance':
        return 'bg-yellow-500 text-white';
      case 'reserved':
        return 'bg-purple-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'pasture':
        return 'text-green-700 bg-green-100';
      case 'exercise':
        return 'text-blue-700 bg-blue-100';
      case 'quarantine':
        return 'text-red-700 bg-red-100';
      case 'breeding':
        return 'text-purple-700 bg-purple-100';
      case 'training':
        return 'text-orange-700 bg-orange-100';
      default:
        return 'text-gray-700 bg-gray-100';
    }
  };

  return {
    paddocks,
    maintenanceTasks,
    rotationPlans,
    loading,
    error,
    stats,
    addPaddock,
    updatePaddock,
    deletePaddock,
    assignHorse,
    unassignHorse,
    getFilteredPaddocks,
    getStatusColor,
    getTypeColor,
    refreshData: loadPaddockData
  };
};