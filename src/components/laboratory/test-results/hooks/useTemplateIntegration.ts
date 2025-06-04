
import { useState, useEffect } from "react";
import { templateService, Template } from "@/services/templateService";

export const useTemplateIntegration = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    setLoading(true);
    try {
      const allTemplates = await templateService.getAllTemplates();
      setTemplates(allTemplates);
    } catch (error) {
      console.error("Failed to load templates:", error);
    } finally {
      setLoading(false);
    }
  };

  const getTemplateById = (id: string): Template | undefined => {
    return templates.find(template => template.id === id);
  };

  const getTemplatesByCategory = (category: string): Template[] => {
    return templates.filter(template => template.category === category);
  };

  const convertTemplateParametersToFormValues = (template: Template) => {
    return templateService.convertTemplateParametersToFormValues(template);
  };

  return {
    templates,
    loading,
    getTemplateById,
    getTemplatesByCategory,
    convertTemplateParametersToFormValues
  };
};
