
import { useState } from "react";
import { useStableRoomsData } from "@/hooks/useStableRoomsData";
import InteractiveFloorPlan from "./floor-plan/InteractiveFloorPlan";
import RoomDetailsPanel from "./floor-plan/RoomDetailsPanel";
import FloorPlanControls from "./floor-plan/FloorPlanControls";
import FloorPlanStats from "./floor-plan/FloorPlanStats";
import EditRoomDialog from "./dialogs/EditRoomDialog";
import CreateAssignmentDialog from "./dialogs/CreateAssignmentDialog";

const FloorPlanVisualization = () => {
  const [selectedBuilding, setSelectedBuilding] = useState("building-a");
  const [selectedFloor, setSelectedFloor] = useState("ground");
  const [zoom, setZoom] = useState(100);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [editingRoom, setEditingRoom] = useState<any>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);

  const { 
    rooms, 
    updateRoom, 
    createAssignment, 
    getAvailableRooms 
  } = useStableRoomsData();

  // Mock buildings data
  const buildings = [
    { id: "building-a", name: "Building A - Main Stable", floors: ["ground", "loft"] },
    { id: "building-b", name: "Building B - Paddock Complex", floors: ["ground"] },
    { id: "warehouse", name: "Warehouse Complex", floors: ["ground", "mezzanine"] }
  ];

  // Filter rooms based on current building/floor and filters
  const filteredRooms = rooms.filter(room => {
    // Building/floor filter (mock logic - in real app this would be based on room location)
    const matchesLocation = true; // All rooms shown for demo
    
    // Search filter
    const matchesSearch = searchTerm === "" || 
      room.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (room.assignedTo?.entityName.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);
    
    // Status filter
    const matchesStatus = statusFilter === "all" || room.status === statusFilter;
    
    // Type filter
    const matchesType = typeFilter === "all" || room.type === typeFilter;
    
    return matchesLocation && matchesSearch && matchesStatus && matchesType;
  });

  const selectedRoomData = rooms.find(room => room.id === selectedRoom);
  const availableRooms = getAvailableRooms();

  const handleEditRoom = (room: any) => {
    setEditingRoom(room);
    setIsEditDialogOpen(true);
  };

  const handleAssignRoom = (room: any) => {
    setEditingRoom(room);
    setIsAssignDialogOpen(true);
  };

  const handleUpdateRoom = (updatedRoom: any) => {
    updateRoom(updatedRoom);
    setIsEditDialogOpen(false);
  };

  const handleCreateAssignment = (assignment: any) => {
    createAssignment(assignment);
    setIsAssignDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold">Enhanced Floor Plan Visualization</h2>
        <p className="text-muted-foreground">Interactive facility layout with real-time data and advanced features</p>
      </div>

      {/* Statistics Overview */}
      <FloorPlanStats 
        rooms={filteredRooms}
        selectedBuilding={selectedBuilding}
        selectedFloor={selectedFloor}
        buildings={buildings}
      />

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Controls Panel */}
        <div className="xl:col-span-1">
          <FloorPlanControls
            buildings={buildings}
            selectedBuilding={selectedBuilding}
            selectedFloor={selectedFloor}
            onBuildingChange={setSelectedBuilding}
            onFloorChange={setSelectedFloor}
            zoom={zoom}
            onZoomChange={setZoom}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            typeFilter={typeFilter}
            onTypeFilterChange={setTypeFilter}
          />
        </div>

        {/* Main Floor Plan */}
        <div className="xl:col-span-2">
          <InteractiveFloorPlan
            rooms={filteredRooms}
            selectedRoom={selectedRoom}
            onRoomSelect={setSelectedRoom}
            zoom={zoom}
            onZoomChange={setZoom}
            building={selectedBuilding}
            floor={selectedFloor}
          />
        </div>

        {/* Room Details Panel */}
        <div className="xl:col-span-1">
          <RoomDetailsPanel
            room={selectedRoomData || null}
            onEdit={handleEditRoom}
            onAssign={handleAssignRoom}
            onMaintenance={() => {}}
          />
        </div>
      </div>

      {/* Edit Room Dialog */}
      <EditRoomDialog
        room={editingRoom}
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onUpdateRoom={handleUpdateRoom}
      />

      {/* Create Assignment Dialog */}
      <CreateAssignmentDialog
        onCreateAssignment={handleCreateAssignment}
        availableRooms={availableRooms.map(room => ({
          id: room.id,
          number: room.number,
          name: room.name
        }))}
      />
    </div>
  );
};

export default FloorPlanVisualization;
