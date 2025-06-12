
import { useState, useMemo } from 'react';
import { FrozenSemenInventory, StallionDetailFilters } from '@/types/breeding/stallion-detail';

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
  const [frozenSemen, setFrozenSemen] = useState<FrozenSemenInventory[]>(mockFrozenSemen);
  const [filters, setFilters] = useState<StallionDetailFilters>({});
  const [isLoading, setIsLoading] = useState(false);

  const filteredData = useMemo(() => {
    return frozenSemen.filter(item => {
      if (filters.searchTerm && 
          !item.id.toLowerCase().includes(filters.searchTerm.toLowerCase()) &&
          !item.tank.toLowerCase().includes(filters.searchTerm.toLowerCase()) &&
          !item.location.toLowerCase().includes(filters.searchTerm.toLowerCase())) {
        return false;
      }
      
      if (filters.quality?.length && !filters.quality.includes(item.quality)) {
        return false;
      }
      
      if (filters.dateRange) {
        const itemDate = new Date(item.freezeDate);
        const startDate = new Date(filters.dateRange.start);
        const endDate = new Date(filters.dateRange.end);
        if (itemDate < startDate || itemDate > endDate) {
          return false;
        }
      }
      
      return true;
    });
  }, [frozenSemen, filters]);

  const addFrozenSemen = async (data: Omit<FrozenSemenInventory, 'id' | 'createdAt'>) => {
    setIsLoading(true);
    try {
      const newRecord: FrozenSemenInventory = {
        ...data,
        id: `FS${Date.now()}`,
        createdAt: new Date()
      };
      setFrozenSemen(prev => [newRecord, ...prev]);
      return newRecord;
    } finally {
      setIsLoading(false);
    }
  };

  const updateFrozenSemen = async (id: string, data: Partial<FrozenSemenInventory>) => {
    setIsLoading(true);
    try {
      setFrozenSemen(prev => 
        prev.map(item => item.id === id ? { ...item, ...data } : item)
      );
    } finally {
      setIsLoading(false);
    }
  };

  const deleteFrozenSemen = async (id: string) => {
    setIsLoading(true);
    try {
      setFrozenSemen(prev => prev.filter(item => item.id !== id));
    } finally {
      setIsLoading(false);
    }
  };

  const exportData = (format: 'csv' | 'excel' | 'pdf') => {
    console.log(`Exporting frozen semen data as ${format}`, filteredData);
  };

  return {
    frozenSemen: filteredData,
    filters,
    setFilters,
    isLoading,
    addFrozenSemen,
    updateFrozenSemen,
    deleteFrozenSemen,
    exportData
  };
};
