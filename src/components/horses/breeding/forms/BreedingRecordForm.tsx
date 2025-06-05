
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Save, X } from "lucide-react";
import { format } from "date-fns";
import { BreedingRecord } from "@/types/breeding";

interface BreedingRecordFormProps {
  record?: Partial<BreedingRecord>;
  onSave: (record: Partial<BreedingRecord>) => void;
  onCancel: () => void;
  mode: "create" | "edit";
}

const BreedingRecordForm = ({ record, onSave, onCancel, mode }: BreedingRecordFormProps) => {
  const [formData, setFormData] = useState<Partial<BreedingRecord>>(record || {
    type: "breeding",
    status: "planned",
    breedingMethod: "natural",
  });
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    record?.breedingDate || record?.pregnancyStartDate || record?.birthDate
  );

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleDateChange = (date: Date | undefined) => {
    setSelectedDate(date);
    if (formData.type === "breeding") {
      handleInputChange("breedingDate", date);
    } else if (formData.type === "pregnancy") {
      handleInputChange("pregnancyStartDate", date);
    } else if (formData.type === "birth") {
      handleInputChange("birthDate", date);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      createdAt: record?.createdAt || new Date(),
      updatedAt: new Date(),
    });
  };

  const getDateLabel = () => {
    switch (formData.type) {
      case "breeding": return "Breeding Date";
      case "pregnancy": return "Pregnancy Start Date";
      case "birth": return "Birth Date";
      default: return "Date";
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {mode === "create" ? "Create" : "Edit"} Breeding Record
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="horseName">Horse Name</Label>
              <Input
                id="horseName"
                value={formData.horseName || ""}
                onChange={(e) => handleInputChange("horseName", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Record Type</Label>
              <Select 
                value={formData.type} 
                onValueChange={(value) => handleInputChange("type", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="breeding">Breeding</SelectItem>
                  <SelectItem value="pregnancy">Pregnancy</SelectItem>
                  <SelectItem value="birth">Birth</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select 
                value={formData.status} 
                onValueChange={(value) => handleInputChange("status", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="planned">Planned</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>{getDateLabel()}</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={handleDateChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Breeding-specific fields */}
          {formData.type === "breeding" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="mateName">Mate Name</Label>
                <Input
                  id="mateName"
                  value={formData.mateName || ""}
                  onChange={(e) => handleInputChange("mateName", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="breedingMethod">Breeding Method</Label>
                <Select 
                  value={formData.breedingMethod} 
                  onValueChange={(value) => handleInputChange("breedingMethod", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="natural">Natural</SelectItem>
                    <SelectItem value="artificial_insemination">Artificial Insemination</SelectItem>
                    <SelectItem value="embryo_transfer">Embryo Transfer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Pregnancy-specific fields */}
          {formData.type === "pregnancy" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="pregnancyDuration">Pregnancy Duration (days)</Label>
                <Input
                  id="pregnancyDuration"
                  type="number"
                  value={formData.pregnancyDuration || ""}
                  onChange={(e) => handleInputChange("pregnancyDuration", parseInt(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label>Expected Due Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.expectedDueDate ? format(formData.expectedDueDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.expectedDueDate}
                      onSelect={(date) => handleInputChange("expectedDueDate", date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          )}

          {/* Birth-specific fields */}
          {formData.type === "birth" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="foalName">Foal Name</Label>
                <Input
                  id="foalName"
                  value={formData.foalName || ""}
                  onChange={(e) => handleInputChange("foalName", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="foalGender">Foal Gender</Label>
                <Select 
                  value={formData.foalGender} 
                  onValueChange={(value) => handleInputChange("foalGender", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="birthWeight">Birth Weight (kg)</Label>
                <Input
                  id="birthWeight"
                  type="number"
                  value={formData.birthWeight || ""}
                  onChange={(e) => handleInputChange("birthWeight", parseFloat(e.target.value))}
                />
              </div>
            </div>
          )}

          {/* Common fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="veterinarian">Veterinarian</Label>
              <Input
                id="veterinarian"
                value={formData.veterinarian || ""}
                onChange={(e) => handleInputChange("veterinarian", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cost">Cost ($)</Label>
              <Input
                id="cost"
                type="number"
                value={formData.cost || ""}
                onChange={(e) => handleInputChange("cost", parseFloat(e.target.value))}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes || ""}
              onChange={(e) => handleInputChange("notes", e.target.value)}
              rows={3}
            />
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button type="submit">
              <Save className="h-4 w-4 mr-2" />
              {mode === "create" ? "Create" : "Update"} Record
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default BreedingRecordForm;
