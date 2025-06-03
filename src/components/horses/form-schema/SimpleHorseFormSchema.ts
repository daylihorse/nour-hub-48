
import { z } from "zod";

export const simpleHorseSchema = z.object({
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

export type SimpleHorseFormData = z.infer<typeof simpleHorseSchema>;
