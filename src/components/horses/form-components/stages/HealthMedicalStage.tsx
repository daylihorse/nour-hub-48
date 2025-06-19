
import { useFormContext } from "react-hook-form";
import { HorseFormData } from "@/types/horse-unified";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const HealthMedicalStage = () => {
  const { register, setValue, formState: { errors } } = useFormContext<HorseFormData>();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="healthStatus">Health Status *</Label>
          <Select onValueChange={(value) => setValue("healthStatus", value as "healthy" | "under_treatment" | "quarantine")}>
            <SelectTrigger>
              <SelectValue placeholder="Select health status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="healthy">Healthy</SelectItem>
              <SelectItem value="under_treatment">Under Treatment</SelectItem>
              <SelectItem value="quarantine">Quarantine</SelectItem>
            </SelectContent>
          </Select>
          {errors.healthStatus && (
            <p className="text-sm text-red-600">{errors.healthStatus.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="vaccinationStatus">Vaccination Status *</Label>
          <Select onValueChange={(value) => setValue("vaccinationStatus", value as "up_to_date" | "partial" | "none")}>
            <SelectTrigger>
              <SelectValue placeholder="Select vaccination status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="up_to_date">Up to Date</SelectItem>
              <SelectItem value="partial">Partial</SelectItem>
              <SelectItem value="none">None</SelectItem>
            </SelectContent>
          </Select>
          {errors.vaccinationStatus && (
            <p className="text-sm text-red-600">{errors.vaccinationStatus.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastVetCheckup">Last Vet Checkup</Label>
          <Input
            id="lastVetCheckup"
            type="date"
            {...register("lastVetCheckup")}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="medicalConditions">Medical Conditions</Label>
          <Textarea
            id="medicalConditions"
            {...register("medicalConditions")}
            placeholder="List any medical conditions"
            rows={3}
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="allergies">Allergies</Label>
          <Textarea
            id="allergies"
            {...register("allergies")}
            placeholder="List any known allergies"
            rows={3}
          />
        </div>
      </div>
    </div>
  );
};

export default HealthMedicalStage;
