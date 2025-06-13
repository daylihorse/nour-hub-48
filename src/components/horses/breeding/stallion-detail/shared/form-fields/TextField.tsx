
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control, FieldPath, FieldValues } from "react-hook-form";

interface TextFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  placeholder?: string;
  required?: boolean;
  type?: string;
}

export function TextField<T extends FieldValues>({ 
  control, 
  name, 
  label, 
  placeholder,
  required = false,
  type = "text"
}: TextFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}{required && " *"}</FormLabel>
          <FormControl>
            <Input 
              type={type}
              placeholder={placeholder}
              {...field} 
              onChange={type === "number" 
                ? (e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)
                : field.onChange
              }
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
