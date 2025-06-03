
import { FormStage } from "@/types/horse";
import ArabicBasicInformationStage from "../form-stages/ArabicBasicInformationStage";
import ArabicOwnershipDocumentationStage from "../form-stages/ArabicOwnershipDocumentationStage";
import ArabicPedigreeStage from "../form-stages/ArabicPedigreeStage";
import ArabicHealthMedicalStage from "../form-stages/ArabicHealthMedicalStage";
import ArabicTrainingPerformanceStage from "../form-stages/ArabicTrainingPerformanceStage";
import ArabicStableManagementStage from "../form-stages/ArabicStableManagementStage";
import ArabicInsuranceFinancialStage from "../form-stages/ArabicInsuranceFinancialStage";
import ArabicDocumentsImagesStage from "../form-stages/ArabicDocumentsImagesStage";

interface ArabicStageContentRendererProps {
  stage: FormStage;
}

const ArabicStageContentRenderer = ({ stage }: ArabicStageContentRendererProps) => {
  switch (stage.id) {
    case "basic":
      return <ArabicBasicInformationStage />;
    case "ownership":
      return <ArabicOwnershipDocumentationStage />;
    case "pedigree":
      return <ArabicPedigreeStage />;
    case "health":
      return <ArabicHealthMedicalStage />;
    case "training":
      return <ArabicTrainingPerformanceStage />;
    case "stable":
      return <ArabicStableManagementStage />;
    case "insurance":
      return <ArabicInsuranceFinancialStage />;
    case "documents":
      return <ArabicDocumentsImagesStage />;
    default:
      return null;
  }
};

export default ArabicStageContentRenderer;
