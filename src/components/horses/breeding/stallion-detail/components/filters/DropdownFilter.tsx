
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface DropdownFilterProps {
  label: string;
  placeholder: string;
  value: string;
  options: string[];
  onValueChange: (value: string) => void;
  allOptionsLabel?: string;
}

const DropdownFilter = ({ 
  label, 
  placeholder, 
  value, 
  options, 
  onValueChange,
  allOptionsLabel = "All"
}: DropdownFilterProps) => {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Select
        value={value}
        onValueChange={onValueChange}
      >
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">{allOptionsLabel}</SelectItem>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default DropdownFilter;
