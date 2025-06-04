
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/ui/date-picker";
import { Search, Plus } from "lucide-react";

interface SampleFormFieldsProps {
  personWhoBrought: string;
  sampleReceiptDate?: Date;
  priority: string;
  notes: string;
  onPersonSelect: (value: string) => void;
  onSampleReceiptDateChange: (date: Date | undefined) => void;
  onPriorityChange: (priority: string) => void;
  onNotesChange: (notes: string) => void;
}

const SampleFormFields = ({
  personWhoBrought,
  sampleReceiptDate,
  priority,
  notes,
  onPersonSelect,
  onSampleReceiptDateChange,
  onPriorityChange,
  onNotesChange
}: SampleFormFieldsProps) => {
  return (
    <>
      {/* Person Who Brought Sample */}
      <div>
        <Label>Person Who Brought Sample</Label>
        <div className="flex gap-2">
          <div className="flex-1">
            <Select value={personWhoBrought} onValueChange={onPersonSelect}>
              <SelectTrigger>
                <Search className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Search person..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="john_doe">John Doe</SelectItem>
                <SelectItem value="jane_smith">Jane Smith</SelectItem>
                <SelectItem value="mike_johnson">Mike Johnson</SelectItem>
                <SelectItem value="__add_new__" className="border-t mt-1 pt-2">
                  <div className="flex items-center gap-2 font-medium text-primary">
                    <Plus className="h-4 w-4" />
                    <span>Add New Person</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Sample Receipt Date */}
      <div>
        <Label>Sample Receipt Date *</Label>
        <DatePicker
          date={sampleReceiptDate}
          onDateChange={onSampleReceiptDateChange}
          placeholder="Select receipt date"
        />
      </div>

      {/* Priority */}
      <div>
        <Label>Priority</Label>
        <Select value={priority} onValueChange={onPriorityChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select priority..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="routine">Routine</SelectItem>
            <SelectItem value="urgent">Urgent</SelectItem>
            <SelectItem value="critical">Critical</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Notes */}
      <div>
        <Label>Notes</Label>
        <Textarea 
          placeholder="Additional notes..." 
          value={notes}
          onChange={(e) => onNotesChange(e.target.value)}
        />
      </div>
    </>
  );
};

export default SampleFormFields;
