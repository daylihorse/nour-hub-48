
import { FormStage } from "@/types/horse-unified";
import BasicInformationStage from "./stages/BasicInformationStage";
import OwnershipDocumentationStage from "./stages/OwnershipDocumentationStage";
import PedigreeStage from "./stages/PedigreeStage";
import HealthMedicalStage from "./stages/HealthMedicalStage";
import TrainingPerformanceStage from "./stages/TrainingPerformanceStage";
import StableManagementStage from "./stages/StableManagementStage";
import InsuranceFinancialStage from "./stages/InsuranceFinancialStage";
import DocumentsImagesStage from "./stages/DocumentsImagesStage";
import ReviewSubmitStage from "./stages/ReviewSubmitStage";

interface StageContentRendererProps {
  stage: FormStage;
  onSubmit?: () => void;
}

const StageContentRenderer = ({ stage, onSubmit }: StageContentRendererProps) => {
  switch (stage.id) {
    case "basic":
      return <BasicInformationStage />;
    case "ownership":
      return <OwnershipDocumentationStage />;
    case "pedigree":
      return <PedigreeStage />;
    case "health":
      return <HealthMedicalStage />;
    case "training":
      return <TrainingPerformanceStage />;
    case "stable":
      return <StableManagementStage />;
    case "insurance":
      return <InsuranceFinancialStage />;
    case "documents":
      return <DocumentsImagesStage />;
    case "review":
      return <ReviewSubmitStage onSubmit={onSubmit || (() => {})} />;
    default:
      return <div>Stage not found</div>;
  }
};

export default StageContentRenderer;
