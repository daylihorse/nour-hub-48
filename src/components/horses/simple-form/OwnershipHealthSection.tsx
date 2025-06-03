
import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SimpleHorseFormData } from "../form-schema/SimpleHorseFormSchema";

interface OwnershipHealthSectionProps {
  form: UseFormReturn<SimpleHorseFormData>;
}

const OwnershipHealthSection = ({ form }: OwnershipHealthSectionProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Ownership & Health</h3>
      
      <div className="space-y-2">
        <Label htmlFor="ownerType">Owner Type *</Label>
        <Select onValueChange={(value) => form.setValue("ownerType", value as any)}>
          <SelectTrigger>
            <SelectValue placeholder="Select owner type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="individual">Individual</SelectItem>
            <SelectItem value="company">Company</SelectItem>
            <SelectItem value="partnership">Partnership</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="ownerName">Owner Name *</Label>
        <Input
          id="ownerName"
          {...form.register("ownerName")}
          placeholder="Enter owner name"
        />
        {form.formState.errors.ownerName && (
          <p className="text-sm text-red-500">{form.formState.errors.ownerName.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="ownerContact">Owner Contact *</Label>
        <Input
          id="ownerContact"
          {...form.register("ownerContact")}
          placeholder="Phone or email"
        />
        {form.formState.errors.ownerContact && (
          <p className="text-sm text-red-500">{form.formState.errors.ownerContact.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="healthStatus">Health Status *</Label>
        <Select onValueChange={(value) => form.setValue("healthStatus", value as any)}>
          <SelectTrigger>
            <SelectValue placeholder="Select health status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="healthy">Healthy</SelectItem>
            <SelectItem value="under_treatment">Under Treatment</SelectItem>
            <SelectItem value="quarantine">Quarantine</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="vaccinationStatus">Vaccination Status *</Label>
        <Select onValueChange={(value) => form.setValue("vaccinationStatus", value as any)}>
          <SelectTrigger>
            <SelectValue placeholder="Select vaccination status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="up_to_date">Up to Date</SelectItem>
            <SelectItem value="partial">Partial</SelectItem>
            <SelectItem value="none">None</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="trainingLevel">Training Level *</Label>
        <Select onValueChange={(value) => form.setValue("trainingLevel", value as any)}>
          <SelectTrigger>
            <SelectValue placeholder="Select training level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="untrained">Untrained</SelectItem>
            <SelectItem value="basic">Basic</SelectItem>
            <SelectItem value="intermediate">Intermediate</SelectItem>
            <SelectItem value="advanced">Advanced</SelectItem>
            <SelectItem value="professional">Professional</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default OwnershipHealthSection;
