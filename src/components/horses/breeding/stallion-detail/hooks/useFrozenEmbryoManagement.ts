
import { useState, useMemo } from 'react';
import { FrozenEmbryoInventory, StallionDetailFilters } from '@/types/breeding/stallion-detail';

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
  },
  {
    id: "FE003",
    stallionId: "1",
    creationDate: "2023-10-05",
    mareName: "Black Diamond",
    mareId: "M003",
    grade: "Grade 1",
    stage: "Morula",
    viability: "92%",
    tank: "Tank C-3",
    location: "Section 1B",
    diameter: "160μm",
    freezingMethod: "Slow Freeze",
    createdAt: new Date("2023-10-05")
  }
];

export const useFrozenEmbryoManagement = (stallionId: string) => {
  const [data, setData] = useState<FrozenEmbryoInventory[]>(mockFrozenEmbryos);
  const [filters, setFilters] = useState<StallionDetailFilters>({
    searchTerm: "",
    quality: [],
  });

  const frozenEmbryos = useMemo(() => {
    let filtered = data.filter(item => item.stallionId === stallionId);

    if (filters.searchTerm) {
      const searchTerm = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(item =>
        item.id.toLowerCase().includes(searchTerm) ||
        item.mareName.toLowerCase().includes(searchTerm) ||
        item.tank.toLowerCase().includes(searchTerm) ||
        item.location.toLowerCase().includes(searchTerm) ||
        item.grade.toLowerCase().includes(searchTerm)
      );
    }

    if (filters.quality && filters.quality.length > 0) {
      filtered = filtered.filter(item => filters.quality!.includes(item.grade));
    }

    return filtered;
  }, [stallionId, filters, data]);

  const updateFrozenEmbryo = async (id: string, updatedRecord: FrozenEmbryoInventory) => {
    setData(prev => 
      prev.map(item => item.id === id ? { ...updatedRecord, id } : item)
    );
  };

  const deleteFrozenEmbryo = async (id: string) => {
    setData(prev => prev.filter(item => item.id !== id));
  };

  const exportData = (format: 'csv' | 'excel' | 'pdf') => {
    console.log(`Exporting frozen embryo data as ${format}`);
  };

  return {
    frozenEmbryos,
    filters,
    setFilters,
    exportData,
    updateFrozenEmbryo,
    deleteFrozenEmbryo,
  };
};
