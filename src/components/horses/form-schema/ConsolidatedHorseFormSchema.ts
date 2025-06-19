
import { z } from "zod";

// Basic Information Schema
const basicInformationSchema = z.object({
  name: z.string().min(1, "Horse name is required"),
  arabicName: z.string().optional(),
  breed: z.string().min(1, "Breed is required"),
  gender: z.enum(["stallion", "mare", "gelding"]),
  ageClass: z.string().optional(),
  adultMaleType: z.enum(["stallion", "gelding"]).optional(),
  castrationDate: z.string().optional(),
  isPregnant: z.enum(["yes", "no"]).optional(),
  pregnancyDuration: z.number().optional(),
  birthDate: z.string().min(1, "Birth date is required"),
  color: z.string().min(1, "Color is required"),
  height: z.number().optional(),
  weight: z.number().optional(),
});

// Ownership & Documentation Schema
const ownershipDocumentationSchema = z.object({
  ownerType: z.enum(["individual", "company", "partnership"]),
  ownerName: z.string().min(1, "Owner name is required"),
  ownerContact: z.string().min(1, "Owner contact is required"),
  registrationNumber: z.string().optional(),
  passportNumber: z.string().optional(),
  microchipId: z.string().optional(),
});

// Pedigree Schema
const pedigreeSchema = z.object({
  sire: z.string().optional(),
  dam: z.string().optional(),
  bloodlineOrigin: z.string().optional(),
});

// Health & Medical Schema
const healthMedicalSchema = z.object({
  healthStatus: z.enum(["healthy", "under_treatment", "quarantine"]),
  vaccinationStatus: z.enum(["up_to_date", "partial", "none"]),
  lastVetCheckup: z.string().optional(),
  medicalConditions: z.string().optional(),
  allergies: z.string().optional(),
});

// Training & Performance Schema
const trainingPerformanceSchema = z.object({
  trainingLevel: z.string().optional(),
  disciplines: z.string().optional(),
  competitionHistory: z.string().optional(),
  achievements: z.string().optional(),
});

// Stable Management Schema
const stableManagementSchema = z.object({
  stallNumber: z.string().optional(),
  feedingSchedule: z.string().optional(),
  exerciseRoutine: z.string().optional(),
  specialNeeds: z.string().optional(),
});

// Insurance & Financial Schema
const insuranceFinancialSchema = z.object({
  insured: z.boolean(),
  insuranceProvider: z.string().optional(),
  insuranceValue: z.number().optional(),
  purchasePrice: z.number().optional(),
  marketValue: z.number().optional(),
});

// Documents & Images Schema
const documentsImagesSchema = z.object({
  images: z.array(z.string()),
  documents: z.array(z.string()),
});

// Review & Submit Schema
const reviewSubmitSchema = z.object({
  status: z.enum(["active", "inactive", "transferred", "deceased"]),
});

// Complete Horse Form Schema
export const horseFormSchema = z.object({
  ...basicInformationSchema.shape,
  ...ownershipDocumentationSchema.shape,
  ...pedigreeSchema.shape,
  ...healthMedicalSchema.shape,
  ...trainingPerformanceSchema.shape,
  ...stableManagementSchema.shape,
  ...insuranceFinancialSchema.shape,
  ...documentsImagesSchema.shape,
  ...reviewSubmitSchema.shape,
});

// Stage-specific validation schemas
export const stageValidationSchemas = {
  basic: basicInformationSchema,
  ownership: ownershipDocumentationSchema,
  pedigree: pedigreeSchema,
  health: healthMedicalSchema,
  training: trainingPerformanceSchema,
  stable: stableManagementSchema,
  insurance: insuranceFinancialSchema,
  documents: documentsImagesSchema,
  review: reviewSubmitSchema,
};

export type HorseFormSchema = z.infer<typeof horseFormSchema>;
