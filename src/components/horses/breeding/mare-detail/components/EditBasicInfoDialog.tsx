
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Save, X } from "lucide-react";

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
          {/* Identification Section */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-4">Identification</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="registrationNumber">Registration Number</Label>
                  <Input
                    id="registrationNumber"
                    value={formData.registrationNumber}
                    onChange={(e) => handleInputChange('registrationNumber', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="microchipId">Microchip ID</Label>
                  <Input
                    id="microchipId"
                    value={formData.microchipId}
                    onChange={(e) => handleInputChange('microchipId', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="passportNumber">Passport Number</Label>
                  <Input
                    id="passportNumber"
                    value={formData.passportNumber}
                    onChange={(e) => handleInputChange('passportNumber', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Physical Characteristics Section */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-4">Physical Characteristics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="birthDate">Birth Date</Label>
                  <Input
                    id="birthDate"
                    type="date"
                    value={formData.birthDate}
                    onChange={(e) => handleInputChange('birthDate', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="color">Color</Label>
                  <Select value={formData.color} onValueChange={(value) => handleInputChange('color', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Bay">Bay</SelectItem>
                      <SelectItem value="Chestnut">Chestnut</SelectItem>
                      <SelectItem value="Black">Black</SelectItem>
                      <SelectItem value="Grey">Grey</SelectItem>
                      <SelectItem value="Brown">Brown</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height">Height (hands)</Label>
                  <Input
                    id="height"
                    value={formData.height}
                    onChange={(e) => handleInputChange('height', e.target.value)}
                    placeholder="15.2"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    value={formData.weight}
                    onChange={(e) => handleInputChange('weight', e.target.value)}
                    placeholder="450"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pedigree Section */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-4">Pedigree Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sire">Sire</Label>
                  <Input
                    id="sire"
                    value={formData.sire}
                    onChange={(e) => handleInputChange('sire', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dam">Dam</Label>
                  <Input
                    id="dam"
                    value={formData.dam}
                    onChange={(e) => handleInputChange('dam', e.target.value)}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="bloodlineOrigin">Bloodline Origin</Label>
                  <Input
                    id="bloodlineOrigin"
                    value={formData.bloodlineOrigin}
                    onChange={(e) => handleInputChange('bloodlineOrigin', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ownership & Location Section */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-4">Ownership & Location</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="owner">Owner</Label>
                  <Input
                    id="owner"
                    value={formData.owner}
                    onChange={(e) => handleInputChange('owner', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Current Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="insuranceValue">Insurance Value ($)</Label>
                  <Input
                    id="insuranceValue"
                    value={formData.insuranceValue}
                    onChange={(e) => handleInputChange('insuranceValue', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="acquisitionDate">Acquisition Date</Label>
                  <Input
                    id="acquisitionDate"
                    type="date"
                    value={formData.acquisitionDate}
                    onChange={(e) => handleInputChange('acquisitionDate', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="acquisitionPrice">Acquisition Price ($)</Label>
                  <Input
                    id="acquisitionPrice"
                    value={formData.acquisitionPrice}
                    onChange={(e) => handleInputChange('acquisitionPrice', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

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
