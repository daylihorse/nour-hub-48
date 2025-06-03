
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { HorseFormData } from "@/types/horse";
import { horseBreeds, horseColors } from "../form-components/constants/formOptions";
import EnhancedSelectWithAddNew from "../form-components/EnhancedSelectWithAddNew";
import AddColorDialog from "../form-components/dialogs/AddColorDialog";
import AddBreedDialog from "../form-components/dialogs/AddBreedDialog";

const BasicInformationStage = () => {
  const form = useFormContext<HorseFormData>();
  const [isColorDialogOpen, setIsColorDialogOpen] = useState(false);
  const [isBreedDialogOpen, setIsBreedDialogOpen] = useState(false);
  const [customColors, setCustomColors] = useState<Array<{ value: string; label: string; arabicLabel: string; description: string }>>([]);
  const [customBreeds, setCustomBreeds] = useState<Array<{ value: string; label: string; arabicLabel: string; description: string }>>([]);

  // Watch gender and related fields for conditional rendering
  const selectedGender = form.watch("gender");
  const selectedAgeClass = form.watch("ageClass");
  const selectedAdultMaleType = form.watch("adultMaleType");
  const isPregnant = form.watch("isPregnant");

  const handleAddColor = (newColor: { value: string; label: string; arabicLabel: string; description: string }) => {
    setCustomColors(prev => [...prev, newColor]);
    form.setValue("color", newColor.value);
  };

  const handleAddBreed = (newBreed: { value: string; label: string; arabicLabel: string; description: string }) => {
    setCustomBreeds(prev => [...prev, newBreed]);
    form.setValue("breed", newBreed.value);
  };

  const allColors = [...horseColors, ...customColors];
  const allBreeds = [...horseBreeds, ...customBreeds];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Horse Name *</FormLabel>
              <FormControl>
                <Input placeholder="Enter horse name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="arabicName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Arabic Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter Arabic name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <EnhancedSelectWithAddNew
          name="breed"
          label="Breed"
          placeholder="Select breed"
          options={allBreeds}
          required
          onAddNew={() => setIsBreedDialogOpen(true)}
          addNewLabel="Add New Breed"
        />

        {/* Enhanced Gender Field with Conditional Logic */}
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

        {/* Age Class Field - Conditional based on Gender */}
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

        {/* Status Field */}
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status *</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="active" id="status-active" />
                    <Label htmlFor="status-active">Active</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="inactive" id="status-inactive" />
                    <Label htmlFor="status-inactive">Inactive</Label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <EnhancedSelectWithAddNew
          name="color"
          label="Color"
          placeholder="Select color"
          options={allColors}
          required
          onAddNew={() => setIsColorDialogOpen(true)}
          addNewLabel="Add New Color"
        />

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
      </div>

      <AddColorDialog
        open={isColorDialogOpen}
        onOpenChange={setIsColorDialogOpen}
        onAddColor={handleAddColor}
      />

      <AddBreedDialog
        open={isBreedDialogOpen}
        onOpenChange={setIsBreedDialogOpen}
        onAddBreed={handleAddBreed}
      />
    </div>
  );
};

export default BasicInformationStage;
