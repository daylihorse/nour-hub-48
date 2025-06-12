
import { useState, useMemo } from 'react';
import { BreedingRecord, StallionDetailFilters } from '@/types/breeding/stallion-detail';

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
    contractId: "C001",
    studFee: 5000,
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
    contractId: "C002",
    studFee: 5000,
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
    contractId: "C003",
    studFee: 5000,
    createdAt: new Date("2024-01-10")
  }
];

export const useBreedingRecordManagement = (stallionId: string) => {
  const [breedingRecords, setBreedingRecords] = useState<BreedingRecord[]>(mockBreedingRecords);
  const [filters, setFilters] = useState<StallionDetailFilters>({});
  const [isLoading, setIsLoading] = useState(false);

  const filteredData = useMemo(() => {
    return breedingRecords.filter(item => {
      if (filters.searchTerm && 
          !item.id.toLowerCase().includes(filters.searchTerm.toLowerCase()) &&
          !item.mareName.toLowerCase().includes(filters.searchTerm.toLowerCase()) &&
          !item.mareOwner.toLowerCase().includes(filters.searchTerm.toLowerCase()) &&
          !item.veterinarian.toLowerCase().includes(filters.searchTerm.toLowerCase())) {
        return false;
      }
      
      if (filters.status?.length && !filters.status.includes(item.status)) {
        return false;
      }
      
      if (filters.method?.length && !filters.method.includes(item.method)) {
        return false;
      }
      
      if (filters.dateRange) {
        const itemDate = new Date(item.date);
        const startDate = new Date(filters.dateRange.start);
        const endDate = new Date(filters.dateRange.end);
        if (itemDate < startDate || itemDate > endDate) {
          return false;
        }
      }
      
      return true;
    });
  }, [breedingRecords, filters]);

  const addBreedingRecord = async (data: Omit<BreedingRecord, 'id' | 'createdAt'>) => {
    setIsLoading(true);
    try {
      const newRecord: BreedingRecord = {
        ...data,
        id: `BR${Date.now()}`,
        createdAt: new Date()
      };
      setBreedingRecords(prev => [newRecord, ...prev]);
      return newRecord;
    } finally {
      setIsLoading(false);
    }
  };

  const updateBreedingRecord = async (id: string, data: Partial<BreedingRecord>) => {
    setIsLoading(true);
    try {
      setBreedingRecords(prev => 
        prev.map(item => item.id === id ? { ...item, ...data } : item)
      );
    } finally {
      setIsLoading(false);
    }
  };

  const deleteBreedingRecord = async (id: string) => {
    setIsLoading(true);
    try {
      setBreedingRecords(prev => prev.filter(item => item.id !== id));
    } finally {
      setIsLoading(false);
    }
  };

  const exportData = (format: 'csv' | 'excel' | 'pdf') => {
    console.log(`Exporting breeding records as ${format}`, filteredData);
  };

  return {
    breedingRecords: filteredData,
    filters,
    setFilters,
    isLoading,
    addBreedingRecord,
    updateBreedingRecord,
    deleteBreedingRecord,
    exportData
  };
};
