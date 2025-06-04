
import { useFormContext } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { HorseFormData } from "@/types/horse";

const ConditionalFieldsSection = () => {
  const form = useFormContext<HorseFormData>();
  const selectedGender = form.watch("gender");
  const selectedAgeClass = form.watch("ageClass");
  const selectedAdultMaleType = form.watch("adultMaleType");
  const isPregnant = form.watch("isPregnant");

  return (
    <>
      {/* Adult Male Type Field - Only for Male Adult */}
      {selectedGender === "male" && selectedAgeClass === "adult_male" && (
        <FormField
          control={form.control}
          name="adultMaleType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Adult Male Type *</FormLabel>
              <Select 
                onValueChange={(value) => {
                  field.onChange(value);
                  // Reset castration date when adult male type changes
                  form.setValue("castrationDate", "");
                }} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="stallion">Stallion</SelectItem>
                  <SelectItem value="gelding">Gelding</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      {/* Castration Date Field - Only for Gelding */}
      {selectedGender === "male" && selectedAgeClass === "adult_male" && selectedAdultMaleType === "gelding" && (
        <FormField
          control={form.control}
          name="castrationDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Castration Date *</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      {/* Pregnancy Status Field - Only for Female Mare */}
      {selectedGender === "female" && selectedAgeClass === "mare" && (
        <FormField
          control={form.control}
          name="isPregnant"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Is Pregnant? *</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={(value) => {
                    field.onChange(value);
                    // Reset pregnancy duration when pregnancy status changes
                    if (value === "no") {
                      form.setValue("pregnancyDuration", undefined);
                    }
                  }}
                  defaultValue={field.value}
                  className="flex flex-col space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="pregnant-yes" />
                    <Label htmlFor="pregnant-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="pregnant-no" />
                    <Label htmlFor="pregnant-no">No</Label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      {/* Pregnancy Duration Field - Only for Pregnant Mare */}
      {selectedGender === "female" && selectedAgeClass === "mare" && isPregnant === "yes" && (
        <FormField
          control={form.control}
          name="pregnancyDuration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pregnancy Duration So Far (months) *</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  placeholder="Enter duration in months" 
                  {...field}
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </>
  );
};

export default ConditionalFieldsSection;
