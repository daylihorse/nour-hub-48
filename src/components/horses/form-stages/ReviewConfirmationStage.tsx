
import { useFormContext } from "react-hook-form";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Horse, User, Heart, Trophy, Home, DollarSign, FileText } from "lucide-react";
import { HorseFormValues } from "../form-schema/HorseFormSchema";

interface ReviewConfirmationStageProps {
  onSubmit: () => void;
}

const ReviewConfirmationStage = ({ onSubmit }: ReviewConfirmationStageProps) => {
  const form = useFormContext<HorseFormValues>();
  const formData = form.getValues();

  const renderSection = (title: string, icon: React.ReactNode, children: React.ReactNode) => (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {children}
      </CardContent>
    </Card>
  );

  const renderField = (label: string, value: any) => {
    if (!value || (Array.isArray(value) && value.length === 0)) return null;
    
    return (
      <div className="flex justify-between">
        <span className="text-muted-foreground">{label}:</span>
        <span className="font-medium">
          {value instanceof Date ? format(value, "PPP") : 
           Array.isArray(value) ? value.join(", ") : 
           typeof value === 'boolean' ? (value ? "Yes" : "No") :
           value}
        </span>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Review Horse Information</h2>
        <p className="text-muted-foreground">
          Please review all the information before registering the horse
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Information */}
        {renderSection(
          "Basic Information",
          <Horse className="h-5 w-5" />,
          <>
            {renderField("Name", formData.name)}
            {renderField("Arabic Name", formData.arabicName)}
            {renderField("Breed", formData.breed)}
            {renderField("Gender", formData.gender?.charAt(0).toUpperCase() + formData.gender?.slice(1))}
            {renderField("Birth Date", formData.birthDate)}
            {renderField("Color", formData.color)}
            {renderField("Height", formData.height ? `${formData.height} hands` : undefined)}
            {renderField("Weight", formData.weight ? `${formData.weight} kg` : undefined)}
          </>
        )}

        {/* Ownership */}
        {renderSection(
          "Ownership & Documentation",
          <User className="h-5 w-5" />,
          <>
            {renderField("Owner Type", formData.ownerType?.replace('_', ' '))}
            {renderField("Owner Name", formData.ownerName)}
            {renderField("Owner Contact", formData.ownerContact)}
            {renderField("Registration Number", formData.registrationNumber)}
            {renderField("Passport Number", formData.passportNumber)}
            {renderField("Microchip ID", formData.microchipId)}
          </>
        )}

        {/* Health Information */}
        {renderSection(
          "Health & Medical",
          <Heart className="h-5 w-5" />,
          <>
            {renderField("Health Status", formData.healthStatus?.replace('_', ' '))}
            {renderField("Vaccination Status", formData.vaccinationStatus?.replace('_', ' '))}
            {renderField("Last Vet Checkup", formData.lastVetCheckup)}
            {formData.medicalConditions && formData.medicalConditions.length > 0 && (
              <div>
                <span className="text-muted-foreground">Medical Conditions:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {formData.medicalConditions.map((condition, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {condition}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            {formData.allergies && formData.allergies.length > 0 && (
              <div>
                <span className="text-muted-foreground">Allergies:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {formData.allergies.map((allergy, index) => (
                    <Badge key={index} variant="destructive" className="text-xs">
                      {allergy}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* Training & Performance */}
        {renderSection(
          "Training & Performance",
          <Trophy className="h-5 w-5" />,
          <>
            {renderField("Training Level", formData.trainingLevel?.replace('_', ' '))}
            {formData.disciplines && formData.disciplines.length > 0 && (
              <div>
                <span className="text-muted-foreground">Disciplines:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {formData.disciplines.map((discipline, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {discipline}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* Stable Management */}
        {renderSection(
          "Stable Management", 
          <Home className="h-5 w-5" />,
          <>
            {renderField("Stall Number", formData.stallNumber)}
            {renderField("Feeding Schedule", formData.feedingSchedule)}
            {renderField("Exercise Routine", formData.exerciseRoutine)}
            {formData.specialNeeds && formData.specialNeeds.length > 0 && (
              <div>
                <span className="text-muted-foreground">Special Needs:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {formData.specialNeeds.map((need, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {need}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* Financial Information */}
        {renderSection(
          "Insurance & Financial",
          <DollarSign className="h-5 w-5" />,
          <>
            {renderField("Insured", formData.insured)}
            {renderField("Insurance Provider", formData.insuranceProvider)}
            {renderField("Insurance Value", formData.insuranceValue ? `$${formData.insuranceValue.toLocaleString()}` : undefined)}
            {renderField("Purchase Price", formData.purchasePrice ? `$${formData.purchasePrice.toLocaleString()}` : undefined)}
            {renderField("Market Value", formData.marketValue ? `$${formData.marketValue.toLocaleString()}` : undefined)}
          </>
        )}
      </div>

      {/* Files Summary */}
      {(formData.images?.length > 0 || formData.documents?.length > 0) && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <FileText className="h-5 w-5" />
              Files & Documents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-muted-foreground">Images:</span>
                <span className="ml-2 font-medium">{formData.images?.length || 0} files</span>
              </div>
              <div>
                <span className="text-muted-foreground">Documents:</span>
                <span className="ml-2 font-medium">{formData.documents?.length || 0} files</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Separator />

      <div className="bg-blue-50 p-6 rounded-lg text-center">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Ready to Register</h3>
        <p className="text-blue-700 mb-4">
          All information has been reviewed. Click the button below to register this horse in the stable management system.
        </p>
        <Button 
          onClick={onSubmit}
          size="lg"
          className="bg-green-600 hover:bg-green-700"
        >
          Register Horse
        </Button>
      </div>
    </div>
  );
};

export default ReviewConfirmationStage;
