
import { FrozenEmbryoInventory } from '@/types/breeding/stallion-detail';
import { useGenericManagement } from './useGenericManagement';
import { filterFrozenEmbryo } from '../utils/filterUtils';

const mockFrozenEmbryos: FrozenEmbryoInventory[] = [
  {
    id: "FE001",
    stallionId: "1",
    creationDate: "2023-12-15",
    mareName: "Golden Mare",
    mareId: "M001",
    grade: "Grade 1",
    stage: "Blastocyst",
    viability: "95%",
    tank: "Tank C-2",
    location: "Section 3A",
    diameter: "180μm",
    freezingMethod: "Vitrification",
    createdAt: new Date("2023-12-15")
  },
  {
    id: "FE002",
    stallionId: "1",
    creationDate: "2023-11-20",
    mareName: "Silver Beauty",
    mareId: "M002",
    grade: "Grade 2",
    stage: "Expanded Blastocyst",
    viability: "88%",
    tank: "Tank C-1",
    location: "Section 2C",
    diameter: "200μm",
    freezingMethod: "Vitrification",
    createdAt: new Date("2023-11-20")
  }
];

export const useFrozenEmbryoManagement = (stallionId: string) => {
  const result = useGenericManagement<FrozenEmbryoInventory>({
    initialData: mockFrozenEmbryos,
    filterFn: filterFrozenEmbryo
  });

  return {
    frozenEmbryos: result.data,
    filters: result.filters,
    setFilters: result.setFilters,
    isLoading: result.isLoading,
    addFrozenEmbryo: result.addRecord,
    updateFrozenEmbryo: result.updateRecord,
    deleteFrozenEmbryo: result.deleteRecord,
    exportData: result.exportData
  };
};
