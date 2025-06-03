
import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SimpleHorseFormData } from "../form-schema/SimpleHorseFormSchema";

interface BasicInformationSectionProps {
  form: UseFormReturn<SimpleHorseFormData>;
}

const BasicInformationSection = ({ form }: BasicInformationSectionProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Basic Information</h3>
      
      <div className="space-y-2">
        <Label htmlFor="name">Horse Name *</Label>
        <Input
          id="name"
          {...form.register("name")}
          placeholder="Enter horse name"
        />
        {form.formState.errors.name && (
          <p className="text-sm text-red-500">{form.formState.errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="breed">Breed *</Label>
        <Input
          id="breed"
          {...form.register("breed")}
          placeholder="e.g., Arabian, Thoroughbred"
        />
        {form.formState.errors.breed && (
          <p className="text-sm text-red-500">{form.formState.errors.breed.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="gender">Gender *</Label>
        <Select onValueChange={(value) => form.setValue("gender", value as any)}>
          <SelectTrigger>
            <SelectValue placeholder="Select gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="stallion">Stallion</SelectItem>
            <SelectItem value="mare">Mare</SelectItem>
            <SelectItem value="gelding">Gelding</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="birthDate">Birth Date *</Label>
        <Input
          id="birthDate"
          type="date"
          {...form.register("birthDate")}
        />
        {form.formState.errors.birthDate && (
          <p className="text-sm text-red-500">{form.formState.errors.birthDate.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="color">Color *</Label>
        <Input
          id="color"
          {...form.register("color")}
          placeholder="e.g., Bay, Chestnut, Black"
        />
        {form.formState.errors.color && (
          <p className="text-sm text-red-500">{form.formState.errors.color.message}</p>
        )}
      </div>
    </div>
  );
};

export default BasicInformationSection;
