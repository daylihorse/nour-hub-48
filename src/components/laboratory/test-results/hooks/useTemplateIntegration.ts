
import { useState, useEffect } from "react";

interface ResultTemplate {
  id: string;
  nameEn: string;
  nameAr: string;
  category: string;
  sampleType: string;
  methodology: string;
  turnaroundTime: string;
  parameters: Array<{
    id: number;
    nameEn: string;
    nameAr: string;
    unit: string;
    dataType: string;
    normalRangeMin: string;
    normalRangeMax: string;
    criticalLow: string;
    criticalHigh: string;
  }>;
}

// Mock templates data - in real app this would come from an API
const mockTemplates: ResultTemplate[] = [
  {
    id: "cbc-template",
    nameEn: "Complete Blood Count",
    nameAr: "تعداد الدم الكامل",
    category: "hematology",
    sampleType: "blood",
    methodology: "automated",
    turnaroundTime: "2",
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
    ]
  },
  {
    id: "chemistry-template",
    nameEn: "Blood Chemistry Panel",
    nameAr: "فحص كيمياء الدم",
    category: "chemistry",
    sampleType: "serum",
    methodology: "automated",
    turnaroundTime: "4",
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
    ]
  }
];

export const useTemplateIntegration = () => {
  const [templates, setTemplates] = useState<ResultTemplate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const loadTemplates = async () => {
      setLoading(true);
      // In real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setTemplates(mockTemplates);
      setLoading(false);
    };

    loadTemplates();
  }, []);

  const getTemplateById = (id: string): ResultTemplate | undefined => {
    return templates.find(template => template.id === id);
  };

  const getTemplatesByCategory = (category: string): ResultTemplate[] => {
    return templates.filter(template => template.category === category);
  };

  const convertTemplateParametersToFormValues = (template: ResultTemplate) => {
    return template.parameters.map(param => ({
      parameter: param.nameEn,
      value: "",
      unit: param.unit,
      reference: `${param.normalRangeMin}-${param.normalRangeMax}`,
      status: "normal" as const
    }));
  };

  return {
    templates,
    loading,
    getTemplateById,
    getTemplatesByCategory,
    convertTemplateParametersToFormValues
  };
};
