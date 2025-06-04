
import { useState, useEffect } from "react";

export const useSampleForm = () => {
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

  // Mock previous samples data
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
    return true; // Return success status
  };

  return {
    // State
    selectedHorse,
    sampleType,
    selectedPreviousSample,
    selectedAnalysis,
    tubeStatus,
    rejectionReasons,
    priority,
    personWhoBrought,
    showAddPerson,
    sampleReceiptDate,
    notes,
    horseName,
    previousSamples,
    
    // Setters
    setSelectedPreviousSample,
    setPriority,
    setSampleReceiptDate,
    setNotes,
    setShowAddPerson,
    
    // Handlers
    handleAnalysisChange,
    handleTubeStatusChange,
    handleRejectionReasonChange,
    handlePersonSelect,
    handlePersonAdded,
    handleHorseSelect,
    handleSampleTypeChange,
    handleSave
  };
};
