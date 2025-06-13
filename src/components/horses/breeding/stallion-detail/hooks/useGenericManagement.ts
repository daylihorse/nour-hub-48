
import { useState, useMemo } from 'react';
import { StallionDetailRecord, StallionDetailFilters } from '@/types/breeding/stallion-detail';

interface UseGenericManagementProps<T extends StallionDetailRecord> {
  initialData: T[];
  filterFn: (item: T, filters: StallionDetailFilters) => boolean;
}

export function useGenericManagement<T extends StallionDetailRecord>({
  initialData,
  filterFn
}: UseGenericManagementProps<T>) {
  const [data, setData] = useState<T[]>(initialData);
  const [filters, setFilters] = useState<StallionDetailFilters>({});
  const [isLoading, setIsLoading] = useState(false);

  const filteredData = useMemo(() => {
    return data.filter(item => filterFn(item, filters));
  }, [data, filters, filterFn]);

  const addRecord = async (newData: Omit<T, 'id' | 'createdAt'>) => {
    setIsLoading(true);
    try {
      const newRecord = {
        ...newData,
        id: `${Date.now()}`,
        createdAt: new Date()
      } as T;
      setData(prev => [newRecord, ...prev]);
      return newRecord;
    } finally {
      setIsLoading(false);
    }
  };

  const updateRecord = async (id: string, updateData: Partial<T>) => {
    setIsLoading(true);
    try {
      setData(prev => 
        prev.map(item => item.id === id ? { ...item, ...updateData } : item)
      );
    } finally {
      setIsLoading(false);
    }
  };

  const deleteRecord = async (id: string) => {
    setIsLoading(true);
    try {
      setData(prev => prev.filter(item => item.id !== id));
    } finally {
      setIsLoading(false);
    }
  };

  const exportData = (format: 'csv' | 'excel' | 'pdf') => {
    console.log(`Exporting data as ${format}`, filteredData);
  };

  return {
    data: filteredData,
    filters,
    setFilters,
    isLoading,
    addRecord,
    updateRecord,
    deleteRecord,
    exportData
  };
}
