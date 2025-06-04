
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface SampleTypeFieldProps {
  value: string;
  onValueChange: (value: string) => void;
}

const SampleTypeField = ({ value, onValueChange }: SampleTypeFieldProps) => {
  console.log("SampleTypeField rendered with value:", value);

  const handleValueChange = (newValue: string) => {
    console.log("SampleTypeField value changing to:", newValue);
    onValueChange(newValue);
  };

  return (
    <div className="space-y-3">
      <Label className="text-base font-medium text-blue-800">Is this sample: New or Retest? *</Label>
      <RadioGroup value={value} onValueChange={handleValueChange} className="flex flex-col space-y-3">
        <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-blue-50 transition-colors">
          <RadioGroupItem value="new" id="new" />
          <Label htmlFor="new" className="cursor-pointer font-medium">
            New Sample
            <span className="block text-sm text-gray-600 font-normal">
              This is a fresh sample for initial testing
            </span>
          </Label>
        </div>
        <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-blue-50 transition-colors">
          <RadioGroupItem value="retest" id="retest" />
          <Label htmlFor="retest" className="cursor-pointer font-medium">
            Retest (Previous Sample)
            <span className="block text-sm text-gray-600 font-normal">
              This is a retest of a previously submitted sample
            </span>
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default SampleTypeField;
