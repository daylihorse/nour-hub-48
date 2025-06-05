
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, Baby, Weight } from "lucide-react";

interface AddBirthRecordDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AddBirthRecordDialog = ({ open, onOpenChange }: AddBirthRecordDialogProps) => {
  const [formData, setFormData] = useState({
    foalName: "",
    mareName: "",
    stallionName: "",
    birthDate: "",
    birthTime: "",
    gender: "",
    birthWeight: "",
    height: "",
    color: "",
    markings: "",
    complications: "",
    veterinarian: "",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Birth record data:", formData);
    onOpenChange(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Baby className="h-5 w-5" />
            Record New Birth
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardContent className="p-4 space-y-4">
              <h3 className="font-semibold text-lg">Basic Information</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="foalName">Foal Name</Label>
                  <Input
                    id="foalName"
                    value={formData.foalName}
                    onChange={(e) => handleInputChange("foalName", e.target.value)}
                    placeholder="Enter foal name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male (Colt)</SelectItem>
                      <SelectItem value="female">Female (Filly)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="mareName">Mare (Dam)</Label>
                  <Select value={formData.mareName} onValueChange={(value) => handleInputChange("mareName", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select mare" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Bella">Bella</SelectItem>
                      <SelectItem value="Luna">Luna</SelectItem>
                      <SelectItem value="Storm">Storm</SelectItem>
                      <SelectItem value="Whisper">Whisper</SelectItem>
                      <SelectItem value="Grace">Grace</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stallionName">Stallion (Sire)</Label>
                  <Select value={formData.stallionName} onValueChange={(value) => handleInputChange("stallionName", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select stallion" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Thunder">Thunder</SelectItem>
                      <SelectItem value="Lightning">Lightning</SelectItem>
                      <SelectItem value="Storm">Storm</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Birth Details */}
          <Card>
            <CardContent className="p-4 space-y-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Birth Details
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="birthDate">Birth Date</Label>
                  <Input
                    id="birthDate"
                    type="date"
                    value={formData.birthDate}
                    onChange={(e) => handleInputChange("birthDate", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="birthTime">Birth Time</Label>
                  <Input
                    id="birthTime"
                    type="time"
                    value={formData.birthTime}
                    onChange={(e) => handleInputChange("birthTime", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="birthWeight">Birth Weight (kg)</Label>
                  <Input
                    id="birthWeight"
                    type="number"
                    value={formData.birthWeight}
                    onChange={(e) => handleInputChange("birthWeight", e.target.value)}
                    placeholder="Enter weight in kg"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    value={formData.height}
                    onChange={(e) => handleInputChange("height", e.target.value)}
                    placeholder="Enter height in cm"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Physical Description */}
          <Card>
            <CardContent className="p-4 space-y-4">
              <h3 className="font-semibold text-lg">Physical Description</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="color">Color</Label>
                  <Select value={formData.color} onValueChange={(value) => handleInputChange("color", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select color" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bay">Bay</SelectItem>
                      <SelectItem value="chestnut">Chestnut</SelectItem>
                      <SelectItem value="black">Black</SelectItem>
                      <SelectItem value="gray">Gray</SelectItem>
                      <SelectItem value="brown">Brown</SelectItem>
                      <SelectItem value="palomino">Palomino</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="veterinarian">Attending Veterinarian</Label>
                  <Select value={formData.veterinarian} onValueChange={(value) => handleInputChange("veterinarian", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select veterinarian" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Dr. Smith">Dr. Smith</SelectItem>
                      <SelectItem value="Dr. Johnson">Dr. Johnson</SelectItem>
                      <SelectItem value="Dr. Williams">Dr. Williams</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="markings">Markings</Label>
                <Textarea
                  id="markings"
                  value={formData.markings}
                  onChange={(e) => handleInputChange("markings", e.target.value)}
                  placeholder="Describe any distinctive markings (e.g., white star, blaze, socks)"
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>

          {/* Medical Information */}
          <Card>
            <CardContent className="p-4 space-y-4">
              <h3 className="font-semibold text-lg">Medical Information</h3>
              
              <div className="space-y-2">
                <Label htmlFor="complications">Birth Complications</Label>
                <Textarea
                  id="complications"
                  value={formData.complications}
                  onChange={(e) => handleInputChange("complications", e.target.value)}
                  placeholder="Describe any complications during birth (or enter 'None')"
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  placeholder="Any additional observations or notes about the birth"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Form Actions */}
          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Record Birth
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddBirthRecordDialog;
