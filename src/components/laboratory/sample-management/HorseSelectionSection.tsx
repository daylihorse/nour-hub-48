
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
  ];

  const handleAddNew = () => {
    setShowAddHorse(true);
  };

  return (
    <div>
      <Label>Horse *</Label>
      {!showAddHorse ? (
        <SearchableSelect
          options={horseOptions}
          value={selectedHorse}
          placeholder="Select horse"
          onValueChange={onHorseSelect}
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
              onClick={() => setShowAddHorse(false)}
            >
              Cancel
            </Button>
          </div>
          <AddHorseSection />
        </div>
      )}
    </div>
  );
};

export default HorseSelectionSection;
