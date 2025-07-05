
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { HorseFormData } from "@/types/horse-unified";
import { formStages } from "../config/consolidatedFormStages";
import { horseFormSchema, stageValidationSchemas } from "../form-schema/ConsolidatedHorseFormSchema";

interface UseEnglishHorseFormProps {
  onSave: (data: HorseFormData) => void;
  editData?: HorseFormData;
}

export const useEnglishHorseForm = ({ onSave, editData }: UseEnglishHorseFormProps) => {
  const [currentStage, setCurrentStage] = useState(0);
  const [completedStages, setCompletedStages] = useState<Set<number>>(new Set());
  const [visitedStages, setVisitedStages] = useState<Set<number>>(new Set([0]));

  const form = useForm<HorseFormData>({
    resolver: zodResolver(horseFormSchema),
    defaultValues: editData || {
      name: "",
      arabicName: "",
      breed: "",
      gender: "mare",
      ageClass: "",
      adultMaleType: undefined,
      castrationDate: "",
      isPregnant: undefined,
      pregnancyDuration: undefined,
      birthDate: "",
      color: "",
      height: undefined,
      weight: undefined,
      ownerType: "individual",
      ownerName: "",
      ownerContact: "",
      registrationNumber: "",
      passportNumber: "",
      microchipId: "",
      sire: "",
      dam: "",
      bloodlineOrigin: "",
      healthStatus: "healthy",
      vaccinationStatus: "up_to_date",
      lastVetCheckup: "",
      medicalConditions: "",
      allergies: "",
      trainingLevel: "",
      disciplines: "",
      competitionHistory: "",
      achievements: "",
      stallNumber: "",
      feedingSchedule: "",
      exerciseRoutine: "",
      specialNeeds: "",
      insured: false,
      insuranceProvider: "",
      insuranceValue: undefined,
      purchasePrice: undefined,
      marketValue: undefined,
      images: [],
      documents: [],
      status: "active",
    },
  });

  const progress = ((completedStages.size) / formStages.length) * 100;

  const validateCurrentStage = async () => {
    const currentStageData = formStages[currentStage];
    if (!currentStageData.isRequired) return true;

    const stageSchema = stageValidationSchemas[currentStageData.id as keyof typeof stageValidationSchemas];
    if (!stageSchema) return true;

    try {
      const formValues = form.getValues();
      await stageSchema.parseAsync(formValues);
      return true;
    } catch (error) {
      // Trigger validation to show errors
      await form.trigger(currentStageData.fields as any);
      return false;
    }
  };

  const handleNext = async () => {
    const isValid = await validateCurrentStage();
    if (isValid) {
      setCompletedStages(prev => new Set([...prev, currentStage]));
    }
    
    if (currentStage < formStages.length - 1) {
      const nextStage = currentStage + 1;
      setCurrentStage(nextStage);
      setVisitedStages(prev => new Set([...prev, nextStage]));
    }
  };

  const handlePrevious = () => {
    if (currentStage > 0) {
      const prevStage = currentStage - 1;
      setCurrentStage(prevStage);
      setVisitedStages(prev => new Set([...prev, prevStage]));
    }
  };

  const handleStageClick = async (stageIndex: number) => {
    // Auto-validate current stage when navigating away
    if (stageIndex !== currentStage) {
      const isValid = await validateCurrentStage();
      if (isValid) {
        setCompletedStages(prev => new Set([...prev, currentStage]));
      }
    }
    
    setCurrentStage(stageIndex);
    setVisitedStages(prev => new Set([...prev, stageIndex]));
  };

  const handleSubmit = async (data: HorseFormData) => {
    console.log("Submitting horse data:", data);
    onSave(data);
  };

  return {
    form,
    currentStage,
    completedStages,
    visitedStages,
    progress,
    handleNext,
    handlePrevious,
    handleStageClick,
    handleSubmit,
    validateCurrentStage,
  };
};
