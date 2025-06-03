
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";

interface SelectOption {
  value: string;
  label: string;
}

interface PedigreeSelectWithAddNewProps {
  name: string;
  label: string;
  placeholder: string;
  options: SelectOption[];
  onAddNew: () => void;
  addNewLabel?: string;
}

const PedigreeSelectWithAddNew = ({ 
  name, 
  label, 
  placeholder, 
  options, 
  onAddNew,
  addNewLabel = "Add New"
}: PedigreeSelectWithAddNewProps) => {
  const form = useFormContext();

  const handleValueChange = (value: string) => {
    if (value === "__add_new__") {
      onAddNew();
    } else {
      form.setValue(name, value);
    }
  };

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select onValueChange={handleValueChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="bg-white z-50">
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
              <SelectItem value="__add_new__" className="border-t mt-1 pt-2">
                <div className="flex items-center gap-2 font-medium text-primary">
                  <Plus className="h-4 w-4" />
                  <span>{addNewLabel}</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default PedigreeSelectWithAddNew;
