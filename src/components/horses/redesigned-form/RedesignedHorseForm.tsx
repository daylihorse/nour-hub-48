import { FormProvider } from "react-hook-form";
import { HorseFormData } from "@/types/horse-unified";
import { useEnglishHorseForm } from "../hooks/useEnglishHorseForm";
import FormSidebar from "./FormSidebar";
import FormMainContent from "./FormMainContent";
import MobileFormHeader from "./MobileFormHeader";

interface RedesignedHorseFormProps {
  onSave: (data: HorseFormData) => void;
  onCancel: () => void;
  editData?: HorseFormData;
}

const RedesignedHorseForm = ({ onSave, onCancel, editData }: RedesignedHorseFormProps) => {
  const {
    form,
    currentStage,
    completedStages,
    visitedStages,
    progress,
    handleNext,
    handlePrevious,
    handleStageClick,
    handleSubmit,
  } = useEnglishHorseForm({ onSave, editData });

  return (
    <div className="min-h-screen bg-gray-50">
      <FormProvider {...form}>
        <div className="flex h-screen">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block">
            <FormSidebar
              currentStage={currentStage}
              completedStages={completedStages}
              visitedStages={visitedStages}
              progress={progress}
              onStageClick={handleStageClick}
              onCancel={onCancel}
            />
          </div>

          {/* Mobile Header */}
          <div className="lg:hidden">
            <MobileFormHeader
              currentStage={currentStage}
              completedStages={completedStages}
              visitedStages={visitedStages}
              progress={progress}
              onStageClick={handleStageClick}
              onCancel={onCancel}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <FormMainContent
              form={form}
              currentStage={currentStage}
              completedStages={completedStages}
              onNext={handleNext}
              onPrevious={handlePrevious}
              onCancel={onCancel}
              onSubmit={form.handleSubmit(handleSubmit)}
            />
          </div>
        </div>
      </FormProvider>
    </div>
  );
};

export default RedesignedHorseForm;
