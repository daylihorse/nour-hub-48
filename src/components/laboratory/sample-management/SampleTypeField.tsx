
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface SampleTypeFieldProps {
  value: string;
  onValueChange: (value: string) => void;
}

const SampleTypeField = ({ value, onValueChange }: SampleTypeFieldProps) => {
  return (
    <div className="space-y-3">
      <Label className="text-base font-medium">Is this sample: New or Retest? *</Label>
      <RadioGroup value={value} onValueChange={onValueChange}>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="new" id="new" />
          <Label htmlFor="new" className="cursor-pointer">New Sample</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="retest" id="retest" />
          <Label htmlFor="retest" className="cursor-pointer">Retest (Previous Sample)</Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default SampleTypeField;
