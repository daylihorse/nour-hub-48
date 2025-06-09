
import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogTrigger 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Plus, Calendar as CalendarIcon, UserPlus } from "lucide-react";
import { format } from "date-fns";
import { Assignment } from "@/types/stableRooms";

interface CreateAssignmentDialogProps {
  onCreateAssignment: (assignment: Omit<Assignment, 'id'>) => void;
  availableRooms: { id: string; number: string; name: string }[];
}

const CreateAssignmentDialog = ({ onCreateAssignment, availableRooms }: CreateAssignmentDialogProps) => {
  const [open, setOpen] = useState(false);
  const [assignedDate, setAssignedDate] = useState<Date>(new Date());
  const [expectedVacate, setExpectedVacate] = useState<Date | undefined>(undefined);
  const [formData, setFormData] = useState({
    roomId: "",
    entityType: "horse" as Assignment['entityType'],
    entityId: "",
    entityName: "",
    assignedBy: "",
    notes: "",
    dailyRate: 0
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newAssignment: Omit<Assignment, 'id'> = {
      roomId: formData.roomId,
      entityType: formData.entityType,
      entityId: formData.entityId,
      entityName: formData.entityName,
      assignedDate,
      expectedVacate,
      status: 'active',
      assignedBy: formData.assignedBy,
      notes: formData.notes || undefined,
      cost: formData.dailyRate > 0 ? {
        dailyRate: formData.dailyRate,
        totalCost: 0, // Will be calculated based on duration
        currency: "USD"
      } : undefined
    };

    onCreateAssignment(newAssignment);
    setOpen(false);
    // Reset form
    setFormData({
      roomId: "",
      entityType: "horse",
      entityId: "",
      entityName: "",
      assignedBy: "",
      notes: "",
      dailyRate: 0
    });
    setAssignedDate(new Date());
    setExpectedVacate(undefined);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Assignment
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-6 -mx-6 -mt-6 mb-6 rounded-t-lg">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary-foreground/20 rounded-lg">
              <UserPlus className="h-5 w-5" />
            </div>
            <div>
              <DialogTitle className="text-lg font-semibold text-primary-foreground">
                Create New Assignment
              </DialogTitle>
              <DialogDescription className="text-sm opacity-90 text-primary-foreground">
                Assign a room to an entity
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="roomId">Room *</Label>
            <Select value={formData.roomId} onValueChange={(value) => setFormData({...formData, roomId: value})} required>
              <SelectTrigger>
                <SelectValue placeholder="Select a room" />
              </SelectTrigger>
              <SelectContent>
                {availableRooms.map(room => (
                  <SelectItem key={room.id} value={room.id}>
                    {room.number} - {room.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="entityType">Assignment Type</Label>
            <Select value={formData.entityType} onValueChange={(value: Assignment['entityType']) => setFormData({...formData, entityType: value})}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="horse">Horse</SelectItem>
                <SelectItem value="equipment">Equipment</SelectItem>
                <SelectItem value="supplies">Supplies</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="entityId">Entity ID *</Label>
              <Input
                id="entityId"
                value={formData.entityId}
                onChange={(e) => setFormData({...formData, entityId: e.target.value})}
                required
              />
            </div>
            <div>
              <Label htmlFor="entityName">Entity Name *</Label>
              <Input
                id="entityName"
                value={formData.entityName}
                onChange={(e) => setFormData({...formData, entityName: e.target.value})}
                required
              />
            </div>
          </div>

          <div>
            <Label>Assigned Date *</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {format(assignedDate, "PPP")}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={assignedDate}
                  onSelect={(date) => date && setAssignedDate(date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <Label>Expected Vacate Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {expectedVacate ? format(expectedVacate, "PPP") : "Select date (optional)"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={expectedVacate}
                  onSelect={setExpectedVacate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <Label htmlFor="assignedBy">Assigned By *</Label>
            <Input
              id="assignedBy"
              value={formData.assignedBy}
              onChange={(e) => setFormData({...formData, assignedBy: e.target.value})}
              required
            />
          </div>

          <div>
            <Label htmlFor="dailyRate">Daily Rate ($)</Label>
            <Input
              id="dailyRate"
              type="number"
              step="0.01"
              value={formData.dailyRate}
              onChange={(e) => setFormData({...formData, dailyRate: parseFloat(e.target.value)})}
            />
          </div>

          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              placeholder="Any additional notes about this assignment"
            />
          </div>

          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-6 border-t">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setOpen(false)}
              className="sm:w-auto"
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="sm:w-auto"
            >
              <UserPlus className="mr-2 h-4 w-4" />
              Create Assignment
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAssignmentDialog;
