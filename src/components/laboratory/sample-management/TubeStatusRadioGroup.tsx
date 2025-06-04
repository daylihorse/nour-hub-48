
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface TubeStatusRadioGroupProps {
  analysisId: string;
  value: string;
  onValueChange: (analysisId: string, status: string) => void;
}

const TubeStatusRadioGroup = ({
  analysisId,
  value,
  onValueChange
}: TubeStatusRadioGroupProps) => {
  return (
    <RadioGroup
      value={value}
      onValueChange={(status) => onValueChange(analysisId, status)}
      className="flex gap-4"
    >
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="yes" id={`${analysisId}-yes`} />
        <Label htmlFor={`${analysisId}-yes`} className="text-xs">Yes</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="no" id={`${analysisId}-no`} />
        <Label htmlFor={`${analysisId}-no`} className="text-xs">No</Label>
      </div>
    </RadioGroup>
  );
};

export default TubeStatusRadioGroup;
