
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { HorseFormData } from "@/types/horse";
import { horseBreeds, horseColors, genderOptions } from "../form-components/constants/formOptions";
import EnhancedSelectWithAddNew from "../form-components/EnhancedSelectWithAddNew";
import AddColorDialog from "../form-components/dialogs/AddColorDialog";
import AddBreedDialog from "../form-components/dialogs/AddBreedDialog";

const BasicInformationStage = () => {
  const form = useFormContext<HorseFormData>();
  const [isColorDialogOpen, setIsColorDialogOpen] = useState(false);
  const [isBreedDialogOpen, setIsBreedDialogOpen] = useState(false);
  const [customColors, setCustomColors] = useState<Array<{ value: string; label: string; arabicLabel: string; description: string }>>([]);
  const [customBreeds, setCustomBreeds] = useState<Array<{ value: string; label: string; arabicLabel: string; description: string }>>([]);

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

        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="stallion">Stallion</SelectItem>
                  <SelectItem value="mare">Mare</SelectItem>
                  <SelectItem value="gelding">Gelding</SelectItem>
                </SelectContent>
              </Select>
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
