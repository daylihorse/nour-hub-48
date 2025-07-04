
import { useState } from "react";
import { Horse } from "@/types/horse";
import { GridSize } from "../components/GridSizeSelector";

export type ViewMode = "grid" | "list" | "table";

export const useGeldingManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [gridSize, setGridSize] = useState<GridSize>(3);
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedGelding, setSelectedGelding] = useState<Horse | null>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);

  // Mock geldings data - in real app this would come from API/context
  const geldings: Horse[] = [];

  const filteredGeldings = geldings.filter(gelding => {
    const matchesSearch = gelding.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         gelding.breed.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || gelding.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: filteredGeldings.length,
    active: filteredGeldings.filter(g => g.status === 'active').length,
    training: filteredGeldings.filter(g => g.status === 'training').length,
    retired: filteredGeldings.filter(g => g.status === 'retired').length,
  };

  const handleAddGelding = () => {
    setShowAddDialog(true);
  };

  const handleEditGelding = (geldingId: string) => {
    const gelding = geldings.find(g => g.id === geldingId);
    if (gelding) {
      setSelectedGelding(gelding);
      setShowEditDialog(true);
    }
  };

  const handleScheduleCheckup = (geldingId: string) => {
    console.log('Schedule checkup for gelding:', geldingId);
  };

  const handleViewMedicalRecords = (geldingId: string) => {
    console.log('View medical records for gelding:', geldingId);
  };

  const handleCloseDialogs = () => {
    setShowAddDialog(false);
    setShowEditDialog(false);
    setSelectedGelding(null);
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
    geldings: filteredGeldings,
    filteredGeldings,
    stats,
    selectedGelding,
    showAddDialog,
    showEditDialog,
    handleAddGelding,
    handleEditGelding,
    handleScheduleCheckup,
    handleViewMedicalRecords,
    handleCloseDialogs,
  };
};
