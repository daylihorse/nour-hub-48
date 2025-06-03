
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface DynamicInputProps {
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  required?: boolean;
  isRTL?: boolean;
  step?: string;
  min?: string;
  max?: string;
}

const DynamicInput = ({ 
  name, 
  label, 
  placeholder, 
  type = "text",
  required = false,
  isRTL = false,
  step,
  min,
  max
}: DynamicInputProps) => {
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
          <FormControl>
            <Input 
              placeholder={placeholder}
              type={type}
              step={step}
              min={min}
              max={max}
              dir={isRTL ? "rtl" : "ltr"}
              className={isRTL ? "text-right" : ""}
              {...field}
              onChange={(e) => {
                if (type === "number") {
                  field.onChange(e.target.value ? parseFloat(e.target.value) : undefined);
                } else {
                  field.onChange(e.target.value);
                }
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default DynamicInput;
