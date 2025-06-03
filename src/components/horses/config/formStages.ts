
import { FormStage } from "@/types/horse";

export const formStages: FormStage[] = [
  {
    id: "basic",
    title: "Basic Information",
    description: "Essential horse details",
    fields: ["name", "arabicName", "breed", "gender", "birthDate", "color", "height", "weight"],
    isComplete: false,
    isRequired: true,
  },
  {
    id: "ownership",
    title: "Ownership & Documentation",
    description: "Owner details and registration",
    fields: ["ownerType", "ownerName", "ownerContact", "registrationNumber", "passportNumber", "microchipId"],
    isComplete: false,
    isRequired: true,
  },
  {
    id: "pedigree",
    title: "Pedigree",
    description: "Bloodline and ancestry",
    fields: ["sire", "dam", "bloodlineOrigin"],
    isComplete: false,
    isRequired: false,
  },
  {
    id: "health",
    title: "Health & Medical",
    description: "Medical history and status",
    fields: ["healthStatus", "vaccinationStatus", "lastVetCheckup", "medicalConditions", "allergies"],
    isComplete: false,
    isRequired: true,
  },
  {
    id: "training",
    title: "Training & Performance",
    description: "Training level and achievements",
    fields: ["trainingLevel", "disciplines", "competitionHistory", "achievements"],
    isComplete: false,
    isRequired: false,
  },
  {
    id: "stable",
    title: "Stable Management",
    description: "Housing and care details",
    fields: ["stallNumber", "feedingSchedule", "exerciseRoutine", "specialNeeds"],
    isComplete: false,
    isRequired: false,
  },
  {
    id: "insurance",
    title: "Insurance & Financial",
    description: "Insurance and valuation",
    fields: ["insured", "insuranceProvider", "insuranceValue", "purchasePrice", "marketValue"],
    isComplete: false,
    isRequired: false,
  },
  {
    id: "documents",
    title: "Documents & Images",
    description: "Upload files and photos",
    fields: ["images", "documents"],
    isComplete: false,
    isRequired: false,
  },
];
