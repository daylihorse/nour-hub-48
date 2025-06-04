
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { HorseFormData } from "@/types/horse";
import { horseBreeds, horseColors } from "../../form-components/constants/formOptions";
import EnhancedSelectWithAddNew from "../../form-components/EnhancedSelectWithAddNew";
import AddColorDialog from "../../form-components/dialogs/AddColorDialog";
import AddBreedDialog from "../../form-components/dialogs/AddBreedDialog";

const BasicDetailsSection = () => {
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
    <>
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

      <EnhancedSelectWithAddNew
        name="color"
        label="Color"
        placeholder="Select color"
        options={allColors}
        required
        onAddNew={() => setIsColorDialogOpen(true)}
        addNewLabel="Add New Color"
      />

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
    </>
  );
};

export default BasicDetailsSection;
