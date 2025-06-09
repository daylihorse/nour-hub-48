
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Heart, Warehouse, DollarSign, Package, CreditCard } from "lucide-react";

interface RoomAssignmentDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  horses: any[];
  rooms: any[];
  selectedHorse: string;
  setSelectedHorse: (horseId: string) => void;
  selectedRoom: string;
  setSelectedRoom: (roomId: string) => void;
  calculateCosts: (roomId: string, duration: number, period: 'daily' | 'weekly' | 'monthly') => number;
  onAssign: () => void;
  onSetupSupplies: (roomId: string) => Promise<void>;
  onCreateBilling: (horseId: string, roomId: string) => Promise<void>;
}

const RoomAssignmentDialog = ({
  isOpen,
  onOpenChange,
  horses,
  rooms,
  selectedHorse,
  setSelectedHorse,
  selectedRoom,
  setSelectedRoom,
  calculateCosts,
  onAssign,
  onSetupSupplies,
  onCreateBilling
}: RoomAssignmentDialogProps) => {
  const selectedHorseData = horses.find(h => h.id === selectedHorse);
  const selectedRoomData = rooms.find(r => r.id === selectedRoom);
  const estimatedCost = selectedRoom ? calculateCosts(selectedRoom, 1, 'daily') : 0;

  const handleFullAssignment = async () => {
    if (selectedRoom && selectedHorse) {
      await onSetupSupplies(selectedRoom);
      await onCreateBilling(selectedHorse, selectedRoom);
      onAssign();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Assign Room</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Horse Selection */}
          <div>
            <label className="text-sm font-medium mb-2 block">Select Horse</label>
            <Select value={selectedHorse} onValueChange={setSelectedHorse}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a horse" />
              </SelectTrigger>
              <SelectContent>
                {horses.map(horse => (
                  <SelectItem key={horse.id} value={horse.id}>
                    <div className="flex items-center gap-2">
                      <Heart className="h-4 w-4" />
                      {horse.name} ({horse.breed})
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Room Selection */}
          <div>
            <label className="text-sm font-medium mb-2 block">Select Room</label>
            <Select value={selectedRoom} onValueChange={setSelectedRoom}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a room" />
              </SelectTrigger>
              <SelectContent>
                {rooms.filter(room => room.status === 'available').map(room => (
                  <SelectItem key={room.id} value={room.id}>
                    <div className="flex items-center gap-2">
                      <Warehouse className="h-4 w-4" />
                      {room.name} - ${room.pricing.dailyRate}/day
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Assignment Summary */}
          {selectedHorseData && selectedRoomData && (
            <Card>
              <CardContent className="p-4">
                <h4 className="font-medium mb-3">Assignment Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Horse:</span>
                    <span>{selectedHorseData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Room:</span>
                    <span>{selectedRoomData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Daily Rate:</span>
                    <span>${selectedRoomData.pricing.dailyRate}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-medium">
                    <span>Estimated Daily Cost:</span>
                    <span>${estimatedCost}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex justify-between">
            <div className="space-x-2">
              <Button 
                variant="outline" 
                size="sm"
                disabled={!selectedRoom}
                onClick={() => selectedRoom && onSetupSupplies(selectedRoom)}
              >
                <Package className="h-4 w-4 mr-2" />
                Setup Supplies
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                disabled={!selectedHorse || !selectedRoom}
                onClick={() => selectedHorse && selectedRoom && onCreateBilling(selectedHorse, selectedRoom)}
              >
                <CreditCard className="h-4 w-4 mr-2" />
                Create Billing
              </Button>
            </div>
            
            <div className="space-x-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleFullAssignment}
                disabled={!selectedHorse || !selectedRoom}
              >
                <DollarSign className="h-4 w-4 mr-2" />
                Assign & Setup All
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RoomAssignmentDialog;
