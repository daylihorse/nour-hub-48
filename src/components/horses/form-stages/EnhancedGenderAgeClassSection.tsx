import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { HorseFormData } from "@/types/horse";
import { 
  calculateAge, 
  getClassificationRules, 
  autoClassifyHorse, 
  getAgeClassDisplayName,
  formatAge 
} from "@/utils/horseClassification";
import { Gender } from "@/types/horse-classification";

const EnhancedGenderAgeClassSection = () => {
  const form = useFormContext<HorseFormData>();
  const selectedGender = form.watch("gender") as Gender;
  const birthDate = form.watch("birthDate");
  
  // Calculate age and classification rules when gender or birth date changes
  useEffect(() => {
    if (selectedGender && birthDate) {
      const age = calculateAge(birthDate);
      const rules = getClassificationRules(age, selectedGender);
      const autoClassification = autoClassifyHorse(birthDate, selectedGender);
      
      // Auto-set age class for horses under 3 years
      if (rules.isUnder3Years && rules.availableClasses.length === 1) {
        form.setValue("ageClass", autoClassification.ageClass as any);
      } else {
        // Clear age class for manual selection
        form.setValue("ageClass", "");
      }
      
      // Clear dependent fields when gender or age changes
      form.setValue("adultMaleType", undefined);
      form.setValue("castrationDate", "");
      form.setValue("isPregnant", undefined);
      form.setValue("pregnancyDuration", undefined);
    }
  }, [selectedGender, birthDate, form]);

  const getAge = () => {
    if (!birthDate) return null;
    return calculateAge(birthDate);
  };

  const getRules = () => {
    if (!selectedGender || !birthDate) return null;
    const age = getAge();
    return age ? getClassificationRules(age, selectedGender) : null;
  };

  const age = getAge();
  const rules = getRules();

  return (
    <div className="space-y-6">
      {/* Gender Selection */}
      <FormField
        control={form.control}
        name="gender"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Gender *</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
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

      {/* Birth Date */}
      <FormField
        control={form.control}
        name="birthDate"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Birth Date *</FormLabel>
            <FormControl>
              <Input
                type="date"
                value={field.value || ''}
                onChange={field.onChange}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Age Display */}
      {age && (
        <div className="p-4 bg-muted rounded-lg">
          <h4 className="font-medium mb-2">Age Information</h4>
          <p className="text-sm text-muted-foreground">
            Current age: <Badge variant="secondary">{formatAge(age)}</Badge>
          </p>
          {age.isUnder3Years && (
            <p className="text-sm text-blue-600 mt-1">
              🔍 Young horse - age class will be automatically determined
            </p>
          )}
        </div>
      )}

      {/* Age Class Selection/Display */}
      {rules && (
        <FormField
          control={form.control}
          name="ageClass"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Age Class *</FormLabel>
              {rules.isUnder3Years ? (
                // Auto-classified for young horses
                <div className="space-y-2">
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm font-medium text-green-800">
                      Automatically classified as: {field.value && getAgeClassDisplayName(field.value as any)}
                    </p>
                    <p className="text-xs text-green-600 mt-1">
                      Classification is automatic for horses under 3 years old
                    </p>
                  </div>
                </div>
              ) : (
                // Manual selection for adult horses
                <div className="space-y-2">
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select age class" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {rules.availableClasses.map((ageClass) => (
                        <SelectItem key={ageClass} value={ageClass}>
                          {getAgeClassDisplayName(ageClass, selectedGender)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Choose the appropriate classification for this {age?.years}-year-old {selectedGender}
                  </FormDescription>
                </div>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      {/* Adult Male Type Selection */}
      {rules?.requiresAdultMaleType && (
        <FormField
          control={form.control}
          name="adultMaleType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Male Type *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select male type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="stallion">Stallion (Intact male)</SelectItem>
                  <SelectItem value="gelding">Gelding (Castrated male)</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Specify whether this adult male is intact (stallion) or castrated (gelding)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      {/* Castration Date for Geldings */}
      {form.watch("adultMaleType") === "gelding" && (
        <FormField
          control={form.control}
          name="castrationDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Castration Date *</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  value={field.value || ''}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormDescription>
                Date when the horse was castrated
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      {/* Pregnancy Status for Mares */}
      {rules?.allowsPregnancy && form.watch("ageClass") === "mare" && (
        <>
          <FormField
            control={form.control}
            name="isPregnant"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pregnancy Status *</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select pregnancy status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="no">Not Pregnant</SelectItem>
                    <SelectItem value="yes">Pregnant</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Pregnancy Duration for Pregnant Mares */}
          {form.watch("isPregnant") === "yes" && (
            <FormField
              control={form.control}
              name="pregnancyDuration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pregnancy Duration (weeks)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="1"
                      max="50"
                      placeholder="e.g., 28"
                      value={field.value || ''}
                      onChange={(e) => field.onChange(parseInt(e.target.value) || undefined)}
                    />
                  </FormControl>
                  <FormDescription>
                    How many weeks pregnant (horse gestation is typically 40-42 weeks)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </>
      )}
    </div>
  );
};

export default EnhancedGenderAgeClassSection;