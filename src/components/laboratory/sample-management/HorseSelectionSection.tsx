
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AddHorseSection from "./AddHorseSection";

interface HorseSelectionSectionProps {
  selectedHorse: string;
  onHorseSelect: (value: string) => void;
}

const HorseSelectionSection = ({ selectedHorse, onHorseSelect }: HorseSelectionSectionProps) => {
  const [showAddHorse, setShowAddHorse] = useState(false);

  console.log("HorseSelectionSection rendered with selectedHorse:", selectedHorse);

  const horseOptions = [
    { value: "thunder", label: "Thunder" },
    { value: "bella", label: "Bella" },
    { value: "shadow", label: "Shadow" },
    { value: "storm", label: "Storm" },
    { value: "flash", label: "Flash" },
  ];

  const handleAddNew = () => {
    console.log("Add new horse triggered in HorseSelectionSection");
    setShowAddHorse(true);
  };

  const handleHorseSelect = (value: string) => {
    console.log("Horse selected in HorseSelectionSection:", value);
    if (value === "__add_new__") {
      handleAddNew();
    } else {
      onHorseSelect(value);
    }
  };

  const handleCancel = () => {
    console.log("Cancel add horse");
    setShowAddHorse(false);
  };

  const handleSaveHorse = () => {
    console.log("Horse saved, closing add form");
    setShowAddHorse(false);
    // In a real app, this would save the horse and update the selection
    // For now, we'll just close the form
  };

  return (
    <div className="space-y-2">
      <Label>Horse *</Label>
      {!showAddHorse ? (
        <Select value={selectedHorse} onValueChange={handleHorseSelect}>
          <SelectTrigger>
            <SelectValue placeholder="Select horse" />
          </SelectTrigger>
          <SelectContent className="bg-white z-[150]">
            {horseOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
            <SelectItem value="__add_new__" className="border-t mt-1 pt-2 bg-blue-50 hover:bg-blue-100">
              <div className="flex items-center gap-2 font-medium text-blue-600">
                <span>+ Add New Horse</span>
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
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </div>
          <AddHorseSection />
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleSaveHorse}>
              Save Horse
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HorseSelectionSection;
