
import { useState } from "react";
import { PregnancyRecord } from "@/types/breeding/pregnancy";
import { GridSize } from "../components/GridSizeSelector";

export type ViewMode = "grid" | "list" | "table";

export const usePregnancyManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [gridSize, setGridSize] = useState<GridSize>(3);
  const [statusFilter, setStatusFilter] = useState("all");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showUltrasoundDialog, setShowUltrasoundDialog] = useState(false);
  const [showCheckupDialog, setShowCheckupDialog] = useState(false);
  const [selectedPregnancy, setSelectedPregnancy] = useState<string | null>(null);
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
    // For now, we'll use placeholder properties until we have proper mare/stallion data
    const matchesSearch = pregnancy.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || pregnancy.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Calculate stats
  const stats = {
    total: filteredPregnancies.length,
    confirmed: filteredPregnancies.filter(p => p.status === 'confirmed').length,
    monitoring: filteredPregnancies.filter(p => p.status === 'monitoring').length,
    delivered: filteredPregnancies.filter(p => p.status === 'delivered').length,
  };

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
    showAddDialog,
    setShowAddDialog,
    showUltrasoundDialog,
    setShowUltrasoundDialog,
    showCheckupDialog,
    setShowCheckupDialog,
    selectedPregnancy,
    setSelectedPregnancy,
    pregnancies: filteredPregnancies,
    filteredPregnancies,
    stats,
  };
};
