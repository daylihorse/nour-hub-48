import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Horse, Heart } from "lucide-react";

// Mock horse data - in a real app this would come from an API or context
const mockHorses = [
  { id: "h1", name: "Thunder", breed: "Arabian" },
  { id: "h2", name: "Lightning", breed: "Thoroughbred" },
  { id: "h3", name: "Storm", breed: "Quarter Horse" },
  { id: "h4", name: "Shadow", breed: "Appaloosa" },
  { id: "h5", name: "Midnight", breed: "Friesian" },
  { id: "h6", name: "Apollo", breed: "Andalusian" },
  { id: "h7", name: "Phoenix", breed: "Mustang" },
  { id: "h8", name: "Spirit", breed: "Clydesdale" },
];

interface Paddock {
  id: string;
  name: string;
  number: string;
  capacity: number;
  currentOccupancy: number;
}

interface AssignHorseDialogProps {
  isOpen: boolean;
  onClose: () => void;
  paddock: Paddock | null;
  onAssign: (horseId: string, horseName: string, assignmentType: string, reason?: string) => void;
}

const AssignHorseDialog = ({
  isOpen,
  onClose,
  paddock,
  onAssign
}: AssignHorseDialogProps) => {
  const [selectedHorse, setSelectedHorse] = useState("");
  const [assignmentType, setAssignmentType] = useState("grazing");
  const [reason, setReason] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedHorse) return;
    
    const horse = mockHorses.find(h => h.id === selectedHorse);
    if (!horse) return;
    
    onAssign(selectedHorse, horse.name, assignmentType, reason);
    
    // Reset form
    setSelectedHorse("");
    setAssignmentType("grazing");
    setReason("");
    onClose();
  };

  const availableSpace = paddock ? paddock.capacity - paddock.currentOccupancy : 0;

  if (!paddock) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            <div className="flex items-center gap-2">
              <Horse className="h-5 w-5" />
              Assign Horse to {paddock.name}
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <div className="mb-4 p-3 bg-muted rounded-lg">
          <p className="text-sm font-medium">Paddock Information</p>
          <p className="text-sm text-muted-foreground">
            Available Space: {availableSpace} / {paddock.capacity} horses
          </p>
        </div>

        {availableSpace <= 0 ? (
          <div className="p-4 text-center">
            <p className="text-muted-foreground">
              This paddock is at full capacity. Please free up space before assigning new horses.
            </p>
            <Button variant="outline" className="mt-4" onClick={onClose}>
              Close
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="horse">Select Horse</Label>
              <Select value={selectedHorse} onValueChange={setSelectedHorse} required>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a horse" />
                </SelectTrigger>
                <SelectContent>
                  {mockHorses.map((horse) => (
                    <SelectItem key={horse.id} value={horse.id}>
                      <div className="flex items-center gap-2">
                        <Heart className="h-4 w-4" />
                        {horse.name} - {horse.breed}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="assignmentType">Assignment Type</Label>
              <Select value={assignmentType} onValueChange={setAssignmentType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="grazing">Grazing</SelectItem>
                  <SelectItem value="exercise">Exercise</SelectItem>
                  <SelectItem value="turnout">Turnout</SelectItem>
                  <SelectItem value="breeding">Breeding</SelectItem>
                  <SelectItem value="quarantine">Quarantine</SelectItem>
                  <SelectItem value="rehabilitation">Rehabilitation</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reason">Reason / Notes (Optional)</Label>
              <Textarea
                id="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Any additional notes about this assignment..."
                rows={3}
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={!selectedHorse}>
                Assign Horse
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AssignHorseDialog; 