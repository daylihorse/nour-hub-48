
import { useState, useMemo } from 'react';
import { StallionDetailFilters, StallionDetailRecord } from '@/types/breeding/stallion-detail';

interface UseGenericManagementProps<T extends StallionDetailRecord> {
  initialData: T[];
  filterFn: (item: T, filters: StallionDetailFilters) => boolean;
}

export const useGenericManagement = <T extends StallionDetailRecord>({
  initialData,
  filterFn
}: UseGenericManagementProps<T>) => {
  const [data, setData] = useState<T[]>(initialData);
  const [filters, setFilters] = useState<StallionDetailFilters>({});
  const [isLoading, setIsLoading] = useState(false);

  const filteredData = useMemo(() => {
    return data.filter(item => filterFn(item, filters));
  }, [data, filters, filterFn]);

  const addRecord = (record: Omit<T, 'id' | 'createdAt'>) => {
    const newRecord = {
      ...record,
      id: `${Date.now()}`,
      createdAt: new Date()
    } as T;
    setData(prev => [...prev, newRecord]);
  };

  const updateRecord = (id: string, updates: Partial<T>) => {
    setData(prev => prev.map(item => 
      item.id === id ? { ...item, ...updates } : item
    ));
  };

  const deleteRecord = (id: string) => {
    setData(prev => prev.filter(item => item.id !== id));
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
};
