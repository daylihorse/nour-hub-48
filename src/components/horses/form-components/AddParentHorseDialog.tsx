
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { HorseFormData } from "@/types/horse";

interface AddParentHorseDialogProps {
  isOpen: boolean;
  onClose: () => void;
  parentType: "sire" | "dam";
}

const AddParentHorseDialog = ({ isOpen, onClose, parentType }: AddParentHorseDialogProps) => {
  const form = useFormContext<HorseFormData>();
  const [isRegistered, setIsRegistered] = useState<string>("");
  const [formData, setFormData] = useState({
    name: "",
    chipNumber: "",
    countryOfOrigin: "",
    birthDate: "",
  });

  const parentLabel = parentType === "sire" ? "father" : "mother";
  const fieldLabel = parentType === "sire" ? "Father" : "Mother";

  const handleSave = () => {
    // In a real app, this would save to the backend or parent list
    // For now, we'll just set the form field with the name
    if (formData.name) {
      form.setValue(parentType, formData.name);
    }
    
    // Reset form and close
    setIsRegistered("");
    setFormData({ name: "", chipNumber: "", countryOfOrigin: "", birthDate: "" });
    onClose();
  };

  const handleCancel = () => {
    setIsRegistered("");
    setFormData({ name: "", chipNumber: "", countryOfOrigin: "", birthDate: "" });
    onClose();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-white">
        <DialogHeader>
          <DialogTitle>Add New {fieldLabel}</DialogTitle>
          <DialogDescription className="text-sm text-gray-600 leading-relaxed">
            This horse is a parent for a horse that can be used in the lineage of the added horse. 
            Add the horse in the horse lists and then select it from here. You can see it on this 
            horse in many existing horses.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-3">
            <Label className="text-base font-medium">
              Is the {parentLabel}'s data registered on the Dayli horse platform?
            </Label>
            <RadioGroup value={isRegistered} onValueChange={setIsRegistered}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="yes" />
                <Label htmlFor="yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="no" />
                <Label htmlFor="no">No</Label>
              </div>
            </RadioGroup>
          </div>

          {isRegistered && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">{fieldLabel}'s Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder={`Enter ${parentLabel}'s name`}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="chipNumber">{fieldLabel}'s Chip Number</Label>
                <Input
                  id="chipNumber"
                  type="number"
                  value={formData.chipNumber}
                  onChange={(e) => handleInputChange("chipNumber", e.target.value)}
                  placeholder={`Enter ${parentLabel}'s chip number`}
                />
              </div>

              {isRegistered === "no" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="countryOfOrigin">Country of Origin</Label>
                    <Input
                      id="countryOfOrigin"
                      value={formData.countryOfOrigin}
                      onChange={(e) => handleInputChange("countryOfOrigin", e.target.value)}
                      placeholder="Enter country of origin"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="birthDate">Date of Birth</Label>
                    <Input
                      id="birthDate"
                      type="date"
                      value={formData.birthDate}
                      onChange={(e) => handleInputChange("birthDate", e.target.value)}
                    />
                  </div>
                </>
              )}

              <div className="flex justify-end space-x-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  onClick={handleSave}
                  className="bg-orange-500 hover:bg-orange-600 text-white"
                  disabled={!formData.name && !formData.chipNumber}
                >
                  Save
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddParentHorseDialog;
