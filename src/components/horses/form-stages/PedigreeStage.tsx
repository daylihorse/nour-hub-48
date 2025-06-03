
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { HorseFormData } from "@/types/horse";
import PedigreeSelectWithAddNew from "../form-components/PedigreeSelectWithAddNew";

const PedigreeStage = () => {
  const form = useFormContext<HorseFormData>();
  
  // Mock data for existing horses - in a real app, this would come from an API
  const existingHorses = [
    { value: "stallion-1", label: "Thunder Bolt" },
    { value: "stallion-2", label: "Desert Storm" },
    { value: "stallion-3", label: "Golden Arrow" },
    { value: "mare-1", label: "Moonlight Dancer" },
    { value: "mare-2", label: "Silver Star" },
    { value: "mare-3", label: "Royal Beauty" },
  ];

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
            onAddNew={() => console.log("Add new father horse")}
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
            onAddNew={() => console.log("Add new mother horse")}
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
    </div>
  );
};

export default PedigreeStage;
