import { useState } from "react";
import { BreedingRecord } from "@/types/breeding";
import { ViewMode } from "../components/ViewSelector";
import { GridSize } from "../components/GridSizeSelector";

export const useBreedingRecords = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [gridSize, setGridSize] = useState<GridSize>(3);

  // Mock breeding records data
  const breedingRecords: BreedingRecord[] = [
    {
      id: "BR001",
      horseId: "M001",
      horseName: "Bella",
      type: "breeding",
      status: "completed",
      mateId: "S001",
      mateName: "Thunder",
      breedingDate: new Date("2023-05-15"),
      breedingMethod: "natural",
      veterinarian: "Dr. Smith",
      notes: "Successful breeding session",
      cost: 5000,
      createdAt: new Date("2023-05-15"),
      updatedAt: new Date("2023-05-15"),
    },
    {
      id: "BR002",
      horseId: "M002",
      horseName: "Luna",
      type: "pregnancy",
      status: "active",
      pregnancyStartDate: new Date("2023-07-20"),
      expectedDueDate: new Date("2024-03-20"),
      pregnancyDuration: 180,
      veterinarian: "Dr. Johnson",
      notes: "Pregnancy progressing well",
      createdAt: new Date("2023-07-20"),
      updatedAt: new Date("2024-01-05"),
    },
    {
      id: "BR003",
      horseId: "M003",
      horseName: "Aurora",
      type: "breeding",
      status: "planned",
      mateId: "S002",
      mateName: "Lightning",
      breedingDate: new Date("2024-01-15"),
      breedingMethod: "artificial_insemination",
      veterinarian: "Dr. Smith",
      cost: 3500,
      createdAt: new Date("2024-01-05"),
      updatedAt: new Date("2024-01-05"),
    },
  ];

  const filteredRecords = breedingRecords.filter(record => {
    const matchesSearch = record.horseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (record.mateName && record.mateName.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === "all" || record.status === statusFilter;
    const matchesType = typeFilter === "all" || record.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const stats = {
    total: breedingRecords.length,
    active: breedingRecords.filter(r => r.status === "active").length,
    completed: breedingRecords.filter(r => r.status === "completed").length,
    planned: breedingRecords.filter(r => r.status === "planned").length,
  };

  return {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    typeFilter,
    setTypeFilter,
    showAddDialog,
    setShowAddDialog,
    breedingRecords,
    filteredRecords,
    stats,
    viewMode,
    setViewMode,
    gridSize,
    setGridSize,
  };
};
