
import { useFormContext } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { HorseFormData } from "@/types/horse";

const GenderAgeClassSection = () => {
  const form = useFormContext<HorseFormData>();
  const selectedGender = form.watch("gender");

  return (
    <>
      <FormField
        control={form.control}
        name="gender"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Gender *</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={(value) => {
                  field.onChange(value);
                  // Reset dependent fields when gender changes
                  form.setValue("ageClass", "");
                  form.setValue("adultMaleType", undefined);
                  form.setValue("castrationDate", "");
                  form.setValue("isPregnant", undefined);
                  form.setValue("pregnancyDuration", undefined);
                }}
                defaultValue={field.value}
                className="flex flex-col space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="male" />
                  <Label htmlFor="male">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="female" />
                  <Label htmlFor="female">Female</Label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {selectedGender && (
        <FormField
          control={form.control}
          name="ageClass"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Age Class *</FormLabel>
              <Select 
                onValueChange={(value) => {
                  field.onChange(value);
                  // Reset dependent fields when age class changes
                  form.setValue("adultMaleType", undefined);
                  form.setValue("castrationDate", "");
                  form.setValue("isPregnant", undefined);
                  form.setValue("pregnancyDuration", undefined);
                }} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select age class" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {selectedGender === "male" ? (
                    <>
                      <SelectItem value="adult_male">Adult Male</SelectItem>
                      <SelectItem value="colt">Colt</SelectItem>
                      <SelectItem value="foal">Foal</SelectItem>
                    </>
                  ) : (
                    <>
                      <SelectItem value="mare">Mare</SelectItem>
                      <SelectItem value="filly">Filly</SelectItem>
                      <SelectItem value="foal">Foal</SelectItem>
                    </>
                  )}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </>
  );
};

export default GenderAgeClassSection;
