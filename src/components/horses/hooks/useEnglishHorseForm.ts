
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { HorseFormData } from "@/types/horse";
import { horseFormSchema } from "../form-schema/HorseFormSchema";
import { useToast } from "@/hooks/use-toast";
import { useStageValidation } from "@/hooks/useStageValidation";
import { formStages } from "../config/formStages";

interface UseEnglishHorseFormProps {
  onSave: (data: HorseFormData) => void;
}

export const useEnglishHorseForm = ({ onSave }: UseEnglishHorseFormProps) => {
  const [currentStage, setCurrentStage] = useState(0);
  const [completedStages, setCompletedStages] = useState<Set<number>>(new Set());
  const { toast } = useToast();
  const { validateStage, getStageProgress, getOverallValidationStatus } = useStageValidation();

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
    if (stageIndex <= currentStage || completedStages.has(stageIndex)) {
      setCurrentStage(stageIndex);
    } else {
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

  return {
    form,
    currentStage,
    completedStages,
    progress,
    validationStatus,
    handleNext,
    handlePrevious,
    handleStageClick,
    handleSubmit,
  };
};
