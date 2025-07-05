import { z } from "zod";

export const horseFormSchema = z.object({
  // Basic Information
  name: z.string().min(2, "Name must be at least 2 characters"),
  arabicName: z.string().optional(),
  breed: z.string().min(1, "Breed is required"),
  gender: z.enum(["stallion", "mare", "gelding"], {
    errorMap: () => ({ message: "Please select a valid gender" })
  }),
  ageClass: z.string().optional(),
  adultMaleType: z.enum(["stallion", "gelding"]).optional(),
  castrationDate: z.string().optional(),
  isPregnant: z.enum(["yes", "no"]).optional(),
  pregnancyDuration: z.number().positive().optional(),
  birthDate: z.string().min(1, "Birth date is required"),
  color: z.string().min(1, "Color is required"),
  height: z.number().positive().optional(),
  weight: z.number().positive().optional(),
  registrationNumber: z.string().optional(),
  passportNumber: z.string().optional(),
  microchipId: z.string().optional(),
  
  // Ownership & Documentation
  ownerType: z.enum(["individual", "company", "partnership"], {
    errorMap: () => ({ message: "Please select owner type" })
  }),
  ownerName: z.string().min(2, "Owner name is required"),
  ownerContact: z.string().min(1, "Owner contact is required"),
  
  // Pedigree
  sire: z.string().optional(),
  dam: z.string().optional(),
  bloodlineOrigin: z.string().optional(),
  
  // Health & Medical
  healthStatus: z.enum(["healthy", "under_treatment", "quarantine"], {
    errorMap: () => ({ message: "Please select health status" })
  }),
  vaccinationStatus: z.enum(["up_to_date", "partial", "none"], {
    errorMap: () => ({ message: "Please select vaccination status" })
  }),
  lastVetCheckup: z.string().optional(),
  medicalConditions: z.string().optional(),
  allergies: z.string().optional(),
  
  // Training & Performance
  trainingLevel: z.string().optional(),
  disciplines: z.string().optional(),
  competitionHistory: z.string().optional(),
  achievements: z.string().optional(),
  
  // Stable Management
  stallNumber: z.string().optional(),
  feedingSchedule: z.string().optional(),
  exerciseRoutine: z.string().optional(),
  specialNeeds: z.string().optional(),
  
  // Insurance & Financial
  insured: z.boolean(),
  insuranceProvider: z.string().optional(),
  insuranceValue: z.number().positive().optional(),
  purchasePrice: z.number().positive().optional(),
  marketValue: z.number().positive().optional(),
  
  // Documents & Images
  images: z.array(z.string()),
  documents: z.array(z.string()),
  
  // System fields
  status: z.enum(["active", "inactive", "transferred", "deceased"], {
    errorMap: () => ({ message: "Please select status" })
  }),
});

export type HorseFormValues = z.infer<typeof horseFormSchema>;

// Stage-specific validation schemas
export const basicInformationSchema = horseFormSchema.pick({
  name: true,
  arabicName: true,
  breed: true,
  gender: true,
  ageClass: true,
  adultMaleType: true,
  castrationDate: true,
  isPregnant: true,
  pregnancyDuration: true,
  birthDate: true,
  color: true,
  height: true,
  weight: true,
  registrationNumber: true,
  passportNumber: true,
  microchipId: true,
});

export const ownershipDocumentationSchema = horseFormSchema.pick({
  ownerType: true,
  ownerName: true,
  ownerContact: true,
});

export const pedigreeSchema = horseFormSchema.pick({
  sire: true,
  dam: true,
  bloodlineOrigin: true,
});

export const healthMedicalSchema = horseFormSchema.pick({
  healthStatus: true,
  vaccinationStatus: true,
  lastVetCheckup: true,
  medicalConditions: true,
  allergies: true,
});

export const trainingPerformanceSchema = horseFormSchema.pick({
  trainingLevel: true,
  disciplines: true,
  competitionHistory: true,
  achievements: true,
});

export const stableManagementSchema = horseFormSchema.pick({
  stallNumber: true,
  feedingSchedule: true,
  exerciseRoutine: true,
  specialNeeds: true,
});

export const insuranceFinancialSchema = horseFormSchema.pick({
  insured: true,
  insuranceProvider: true,
  insuranceValue: true,
  purchasePrice: true,
  marketValue: true,
});

export const documentsImagesSchema = horseFormSchema.pick({
  images: true,
  documents: true,
});

export const stageValidationSchemas = {
  basic: basicInformationSchema,
  ownership: ownershipDocumentationSchema,
  pedigree: pedigreeSchema,
  health: healthMedicalSchema,
  training: trainingPerformanceSchema,
  stable: stableManagementSchema,
  insurance: insuranceFinancialSchema,
  documents: documentsImagesSchema,
  review: horseFormSchema.pick({ status: true }),
};
