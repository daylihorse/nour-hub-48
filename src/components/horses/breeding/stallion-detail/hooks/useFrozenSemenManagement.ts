
import { useState, useMemo } from "react";
import { FrozenSemenInventory, StallionDetailFilters } from "@/types/breeding/stallion-detail";

// Mock data for demonstration
const mockFrozenSemen: FrozenSemenInventory[] = [
  {
    id: "FS001",
    stallionId: "stallion-1",
    freezeDate: "2024-01-15",
    straws: 12,
    tank: "Tank A-1",
    quality: "Grade A",
    viability: "95%",
    location: "Section 1A",
    expiry: "2029-01-15",
    batchNumber: "B001",
    freezingProtocol: "Standard Protocol A",
    createdAt: new Date("2024-01-15")
  },
  {
    id: "FS002",
    stallionId: "stallion-1",
    freezeDate: "2024-02-20",
    straws: 8,
    tank: "Tank B-2",
    quality: "Grade B",
    viability: "88%",
    location: "Section 2B",
    expiry: "2029-02-20",
    batchNumber: "B002",
    createdAt: new Date("2024-02-20")
  },
  {
    id: "FS003",
    stallionId: "stallion-1",
    freezeDate: "2024-03-10",
    straws: 15,
    tank: "Tank A-3",
    quality: "Grade A",
    viability: "92%",
    location: "Section 1C",
    expiry: "2029-03-10",
    batchNumber: "B003",
    freezingProtocol: "Enhanced Protocol B",
    createdAt: new Date("2024-03-10")
  }
];

export const useFrozenSemenManagement = (stallionId: string) => {
  const [filters, setFilters] = useState<StallionDetailFilters>({
    searchTerm: "",
    quality: [],
  });

  const frozenSemen = useMemo(() => {
    let filtered = mockFrozenSemen.filter(item => item.stallionId === stallionId);

    if (filters.searchTerm) {
      const searchTerm = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(item =>
        item.tank.toLowerCase().includes(searchTerm) ||
        item.location.toLowerCase().includes(searchTerm) ||
        item.batchNumber?.toLowerCase().includes(searchTerm) ||
        item.id.toLowerCase().includes(searchTerm)
      );
    }

    if (filters.quality && filters.quality.length > 0) {
      filtered = filtered.filter(item => filters.quality!.includes(item.quality));
    }

    return filtered;
  }, [stallionId, filters]);

  const exportData = (format: 'csv' | 'excel' | 'pdf') => {
    console.log(`Exporting frozen semen data as ${format}`);
    // TODO: Implement actual export functionality
  };

  return {
    frozenSemen,
    filters,
    setFilters,
    exportData,
  };
};
