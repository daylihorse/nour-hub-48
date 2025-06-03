
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
    console.log("Saving parent horse:", { parentType, isRegistered, formData });
    
    // In a real app, this would save to the backend
    // For now, we'll just set the form field with the name
    if (formData.name) {
      form.setValue(parentType, formData.name);
      console.log(`Set ${parentType} field to:`, formData.name);
    }
    
    // Reset form and close
    handleCancel();
  };

  const handleCancel = () => {
    setIsRegistered("");
    setFormData({ name: "", chipNumber: "", countryOfOrigin: "", birthDate: "" });
    onClose();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isFormValid = () => {
    if (!isRegistered) return false;
    if (!formData.name) return false;
    if (isRegistered === "no" && !formData.chipNumber) return false;
    return true;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-white">
        <DialogHeader>
          <DialogTitle>Add New {fieldLabel}</DialogTitle>
          <DialogDescription className="text-sm text-gray-600 leading-relaxed">
            This horse will be added as a parent for the current horse being registered. 
            You can add them to the horse database and then select them from the dropdown. 
            This parent information will be available for future horse registrations.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Registration Status Question */}
          <div className="space-y-3">
            <Label className="text-base font-medium">
              Is the {parentLabel}'s data registered on the Dayli horse platform?
            </Label>
            <RadioGroup value={isRegistered} onValueChange={setIsRegistered}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="yes" />
                <Label htmlFor="yes">Yes, already registered</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="no" />
                <Label htmlFor="no">No, not registered yet</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Conditional Form Fields */}
          {isRegistered && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">{fieldLabel}'s Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder={`Enter ${parentLabel}'s name`}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="chipNumber">
                  {fieldLabel}'s Chip Number {isRegistered === "no" ? "*" : ""}
                </Label>
                <Input
                  id="chipNumber"
                  type="number"
                  value={formData.chipNumber}
                  onChange={(e) => handleInputChange("chipNumber", e.target.value)}
                  placeholder={`Enter ${parentLabel}'s chip number`}
                  required={isRegistered === "no"}
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
                  disabled={!isFormValid()}
                >
                  Save {fieldLabel}
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
