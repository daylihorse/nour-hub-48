
import { useFormContext } from "react-hook-form";
import { HorseFormData } from "@/types/horse-unified";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const OwnershipDocumentationStage = () => {
  const { register, setValue, formState: { errors } } = useFormContext<HorseFormData>();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="ownerType">Owner Type *</Label>
          <Select onValueChange={(value) => setValue("ownerType", value as "individual" | "company" | "partnership")}>
            <SelectTrigger>
              <SelectValue placeholder="Select owner type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="individual">Individual</SelectItem>
              <SelectItem value="company">Company</SelectItem>
              <SelectItem value="partnership">Partnership</SelectItem>
            </SelectContent>
          </Select>
          {errors.ownerType && (
            <p className="text-sm text-red-600">{errors.ownerType.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="ownerName">Owner Name *</Label>
          <Input
            id="ownerName"
            {...register("ownerName")}
            placeholder="Enter owner name"
          />
          {errors.ownerName && (
            <p className="text-sm text-red-600">{errors.ownerName.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="ownerContact">Owner Contact *</Label>
          <Input
            id="ownerContact"
            {...register("ownerContact")}
            placeholder="Phone, email, or address"
          />
          {errors.ownerContact && (
            <p className="text-sm text-red-600">{errors.ownerContact.message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OwnershipDocumentationStage;
