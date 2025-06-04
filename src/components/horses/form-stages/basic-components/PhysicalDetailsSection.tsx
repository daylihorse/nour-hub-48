
import { useFormContext } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { HorseFormData } from "@/types/horse";
import DynamicDatePicker from "../../form-components/DynamicDatePicker";
import { calculateAge } from "../../utils/ageCalculation";

const PhysicalDetailsSection = () => {
  const form = useFormContext<HorseFormData>();
  const birthDate = form.watch("birthDate");

  return (
    <>
      {/* Birth Date Field with Age Calculation */}
      <div className="space-y-2">
        <DynamicDatePicker
          name="birthDate"
          label="Birth Date"
          placeholder="Select birth date"
          maxDate={new Date()}
          minDate={new Date("1990-01-01")}
        />
        {birthDate && (
          <div className="text-sm text-muted-foreground mt-1">
            <span className="font-medium">Calculated Age: </span>
            {calculateAge(new Date(birthDate))}
          </div>
        )}
      </div>

      <FormField
        control={form.control}
        name="height"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Height (hands)</FormLabel>
            <FormControl>
              <Input 
                type="number" 
                placeholder="Enter height" 
                {...field}
                onChange={(e) => field.onChange(parseFloat(e.target.value))}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="weight"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Weight (kg)</FormLabel>
            <FormControl>
              <Input 
                type="number" 
                placeholder="Enter weight" 
                {...field}
                onChange={(e) => field.onChange(parseFloat(e.target.value))}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default PhysicalDetailsSection;
