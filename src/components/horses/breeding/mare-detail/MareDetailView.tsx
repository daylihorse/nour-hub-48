
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MareHeader from "./components/MareHeader";
import MareSummaryCard from "./components/MareSummaryCard";
import MareDetailTabs from "./components/MareDetailTabs";
import ActionDialog from "./components/ActionDialog";

const MareDetailView = () => {
  const { mareId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("basic-info");
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'table'>('grid');
  const [actionDialog, setActionDialog] = useState<{
    isOpen: boolean;
    type: 'checkup' | 'breeding' | 'health' | 'birth' | null;
    title: string;
  }>({
    isOpen: false,
    type: null,
    title: ''
  });

  // Mock mare data - in real app this would come from API based on mareId
  const mare = {
    id: mareId,
    name: "Luna Belle",
    status: "pregnant",
    age: 6,
    breed: "Arabian",
    image: "/placeholder.svg",
    pregnancyDay: 280,
    expectedDueDate: "2024-04-15",
    totalFoals: 2,
    liveFoals: 2,
    lastBreedingDate: "2023-07-20",
    stallionName: "Thunder Storm"
  };

  const handleBackToMares = () => {
    navigate("/dashboard/horses", { state: { activeTab: "breeding" } });
  };

  const openActionDialog = (type: 'checkup' | 'breeding' | 'health' | 'birth', title: string) => {
    setActionDialog({ isOpen: true, type, title });
  };

  const closeActionDialog = () => {
    setActionDialog({ isOpen: false, type: null, title: '' });
  };

  return (
    <div className="space-y-6">
      <MareHeader mare={mare} onBackToMares={handleBackToMares} />
      
      <MareSummaryCard mare={mare} />

      <MareDetailTabs
        mareId={mare.id || ""}
        activeTab={activeTab}
        viewMode={viewMode}
        onActiveTabChange={setActiveTab}
        onViewModeChange={setViewMode}
        onActionClick={openActionDialog}
      />

      <ActionDialog
        isOpen={actionDialog.isOpen}
        onClose={closeActionDialog}
        actionType={actionDialog.type}
        title={actionDialog.title}
      />
    </div>
  );
};

export default MareDetailView;
