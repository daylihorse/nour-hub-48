
import { StallionDetailFilters, BreedingRecord, CollectedSemen, FrozenSemenInventory, FrozenEmbryoInventory } from '@/types/breeding/stallion-detail';

export const filterBreedingRecord = (record: BreedingRecord, filters: StallionDetailFilters): boolean => {
  if (filters.searchTerm) {
    const searchTerm = filters.searchTerm.toLowerCase();
    const searchableFields = [
      record.mareName,
      record.mareOwner,
      record.veterinarian,
      record.method,
      record.result,
      record.id
    ].filter(Boolean);
    
    if (!searchableFields.some(field => field.toLowerCase().includes(searchTerm))) {
      return false;
    }
  }

  if (filters.status && filters.status.length > 0) {
    if (!filters.status.includes(record.status)) {
      return false;
    }
  }

  if (filters.method && filters.method.length > 0) {
    if (!filters.method.includes(record.method)) {
      return false;
    }
  }

  return true;
};

export const filterCollectedSemen = (record: CollectedSemen, filters: StallionDetailFilters): boolean => {
  if (filters.searchTerm) {
    const searchTerm = filters.searchTerm.toLowerCase();
    const searchableFields = [
      record.technician,
      record.quality,
      record.status,
      record.id
    ].filter(Boolean);
    
    if (!searchableFields.some(field => field.toLowerCase().includes(searchTerm))) {
      return false;
    }
  }

  if (filters.status && filters.status.length > 0) {
    if (!filters.status.includes(record.status)) {
      return false;
    }
  }

  if (filters.quality && filters.quality.length > 0) {
    if (!filters.quality.includes(record.quality)) {
      return false;
    }
  }

  if (filters.technician && filters.technician.length > 0) {
    if (!filters.technician.includes(record.technician)) {
      return false;
    }
  }

  return true;
};

export const filterFrozenSemen = (record: FrozenSemenInventory, filters: StallionDetailFilters): boolean => {
  if (filters.searchTerm) {
    const searchTerm = filters.searchTerm.toLowerCase();
    const searchableFields = [
      record.tank,
      record.location,
      record.batchNumber,
      record.quality,
      record.id
    ].filter(Boolean);
    
    if (!searchableFields.some(field => field.toLowerCase().includes(searchTerm))) {
      return false;
    }
  }

  if (filters.quality && filters.quality.length > 0) {
    if (!filters.quality.includes(record.quality)) {
      return false;
    }
  }

  return true;
};

export const filterFrozenEmbryo = (record: FrozenEmbryoInventory, filters: StallionDetailFilters): boolean => {
  if (filters.searchTerm) {
    const searchTerm = filters.searchTerm.toLowerCase();
    const searchableFields = [
      record.mareName,
      record.tank,
      record.location,
      record.grade,
      record.stage,
      record.id
    ].filter(Boolean);
    
    if (!searchableFields.some(field => field.toLowerCase().includes(searchTerm))) {
      return false;
    }
  }

  return true;
};
