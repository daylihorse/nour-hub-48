
import { z } from "zod";

// Enhanced validation schema with detailed field validation
export const enhancedHorseFormSchema = z.object({
  // Basic Information - Required fields with specific validation
  name: z.string()
    .min(2, "اسم الحصان يجب أن يكون حرفين على الأقل")
    .max(50, "اسم الحصان لا يمكن أن يتجاوز 50 حرف")
    .regex(/^[a-zA-Z\s\u0600-\u06FF]+$/, "اسم الحصان يجب أن يحتوي على أحرف فقط"),
    
  arabicName: z.string()
    .max(50, "الاسم العربي لا يمكن أن يتجاوز 50 حرف")
    .regex(/^[\u0600-\u06FF\s]*$/, "الاسم العربي يجب أن يحتوي على أحرف عربية فقط")
    .optional(),
    
  breed: z.string().min(1, "يجب اختيار سلالة الحصان"),
  gender: z.enum(["stallion", "mare", "gelding"], {
    errorMap: () => ({ message: "يجب اختيار جنس الحصان" })
  }),
  birthDate: z.date({
    required_error: "يجب إدخال تاريخ الميلاد",
    invalid_type_error: "تاريخ الميلاد غير صحيح"
  }).refine(date => {
    const today = new Date();
    const minDate = new Date("1990-01-01");
    return date >= minDate && date <= today;
  }, "تاريخ الميلاد يجب أن يكون بين 1990 واليوم"),
  
  color: z.string().min(1, "يجب اختيار لون الحصان"),
  height: z.number()
    .min(10, "الطول يجب أن يكون 10 يد على الأقل")
    .max(20, "الطول لا يمكن أن يتجاوز 20 يد")
    .optional(),
  weight: z.number()
    .min(200, "الوزن يجب أن يكون 200 كيلو على الأقل")
    .max(1500, "الوزن لا يمكن أن يتجاوز 1500 كيلو")
    .optional(),

  // Ownership & Documentation
  ownerType: z.enum(["individual", "company", "partnership"], {
    errorMap: () => ({ message: "يجب اختيار نوع المالك" })
  }),
  ownerName: z.string()
    .min(2, "اسم المالك يجب أن يكون حرفين على الأقل")
    .max(100, "اسم المالك لا يمكن أن يتجاوز 100 حرف"),
  ownerContact: z.string()
    .min(10, "معلومات الاتصال يجب أن تكون 10 أرقام على الأقل")
    .max(50, "معلومات الاتصال لا يمكن أن تتجاوز 50 حرف"),
  registrationNumber: z.string()
    .regex(/^[A-Z0-9-]*$/, "رقم التسجيل يجب أن يحتوي على أحرف وأرقام فقط")
    .optional(),
  passportNumber: z.string()
    .max(30, "رقم الجواز لا يمكن أن يتجاوز 30 حرف")
    .optional(),
  microchipId: z.string()
    .length(15, "رقم الشريحة يجب أن يكون 15 رقم بالضبط")
    .regex(/^\d{15}$/, "رقم الشريحة يجب أن يحتوي على أرقام فقط")
    .optional(),

  // Pedigree
  sire: z.string().max(50, "اسم الأب لا يمكن أن يتجاوز 50 حرف").optional(),
  dam: z.string().max(50, "اسم الأم لا يمكن أن يتجاوز 50 حرف").optional(),
  bloodlineOrigin: z.string().max(100, "أصل السلالة لا يمكن أن يتجاوز 100 حرف").optional(),

  // Health & Medical
  healthStatus: z.enum(["healthy", "under_treatment", "quarantine"], {
    errorMap: () => ({ message: "يجب اختيار الحالة الصحية" })
  }),
  vaccinationStatus: z.enum(["up_to_date", "partial", "none"], {
    errorMap: () => ({ message: "يجب اختيار حالة التطعيم" })
  }),
  lastVetCheckup: z.date().optional(),
  medicalConditions: z.array(z.string()).optional(),
  allergies: z.array(z.string()).optional(),

  // Training & Performance
  trainingLevel: z.enum(["untrained", "basic", "intermediate", "advanced", "professional"]),
  disciplines: z.array(z.string()).optional(),
  competitionHistory: z.array(z.string()).optional(),
  achievements: z.array(z.string()).optional(),

  // Stable Management
  stallNumber: z.string().max(10, "رقم المربط لا يمكن أن يتجاوز 10 أحرف").optional(),
  feedingSchedule: z.string().max(200, "جدول التغذية لا يمكن أن يتجاوز 200 حرف").optional(),
  exerciseRoutine: z.string().max(200, "برنامج التمرين لا يمكن أن يتجاوز 200 حرف").optional(),
  specialNeeds: z.array(z.string()).optional(),

  // Insurance & Financial
  insured: z.boolean(),
  insuranceProvider: z.string().max(100, "مقدم التأمين لا يمكن أن يتجاوز 100 حرف").optional(),
  insuranceValue: z.number().min(0, "قيمة التأمين يجب أن تكون أكبر من أو تساوي صفر").optional(),
  purchasePrice: z.number().min(0, "سعر الشراء يجب أن يكون أكبر من أو تساوي صفر").optional(),
  marketValue: z.number().min(0, "القيمة السوقية يجب أن تكون أكبر من أو تساوي صفر").optional(),

  // Documents & Images
  images: z.array(z.string()),
  documents: z.array(z.string()),

  // System fields
  status: z.enum(["active", "inactive", "transferred", "deceased"]),
});

export type EnhancedHorseFormData = z.infer<typeof enhancedHorseFormSchema>;

// Stage-specific validation schemas
export const stageValidationSchemas = {
  basic: enhancedHorseFormSchema.pick({
    name: true,
    arabicName: true,
    breed: true,
    gender: true,
    birthDate: true,
    color: true,
    height: true,
    weight: true,
  }),
  
  ownership: enhancedHorseFormSchema.pick({
    ownerType: true,
    ownerName: true,
    ownerContact: true,
    registrationNumber: true,
    passportNumber: true,
    microchipId: true,
  }),
  
  pedigree: enhancedHorseFormSchema.pick({
    sire: true,
    dam: true,
    bloodlineOrigin: true,
  }),
  
  health: enhancedHorseFormSchema.pick({
    healthStatus: true,
    vaccinationStatus: true,
    lastVetCheckup: true,
    medicalConditions: true,
    allergies: true,
  }),
  
  training: enhancedHorseFormSchema.pick({
    trainingLevel: true,
    disciplines: true,
    competitionHistory: true,
    achievements: true,
  }),
  
  stable: enhancedHorseFormSchema.pick({
    stallNumber: true,
    feedingSchedule: true,
    exerciseRoutine: true,
    specialNeeds: true,
  }),
  
  insurance: enhancedHorseFormSchema.pick({
    insured: true,
    insuranceProvider: true,
    insuranceValue: true,
    purchasePrice: true,
    marketValue: true,
  }),
  
  documents: enhancedHorseFormSchema.pick({
    images: true,
    documents: true,
  }),
};
