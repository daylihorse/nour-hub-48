
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

interface SelectOption {
  value: string;
  label: string;
  arabicLabel?: string;
}

interface DynamicSelectProps {
  name: string;
  label: string;
  placeholder: string;
  options: SelectOption[];
  required?: boolean;
  isRTL?: boolean;
}

const DynamicSelect = ({ 
  name, 
  label, 
  placeholder, 
  options, 
  required = false,
  isRTL = false 
}: DynamicSelectProps) => {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className={isRTL ? "text-right" : ""}>
            {label} {required && "*"}
          </FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className={isRTL ? "text-right" : ""}>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="bg-white z-50">
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  <span className={isRTL ? "text-right" : ""}>
                    {isRTL && option.arabicLabel ? option.arabicLabel : option.label}
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default DynamicSelect;
