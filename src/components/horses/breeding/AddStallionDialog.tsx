
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
import { Checkbox } from "@/components/ui/checkbox";
import { Crown, Plus, AlertTriangle } from "lucide-react";
import BaseRecordDialog from "./records/BaseRecordDialog";
import { useRecords } from "./records/RecordsProvider";
import { StallionRecord } from "@/types/breeding/unified-records";
import { generateRecordId } from "./records/utils/recordUtils";

interface AddStallionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  stallionId?: string | null;
  stallionName?: string;
}

const AddStallionDialog = ({ 
  open, 
  onOpenChange, 
  stallionId = "default-horse-id", 
  stallionName = "Stallion"
}: AddStallionDialogProps) => {
  const { addRecord } = useRecords();
  
  const [formData, setFormData] = useState({
    stallionName: "",
    breed: "",
    age: "",
    registrationNumber: "",
    studFee: "",
    availabilityStatus: "",
    lastServiceDate: undefined as Date | undefined,
    nextAvailableDate: undefined as Date | undefined,
    temperament: "",
    healthStatus: "",
    notes: "",
    geneticTesting: "",
    requiresSpecialHandling: false,
    isActiveStud: false,
  });
  const [showAddBreed, setShowAddBreed] = useState(false);
  const [newBreedName, setNewBreedName] = useState("");

  const breeds = [
    "Arabian",
    "Thoroughbred",
    "Quarter Horse",
    "Paint Horse",
    "Appaloosa",
    "Friesian",
    "Clydesdale",
    "Percheron",
  ];

  const availabilityStatuses = [
    { value: "available", label: "Available" },
    { value: "booked", label: "Booked" },
    { value: "resting", label: "Resting" },
    { value: "unavailable", label: "Unavailable" },
    { value: "retired", label: "Retired" },
  ];

  const temperaments = [
    { value: "calm", label: "Calm" },
    { value: "spirited", label: "Spirited" },
    { value: "gentle", label: "Gentle" },
    { value: "aggressive", label: "Aggressive" },
    { value: "docile", label: "Docile" },
    { value: "energetic", label: "Energetic" },
  ];

  const healthStatuses = [
    { value: "excellent", label: "Excellent" },
    { value: "good", label: "Good" },
    { value: "fair", label: "Fair" },
    { value: "poor", label: "Poor" },
    { value: "under_treatment", label: "Under Treatment" },
  ];

  const handleAddBreed = () => {
    if (newBreedName.trim()) {
      setFormData({...formData, breed: newBreedName.trim()});
      setNewBreedName("");
      setShowAddBreed(false);
    }
  };

  const handleSubmit = () => {
    if (!formData.stallionName || !formData.breed || !formData.age || !formData.availabilityStatus || !formData.healthStatus) {
      return;
    }

    const newRecord: StallionRecord = {
      id: generateRecordId('stallion'),
      type: 'stallion',
      title: `${formData.stallionName} - ${formData.breed}`,
      description: formData.notes || undefined,
      status: 'active',
      priority: formData.requiresSpecialHandling ? 'high' : 'medium',
      horseId: stallionId || "default-horse-id",
      horseName: stallionName || "Stallion",
      createdAt: new Date(),
      updatedAt: new Date(),
      scheduledDate: formData.nextAvailableDate,
      dueDate: formData.nextAvailableDate || undefined,
      createdBy: "current-user",
      stallionName: formData.stallionName,
      breed: formData.breed,
      age: parseInt(formData.age),
      registrationNumber: formData.registrationNumber || undefined,
      studFee: formData.studFee ? parseFloat(formData.studFee) : undefined,
      availabilityStatus: formData.availabilityStatus,
      lastServiceDate: formData.lastServiceDate || undefined,
      nextAvailableDate: formData.nextAvailableDate || undefined,
      temperament: formData.temperament || undefined,
      healthStatus: formData.healthStatus,
      notes: formData.notes || undefined,
      geneticTesting: formData.geneticTesting || undefined,
      requiresSpecialHandling: formData.requiresSpecialHandling,
      isActiveStud: formData.isActiveStud,
    };

    addRecord(newRecord);
    onOpenChange(false);
    
    // Reset form
    setFormData({
      stallionName: "",
      breed: "",
      age: "",
      registrationNumber: "",
      studFee: "",
      availabilityStatus: "",
      lastServiceDate: undefined,
      nextAvailableDate: undefined,
      temperament: "",
      healthStatus: "",
      notes: "",
      geneticTesting: "",
      requiresSpecialHandling: false,
      isActiveStud: false,
    });
  };

  const isFormValid = formData.stallionName && formData.breed && formData.age && formData.availabilityStatus && formData.healthStatus;

  return (
    <BaseRecordDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Add Stallion"
      icon={<Crown className="h-5 w-5" />}
      horseId={stallionId}
      horseName={stallionName}
      onSubmit={handleSubmit}
      submitLabel="Add Stallion"
      isSubmitDisabled={!isFormValid}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Stallion Name */}
        <div className="space-y-2">
          <Label htmlFor="stallionName">Stallion Name *</Label>
          <Input
            id="stallionName"
            placeholder="Enter stallion name"
            value={formData.stallionName}
            onChange={(e) => setFormData({...formData, stallionName: e.target.value})}
          />
        </div>

        {/* Breed */}
        <div className="space-y-2">
          <Label htmlFor="breed">Breed *</Label>
          {!showAddBreed ? (
            <Select 
              value={formData.breed} 
              onValueChange={(value) => {
                if (value === "__add_new__") {
                  setShowAddBreed(true);
                } else {
                  setFormData({...formData, breed: value});
                }
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select breed" />
              </SelectTrigger>
              <SelectContent className="bg-white z-50">
                {breeds.map((breed) => (
                  <SelectItem key={breed} value={breed}>
                    {breed}
                  </SelectItem>
                ))}
                <SelectItem value="__add_new__" className="border-t mt-1 pt-2">
                  <div className="flex items-center gap-2 font-medium text-primary">
                    <Plus className="h-4 w-4" />
                    <span>Add New Breed</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          ) : (
            <div className="flex gap-2">
              <Input
                placeholder="Enter breed name"
                value={newBreedName}
                onChange={(e) => setNewBreedName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddBreed()}
              />
              <button type="button" onClick={handleAddBreed} className="px-3 py-2 bg-primary text-white rounded">Add</button>
              <button type="button" onClick={() => setShowAddBreed(false)} className="px-3 py-2 border rounded">Cancel</button>
            </div>
          )}
        </div>

        {/* Age */}
        <div className="space-y-2">
          <Label htmlFor="age">Age *</Label>
          <Input
            id="age"
            type="number"
            placeholder="Enter age in years"
            value={formData.age}
            onChange={(e) => setFormData({...formData, age: e.target.value})}
          />
        </div>

        {/* Registration Number */}
        <div className="space-y-2">
          <Label htmlFor="registrationNumber">Registration Number</Label>
          <Input
            id="registrationNumber"
            placeholder="Enter registration number"
            value={formData.registrationNumber}
            onChange={(e) => setFormData({...formData, registrationNumber: e.target.value})}
          />
        </div>

        {/* Stud Fee */}
        <div className="space-y-2">
          <Label htmlFor="studFee">Stud Fee</Label>
          <Input
            id="studFee"
            type="number"
            placeholder="Enter stud fee amount"
            value={formData.studFee}
            onChange={(e) => setFormData({...formData, studFee: e.target.value})}
          />
        </div>

        {/* Availability Status */}
        <div className="space-y-2">
          <Label htmlFor="availabilityStatus">Availability Status *</Label>
          <Select 
            value={formData.availabilityStatus} 
            onValueChange={(value) => setFormData({...formData, availabilityStatus: value})}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select availability status" />
            </SelectTrigger>
            <SelectContent className="bg-white z-50">
              {availabilityStatuses.map((status) => (
                <SelectItem key={status.value} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Last Service Date */}
        <div className="space-y-2">
          <Label>Last Service Date</Label>
          <DatePicker
            date={formData.lastServiceDate}
            onDateChange={(date) => setFormData({...formData, lastServiceDate: date})}
            placeholder="Select last service date"
          />
        </div>

        {/* Next Available Date */}
        <div className="space-y-2">
          <Label>Next Available Date</Label>
          <DatePicker
            date={formData.nextAvailableDate}
            onDateChange={(date) => setFormData({...formData, nextAvailableDate: date})}
            placeholder="Select next available date"
            disabled={(date) => formData.lastServiceDate ? date <= formData.lastServiceDate : false}
          />
        </div>
      </div>

      {/* Temperament */}
      <div className="space-y-2">
        <Label htmlFor="temperament">Temperament</Label>
        <Select 
          value={formData.temperament} 
          onValueChange={(value) => setFormData({...formData, temperament: value})}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select temperament" />
          </SelectTrigger>
          <SelectContent className="bg-white z-50">
            {temperaments.map((temperament) => (
              <SelectItem key={temperament.value} value={temperament.value}>
                {temperament.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Health Status */}
      <div className="space-y-2">
        <Label htmlFor="healthStatus">Health Status *</Label>
        <Select 
          value={formData.healthStatus} 
          onValueChange={(value) => setFormData({...formData, healthStatus: value})}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select health status" />
          </SelectTrigger>
          <SelectContent className="bg-white z-50">
            {healthStatuses.map((status) => (
              <SelectItem key={status.value} value={status.value}>
                {status.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Notes */}
      <div className="space-y-2">
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          placeholder="Enter additional notes about the stallion..."
          value={formData.notes}
          onChange={(e) => setFormData({...formData, notes: e.target.value})}
          rows={3}
          className="resize-none"
        />
      </div>

      {/* Genetic Testing */}
      <div className="space-y-2">
        <Label htmlFor="geneticTesting">Genetic Testing</Label>
        <Textarea
          id="geneticTesting"
          placeholder="Enter genetic testing information..."
          value={formData.geneticTesting}
          onChange={(e) => setFormData({...formData, geneticTesting: e.target.value})}
          rows={3}
          className="resize-none"
        />
      </div>

      {/* Checkboxes */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="requiresSpecialHandling"
            checked={formData.requiresSpecialHandling}
            onCheckedChange={(checked) => setFormData({...formData, requiresSpecialHandling: checked as boolean})}
          />
          <Label htmlFor="requiresSpecialHandling" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Requires special handling
          </Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="isActiveStud"
            checked={formData.isActiveStud}
            onCheckedChange={(checked) => setFormData({...formData, isActiveStud: checked as boolean})}
          />
          <Label htmlFor="isActiveStud" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-orange-500" />
            Active stud
          </Label>
        </div>
      </div>
    </BaseRecordDialog>
  );
};

export default AddStallionDialog;
