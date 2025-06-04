
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
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
  const [customReason, setCustomReason] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(value === "Other" || !rejectionReasonOptions.includes(value));

  const handleSelectChange = (reason: string) => {
    if (reason === "Other") {
      setShowCustomInput(true);
      onValueChange(analysisId, customReason || "Other");
    } else {
      setShowCustomInput(false);
      onValueChange(analysisId, reason);
    }
  };

  const handleCustomReasonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCustomReason = e.target.value;
    setCustomReason(newCustomReason);
    onValueChange(analysisId, newCustomReason || "Other");
  };

  return (
    <div className="space-y-2">
      <Select
        value={showCustomInput ? "Other" : value}
        onValueChange={handleSelectChange}
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
      
      {showCustomInput && (
        <Input
          placeholder="Enter custom rejection reason..."
          value={customReason}
          onChange={handleCustomReasonChange}
          className="h-8 text-xs"
        />
      )}
    </div>
  );
};

export default RejectionReasonSelect;
