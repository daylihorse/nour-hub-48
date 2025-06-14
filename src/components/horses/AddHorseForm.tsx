
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

  console.log("AddHorseForm - Current form values:", form.getValues());
  console.log("AddHorseForm - Form errors:", form.formState.errors);

  const progress = ((completedStages.size + (currentStage + 1)) / formStages.length) * 100;

  const validateCurrentStage = async () => {
    const stage = formStages[currentStage];
    console.log("Validating stage:", stage.id, "Fields:", stage.fields);
    
    const isValid = await form.trigger(stage.fields as any);
    console.log("Stage validation result:", isValid);
    
    if (isValid) {
      setCompletedStages(prev => new Set(prev).add(currentStage));
      return true;
    }
    
    // Show validation errors
    const errors = form.formState.errors;
    console.log("Validation errors:", errors);
    
    return false;
  };

  const handleNext = async () => {
    console.log("HandleNext clicked for stage:", currentStage);
    const isValid = await validateCurrentStage();
    if (isValid && currentStage < formStages.length - 1) {
      setCurrentStage(currentStage + 1);
    } else if (!isValid) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields before proceeding.",
        variant: "destructive",
      });
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

  const handleSubmit = async () => {
    console.log("HandleSubmit called");
    
    if (isSubmitting) {
      console.log("Already submitting, ignoring duplicate click");
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Validate all form fields
      const isValid = await form.trigger();
      console.log("Full form validation result:", isValid);
      
      if (!isValid) {
        console.log("Form validation failed:", form.formState.errors);
        toast({
          title: "Validation Error",
          description: "Please check all fields and correct any errors.",
          variant: "destructive",
        });
        return;
      }

      const formData = form.getValues();
      console.log("Submitting form data:", formData);
      
      // Ensure status is set
      if (!formData.status) {
        formData.status = "active";
      }

      await onSave(formData);
      
      toast({
        title: "Success",
        description: `${formData.name} has been registered successfully!`,
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
                onSubmit={handleSubmit} 
              />
            </CardContent>
          </Card>

          <FormNavigationButtons 
            currentStage={currentStage}
            formStages={formStages}
            onPrevious={handlePrevious}
            onNext={handleNext}
            onCancel={onCancel}
            onSubmit={handleSubmit}
          />
        </form>
      </FormProvider>
    </div>
  );
};

export default AddHorseForm;
