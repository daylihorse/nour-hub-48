import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Plus, MapPin, Edit2, Trash2, Users, Calendar } from "lucide-react";
import { usePaddockData } from "@/hooks/usePaddockData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import PaddockHorseAssignment from "./PaddockHorseAssignment";
import PaddockAnalytics from "./PaddockAnalytics";
import PaddockEnvironmentalMonitoring from "./PaddockEnvironmentalMonitoring";
import PaddockViewSelector, { ViewMode, GridSize } from "./components/PaddockViewSelector";
import PaddockGridView from "./components/PaddockGridView";
import PaddockListView from "./components/PaddockListView";
import PaddockTableView from "./components/PaddockTableView";
import AddPaddockDialog from "./components/AddPaddockDialog";
import PaddockDetailsDialog from "./components/PaddockDetailsDialog";
import DeleteConfirmationDialog from "./components/DeleteConfirmationDialog";
import EditPaddockDialog from "./components/EditPaddockDialog";
import AssignHorseDialog from "./components/AssignHorseDialog";

/**
 * Component: PaddockManagement
 * 
 * PURPOSE:
 * Comprehensive paddock management system providing centralized control for
 * all paddock-related operations including horse assignments, maintenance scheduling,
 * rotation planning, environmental monitoring, and performance analytics.
 * 
 * ARCHITECTURAL PATTERN:
 * - Tab-based navigation for different management aspects
 * - Centralized data management through custom hooks
 * - Modular component architecture for scalability
 * - Responsive design with filtering and search capabilities
 * 
 * DESIGN PRINCIPLES:
 * - Single-page application approach with tabbed interface
 * - Real-time filtering and search functionality
 * - Visual status indicators and type categorization
 * - Consistent UI patterns across all management areas
 * 
 * OPERATIONAL CONTEXT:
 * This component serves as the main interface for paddock operations:
 * - Daily paddock status monitoring and management
 * - Horse assignment and movement coordination
 * - Maintenance task scheduling and tracking
 * - Environmental condition monitoring and control
 * - Rotation planning for optimal pasture management
 * - Performance analytics and reporting
 * 
 * MANAGEMENT FEATURES:
 * The system provides comprehensive paddock lifecycle management:
 * - Real-time paddock status and availability tracking
 * - Multi-criteria filtering (status, type, occupancy)
 * - Quick action buttons for common operations
 * - Visual indicators for immediate status recognition
 * 
 * INTEGRATION CONTEXT:
 * Integrates with housing service, horse management, and maintenance systems.
 * Supports both manual operations and automated management workflows
 * through environmental monitoring and scheduling systems.
 * 
 * ACCESSIBILITY FEATURES:
 * - Keyboard navigation support for all interactive elements
 * - Screen reader friendly with proper ARIA labels
 * - High contrast design for status indicators
 * - Responsive layout for various screen sizes and devices
 */
