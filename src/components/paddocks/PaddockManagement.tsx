
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { usePaddockService } from "@/hooks/usePaddockService";
import { useAuth } from "@/hooks/useAuth";
import { Paddock } from "@/types/paddocks";
import PaddockGridView from "./components/PaddockGridView";
import PaddockListView from "./components/PaddockListView";
import PaddockTableView from "./components/PaddockTableView";
import PaddockViewSelector from "./components/PaddockViewSelector";
import AddPaddockDialog from "./components/AddPaddockDialog";
import PaddockHorseAssignment from "./PaddockHorseAssignment";
import ErrorBoundary from "@/components/common/ErrorBoundary";
import ErrorDisplay from "@/components/common/ErrorDisplay";

const PaddockManagement = () => {
  const { currentTenant } = useAuth();
  const { usePaddocks, deletePaddock } = usePaddockService();
  const { data: paddocks = [], isLoading, error, refetch } = usePaddocks();
  
  const [viewMode, setViewMode] = useState<"grid" | "list" | "table">("grid");
  const [gridSize, setGridSize] = useState<2 | 3 | 4>(3);
  const [showAddDialog, setShowAddDialog] = useState(false);

  // Debug logging
  console.log('PaddockManagement render:', {
    currentTenant: currentTenant?.id,
    paddocksCount: paddocks.length,
    isLoading,
    error: error?.message
  });

  // Show error state if there's an error
  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold">Paddock Management</h2>
          <p className="text-muted-foreground">Manage your paddocks and grazing areas</p>
        </div>
        <ErrorDisplay
          title="Failed to load paddocks"
          message="There was an issue loading your paddock data. Please check your connection and try again."
          error={error}
          onRetry={() => refetch()}
          showDetails={true}
        />
      </div>
    );
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold">Paddock Management</h2>
          <p className="text-muted-foreground">Manage your paddocks and grazing areas</p>
        </div>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading paddocks...</div>
        </div>
      </div>
    );
  }

  // Show tenant info if no valid tenant
  if (!currentTenant) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold">Paddock Management</h2>
          <p className="text-muted-foreground">Manage your paddocks and grazing areas</p>
        </div>
        <ErrorDisplay
          title="No tenant selected"
          message="Please select a valid tenant to access paddock management features."
        />
      </div>
    );
  }

  // Handler functions for paddock actions
  const handleViewDetails = (paddock: Paddock) => {
    console.log("Viewing details for paddock:", paddock.name);
    // TODO: Implement paddock details view
  };

  const handleEditPaddock = (paddock: Paddock) => {
    console.log("Editing paddock:", paddock.name);
    // TODO: Implement paddock editing
  };

  const handleDeletePaddock = (paddock: Paddock) => {
    if (confirm(`Are you sure you want to delete paddock "${paddock.name}"?`)) {
      deletePaddock(paddock.id);
    }
  };

  const handleAssignHorse = (paddock: Paddock) => {
    console.log("Assigning horse to paddock:", paddock.name);
    // TODO: Implement horse assignment
  };

  // Utility functions for styling
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'occupied':
        return 'bg-blue-100 text-blue-800';
      case 'maintenance':
        return 'bg-orange-100 text-orange-800';
      case 'resting':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'grazing':
        return 'text-green-700 border-green-200';
      case 'exercise':
        return 'text-blue-700 border-blue-200';
      case 'turnout':
        return 'text-purple-700 border-purple-200';
      case 'quarantine':
        return 'text-red-700 border-red-200';
      default:
        return 'text-gray-700 border-gray-200';
    }
  };

  return (
    <ErrorBoundary>
      <div className="space-y-6">
        <Tabs defaultValue="paddocks" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="paddocks">Manage Paddocks</TabsTrigger>
            <TabsTrigger value="assignments">Horse Assignments</TabsTrigger>
          </TabsList>
          
          <TabsContent value="paddocks" className="space-y-4">
            {/* Header with actions */}
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold">Paddock Management</h2>
                <p className="text-muted-foreground">
                  Manage your paddocks and grazing areas
                  {currentTenant && (
                    <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {currentTenant.name}
                    </span>
                  )}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <PaddockViewSelector 
                  currentView={viewMode} 
                  onViewChange={setViewMode}
                  gridSize={gridSize}
                  onGridSizeChange={setGridSize}
                />
                <Button onClick={() => setShowAddDialog(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Paddock
                </Button>
              </div>
            </div>

            {/* Paddock Views */}
            {viewMode === "grid" && (
              <PaddockGridView 
                paddocks={paddocks}
                onViewDetails={handleViewDetails}
                onEditPaddock={handleEditPaddock}
                onDeletePaddock={handleDeletePaddock}
                onAssignHorse={handleAssignHorse}
                gridSize={gridSize}
                getStatusColor={getStatusColor}
                getTypeColor={getTypeColor}
              />
            )}
            {viewMode === "list" && (
              <PaddockListView 
                paddocks={paddocks}
                onViewDetails={handleViewDetails}
                onEditPaddock={handleEditPaddock}
                onDeletePaddock={handleDeletePaddock}
                onAssignHorse={handleAssignHorse}
                getStatusColor={getStatusColor}
                getTypeColor={getTypeColor}
              />
            )}
            {viewMode === "table" && (
              <PaddockTableView 
                paddocks={paddocks}
                onViewDetails={handleViewDetails}
                onEditPaddock={handleEditPaddock}
                onDeletePaddock={handleDeletePaddock}
                onAssignHorse={handleAssignHorse}
                getStatusColor={getStatusColor}
                getTypeColor={getTypeColor}
              />
            )}
          </TabsContent>
          
          <TabsContent value="assignments" className="space-y-4">
            <ErrorBoundary>
              <PaddockHorseAssignment />
            </ErrorBoundary>
          </TabsContent>
        </Tabs>

        <AddPaddockDialog 
          open={showAddDialog} 
          onOpenChange={setShowAddDialog}
        />
      </div>
    </ErrorBoundary>
  );
};

export default PaddockManagement;
