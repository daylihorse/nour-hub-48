
import { useCentralTemplateService } from "@/hooks/useCentralTemplateService";

export const useTemplateIntegration = () => {
  const {
    templates,
    loading,
    error,
    getTemplateById,
    convertTemplateToFormValues
  } = useCentralTemplateService();

  const getTemplatesByCategory = (category: string) => {
    return templates.filter(template => template.category === category);
  };

  const convertTemplateParametersToFormValues = (template: any) => {
    return convertTemplateToFormValues(template);
  };

  return {
    templates,
    loading,
    error,
    getTemplateById,
    getTemplatesByCategory,
    convertTemplateParametersToFormValues
  };
};
