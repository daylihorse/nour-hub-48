import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Users, AlertCircle } from "lucide-react";
import { Paddock } from "@/types/paddocks";

interface AssignHorseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  paddock: Paddock;
  onSubmit: (horseId: string, horseName: string, notes?: string) => void;
}

// Mock horses data - in real app, this would come from API
const mockHorses = [
  { id: '1', name: 'Thunder', status: 'available' },
  { id: '2', name: 'Lightning', status: 'available' },
  { id: '3', name: 'Storm', status: 'available' },
  { id: '4', name: 'Blaze', status: 'available' },
  { id: '5', name: 'Spirit', status: 'available' },
  { id: '6', name: 'Midnight', status: 'assigned' },
  { id: '7', name: 'Star', status: 'available' },
  { id: '8', name: 'Diamond', status: 'medical' },
];

const AssignHorseDialog = ({ open, onOpenChange, paddock, onSubmit }: AssignHorseDialogProps) => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm();

  const selectedHorseId = watch("horseId");
  const selectedHorse = mockHorses.find(h => h.id === selectedHorseId);
  const availableHorses = mockHorses.filter(h => h.status === 'available');
  const assignedHorseIds = paddock.assignedHorses?.map(h => h.horseId) || [];
  const unassignedHorses = availableHorses.filter(h => !assignedHorseIds.includes(h.id));
  
  const remainingCapacity = paddock.capacity - paddock.currentOccupancy;
  const canAssignMore = remainingCapacity > 0;

  const handleFormSubmit = async (data: any) => {
    if (!selectedHorse) return;
    
    setLoading(true);
    try {
      await onSubmit(selectedHorse.id, selectedHorse.name, data.notes);
      reset();
    } catch (error) {
      console.error("Failed to assign horse:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Assign Horse to Paddock
          </DialogTitle>
          <DialogDescription>
            Assign a horse to {paddock.name} ({paddock.number})
          </DialogDescription>
        </DialogHeader>

        {/* Paddock Status */}
        <div className="p-4 bg-muted/50 rounded-lg space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Current Occupancy:</span>
            <Badge variant={canAssignMore ? "secondary" : "destructive"}>
              {paddock.currentOccupancy}/{paddock.capacity} horses
            </Badge>
          </div>
          {!canAssignMore && (
            <div className="flex items-center gap-2 text-sm text-destructive">
              <AlertCircle className="h-4 w-4" />
              Paddock is at full capacity
            </div>
          )}
          {remainingCapacity > 0 && (
            <div className="text-sm text-muted-foreground">
              {remainingCapacity} space{remainingCapacity !== 1 ? 's' : ''} remaining
            </div>
          )}
        </div>

        {/* Current Assigned Horses */}
        {paddock.assignedHorses && paddock.assignedHorses.length > 0 && (
          <div className="space-y-2">
            <Label className="text-sm font-medium">Currently Assigned:</Label>
            <div className="flex flex-wrap gap-2">
              {paddock.assignedHorses.map((horse) => (
                <Badge key={horse.horseId} variant="outline">
                  {horse.horseName}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {canAssignMore && unassignedHorses.length > 0 ? (
          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="horseId">Select Horse *</Label>
              <Select onValueChange={(value) => setValue("horseId", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a horse to assign" />
                </SelectTrigger>
                <SelectContent>
                  {unassignedHorses.map((horse) => (
                    <SelectItem key={horse.id} value={horse.id}>
                      {horse.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.horseId && <p className="text-sm text-destructive">Please select a horse</p>}
            </div>

            {selectedHorse && (
              <div className="p-3 bg-primary/5 rounded-lg">
                <div className="text-sm font-medium">Selected Horse:</div>
                <div className="text-lg">{selectedHorse.name}</div>
                <Badge variant="secondary" className="mt-1">
                  {selectedHorse.status}
                </Badge>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="notes">Assignment Notes (Optional)</Label>
              <Textarea
                id="notes"
                {...register("notes")}
                placeholder="Any special notes about this assignment..."
                rows={3}
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading || !selectedHorse}>
                {loading ? "Assigning..." : "Assign Horse"}
              </Button>
            </DialogFooter>
          </form>
        ) : (
          <div className="space-y-4">
            {!canAssignMore && (
              <div className="text-center text-muted-foreground py-8">
                <AlertCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                <p>This paddock is at full capacity.</p>
                <p className="text-sm">Remove some horses before assigning new ones.</p>
              </div>
            )}

            {canAssignMore && unassignedHorses.length === 0 && (
              <div className="text-center text-muted-foreground py-8">
                <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                <p>No available horses to assign.</p>
                <p className="text-sm">All horses are either already assigned or unavailable.</p>
              </div>
            )}

            <DialogFooter>
              <Button variant="outline" onClick={handleClose}>
                Close
              </Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AssignHorseDialog;