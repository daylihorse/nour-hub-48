
import { FormProvider } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HorseFormData } from "@/types/horse";
import { useEnglishHorseForm } from "./hooks/useEnglishHorseForm";
import EnglishFormHeader from "./form-components/EnglishFormHeader";
import EnglishFormContent from "./form-components/EnglishFormContent";

interface EnglishAddHorseFormProps {
  onSave: (data: HorseFormData) => void;
  onCancel: () => void;
}

const EnglishAddHorseForm = ({ onSave, onCancel }: EnglishAddHorseFormProps) => {
  console.log("EnglishAddHorseForm rendering...");
  
  const {
    form,
    currentStage,
    completedStages,
    progress,
    handleNext,
    handlePrevious,
    handleStageClick,
    handleSubmit,
  } = useEnglishHorseForm({ onSave });

  console.log("Current stage:", currentStage);
  console.log("Completed stages:", Array.from(completedStages));

  try {
    return (
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        <EnglishFormHeader
          currentStage={currentStage}
          completedStages={completedStages}
          progress={progress}
          onStageClick={handleStageClick}
        />

        <FormProvider {...form}>
          <form className="space-y-6">
            <EnglishFormContent
              form={form}
              currentStage={currentStage}
              completedStages={completedStages}
              onNext={handleNext}
              onPrevious={handlePrevious}
              onCancel={onCancel}
              onSubmit={form.handleSubmit(handleSubmit)}
            />
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
