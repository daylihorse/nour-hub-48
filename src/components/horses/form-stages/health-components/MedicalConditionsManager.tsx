
import { useFormContext } from "react-hook-form";
import { Plus, X } from "lucide-react";
import { useState } from "react";
import { FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HorseFormValues } from "../../form-schema/HorseFormSchema";

const MedicalConditionsManager = () => {
  const form = useFormContext<HorseFormValues>();
  const [newCondition, setNewCondition] = useState("");

  const addMedicalCondition = () => {
    if (newCondition.trim()) {
      const currentConditions = form.getValues("medicalConditions") || [];
      form.setValue("medicalConditions", [...currentConditions, newCondition.trim()]);
      setNewCondition("");
    }
  };

  const removeMedicalCondition = (index: number) => {
    const currentConditions = form.getValues("medicalConditions") || [];
    form.setValue("medicalConditions", currentConditions.filter((_, i) => i !== index));
  };

  const medicalConditions = form.watch("medicalConditions") || [];

  return (
    <div>
      <FormLabel>Medical Conditions</FormLabel>
      <div className="flex gap-2 mt-2">
        <Input
          placeholder="Add medical condition"
          value={newCondition}
          onChange={(e) => setNewCondition(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addMedicalCondition())}
        />
        <Button type="button" onClick={addMedicalCondition} size="icon">
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      {medicalConditions.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {medicalConditions.map((condition, index) => (
            <Badge key={index} variant="secondary" className="flex items-center gap-1">
              {condition}
              <button
                type="button"
                onClick={() => removeMedicalCondition(index)}
                className="ml-1 hover:text-destructive"
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

export default MedicalConditionsManager;
