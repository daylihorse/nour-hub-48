
import { useState, useMemo } from "react";

export interface UseRecordSearchProps<T> {
  records: T[];
  searchFields: (keyof T)[];
}

export const useRecordSearch = <T extends Record<string, any>>({
  records,
  searchFields
}: UseRecordSearchProps<T>) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRecords = useMemo(() => {
    if (!searchTerm) return records;
    
    return records.filter(record =>
      searchFields.some(field => {
        const value = record[field];
        return value && value.toString().toLowerCase().includes(searchTerm.toLowerCase());
      })
    );
  }, [records, searchFields, searchTerm]);

  return {
    searchTerm,
    setSearchTerm,
    filteredRecords
  };
};
