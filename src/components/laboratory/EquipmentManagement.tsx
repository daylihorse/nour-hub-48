
import { useState } from "react";
import EquipmentHeader from "./equipment/EquipmentHeader";
import EquipmentStats from "./equipment/EquipmentStats";
import MaintenanceAlerts from "./equipment/MaintenanceAlerts";
import EquipmentTable from "./equipment/EquipmentTable";

const EquipmentManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Mock equipment data
  const equipment = [
    {
      id: "EQ001",
      name: "Centrifuge Model X200",
      type: "Centrifuge",
      manufacturer: "LabTech Inc",
      serialNumber: "CT-2024-001",
      purchaseDate: "2023-01-15",
      lastMaintenance: "2024-05-15",
      nextMaintenance: "2024-08-15",
      status: "operational",
      location: "Lab Room A",
      condition: "excellent",
      warrantyExpiry: "2025-01-15"
    },
    {
      id: "EQ002",
      name: "Microscope Advanced Pro",
      type: "Microscope",
      manufacturer: "OpticalTech",
      serialNumber: "MS-2024-002",
      purchaseDate: "2023-03-20",
      lastMaintenance: "2024-05-20",
      nextMaintenance: "2024-08-20",
      status: "maintenance",
      location: "Lab Room B",
      condition: "good",
      warrantyExpiry: "2025-03-20"
    },
    {
      id: "EQ003",
      name: "Chemistry Analyzer CA-500",
      type: "Analyzer",
      manufacturer: "ChemLab Systems",
      serialNumber: "CA-2024-003",
      purchaseDate: "2022-11-10",
      lastMaintenance: "2024-04-10",
      nextMaintenance: "2024-07-10",
      status: "needs-repair",
      location: "Lab Room C",
      condition: "fair",
      warrantyExpiry: "2024-11-10"
    }
  ];

  const filteredEquipment = equipment.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <EquipmentHeader 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      <EquipmentStats />

      <MaintenanceAlerts equipment={equipment} />

      <EquipmentTable equipment={filteredEquipment} />
    </div>
  );
};

export default EquipmentManagement;
