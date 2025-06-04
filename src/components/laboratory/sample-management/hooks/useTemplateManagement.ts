
import { useCentralTemplateService } from "@/hooks/useCentralTemplateService";

export const useTemplateManagement = () => {
  const {
    templates,
    selectedTemplates,
    loading,
    error,
    filters,
    metadata,
    selectTemplate,
    deselectTemplate,
    clearSelection,
    setFilter,
    clearFilters,
    getSelectedTemplateDetails,
    loadTemplates
  } = useCentralTemplateService();

  const handleTemplateChange = (templateId: string, checked: boolean) => {
    if (checked) {
      selectTemplate(templateId);
    } else {
      deselectTemplate(templateId);
    }
  };

  const resetTemplates = () => {
    clearSelection();
  };

  return {
    selectedTemplates,
    templates,
    loading,
    error,
    searchTerm: filters.searchTerm,
    categoryFilter: filters.category,
    sampleTypeFilter: filters.sampleType,
    methodologyFilter: filters.methodology,
    categories: metadata.categories,
    sampleTypes: metadata.sampleTypes,
    methodologies: metadata.methodologies,
    handleTemplateChange,
    resetTemplates,
    setSearchTerm: (value: string) => setFilter('searchTerm', value),
    setCategoryFilter: (value: string) => setFilter('category', value),
    setSampleTypeFilter: (value: string) => setFilter('sampleType', value),
    setMethodologyFilter: (value: string) => setFilter('methodology', value),
    clearFilters,
    getSelectedTemplateDetails,
    loadTemplates
  };
};
