
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

const VaccinationStatusField = () => {
  const form = useFormContext<HorseFormValues>();

  return (
    <FormField
      control={form.control}
      name="vaccinationStatus"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Vaccination Status *</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select vaccination status" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="up_to_date">Up to Date</SelectItem>
              <SelectItem value="partial">Partial</SelectItem>
              <SelectItem value="none">None</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default VaccinationStatusField;
