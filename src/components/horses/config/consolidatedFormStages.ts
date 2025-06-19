
import { FormStage } from "@/types/horse-unified";

export const formStages: FormStage[] = [
  {
    id: "basic",
    title: "Basic Information",
    description: "Enter the horse's basic details including name, breed, gender, and physical characteristics.",
    fields: [
      "name", "arabicName", "breed", "gender", "ageClass", "adultMaleType", 
      "castrationDate", "isPregnant", "pregnancyDuration", "birthDate", 
      "color", "height", "weight"
    ],
    isComplete: false,
    isRequired: true,
  },
  {
    id: "ownership",
    title: "Ownership & Documentation",
    description: "Provide owner information and registration details.",
    fields: [
      "ownerType", "ownerName", "ownerContact", "registrationNumber", 
      "passportNumber", "microchipId"
    ],
    isComplete: false,
    isRequired: true,
  },
  {
    id: "pedigree",
    title: "Pedigree Information",
    description: "Record the horse's lineage and breeding history.",
    fields: ["sire", "dam", "bloodlineOrigin"],
    isComplete: false,
    isRequired: false,
  },
  {
    id: "health",
    title: "Health & Medical",
    description: "Document health status, vaccination records, and medical history.",
    fields: [
      "healthStatus", "vaccinationStatus", "lastVetCheckup", 
      "medicalConditions", "allergies"
    ],
    isComplete: false,
    isRequired: true,
  },
  {
    id: "training",
    title: "Training & Performance",
    description: "Track training level, disciplines, and achievements.",
    fields: ["trainingLevel", "disciplines", "competitionHistory", "achievements"],
    isComplete: false,
    isRequired: false,
  },
  {
    id: "stable",
    title: "Stable Management",
    description: "Manage stall assignment, feeding, and exercise routines.",
    fields: ["stallNumber", "feedingSchedule", "exerciseRoutine", "specialNeeds"],
    isComplete: false,
    isRequired: false,
  },
  {
    id: "insurance",
    title: "Insurance & Financial",
    description: "Record insurance coverage and financial information.",
    fields: [
      "insured", "insuranceProvider", "insuranceValue", 
      "purchasePrice", "marketValue"
    ],
    isComplete: false,
    isRequired: false,
  },
  {
    id: "documents",
    title: "Documents & Images",
    description: "Upload relevant documents and images.",
    fields: ["images", "documents"],
    isComplete: false,
    isRequired: false,
  },
  {
    id: "review",
    title: "Review & Submit",
    description: "Review all information and complete the registration.",
    fields: ["status"],
    isComplete: false,
    isRequired: true,
  },
];
