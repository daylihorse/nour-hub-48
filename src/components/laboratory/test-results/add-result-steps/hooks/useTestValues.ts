
import { useState, useCallback } from "react";
import { TestResultFormData } from "../../AddTestResultDialog";
import { useTemplateIntegration } from "../../hooks/useTemplateIntegration";

interface UseTestValuesProps {
  formData: TestResultFormData;
  updateFormData: (updates: Partial<TestResultFormData>) => void;
}

export const useTestValues = ({ formData, updateFormData }: UseTestValuesProps) => {
  const { getTemplateById } = useTemplateIntegration();
  const [templateLoaded, setTemplateLoaded] = useState(false);

  // Get all selected templates
  const selectedTemplates = formData.templateIds
    .map(id => getTemplateById(id))
    .filter((template): template is NonNullable<typeof template> => template !== undefined);

  const loadTemplateParameters = useCallback(() => {
    const allParameters: TestResultFormData['values'] = [];
    
    selectedTemplates.forEach(template => {
      template.parameters.forEach(param => {
        allParameters.push({
          parameter: param.nameEn,
          value: "",
          unit: param.unit,
          reference: param.normalRangeMin && param.normalRangeMax 
            ? `${param.normalRangeMin} - ${param.normalRangeMax}`
            : "Not specified",
          status: "normal"
        });
      });
    });

    updateFormData({ values: allParameters });
    setTemplateLoaded(true);
    console.log(`Loaded ${allParameters.length} parameters from ${selectedTemplates.length} templates`);
  }, [selectedTemplates, updateFormData]);

  const addCustomValue = useCallback((parameter: string, unit: string, reference: string) => {
    const newValue = {
      parameter,
      value: "",
      unit,
      reference,
      status: "normal" as const
    };
    updateFormData({ values: [...formData.values, newValue] });
  }, [formData.values, updateFormData]);

  const removeValue = useCallback((index: number) => {
    const updatedValues = formData.values.filter((_, i) => i !== index);
    updateFormData({ values: updatedValues });
  }, [formData.values, updateFormData]);

  const updateValue = useCallback((index: number, field: keyof TestResultFormData['values'][0], value: string) => {
    const updatedValues = [...formData.values];
    updatedValues[index] = { ...updatedValues[index], [field]: value };
    updateFormData({ values: updatedValues });
  }, [formData.values, updateFormData]);

  return {
    selectedTemplates,
    templateLoaded,
    loadTemplateParameters,
    addCustomValue,
    removeValue,
    updateValue
  };
};
