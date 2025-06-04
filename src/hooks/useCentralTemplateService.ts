
import { useState, useEffect } from "react";
import { centralTemplateService, TemplateState } from "@/services/centralTemplateService";
import { Template } from "@/services/templateService";

export const useCentralTemplateService = () => {
  const [state, setState] = useState<TemplateState>(centralTemplateService.getState());

  useEffect(() => {
    const unsubscribe = centralTemplateService.subscribe(setState);
    
    // Load templates on mount if not already loaded
    if (state.templates.length === 0 && !state.loading) {
      centralTemplateService.loadTemplates();
    }

    return unsubscribe;
  }, []);

  const operations = {
    loadTemplates: () => centralTemplateService.loadTemplates(),
    searchTemplates: (filters: any) => centralTemplateService.searchTemplates(filters),
    selectTemplate: (templateId: string) => centralTemplateService.selectTemplate(templateId),
    deselectTemplate: (templateId: string) => centralTemplateService.deselectTemplate(templateId),
    clearSelection: () => centralTemplateService.clearSelection(),
    setSelectedTemplates: (templateIds: string[]) => centralTemplateService.setSelectedTemplates(templateIds),
    setFilter: (filterType: any, value: string) => centralTemplateService.setFilter(filterType, value),
    clearFilters: () => centralTemplateService.clearFilters(),
    getSelectedTemplateDetails: () => centralTemplateService.getSelectedTemplateDetails(),
    getTemplateById: (id: string) => centralTemplateService.getTemplateById(id),
    syncWithService: () => centralTemplateService.syncWithService(),
    convertTemplateToFormValues: (template: Template) => centralTemplateService.convertTemplateToFormValues(template)
  };

  return {
    ...state,
    ...operations
  };
};
