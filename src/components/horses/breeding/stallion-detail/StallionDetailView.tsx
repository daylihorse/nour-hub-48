
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useStallionContext } from "@/contexts/StallionContext";
import { useStallionDetailNavigation } from "./hooks/useStallionDetailNavigation";
import { useStallionDetailState } from "./hooks/useStallionDetailState";
import StallionDetailErrorBoundary from "./components/StallionDetailErrorBoundary";
import StallionNotFoundError from "./components/StallionNotFoundError";
import StallionHeader from "./components/StallionHeader";
import StallionSummaryCard from "./components/StallionSummaryCard";
import StallionDetailTabs from "./components/StallionDetailTabs";
import ActionDialog from "./components/ActionDialog";

const StallionDetailView = () => {
  const { stallionId } = useParams();
  const { stallions, error, clearError } = useStallionContext();
  const { handleBackToStallions } = useStallionDetailNavigation();
  const {
    activeTab,
    setActiveTab,
    actionDialog,
    openActionDialog,
    closeActionDialog
  } = useStallionDetailState();

  // Debug logging
  console.log('StallionDetailView - stallionId from params:', stallionId);
  console.log('StallionDetailView - available stallions:', stallions.map(s => ({ id: s.id, name: s.horseName })));
  console.log('StallionDetailView - context error:', error);

  // Find the stallion from the context
  const stallion = stallions.find(s => s.id === stallionId);

  useEffect(() => {
    if (!stallion && stallionId) {
      console.error(`Stallion with ID ${stallionId} not found in context`);
    }
    
    // Clear any existing errors when component mounts
    if (error) {
      clearError();
    }
  }, [stallion, stallionId, error, clearError]);

  return (
    <StallionDetailErrorBoundary
      error={error}
      stallionId={stallionId}
      availableStallions={stallions.map(s => ({ id: s.id, horseName: s.horseName }))}
      onBackToStallions={handleBackToStallions}
    >
      {!stallion ? (
        <StallionNotFoundError
          stallionId={stallionId!}
          availableStallions={stallions.map(s => ({ id: s.id, horseName: s.horseName }))}
          onBackToStallions={handleBackToStallions}
        />
      ) : (
        <div className="space-y-6">
          <StallionHeader 
            stallion={{
              id: stallion.id,
              name: stallion.horseName,
              status: stallion.status,
              breed: stallion.breed,
              studFee: stallion.studFee,
              successRate: stallion.successRate
            }} 
            onBackToStallions={handleBackToStallions} 
          />
          
          <StallionSummaryCard 
            stallion={{
              id: stallion.id,
              name: stallion.horseName,
              status: stallion.status,
              breed: stallion.breed,
              studFee: stallion.studFee,
              successRate: stallion.successRate,
              totalMares: stallion.totalMares,
              successfulBreedings: stallion.successfulBreedings,
              livefoals: stallion.livefoals,
              nextAvailable: stallion.nextAvailable,
              bookings: stallion.bookings
            }} 
          />

          <StallionDetailTabs
            stallionId={stallion.id}
            activeTab={activeTab}
            onActiveTabChange={setActiveTab}
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
    </StallionDetailErrorBoundary>
  );
};

export default StallionDetailView;
