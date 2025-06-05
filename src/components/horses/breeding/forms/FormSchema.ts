
import { z } from "zod";

export const breedingFormSchema = z.object({
  stallionId: z.string().min(1, "Stallion selection is required"),
  mareId: z.string().min(1, "Mare selection is required"),
  method: z.enum(["natural", "artificial_insemination", "embryo_transfer"]),
  veterinarian: z.string().optional(),
  cost: z.number().optional(),
  notes: z.string().optional(),
});

export type BreedingFormValues = z.infer<typeof breedingFormSchema>;

export interface BreedingFormProps {
  formData: Partial<BreedingFormValues>;
  setFormData: (data: Partial<BreedingFormValues>) => void;
  breedingDate: Date | undefined;
  setBreedingDate: (date: Date | undefined) => void;
}
