
import React, { createContext, useContext, ReactNode } from "react";
import { useUnifiedRecords } from "../hooks/useUnifiedRecords";
import { BaseRecord, RecordFilters, RecordStats } from "@/types/breeding/unified-records";

interface RecordsContextType {
  // Data
  records: BaseRecord[];
  allRecords: BaseRecord[];
  stats: RecordStats;
  
  // Filters
  filters: RecordFilters;
  setFilters: (filters: RecordFilters) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  
  // CRUD operations
  addRecord: (record: BaseRecord) => void;
  updateRecord: (id: string, updates: Partial<BaseRecord>) => void;
  deleteRecord: (id: string) => void;
  getRecord: (id: string) => BaseRecord | undefined;
  
  // Query helpers
  getRecordsByType: (type: any) => BaseRecord[];
  getRecordsByHorse: (horseId: string) => BaseRecord[];
  getOverdueRecords: () => BaseRecord[];
  getUpcomingRecords: (days?: number) => BaseRecord[];
}

const RecordsContext = createContext<RecordsContextType | undefined>(undefined);

interface RecordsProviderProps {
  children: ReactNode;
  initialRecords?: BaseRecord[];
}

export const RecordsProvider: React.FC<RecordsProviderProps> = ({ 
  children, 
  initialRecords = [] 
}) => {
  const recordsManager = useUnifiedRecords(initialRecords);

  return (
    <RecordsContext.Provider value={recordsManager}>
      {children}
    </RecordsContext.Provider>
  );
};

export const useRecords = (): RecordsContextType => {
  const context = useContext(RecordsContext);
  if (context === undefined) {
    throw new Error('useRecords must be used within a RecordsProvider');
  }
  return context;
};

export default RecordsProvider;