const PaddockManagement = () => {
  /** Hook providing paddock data and management operations */
  const { paddocks, deletePaddock, createPaddock, updatePaddock, assignHorseToPaddock } = usePaddockData();
  const { toast } = useToast();
  
  /** Search term state for filtering paddocks by name or number */
  const [searchTerm, setSearchTerm] = useState("");
  
  /** Status filter state for filtering by paddock availability status */
  const [statusFilter, setStatusFilter] = useState("all");
  
  /** Type filter state for filtering by paddock functional type */
  const [typeFilter, setTypeFilter] = useState("all");

  /** View mode and grid size states */
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [gridSize, setGridSize] = useState<GridSize>(3);

  /** Dialog states */
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showAssignHorseDialog, setShowAssignHorseDialog] = useState(false);
  const [selectedPaddock, setSelectedPaddock] = useState<any>(null);

  /**
   * Determines the appropriate color scheme for paddock status badges.
   * 
   * STATUS COLOR MAPPING:
   * - occupied: Green for paddocks currently housing horses
   * - available: Blue for ready-to-use empty paddocks
   * - maintenance: Orange for paddocks under maintenance
   * - reserved: Purple for paddocks reserved for specific use
   * - default: Gray for undefined or transitional states
   * 
   * @param status The current paddock status
   * @returns CSS classes for badge styling
   */
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'occupied': return 'bg-green-500 text-white';
      case 'available': return 'bg-blue-500 text-white';
      case 'maintenance': return 'bg-orange-500 text-white';
      case 'reserved': return 'bg-purple-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  /**
   * Determines the appropriate color scheme for paddock type badges.
   * 
   * TYPE COLOR MAPPING:
   * - grazing: Green for pasture and feeding areas
   * - exercise: Blue for training and exercise paddocks
   * - turnout: Yellow for general horse turnout areas
   * - breeding: Pink for specialized breeding paddocks
   * - quarantine: Red for isolation and quarantine areas
   * - rehabilitation: Purple for medical recovery areas
   * - default: Gray for unspecified or general purpose paddocks
   * 
   * @param type The paddock functional type
   * @returns CSS classes for badge styling
   */
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'grazing': return 'bg-green-100 text-green-800';
      case 'exercise': return 'bg-blue-100 text-blue-800';
      case 'turnout': return 'bg-yellow-100 text-yellow-800';
      case 'breeding': return 'bg-pink-100 text-pink-800';
      case 'quarantine': return 'bg-red-100 text-red-800';
      case 'rehabilitation': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  /**
   * Filters paddocks based on search term and selected filter criteria.
   * 
   * FILTERING LOGIC:
   * - Text search: Matches paddock name or number (case-insensitive)
   * - Status filter: Matches exact status or 'all' for no filtering
   * - Type filter: Matches exact type or 'all' for no filtering
   * 
   * @returns Array of paddocks matching all filter criteria
   */
  const filteredPaddocks = paddocks.filter(paddock => {
    const matchesSearch = paddock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         paddock.number.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || paddock.status === statusFilter;
    const matchesType = typeFilter === "all" || paddock.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  /** Handle add new paddock */
  const handleAddPaddock = (paddockData: any) => {
    const newPaddock = createPaddock(paddockData);
    if (newPaddock) {
      toast({
        title: "Success",
        description: `Paddock ${newPaddock.name} created successfully`,
      });
    }
  };

  /** Handle view paddock details */
  const handleViewDetails = (paddock: any) => {
    setSelectedPaddock(paddock);
    setShowDetailsDialog(true);
  };

  /** Handle edit paddock */
  const handleEditPaddock = (paddock: any) => {
    setSelectedPaddock(paddock);
    setShowEditDialog(true);
  };

  /** Handle delete paddock */
  const handleDeletePaddock = (paddock: any) => {
    setSelectedPaddock(paddock);
    setShowDeleteDialog(true);
  };

  /** Handle assign horse to paddock */
  const handleAssignHorse = (paddock: any) => {
    setSelectedPaddock(paddock);
    setShowAssignHorseDialog(true);
  };

  /** Handle delete confirmation */
  const handleDeleteConfirm = () => {
    if (selectedPaddock) {
      deletePaddock(selectedPaddock.id);
      toast({
        title: "Paddock Deleted",
        description: `${selectedPaddock.name} has been removed`,
        variant: "destructive",
      });
      setShowDeleteDialog(false);
      setSelectedPaddock(null);
    }
  };

  /** Handle edit save */
  const handleEditSave = (updatedPaddock: any) => {
    if (updatePaddock(updatedPaddock.id, updatedPaddock)) {
      toast({
        title: "Success",
        description: `Paddock ${updatedPaddock.name} updated successfully`,
      });
      setShowEditDialog(false);
      setSelectedPaddock(null);
    }
  };

  /** Handle horse assignment */
  const handleHorseAssignment = (horseId: string, horseName: string, assignmentType: string, reason?: string) => {
    if (selectedPaddock && assignHorseToPaddock(horseId, horseName, selectedPaddock.id, reason)) {
      toast({
        title: "Horse Assigned",
        description: `${horseName} has been assigned to ${selectedPaddock.name}`,
      });
      setShowAssignHorseDialog(false);
      setSelectedPaddock(null);
    }
  };

  /** Render the appropriate view based on viewMode */
  const renderPaddockView = () => {
    const viewProps = {
      paddocks: filteredPaddocks,
      onViewDetails: handleViewDetails,
      onEditPaddock: handleEditPaddock,
      onDeletePaddock: handleDeletePaddock,
      onAssignHorse: handleAssignHorse,
      getStatusColor,
      getTypeColor,
    };

    switch (viewMode) {
      case "grid":
        return <PaddockGridView {...viewProps} gridSize={gridSize} />;
      case "list":
        return <PaddockListView {...viewProps} />;
      case "table":
        return <PaddockTableView {...viewProps} />;
      default:
        return <PaddockGridView {...viewProps} gridSize={gridSize} />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Paddock Management</h2>
          <p className="text-muted-foreground">Manage pastures, exercise areas, and turnout paddocks</p>
        </div>
        <Button 
          className="flex items-center gap-2"
          onClick={() => setShowAddDialog(true)}
        >
          <Plus className="h-4 w-4" />
          Add New Paddock
        </Button>
      </div>

      <Tabs defaultValue="paddocks">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="paddocks">Paddocks</TabsTrigger>
          <TabsTrigger value="assignments">Horse Assignments</TabsTrigger>
          <TabsTrigger value="environmental">Environmental</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="paddocks">
          {/* Filters and View Controls */}
          <Card className="mb-6">
        <CardContent className="p-4">
              <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search paddocks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="occupied">Occupied</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="reserved">Reserved</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="grazing">Grazing</SelectItem>
                <SelectItem value="exercise">Exercise</SelectItem>
                <SelectItem value="turnout">Turnout</SelectItem>
                <SelectItem value="breeding">Breeding</SelectItem>
                <SelectItem value="quarantine">Quarantine</SelectItem>
                <SelectItem value="rehabilitation">Rehabilitation</SelectItem>
              </SelectContent>
            </Select>
          </div>
                
                <PaddockViewSelector
                  currentView={viewMode}
                  onViewChange={setViewMode}
                  gridSize={gridSize}
                  onGridSizeChange={setGridSize}
                />
              </div>
            </CardContent>
          </Card>

          {/* Paddock Views */}
          {filteredPaddocks.length > 0 ? (
            renderPaddockView()
          ) : (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">No paddocks found matching your criteria.</p>
          </CardContent>
        </Card>
      )}
        </TabsContent>
        
        <TabsContent value="assignments">
          <PaddockHorseAssignment />
        </TabsContent>
        
        <TabsContent value="environmental">
          <PaddockEnvironmentalMonitoring />
        </TabsContent>
        
        <TabsContent value="analytics">
          <PaddockAnalytics />
        </TabsContent>
      </Tabs>

      {/* Dialogs */}
      <AddPaddockDialog
        isOpen={showAddDialog}
        onClose={() => setShowAddDialog(false)}
        onAddPaddock={handleAddPaddock}
      />

      <PaddockDetailsDialog
        paddock={selectedPaddock}
        isOpen={showDetailsDialog}
        onClose={() => {
          setShowDetailsDialog(false);
          setSelectedPaddock(null);
        }}
        onEdit={handleEditPaddock}
        getStatusColor={getStatusColor}
        getTypeColor={getTypeColor}
      />

      <EditPaddockDialog
        paddock={selectedPaddock}
        isOpen={showEditDialog}
        onClose={() => {
          setShowEditDialog(false);
          setSelectedPaddock(null);
        }}
        onSave={handleEditSave}
      />

      <DeleteConfirmationDialog
        open={showDeleteDialog}
        onOpenChange={(open) => !open && setShowDeleteDialog(false)}
        onConfirm={handleDeleteConfirm}
        recordId={selectedPaddock?.id}
        recordType="paddock"
      />

      <AssignHorseDialog
        isOpen={showAssignHorseDialog}
        onClose={() => {
          setShowAssignHorseDialog(false);
          setSelectedPaddock(null);
        }}
        paddock={selectedPaddock}
        onAssign={handleHorseAssignment}
      />
    </div>
  );
};

export default PaddockManagement;
