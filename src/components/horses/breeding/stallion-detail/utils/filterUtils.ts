
import { StallionDetailFilters, CollectedSemen, FrozenSemenInventory, FrozenEmbryoInventory, BreedingRecord } from '@/types/breeding/stallion-detail';

export const filterCollectedSemen = (item: CollectedSemen, filters: StallionDetailFilters): boolean => {
  if (filters.searchTerm && 
      !item.id.toLowerCase().includes(filters.searchTerm.toLowerCase()) &&
      !item.technician.toLowerCase().includes(filters.searchTerm.toLowerCase())) {
    return false;
  }
  
  if (filters.status?.length && !filters.status.includes(item.status)) {
    return false;
  }
  
  if (filters.quality?.length && !filters.quality.includes(item.quality)) {
    return false;
  }
  
  if (filters.technician?.length && !filters.technician.includes(item.technician)) {
    return false;
  }
  
  if (filters.dateRange) {
    const itemDate = new Date(item.collectionDate);
    const startDate = new Date(filters.dateRange.start);
    const endDate = new Date(filters.dateRange.end);
    if (itemDate < startDate || itemDate > endDate) {
      return false;
    }
  }
  
  return true;
};

export const filterFrozenSemen = (item: FrozenSemenInventory, filters: StallionDetailFilters): boolean => {
  if (filters.searchTerm && 
      !item.id.toLowerCase().includes(filters.searchTerm.toLowerCase()) &&
      !item.tank.toLowerCase().includes(filters.searchTerm.toLowerCase()) &&
      !item.location.toLowerCase().includes(filters.searchTerm.toLowerCase())) {
    return false;
  }
  
  if (filters.quality?.length && !filters.quality.includes(item.quality)) {
    return false;
  }
  
  if (filters.dateRange) {
    const itemDate = new Date(item.freezeDate);
    const startDate = new Date(filters.dateRange.start);
    const endDate = new Date(filters.dateRange.end);
    if (itemDate < startDate || itemDate > endDate) {
      return false;
    }
  }
  
  return true;
};

export const filterFrozenEmbryo = (item: FrozenEmbryoInventory, filters: StallionDetailFilters): boolean => {
  if (filters.searchTerm && 
      !item.id.toLowerCase().includes(filters.searchTerm.toLowerCase()) &&
      !item.mareName.toLowerCase().includes(filters.searchTerm.toLowerCase()) &&
      !item.tank.toLowerCase().includes(filters.searchTerm.toLowerCase())) {
    return false;
  }
  
  if (filters.quality?.length && !filters.quality.includes(item.grade)) {
    return false;
  }
  
  if (filters.dateRange) {
    const itemDate = new Date(item.creationDate);
    const startDate = new Date(filters.dateRange.start);
    const endDate = new Date(filters.dateRange.end);
    if (itemDate < startDate || itemDate > endDate) {
      return false;
    }
  }
  
  return true;
};

export const filterBreedingRecord = (item: BreedingRecord, filters: StallionDetailFilters): boolean => {
  if (filters.searchTerm && 
      !item.id.toLowerCase().includes(filters.searchTerm.toLowerCase()) &&
      !item.mareName.toLowerCase().includes(filters.searchTerm.toLowerCase()) &&
      !item.mareOwner.toLowerCase().includes(filters.searchTerm.toLowerCase()) &&
      !item.veterinarian.toLowerCase().includes(filters.searchTerm.toLowerCase())) {
    return false;
  }
  
  if (filters.status?.length && !filters.status.includes(item.status)) {
    return false;
  }
  
  if (filters.method?.length && !filters.method.includes(item.method)) {
    return false;
  }
  
  if (filters.dateRange) {
    const itemDate = new Date(item.date);
    const startDate = new Date(filters.dateRange.start);
    const endDate = new Date(filters.dateRange.end);
    if (itemDate < startDate || itemDate > endDate) {
      return false;
    }
  }
  
  return true;
};
