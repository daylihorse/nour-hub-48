
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent } from "@/components/ui/card";
import { HorseFormData } from "@/types/horse";
import { useToast } from "@/hooks/use-toast";
import { simpleHorseSchema, SimpleHorseFormData } from "./form-schema/SimpleHorseFormSchema";
import SimpleHorseFormHeader from "./simple-form/SimpleHorseFormHeader";
import BasicInformationSection from "./simple-form/BasicInformationSection";
import OwnershipHealthSection from "./simple-form/OwnershipHealthSection";
import SimpleHorseFormActions from "./simple-form/SimpleHorseFormActions";

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
        <SimpleHorseFormHeader onCancel={onCancel} />
        <CardContent>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <BasicInformationSection form={form} />
              <OwnershipHealthSection form={form} />
            </div>
            <SimpleHorseFormActions onCancel={onCancel} isSubmitting={isSubmitting} />
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddHorseFormSimple;
