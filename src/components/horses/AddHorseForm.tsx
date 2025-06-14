
import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HorseFormData } from "@/types/horse";
import { horseFormSchema } from "./form-schema/HorseFormSchema";
import { useToast } from "@/hooks/use-toast";
import { formStages } from "./config/formStages";
import FormProgressHeader from "./form-components/FormProgressHeader";
import StageNavigation from "./form-components/StageNavigation";
import FormNavigationButtons from "./form-components/FormNavigationButtons";
import StageContentRenderer from "./form-components/StageContentRenderer";

interface AddHorseFormProps {
  onSave: (data: HorseFormData) => void;
  onCancel: () => void;
}

const AddHorseForm = ({ onSave, onCancel }: AddHorseFormProps) => {
  const [currentStage, setCurrentStage] = useState(0);
  const [completedStages, setCompletedStages] = useState<Set<number>>(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<HorseFormData>({
    resolver: zodResolver(horseFormSchema),
    defaultValues: {
      name: "",
      breed: "",
      gender: "female",
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
    console.log("Form submission started with data:", data);
    setIsSubmitting(true);
    
    try {
      // Validate all form data before submission
      const isFormValid = await form.trigger();
      console.log("Form validation result:", isFormValid);
      
      if (!isFormValid) {
        console.log("Form validation errors:", form.formState.errors);
        toast({
          title: "Validation Error",
          description: "Please check all required fields and correct any errors.",
          variant: "destructive",
        });
        return;
      }

      console.log("Calling onSave with data:", data);
      await onSave(data);
      
      toast({
        title: "Success",
        description: "Horse registered successfully!",
      });
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: "Error",
        description: "Failed to register horse. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFormSubmit = () => {
    console.log("Submit button clicked");
    console.log("Current form values:", form.getValues());
    console.log("Form errors:", form.formState.errors);
    
    form.handleSubmit(handleSubmit, (errors) => {
      console.log("Form submission failed with errors:", errors);
      toast({
        title: "Form Validation Failed",
        description: "Please check the form for errors and try again.",
        variant: "destructive",
      });
    })();
  };

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
              <CardTitle>{formStages[currentStage].title}</CardTitle>
              <p className="text-muted-foreground">{formStages[currentStage].description}</p>
            </CardHeader>
            <CardContent>
              <StageContentRenderer 
                stage={formStages[currentStage]} 
                onSubmit={handleFormSubmit}
              />
            </CardContent>
          </Card>

          <FormNavigationButtons 
            currentStage={currentStage}
            formStages={formStages}
            onPrevious={handlePrevious}
            onNext={handleNext}
            onCancel={onCancel}
            onSubmit={handleFormSubmit}
            isSubmitting={isSubmitting}
          />
        </form>
      </FormProvider>
    </div>
  );
};

export default AddHorseForm;
