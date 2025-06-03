
import { FormStage } from "@/types/horse";

export const arabicFormStages: FormStage[] = [
  {
    id: "basic",
    title: "المعلومات الأساسية",
    description: "تفاصيل الحصان الأساسية",
    fields: ["name", "breed", "gender", "birthDate", "color"],
    isComplete: false,
    isRequired: true,
  },
  {
    id: "ownership",
    title: "الملكية والوثائق",
    description: "تفاصيل المالك والتسجيل",
    fields: ["ownerType", "ownerName", "ownerContact"],
    isComplete: false,
    isRequired: true,
  },
  {
    id: "health",
    title: "الصحة والطب",
    description: "التاريخ الطبي والحالة",
    fields: ["healthStatus", "vaccinationStatus"],
    isComplete: false,
    isRequired: true,
  },
];
