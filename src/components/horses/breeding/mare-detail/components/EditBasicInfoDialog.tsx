
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Save, X } from "lucide-react";
import IdentificationSection from "./form-sections/IdentificationSection";
import PhysicalCharacteristicsSection from "./form-sections/PhysicalCharacteristicsSection";
import PedigreeSection from "./form-sections/PedigreeSection";
import OwnershipLocationSection from "./form-sections/OwnershipLocationSection";

interface EditBasicInfoDialogProps {
  isOpen: boolean;
  onClose: () => void;
  mareId: string;
}

const EditBasicInfoDialog = ({ isOpen, onClose, mareId }: EditBasicInfoDialogProps) => {
  // Mock initial data - in real app this would come from API
  const [formData, setFormData] = useState({
    registrationNumber: "ARA-2018-0047",
    microchipId: "985112345678901",
    passportNumber: "UAE-2018-0047",
    birthDate: "2018-03-15",
    color: "Bay",
    height: "15.2",
    weight: "450",
    sire: "Golden Thunder",
    dam: "Silver Moon",
    bloodlineOrigin: "Egyptian Arabian",
    owner: "Al Mansouri Stables",
    location: "Stable Block A, Stall 12",
    insuranceValue: "50000",
    acquisitionDate: "2020-06-01",
    acquisitionPrice: "35000"
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // In real app, this would make an API call to update the mare's information
    console.log("Saving mare basic info:", formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold">Edit Basic Information</DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          <IdentificationSection 
            formData={formData} 
            onInputChange={handleInputChange} 
          />
          
          <PhysicalCharacteristicsSection 
            formData={formData} 
            onInputChange={handleInputChange} 
          />
          
          <PedigreeSection 
            formData={formData} 
            onInputChange={handleInputChange} 
          />
          
          <OwnershipLocationSection 
            formData={formData} 
            onInputChange={handleInputChange} 
          />

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="bg-blue-500 hover:bg-blue-600 text-white">
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditBasicInfoDialog;
