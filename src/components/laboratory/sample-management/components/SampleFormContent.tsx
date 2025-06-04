
import HorseSelectionSection from "../HorseSelectionSection";
import TemplateSelectionSection from "../TemplateSelectionSection";
import SampleFormFields from "../SampleFormFields";
import SampleTypeField from "../SampleTypeField";
import PreviousSamplesDisplay from "../PreviousSamplesDisplay";

interface SampleFormContentProps {
  selectedHorse: string;
  sampleType: string;
  selectedPreviousSample: string;
  selectedTemplates: string[];
  priority: string;
  personWhoBrought: string;
  sampleReceiptDate?: Date;
  notes: string;
  horseName: string;
  previousSamples: any[];
  onHorseSelect: (value: string) => void;
  onSampleTypeChange: (value: string) => void;
  onSampleSelect: (sampleId: string) => void;
  onTemplateChange: (templateId: string, checked: boolean) => void;
  onPersonSelect: (value: string) => void;
  onSampleReceiptDateChange: (date: Date | undefined) => void;
  onPriorityChange: (priority: string) => void;
  onNotesChange: (notes: string) => void;
}

const SampleFormContent = ({
  selectedHorse,
  sampleType,
  selectedPreviousSample,
  selectedTemplates,
  priority,
  personWhoBrought,
  sampleReceiptDate,
  notes,
  horseName,
  previousSamples,
  onHorseSelect,
  onSampleTypeChange,
  onSampleSelect,
  onTemplateChange,
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

      <TemplateSelectionSection
        selectedTemplates={selectedTemplates}
        onTemplateChange={onTemplateChange}
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
