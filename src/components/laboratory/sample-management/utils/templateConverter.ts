
import { LaboratoryTemplate } from '@/services/laboratory/laboratoryService';
import { Template } from '@/types/template';

export const convertLaboratoryTemplateToTemplate = (labTemplate: LaboratoryTemplate): Template => {
  return {
    id: labTemplate.id,
    nameEn: labTemplate.name_en,
    nameAr: labTemplate.name_ar || '',
    category: labTemplate.category,
    sampleType: labTemplate.sample_type || '',
    methodology: labTemplate.methodology || '',
    turnaroundTime: labTemplate.estimated_duration_minutes ? `${labTemplate.estimated_duration_minutes} min` : '',
    parametersCount: Array.isArray(labTemplate.parameters) ? labTemplate.parameters.length : 0,
    parameters: Array.isArray(labTemplate.parameters) ? labTemplate.parameters.map((param: any, index: number) => ({
      id: index + 1,
      nameEn: param.name || '',
      nameAr: param.name_ar || '',
      unit: param.unit || '',
      dataType: param.type || 'numeric',
      normalRangeMin: '',
      normalRangeMax: '',
      criticalLow: '',
      criticalHigh: ''
    })) : [],
    isActive: labTemplate.is_active ?? true,
    createdAt: labTemplate.created_at,
    updatedAt: labTemplate.updated_at
  };
};

export const convertLaboratoryTemplatesToTemplates = (labTemplates: LaboratoryTemplate[]): Template[] => {
  return labTemplates.map(convertLaboratoryTemplateToTemplate);
};
