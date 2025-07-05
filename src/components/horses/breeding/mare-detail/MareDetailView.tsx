
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useMareContext } from "@/contexts/MareContext";
import { useMareDetailNavigation } from "./hooks/useMareDetailNavigation";
import { useMareDetailState } from "./hooks/useMareDetailState";
import MareDetailErrorBoundary from "./components/MareDetailErrorBoundary";
import MareNotFoundError from "./components/MareNotFoundError";
import MareHeader from "./components/MareHeader";
import MareSummaryCard from "./components/MareSummaryCard";
import MareDetailTabs from "./components/MareDetailTabs";
import ActionDialog from "./components/ActionDialog";

const MareDetailView = () => {
  const { mareId } = useParams();
  const { mares, error, clearError } = useMareContext();
  const { handleBackToMares } = useMareDetailNavigation();
  const {
    activeTab,
    setActiveTab,
    viewMode,
    setViewMode,
    actionDialog,
    openActionDialog,
    closeActionDialog
  } = useMareDetailState();

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

  const handleViewModeChange = (mode: 'grid' | 'list' | 'table') => {
    setViewMode(mode);
  };

  return (
    <MareDetailErrorBoundary
      error={error}
      mareId={mareId}
      availableMares={mares.map(m => ({ id: m.id, horseName: m.horseName }))}
      onBackToMares={handleBackToMares}
    >
      {!mare ? (
        <MareNotFoundError
          mareId={mareId!}
          availableMares={mares.map(m => ({ id: m.id, horseName: m.horseName }))}
          onBackToMares={handleBackToMares}
        />
      ) : (
        <div className="space-y-6">
          <MareHeader 
            mare={{
              id: mare.id,
              name: mare.horseName,
              status: mare.status,
              age: mare.age,
              breed: mare.breed
            }} 
            onBackToMares={handleBackToMares} 
          />
          
          <MareSummaryCard 
            mare={{
              id: mare.id,
              name: mare.horseName,
              status: mare.status,
              age: mare.age,
              breed: mare.breed,
              pregnancyDay: mare.pregnancyDay,
              expectedDueDate: mare.expectedDueDate,
              totalFoals: mare.totalFoals,
              liveFoals: mare.liveFoals,
              lastBreedingDate: mare.lastBreedingDate,
              stallionName: mare.stallionName
            }} 
          />

          <MareDetailTabs
            mareId={mare.id}
            activeTab={activeTab}
            viewMode={viewMode}
            onActiveTabChange={setActiveTab}
            onViewModeChange={handleViewModeChange}
            onActionClick={openActionDialog}
          />

          <ActionDialog
            isOpen={actionDialog.isOpen}
            onClose={closeActionDialog}
            actionType={actionDialog.type}
            title={actionDialog.title}
          />
        </div>
      )}
    </MareDetailErrorBoundary>
  );
};

export default MareDetailView;
