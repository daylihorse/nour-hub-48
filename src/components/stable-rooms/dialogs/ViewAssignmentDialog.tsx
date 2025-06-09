
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Calendar, 
  User, 
  Building, 
  Clock,
  DollarSign,
  FileText,
  Edit
} from "lucide-react";
import { Assignment } from "@/types/stableRooms";
import { format } from "date-fns";

interface ViewAssignmentDialogProps {
  assignment: Assignment | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit?: (assignment: Assignment) => void;
  roomNumber?: string;
}

const ViewAssignmentDialog = ({ 
  assignment, 
  open, 
  onOpenChange, 
  onEdit,
  roomNumber 
}: ViewAssignmentDialogProps) => {
  if (!assignment) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'completed': return 'bg-blue-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getEntityIcon = (type: string) => {
    switch (type) {
      case 'horse': return <User className="h-4 w-4" />;
      case 'equipment': return <Building className="h-4 w-4" />;
      case 'supplies': return <Building className="h-4 w-4" />;
      default: return <Building className="h-4 w-4" />;
    }
  };

  const calculateDuration = () => {
    const endDate = assignment.actualVacate || assignment.expectedVacate || new Date();
    const diffTime = Math.abs(endDate.getTime() - assignment.assignedDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {getEntityIcon(assignment.entityType)}
            Assignment Details
          </DialogTitle>
          <DialogDescription>
            View complete information for assignment #{assignment.id}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status and Basic Info */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">{assignment.entityName}</h3>
              <p className="text-muted-foreground">ID: {assignment.entityId}</p>
            </div>
            <Badge className={`${getStatusColor(assignment.status)} text-white`}>
              {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
            </Badge>
          </div>

          <Separator />

          {/* Assignment Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Building className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Room:</span>
                <span className="font-medium">{roomNumber || assignment.roomId}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Assigned Date:</span>
                <span className="font-medium">{format(assignment.assignedDate, "PPP")}</span>
              </div>

              {assignment.expectedVacate && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Expected Vacate:</span>
                  <span className="font-medium">{format(assignment.expectedVacate, "PPP")}</span>
                </div>
              )}

              {assignment.actualVacate && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Actual Vacate:</span>
                  <span className="font-medium">{format(assignment.actualVacate, "PPP")}</span>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Assigned By:</span>
                <span className="font-medium">{assignment.assignedBy}</span>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Duration:</span>
                <span className="font-medium">{calculateDuration()} days</span>
              </div>

              <div className="flex items-center gap-2">
                <Badge variant="outline" className="capitalize">
                  {assignment.entityType}
                </Badge>
              </div>
            </div>
          </div>

          {/* Cost Information */}
          {assignment.cost && (
            <>
              <Separator />
              <div>
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Cost Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Daily Rate:</span>
                    <p className="font-medium">${assignment.cost.dailyRate}/day</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Total Cost:</span>
                    <p className="font-medium text-green-600">${assignment.cost.totalCost.toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Currency:</span>
                    <p className="font-medium">{assignment.cost.currency}</p>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Notes */}
          {assignment.notes && (
            <>
              <Separator />
              <div>
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Notes
                </h4>
                <p className="text-sm text-muted-foreground bg-muted p-3 rounded-md">
                  {assignment.notes}
                </p>
              </div>
            </>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          {onEdit && assignment.status === 'active' && (
            <Button onClick={() => onEdit(assignment)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Assignment
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ViewAssignmentDialog;
