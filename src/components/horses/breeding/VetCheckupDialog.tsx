
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
import { Stethoscope, Plus } from "lucide-react";
import BaseRecordDialog from "./records/BaseRecordDialog";
import { useRecords } from "./records/RecordsProvider";
import { VeterinaryCheckupRecord } from "@/types/breeding/unified-records";
import { generateRecordId } from "./records/utils/recordUtils";

interface VetCheckupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pregnancyId: string | null;
  horseId?: string;
  horseName?: string;
}

const VetCheckupDialog = ({ 
  open, 
  onOpenChange, 
  pregnancyId, 
  horseId = "default-horse-id",
  horseName = "Mare"
}: VetCheckupDialogProps) => {
  const { addRecord } = useRecords();
  
  const [formData, setFormData] = useState({
    date: undefined as Date | undefined,
    type: "",
    findings: "",
    recommendations: "",
    nextCheckupDate: undefined as Date | undefined,
    veterinarian: "",
    temperature: "",
    heartRate: "",
    respiratoryRate: "",
    weight: "",
  });
  const [showAddVet, setShowAddVet] = useState(false);
  const [newVetName, setNewVetName] = useState("");

  const checkupTypes = [
    { value: "routine", label: "Routine Checkup" },
    { value: "emergency", label: "Emergency" },
    { value: "follow_up", label: "Follow-up" },
    { value: "specialist", label: "Specialist" },
  ];

  const veterinarians = [
    "Dr. Smith",
    "Dr. Johnson",
    "Dr. Brown", 
    "Dr. Davis",
    "Dr. Wilson",
  ];

  const handleAddVeterinarian = () => {
    if (newVetName.trim()) {
      setFormData({...formData, veterinarian: newVetName.trim()});
      setNewVetName("");
      setShowAddVet(false);
    }
  };

  const handleSubmit = () => {
    if (!formData.date || !formData.type || !formData.veterinarian) {
      return;
    }

    const newRecord: VeterinaryCheckupRecord = {
      id: generateRecordId('veterinary_checkup'),
      type: 'veterinary_checkup',
      title: `${checkupTypes.find(t => t.value === formData.type)?.label || 'Veterinary Checkup'}`,
      description: formData.findings || undefined,
      status: 'completed',
      priority: 'medium',
      horseId,
      horseName,
      pregnancyId: pregnancyId || undefined,
      createdAt: new Date(),
      updatedAt: new Date(),
      scheduledDate: formData.date,
      completedDate: formData.date,
      veterinarian: formData.veterinarian,
      createdBy: "current-user",
      checkupType: formData.type as any,
      findings: formData.findings || undefined,
      recommendations: formData.recommendations || undefined,
      nextCheckupDate: formData.nextCheckupDate || undefined,
      vitalSigns: {
        temperature: formData.temperature ? parseFloat(formData.temperature) : undefined,
        heartRate: formData.heartRate ? parseFloat(formData.heartRate) : undefined,
        respiratoryRate: formData.respiratoryRate ? parseFloat(formData.respiratoryRate) : undefined,
        weight: formData.weight ? parseFloat(formData.weight) : undefined,
      }
    };

    addRecord(newRecord);
    onOpenChange(false);
    
    // Reset form
    setFormData({
      date: undefined,
      type: "",
      findings: "",
      recommendations: "",
      nextCheckupDate: undefined,
      veterinarian: "",
      temperature: "",
      heartRate: "",
      respiratoryRate: "",
      weight: "",
    });
  };

  const isFormValid = formData.date && formData.type && formData.veterinarian;

  return (
    <BaseRecordDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Schedule Veterinary Checkup"
      icon={<Stethoscope className="h-5 w-5" />}
      horseId={horseId}
      horseName={horseName}
      pregnancyId={pregnancyId}
      onSubmit={handleSubmit}
      submitLabel="Schedule Checkup"
      isSubmitDisabled={!isFormValid}
      showPregnancyInfo={!!pregnancyId}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Checkup Date */}
        <div className="space-y-2">
          <Label>Checkup Date *</Label>
          <DatePicker
            date={formData.date}
            onDateChange={(date) => setFormData({...formData, date})}
            placeholder="Select checkup date"
            disabled={(date) => date < new Date()}
          />
        </div>

        {/* Checkup Type */}
        <div className="space-y-2">
          <Label htmlFor="type">Checkup Type *</Label>
          <Select 
            value={formData.type} 
            onValueChange={(value) => setFormData({...formData, type: value})}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select checkup type" />
            </SelectTrigger>
            <SelectContent className="bg-white z-50">
              {checkupTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Veterinarian */}
      <div className="space-y-2">
        <Label htmlFor="veterinarian">Veterinarian *</Label>
        {!showAddVet ? (
          <Select 
            value={formData.veterinarian} 
            onValueChange={(value) => {
              if (value === "__add_new__") {
                setShowAddVet(true);
              } else {
                setFormData({...formData, veterinarian: value});
              }
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select veterinarian" />
            </SelectTrigger>
            <SelectContent className="bg-white z-50">
              {veterinarians.map((vet) => (
                <SelectItem key={vet} value={vet}>
                  {vet}
                </SelectItem>
              ))}
              <SelectItem value="__add_new__" className="border-t mt-1 pt-2">
                <div className="flex items-center gap-2 font-medium text-primary">
                  <Plus className="h-4 w-4" />
                  <span>Add New Veterinarian</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        ) : (
          <div className="flex gap-2">
            <Input
              placeholder="Enter veterinarian name"
              value={newVetName}
              onChange={(e) => setNewVetName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddVeterinarian()}
            />
            <button type="button" onClick={handleAddVeterinarian} className="px-3 py-2 bg-primary text-white rounded">Add</button>
            <button type="button" onClick={() => setShowAddVet(false)} className="px-3 py-2 border rounded">Cancel</button>
          </div>
        )}
      </div>

      {/* Vital Signs */}
      <div className="space-y-4">
        <Label className="text-base font-semibold">Vital Signs</Label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="temperature">Temperature (°F)</Label>
            <Input
              id="temperature"
              type="number"
              step="0.1"
              placeholder="99.5"
              value={formData.temperature}
              onChange={(e) => setFormData({...formData, temperature: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="heartRate">Heart Rate (bpm)</Label>
            <Input
              id="heartRate"
              type="number"
              placeholder="40"
              value={formData.heartRate}
              onChange={(e) => setFormData({...formData, heartRate: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="respiratoryRate">Respiratory Rate</Label>
            <Input
              id="respiratoryRate"
              type="number"
              placeholder="12"
              value={formData.respiratoryRate}
              onChange={(e) => setFormData({...formData, respiratoryRate: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="weight">Weight (lbs)</Label>
            <Input
              id="weight"
              type="number"
              placeholder="1000"
              value={formData.weight}
              onChange={(e) => setFormData({...formData, weight: e.target.value})}
            />
          </div>
        </div>
      </div>

      {/* Findings */}
      <div className="space-y-2">
        <Label htmlFor="findings">Findings</Label>
        <Textarea
          id="findings"
          placeholder="Enter checkup findings..."
          value={formData.findings}
          onChange={(e) => setFormData({...formData, findings: e.target.value})}
          rows={4}
          className="resize-none"
        />
      </div>

      {/* Recommendations */}
      <div className="space-y-2">
        <Label htmlFor="recommendations">Recommendations</Label>
        <Textarea
          id="recommendations"
          placeholder="Enter recommendations..."
          value={formData.recommendations}
          onChange={(e) => setFormData({...formData, recommendations: e.target.value})}
          rows={3}
          className="resize-none"
        />
      </div>

      {/* Next Checkup Date */}
      <div className="space-y-2">
        <Label>Next Checkup Date (Optional)</Label>
        <DatePicker
          date={formData.nextCheckupDate}
          onDateChange={(date) => setFormData({...formData, nextCheckupDate: date})}
          placeholder="Select next checkup date"
          disabled={(date) => date <= new Date()}
        />
      </div>
    </BaseRecordDialog>
  );
};

export default VetCheckupDialog;
