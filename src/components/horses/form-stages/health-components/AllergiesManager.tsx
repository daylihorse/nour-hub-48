
import { useFormContext } from "react-hook-form";
import { Plus, X } from "lucide-react";
import { useState } from "react";
import { FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HorseFormValues } from "../../form-schema/HorseFormSchema";

const AllergiesManager = () => {
  const form = useFormContext<HorseFormValues>();
  const [newAllergy, setNewAllergy] = useState("");

  const addAllergy = () => {
    if (newAllergy.trim()) {
      const currentAllergies = form.getValues("allergies") || [];
      form.setValue("allergies", [...currentAllergies, newAllergy.trim()]);
      setNewAllergy("");
    }
  };

  const removeAllergy = (index: number) => {
    const currentAllergies = form.getValues("allergies") || [];
    form.setValue("allergies", currentAllergies.filter((_, i) => i !== index));
  };

  const allergies = form.watch("allergies") || [];

  return (
    <div>
      <FormLabel>Allergies</FormLabel>
      <div className="flex gap-2 mt-2">
        <Input
          placeholder="Add allergy"
          value={newAllergy}
          onChange={(e) => setNewAllergy(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addAllergy())}
        />
        <Button type="button" onClick={addAllergy} size="icon">
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      {allergies.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {allergies.map((allergy, index) => (
            <Badge key={index} variant="destructive" className="flex items-center gap-1">
              {allergy}
              <button
                type="button"
                onClick={() => removeAllergy(index)}
                className="ml-1 hover:text-white"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllergiesManager;
