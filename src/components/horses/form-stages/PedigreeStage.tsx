
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
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Father Section */}
        <div className="space-y-4">
          <div className="border-b pb-2">
            <h3 className="text-lg font-semibold text-gray-800">Father Information</h3>
            <p className="text-sm text-gray-600 mt-1">
              Select the sire (father) from existing horses or add a new one to the system.
            </p>
          </div>
          
          <PedigreeSelectWithAddNew
            name="sire"
            label="Sire (Father)"
            placeholder="Select or add father..."
            options={existingHorses}
            onAddNew={() => handleAddNewParent("sire")}
            addNewLabel="Add New Father"
          />
          
          <div className="bg-blue-50 p-3 rounded-md">
            <p className="text-xs text-blue-700">
              💡 If the father is not in the list, use "Add New Father" to register them in the system first.
            </p>
          </div>
        </div>

        {/* Mother Section */}
        <div className="space-y-4">
          <div className="border-b pb-2">
            <h3 className="text-lg font-semibold text-gray-800">Mother Information</h3>
            <p className="text-sm text-gray-600 mt-1">
              Select the dam (mother) from existing horses or add a new one to the system.
            </p>
          </div>
          
          <PedigreeSelectWithAddNew
            name="dam"
            label="Dam (Mother)"
            placeholder="Select or add mother..."
            options={existingHorses}
            onAddNew={() => handleAddNewParent("dam")}
            addNewLabel="Add New Mother"
          />
          
          <div className="bg-pink-50 p-3 rounded-md">
            <p className="text-xs text-pink-700">
              💡 If the mother is not in the list, use "Add New Mother" to register them in the system first.
            </p>
          </div>
        </div>
      </div>

      {/* Bloodline Origin Field */}
      <div className="space-y-4 pt-6 border-t">
        <div className="border-b pb-2">
          <h3 className="text-lg font-semibold text-gray-800">Bloodline Information</h3>
          <p className="text-sm text-gray-600 mt-1">
            Additional pedigree and bloodline details for this horse.
          </p>
        </div>
        
        <FormField
          control={form.control}
          name="bloodlineOrigin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bloodline Origin</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Enter bloodline origin (e.g., Arabian, Thoroughbred, etc.)" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Add Parent Horse Dialog */}
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
