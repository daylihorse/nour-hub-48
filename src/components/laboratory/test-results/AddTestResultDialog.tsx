
import { useState } from "react";
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight } from "lucide-react";
import TestResultStep1 from "./add-result-steps/TestResultStep1";
import TestResultStep2 from "./add-result-steps/TestResultStep2";
import TestResultStep3 from "./add-result-steps/TestResultStep3";
import TestResultStep4 from "./add-result-steps/TestResultStep4";

interface AddTestResultDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export interface TestResultFormData {
  // Step 1: Sample Selection
  sampleId: string;
  horseName: string;
  horsePhoto?: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  testType: string;
  templateIds: string[]; // Changed from templateId to templateIds (array)
  
  // Step 2: Test Values
  values: Array<{
    parameter: string;
    value: string;
    unit: string;
    reference: string;
    status: 'normal' | 'high' | 'low';
  }>;
  
  // Step 3: Results Analysis
  status: 'normal' | 'abnormal' | 'critical';
  findings: string;
  technician: string;
  reviewedBy: string;
  
  // Step 4: Review
  completedDate: string;
}

const AddTestResultDialog = ({ isOpen, setIsOpen }: AddTestResultDialogProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<TestResultFormData>({
    sampleId: "",
    horseName: "",
    clientName: "",
    clientPhone: "",
    clientEmail: "",
    testType: "",
    templateIds: [], // Changed from templateId to templateIds (array)
    values: [],
    status: "normal",
    findings: "",
    technician: "",
    reviewedBy: "",
    completedDate: new Date().toISOString().split('T')[0]
  });

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const stepTitles = [
    "Sample Selection",
    "Test Values",
    "Results Analysis", 
    "Review & Submit"
  ];

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log("Submitting test result:", formData);
    // Here you would typically save the data
    setIsOpen(false);
    setCurrentStep(1);
    // Reset form data
    setFormData({
      sampleId: "",
      horseName: "",
      clientName: "",
      clientPhone: "",
      clientEmail: "",
      testType: "",
      templateIds: [], // Changed from templateId to templateIds (array)
      values: [],
      status: "normal",
      findings: "",
      technician: "",
      reviewedBy: "",
      completedDate: new Date().toISOString().split('T')[0]
    });
  };

  const updateFormData = (updates: Partial<TestResultFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <TestResultStep1 formData={formData} updateFormData={updateFormData} />;
      case 2:
        return <TestResultStep2 formData={formData} updateFormData={updateFormData} />;
      case 3:
        return <TestResultStep3 formData={formData} updateFormData={updateFormData} />;
      case 4:
        return <TestResultStep4 formData={formData} updateFormData={updateFormData} />;
      default:
        return null;
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.sampleId && formData.horseName && formData.templateIds.length > 0; // Changed to check templateIds array
      case 2:
        return formData.values.length > 0;
      case 3:
        return formData.findings && formData.technician && formData.reviewedBy;
      case 4:
        return true;
      default:
        return false;
    }
  };

  return (
    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Register New Test Result</DialogTitle>
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Step {currentStep} of {totalSteps}: {stepTitles[currentStep - 1]}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="w-full" />
        </div>
      </DialogHeader>

      <div className="py-6">
        {renderStepContent()}
      </div>

      <div className="flex justify-between pt-4 border-t">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 1}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>

        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          
          {currentStep === totalSteps ? (
            <Button onClick={handleSubmit} disabled={!canProceed()}>
              Submit Result
            </Button>
          ) : (
            <Button onClick={handleNext} disabled={!canProceed()}>
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </DialogContent>
  );
};

export default AddTestResultDialog;
