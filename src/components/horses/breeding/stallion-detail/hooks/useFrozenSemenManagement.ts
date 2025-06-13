
import { FrozenSemenInventory } from '@/types/breeding/stallion-detail';
import { useGenericManagement } from './useGenericManagement';
import { filterFrozenSemen } from '../utils/filterUtils';

const mockFrozenSemen: FrozenSemenInventory[] = [
  {
    id: "FS001",
    stallionId: "1",
    freezeDate: "2024-01-10",
    straws: 25,
    tank: "Tank A-3",
    quality: "Grade A",
    viability: "92%",
    location: "Section 2B",
    expiry: "2029-01-10",
    batchNumber: "B001",
    freezingProtocol: "Standard Protocol A",
    createdAt: new Date("2024-01-10")
  },
  {
    id: "FS002",
    stallionId: "1",
    freezeDate: "2024-01-05", 
    straws: 18,
    tank: "Tank B-1",
    quality: "Grade A",
    viability: "89%",
    location: "Section 1A",
    expiry: "2029-01-05",
    batchNumber: "B002",
    freezingProtocol: "Standard Protocol A",
    createdAt: new Date("2024-01-05")
  }
];

export const useFrozenSemenManagement = (stallionId: string) => {
  const result = useGenericManagement<FrozenSemenInventory>({
    initialData: mockFrozenSemen,
    filterFn: filterFrozenSemen
  });

  return {
    frozenSemen: result.data,
    filters: result.filters,
    setFilters: result.setFilters,
    isLoading: result.isLoading,
    addFrozenSemen: result.addRecord,
    updateFrozenSemen: result.updateRecord,
    deleteFrozenSemen: result.deleteRecord,
    exportData: result.exportData
  };
};
