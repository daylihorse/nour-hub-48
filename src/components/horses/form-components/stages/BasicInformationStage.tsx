
import { useFormContext } from "react-hook-form";
import { HorseFormData } from "@/types/horse-unified";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AgeDisplay from "../AgeDisplay";

const BasicInformationStage = () => {
  const { register, setValue, watch, formState: { errors } } = useFormContext<HorseFormData>();
  
  const watchedGender = watch("gender");
  const watchedAgeClass = watch("ageClass");
  const watchedAdultMaleType = watch("adultMaleType");
  const watchedIsPregnant = watch("isPregnant");
  const birthDate = watch("birthDate");

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Horse Name *</Label>
          <Input
            id="name"
            {...register("name")}
            placeholder="Enter horse name"
          />
          {errors.name && (
            <p className="text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="arabicName">Arabic Name</Label>
          <Input
            id="arabicName"
            {...register("arabicName")}
            placeholder="Enter Arabic name (optional)"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="breed">Breed *</Label>
          <Select onValueChange={(value) => setValue("breed", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select breed" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Arabian">Arabian</SelectItem>
              <SelectItem value="Thoroughbred">Thoroughbred</SelectItem>
              <SelectItem value="Quarter Horse">Quarter Horse</SelectItem>
              <SelectItem value="Andalusian">Andalusian</SelectItem>
              <SelectItem value="Friesian">Friesian</SelectItem>
              <SelectItem value="Warmblood">Warmblood</SelectItem>
              <SelectItem value="Paint Horse">Paint Horse</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
          {errors.breed && (
            <p className="text-sm text-red-600">{errors.breed.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="gender">Gender *</Label>
          <Select 
            value={watchedGender}
            onValueChange={(value) => setValue("gender", value as "stallion" | "mare" | "gelding")}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mare">Mare</SelectItem>
              <SelectItem value="stallion">Stallion</SelectItem>
              <SelectItem value="gelding">Gelding</SelectItem>
            </SelectContent>
          </Select>
          {errors.gender && (
            <p className="text-sm text-red-600">{errors.gender.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="birthDate">Birth Date *</Label>
          <Input
            id="birthDate"
            type="date"
            {...register("birthDate")}
          />
          {birthDate && <AgeDisplay birthDate={birthDate} />}
          {errors.birthDate && (
            <p className="text-sm text-red-600">{errors.birthDate.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="color">Color *</Label>
          <Select onValueChange={(value) => setValue("color", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select color" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Bay">Bay</SelectItem>
              <SelectItem value="Chestnut">Chestnut</SelectItem>
              <SelectItem value="Black">Black</SelectItem>
              <SelectItem value="Gray">Gray</SelectItem>
              <SelectItem value="Brown">Brown</SelectItem>
              <SelectItem value="Palomino">Palomino</SelectItem>
              <SelectItem value="Pinto">Pinto</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
          {errors.color && (
            <p className="text-sm text-red-600">{errors.color.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="height">Height (hands)</Label>
          <Input
            id="height"
            type="number"
            step="0.1"
            {...register("height", { valueAsNumber: true })}
            placeholder="e.g., 15.2"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="weight">Weight (lbs)</Label>
          <Input
            id="weight"
            type="number"
            {...register("weight", { valueAsNumber: true })}
            placeholder="e.g., 1000"
          />
        </div>
      </div>

      {/* Identification Section */}
      <div className="border-t pt-6">
        <h4 className="text-lg font-semibold mb-4">Identification</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label htmlFor="registrationNumber">Registration Number</Label>
            <Input
              id="registrationNumber"
              {...register("registrationNumber")}
              placeholder="Enter registration number"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="passportNumber">Passport Number</Label>
            <Input
              id="passportNumber"
              {...register("passportNumber")}
              placeholder="Enter passport number"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="microchipId">Microchip ID</Label>
            <Input
              id="microchipId"
              {...register("microchipId")}
              placeholder="Enter microchip ID"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicInformationStage;
