
import { useState } from "react";
import { useMareContext } from "@/contexts/MareContext";
import { ViewMode } from "../components/ViewSelector";
import { GridSize } from "../components/GridSizeSelector";

export const useMareManagement = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [gridSize, setGridSize] = useState<GridSize>(3);
  
  const {
    searchTerm,
    setSearchTerm,
    filteredMares,
    updateMare,
    isLoading,
    error,
    mares,
    clearError
  } = useMareContext();

  return {
    searchTerm,
    setSearchTerm,
    mares: filteredMares,
    filteredMares,
    updateMare,
    isLoading,
    error,
    clearError,
    viewMode,
    setViewMode,
    gridSize,
    setGridSize,
  };
};
