
import { useHorseData } from "./useHorseData";
import { useTemplateManagement } from "./useTemplateManagement";
import { usePersonAndFormFields } from "./usePersonAndFormFields";

export const useSampleForm = () => {
  const horseData = useHorseData();
  const templateData = useTemplateManagement();
  const formFieldsData = usePersonAndFormFields();

  const handleSave = async () => {
    try {
      const selectedTemplateDetails = await templateData.getSelectedTemplateDetails();
      
      console.log("Sample data:", {
        horse: horseData.selectedHorse,
        sampleType: horseData.sampleType,
        selectedPreviousSample: horseData.sampleType === "retest" ? horseData.selectedPreviousSample : null,
        selectedTemplates: templateData.selectedTemplates,
        selectedTemplateDetails,
        priority: formFieldsData.priority,
        personWhoBrought: formFieldsData.personWhoBrought,
        sampleReceiptDate: formFieldsData.sampleReceiptDate,
        notes: formFieldsData.notes
      });
      
      return true; // Return success status
    } catch (error) {
      console.error("Failed to save sample:", error);
      return false;
    }
  };

  return {
    // Horse data
    selectedHorse: horseData.selectedHorse,
    sampleType: horseData.sampleType,
    selectedPreviousSample: horseData.selectedPreviousSample,
    horseName: horseData.horseName,
    previousSamples: horseData.previousSamples,
    setSelectedPreviousSample: horseData.setSelectedPreviousSample,
    handleHorseSelect: horseData.handleHorseSelect,
    handleSampleTypeChange: horseData.handleSampleTypeChange,
    
    // Template data (enhanced with filtering and search)
    selectedTemplates: templateData.selectedTemplates,
    templates: templateData.templates,
    loading: templateData.loading,
    searchTerm: templateData.searchTerm,
    categoryFilter: templateData.categoryFilter,
    sampleTypeFilter: templateData.sampleTypeFilter,
    methodologyFilter: templateData.methodologyFilter,
    categories: templateData.categories,
    sampleTypes: templateData.sampleTypes,
    methodologies: templateData.methodologies,
    handleTemplateChange: templateData.handleTemplateChange,
    resetTemplates: templateData.resetTemplates,
    setSearchTerm: templateData.setSearchTerm,
    setCategoryFilter: templateData.setCategoryFilter,
    setSampleTypeFilter: templateData.setSampleTypeFilter,
    setMethodologyFilter: templateData.setMethodologyFilter,
    clearFilters: templateData.clearFilters,
    getSelectedTemplateDetails: templateData.getSelectedTemplateDetails,
    
    // Form fields data
    priority: formFieldsData.priority,
    personWhoBrought: formFieldsData.personWhoBrought,
    showAddPerson: formFieldsData.showAddPerson,
    sampleReceiptDate: formFieldsData.sampleReceiptDate,
    notes: formFieldsData.notes,
    setPriority: formFieldsData.setPriority,
    setSampleReceiptDate: formFieldsData.setSampleReceiptDate,
    setNotes: formFieldsData.setNotes,
    setShowAddPerson: formFieldsData.setShowAddPerson,
    handlePersonSelect: formFieldsData.handlePersonSelect,
    handlePersonAdded: formFieldsData.handlePersonAdded,
    
    // Actions
    handleSave
  };
};
