
import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HorseFormData } from "@/types/horse";
import { horseFormSchema } from "./form-schema/HorseFormSchema";
import { useToast } from "@/hooks/use-toast";
import { useStageValidation } from "@/hooks/useStageValidation";
import { formStages } from "./config/formStages";
import FormProgressHeader from "./form-components/FormProgressHeader";
import StageNavigation from "./form-components/StageNavigation";
import StageContentRenderer from "./form-components/StageContentRenderer";
import FormNavigationButtons from "./form-components/FormNavigationButtons";
import ValidationFeedback from "./form-components/ValidationFeedback";

interface EnglishAddHorseFormProps {
  onSave: (data: HorseFormData) => void;
  onCancel: () => void;
}

const EnglishAddHorseForm = ({ onSave, onCancel }: EnglishAddHorseFormProps) => {
  console.log("EnglishAddHorseForm rendering...");
  
  const [currentStage, setCurrentStage] = useState(0);
  const [completedStages, setCompletedStages] = useState<Set<number>>(new Set());
  const { toast } = useToast();
  const { validateStage, getStageProgress, getOverallValidationStatus } = useStageValidation();

  console.log("Current stage:", currentStage);
  console.log("Form stages:", formStages);

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

  const progress = getStageProgress(formStages, completedStages);
  const validationStatus = getOverallValidationStatus(formStages, completedStages);

  console.log("Form initialized, progress:", progress, "validation status:", validationStatus);

  const handleNext = async () => {
    const stage = formStages[currentStage];
    const isValid = await validateStage(stage);
    
    if (isValid) {
      setCompletedStages(prev => new Set(prev).add(currentStage));
      if (currentStage < formStages.length - 1) {
        setCurrentStage(currentStage + 1);
      }
      toast({
        title: "Stage Completed",
        description: `${stage.title} stage completed successfully`,
      });
    } else {
      toast({
        title: "Validation Errors",
        description: "Please fix the errors before proceeding",
        variant: "destructive",
      });
    }
  };

  const handlePrevious = () => {
    if (currentStage > 0) {
      setCurrentStage(currentStage - 1);
    }
  };

  const handleStageClick = async (stageIndex: number) => {
    // Allow navigation to previous stages or completed stages
    if (stageIndex <= currentStage || completedStages.has(stageIndex)) {
      setCurrentStage(stageIndex);
    } else {
      // Validate all stages up to the target stage
      let canNavigate = true;
      for (let i = currentStage; i < stageIndex; i++) {
        const isValid = await validateStage(formStages[i]);
        if (!isValid) {
          canNavigate = false;
          break;
        }
        setCompletedStages(prev => new Set(prev).add(i));
      }
      
      if (canNavigate) {
        setCurrentStage(stageIndex);
      } else {
        toast({
          title: "Cannot Navigate",
          description: "Please complete previous stages first",
          variant: "destructive",
        });
      }
    }
  };

  const handleSubmit = async (data: HorseFormData) => {
    // Validate all stages before submission
    const allStagesValid = await Promise.all(
      formStages.map(stage => validateStage(stage))
    );

    if (allStagesValid.every(Boolean)) {
      try {
        await onSave(data);
        toast({
          title: "Registration Successful",
          description: `${data.name} has been registered successfully.`,
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to register horse. Please try again.",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "Validation Errors",
        description: "Please review all stages and fix any errors",
        variant: "destructive",
      });
    }
  };

  console.log("Rendering form UI...");

  try {
    return (
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        <FormProgressHeader 
          currentStage={currentStage}
          formStages={formStages}
          progress={progress}
        />

        <StageNavigation
          formStages={formStages}
          currentStage={currentStage}
          completedStages={completedStages}
          onStageClick={handleStageClick}
        />

        <FormProvider {...form}>
          <form className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{formStages[currentStage]?.title || "Loading..."}</CardTitle>
                    <p className="text-muted-foreground">{formStages[currentStage]?.description || ""}</p>
                  </div>
                  <FormNavigationButtons
                    currentStage={currentStage}
                    formStages={formStages}
                    onPrevious={handlePrevious}
                    onNext={handleNext}
                    onCancel={onCancel}
                    onSubmit={form.handleSubmit(handleSubmit)}
                  />
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {formStages[currentStage] && (
                  <>
                    <ValidationFeedback
                      stage={formStages[currentStage]}
                      currentStage={currentStage}
                      completedStages={completedStages}
                    />
                    <StageContentRenderer 
                      stage={formStages[currentStage]} 
                      onSubmit={form.handleSubmit(handleSubmit)}
                    />
                  </>
                )}
              </CardContent>
            </Card>
          </form>
        </FormProvider>
      </div>
    );
  } catch (error) {
    console.error("Error rendering EnglishAddHorseForm:", error);
    return (
      <div className="max-w-6xl mx-auto p-6">
        <Card>
          <CardHeader>
            <CardTitle>Form Loading Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p>An error occurred while loading the horse registration form. Please try again.</p>
            <div className="mt-4">
              <button 
                onClick={onCancel}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Go Back
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
};

export default EnglishAddHorseForm;
