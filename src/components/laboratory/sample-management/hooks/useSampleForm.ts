
import { useHorseData } from "./useHorseData";
import { useTemplateManagement } from "./useTemplateManagement";
import { usePersonAndFormFields } from "./usePersonAndFormFields";

export const useSampleForm = () => {
  const horseData = useHorseData();
  const templateData = useTemplateManagement();
  const formFieldsData = usePersonAndFormFields();

  const handleSave = () => {
    console.log("Sample data:", {
      horse: horseData.selectedHorse,
      sampleType: horseData.sampleType,
      selectedPreviousSample: horseData.sampleType === "retest" ? horseData.selectedPreviousSample : null,
      selectedTemplates: templateData.selectedTemplates,
      priority: formFieldsData.priority,
      personWhoBrought: formFieldsData.personWhoBrought,
      sampleReceiptDate: formFieldsData.sampleReceiptDate,
      notes: formFieldsData.notes
    });
    return true; // Return success status
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
    
    // Template data (replacing analysis data)
    selectedTemplates: templateData.selectedTemplates,
    handleTemplateChange: templateData.handleTemplateChange,
    resetTemplates: templateData.resetTemplates,
    
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
