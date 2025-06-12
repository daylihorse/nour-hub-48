
import { useState, useMemo } from 'react';
import { CollectedSemen, StallionDetailFilters } from '@/types/breeding/stallion-detail';

// Mock data - in real app, this would come from API
const mockCollectedSemen: CollectedSemen[] = [
  {
    id: "CS001",
    stallionId: "1",
    collectionDate: "2024-01-15",
    volume: "50ml",
    concentration: "150M/ml",
    motility: "85%",
    quality: "Excellent",
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
    technician: "Dr. Johnson",
    status: "Used",
    temperature: "37°C",
    ph: "7.1",
    createdAt: new Date("2024-01-12")
  }
];

export const useCollectedSemenManagement = (stallionId: string) => {
  const [collectedSemen, setCollectedSemen] = useState<CollectedSemen[]>(mockCollectedSemen);
  const [filters, setFilters] = useState<StallionDetailFilters>({});
  const [isLoading, setIsLoading] = useState(false);

  const filteredData = useMemo(() => {
    return collectedSemen.filter(item => {
      if (filters.searchTerm && 
          !item.id.toLowerCase().includes(filters.searchTerm.toLowerCase()) &&
          !item.technician.toLowerCase().includes(filters.searchTerm.toLowerCase())) {
        return false;
      }
      
      if (filters.status?.length && !filters.status.includes(item.status)) {
        return false;
      }
      
      if (filters.quality?.length && !filters.quality.includes(item.quality)) {
        return false;
      }
      
      if (filters.technician?.length && !filters.technician.includes(item.technician)) {
        return false;
      }
      
      if (filters.dateRange) {
        const itemDate = new Date(item.collectionDate);
        const startDate = new Date(filters.dateRange.start);
        const endDate = new Date(filters.dateRange.end);
        if (itemDate < startDate || itemDate > endDate) {
          return false;
        }
      }
      
      return true;
    });
  }, [collectedSemen, filters]);

  const addCollectedSemen = async (data: Omit<CollectedSemen, 'id' | 'createdAt'>) => {
    setIsLoading(true);
    try {
      const newRecord: CollectedSemen = {
        ...data,
        id: `CS${Date.now()}`,
        createdAt: new Date()
      };
      setCollectedSemen(prev => [newRecord, ...prev]);
      return newRecord;
    } finally {
      setIsLoading(false);
    }
  };

  const updateCollectedSemen = async (id: string, data: Partial<CollectedSemen>) => {
    setIsLoading(true);
    try {
      setCollectedSemen(prev => 
        prev.map(item => item.id === id ? { ...item, ...data } : item)
      );
    } finally {
      setIsLoading(false);
    }
  };

  const deleteCollectedSemen = async (id: string) => {
    setIsLoading(true);
    try {
      setCollectedSemen(prev => prev.filter(item => item.id !== id));
    } finally {
      setIsLoading(false);
    }
  };

  const exportData = (format: 'csv' | 'excel' | 'pdf') => {
    console.log(`Exporting collected semen data as ${format}`, filteredData);
    // Implementation would depend on export library
  };

  return {
    collectedSemen: filteredData,
    filters,
    setFilters,
    isLoading,
    addCollectedSemen,
    updateCollectedSemen,
    deleteCollectedSemen,
    exportData
  };
};
