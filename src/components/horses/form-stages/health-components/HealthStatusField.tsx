
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
import { HorseFormValues } from "../../form-schema/HorseFormSchema";

const HealthStatusField = () => {
  const form = useFormContext<HorseFormValues>();

  return (
    <FormField
      control={form.control}
      name="healthStatus"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Health Status *</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select health status" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="healthy">Healthy</SelectItem>
              <SelectItem value="under_treatment">Under Treatment</SelectItem>
              <SelectItem value="quarantine">Quarantine</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default HealthStatusField;
