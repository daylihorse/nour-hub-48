
import { useFormContext } from "react-hook-form";
import { Heart, User, Trophy, Home, DollarSign } from "lucide-react";
import { HorseFormValues } from "../form-schema/HorseFormSchema";
import ReviewHeader from "./review-components/ReviewHeader";
import ReviewSection from "./review-components/ReviewSection";
import ReviewFieldDisplay from "./review-components/ReviewFieldDisplay";
import ReviewFilesSection from "./review-components/ReviewFilesSection";
import ReviewSubmitSection from "./review-components/ReviewSubmitSection";

interface ReviewConfirmationStageProps {
  onSubmit: () => void;
}

const ReviewConfirmationStage = ({ onSubmit }: ReviewConfirmationStageProps) => {
  const form = useFormContext<HorseFormValues>();
  const formData = form.getValues();

  return (
    <div className="space-y-6">
      <ReviewHeader />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Information */}
        <ReviewSection title="Basic Information" icon={<Heart className="h-5 w-5" />}>
          <ReviewFieldDisplay label="Name" value={formData.name} />
          <ReviewFieldDisplay label="Arabic Name" value={formData.arabicName} />
          <ReviewFieldDisplay label="Breed" value={formData.breed} />
          <ReviewFieldDisplay label="Gender" value={formData.gender?.charAt(0).toUpperCase() + formData.gender?.slice(1)} />
          <ReviewFieldDisplay label="Birth Date" value={formData.birthDate} />
          <ReviewFieldDisplay label="Color" value={formData.color} />
          <ReviewFieldDisplay label="Height" value={formData.height ? `${formData.height} hands` : undefined} />
          <ReviewFieldDisplay label="Weight" value={formData.weight ? `${formData.weight} kg` : undefined} />
        </ReviewSection>

        {/* Ownership */}
        <ReviewSection title="Ownership & Documentation" icon={<User className="h-5 w-5" />}>
          <ReviewFieldDisplay label="Owner Type" value={formData.ownerType?.replace('_', ' ')} />
          <ReviewFieldDisplay label="Owner Name" value={formData.ownerName} />
          <ReviewFieldDisplay label="Owner Contact" value={formData.ownerContact} />
          <ReviewFieldDisplay label="Registration Number" value={formData.registrationNumber} />
          <ReviewFieldDisplay label="Passport Number" value={formData.passportNumber} />
          <ReviewFieldDisplay label="Microchip ID" value={formData.microchipId} />
        </ReviewSection>

        {/* Health Information */}
        <ReviewSection title="Health & Medical" icon={<Heart className="h-5 w-5" />}>
          <ReviewFieldDisplay label="Health Status" value={formData.healthStatus?.replace('_', ' ')} />
          <ReviewFieldDisplay label="Vaccination Status" value={formData.vaccinationStatus?.replace('_', ' ')} />
          <ReviewFieldDisplay label="Last Vet Checkup" value={formData.lastVetCheckup} />
          <ReviewFieldDisplay label="Medical Conditions" value={formData.medicalConditions} variant="secondary" />
          <ReviewFieldDisplay label="Allergies" value={formData.allergies} variant="destructive" />
        </ReviewSection>

        {/* Training & Performance */}
        <ReviewSection title="Training & Performance" icon={<Trophy className="h-5 w-5" />}>
          <ReviewFieldDisplay label="Training Level" value={formData.trainingLevel?.replace('_', ' ')} />
          <ReviewFieldDisplay label="Disciplines" value={formData.disciplines} variant="outline" />
        </ReviewSection>

        {/* Stable Management */}
        <ReviewSection title="Stable Management" icon={<Home className="h-5 w-5" />}>
          <ReviewFieldDisplay label="Stall Number" value={formData.stallNumber} />
          <ReviewFieldDisplay label="Feeding Schedule" value={formData.feedingSchedule} />
          <ReviewFieldDisplay label="Exercise Routine" value={formData.exerciseRoutine} />
          <ReviewFieldDisplay label="Special Needs" value={formData.specialNeeds} variant="outline" />
        </ReviewSection>

        {/* Financial Information */}
        <ReviewSection title="Insurance & Financial" icon={<DollarSign className="h-5 w-5" />}>
          <ReviewFieldDisplay label="Insured" value={formData.insured} />
          <ReviewFieldDisplay label="Insurance Provider" value={formData.insuranceProvider} />
          <ReviewFieldDisplay label="Insurance Value" value={formData.insuranceValue ? `$${formData.insuranceValue.toLocaleString()}` : undefined} />
          <ReviewFieldDisplay label="Purchase Price" value={formData.purchasePrice ? `$${formData.purchasePrice.toLocaleString()}` : undefined} />
          <ReviewFieldDisplay label="Market Value" value={formData.marketValue ? `$${formData.marketValue.toLocaleString()}` : undefined} />
        </ReviewSection>
      </div>

      <ReviewFilesSection formData={formData} />

      <ReviewSubmitSection onSubmit={onSubmit} />
    </div>
  );
};

export default ReviewConfirmationStage;
