import { useState } from "react";
import { PregnancyRecord } from "@/types/breeding";
import { ViewMode } from "../components/ViewSelector";
import { GridSize } from "../components/GridSizeSelector";

export const usePregnancyManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showUltrasoundDialog, setShowUltrasoundDialog] = useState(false);
  const [showCheckupDialog, setShowCheckupDialog] = useState(false);
  const [selectedPregnancy, setSelectedPregnancy] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [gridSize, setGridSize] = useState<GridSize>(3);

  // Mock pregnancy data
  const pregnancies: PregnancyRecord[] = [
    {
      id: "P001",
      mareId: "M001",
      stallionId: "S001",
      breedingDate: new Date("2023-07-15"),
      expectedDueDate: new Date("2024-05-15"),
      status: "confirmed",
      ultrasounds: [
        {
          id: "U001",
          pregnancyId: "P001",
          date: new Date("2023-08-15"),
          gestationDay: 30,
          findings: "Healthy fetal development confirmed",
          veterinarian: "Dr. Smith"
        }
      ],
      checkups: [
        {
          id: "C001",
          pregnancyId: "P001",
          date: new Date("2023-09-15"),
          type: "routine",
          findings: "Mare and foal progressing well",
          veterinarian: "Dr. Smith"
        }
      ],
      notes: "First pregnancy for this mare",
      createdAt: new Date("2023-07-15"),
      updatedAt: new Date("2023-09-15"),
    },
    {
      id: "P002",
      mareId: "M002",
      stallionId: "S002",
      breedingDate: new Date("2023-06-10"),
      expectedDueDate: new Date("2024-04-10"),
      status: "monitoring",
      ultrasounds: [],
      checkups: [],
      notes: "Regular monitoring required",
      createdAt: new Date("2023-06-10"),
      updatedAt: new Date("2023-06-10"),
    }
  ];

  const filteredPregnancies = pregnancies.filter(pregnancy => {
    const matchesSearch = searchTerm === "" || 
      pregnancy.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || pregnancy.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: pregnancies.length,
    confirmed: pregnancies.filter(p => p.status === "confirmed").length,
    monitoring: pregnancies.filter(p => p.status === "monitoring").length,
    delivered: pregnancies.filter(p => p.status === "delivered").length,
  };

  return {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    showAddDialog,
    setShowAddDialog,
    showUltrasoundDialog,
    setShowUltrasoundDialog,
    showCheckupDialog,
    setShowCheckupDialog,
    selectedPregnancy,
    setSelectedPregnancy,
    pregnancies,
    filteredPregnancies,
    stats,
    viewMode,
    setViewMode,
    gridSize,
    setGridSize,
  };
};
