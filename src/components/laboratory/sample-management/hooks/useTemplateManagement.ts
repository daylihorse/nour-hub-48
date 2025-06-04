
import { useState } from "react";

export const useTemplateManagement = () => {
  const [selectedTemplates, setSelectedTemplates] = useState<string[]>([]);

  const handleTemplateChange = (templateId: string, checked: boolean) => {
    if (checked) {
      setSelectedTemplates(prev => [...prev, templateId]);
    } else {
      setSelectedTemplates(prev => prev.filter(id => id !== templateId));
    }
  };

  const resetTemplates = () => {
    setSelectedTemplates([]);
  };

  return {
    selectedTemplates,
    handleTemplateChange,
    resetTemplates
  };
};
