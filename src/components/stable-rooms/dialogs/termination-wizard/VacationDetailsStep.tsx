
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Calendar as CalendarIcon,
  DollarSign,
  Clock,
  Calculator
} from "lucide-react";
import { Assignment } from "@/types/stableRooms";
import { TerminationData } from "../EnhancedEndAssignmentDialog";
import { format } from "date-fns";

interface VacationDetailsStepProps {
  assignment: Assignment;
  terminationData: TerminationData;
  updateTerminationData: (updates: Partial<TerminationData>) => void;
  roomNumber?: string;
}

const VacationDetailsStep = ({ 
  assignment, 
  terminationData, 
  updateTerminationData 
}: VacationDetailsStepProps) => {
  const calculateEstimatedCost = () => {
    if (!assignment.cost) return 0;
    const duration = Math.ceil((terminationData.actualVacate.getTime() - assignment.assignedDate.getTime()) / (1000 * 60 * 60 * 24));
    return duration * assignment.cost.dailyRate;
  };

  const calculateEarlyDepartureSavings = () => {
    if (!assignment.expectedVacate || !assignment.cost) return 0;
    const earlyDays = Math.ceil((assignment.expectedVacate.getTime() - terminationData.actualVacate.getTime()) / (1000 * 60 * 60 * 24));
    return Math.max(0, earlyDays * assignment.cost.dailyRate);
  };

  const estimatedCost = calculateEstimatedCost();
  const savings = calculateEarlyDepartureSavings();
  const isEarlyDeparture = assignment.expectedVacate && terminationData.actualVacate < assignment.expectedVacate;

  return (
    <div className="space-y-6">
      {/* Assignment Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Assignment Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Entity:</span>
                <span className="font-medium">{assignment.entityName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Type:</span>
                <Badge variant="outline" className="capitalize">
                  {assignment.entityType}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Assigned Date:</span>
                <span>{format(assignment.assignedDate, "PPP")}</span>
              </div>
            </div>
            <div className="space-y-2">
              {assignment.expectedVacate && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Expected Vacate:</span>
                  <span>{format(assignment.expectedVacate, "PPP")}</span>
                </div>
              )}
              {assignment.cost && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Daily Rate:</span>
                  <span>${assignment.cost.dailyRate}</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Vacation Date */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <CalendarIcon className="h-5 w-5" />
            Actual Vacation Date
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Select the actual vacation date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {format(terminationData.actualVacate, "PPP")}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={terminationData.actualVacate}
                  onSelect={(date) => date && updateTerminationData({ actualVacate: date })}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {isEarlyDeparture && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Clock className="h-4 w-4 text-green-600" />
                <span className="font-medium text-green-800">Early Departure</span>
              </div>
              <p className="text-sm text-green-700">
                Departing {Math.ceil((assignment.expectedVacate!.getTime() - terminationData.actualVacate.getTime()) / (1000 * 60 * 60 * 24))} days early
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Cost Calculation */}
      {assignment.cost && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Cost Calculation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Estimated Cost */}
              <div className="p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="h-4 w-4" />
                  <span className="font-medium">Estimated Total Cost</span>
                </div>
                <p className="text-2xl font-bold text-green-600">
                  ${estimatedCost.toFixed(2)}
                </p>
                <p className="text-sm text-muted-foreground">
                  Based on actual stay duration
                </p>
              </div>

              {/* Savings */}
              {savings > 0 && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="h-4 w-4 text-green-600" />
                    <span className="font-medium text-green-800">Early Departure Savings</span>
                  </div>
                  <p className="text-2xl font-bold text-green-600">
                    ${savings.toFixed(2)}
                  </p>
                  <p className="text-sm text-green-700">
                    Saved by departing early
                  </p>
                </div>
              )}
            </div>

            {/* Custom Final Cost */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="custom-cost"
                  checked={terminationData.finalCost > 0}
                  onCheckedChange={(checked) => {
                    if (!checked) {
                      updateTerminationData({ finalCost: 0 });
                    }
                  }}
                />
                <Label htmlFor="custom-cost">Override with custom final cost</Label>
              </div>
              
              {terminationData.finalCost > 0 && (
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  value={terminationData.finalCost}
                  onChange={(e) => updateTerminationData({ finalCost: parseFloat(e.target.value) || 0 })}
                  placeholder={`Estimated: $${estimatedCost.toFixed(2)}`}
                />
              )}
            </div>

            {/* Final Amount */}
            <div className="pt-4 border-t">
              <div className="flex justify-between items-center">
                <span className="font-medium">Final Amount:</span>
                <span className="text-xl font-bold">
                  ${(terminationData.finalCost > 0 ? terminationData.finalCost : estimatedCost).toFixed(2)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default VacationDetailsStep;
