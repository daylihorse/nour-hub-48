
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";
import { 
  Warehouse, 
  Clock, 
  DollarSign, 
  CheckCircle
} from "lucide-react";
import { useRoomAssignment } from "@/hooks/useRoomAssignment";
import MetricCard from "../shared/ui/MetricCard";
import StatsGrid from "../shared/ui/StatsGrid";
import DashboardSection from "../shared/ui/DashboardSection";
import HorseAwaitingCard from "./room-assignment/HorseAwaitingCard";
import RoomCard from "./room-assignment/RoomCard";
import RoomAssignmentDialog from "./room-assignment/RoomAssignmentDialog";

const RoomAssignmentIntegration = () => {
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  
  const {
    availableRooms,
    awaitingAssignment,
    selectedRoom,
    setSelectedRoom,
    selectedHorse,
    setSelectedHorse,
    getRecommendedRoom,
    calculateCosts,
    assignRoom,
    setupSuppliesForRoom,
    createBillingAccount
  } = useRoomAssignment();

  const handleRoomAssignment = () => {
    if (selectedRoom && selectedHorse) {
      assignRoom(selectedRoom, selectedHorse);
      setIsAssignDialogOpen(false);
      setSelectedRoom('');
      setSelectedHorse('');
    }
  };

  const handleOpenAssignDialog = (horseId?: string, recommendedRoomId?: string) => {
    if (horseId) setSelectedHorse(horseId);
    if (recommendedRoomId) setSelectedRoom(recommendedRoomId);
    setIsAssignDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Room Assignment Integration</h2>
        <p className="text-muted-foreground">
          Intelligent room assignment with automated supply and billing setup
        </p>
      </div>

      {/* Quick Stats */}
      <StatsGrid columns={4}>
        <MetricCard
          label="Available Rooms"
          value={availableRooms.length}
          icon={Warehouse}
          iconColor="text-blue-500"
        />
        <MetricCard
          label="Awaiting Assignment"
          value={awaitingAssignment.length}
          icon={Clock}
          iconColor="text-orange-500"
        />
        <MetricCard
          label="Avg. Daily Rate"
          value={`$${Math.round(availableRooms.reduce((sum, r) => sum + (r.pricing?.dailyRate || 0), 0) / availableRooms.length)}`}
          icon={DollarSign}
          iconColor="text-green-500"
        />
        <MetricCard
          label="Ready for Assignment"
          value={availableRooms.filter(r => r.status === 'available').length}
          icon={CheckCircle}
          iconColor="text-purple-500"
        />
      </StatsGrid>

      {/* Awaiting Assignment */}
      <DashboardSection 
        title="Horses Awaiting Room Assignment"
        headerActions={
          <Button onClick={() => setIsAssignDialogOpen(true)}>
            <Warehouse className="w-4 h-4 mr-2" />
            Assign Room
          </Button>
        }
      >
        <div className="space-y-4">
          {awaitingAssignment.map(horse => {
            const recommendedRoom = getRecommendedRoom(horse.id);
            return (
              <HorseAwaitingCard
                key={horse.id}
                horse={horse}
                recommendedRoom={recommendedRoom}
                onAssignRoom={handleOpenAssignDialog}
              />
            );
          })}
        </div>
      </DashboardSection>

      {/* Available Rooms */}
      <DashboardSection title="Available Rooms">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {availableRooms.map(room => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </DashboardSection>

      {/* Room Assignment Dialog */}
      <RoomAssignmentDialog
        isOpen={isAssignDialogOpen}
        onOpenChange={setIsAssignDialogOpen}
        horses={awaitingAssignment}
        rooms={availableRooms}
        selectedHorse={selectedHorse}
        setSelectedHorse={setSelectedHorse}
        selectedRoom={selectedRoom}
        setSelectedRoom={setSelectedRoom}
        calculateCosts={calculateCosts}
        onAssign={handleRoomAssignment}
        onSetupSupplies={setupSuppliesForRoom}
        onCreateBilling={createBillingAccount}
      />
    </div>
  );
};

export default RoomAssignmentIntegration;
