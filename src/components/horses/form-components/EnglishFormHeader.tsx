
import FormProgressHeader from "./FormProgressHeader";
import StageNavigation from "./StageNavigation";
import { formStages } from "../config/formStages";

interface EnglishFormHeaderProps {
  currentStage: number;
  completedStages: Set<number>;
  progress: number;
  onStageClick: (stageIndex: number) => void;
}

const EnglishFormHeader = ({ 
  currentStage, 
  completedStages, 
  progress, 
  onStageClick 
}: EnglishFormHeaderProps) => {
  return (
    <>
      <FormProgressHeader 
        currentStage={currentStage}
        formStages={formStages}
        progress={progress}
      />

      <StageNavigation
        formStages={formStages}
        currentStage={currentStage}
        completedStages={completedStages}
        onStageClick={onStageClick}
      />
    </>
  );
};

export default EnglishFormHeader;
