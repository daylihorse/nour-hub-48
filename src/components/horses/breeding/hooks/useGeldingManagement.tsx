
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
  const [geldings, setGeldings] = useState<Horse[]>([]);

  const filteredGeldings = geldings.filter(gelding => {
    const matchesSearch = gelding.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         gelding.breed.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || gelding.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: filteredGeldings.length,
    active: filteredGeldings.filter(g => g.status === 'active').length,
    inactive: filteredGeldings.filter(g => g.status === 'inactive').length,
    transferred: filteredGeldings.filter(g => g.status === 'transferred').length,
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

  const updateGelding = (updatedGelding: Horse) => {
    setGeldings(prevGeldings => 
      prevGeldings.map(gelding => 
        gelding.id === updatedGelding.id ? updatedGelding : gelding
      )
    );
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
    updateGelding,
    handleAddGelding,
    handleEditGelding,
    handleScheduleCheckup,
    handleViewMedicalRecords,
    handleCloseDialogs,
  };
};
