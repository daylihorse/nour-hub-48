
import { useState, useEffect } from "react";
import { DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import HorseSelectionSection from "./HorseSelectionSection";
import RequiredAnalysisSection from "./RequiredAnalysisSection";
import SampleFormFields from "./SampleFormFields";
import SampleTypeField from "./SampleTypeField";
import PreviousSamplesDisplay from "./PreviousSamplesDisplay";
import AddPersonDialog from "./AddPersonDialog";

interface EnhancedAddSampleDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const EnhancedAddSampleDialog = ({ isOpen, setIsOpen }: EnhancedAddSampleDialogProps) => {
  const [selectedHorse, setSelectedHorse] = useState("");
  const [sampleType, setSampleType] = useState("new");
  const [selectedPreviousSample, setSelectedPreviousSample] = useState("");
  const [selectedAnalysis, setSelectedAnalysis] = useState<string[]>([]);
  const [tubeStatus, setTubeStatus] = useState<{[key: string]: string}>({});
  const [rejectionReasons, setRejectionReasons] = useState<{[key: string]: string}>({});
  const [priority, setPriority] = useState("");
  const [personWhoBrought, setPersonWhoBrought] = useState("");
  const [showAddPerson, setShowAddPerson] = useState(false);
  const [sampleReceiptDate, setSampleReceiptDate] = useState<Date>();
  const [notes, setNotes] = useState("");

  // Debug logging
  console.log("EnhancedAddSampleDialog rendered with:", {
    isOpen,
    selectedHorse,
    sampleType,
    selectedPreviousSample
  });

  // Mock previous samples data - in real app this would come from an API
  const mockPreviousSamples = {
    "thunder": [
      {
        id: "S001",
        collectionDate: "2024-05-15",
        analysis: ["Blood Chemistry", "CBC"],
        status: "completed",
        priority: "routine",
        notes: "Regular health check"
      },
      {
        id: "S005",
        collectionDate: "2024-05-28",
        analysis: ["Hormone Panel"],
        status: "processing",
        priority: "urgent",
        notes: "Follow-up test for hormonal imbalance"
      }
    ],
    "bella": [
      {
        id: "S003",
        collectionDate: "2024-05-20",
        analysis: ["Parasite Screen"],
        status: "completed",
        priority: "routine",
        notes: "Routine parasite check"
      }
    ],
    "shadow": [],
    "storm": [
      {
        id: "S007",
        collectionDate: "2024-05-30",
        analysis: ["Blood Chemistry", "Liver Function"],
        status: "rejected",
        priority: "critical",
        notes: "Sample rejected due to hemolysis"
      }
    ],
    "flash": []
  };

  const horseName = selectedHorse === "thunder" ? "Thunder" :
                   selectedHorse === "bella" ? "Bella" :
                   selectedHorse === "shadow" ? "Shadow" :
                   selectedHorse === "storm" ? "Storm" :
                   selectedHorse === "flash" ? "Flash" : "";

  const previousSamples = selectedHorse ? (mockPreviousSamples[selectedHorse as keyof typeof mockPreviousSamples] || []) : [];

  // Reset previous sample selection when horse changes
  useEffect(() => {
    console.log("Horse changed, resetting previous sample selection");
    setSelectedPreviousSample("");
  }, [selectedHorse]);

  // Reset sample type when horse changes
  useEffect(() => {
    console.log("Horse changed, resetting sample type to new");
    setSampleType("new");
  }, [selectedHorse]);

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
    console.log("Person select handler called with:", value);
    if (value === "__add_new__") {
      setShowAddPerson(true);
    } else {
      setPersonWhoBrought(value);
    }
  };

  const handlePersonAdded = (person: { name: string; phone: string }) => {
    console.log("Person added:", person);
    setPersonWhoBrought(person.name);
    setShowAddPerson(false);
  };

  const handleHorseSelect = (value: string) => {
    console.log("Horse selected in main dialog:", value);
    setSelectedHorse(value);
  };

  const handleSampleTypeChange = (value: string) => {
    console.log("Sample type changed to:", value);
    setSampleType(value);
    if (value === "new") {
      setSelectedPreviousSample("");
    }
  };

  const handleSave = () => {
    console.log("Sample data:", {
      horse: selectedHorse,
      sampleType,
      selectedPreviousSample: sampleType === "retest" ? selectedPreviousSample : null,
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
          <DialogDescription>
            Fill in the sample information including horse details, analysis requirements, and sample classification.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          <HorseSelectionSection 
            selectedHorse={selectedHorse}
            onHorseSelect={handleHorseSelect}
          />

          {selectedHorse && (
            <SampleTypeField
              value={sampleType}
              onValueChange={handleSampleTypeChange}
            />
          )}

          {sampleType === "retest" && selectedHorse && (
            <PreviousSamplesDisplay
              horseName={horseName}
              samples={previousSamples}
              selectedSampleId={selectedPreviousSample}
              onSampleSelect={setSelectedPreviousSample}
            />
          )}

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
        onPersonAdded={handlePersonAdded}
      />
    </>
  );
};

export default EnhancedAddSampleDialog;
