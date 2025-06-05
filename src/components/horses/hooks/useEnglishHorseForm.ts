
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { HorseFormData } from "@/types/horse";
import { formStages } from "../config/formStages";

// Create a basic schema for validation
const horseFormSchema = z.object({
  name: z.string().min(1, "Horse name is required"),
  arabicName: z.string().optional(),
  breed: z.string().min(1, "Breed is required"),
  gender: z.string().min(1, "Gender is required"),
  ageClass: z.string().optional(),
  adultMaleType: z.string().optional(),
  castrationDate: z.string().optional(),
  isPregnant: z.string().optional(),
  pregnancyDuration: z.number().optional(),
  color: z.string().min(1, "Color is required"),
  height: z.number().optional(),
  weight: z.number().optional(),
  birthDate: z.string().optional(),
  ownerType: z.string().min(1, "Owner type is required"),
  ownerName: z.string().min(1, "Owner name is required"),
  ownerContact: z.string().min(1, "Owner contact is required"),
  registrationNumber: z.string().optional(),
  passportNumber: z.string().optional(),
  microchipId: z.string().optional(),
  sire: z.string().optional(),
  dam: z.string().optional(),
  bloodlineOrigin: z.string().optional(),
  healthStatus: z.string().min(1, "Health status is required"),
  vaccinationStatus: z.string().min(1, "Vaccination status is required"),
  lastVetCheckup: z.string().optional(),
  medicalConditions: z.string().optional(),
  allergies: z.string().optional(),
  trainingLevel: z.string().optional(),
  disciplines: z.string().optional(),
  competitionHistory: z.string().optional(),
  achievements: z.string().optional(),
  stallNumber: z.string().optional(),
  feedingSchedule: z.string().optional(),
  exerciseRoutine: z.string().optional(),
  specialNeeds: z.string().optional(),
  insured: z.boolean().optional(),
  insuranceProvider: z.string().optional(),
  insuranceValue: z.number().optional(),
  purchasePrice: z.number().optional(),
  marketValue: z.number().optional(),
  images: z.array(z.string()).optional(),
  documents: z.array(z.string()).optional(),
  status: z.string().min(1, "Status is required"),
});

interface UseEnglishHorseFormProps {
  onSave: (data: HorseFormData) => void;
}

export const useEnglishHorseForm = ({ onSave }: UseEnglishHorseFormProps) => {
  const [currentStage, setCurrentStage] = useState(0);
  const [completedStages, setCompletedStages] = useState<Set<number>>(new Set());
  const [visitedStages, setVisitedStages] = useState<Set<number>>(new Set([0])); // Track visited stages

  const form = useForm<HorseFormData>({
    resolver: zodResolver(horseFormSchema),
    defaultValues: {
      name: "",
      arabicName: "",
      breed: "",
      gender: undefined,
      ageClass: "",
      adultMaleType: undefined,
      castrationDate: "",
      isPregnant: undefined,
      pregnancyDuration: undefined,
      color: "",
      ownerType: undefined,
      ownerName: "",
      ownerContact: "",
      healthStatus: undefined,
      vaccinationStatus: undefined,
      insured: false,
      images: [],
      documents: [],
      status: undefined,
    },
  });

  const progress = ((completedStages.size) / formStages.length) * 100;

  const validateCurrentStage = () => {
    const currentStageData = formStages[currentStage];
    if (!currentStageData.isRequired) return true;

    const formValues = form.getValues();
    const requiredFields = currentStageData.fields.filter(field => {
      // Define required fields for each stage
      if (currentStageData.id === "basic") {
        const basicRequiredFields = ["name", "breed", "gender", "color"];
        
        // Add conditional required fields based on gender selection
        if (formValues.gender) {
          basicRequiredFields.push("ageClass");
          
          if (formValues.gender === "male" && formValues.ageClass === "adult_male") {
            basicRequiredFields.push("adultMaleType");
            
            if (formValues.adultMaleType === "gelding") {
              basicRequiredFields.push("castrationDate");
            }
          }
          
          if (formValues.gender === "female" && formValues.ageClass === "mare") {
            basicRequiredFields.push("isPregnant");
            
            if (formValues.isPregnant === "yes") {
              basicRequiredFields.push("pregnancyDuration");
            }
          }
        }
        
        return basicRequiredFields.includes(field);
      }
      if (currentStageData.id === "ownership") {
        return ["ownerType", "ownerName", "ownerContact"].includes(field);
      }
      if (currentStageData.id === "health") {
        return ["healthStatus", "vaccinationStatus"].includes(field);
      }
      if (currentStageData.id === "review") {
        return ["status"].includes(field);
      }
      return false;
    });

    return requiredFields.every(field => {
      const value = formValues[field as keyof HorseFormData];
      return value !== "" && value !== undefined && value !== null;
    });
  };

  const handleNext = () => {
    if (validateCurrentStage()) {
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

  const handleStageClick = (stageIndex: number) => {
    // Allow free navigation to any stage
    setCurrentStage(stageIndex);
    setVisitedStages(prev => new Set([...prev, stageIndex]));
    
    // Auto-validate and mark current stage as complete if valid when navigating away
    if (stageIndex !== currentStage && validateCurrentStage()) {
      setCompletedStages(prev => new Set([...prev, currentStage]));
    }
  };

  const handleSubmit = (data: HorseFormData) => {
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
