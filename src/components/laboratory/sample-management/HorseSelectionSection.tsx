
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import AddHorseSection from "./AddHorseSection";

interface HorseSelectionSectionProps {
  selectedHorse: string;
  onHorseSelect: (value: string) => void;
}

const HorseSelectionSection = ({ selectedHorse, onHorseSelect }: HorseSelectionSectionProps) => {
  const [showAddHorse, setShowAddHorse] = useState(false);

  const handleHorseSelect = (value: string) => {
    if (value === "__add_new__") {
      setShowAddHorse(true);
    } else {
      onHorseSelect(value);
      setShowAddHorse(false);
    }
  };

  return (
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
  );
};

export default HorseSelectionSection;
