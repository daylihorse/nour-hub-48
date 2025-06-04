
import HorseSelectionSection from "../HorseSelectionSection";
import RequiredAnalysisSection from "../RequiredAnalysisSection";
import SampleFormFields from "../SampleFormFields";
import SampleTypeField from "../SampleTypeField";
import PreviousSamplesDisplay from "../PreviousSamplesDisplay";

interface SampleFormContentProps {
  selectedHorse: string;
  sampleType: string;
  selectedPreviousSample: string;
  selectedAnalysis: string[];
  tubeStatus: {[key: string]: string};
  rejectionReasons: {[key: string]: string};
  priority: string;
  personWhoBrought: string;
  sampleReceiptDate?: Date;
  notes: string;
  horseName: string;
  previousSamples: any[];
  onHorseSelect: (value: string) => void;
  onSampleTypeChange: (value: string) => void;
  onSampleSelect: (sampleId: string) => void;
  onAnalysisChange: (analysisId: string, checked: boolean) => void;
  onTubeStatusChange: (analysisId: string, status: string) => void;
  onRejectionReasonChange: (analysisId: string, reason: string) => void;
  onPersonSelect: (value: string) => void;
  onSampleReceiptDateChange: (date: Date | undefined) => void;
  onPriorityChange: (priority: string) => void;
  onNotesChange: (notes: string) => void;
}

const SampleFormContent = ({
  selectedHorse,
  sampleType,
  selectedPreviousSample,
  selectedAnalysis,
  tubeStatus,
  rejectionReasons,
  priority,
  personWhoBrought,
  sampleReceiptDate,
  notes,
  horseName,
  previousSamples,
  onHorseSelect,
  onSampleTypeChange,
  onSampleSelect,
  onAnalysisChange,
  onTubeStatusChange,
  onRejectionReasonChange,
  onPersonSelect,
  onSampleReceiptDateChange,
  onPriorityChange,
  onNotesChange
}: SampleFormContentProps) => {
  return (
    <div className="space-y-6">
      <HorseSelectionSection 
        selectedHorse={selectedHorse}
        onHorseSelect={onHorseSelect}
      />

      {selectedHorse && (
        <SampleTypeField
          value={sampleType}
          onValueChange={onSampleTypeChange}
        />
      )}

      {sampleType === "retest" && selectedHorse && (
        <PreviousSamplesDisplay
          horseName={horseName}
          samples={previousSamples}
          selectedSampleId={selectedPreviousSample}
          onSampleSelect={onSampleSelect}
        />
      )}

      <RequiredAnalysisSection
        selectedAnalysis={selectedAnalysis}
        tubeStatus={tubeStatus}
        rejectionReasons={rejectionReasons}
        onAnalysisChange={onAnalysisChange}
        onTubeStatusChange={onTubeStatusChange}
        onRejectionReasonChange={onRejectionReasonChange}
      />

      <SampleFormFields
        personWhoBrought={personWhoBrought}
        sampleReceiptDate={sampleReceiptDate}
        priority={priority}
        notes={notes}
        onPersonSelect={onPersonSelect}
        onSampleReceiptDateChange={onSampleReceiptDateChange}
        onPriorityChange={onPriorityChange}
        onNotesChange={onNotesChange}
      />
    </div>
  );
};

export default SampleFormContent;
