
import { useState, useCallback, useMemo } from "react";
import { TestResultFormData, TestValueStatus } from "../../AddTestResultDialog";
import { calculateStatus } from "../utils/statusUtils";
import { Template } from "@/types/template";

interface UseTestValuesProps {
  formData: TestResultFormData;
  updateFormData: (updates: Partial<TestResultFormData>) => void;
  selectedTemplates: Template[]; // Accept converted templates directly
}

interface TestValue {
  parameter: string;
  value: string;
  unit: string;
  reference: string;
  status: TestValueStatus;
  templateId?: string;
}

export const useTestValues = ({ formData, updateFormData, selectedTemplates }: UseTestValuesProps) => {
  const [templateLoaded, setTemplateLoaded] = useState(false);
  const [selectedTemplateFilter, setSelectedTemplateFilter] = useState<string | null>(null);

  // Filter values based on selected template
  const filteredValues = useMemo(() => {
    if (!selectedTemplateFilter) {
      return formData.values;
    }
    return formData.values.filter(value => value.templateId === selectedTemplateFilter);
  }, [formData.values, selectedTemplateFilter]);

  // Get template for filtered view
  const activeTemplate = selectedTemplateFilter 
    ? selectedTemplates.find(template => template.id === selectedTemplateFilter) 
    : null;

  const loadTemplateParameters = useCallback(() => {
    const allParameters: TestResultFormData['values'] = [];
    
    selectedTemplates.forEach(template => {
      template.parameters.forEach(param => {
        // Create reference range string from the parameter's normal range values
        let referenceRange = "Not specified";
        if (param.normalRangeMin && param.normalRangeMax) {
          referenceRange = `${param.normalRangeMin} - ${param.normalRangeMax}`;
        } else if (param.normalRangeMin) {
          referenceRange = `≥ ${param.normalRangeMin}`;
        } else if (param.normalRangeMax) {
          referenceRange = `≤ ${param.normalRangeMax}`;
        }

        allParameters.push({
          parameter: param.nameEn,
          value: "",
          unit: param.unit,
          reference: referenceRange,
          status: "normal" as TestValueStatus,
          templateId: template.id
        });
      });
    });

    updateFormData({ values: allParameters });
    setTemplateLoaded(true);
    console.log(`Loaded ${allParameters.length} parameters from ${selectedTemplates.length} templates`);
  }, [selectedTemplates, updateFormData]);

  const addCustomValue = useCallback((testValue: TestValue): boolean => {
    try {
      const newValue = {
        parameter: testValue.parameter,
        value: testValue.value,
        unit: testValue.unit,
        reference: testValue.reference,
        status: testValue.status,
        templateId: selectedTemplateFilter || undefined
      };
      updateFormData({ values: [...formData.values, newValue] });
      return true;
    } catch (error) {
      console.error("Error adding custom value:", error);
      return false;
    }
  }, [formData.values, updateFormData, selectedTemplateFilter]);

  const removeValue = useCallback((index: number) => {
    const actualIndex = selectedTemplateFilter 
      ? formData.values.findIndex((value, i) => 
          value.templateId === selectedTemplateFilter && 
          filteredValues.findIndex(fv => fv === value) === index
        )
      : index;
    
    if (actualIndex !== -1) {
      const updatedValues = formData.values.filter((_, i) => i !== actualIndex);
      updateFormData({ values: updatedValues });
    }
  }, [formData.values, updateFormData, selectedTemplateFilter, filteredValues]);

  const updateValue = useCallback((index: number, field: keyof TestResultFormData['values'][0], value: string) => {
    const actualIndex = selectedTemplateFilter 
      ? formData.values.findIndex((val, i) => 
          val.templateId === selectedTemplateFilter && 
          filteredValues.findIndex(fv => fv === val) === index
        )
      : index;
    
    if (actualIndex !== -1) {
      const updatedValues = [...formData.values];
      updatedValues[actualIndex] = { ...updatedValues[actualIndex], [field]: value };
      
      // Auto-calculate status when value field changes
      if (field === 'value' && value && updatedValues[actualIndex].reference) {
        const newStatus = calculateStatus(value, updatedValues[actualIndex].reference);
        updatedValues[actualIndex].status = newStatus;
        console.log(`Status updated for ${updatedValues[actualIndex].parameter}: ${value} -> ${newStatus}`);
      }
      
      updateFormData({ values: updatedValues });
    }
  }, [formData.values, updateFormData, selectedTemplateFilter, filteredValues]);

  const handleTemplateFilter = useCallback((templateId: string | null) => {
    setSelectedTemplateFilter(templateId);
  }, []);

  const getTemplateParameterCount = useCallback((templateId: string) => {
    return formData.values.filter(value => value.templateId === templateId).length;
  }, [formData.values]);

  return {
    selectedTemplates,
    templateLoaded,
    selectedTemplateFilter,
    filteredValues,
    activeTemplate,
    loadTemplateParameters,
    addCustomValue,
    removeValue,
    updateValue,
    handleTemplateFilter,
    getTemplateParameterCount
  };
};
