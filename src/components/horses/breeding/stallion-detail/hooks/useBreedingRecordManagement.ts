
import { BreedingRecord } from '@/types/breeding/stallion-detail';
import { useGenericManagement } from './useGenericManagement';
import { filterBreedingRecord } from '../utils/filterUtils';

const mockBreedingRecords: BreedingRecord[] = [
  {
    id: "BR001",
    stallionId: "1",
    date: "2024-01-20",
    mareName: "Golden Mare",
    mareId: "M001",
    mareOwner: "Smith Ranch",
    method: "AI Fresh",
    result: "Confirmed Pregnant",
    status: "Active",
    expectedFoaling: "2025-01-15",
    veterinarian: "Dr. Wilson",
    notes: "Excellent breeding session",
    createdAt: new Date("2024-01-20")
  },
  {
    id: "BR002",
    stallionId: "1",
    date: "2024-01-15",
    mareName: "Silver Beauty",
    mareId: "M002",
    mareOwner: "Johnson Stables",
    method: "AI Frozen",
    result: "Pending",
    status: "Monitoring",
    expectedFoaling: "TBD",
    veterinarian: "Dr. Brown",
    createdAt: new Date("2024-01-15")
  },
  {
    id: "BR003",
    stallionId: "1",
    date: "2024-01-10",
    mareName: "Black Diamond",
    mareId: "M003",
    mareOwner: "Wilson Farm",
    method: "Natural Cover",
    result: "Live Foal",
    status: "Completed",
    expectedFoaling: "2024-12-05",
    veterinarian: "Dr. Davis",
    createdAt: new Date("2024-01-10")
  }
];

export const useBreedingRecordManagement = (stallionId: string) => {
  const result = useGenericManagement<BreedingRecord>({
    initialData: mockBreedingRecords,
    filterFn: filterBreedingRecord
  });

  return {
    breedingRecords: result.data,
    filters: result.filters,
    setFilters: result.setFilters,
    isLoading: result.isLoading,
    addBreedingRecord: result.addRecord,
    updateBreedingRecord: result.updateRecord,
    deleteBreedingRecord: result.deleteRecord,
    exportData: result.exportData
  };
};
