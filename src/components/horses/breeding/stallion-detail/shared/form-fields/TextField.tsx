
import { Control } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface TextFieldProps {
  control: Control<any>;
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}

export const TextField = ({ 
  control, 
  name, 
  label, 
  type = "text",
  required = false,
  placeholder 
}: TextFieldProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </FormLabel>
          <FormControl>
            <Input
              type={type}
              placeholder={placeholder}
              {...field}
              value={type === "number" ? field.value || "" : field.value}
              onChange={(e) => {
                if (type === "number") {
                  field.onChange(e.target.value ? parseInt(e.target.value) : "");
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
