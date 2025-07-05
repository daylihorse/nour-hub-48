
import { useState } from "react";
import { Horse } from "@/types/horse-unified";
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

  const handleAddGelding = () => {
    setShowAddDialog(true);
  };

  const handleEditGelding = (geldingId: string) => {
    console.log('Edit gelding:', geldingId);
    setShowEditDialog(true);
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
