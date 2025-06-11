
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMareContext } from "@/contexts/MareContext";
import MareHeader from "./components/MareHeader";
import MareSummaryCard from "./components/MareSummaryCard";
import MareDetailTabs from "./components/MareDetailTabs";
import ActionDialog from "./components/ActionDialog";

const MareDetailView = () => {
  const { mareId } = useParams();
  const navigate = useNavigate();
  const { mares, error, clearError } = useMareContext();
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

  // Debug logging
  console.log('MareDetailView - mareId from params:', mareId);
  console.log('MareDetailView - available mares:', mares.map(m => ({ id: m.id, name: m.horseName })));
  console.log('MareDetailView - context error:', error);

  // Find the mare from the context
  const mare = mares.find(m => m.id === mareId);

  useEffect(() => {
    if (!mare && mareId) {
      console.error(`Mare with ID ${mareId} not found in context`);
    }
    
    // Clear any existing errors when component mounts
    if (error) {
      clearError();
    }
  }, [mare, mareId, error, clearError]);

  const handleBackToMares = () => {
    // Navigate back to horses department and switch to breeding tab, then mares sub-tab
    navigate("/dashboard/horses", { 
      state: { 
        activeTab: "breeding",
        breedingSubTab: "mares"
      } 
    });
  };

  const openActionDialog = (type: 'checkup' | 'breeding' | 'health' | 'birth', title: string) => {
    setActionDialog({ isOpen: true, type, title });
  };

  const closeActionDialog = () => {
    setActionDialog({ isOpen: false, type: null, title: '' });
  };

  // Error state
  if (error) {
    return (
      <div className="p-6">
        <div className="text-red-500 mb-4">Error: {error}</div>
        <button 
          onClick={handleBackToMares}
          className="text-blue-500 hover:underline"
        >
          Back to Mares
        </button>
      </div>
    );
  }

  // No mare ID provided
  if (!mareId) {
    return (
      <div className="p-6">
        <p className="text-red-500 mb-4">No mare ID provided in URL</p>
        <button 
          onClick={handleBackToMares}
          className="text-blue-500 hover:underline"
        >
          Back to Mares
        </button>
      </div>
    );
  }

  // Mare not found
  if (!mare) {
    return (
      <div className="p-6">
        <p className="text-red-500 mb-2">Mare with ID "{mareId}" not found</p>
        <p className="text-sm text-muted-foreground mb-4">
          Available mares: {mares.map(m => `${m.id} (${m.horseName})`).join(', ')}
        </p>
        <button 
          onClick={handleBackToMares}
          className="text-blue-500 hover:underline"
        >
          Back to Mares
        </button>
      </div>
    );
  }

  // Transform mare data for components that expect different format
  const transformedMare = {
    id: mare.id,
    name: mare.horseName,
    status: mare.status,
    age: mare.age,
    breed: mare.breed,
    image: "/placeholder.svg",
    pregnancyDay: mare.pregnancyDay,
    expectedDueDate: mare.expectedDueDate,
    totalFoals: mare.totalFoals,
    liveFoals: mare.liveFoals,
    lastBreedingDate: mare.lastBreedingDate,
    stallionName: mare.stallionName
  };

  return (
    <div className="space-y-6">
      <MareHeader mare={transformedMare} onBackToMares={handleBackToMares} />
      
      <MareSummaryCard mare={transformedMare} />

      <MareDetailTabs
        mareId={mare.id}
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
