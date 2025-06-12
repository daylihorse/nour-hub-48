
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
  }
];

export const useFrozenEmbryoManagement = (stallionId: string) => {
  const [frozenEmbryos, setFrozenEmbryos] = useState<FrozenEmbryoInventory[]>(mockFrozenEmbryos);
  const [filters, setFilters] = useState<StallionDetailFilters>({});
  const [isLoading, setIsLoading] = useState(false);

  const filteredData = useMemo(() => {
    return frozenEmbryos.filter(item => {
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
    });
  }, [frozenEmbryos, filters]);

  const addFrozenEmbryo = async (data: Omit<FrozenEmbryoInventory, 'id' | 'createdAt'>) => {
    setIsLoading(true);
    try {
      const newRecord: FrozenEmbryoInventory = {
        ...data,
        id: `FE${Date.now()}`,
        createdAt: new Date()
      };
      setFrozenEmbryos(prev => [newRecord, ...prev]);
      return newRecord;
    } finally {
      setIsLoading(false);
    }
  };

  const updateFrozenEmbryo = async (id: string, data: Partial<FrozenEmbryoInventory>) => {
    setIsLoading(true);
    try {
      setFrozenEmbryos(prev => 
        prev.map(item => item.id === id ? { ...item, ...data } : item)
      );
    } finally {
      setIsLoading(false);
    }
  };

  const deleteFrozenEmbryo = async (id: string) => {
    setIsLoading(true);
    try {
      setFrozenEmbryos(prev => prev.filter(item => item.id !== id));
    } finally {
      setIsLoading(false);
    }
  };

  const exportData = (format: 'csv' | 'excel' | 'pdf') => {
    console.log(`Exporting frozen embryo data as ${format}`, filteredData);
  };

  return {
    frozenEmbryos: filteredData,
    filters,
    setFilters,
    isLoading,
    addFrozenEmbryo,
    updateFrozenEmbryo,
    deleteFrozenEmbryo,
    exportData
  };
};
