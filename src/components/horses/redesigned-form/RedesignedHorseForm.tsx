
import { FormProvider } from "react-hook-form";
import { HorseFormData } from "@/types/horse-unified";
import { useEnglishHorseForm } from "../hooks/useEnglishHorseForm";
import FormMainContent from "./FormMainContent";
import { Button } from "@/components/ui/button";

interface RedesignedHorseFormProps {
  onSave: (data: HorseFormData) => void;
  onCancel: () => void;
  editData?: HorseFormData;
}

const RedesignedHorseForm = ({ onSave, onCancel, editData }: RedesignedHorseFormProps) => {
  const {
    form,
    currentStage,
    handleNext,
    handlePrevious,
    handleSubmit,
  } = useEnglishHorseForm({ onSave, editData });

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormMainContent 
          currentStage={currentStage}
          onSubmit={() => form.handleSubmit(handleSubmit)()}
        />
        
        <div className="flex justify-between">
          <Button 
            type="button" 
            variant="outline" 
            onClick={currentStage === 0 ? onCancel : handlePrevious}
          >
            {currentStage === 0 ? 'Cancel' : 'Previous'}
          </Button>
          
          <Button 
            type="button" 
            onClick={handleNext}
          >
            Next
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default RedesignedHorseForm;
