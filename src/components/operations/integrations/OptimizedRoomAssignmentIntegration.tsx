
import { useState, memo, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { 
  Warehouse, 
  Clock, 
  DollarSign, 
  CheckCircle
} from "lucide-react";
import { useRoomAssignment } from "@/hooks/useRoomAssignment";
import OptimizedMetricCard from "../shared/ui/OptimizedMetricCard";
import OptimizedStatsGrid from "../shared/ui/OptimizedStatsGrid";
import DashboardSection from "../shared/ui/DashboardSection";
import ErrorBoundary from "../shared/ErrorBoundary";
import HorseAwaitingCard from "./room-assignment/HorseAwaitingCard";
import RoomCard from "./room-assignment/RoomCard";
import RoomAssignmentDialog from "./room-assignment/RoomAssignmentDialog";

const OptimizedRoomAssignmentIntegration = memo(() => {
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

  // Memoized calculations to prevent recalculation on every render
  const averageDailyRate = useMemo(() => {
    const rates = availableRooms.map(r => r.pricing?.dailyRate || 0);
    return rates.length > 0 ? Math.round(rates.reduce((sum, rate) => sum + rate, 0) / rates.length) : 0;
  }, [availableRooms]);

  const readyForAssignmentCount = useMemo(() => {
    return availableRooms.filter(r => r.status === 'available').length;
  }, [availableRooms]);

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
    <ErrorBoundary>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">Room Assignment Integration</h2>
          <p className="text-muted-foreground">
            Intelligent room assignment with automated supply and billing setup
          </p>
        </div>

        {/* Quick Stats */}
        <OptimizedStatsGrid columns={4}>
          <OptimizedMetricCard
            label="Available Rooms"
            value={availableRooms.length}
            icon={Warehouse}
            iconColor="text-blue-500"
          />
          <OptimizedMetricCard
            label="Awaiting Assignment"
            value={awaitingAssignment.length}
            icon={Clock}
            iconColor="text-orange-500"
          />
          <OptimizedMetricCard
            label="Avg. Daily Rate"
            value={`$${averageDailyRate}`}
            icon={DollarSign}
            iconColor="text-green-500"
          />
          <OptimizedMetricCard
            label="Ready for Assignment"
            value={readyForAssignmentCount}
            icon={CheckCircle}
            iconColor="text-purple-500"
          />
        </OptimizedStatsGrid>

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
    </ErrorBoundary>
  );
});

OptimizedRoomAssignmentIntegration.displayName = "OptimizedRoomAssignmentIntegration";

export default OptimizedRoomAssignmentIntegration;
