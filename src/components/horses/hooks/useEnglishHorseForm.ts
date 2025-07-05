
import { useForm } from "react-hook-form";
import { useState } from "react";
import { HorseFormData } from "@/types/horse-unified";

interface UseEnglishHorseFormProps {
  onSave: (data: HorseFormData) => void;
  editData?: HorseFormData;
}

export const useEnglishHorseForm = ({ onSave, editData }: UseEnglishHorseFormProps) => {
  const [currentStage, setCurrentStage] = useState(0);

  const form = useForm<HorseFormData>({
    defaultValues: editData || {
      name: "",
      arabicName: "",
      breed: "",
      gender: "mare",
      ageClass: "adult", // Changed from empty string to valid AgeClass value
      adultMaleType: undefined,
      castrationDate: "",
      isPregnant: undefined,
      pregnancyDuration: undefined,
      birthDate: "",
      color: "",
      height: undefined,
      weight: undefined,
      registrationNumber: "",
      passportNumber: "",
      microchipId: "",
      ownerType: "individual",
      ownerName: "",
      ownerContact: "",
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
      status: "active"
    }
  });

  const handleNext = () => {
    setCurrentStage(prev => prev + 1);
  };

  const handlePrevious = () => {
    setCurrentStage(prev => Math.max(0, prev - 1));
  };

  const handleSubmit = (data: HorseFormData) => {
    onSave(data);
  };

  return {
    form,
    currentStage,
    handleNext,
    handlePrevious,
    handleSubmit,
  };
};
