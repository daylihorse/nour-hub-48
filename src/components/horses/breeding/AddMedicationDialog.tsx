
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
import { Checkbox } from "@/components/ui/checkbox";
import { Pill, Plus, AlertTriangle } from "lucide-react";
import BaseRecordDialog from "./records/BaseRecordDialog";
import { useRecords } from "./records/RecordsProvider";
import { MedicationRecord } from "@/types/breeding/unified-records";
import { generateRecordId } from "./records/utils/recordUtils";

interface AddMedicationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mareId?: string | null;
  mareName?: string;
}

const AddMedicationDialog = ({ 
  open, 
  onOpenChange, 
  mareId = "default-horse-id", 
  mareName = "Mare"
}: AddMedicationDialogProps) => {
  const { addRecord } = useRecords();
  
  const [formData, setFormData] = useState({
    medicationName: "",
    dosage: "",
    frequency: "",
    startDate: undefined as Date | undefined,
    endDate: undefined as Date | undefined,
    route: "",
    prescribedBy: "",
    purpose: "",
    instructions: "",
    sideEffects: "",
    requiresMonitoring: false,
    isControlledSubstance: false,
  });
  const [showAddPrescriber, setShowAddPrescriber] = useState(false);
  const [newPrescriberName, setNewPrescriberName] = useState("");

  const frequencies = [
    { value: "once_daily", label: "Once daily" },
    { value: "twice_daily", label: "Twice daily" },
    { value: "three_times_daily", label: "Three times daily" },
    { value: "four_times_daily", label: "Four times daily" },
    { value: "every_other_day", label: "Every other day" },
    { value: "weekly", label: "Weekly" },
    { value: "as_needed", label: "As needed" },
    { value: "before_exercise", label: "Before exercise" },
    { value: "after_feeding", label: "After feeding" },
  ];

  const routes = [
    { value: "oral", label: "Oral" },
    { value: "intramuscular", label: "Intramuscular (IM)" },
    { value: "intravenous", label: "Intravenous (IV)" },
    { value: "subcutaneous", label: "Subcutaneous" },
    { value: "topical", label: "Topical" },
    { value: "nasal", label: "Nasal" },
    { value: "inhalation", label: "Inhalation" },
  ];

  const prescribers = [
    "Dr. Smith (Veterinarian)",
    "Dr. Johnson (Veterinarian)",
    "Dr. Brown (Veterinarian)",
    "Dr. Davis (Veterinarian)",
  ];

  const purposes = [
    { value: "infection", label: "Infection Treatment" },
    { value: "pain_management", label: "Pain Management" },
    { value: "inflammation", label: "Inflammation" },
    { value: "preventive", label: "Preventive Care" },
    { value: "breeding", label: "Breeding Support" },
    { value: "pregnancy", label: "Pregnancy Support" },
    { value: "respiratory", label: "Respiratory Care" },
    { value: "digestive", label: "Digestive Health" },
    { value: "supplement", label: "Nutritional Supplement" },
  ];

  const handleAddPrescriber = () => {
    if (newPrescriberName.trim()) {
      setFormData({...formData, prescribedBy: newPrescriberName.trim()});
      setNewPrescriberName("");
      setShowAddPrescriber(false);
    }
  };

  const handleSubmit = () => {
    if (!formData.medicationName || !formData.dosage || !formData.frequency || !formData.route || !formData.startDate || !formData.prescribedBy) {
      return;
    }

    const newRecord: MedicationRecord = {
      id: generateRecordId('medication'),
      type: 'medication',
      title: `${formData.medicationName} - ${formData.dosage}`,
      description: formData.instructions || undefined,
      status: 'scheduled',
      priority: formData.isControlledSubstance ? 'high' : 'medium',
      horseId: mareId || "default-horse-id",
      horseName: mareName || "Mare",
      createdAt: new Date(),
      updatedAt: new Date(),
      scheduledDate: formData.startDate,
      dueDate: formData.endDate || undefined,
      createdBy: "current-user",
      medicationName: formData.medicationName,
      dosage: formData.dosage,
      frequency: formData.frequency,
      route: formData.route,
      startDate: formData.startDate,
      endDate: formData.endDate || undefined,
      purpose: formData.purpose,
      sideEffects: formData.sideEffects || undefined,
      instructions: formData.instructions || undefined,
      requiresMonitoring: formData.requiresMonitoring,
      isControlledSubstance: formData.isControlledSubstance,
    };

    addRecord(newRecord);
    onOpenChange(false);
    
    // Reset form
    setFormData({
      medicationName: "",
      dosage: "",
      frequency: "",
      startDate: undefined,
      endDate: undefined,
      route: "",
      prescribedBy: "",
      purpose: "",
      instructions: "",
      sideEffects: "",
      requiresMonitoring: false,
      isControlledSubstance: false,
    });
  };

  const isFormValid = formData.medicationName && formData.dosage && formData.frequency && formData.route && formData.startDate && formData.prescribedBy;

  return (
    <BaseRecordDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Add Medication"
      icon={<Pill className="h-5 w-5" />}
      horseId={mareId}
      horseName={mareName}
      onSubmit={handleSubmit}
      submitLabel="Add Medication"
      isSubmitDisabled={!isFormValid}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Medication Name */}
        <div className="space-y-2">
          <Label htmlFor="medicationName">Medication Name *</Label>
          <Input
            id="medicationName"
            placeholder="Enter medication name"
            value={formData.medicationName}
            onChange={(e) => setFormData({...formData, medicationName: e.target.value})}
          />
        </div>

        {/* Dosage */}
        <div className="space-y-2">
          <Label htmlFor="dosage">Dosage *</Label>
          <Input
            id="dosage"
            placeholder="e.g., 10mg, 2 tablets, 5ml"
            value={formData.dosage}
            onChange={(e) => setFormData({...formData, dosage: e.target.value})}
          />
        </div>

        {/* Frequency */}
        <div className="space-y-2">
          <Label htmlFor="frequency">Frequency *</Label>
          <Select 
            value={formData.frequency} 
            onValueChange={(value) => setFormData({...formData, frequency: value})}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select frequency" />
            </SelectTrigger>
            <SelectContent className="bg-white z-50">
              {frequencies.map((freq) => (
                <SelectItem key={freq.value} value={freq.value}>
                  {freq.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Route */}
        <div className="space-y-2">
          <Label htmlFor="route">Route *</Label>
          <Select 
            value={formData.route} 
            onValueChange={(value) => setFormData({...formData, route: value})}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select route" />
            </SelectTrigger>
            <SelectContent className="bg-white z-50">
              {routes.map((route) => (
                <SelectItem key={route.value} value={route.value}>
                  {route.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Start Date */}
        <div className="space-y-2">
          <Label>Start Date *</Label>
          <DatePicker
            date={formData.startDate}
            onDateChange={(date) => setFormData({...formData, startDate: date})}
            placeholder="Select start date"
          />
        </div>

        {/* End Date */}
        <div className="space-y-2">
          <Label>End Date</Label>
          <DatePicker
            date={formData.endDate}
            onDateChange={(date) => setFormData({...formData, endDate: date})}
            placeholder="Select end date"
            disabled={(date) => formData.startDate ? date <= formData.startDate : false}
          />
        </div>
      </div>

      {/* Purpose */}
      <div className="space-y-2">
        <Label htmlFor="purpose">Purpose</Label>
        <Select 
          value={formData.purpose} 
          onValueChange={(value) => setFormData({...formData, purpose: value})}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select purpose" />
          </SelectTrigger>
          <SelectContent className="bg-white z-50">
            {purposes.map((purpose) => (
              <SelectItem key={purpose.value} value={purpose.value}>
                {purpose.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Prescribed By */}
      <div className="space-y-2">
        <Label htmlFor="prescribedBy">Prescribed By *</Label>
        {!showAddPrescriber ? (
          <Select 
            value={formData.prescribedBy} 
            onValueChange={(value) => {
              if (value === "__add_new__") {
                setShowAddPrescriber(true);
              } else {
                setFormData({...formData, prescribedBy: value});
              }
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select prescriber" />
            </SelectTrigger>
            <SelectContent className="bg-white z-50">
              {prescribers.map((prescriber) => (
                <SelectItem key={prescriber} value={prescriber}>
                  {prescriber}
                </SelectItem>
              ))}
              <SelectItem value="__add_new__" className="border-t mt-1 pt-2">
                <div className="flex items-center gap-2 font-medium text-primary">
                  <Plus className="h-4 w-4" />
                  <span>Add New Prescriber</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        ) : (
          <div className="flex gap-2">
            <Input
              placeholder="Enter prescriber name"
              value={newPrescriberName}
              onChange={(e) => setNewPrescriberName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddPrescriber()}
            />
            <button type="button" onClick={handleAddPrescriber} className="px-3 py-2 bg-primary text-white rounded">Add</button>
            <button type="button" onClick={() => setShowAddPrescriber(false)} className="px-3 py-2 border rounded">Cancel</button>
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="space-y-2">
        <Label htmlFor="instructions">Administration Instructions</Label>
        <Textarea
          id="instructions"
          placeholder="Enter detailed administration instructions..."
          value={formData.instructions}
          onChange={(e) => setFormData({...formData, instructions: e.target.value})}
          rows={3}
          className="resize-none"
        />
      </div>

      {/* Side Effects */}
      <div className="space-y-2">
        <Label htmlFor="sideEffects">Possible Side Effects</Label>
        <Textarea
          id="sideEffects"
          placeholder="Enter possible side effects to monitor..."
          value={formData.sideEffects}
          onChange={(e) => setFormData({...formData, sideEffects: e.target.value})}
          rows={3}
          className="resize-none"
        />
      </div>

      {/* Checkboxes */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="requiresMonitoring"
            checked={formData.requiresMonitoring}
            onCheckedChange={(checked) => setFormData({...formData, requiresMonitoring: checked as boolean})}
          />
          <Label htmlFor="requiresMonitoring" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Requires special monitoring
          </Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="isControlledSubstance"
            checked={formData.isControlledSubstance}
            onCheckedChange={(checked) => setFormData({...formData, isControlledSubstance: checked as boolean})}
          />
          <Label htmlFor="isControlledSubstance" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-orange-500" />
            Controlled substance
          </Label>
        </div>
      </div>
    </BaseRecordDialog>
  );
};

export default AddMedicationDialog;
