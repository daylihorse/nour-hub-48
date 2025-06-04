
import { Template } from "@/types/template";

// Mock templates data - in a real app this would come from an API
export const mockTemplates: Template[] = [
  {
    id: "cbc-template",
    nameEn: "Complete Blood Count",
    nameAr: "تعداد الدم الكامل",
    category: "Hematology",
    sampleType: "Blood",
    methodology: "Automated",
    turnaroundTime: "2 hours",
    parametersCount: 12,
    parameters: [
      {
        id: 1,
        nameEn: "White Blood Cells",
        nameAr: "خلايا الدم البيضاء",
        unit: "x10³/μL",
        dataType: "numeric",
        normalRangeMin: "5.0",
        normalRangeMax: "10.0",
        criticalLow: "2.0",
        criticalHigh: "20.0"
      },
      {
        id: 2,
        nameEn: "Red Blood Cells",
        nameAr: "خلايا الدم الحمراء",
        unit: "x10⁶/μL",
        dataType: "numeric",
        normalRangeMin: "6.5",
        normalRangeMax: "12.0",
        criticalLow: "4.0",
        criticalHigh: "15.0"
      },
      {
        id: 3,
        nameEn: "Hemoglobin",
        nameAr: "الهيموجلوبين",
        unit: "g/dL",
        dataType: "numeric",
        normalRangeMin: "11.0",
        normalRangeMax: "18.0",
        criticalLow: "8.0",
        criticalHigh: "22.0"
      }
    ],
    isActive: true,
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01"
  },
  {
    id: "chemistry-template",
    nameEn: "Blood Chemistry Panel",
    nameAr: "فحص كيمياء الدم",
    category: "Clinical Chemistry",
    sampleType: "Serum",
    methodology: "Automated",
    turnaroundTime: "4 hours",
    parametersCount: 8,
    parameters: [
      {
        id: 4,
        nameEn: "Glucose",
        nameAr: "الجلوكوز",
        unit: "mg/dL",
        dataType: "numeric",
        normalRangeMin: "75",
        normalRangeMax: "115",
        criticalLow: "40",
        criticalHigh: "400"
      },
      {
        id: 5,
        nameEn: "Total Protein",
        nameAr: "البروتين الكلي",
        unit: "g/dL",
        dataType: "numeric",
        normalRangeMin: "5.2",
        normalRangeMax: "7.9",
        criticalLow: "3.0",
        criticalHigh: "10.0"
      }
    ],
    isActive: true,
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01"
  },
  {
    id: "liver-template",
    nameEn: "Liver Function Panel",
    nameAr: "فحص وظائف الكبد",
    category: "Clinical Chemistry",
    sampleType: "Serum",
    methodology: "Automated",
    turnaroundTime: "3 hours",
    parametersCount: 6,
    parameters: [
      {
        id: 6,
        nameEn: "ALT",
        nameAr: "ناقلة أمين الألانين",
        unit: "U/L",
        dataType: "numeric",
        normalRangeMin: "7",
        normalRangeMax: "56",
        criticalLow: "0",
        criticalHigh: "200"
      },
      {
        id: 7,
        nameEn: "AST",
        nameAr: "ناقلة أمين الأسبارتات",
        unit: "U/L",
        dataType: "numeric",
        normalRangeMin: "10",
        normalRangeMax: "40",
        criticalLow: "0",
        criticalHigh: "150"
      }
    ],
    isActive: true,
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01"
  },
  {
    id: "thyroid-template",
    nameEn: "Thyroid Profile",
    nameAr: "ملف الغدة الدرقية",
    category: "Endocrinology",
    sampleType: "Serum",
    methodology: "Immunoassay",
    turnaroundTime: "6 hours",
    parametersCount: 5,
    parameters: [
      {
        id: 8,
        nameEn: "TSH",
        nameAr: "الهرمون المحفز للغدة الدرقية",
        unit: "mIU/L",
        dataType: "numeric",
        normalRangeMin: "0.27",
        normalRangeMax: "4.20",
        criticalLow: "0.01",
        criticalHigh: "100"
      },
      {
        id: 9,
        nameEn: "T4",
        nameAr: "الثيروكسين",
        unit: "μg/dL",
        dataType: "numeric",
        normalRangeMin: "4.5",
        normalRangeMax: "11.2",
        criticalLow: "0.5",
        criticalHigh: "25"
      }
    ],
    isActive: true,
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01"
  }
];

export const getTemplateUsageStats = (): { [templateId: string]: number } => {
  // Mock usage statistics - in real app this would come from analytics
  return {
    "cbc-template": 45,
    "chemistry-template": 32,
    "liver-template": 28,
    "thyroid-template": 15
  };
};
