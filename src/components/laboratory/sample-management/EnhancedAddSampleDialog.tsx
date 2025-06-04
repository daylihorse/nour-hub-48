
import { useState } from "react";
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import HorseSelectionSection from "./HorseSelectionSection";
import RequiredAnalysisSection from "./RequiredAnalysisSection";
import SampleFormFields from "./SampleFormFields";
import AddPersonDialog from "./AddPersonDialog";

interface EnhancedAddSampleDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const EnhancedAddSampleDialog = ({ isOpen, setIsOpen }: EnhancedAddSampleDialogProps) => {
  const [selectedHorse, setSelectedHorse] = useState("");
  const [selectedAnalysis, setSelectedAnalysis] = useState<string[]>([]);
  const [tubeStatus, setTubeStatus] = useState<{[key: string]: string}>({});
  const [rejectionReasons, setRejectionReasons] = useState<{[key: string]: string}>({});
  const [priority, setPriority] = useState("");
  const [personWhoBrought, setPersonWhoBrought] = useState("");
  const [showAddPerson, setShowAddPerson] = useState(false);
  const [sampleReceiptDate, setSampleReceiptDate] = useState<Date>();
  const [notes, setNotes] = useState("");

  const handleAnalysisChange = (analysisId: string, checked: boolean) => {
    if (checked) {
      setSelectedAnalysis(prev => [...prev, analysisId]);
    } else {
      setSelectedAnalysis(prev => prev.filter(id => id !== analysisId));
      // Remove tube status for unselected analysis
      const newTubeStatus = { ...tubeStatus };
      delete newTubeStatus[analysisId];
      setTubeStatus(newTubeStatus);
      const newRejectionReasons = { ...rejectionReasons };
      delete newRejectionReasons[analysisId];
      setRejectionReasons(newRejectionReasons);
    }
  };

  const handleTubeStatusChange = (analysisId: string, status: string) => {
    setTubeStatus(prev => ({ ...prev, [analysisId]: status }));
    if (status === "yes") {
      // Remove rejection reason if tube is appropriate
      const newRejectionReasons = { ...rejectionReasons };
      delete newRejectionReasons[analysisId];
      setRejectionReasons(newRejectionReasons);
    }
  };

  const handleRejectionReasonChange = (analysisId: string, reason: string) => {
    setRejectionReasons(prev => ({ ...prev, [analysisId]: reason }));
  };

  const handlePersonSelect = (value: string) => {
    if (value === "__add_new__") {
      setShowAddPerson(true);
    } else {
      setPersonWhoBrought(value);
    }
  };

  const handleSave = () => {
    console.log("Sample data:", {
      horse: selectedHorse,
      requiredAnalysis: selectedAnalysis,
      tubeStatus,
      rejectionReasons,
      priority,
      personWhoBrought,
      sampleReceiptDate,
      notes
    });
    setIsOpen(false);
  };

  return (
    <>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Sample</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <HorseSelectionSection 
            selectedHorse={selectedHorse}
            onHorseSelect={setSelectedHorse}
          />

          <RequiredAnalysisSection
            selectedAnalysis={selectedAnalysis}
            tubeStatus={tubeStatus}
            rejectionReasons={rejectionReasons}
            onAnalysisChange={handleAnalysisChange}
            onTubeStatusChange={handleTubeStatusChange}
            onRejectionReasonChange={handleRejectionReasonChange}
          />

          <SampleFormFields
            personWhoBrought={personWhoBrought}
            sampleReceiptDate={sampleReceiptDate}
            priority={priority}
            notes={notes}
            onPersonSelect={handlePersonSelect}
            onSampleReceiptDateChange={setSampleReceiptDate}
            onPriorityChange={setPriority}
            onNotesChange={setNotes}
          />

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              Save Sample
            </Button>
          </div>
        </div>
      </DialogContent>

      <AddPersonDialog 
        isOpen={showAddPerson}
        setIsOpen={setShowAddPerson}
        onPersonAdded={(person) => {
          setPersonWhoBrought(person.name);
          setShowAddPerson(false);
        }}
      />
    </>
  );
};

export default EnhancedAddSampleDialog;
