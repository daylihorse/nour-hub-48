
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Warehouse } from "lucide-react";
import { HorseAwaitingAssignment } from "@/hooks/useRoomAssignment";
import { Room } from "@/types/stableRooms";

interface RoomAssignmentDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  horses: HorseAwaitingAssignment[];
  rooms: Room[];
  selectedHorse: string;
  setSelectedHorse: (horseId: string) => void;
  selectedRoom: string;
  setSelectedRoom: (roomId: string) => void;
  calculateCosts: (roomId: string) => { daily: number; monthly: number; estimated: number };
  onAssign: () => void;
  onSetupSupplies: (roomId: string, horseId: string) => void;
  onCreateBilling: (roomId: string, horseId: string) => void;
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
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Room Assignment</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Select Horse</label>
            <Select value={selectedHorse} onValueChange={setSelectedHorse}>
              <SelectTrigger>
                <SelectValue placeholder="Choose horse..." />
              </SelectTrigger>
              <SelectContent>
                {horses.map(horse => (
                  <SelectItem key={horse.id} value={horse.id}>
                    {horse.name} - {horse.owner}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium">Select Room</label>
            <Select value={selectedRoom} onValueChange={setSelectedRoom}>
              <SelectTrigger>
                <SelectValue placeholder="Choose room..." />
              </SelectTrigger>
              <SelectContent>
                {rooms.map(room => (
                  <SelectItem key={room.id} value={room.id}>
                    {room.number} - {room.name} (${room.pricing?.dailyRate}/day)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedRoom && selectedHorse && (
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium mb-2">Assignment Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Daily Rate:</span>
                  <span>${calculateCosts(selectedRoom).daily}</span>
                </div>
                <div className="flex justify-between">
                  <span>Monthly Rate:</span>
                  <span>${calculateCosts(selectedRoom).monthly}</span>
                </div>
                <div className="flex justify-between">
                  <span>Est. 30-day Cost:</span>
                  <span>${calculateCosts(selectedRoom).estimated}</span>
                </div>
              </div>
              
              <div className="mt-3 space-y-2">
                <Button className="w-full" onClick={onAssign}>
                  Assign Room & Setup Integration
                </Button>
                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onSetupSupplies(selectedRoom, selectedHorse)}
                  >
                    Setup Supplies
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onCreateBilling(selectedRoom, selectedHorse)}
                  >
                    Create Billing
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RoomAssignmentDialog;
