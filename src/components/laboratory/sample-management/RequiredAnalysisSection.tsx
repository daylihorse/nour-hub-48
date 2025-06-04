
import { Label } from "@/components/ui/label";
import { requiredAnalysisOptions } from "./constants/sampleConstants";
import AnalysisCheckboxItem from "./AnalysisCheckboxItem";

interface RequiredAnalysisSectionProps {
  selectedAnalysis: string[];
  tubeStatus: {[key: string]: string};
  rejectionReasons: {[key: string]: string};
  onAnalysisChange: (analysisId: string, checked: boolean) => void;
  onTubeStatusChange: (analysisId: string, status: string) => void;
  onRejectionReasonChange: (analysisId: string, reason: string) => void;
}

const RequiredAnalysisSection = ({
  selectedAnalysis,
  tubeStatus,
  rejectionReasons,
  onAnalysisChange,
  onTubeStatusChange,
  onRejectionReasonChange
}: RequiredAnalysisSectionProps) => {
  return (
    <div>
      <Label className="block mb-3">Required Analysis *</Label>
      <div className="grid grid-cols-2 gap-4">
        {requiredAnalysisOptions.map((analysis) => (
          <AnalysisCheckboxItem
            key={analysis.id}
            analysis={analysis}
            isSelected={selectedAnalysis.includes(analysis.id)}
            tubeStatus={tubeStatus[analysis.id]}
            rejectionReason={rejectionReasons[analysis.id]}
            onAnalysisChange={onAnalysisChange}
            onTubeStatusChange={onTubeStatusChange}
            onRejectionReasonChange={onRejectionReasonChange}
          />
        ))}
      </div>
    </div>
  );
};

export default RequiredAnalysisSection;
