
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { arabicLabels } from "./constants/arabicLabels";

interface ArabicFormInputProps {
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  required?: boolean;
  step?: string;
  min?: string;
  max?: string;
}

const ArabicFormInput = ({ 
  name, 
  label, 
  placeholder, 
  type = "text",
  required = false,
  step,
  min,
  max
}: ArabicFormInputProps) => {
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
          <FormControl>
            <Input 
              placeholder={arabicPlaceholder}
              type={type}
              step={step}
              min={min}
              max={max}
              dir="rtl"
              className="text-right"
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
          <FormMessage className="text-right" />
        </FormItem>
      )}
    />
  );
};

export default ArabicFormInput;
