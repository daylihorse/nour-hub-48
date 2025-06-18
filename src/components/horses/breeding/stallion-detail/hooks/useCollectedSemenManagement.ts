
import { CollectedSemen } from '@/types/breeding/stallion-detail';
import { useGenericManagement } from './useGenericManagement';
import { filterCollectedSemen } from '../utils/filterUtils';

const mockCollectedSemen: CollectedSemen[] = [
  {
    id: "CS001",
    stallionId: "1",
    collectionDate: "2024-01-15",
    volume: "50ml",
    concentration: "150M/ml",
    motility: "85%",
    quality: "Excellent",
    qualityGrade: "A",
    technician: "Dr. Smith",
    status: "Fresh",
    temperature: "37°C",
    ph: "7.2",
    notes: "High quality collection",
    createdAt: new Date("2024-01-15")
  },
  {
    id: "CS002",
    stallionId: "1", 
    collectionDate: "2024-01-12",
    volume: "45ml",
    concentration: "140M/ml",
    motility: "82%",
    quality: "Good",
    qualityGrade: "B",
    technician: "Dr. Johnson",
    status: "Used",
    temperature: "37°C",
    ph: "7.1",
    createdAt: new Date("2024-01-12")
  }
];

export const useCollectedSemenManagement = (stallionId: string) => {
  const result = useGenericManagement<CollectedSemen>({
    initialData: mockCollectedSemen,
    filterFn: filterCollectedSemen
  });

  return {
    collectedSemen: result.data,
    filters: result.filters,
    setFilters: result.setFilters,
    isLoading: result.isLoading,
    addCollectedSemen: result.addRecord,
    updateCollectedSemen: result.updateRecord,
    deleteCollectedSemen: result.deleteRecord,
    exportData: result.exportData
  };
};
