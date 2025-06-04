
import { DialogContent } from "@/components/ui/dialog";
import { useSampleForm } from "./hooks/useSampleForm";
import SampleDialogHeader from "./components/SampleDialogHeader";
import SampleFormContent from "./components/SampleFormContent";
import SampleDialogActions from "./components/SampleDialogActions";
import AddPersonDialog from "./AddPersonDialog";

interface EnhancedAddSampleDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const EnhancedAddSampleDialog = ({ isOpen, setIsOpen }: EnhancedAddSampleDialogProps) => {
  const {
    selectedHorse,
    sampleType,
    selectedPreviousSample,
    selectedTemplates,
    priority,
    personWhoBrought,
    showAddPerson,
    sampleReceiptDate,
    notes,
    horseName,
    previousSamples,
    setSelectedPreviousSample,
    setPriority,
    setSampleReceiptDate,
    setNotes,
    setShowAddPerson,
    handleTemplateChange,
    handlePersonSelect,
    handlePersonAdded,
    handleHorseSelect,
    handleSampleTypeChange,
    handleSave
  } = useSampleForm();

  // Debug logging
  console.log("EnhancedAddSampleDialog rendered with:", {
    isOpen,
    selectedHorse,
    sampleType,
    selectedTemplates
  });

  const handleSaveAndClose = () => {
    const success = handleSave();
    if (success) {
      setIsOpen(false);
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  return (
    <>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <SampleDialogHeader />
        
        <SampleFormContent
          selectedHorse={selectedHorse}
          sampleType={sampleType}
          selectedPreviousSample={selectedPreviousSample}
          selectedTemplates={selectedTemplates}
          priority={priority}
          personWhoBrought={personWhoBrought}
          sampleReceiptDate={sampleReceiptDate}
          notes={notes}
          horseName={horseName}
          previousSamples={previousSamples}
          onHorseSelect={handleHorseSelect}
          onSampleTypeChange={handleSampleTypeChange}
          onSampleSelect={setSelectedPreviousSample}
          onTemplateChange={handleTemplateChange}
          onPersonSelect={handlePersonSelect}
          onSampleReceiptDateChange={setSampleReceiptDate}
          onPriorityChange={setPriority}
          onNotesChange={setNotes}
        />

        <SampleDialogActions
          onCancel={handleCancel}
          onSave={handleSaveAndClose}
        />
      </DialogContent>

      <AddPersonDialog 
        isOpen={showAddPerson}
        setIsOpen={setShowAddPerson}
        onPersonAdded={handlePersonAdded}
      />
    </>
  );
};

export default EnhancedAddSampleDialog;
