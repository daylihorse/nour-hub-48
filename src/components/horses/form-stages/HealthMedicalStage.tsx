
import { useFormContext } from "react-hook-form";
import { CalendarIcon, Plus, X } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { HorseFormValues } from "../form-schema/HorseFormSchema";

const HealthMedicalStage = () => {
  const form = useFormContext<HorseFormValues>();
  const [newCondition, setNewCondition] = useState("");
  const [newAllergy, setNewAllergy] = useState("");

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

  const medicalConditions = form.watch("medicalConditions") || [];
  const allergies = form.watch("allergies") || [];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="healthStatus"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Health Status *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select health status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="healthy">Healthy</SelectItem>
                  <SelectItem value="under_treatment">Under Treatment</SelectItem>
                  <SelectItem value="quarantine">Quarantine</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="vaccinationStatus"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vaccination Status *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select vaccination status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="up_to_date">Up to Date</SelectItem>
                  <SelectItem value="partial">Partial</SelectItem>
                  <SelectItem value="none">None</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lastVetCheckup"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Last Vet Checkup</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Select date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date > new Date()}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="space-y-4">
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
      </div>
    </div>
  );
};

export default HealthMedicalStage;
