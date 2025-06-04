
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { rejectionReasonOptions } from "./constants/sampleConstants";

interface RejectionReasonSelectProps {
  analysisId: string;
  value: string;
  onValueChange: (analysisId: string, reason: string) => void;
}

const RejectionReasonSelect = ({
  analysisId,
  value,
  onValueChange
}: RejectionReasonSelectProps) => {
  return (
    <Select
      value={value}
      onValueChange={(reason) => onValueChange(analysisId, reason)}
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
  );
};

export default RejectionReasonSelect;
