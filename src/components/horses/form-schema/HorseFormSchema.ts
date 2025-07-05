
import { z } from "zod";

export const horseFormSchema = z.object({
  // Basic Information
  name: z.string().min(2, "Name must be at least 2 characters"),
  arabicName: z.string().optional(),
  breed: z.string().min(1, "Breed is required"),
  gender: z.enum(["stallion", "mare", "gelding"]),
  birthDate: z.date({
    required_error: "Birth date is required",
  }),
  color: z.string().min(1, "Color is required"),
  height: z.number().positive().optional(),
  weight: z.number().positive().optional(),
  
  // Ownership & Documentation
  ownerType: z.enum(["individual", "company", "partnership"]),
  ownerName: z.string().min(2, "Owner name is required"),
  ownerContact: z.string().min(1, "Owner contact is required"),
  registrationNumber: z.string().optional(),
  passportNumber: z.string().optional(),
  microchipId: z.string().optional(),
  
  // Pedigree
  sire: z.string().optional(),
  dam: z.string().optional(),
  bloodlineOrigin: z.string().optional(),
  
  // Health & Medical
  healthStatus: z.enum(["healthy", "under_treatment", "quarantine"]),
  vaccinationStatus: z.enum(["up_to_date", "partial", "none"]),
  lastVetCheckup: z.date().optional(),
  medicalConditions: z.array(z.string()).optional(),
  allergies: z.array(z.string()).optional(),
  
  // Training & Performance
  trainingLevel: z.enum(["untrained", "basic", "intermediate", "advanced", "professional"]),
  disciplines: z.array(z.string()).optional(),
  competitionHistory: z.array(z.string()).optional(),
  achievements: z.array(z.string()).optional(),
  
  // Stable Management
  stallNumber: z.string().optional(),
  feedingSchedule: z.string().optional(),
  exerciseRoutine: z.string().optional(),
  specialNeeds: z.array(z.string()).optional(),
  
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
  status: z.enum(["active", "inactive", "transferred", "deceased"]),
});

export type HorseFormValues = z.infer<typeof horseFormSchema>;

// Validation schemas for each stage
export const basicInformationSchema = horseFormSchema.pick({
  name: true,
  arabicName: true,
  breed: true,
  gender: true,
  birthDate: true,
  color: true,
  height: true,
  weight: true,
});

export const ownershipDocumentationSchema = horseFormSchema.pick({
  ownerType: true,
  ownerName: true,
  ownerContact: true,
  registrationNumber: true,
  passportNumber: true,
  microchipId: true,
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
