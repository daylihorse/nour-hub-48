import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { EnhancedHorseFormData } from "@/types/horse-enhanced";
import EnhancedBasicInformationStage from "./form-stages/EnhancedBasicInformationStage";
import { ArrowLeft, ArrowRight, Save, X } from "lucide-react";

// Enhanced form schema with new classification fields
const enhancedHorseFormSchema = z.object({
  name: z.string().min(1, "Horse name is required"),
  arabicName: z.string().optional(),
  breed: z.string().min(1, "Breed is required"),
  gender: z.enum(["male", "female"], { required_error: "Gender is required" }),
  birthDate: z.string().min(1, "Birth date is required"),
  color: z.string().min(1, "Color is required"),
  ageClass: z.string().optional(),
  adultMaleType: z.enum(["stallion", "gelding"]).optional(),
  castrationDate: z.string().optional(),
  isPregnant: z.enum(["yes", "no"]).optional(),
  pregnancyDuration: z.number().min(1).max(50).optional(),
  ownerType: z.enum(["individual", "company", "partnership"]),
  ownerName: z.string().min(1, "Owner name is required"),
  ownerContact: z.string().optional(),
  registrationNumber: z.string().optional(),
  passportNumber: z.string().optional(),
  microchipId: z.string().optional(),
  healthStatus: z.enum(["healthy", "under_treatment", "quarantine"]),
  vaccinationStatus: z.enum(["up_to_date", "partial", "none"]),
  trainingLevel: z.string().optional(),
  insured: z.boolean(),
  images: z.array(z.string()),
  documents: z.array(z.string()),
  status: z.enum(["active", "inactive", "transferred", "deceased"]),
}).refine((data) => {
  // Validation: Geldings must have castration date
  if (data.adultMaleType === "gelding" && !data.castrationDate) {
    return false;
  }
  return true;
}, {
  message: "Castration date is required for geldings",
  path: ["castrationDate"]
}).refine((data) => {
  // Validation: Adult males (3+ years) must specify stallion/gelding
  if (data.gender === "male" && data.ageClass && 
      !["foal", "colt"].includes(data.ageClass) && 
      !data.adultMaleType) {
    return false;
  }
  return true;
}, {
  message: "Adult male type is required for stallions and geldings",
  path: ["adultMaleType"]
});

interface EnhancedAddHorseFormProps {
  onSave: (data: EnhancedHorseFormData) => void;
  onCancel: () => void;
}

const EnhancedAddHorseForm = ({ onSave, onCancel }: EnhancedAddHorseFormProps) => {
  const [currentStage, setCurrentStage] = useState(0);
  const { toast } = useToast();

  const form = useForm<EnhancedHorseFormData>({
    resolver: zodResolver(enhancedHorseFormSchema),
    defaultValues: {
      name: "",
      breed: "",
      gender: "female",
      birthDate: new Date().toISOString().split('T')[0],
      color: "",
      ownerType: "individual",
      ownerName: "",
      ownerContact: "",
      healthStatus: "healthy",
      vaccinationStatus: "up_to_date",
      trainingLevel: "untrained",
      insured: false,
      images: [],
      documents: [],
      status: "active",
    },
    mode: "onChange",
  });

  const stages = [
    {
      title: "Basic Information & Classification",
      description: "Enter basic horse details with smart age-based classification"
    },
    {
      title: "Ownership & Registration",
      description: "Owner details and registration information"
    },
    {
      title: "Health & Medical",
      description: "Health status and medical information"
    }
  ];

  const handleSubmit = async (data: EnhancedHorseFormData) => {
    try {
      await onSave(data);
      toast({
        title: "Success",
        description: "Horse registered successfully with enhanced classification!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to register horse. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleNext = async () => {
    let isValid = false;
    
    // Validate current stage fields
    if (currentStage === 0) {
      isValid = await form.trigger(["name", "breed", "gender", "birthDate", "color", "ageClass", "adultMaleType", "castrationDate", "isPregnant"]);
    }
    
    if (isValid && currentStage < stages.length - 1) {
      setCurrentStage(currentStage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStage > 0) {
      setCurrentStage(currentStage - 1);
    }
  };

  const renderStageContent = () => {
    switch (currentStage) {
      case 0:
        return <EnhancedBasicInformationStage />;
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Ownership & Registration</h3>
            <p className="text-muted-foreground">This section will contain ownership and registration fields...</p>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Health & Medical</h3>
            <p className="text-muted-foreground">This section will contain health and medical fields...</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Enhanced Horse Registration</h2>
          <p className="text-muted-foreground">
            Smart age-based classification system for accurate horse categorization
          </p>
        </div>
        <Button variant="outline" onClick={onCancel}>
          <X className="h-4 w-4 mr-2" />
          Cancel
        </Button>
      </div>

      {/* Progress Indicator */}
      <div className="flex items-center space-x-4">
        {stages.map((stage, index) => (
          <div
            key={index}
            className={`flex items-center space-x-2 ${
              index <= currentStage ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                index <= currentStage
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {index + 1}
            </div>
            <span className="text-sm font-medium hidden sm:block">{stage.title}</span>
            {index < stages.length - 1 && (
              <div className="w-8 h-px bg-border ml-2" />
            )}
          </div>
        ))}
      </div>

      {/* Form Content */}
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{stages[currentStage].title}</CardTitle>
              <p className="text-muted-foreground">{stages[currentStage].description}</p>
            </CardHeader>
            <CardContent>
              {renderStageContent()}
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStage === 0}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            <div className="flex gap-2">
              {currentStage === stages.length - 1 ? (
                <Button type="submit">
                  <Save className="h-4 w-4 mr-2" />
                  Save Horse
                </Button>
              ) : (
                <Button type="button" onClick={handleNext}>
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
          </div>
        </form>
      </FormProvider>

      {/* Debug Info (Development Only) */}
      {process.env.NODE_ENV === 'development' && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">Debug Info</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="text-xs text-muted-foreground overflow-auto">
              {JSON.stringify(form.watch(), null, 2)}
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EnhancedAddHorseForm;