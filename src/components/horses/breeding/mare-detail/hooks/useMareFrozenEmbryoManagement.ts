
import { useState, useMemo } from "react";
import { MareFrozenEmbryoInventory, MareFrozenEmbryoFilters } from "@/types/breeding/mare-embryo";

// Mock data for demonstration
const mockMareFrozenEmbryos: MareFrozenEmbryoInventory[] = [
  {
    id: "MFE001",
    mareId: "1",
    mareName: "Bella",
    stallionId: "ST001",
    stallionName: "Thunder",
    creationDate: "2024-01-15",
    stage: "Blastocyst",
    grade: "Grade 1",
    viability: "95%",
    tank: "Tank M-1",
    location: "Section 1A",
    diameter: "180μm",
    freezingMethod: "Vitrification",
    createdAt: new Date("2024-01-15")
  },
  {
    id: "MFE002",
    mareId: "2",
    mareName: "Luna",
    stallionId: "ST002",
    stallionName: "Lightning",
    creationDate: "2024-02-20",
    stage: "Expanded Blastocyst",
    grade: "Grade 2",
    viability: "88%",
    tank: "Tank M-2",
    location: "Section 2B",
    diameter: "200μm",
    freezingMethod: "Vitrification",
    transferDate: "2024-03-01",
    transferResult: "Successful",
    createdAt: new Date("2024-02-20")
  }
];

export const useMareFrozenEmbryoManagement = (mareId?: string) => {
  const [data, setData] = useState<MareFrozenEmbryoInventory[]>(mockMareFrozenEmbryos);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState<MareFrozenEmbryoFilters>({
    searchTerm: "",
    grade: [],
    stage: [],
    stallion: [],
  });

  const frozenEmbryos = useMemo(() => {
    let filtered = data;

    // Filter by mare if mareId is provided
    if (mareId) {
      filtered = filtered.filter(item => item.mareId === mareId);
    }

    if (filters.searchTerm) {
      const searchTerm = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(item =>
        item.mareName.toLowerCase().includes(searchTerm) ||
        item.stallionName.toLowerCase().includes(searchTerm) ||
        item.tank.toLowerCase().includes(searchTerm) ||
        item.location.toLowerCase().includes(searchTerm) ||
        item.id.toLowerCase().includes(searchTerm)
      );
    }

    if (filters.grade && filters.grade.length > 0) {
      filtered = filtered.filter(item => filters.grade.includes(item.grade));
    }

    if (filters.stage && filters.stage.length > 0) {
      filtered = filtered.filter(item => filters.stage.includes(item.stage));
    }

    if (filters.stallion && filters.stallion.length > 0) {
      filtered = filtered.filter(item => filters.stallion.includes(item.stallionName));
    }

    return filtered;
  }, [mareId, filters, data]);

  const addFrozenEmbryo = async (newRecord: Omit<MareFrozenEmbryoInventory, 'id' | 'createdAt'>) => {
    const record: MareFrozenEmbryoInventory = {
      ...newRecord,
      id: `MFE${Date.now()}`,
      createdAt: new Date()
    };
    setData(prev => [...prev, record]);
  };

  const updateFrozenEmbryo = async (id: string, updatedRecord: MareFrozenEmbryoInventory) => {
    setData(prev => 
      prev.map(item => item.id === id ? { ...updatedRecord, id } : item)
    );
  };

  const deleteFrozenEmbryo = async (id: string) => {
    setData(prev => prev.filter(item => item.id !== id));
  };

  const exportData = (format: 'csv' | 'excel' | 'pdf') => {
    console.log(`Exporting mare frozen embryo data as ${format}`);
    // TODO: Implement actual export functionality
  };

  return {
    frozenEmbryos,
    filters,
    setFilters,
    isLoading,
    addFrozenEmbryo,
    updateFrozenEmbryo,
    deleteFrozenEmbryo,
    exportData,
  };
};
