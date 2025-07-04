
import { useState } from "react";
import { PregnancyRecord } from "@/types/breeding/pregnancy";
import { GridSize } from "../components/GridSizeSelector";

export type ViewMode = "grid" | "list" | "table";

export const usePregnancyManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [gridSize, setGridSize] = useState<GridSize>(3);
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });

  // Mock data for now - in real app this would come from API/context
  const pregnancies: PregnancyRecord[] = [];

  const filteredPregnancies = pregnancies.filter(pregnancy => {
    const matchesSearch = pregnancy.mareName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pregnancy.stallionName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || pregnancy.status === statusFilter;
    
    return matchesSearch && matchesStatus;
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
    dateRange,
    setDateRange,
    pregnancies: filteredPregnancies,
  };
};
