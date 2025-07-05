
import { HorseFormData } from "@/types/horse-unified";
import { formStages } from "../config/consolidatedFormStages";
import FormContentCard from "./FormContentCard";

interface FormMainContentProps {
  currentStage: number;
  onSubmit?: () => void;
}

const FormMainContent = ({ currentStage, onSubmit }: FormMainContentProps) => {
  const stage = formStages[currentStage];

  if (!stage) {
    return <div>Invalid stage</div>;
  }

  return (
    <FormContentCard 
      stage={stage} 
      onSubmit={onSubmit}
    />
  );
};

export default FormMainContent;
