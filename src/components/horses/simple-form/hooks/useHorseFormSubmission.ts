
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { HorseFormData } from "@/types/horse";
import { SimpleHorseFormData } from "../../form-schema/SimpleHorseFormSchema";
import { convertSimpleToFullHorseData } from "../utils/horseFormSubmission";

interface UseHorseFormSubmissionProps {
  onSave: (data: HorseFormData) => void;
}

export const useHorseFormSubmission = ({ onSave }: UseHorseFormSubmissionProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: SimpleHorseFormData) => {
    console.log("Form submission started with data:", data);
    setIsSubmitting(true);
    
    try {
      const fullData = convertSimpleToFullHorseData(data);
      
      console.log("Calling onSave with:", fullData);
      await onSave(fullData);
      
      toast({
        title: "Success!",
        description: `${data.name} has been registered successfully.`,
      });
    } catch (error) {
      console.error("Error saving horse:", error);
      toast({
        title: "Error",
        description: "Failed to register horse. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    handleSubmit,
    isSubmitting,
  };
};
