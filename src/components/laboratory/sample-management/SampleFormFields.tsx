
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
  const personOptions = [
    { value: "john_doe", label: "John Doe" },
    { value: "jane_smith", label: "Jane Smith" },
    { value: "mike_johnson", label: "Mike Johnson" },
  ];

  const handleAddNewPerson = () => {
    console.log("Add new person triggered");
    // This will trigger the add person dialog in the parent component
    onPersonSelect("__add_new__");
  };

  const handlePersonSelect = (value: string) => {
    console.log("Person selected:", value);
    onPersonSelect(value);
  };

  return (
    <>
      {/* Person Who Brought Sample */}
      <div>
        <Label>Person Who Brought Sample</Label>
        <SearchableSelect
          options={personOptions}
          value={personWhoBrought}
          placeholder="Search person"
          onValueChange={handlePersonSelect}
          onAddNew={handleAddNewPerson}
          addNewLabel="Add New Person"
        />
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
