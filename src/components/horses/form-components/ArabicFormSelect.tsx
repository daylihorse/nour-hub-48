
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
import { arabicLabels } from "./constants/arabicLabels";

interface SelectOption {
  value: string;
  label: string;
  arabicLabel?: string;
}

interface ArabicFormSelectProps {
  name: string;
  label: string;
  placeholder: string;
  options: SelectOption[];
  required?: boolean;
}

const ArabicFormSelect = ({ 
  name, 
  label, 
  placeholder, 
  options, 
  required = false
}: ArabicFormSelectProps) => {
  const form = useFormContext();
  const arabicLabel = arabicLabels[label] || label;
  const arabicPlaceholder = arabicLabels[placeholder] || placeholder;

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="text-right">
          <FormLabel className="text-right block">
            {arabicLabel} {required && "*"}
          </FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="text-right">
                <SelectValue placeholder={arabicPlaceholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="bg-white z-50">
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  <span className="text-right">
                    {option.arabicLabel || option.label}
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage className="text-right" />
        </FormItem>
      )}
    />
  );
};

export default ArabicFormSelect;
