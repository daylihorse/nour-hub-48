
import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  XCircle,
  FileText,
  Calendar,
  User
} from "lucide-react";
import { Assignment } from "@/types/stableRooms";
import { useToast } from "@/hooks/use-toast";
import TerminationReasonStep from "./termination-wizard/TerminationReasonStep";
import PreTerminationChecklistStep from "./termination-wizard/PreTerminationChecklistStep";
import VacationDetailsStep from "./termination-wizard/VacationDetailsStep";
import DocumentationStep from "./termination-wizard/DocumentationStep";
import ReviewConfirmStep from "./termination-wizard/ReviewConfirmStep";

interface EnhancedEndAssignmentDialogProps {
  assignment: Assignment | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEndAssignment: (assignmentId: string, endData: {
    actualVacate: Date;
    finalCost?: number;
    notes?: string;
    terminationReason: string;
    terminationCategory: string;
    checklistItems: Record<string, boolean>;
    documents: string[];
    movementRecord?: any;
  }) => void;
  roomNumber?: string;
}

const steps = [
  { id: 'reason', title: 'Termination Reason', icon: FileText },
  { id: 'checklist', title: 'Pre-Termination Checklist', icon: CheckCircle },
  { id: 'vacation', title: 'Vacation Details', icon: Calendar },
  { id: 'documentation', title: 'Documentation', icon: FileText },
  { id: 'review', title: 'Review & Confirm', icon: User }
];

export interface TerminationData {
  reason: string;
  category: string;
  actualVacate: Date;
  finalCost: number;
  notes: string;
  checklistItems: Record<string, boolean>;
  documents: string[];
  createMovementRecord: boolean;
  movementType: string;
  destination: string;
  transportMethod: string;
  contactPerson: string;
  estimatedDeparture?: Date;
}

const EnhancedEndAssignmentDialog = ({ 
  assignment, 
  open, 
  onOpenChange, 
  onEndAssignment,
  roomNumber 
}: EnhancedEndAssignmentDialogProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const [terminationData, setTerminationData] = useState<TerminationData>({
    reason: '',
    category: '',
    actualVacate: new Date(),
    finalCost: 0,
    notes: '',
    checklistItems: {},
    documents: [],
    createMovementRecord: false,
    movementType: 'departure',
    destination: '',
    transportMethod: '',
    contactPerson: ''
  });

  if (!assignment) return null;

  const updateTerminationData = (updates: Partial<TerminationData>) => {
    setTerminationData(prev => ({ ...prev, ...updates }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0: // Reason step
        return terminationData.reason && terminationData.category;
      case 1: // Checklist step
        const requiredItems = ['room_inspection', 'equipment_check', 'billing_cleared'];
        return requiredItems.every(item => terminationData.checklistItems[item]);
      case 2: // Vacation details
        return true; // Optional step
      case 3: // Documentation
        return true; // Optional step
      case 4: // Review
        return true;
      default:
        return false;
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      const endData = {
        actualVacate: terminationData.actualVacate,
        finalCost: terminationData.finalCost > 0 ? terminationData.finalCost : undefined,
        notes: terminationData.notes || undefined,
        terminationReason: terminationData.reason,
        terminationCategory: terminationData.category,
        checklistItems: terminationData.checklistItems,
        documents: terminationData.documents,
        movementRecord: terminationData.createMovementRecord ? {
          type: terminationData.movementType,
          destination: terminationData.destination,
          transportMethod: terminationData.transportMethod,
          contactPerson: terminationData.contactPerson,
          estimatedDeparture: terminationData.estimatedDeparture
        } : undefined
      };

      await onEndAssignment(assignment.id, endData);

      toast({
        title: "Assignment Terminated",
        description: `Successfully terminated assignment for ${assignment.entityName} with proper procedures.`
      });

      onOpenChange(false);
      resetWizard();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to terminate assignment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetWizard = () => {
    setCurrentStep(0);
    setTerminationData({
      reason: '',
      category: '',
      actualVacate: new Date(),
      finalCost: 0,
      notes: '',
      checklistItems: {},
      documents: [],
      createMovementRecord: false,
      movementType: 'departure',
      destination: '',
      transportMethod: '',
      contactPerson: ''
    });
  };

  const renderStepContent = () => {
    const stepProps = {
      assignment,
      terminationData,
      updateTerminationData,
      roomNumber
    };

    switch (currentStep) {
      case 0:
        return <TerminationReasonStep {...stepProps} />;
      case 1:
        return <PreTerminationChecklistStep {...stepProps} />;
      case 2:
        return <VacationDetailsStep {...stepProps} />;
      case 3:
        return <DocumentationStep {...stepProps} />;
      case 4:
        return <ReviewConfirmStep {...stepProps} />;
      default:
        return null;
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            Enhanced Assignment Termination
          </DialogTitle>
          <DialogDescription>
            Complete the termination process for {assignment.entityName} in room {roomNumber || assignment.roomId}
          </DialogDescription>
        </DialogHeader>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Step {currentStep + 1} of {steps.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="w-full" />
        </div>

        {/* Step Navigation */}
        <div className="flex justify-between items-center py-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;
            
            return (
              <div key={step.id} className="flex flex-col items-center">
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center border-2 
                  ${isActive ? 'border-primary bg-primary text-primary-foreground' : 
                    isCompleted ? 'border-green-500 bg-green-500 text-white' : 
                    'border-muted bg-background'}
                `}>
                  {isCompleted ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <Icon className="h-5 w-5" />
                  )}
                </div>
                <span className={`text-xs mt-1 ${isActive ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>

        {/* Assignment Summary */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium">{assignment.entityName}</h4>
                <p className="text-sm text-muted-foreground">
                  {assignment.entityType} • Room {roomNumber || assignment.roomId}
                </p>
              </div>
              <Badge variant={assignment.status === 'active' ? 'default' : 'secondary'}>
                {assignment.status}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Step Content */}
        <div className="min-h-[400px]">
          {renderStepContent()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6 border-t">
          <Button 
            variant="outline" 
            onClick={currentStep === 0 ? () => onOpenChange(false) : prevStep}
            disabled={isSubmitting}
          >
            {currentStep === 0 ? (
              <>
                <XCircle className="mr-2 h-4 w-4" />
                Cancel
              </>
            ) : (
              <>
                <ChevronLeft className="mr-2 h-4 w-4" />
                Previous
              </>
            )}
          </Button>

          {currentStep === steps.length - 1 ? (
            <Button 
              onClick={handleSubmit}
              disabled={isSubmitting || !canProceed()}
              variant="destructive"
            >
              {isSubmitting ? "Terminating..." : "Complete Termination"}
            </Button>
          ) : (
            <Button 
              onClick={nextStep}
              disabled={!canProceed()}
            >
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EnhancedEndAssignmentDialog;
