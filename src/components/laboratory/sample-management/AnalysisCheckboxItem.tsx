
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import TubeStatusRadioGroup from "./TubeStatusRadioGroup";
import RejectionReasonSelect from "./RejectionReasonSelect";

interface AnalysisCheckboxItemProps {
  analysis: {
    id: string;
    label: string;
    needsTube: boolean;
  };
  isSelected: boolean;
  tubeStatus?: string;
  rejectionReason?: string;
  onAnalysisChange: (analysisId: string, checked: boolean) => void;
  onTubeStatusChange: (analysisId: string, status: string) => void;
  onRejectionReasonChange: (analysisId: string, reason: string) => void;
}

const AnalysisCheckboxItem = ({
  analysis,
  isSelected,
  tubeStatus,
  rejectionReason,
  onAnalysisChange,
  onTubeStatusChange,
  onRejectionReasonChange
}: AnalysisCheckboxItemProps) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`analysis-${analysis.id}`}
          checked={isSelected}
          onCheckedChange={(checked) => onAnalysisChange(analysis.id, !!checked)}
        />
        <Label htmlFor={`analysis-${analysis.id}`} className="text-sm">
          {analysis.label}
        </Label>
      </div>
      
      {isSelected && analysis.needsTube && (
        <div className="ml-6 space-y-2">
          <Label className="text-xs text-muted-foreground">
            Appropriate tube received?
          </Label>
          <TubeStatusRadioGroup
            analysisId={analysis.id}
            value={tubeStatus || ""}
            onValueChange={onTubeStatusChange}
          />
          
          {tubeStatus === "no" && (
            <RejectionReasonSelect
              analysisId={analysis.id}
              value={rejectionReason || ""}
              onValueChange={onRejectionReasonChange}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default AnalysisCheckboxItem;
