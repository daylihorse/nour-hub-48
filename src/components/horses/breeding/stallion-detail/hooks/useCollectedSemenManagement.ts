
import { useState, useMemo } from "react";
import { CollectedSemen, StallionDetailFilters } from "@/types/breeding/stallion-detail";

// Mock data for demonstration
const mockCollectedSemen: CollectedSemen[] = [
  {
    id: "CS001",
    stallionId: "stallion-1",
    collectionDate: "2024-01-15",
    technician: "Dr. Smith",
    volume: "120ml",
    concentration: "150M/ml",
    motility: "85%",
    quality: "Excellent",
    status: "Fresh",
    notes: "High quality sample",
    createdAt: new Date("2024-01-15")
  },
  {
    id: "CS002",
    stallionId: "stallion-1",
    collectionDate: "2024-02-01",
    technician: "Dr. Johnson",
    volume: "95ml",
    concentration: "135M/ml",
    motility: "78%",
    quality: "Good",
    status: "Processed",
    createdAt: new Date("2024-02-01")
  }
];

export const useCollectedSemenManagement = (stallionId: string) => {
  const [data, setData] = useState<CollectedSemen[]>(mockCollectedSemen);
  const [filters, setFilters] = useState<StallionDetailFilters>({
    searchTerm: "",
  });

  const collectedSemen = useMemo(() => {
    let filtered = data.filter(item => item.stallionId === stallionId);

    if (filters.searchTerm) {
      const searchTerm = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(item =>
        item.id.toLowerCase().includes(searchTerm) ||
        item.technician.toLowerCase().includes(searchTerm) ||
        item.quality.toLowerCase().includes(searchTerm)
      );
    }

    return filtered;
  }, [stallionId, filters, data]);

  const exportData = (format: 'csv' | 'excel' | 'pdf') => {
    console.log(`Exporting collected semen data as ${format}`);
    // TODO: Implement actual export functionality
  };

  return {
    collectedSemen,
    filters,
    setFilters,
    exportData,
  };
};
