
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import SearchableSelect from "./SearchableSelect";
import AddHorseSection from "./AddHorseSection";

interface HorseSelectionSectionProps {
  selectedHorse: string;
  onHorseSelect: (value: string) => void;
}

const HorseSelectionSection = ({ selectedHorse, onHorseSelect }: HorseSelectionSectionProps) => {
  const [showAddHorse, setShowAddHorse] = useState(false);

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
    onHorseSelect(value);
  };

  const handleCancel = () => {
    console.log("Cancel add horse");
    setShowAddHorse(false);
  };

  const handleSaveHorse = () => {
    console.log("Horse saved, closing add form");
    setShowAddHorse(false);
    // In a real app, this would save the horse and update the selection
  };

  return (
    <div className="space-y-2">
      <Label>Horse *</Label>
      {!showAddHorse ? (
        <SearchableSelect
          options={horseOptions}
          value={selectedHorse}
          placeholder="Select horse"
          onValueChange={handleHorseSelect}
          onAddNew={handleAddNew}
          addNewLabel="Add New Horse"
        />
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
