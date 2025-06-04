
import { useState, useEffect } from "react";
import { useTemplateIntegration } from "../../hooks/useTemplateIntegration";
import { calculateStatus } from "../utils/statusUtils";
import { TestResultFormData } from "../../AddTestResultDialog";

interface TestValue {
  parameter: string;
  value: string;
  unit: string;
  reference: string;
  status: 'normal' | 'high' | 'low';
}

interface UseTestValuesProps {
  formData: TestResultFormData;
  updateFormData: (updates: Partial<TestResultFormData>) => void;
}

export const useTestValues = ({ formData, updateFormData }: UseTestValuesProps) => {
  const { getTemplateById, convertTemplateParametersToFormValues } = useTemplateIntegration();
  const [templateLoaded, setTemplateLoaded] = useState(false);

  const selectedTemplate = formData.templateId ? getTemplateById(formData.templateId) : null;

  // Auto-load template parameters when template is selected
  useEffect(() => {
    if (selectedTemplate && !templateLoaded && formData.values.length === 0) {
      const templateValues = convertTemplateParametersToFormValues(selectedTemplate);
      updateFormData({ values: templateValues });
      setTemplateLoaded(true);
    }
  }, [selectedTemplate, templateLoaded, formData.values.length, updateFormData, convertTemplateParametersToFormValues]);

  const loadTemplateParameters = () => {
    if (selectedTemplate) {
      const templateValues = convertTemplateParametersToFormValues(selectedTemplate);
      updateFormData({ values: templateValues });
      setTemplateLoaded(true);
    }
  };

  const addCustomValue = (newValue: TestValue) => {
    if (newValue.parameter && newValue.value) {
      updateFormData({ 
        values: [...formData.values, { ...newValue }] 
      });
      return true;
    }
    return false;
  };

  const removeValue = (index: number) => {
    const updatedValues = formData.values.filter((_, i) => i !== index);
    updateFormData({ values: updatedValues });
  };

  const updateValue = (index: number, field: string, value: any) => {
    const updatedValues = [...formData.values];
    updatedValues[index] = { ...updatedValues[index], [field]: value };
    
    // Auto-calculate status based on value and reference range
    if (field === 'value' && updatedValues[index].reference) {
      const status = calculateStatus(value, updatedValues[index].reference);
      updatedValues[index].status = status;
    }
    
    updateFormData({ values: updatedValues });
  };

  return {
    selectedTemplate,
    templateLoaded,
    loadTemplateParameters,
    addCustomValue,
    removeValue,
    updateValue
  };
};
