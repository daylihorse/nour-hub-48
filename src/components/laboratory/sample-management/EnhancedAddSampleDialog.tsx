
import { useState } from "react";
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { DatePicker } from "@/components/ui/date-picker";
import { Plus, Search } from "lucide-react";
import AddHorseSection from "./AddHorseSection";
import AddPersonDialog from "./AddPersonDialog";

interface EnhancedAddSampleDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const requiredAnalysisOptions = [
  { id: "blood_count", label: "Blood Count", needsTube: true },
  { id: "biochemistry", label: "Biochemistry", needsTube: true },
  { id: "serology", label: "Serology", needsTube: true },
  { id: "microbiology", label: "Microbiology", needsTube: false },
  { id: "parasitology", label: "Parasitology", needsTube: false },
  { id: "toxicology", label: "Toxicology", needsTube: true },
  { id: "genetics", label: "Genetics", needsTube: true },
  { id: "hormones", label: "Hormones", needsTube: true }
];

const rejectionReasonOptions = [
  "Insufficient sample volume",
  "Hemolyzed sample",
  "Clotted sample",
  "Contaminated sample",
  "Incorrect tube type",
  "Sample deteriorated",
  "Labeling error"
];

const EnhancedAddSampleDialog = ({ isOpen, setIsOpen }: EnhancedAddSampleDialogProps) => {
  const [selectedHorse, setSelectedHorse] = useState("");
  const [showAddHorse, setShowAddHorse] = useState(false);
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

  const handleHorseSelect = (value: string) => {
    if (value === "__add_new__") {
      setShowAddHorse(true);
    } else {
      setSelectedHorse(value);
      setShowAddHorse(false);
    }
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
          {/* Horse Selection */}
          <div>
            <Label>Horse *</Label>
            {!showAddHorse ? (
              <Select value={selectedHorse} onValueChange={handleHorseSelect}>
                <SelectTrigger>
                  <SelectValue placeholder="Select horse..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="thunder">Thunder</SelectItem>
                  <SelectItem value="bella">Bella</SelectItem>
                  <SelectItem value="shadow">Shadow</SelectItem>
                  <SelectItem value="__add_new__" className="border-t mt-1 pt-2">
                    <div className="flex items-center gap-2 font-medium text-primary">
                      <Plus className="h-4 w-4" />
                      <span>Add New Horse</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <div className="space-y-4 p-4 border rounded-lg bg-gray-50">
                <div className="flex justify-between items-center">
                  <Label className="text-lg font-medium">Add New Horse</Label>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowAddHorse(false)}
                  >
                    Cancel
                  </Button>
                </div>
                <AddHorseSection />
              </div>
            )}
          </div>

          {/* Required Analysis */}
          <div>
            <Label className="block mb-3">Required Analysis *</Label>
            <div className="grid grid-cols-2 gap-4">
              {requiredAnalysisOptions.map((analysis) => (
                <div key={analysis.id} className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`analysis-${analysis.id}`}
                      checked={selectedAnalysis.includes(analysis.id)}
                      onCheckedChange={(checked) => handleAnalysisChange(analysis.id, !!checked)}
                    />
                    <Label htmlFor={`analysis-${analysis.id}`} className="text-sm">
                      {analysis.label}
                    </Label>
                  </div>
                  
                  {selectedAnalysis.includes(analysis.id) && analysis.needsTube && (
                    <div className="ml-6 space-y-2">
                      <Label className="text-xs text-muted-foreground">
                        Appropriate tube received?
                      </Label>
                      <RadioGroup
                        value={tubeStatus[analysis.id] || ""}
                        onValueChange={(value) => handleTubeStatusChange(analysis.id, value)}
                        className="flex gap-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id={`${analysis.id}-yes`} />
                          <Label htmlFor={`${analysis.id}-yes`} className="text-xs">Yes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id={`${analysis.id}-no`} />
                          <Label htmlFor={`${analysis.id}-no`} className="text-xs">No</Label>
                        </div>
                      </RadioGroup>
                      
                      {tubeStatus[analysis.id] === "no" && (
                        <Select
                          value={rejectionReasons[analysis.id] || ""}
                          onValueChange={(value) => handleRejectionReasonChange(analysis.id, value)}
                        >
                          <SelectTrigger className="h-8 text-xs">
                            <SelectValue placeholder="Select reason..." />
                          </SelectTrigger>
                          <SelectContent>
                            {rejectionReasonOptions.map((reason) => (
                              <SelectItem key={reason} value={reason} className="text-xs">
                                {reason}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Person Who Brought Sample */}
          <div>
            <Label>Person Who Brought Sample</Label>
            <div className="flex gap-2">
              <div className="flex-1">
                <Select value={personWhoBrought} onValueChange={handlePersonSelect}>
                  <SelectTrigger>
                    <Search className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Search person..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="john_doe">John Doe</SelectItem>
                    <SelectItem value="jane_smith">Jane Smith</SelectItem>
                    <SelectItem value="mike_johnson">Mike Johnson</SelectItem>
                    <SelectItem value="__add_new__" className="border-t mt-1 pt-2">
                      <div className="flex items-center gap-2 font-medium text-primary">
                        <Plus className="h-4 w-4" />
                        <span>Add New Person</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Sample Receipt Date */}
          <div>
            <Label>Sample Receipt Date *</Label>
            <DatePicker
              date={sampleReceiptDate}
              onDateChange={setSampleReceiptDate}
              placeholder="Select receipt date"
            />
          </div>

          {/* Priority */}
          <div>
            <Label>Priority</Label>
            <Select value={priority} onValueChange={setPriority}>
              <SelectTrigger>
                <SelectValue placeholder="Select priority..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="routine">Routine</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Notes */}
          <div>
            <Label>Notes</Label>
            <Textarea 
              placeholder="Additional notes..." 
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

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
