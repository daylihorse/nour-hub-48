
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ServiceTemplateStep1 from "./wizard-steps/ServiceTemplateStep1";
import ServiceTemplateStep2 from "./wizard-steps/ServiceTemplateStep2";
import ServiceTemplateStep3 from "./wizard-steps/ServiceTemplateStep3";
import ServiceTemplateStep4 from "./wizard-steps/ServiceTemplateStep4";

interface CreateServiceTemplateWizardProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateServiceTemplateWizard = ({ isOpen, onClose }: CreateServiceTemplateWizardProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    basicInfo: {},
    testsServices: [],
    pricing: {},
    preview: {}
  });

  const steps = [
    { id: 1, title: "Basic Information", component: ServiceTemplateStep1 },
    { id: 2, title: "Tests & Services", component: ServiceTemplateStep2 },
    { id: 3, title: "Pricing & Scheduling", component: ServiceTemplateStep3 },
    { id: 4, title: "Preview & Publish", component: ServiceTemplateStep4 }
  ];

  const currentStepData = steps.find(step => step.id === currentStep);
  const StepComponent = currentStepData?.component;

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinish = () => {
    console.log("Creating service template with data:", formData);
    onClose();
    setCurrentStep(1);
    setFormData({ basicInfo: {}, testsServices: [], pricing: {}, preview: {} });
  };

  const progress = (currentStep / steps.length) * 100;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Create Service Template</DialogTitle>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Step {currentStep} of {steps.length}</span>
              <span>{currentStepData?.title}</span>
            </div>
            <Progress value={progress} className="w-full" />
          </div>
        </DialogHeader>

        <div className="mt-6">
          {StepComponent && (
            <StepComponent
              data={formData}
              onDataChange={setFormData}
            />
          )}
        </div>

        <div className="flex justify-between mt-6 pt-4 border-t">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>

          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            {currentStep === steps.length ? (
              <Button onClick={handleFinish}>
                Create Template
              </Button>
            ) : (
              <Button onClick={handleNext}>
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateServiceTemplateWizard;
