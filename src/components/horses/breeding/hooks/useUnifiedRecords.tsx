
import { useState, useMemo } from "react";
import { BaseRecord, RecordFilters, RecordStats, RecordType, RecordStatus, RecordPriority } from "@/types/breeding/unified-records";

export const useUnifiedRecords = (initialRecords: BaseRecord[] = []) => {
  const [records, setRecords] = useState<BaseRecord[]>(initialRecords);
  const [filters, setFilters] = useState<RecordFilters>({});
  const [searchTerm, setSearchTerm] = useState("");

  // Filter records based on current filters
  const filteredRecords = useMemo(() => {
    return records.filter(record => {
      // Search term filter
      if (searchTerm && !record.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
          !record.horseName.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }

      // Type filter
      if (filters.type && filters.type.length > 0 && !filters.type.includes(record.type)) {
        return false;
      }

      // Status filter
      if (filters.status && filters.status.length > 0 && !filters.status.includes(record.status)) {
        return false;
      }

      // Priority filter
      if (filters.priority && filters.priority.length > 0 && !filters.priority.includes(record.priority)) {
        return false;
      }

      // Horse filter
      if (filters.horseId && record.horseId !== filters.horseId) {
        return false;
      }

      // Veterinarian filter
      if (filters.veterinarian && record.veterinarian !== filters.veterinarian) {
        return false;
      }

      // Date range filter
      if (filters.dateRange) {
        const recordDate = record.scheduledDate || record.createdAt;
        if (recordDate < filters.dateRange.start || recordDate > filters.dateRange.end) {
          return false;
        }
      }

      // Tags filter
      if (filters.tags && filters.tags.length > 0) {
        const recordTags = record.tags || [];
        const hasMatchingTag = filters.tags.some(tag => recordTags.includes(tag));
        if (!hasMatchingTag) {
          return false;
        }
      }

      return true;
    });
  }, [records, filters, searchTerm]);

  // Calculate statistics
  const stats: RecordStats = useMemo(() => {
    const byType: Record<RecordType, number> = {
      veterinary_checkup: 0,
      ultrasound: 0,
      medication: 0,
      appointment: 0,
      breeding: 0,
      pregnancy: 0,
      foaling: 0,
      health_assessment: 0,
      heat_cycle: 0,
    };

    const byStatus: Record<RecordStatus, number> = {
      draft: 0,
      scheduled: 0,
      in_progress: 0,
      completed: 0,
      cancelled: 0,
      overdue: 0,
    };

    const byPriority: Record<RecordPriority, number> = {
      low: 0,
      medium: 0,
      high: 0,
      urgent: 0,
    };

    let overdue = 0;
    let upcoming = 0;
    const now = new Date();

    filteredRecords.forEach(record => {
      byType[record.type]++;
      byStatus[record.status]++;
      byPriority[record.priority]++;

      // Check if overdue
      if (record.dueDate && record.dueDate < now && record.status !== 'completed') {
        overdue++;
      }

      // Check if upcoming (within next 7 days)
      if (record.scheduledDate) {
        const daysDiff = Math.floor((record.scheduledDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
        if (daysDiff >= 0 && daysDiff <= 7) {
          upcoming++;
        }
      }
    });

    return {
      total: filteredRecords.length,
      byType,
      byStatus,
      byPriority,
      overdue,
      upcoming,
    };
  }, [filteredRecords]);

  // CRUD operations
  const addRecord = (record: BaseRecord) => {
    setRecords(prev => [...prev, record]);
  };

  const updateRecord = (id: string, updates: Partial<BaseRecord>) => {
    setRecords(prev => prev.map(record => 
      record.id === id 
        ? { ...record, ...updates, updatedAt: new Date() }
        : record
    ));
  };

  const deleteRecord = (id: string) => {
    setRecords(prev => prev.filter(record => record.id !== id));
  };

  const getRecord = (id: string) => {
    return records.find(record => record.id === id);
  };

  const getRecordsByType = (type: RecordType) => {
    return filteredRecords.filter(record => record.type === type);
  };

  const getRecordsByHorse = (horseId: string) => {
    return filteredRecords.filter(record => record.horseId === horseId);
  };

  const getOverdueRecords = () => {
    const now = new Date();
    return filteredRecords.filter(record => 
      record.dueDate && 
      record.dueDate < now && 
      record.status !== 'completed'
    );
  };

  const getUpcomingRecords = (days: number = 7) => {
    const now = new Date();
    const futureDate = new Date(now.getTime() + (days * 24 * 60 * 60 * 1000));
    
    return filteredRecords.filter(record => 
      record.scheduledDate && 
      record.scheduledDate >= now && 
      record.scheduledDate <= futureDate
    );
  };

  return {
    // Data
    records: filteredRecords,
    allRecords: records,
    stats,
    
    // Filters
    filters,
    setFilters,
    searchTerm,
    setSearchTerm,
    
    // CRUD operations
    addRecord,
    updateRecord,
    deleteRecord,
    getRecord,
    
    // Query helpers
    getRecordsByType,
    getRecordsByHorse,
    getOverdueRecords,
    getUpcomingRecords,
  };
};
