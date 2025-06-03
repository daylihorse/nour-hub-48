import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { HorseFormData } from "@/types/horse";
import { useToast } from "@/hooks/use-toast";

const simpleHorseSchema = z.object({
  name: z.string().min(1, "Horse name is required"),
  breed: z.string().min(1, "Breed is required"),
  gender: z.enum(["stallion", "mare", "gelding"]),
  birthDate: z.string().min(1, "Birth date is required"),
  color: z.string().min(1, "Color is required"),
  ownerType: z.enum(["individual", "company", "partnership"]),
  ownerName: z.string().min(1, "Owner name is required"),
  ownerContact: z.string().min(1, "Owner contact is required"),
  healthStatus: z.enum(["healthy", "under_treatment", "quarantine"]),
  vaccinationStatus: z.enum(["up_to_date", "partial", "none"]),
  trainingLevel: z.enum(["untrained", "basic", "intermediate", "advanced", "professional"]),
  insured: z.boolean(),
  status: z.enum(["active", "inactive", "transferred", "deceased"]),
});

type SimpleHorseFormData = z.infer<typeof simpleHorseSchema>;

interface AddHorseFormSimpleProps {
  onSave: (data: HorseFormData) => void;
  onCancel: () => void;
}

const AddHorseFormSimple = ({ onSave, onCancel }: AddHorseFormSimpleProps) => {
  console.log("AddHorseFormSimple rendering...");
  
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<SimpleHorseFormData>({
    resolver: zodResolver(simpleHorseSchema),
    defaultValues: {
      name: "",
      breed: "",
      gender: "mare",
      birthDate: "",
      color: "",
      ownerType: "individual",
      ownerName: "",
      ownerContact: "",
      healthStatus: "healthy",
      vaccinationStatus: "up_to_date",
      trainingLevel: "untrained",
      insured: false,
      status: "active",
    },
  });

  const handleSubmit = async (data: SimpleHorseFormData) => {
    console.log("Form submission started with data:", data);
    setIsSubmitting(true);
    
    try {
      // Convert the simple form data to the full HorseFormData format
      // Create the object explicitly with all required fields to satisfy TypeScript
      const fullData: HorseFormData = {
        name: data.name,
        breed: data.breed,
        gender: data.gender,
        birthDate: new Date(data.birthDate),
        color: data.color,
        ownerType: data.ownerType,
        ownerName: data.ownerName,
        ownerContact: data.ownerContact,
        healthStatus: data.healthStatus,
        vaccinationStatus: data.vaccinationStatus,
        trainingLevel: data.trainingLevel,
        insured: data.insured,
        status: data.status,
        // Required fields from HorseFormData that weren't in our simple form
        // Adding empty arrays or default values as needed
        images: [],
        documents: [],
        // Optional fields can be undefined
        arabicName: undefined,
        height: undefined,
        weight: undefined,
        registrationNumber: undefined,
        passportNumber: undefined,
        microchipId: undefined,
        sire: undefined,
        dam: undefined,
        bloodlineOrigin: undefined,
        lastVetCheckup: undefined,
        medicalConditions: [],
        allergies: [],
        disciplines: [],
        competitionHistory: [],
        achievements: [],
        stallNumber: undefined,
        feedingSchedule: undefined,
        exerciseRoutine: undefined,
        specialNeeds: [],
        insuranceProvider: undefined,
        insuranceValue: undefined,
        purchasePrice: undefined,
        marketValue: undefined,
      };
      
      console.log("Calling onSave with:", fullData);
      await onSave(fullData);
      
      toast({
        title: "Success!",
        description: `${data.name} has been registered successfully.`,
      });
    } catch (error) {
      console.error("Error saving horse:", error);
      toast({
        title: "Error",
        description: "Failed to register horse. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">Add New Horse</CardTitle>
              <p className="text-muted-foreground">Register a new horse in the stable</p>
            </div>
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Information */}
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

              {/* Ownership & Health */}
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
            </div>

            <div className="flex justify-end gap-4 pt-6 border-t">
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Registering..." : "Register Horse"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddHorseFormSimple;
