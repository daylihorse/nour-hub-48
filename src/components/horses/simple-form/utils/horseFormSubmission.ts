
import { HorseFormData } from "@/types/horse";
import { SimpleHorseFormData } from "../../form-schema/SimpleHorseFormSchema";

export const convertSimpleToFullHorseData = (data: SimpleHorseFormData): HorseFormData => {
  console.log("Converting simple form data to full format:", data);
  
  return {
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
};
