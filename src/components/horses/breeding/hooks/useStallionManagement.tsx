
import { useState } from "react";
import { useStallionContext } from "@/contexts/StallionContext";
import { ViewMode } from "../components/ViewSelector";
import { GridSize } from "../components/GridSizeSelector";

export const useStallionManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [gridSize, setGridSize] = useState<GridSize>("medium");
  const { stallions } = useStallionContext();

  const filteredStallions = stallions.filter(stallion =>
    stallion.horseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stallion.breed.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return {
    searchTerm,
    setSearchTerm,
    stallions,
    filteredStallions,
    viewMode,
    setViewMode,
    gridSize,
    setGridSize,
  };
};
