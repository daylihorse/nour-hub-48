
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { HorseFormData } from "@/types/horse";
import PedigreeSelectWithAddNew from "../form-components/PedigreeSelectWithAddNew";
import AddParentHorseDialog from "../form-components/AddParentHorseDialog";

const PedigreeStage = () => {
  const form = useFormContext<HorseFormData>();
  const [dialogState, setDialogState] = useState<{
    isOpen: boolean;
    parentType: "sire" | "dam" | null;
  }>({
    isOpen: false,
    parentType: null,
  });
  
  // Mock data for existing horses - in a real app, this would come from an API
  const existingHorses = [
    { value: "stallion-1", label: "Thunder Bolt" },
    { value: "stallion-2", label: "Desert Storm" },
    { value: "stallion-3", label: "Golden Arrow" },
    { value: "mare-1", label: "Moonlight Dancer" },
    { value: "mare-2", label: "Silver Star" },
    { value: "mare-3", label: "Royal Beauty" },
  ];

  const handleAddNewParent = (parentType: "sire" | "dam") => {
    console.log(`Add new ${parentType} horse`);
    setDialogState({
      isOpen: true,
      parentType,
    });
  };

  const handleCloseDialog = () => {
    setDialogState({
      isOpen: false,
      parentType: null,
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Father Information</h3>
          <PedigreeSelectWithAddNew
            name="sire"
            label="Sire (Father)"
            placeholder="Select or add father..."
            options={existingHorses}
            onAddNew={() => handleAddNewParent("sire")}
            addNewLabel="Add New Father"
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Mother Information</h3>
          <PedigreeSelectWithAddNew
            name="dam"
            label="Dam (Mother)"
            placeholder="Select or add mother..."
            options={existingHorses}
            onAddNew={() => handleAddNewParent("dam")}
            addNewLabel="Add New Mother"
          />
        </div>
      </div>

      <div className="space-y-4">
        <FormField
          control={form.control}
          name="bloodlineOrigin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bloodline Origin</FormLabel>
              <FormControl>
                <Input placeholder="Enter bloodline origin" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {dialogState.parentType && (
        <AddParentHorseDialog
          isOpen={dialogState.isOpen}
          onClose={handleCloseDialog}
          parentType={dialogState.parentType}
        />
      )}
    </div>
  );
};

export default PedigreeStage;
