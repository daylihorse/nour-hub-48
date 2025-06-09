
import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { 
  AlertTriangle,
  Calendar as CalendarIcon,
  DollarSign
} from "lucide-react";
import { Assignment } from "@/types/stableRooms";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

interface EndAssignmentDialogProps {
  assignment: Assignment | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEndAssignment: (assignmentId: string, endData: { 
    actualVacate: Date; 
    finalCost?: number; 
    notes?: string;
  }) => void;
  roomNumber?: string;
}

const EndAssignmentDialog = ({ 
  assignment, 
  open, 
  onOpenChange, 
  onEndAssignment,
  roomNumber 
}: EndAssignmentDialogProps) => {
  const [actualVacate, setActualVacate] = useState<Date>(new Date());
  const [finalCost, setFinalCost] = useState<number>(0);
  const [endNotes, setEndNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  if (!assignment) return null;

  const calculateEstimatedCost = () => {
    if (!assignment.cost) return 0;
    const duration = Math.ceil((actualVacate.getTime() - assignment.assignedDate.getTime()) / (1000 * 60 * 60 * 24));
    return duration * assignment.cost.dailyRate;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await onEndAssignment(assignment.id, {
        actualVacate,
        finalCost: finalCost > 0 ? finalCost : calculateEstimatedCost(),
        notes: endNotes || undefined
      });

      toast({
        title: "Assignment Ended",
        description: `Successfully ended assignment for ${assignment.entityName}.`
      });

      onOpenChange(false);
      setEndNotes("");
      setFinalCost(0);
      setActualVacate(new Date());
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to end assignment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const estimatedCost = calculateEstimatedCost();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            End Assignment
          </DialogTitle>
          <DialogDescription>
            Complete the assignment for {assignment.entityName} in room {roomNumber || assignment.roomId}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Assignment Summary */}
          <div className="bg-muted p-4 rounded-lg space-y-2">
            <h4 className="font-medium">Assignment Summary</h4>
            <div className="text-sm space-y-1">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Entity:</span>
                <span>{assignment.entityName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Assigned Date:</span>
                <span>{format(assignment.assignedDate, "PPP")}</span>
              </div>
              {assignment.expectedVacate && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Expected Vacate:</span>
                  <span>{format(assignment.expectedVacate, "PPP")}</span>
                </div>
              )}
            </div>
          </div>

          {/* Actual Vacate Date */}
          <div className="space-y-2">
            <Label>Actual Vacate Date *</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {format(actualVacate, "PPP")}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={actualVacate}
                  onSelect={(date) => date && setActualVacate(date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Cost Information */}
          {assignment.cost && (
            <div className="space-y-3">
              <div className="bg-muted p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="h-4 w-4" />
                  <span className="font-medium">Cost Calculation</span>
                </div>
                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Daily Rate:</span>
                    <span>${assignment.cost.dailyRate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Estimated Total:</span>
                    <span className="font-medium">${estimatedCost.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="finalCost">Final Cost (leave 0 for estimated)</Label>
                <Input
                  id="finalCost"
                  type="number"
                  step="0.01"
                  min="0"
                  value={finalCost}
                  onChange={(e) => setFinalCost(parseFloat(e.target.value) || 0)}
                  placeholder={`Estimated: $${estimatedCost.toFixed(2)}`}
                />
              </div>
            </div>
          )}

          {/* End Notes */}
          <div className="space-y-2">
            <Label htmlFor="endNotes">End Notes (optional)</Label>
            <Textarea
              id="endNotes"
              value={endNotes}
              onChange={(e) => setEndNotes(e.target.value)}
              placeholder="Any notes about ending this assignment..."
              className="min-h-[80px]"
            />
          </div>

          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              variant="destructive"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Ending..." : "End Assignment"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EndAssignmentDialog;
