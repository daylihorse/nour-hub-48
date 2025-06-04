
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { requiredAnalysisOptions, rejectionReasonOptions } from "./constants/sampleConstants";

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
          <div key={analysis.id} className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id={`analysis-${analysis.id}`}
                checked={selectedAnalysis.includes(analysis.id)}
                onCheckedChange={(checked) => onAnalysisChange(analysis.id, !!checked)}
              />
              <Label htmlFor={`analysis-${analysis.id}`} className="text-sm">
                {analysis.label}
              </Label>
            </div>
            
            {selectedAnalysis.includes(analysis.id) && analysis.needsTube && (
              <div className="ml-6 space-y-2">
                <Label className="text-xs text-muted-foreground">
                  Appropriate tube received?
                </Label>
                <RadioGroup
                  value={tubeStatus[analysis.id] || ""}
                  onValueChange={(value) => onTubeStatusChange(analysis.id, value)}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id={`${analysis.id}-yes`} />
                    <Label htmlFor={`${analysis.id}-yes`} className="text-xs">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id={`${analysis.id}-no`} />
                    <Label htmlFor={`${analysis.id}-no`} className="text-xs">No</Label>
                  </div>
                </RadioGroup>
                
                {tubeStatus[analysis.id] === "no" && (
                  <Select
                    value={rejectionReasons[analysis.id] || ""}
                    onValueChange={(value) => onRejectionReasonChange(analysis.id, value)}
                  >
                    <SelectTrigger className="h-8 text-xs">
                      <SelectValue placeholder="Select reason..." />
                    </SelectTrigger>
                    <SelectContent>
                      {rejectionReasonOptions.map((reason) => (
                        <SelectItem key={reason} value={reason} className="text-xs">
                          {reason}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RequiredAnalysisSection;
