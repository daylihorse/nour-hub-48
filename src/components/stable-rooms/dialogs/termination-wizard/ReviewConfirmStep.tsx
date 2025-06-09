
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { 
  AlertTriangle,
  CheckCircle,
  FileText,
  Calendar,
  DollarSign,
  User,
  Building,
  Truck
} from "lucide-react";
import { Assignment } from "@/types/stableRooms";
import { TerminationData } from "../EnhancedEndAssignmentDialog";
import { format } from "date-fns";

interface ReviewConfirmStepProps {
  assignment: Assignment;
  terminationData: TerminationData;
  updateTerminationData: (updates: Partial<TerminationData>) => void;
  roomNumber?: string;
}

const ReviewConfirmStep = ({ 
  assignment, 
  terminationData, 
  updateTerminationData,
  roomNumber 
}: ReviewConfirmStepProps) => {
  const calculateFinalCost = () => {
    if (terminationData.finalCost > 0) return terminationData.finalCost;
    if (!assignment.cost) return 0;
    const duration = Math.ceil((terminationData.actualVacate.getTime() - assignment.assignedDate.getTime()) / (1000 * 60 * 60 * 24));
    return duration * assignment.cost.dailyRate;
  };

  const requiredChecklistItems = [
    'room_inspection',
    'equipment_check', 
    'billing_cleared'
  ];

  const completedRequired = requiredChecklistItems.filter(item => 
    terminationData.checklistItems[item]
  ).length;

  const finalCost = calculateFinalCost();

  return (
    <div className="space-y-6">
      {/* Termination Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Termination Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Entity:</span>
                <span className="font-medium">{assignment.entityName}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Building className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Room:</span>
                <span className="font-medium">{roomNumber || assignment.roomId}</span>
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Vacation Date:</span>
                <span className="font-medium">{format(terminationData.actualVacate, "PPP")}</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Category:</span>
                <Badge variant="outline">{terminationData.category}</Badge>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Reason:</span>
                <span className="font-medium text-sm">{terminationData.reason}</span>
              </div>

              {finalCost > 0 && (
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Final Cost:</span>
                  <span className="font-medium text-green-600">${finalCost.toFixed(2)}</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Checklist Status */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Pre-Termination Checklist Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <span>Required Items Completed:</span>
            <Badge variant={completedRequired === requiredChecklistItems.length ? "default" : "destructive"}>
              {completedRequired}/{requiredChecklistItems.length}
            </Badge>
          </div>

          <div className="space-y-2">
            {Object.entries(terminationData.checklistItems).map(([itemId, completed]) => {
              if (!completed) return null;
              
              const itemNames: Record<string, string> = {
                room_inspection: 'Room Inspection Completed',
                equipment_check: 'Equipment & Fixtures Check',
                billing_cleared: 'Billing & Payments Cleared',
                documentation_collected: 'Documentation Collected',
                transportation_arranged: 'Transportation Arranged',
                insurance_notified: 'Insurance Notified',
                emergency_contacts: 'Emergency Contacts Updated'
              };

              return (
                <div key={itemId} className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>{itemNames[itemId] || itemId}</span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Documentation Status */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Documentation Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <span>Documents Attached:</span>
            <Badge variant="outline">
              {terminationData.documents.length} Files
            </Badge>
          </div>

          {terminationData.documents.length > 0 ? (
            <div className="space-y-2">
              {terminationData.documents.map((doc, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span>{doc}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No documents attached</p>
          )}
        </CardContent>
      </Card>

      {/* Movement Record Integration */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Truck className="h-5 w-5" />
            Movement Record Integration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="create-movement"
              checked={terminationData.createMovementRecord}
              onCheckedChange={(checked) => 
                updateTerminationData({ createMovementRecord: checked as boolean })
              }
            />
            <Label htmlFor="create-movement">
              Create departure record in Arrivals & Departures system
            </Label>
          </div>

          {terminationData.createMovementRecord && (
            <div className="pl-6 space-y-3 border-l-2 border-muted">
              <p className="text-sm text-muted-foreground">
                This will automatically create a departure record with the following details:
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Movement Type:</span>
                  <Badge variant="outline">Departure</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Date:</span>
                  <span>{format(terminationData.actualVacate, "PPP")}</span>
                </div>
                <div className="flex justify-between">
                  <span>Reason:</span>
                  <span>{terminationData.reason}</span>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Additional Notes */}
      {terminationData.notes && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Additional Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-sm">{terminationData.notes}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Final Confirmation */}
      <Card className="border-destructive">
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-destructive mt-1" />
            <div>
              <h4 className="font-medium text-destructive mb-2">
                Confirm Assignment Termination
              </h4>
              <p className="text-sm text-muted-foreground mb-4">
                This action will permanently end the assignment for {assignment.entityName} 
                and cannot be undone. All associated data will be archived and the room 
                will become available for new assignments.
              </p>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Room will be marked as available</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Assignment will be marked as completed</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Final billing will be processed</span>
                </div>
                {terminationData.createMovementRecord && (
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Departure record will be created</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviewConfirmStep;
