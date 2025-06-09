
import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogTrigger,
  DialogFooter 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Plus, Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Assignment } from "@/types/stableRooms";
import { useToast } from "@/hooks/use-toast";

interface CreateAssignmentDialogProps {
  onCreateAssignment: (assignment: Omit<Assignment, 'id'>) => void;
  availableRooms: { id: string; number: string; name: string }[];
}

const CreateAssignmentDialog = ({ onCreateAssignment, availableRooms }: CreateAssignmentDialogProps) => {
  const [open, setOpen] = useState(false);
  const [assignedDate, setAssignedDate] = useState<Date>(new Date());
  const [expectedVacate, setExpectedVacate] = useState<Date | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    roomId: "",
    entityType: "horse" as Assignment['entityType'],
    entityId: "",
    entityName: "",
    assignedBy: "",
    notes: "",
    dailyRate: 0
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.roomId) newErrors.roomId = "Room selection is required";
    if (!formData.entityId) newErrors.entityId = "Entity ID is required";
    if (!formData.entityName) newErrors.entityName = "Entity name is required";
    if (!formData.assignedBy) newErrors.assignedBy = "Assigned by is required";
    if (formData.dailyRate < 0) newErrors.dailyRate = "Daily rate cannot be negative";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
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
    setErrors({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors in the form before submitting.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
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
          totalCost: 0,
          currency: "USD"
        } : undefined
      };

      await onCreateAssignment(newAssignment);
      
      toast({
        title: "Assignment Created",
        description: `Successfully assigned ${formData.entityName} to room ${availableRooms.find(r => r.id === formData.roomId)?.number}.`
      });
      
      setOpen(false);
      resetForm();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create assignment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Assignment
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Assignment</DialogTitle>
          <DialogDescription>
            Assign a room to an entity such as a horse, equipment, or supplies.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="roomId">Room *</Label>
              <Select 
                value={formData.roomId} 
                onValueChange={(value) => {
                  setFormData({...formData, roomId: value});
                  if (errors.roomId) setErrors({...errors, roomId: ""});
                }}
                required
              >
                <SelectTrigger className={errors.roomId ? "border-destructive" : ""}>
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
              {errors.roomId && <p className="text-sm text-destructive">{errors.roomId}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="entityType">Assignment Type</Label>
              <Select 
                value={formData.entityType} 
                onValueChange={(value: Assignment['entityType']) => setFormData({...formData, entityType: value})}
              >
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

            <div className="space-y-2">
              <Label htmlFor="entityId">Entity ID *</Label>
              <Input
                id="entityId"
                value={formData.entityId}
                onChange={(e) => {
                  setFormData({...formData, entityId: e.target.value});
                  if (errors.entityId) setErrors({...errors, entityId: ""});
                }}
                className={errors.entityId ? "border-destructive" : ""}
                required
              />
              {errors.entityId && <p className="text-sm text-destructive">{errors.entityId}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="entityName">Entity Name *</Label>
              <Input
                id="entityName"
                value={formData.entityName}
                onChange={(e) => {
                  setFormData({...formData, entityName: e.target.value});
                  if (errors.entityName) setErrors({...errors, entityName: ""});
                }}
                className={errors.entityName ? "border-destructive" : ""}
                required
              />
              {errors.entityName && <p className="text-sm text-destructive">{errors.entityName}</p>}
            </div>

            <div className="space-y-2">
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

            <div className="space-y-2">
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

            <div className="space-y-2">
              <Label htmlFor="assignedBy">Assigned By *</Label>
              <Input
                id="assignedBy"
                value={formData.assignedBy}
                onChange={(e) => {
                  setFormData({...formData, assignedBy: e.target.value});
                  if (errors.assignedBy) setErrors({...errors, assignedBy: ""});
                }}
                className={errors.assignedBy ? "border-destructive" : ""}
                required
              />
              {errors.assignedBy && <p className="text-sm text-destructive">{errors.assignedBy}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="dailyRate">Daily Rate ($)</Label>
              <Input
                id="dailyRate"
                type="number"
                step="0.01"
                min="0"
                value={formData.dailyRate}
                onChange={(e) => {
                  setFormData({...formData, dailyRate: parseFloat(e.target.value) || 0});
                  if (errors.dailyRate) setErrors({...errors, dailyRate: ""});
                }}
                className={errors.dailyRate ? "border-destructive" : ""}
              />
              {errors.dailyRate && <p className="text-sm text-destructive">{errors.dailyRate}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              placeholder="Any additional notes about this assignment"
              className="min-h-[80px]"
            />
          </div>

          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create Assignment"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAssignmentDialog;
