
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/ui/date-picker";
import SearchableSelect from "./SearchableSelect";

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
  console.log("SampleFormFields rendered with personWhoBrought:", personWhoBrought);

  const personOptions = [
    { value: "john_doe", label: "John Doe" },
    { value: "jane_smith", label: "Jane Smith" },
    { value: "mike_johnson", label: "Mike Johnson" },
    { value: "sarah_wilson", label: "Sarah Wilson" },
    { value: "david_brown", label: "David Brown" },
  ];

  const handlePersonSelect = (value: string) => {
    console.log("Person selected in SampleFormFields:", value);
    onPersonSelect(value);
  };

  return (
    <>
      {/* Person Who Brought Sample */}
      <div className="space-y-2">
        <Label>Person Who Brought Sample</Label>
        <SearchableSelect
          options={personOptions}
          value={personWhoBrought}
          placeholder="Search person"
          onValueChange={handlePersonSelect}
          onAddNew={() => onPersonSelect("__add_new__")}
          addNewLabel="Add New Person"
        />
      </div>

      {/* Sample Receipt Date */}
      <div className="space-y-2">
        <Label>Sample Receipt Date *</Label>
        <DatePicker
          date={sampleReceiptDate}
          onDateChange={onSampleReceiptDateChange}
          placeholder="Select receipt date"
        />
      </div>

      {/* Priority */}
      <div className="space-y-2">
        <Label>Priority</Label>
        <Select value={priority} onValueChange={onPriorityChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select priority..." />
          </SelectTrigger>
          <SelectContent className="bg-white z-[150]">
            <SelectItem value="routine">Routine</SelectItem>
            <SelectItem value="urgent">Urgent</SelectItem>
            <SelectItem value="critical">Critical</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Notes */}
      <div className="space-y-2">
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
