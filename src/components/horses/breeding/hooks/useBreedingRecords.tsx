
import { useState } from "react";
import { BreedingRecord } from "@/types/breeding/records";
import { GridSize } from "../components/GridSizeSelector";

export type ViewMode = "grid" | "list" | "table";

export const useBreedingRecords = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [gridSize, setGridSize] = useState<GridSize>(3);
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  // Mock data for now - in real app this would come from API
  const records: BreedingRecord[] = [];

  const filteredRecords = records.filter(record => {
    const matchesSearch = record.mare.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.stallion.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || record.status === statusFilter;
    const matchesType = typeFilter === "all" || record.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  return {
    searchTerm,
    setSearchTerm,
    viewMode,
    setViewMode,
    gridSize,
    setGridSize,
    statusFilter,
    setStatusFilter,
    typeFilter,
    setTypeFilter,
    records: filteredRecords,
  };
};
