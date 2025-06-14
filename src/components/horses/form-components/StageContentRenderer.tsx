
import { FormStage } from "@/types/horse";
import BasicInformationStage from "../form-stages/BasicInformationStage";
import OwnershipDocumentationStage from "../form-stages/OwnershipDocumentationStage";
import PedigreeStage from "../form-stages/PedigreeStage";
import HealthMedicalStage from "../form-stages/HealthMedicalStage";
import TrainingPerformanceStage from "../form-stages/TrainingPerformanceStage";
import StableManagementStage from "../form-stages/StableManagementStage";
import InsuranceFinancialStage from "../form-stages/InsuranceFinancialStage";
import DocumentsImagesStage from "../form-stages/DocumentsImagesStage";
import ReviewConfirmationStage from "../form-stages/ReviewConfirmationStage";

interface StageContentRendererProps {
  stage: FormStage;
  onSubmit: () => void;
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
      return <ReviewConfirmationStage onSubmit={onSubmit} />;
    default:
      return null;
  }
};

export default StageContentRenderer;
