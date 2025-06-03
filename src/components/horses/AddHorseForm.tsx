
import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Circle, ArrowLeft, ArrowRight } from "lucide-react";
import { HorseFormData, FormStage } from "@/types/horse";
import { horseFormSchema } from "./form-schema/HorseFormSchema";
import BasicInformationStage from "./form-stages/BasicInformationStage";
import OwnershipDocumentationStage from "./form-stages/OwnershipDocumentationStage";
import PedigreeStage from "./form-stages/PedigreeStage";
import HealthMedicalStage from "./form-stages/HealthMedicalStage";
import TrainingPerformanceStage from "./form-stages/TrainingPerformanceStage";
import StableManagementStage from "./form-stages/StableManagementStage";
import InsuranceFinancialStage from "./form-stages/InsuranceFinancialStage";
import DocumentsImagesStage from "./form-stages/DocumentsImagesStage";
import ReviewConfirmationStage from "./form-stages/ReviewConfirmationStage";
import { useToast } from "@/hooks/use-toast";

const formStages: FormStage[] = [
  {
    id: "basic",
    title: "Basic Information",
    description: "Essential horse details",
    fields: ["name", "breed", "gender", "birthDate", "color"],
    isComplete: false,
    isRequired: true,
  },
  {
    id: "ownership",
    title: "Ownership & Documentation",
    description: "Owner details and registration",
    fields: ["ownerType", "ownerName", "ownerContact"],
    isComplete: false,
    isRequired: true,
  },
  {
    id: "pedigree",
    title: "Pedigree",
    description: "Bloodline and ancestry",
    fields: ["sire", "dam", "bloodlineOrigin"],
    isComplete: false,
    isRequired: false,
  },
  {
    id: "health",
    title: "Health & Medical",
    description: "Medical history and status",
    fields: ["healthStatus", "vaccinationStatus"],
    isComplete: false,
    isRequired: true,
  },
  {
    id: "training",
    title: "Training & Performance",
    description: "Training level and achievements",
    fields: ["trainingLevel"],
    isComplete: false,
    isRequired: false,
  },
  {
    id: "stable",
    title: "Stable Management",
    description: "Housing and care details",
    fields: ["stallNumber"],
    isComplete: false,
    isRequired: false,
  },
  {
    id: "insurance",
    title: "Insurance & Financial",
    description: "Insurance and valuation",
    fields: ["insured"],
    isComplete: false,
    isRequired: false,
  },
  {
    id: "documents",
    title: "Documents & Images",
    description: "Upload files and photos",
    fields: ["images"],
    isComplete: false,
    isRequired: false,
  },
  {
    id: "review",
    title: "Review & Confirmation",
    description: "Final review before submission",
    fields: [],
    isComplete: false,
    isRequired: true,
  },
];

interface AddHorseFormProps {
  onSave: (data: HorseFormData) => void;
  onCancel: () => void;
}

const AddHorseForm = ({ onSave, onCancel }: AddHorseFormProps) => {
  const [currentStage, setCurrentStage] = useState(0);
  const [completedStages, setCompletedStages] = useState<Set<number>>(new Set());
  const { toast } = useToast();

  const form = useForm<HorseFormData>({
    resolver: zodResolver(horseFormSchema),
    defaultValues: {
      name: "",
      breed: "",
      gender: "mare",
      birthDate: new Date(),
      color: "",
      ownerType: "individual",
      ownerName: "",
      ownerContact: "",
      healthStatus: "healthy",
      vaccinationStatus: "up_to_date",
      trainingLevel: "untrained",
      insured: false,
      images: [],
      documents: [],
      status: "active",
    },
    mode: "onChange",
  });

  const progress = ((completedStages.size + (currentStage + 1)) / formStages.length) * 100;

  const validateCurrentStage = async () => {
    const stage = formStages[currentStage];
    const isValid = await form.trigger(stage.fields as any);
    
    if (isValid) {
      setCompletedStages(prev => new Set(prev).add(currentStage));
      return true;
    }
    return false;
  };

  const handleNext = async () => {
    const isValid = await validateCurrentStage();
    if (isValid && currentStage < formStages.length - 1) {
      setCurrentStage(currentStage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStage > 0) {
      setCurrentStage(currentStage - 1);
    }
  };

  const handleStageClick = (stageIndex: number) => {
    if (stageIndex <= Math.max(...Array.from(completedStages)) + 1) {
      setCurrentStage(stageIndex);
    }
  };

  const handleSubmit = async (data: HorseFormData) => {
    try {
      await onSave(data);
      toast({
        title: "Success",
        description: "Horse registered successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to register horse. Please try again.",
        variant: "destructive",
      });
    }
  };

  const renderStageContent = () => {
    const stage = formStages[currentStage];
    
    switch (stage.id) {
      case "basic":
        return <BasicInformationStage />;
      case "ownership":
        return <OwnershipDocumentationStage />;
      case "pedigree":
        return <PedigreeStage />;
      case "health":
        return <HealthMedicalStage />;
      case "training":
        return <TrainingPerformanceStage />;
      case "stable":
        return <StableManagementStage />;
      case "insurance":
        return <InsuranceFinancialStage />;
      case "documents":
        return <DocumentsImagesStage />;
      case "review":
        return <ReviewConfirmationStage onSubmit={form.handleSubmit(handleSubmit)} />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Progress Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">Add New Horse</CardTitle>
              <p className="text-muted-foreground">Register a new horse in the stable</p>
            </div>
            <Badge variant="outline" className="text-sm">
              Stage {currentStage + 1} of {formStages.length}
            </Badge>
          </div>
          <div className="space-y-2">
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-muted-foreground">{Math.round(progress)}% Complete</p>
          </div>
        </CardHeader>
      </Card>

      {/* Stage Navigation */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-2">
            {formStages.map((stage, index) => (
              <button
                key={stage.id}
                onClick={() => handleStageClick(index)}
                disabled={index > Math.max(...Array.from(completedStages)) + 1}
                className={`
                  flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-all
                  ${index === currentStage 
                    ? 'bg-primary text-primary-foreground' 
                    : completedStages.has(index)
                    ? 'bg-green-100 text-green-800 hover:bg-green-200'
                    : index <= Math.max(...Array.from(completedStages)) + 1
                    ? 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    : 'bg-gray-50 text-gray-400 cursor-not-allowed'
                  }
                `}
              >
                {completedStages.has(index) ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  <Circle className="h-4 w-4" />
                )}
                <span className="hidden sm:inline">{stage.title}</span>
                <span className="sm:hidden">{index + 1}</span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Form Content */}
      <FormProvider {...form}>
        <form className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{formStages[currentStage].title}</CardTitle>
              <p className="text-muted-foreground">{formStages[currentStage].description}</p>
            </CardHeader>
            <CardContent>
              {renderStageContent()}
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <div className="flex gap-2">
              {currentStage > 0 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrevious}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Previous
                </Button>
              )}
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
              >
                Cancel
              </Button>
            </div>

            <div className="flex gap-2">
              {currentStage < formStages.length - 1 ? (
                <Button
                  type="button"
                  onClick={handleNext}
                  className="flex items-center gap-2"
                >
                  Next
                  <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={form.handleSubmit(handleSubmit)}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Register Horse
                </Button>
              )}
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default AddHorseForm;
