
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
import { Camera, Upload } from "lucide-react";
import BaseRecordDialog from "./records/BaseRecordDialog";
import { useRecords } from "./records/RecordsProvider";
import { UltrasoundRecord } from "@/types/breeding/unified-records";
import { generateRecordId } from "./records/utils/recordUtils";

interface UltrasoundDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pregnancyId: string | null;
  horseId?: string;
  horseName?: string;
}

const UltrasoundDialog = ({ 
  open, 
  onOpenChange, 
  pregnancyId, 
  horseId = "default-horse-id",
  horseName = "Mare"
}: UltrasoundDialogProps) => {
  const { addRecord } = useRecords();
  
  const [formData, setFormData] = useState({
    date: undefined as Date | undefined,
    gestationDay: "",
    findings: "",
    veterinarian: "",
    notes: "",
    crownRumpLength: "",
    biparietal: "",
    heartRate: "",
    nextUltrasoundDate: undefined as Date | undefined,
  });

  const veterinarians = [
    "Dr. Smith",
    "Dr. Johnson", 
    "Dr. Brown",
    "Dr. Davis",
  ];

  const handleSubmit = () => {
    if (!formData.date || !formData.findings) {
      return;
    }

    const newRecord: UltrasoundRecord = {
      id: generateRecordId('ultrasound'),
      type: 'ultrasound',
      title: 'Ultrasound Examination',
      description: formData.notes || undefined,
      status: 'completed',
      priority: 'medium',
      horseId,
      horseName,
      pregnancyId: pregnancyId || undefined,
      createdAt: new Date(),
      updatedAt: new Date(),
      scheduledDate: formData.date,
      completedDate: formData.date,
      veterinarian: formData.veterinarian || undefined,
      createdBy: "current-user",
      gestationDay: formData.gestationDay ? parseInt(formData.gestationDay) : undefined,
      findings: formData.findings,
      measurements: {
        crownRumpLength: formData.crownRumpLength ? parseFloat(formData.crownRumpLength) : undefined,
        biparietal: formData.biparietal ? parseFloat(formData.biparietal) : undefined,
        heartRate: formData.heartRate ? parseFloat(formData.heartRate) : undefined,
      },
      nextUltrasoundDate: formData.nextUltrasoundDate || undefined,
    };

    addRecord(newRecord);
    onOpenChange(false);
    
    // Reset form
    setFormData({
      date: undefined,
      gestationDay: "",
      findings: "",
      veterinarian: "",
      notes: "",
      crownRumpLength: "",
      biparietal: "",
      heartRate: "",
      nextUltrasoundDate: undefined,
    });
  };

  const isFormValid = formData.date && formData.findings;

  return (
    <BaseRecordDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Schedule Ultrasound"
      icon={<Camera className="h-5 w-5" />}
      horseId={horseId}
      horseName={horseName}
      pregnancyId={pregnancyId}
      onSubmit={handleSubmit}
      submitLabel="Schedule Ultrasound"
      isSubmitDisabled={!isFormValid}
      showPregnancyInfo={!!pregnancyId}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Ultrasound Date */}
        <div className="space-y-2">
          <Label>Ultrasound Date *</Label>
          <DatePicker
            date={formData.date}
            onDateChange={(date) => setFormData({...formData, date})}
            placeholder="Select ultrasound date"
          />
        </div>

        {/* Gestation Day */}
        <div className="space-y-2">
          <Label htmlFor="gestationDay">Gestation Day</Label>
          <Input
            id="gestationDay"
            type="number"
            placeholder="Enter gestation day"
            value={formData.gestationDay}
            onChange={(e) => setFormData({...formData, gestationDay: e.target.value})}
          />
        </div>

        {/* Veterinarian */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="veterinarian">Veterinarian</Label>
          <Select 
            value={formData.veterinarian} 
            onValueChange={(value) => setFormData({...formData, veterinarian: value})}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select veterinarian" />
            </SelectTrigger>
            <SelectContent>
              {veterinarians.map((vet) => (
                <SelectItem key={vet} value={vet}>
                  {vet}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Measurements */}
      <div className="space-y-4">
        <Label className="text-base font-semibold">Measurements</Label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="crownRumpLength">Crown-Rump Length (cm)</Label>
            <Input
              id="crownRumpLength"
              type="number"
              step="0.1"
              placeholder="5.2"
              value={formData.crownRumpLength}
              onChange={(e) => setFormData({...formData, crownRumpLength: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="biparietal">Biparietal Diameter (cm)</Label>
            <Input
              id="biparietal"
              type="number"
              step="0.1"
              placeholder="3.1"
              value={formData.biparietal}
              onChange={(e) => setFormData({...formData, biparietal: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="heartRate">Fetal Heart Rate (bpm)</Label>
            <Input
              id="heartRate"
              type="number"
              placeholder="120"
              value={formData.heartRate}
              onChange={(e) => setFormData({...formData, heartRate: e.target.value})}
            />
          </div>
        </div>
      </div>

      {/* Findings */}
      <div className="space-y-2">
        <Label htmlFor="findings">Findings *</Label>
        <Textarea
          id="findings"
          placeholder="Enter ultrasound findings..."
          value={formData.findings}
          onChange={(e) => setFormData({...formData, findings: e.target.value})}
          rows={3}
        />
      </div>

      {/* Image Upload */}
      <div className="space-y-2">
        <Label>Ultrasound Images</Label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">
            Click to upload ultrasound images or drag and drop
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            PNG, JPG, GIF up to 10MB
          </p>
        </div>
      </div>

      {/* Next Ultrasound Date */}
      <div className="space-y-2">
        <Label>Next Ultrasound Date</Label>
        <DatePicker
          date={formData.nextUltrasoundDate}
          onDateChange={(date) => setFormData({...formData, nextUltrasoundDate: date})}
          placeholder="Select next ultrasound date"
        />
      </div>

      {/* Additional Notes */}
      <div className="space-y-2">
        <Label htmlFor="notes">Additional Notes</Label>
        <Textarea
          id="notes"
          placeholder="Enter any additional notes..."
          value={formData.notes}
          onChange={(e) => setFormData({...formData, notes: e.target.value})}
          rows={2}
        />
      </div>
    </BaseRecordDialog>
  );
};

export default UltrasoundDialog;
