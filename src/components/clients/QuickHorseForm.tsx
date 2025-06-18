import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

const quickHorseSchema = z.object({
  name: z.string().min(1, "Horse name is required"),
  breed: z.string().min(1, "Breed is required"),
  gender: z.enum(["stallion", "mare", "gelding"], {
    errorMap: () => ({ message: "Please select a gender" })
  }),
  ageGroup: z.enum(["foal", "yearling", "young", "adult", "senior"], {
    errorMap: () => ({ message: "Please select an age group" })
  }),
  estimatedAge: z.string().optional()
});

type QuickHorseFormData = z.infer<typeof quickHorseSchema>;

interface QuickHorseFormProps {
  onHorseAdd: (horse: { name: string; breed: string; gender: 'stallion' | 'mare' | 'gelding'; age?: number }) => void;
}

const QuickHorseForm = ({ onHorseAdd }: QuickHorseFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors }
  } = useForm<QuickHorseFormData>({
    resolver: zodResolver(quickHorseSchema),
    defaultValues: {
      name: "",
      breed: "",
      gender: "mare",
      ageGroup: "adult",
      estimatedAge: ""
    }
  });

  const watchedGender = watch("gender");
  const watchedAgeGroup = watch("ageGroup");

  const onSubmit = async (data: QuickHorseFormData) => {
    setIsSubmitting(true);
    try {
      // Convert age group to estimated age if not provided
      let estimatedAge: number | undefined;
      if (data.estimatedAge) {
        estimatedAge = parseInt(data.estimatedAge);
      } else {
        // Default ages based on age group
        switch (data.ageGroup) {
          case "foal": estimatedAge = 0; break;
          case "yearling": estimatedAge = 1; break;
          case "young": estimatedAge = 3; break;
          case "adult": estimatedAge = 8; break;
          case "senior": estimatedAge = 15; break;
        }
      }

      onHorseAdd({
        name: data.name,
        breed: data.breed,
        gender: data.gender,
        age: estimatedAge
      });

      toast.success(`${data.name} has been added as an incomplete horse record`);
      reset();
    } catch (error) {
      console.error("Error adding horse:", error);
      toast.error("Failed to add horse");
    } finally {
      setIsSubmitting(false);
    }
  };

  const commonBreeds = [
    "Arabian",
    "Thoroughbred", 
    "Quarter Horse",
    "Andalusian",
    "Friesian",
    "Warmblood",
    "Paint Horse",
    "Appaloosa",
    "Morgan",
    "Tennessee Walker",
    "Mustang",
    "Other"
  ];

  return (
    <Card className="border-orange-200 bg-orange-50/30">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-base">
          <Plus className="h-4 w-4 text-orange-600" />
          Add New Horse (Incomplete Record)
          <Badge variant="secondary" className="bg-orange-100 text-orange-800">
            Quick Entry
          </Badge>
        </CardTitle>
        <div className="flex items-start gap-2 p-3 bg-orange-100 rounded-lg border border-orange-200">
          <AlertTriangle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-orange-800">
            <p className="font-medium">Incomplete Registration</p>
            <p className="text-xs mt-1">
              This will create a basic horse record. Complete registration with remaining 7 steps must be done in the Horse Department.
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <Label htmlFor="breed">Breed *</Label>
              <Select onValueChange={(value) => setValue("breed", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select breed" />
                </SelectTrigger>
                <SelectContent>
                  {commonBreeds.map((breed) => (
                    <SelectItem key={breed} value={breed}>
                      {breed}
                    </SelectItem>
                  ))}
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
              <Label htmlFor="ageGroup">Age Group *</Label>
              <Select 
                value={watchedAgeGroup}
                onValueChange={(value) => setValue("ageGroup", value as any)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select age group" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="foal">Foal (0-1 year)</SelectItem>
                  <SelectItem value="yearling">Yearling (1-2 years)</SelectItem>
                  <SelectItem value="young">Young (2-5 years)</SelectItem>
                  <SelectItem value="adult">Adult (5-15 years)</SelectItem>
                  <SelectItem value="senior">Senior (15+ years)</SelectItem>
                </SelectContent>
              </Select>
              {errors.ageGroup && (
                <p className="text-sm text-red-600">{errors.ageGroup.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="estimatedAge">Estimated Age (Optional)</Label>
            <Input
              id="estimatedAge"
              type="number"
              min="0"
              max="40"
              {...register("estimatedAge")}
              placeholder="Enter specific age if known"
            />
            <p className="text-xs text-gray-500">
              Leave blank to use default age for selected age group
            </p>
          </div>

          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-orange-600 hover:bg-orange-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            {isSubmitting ? "Adding Horse..." : "Add Incomplete Horse Record"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default QuickHorseForm;
