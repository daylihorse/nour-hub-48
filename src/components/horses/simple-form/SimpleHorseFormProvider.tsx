
import { ReactNode } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { simpleHorseSchema, SimpleHorseFormData } from "../form-schema/SimpleHorseFormSchema";

interface SimpleHorseFormProviderProps {
  children: ReactNode;
}

const SimpleHorseFormProvider = ({ children }: SimpleHorseFormProviderProps) => {
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

  return (
    <FormProvider {...form}>
      {children}
    </FormProvider>
  );
};

export default SimpleHorseFormProvider;
