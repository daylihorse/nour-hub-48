
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, Upload } from "lucide-react";

interface UltrasoundDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pregnancyId: string | null;
}

const UltrasoundDialog = ({ open, onOpenChange, pregnancyId }: UltrasoundDialogProps) => {
  const [formData, setFormData] = useState({
    date: undefined as Date | undefined,
    gestationDay: "",
    findings: "",
    veterinarian: "",
    notes: "",
  });

  const veterinarians = [
    "Dr. Smith",
    "Dr. Johnson", 
    "Dr. Brown",
    "Dr. Davis",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Ultrasound data:", { pregnancyId, ...formData });
    onOpenChange(false);
    // Reset form
    setFormData({
      date: undefined,
      gestationDay: "",
      findings: "",
      veterinarian: "",
      notes: "",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Camera className="h-5 w-5" />
            Schedule Ultrasound
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {pregnancyId && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Pregnancy Information</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Pregnancy ID: {pregnancyId}
                </p>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Ultrasound Date */}
            <div className="space-y-2">
              <Label>Ultrasound Date</Label>
              <DatePicker
                date={formData.date}
                onDateChange={(date) => setFormData({...formData, date})}
                placeholder="Select ultrasound date"
              />
            </div>

            {/* Gestation Day */}
            <div className="space-y-2">
              <Label htmlFor="gestationDay">Gestation Day</Label>
              <Input
                id="gestationDay"
                type="number"
                placeholder="Enter gestation day"
                value={formData.gestationDay}
                onChange={(e) => setFormData({...formData, gestationDay: e.target.value})}
              />
            </div>

            {/* Veterinarian */}
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="veterinarian">Veterinarian</Label>
              <Select 
                value={formData.veterinarian} 
                onValueChange={(value) => setFormData({...formData, veterinarian: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select veterinarian" />
                </SelectTrigger>
                <SelectContent>
                  {veterinarians.map((vet) => (
                    <SelectItem key={vet} value={vet}>
                      {vet}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Findings */}
          <div className="space-y-2">
            <Label htmlFor="findings">Findings</Label>
            <Textarea
              id="findings"
              placeholder="Enter ultrasound findings..."
              value={formData.findings}
              onChange={(e) => setFormData({...formData, findings: e.target.value})}
              rows={3}
            />
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <Label>Ultrasound Images</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">
                Click to upload ultrasound images or drag and drop
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                PNG, JPG, GIF up to 10MB
              </p>
            </div>
          </div>

          {/* Additional Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              placeholder="Enter any additional notes..."
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              rows={2}
            />
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Schedule Ultrasound
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UltrasoundDialog;
