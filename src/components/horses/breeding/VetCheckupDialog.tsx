
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Stethoscope } from "lucide-react";

interface VetCheckupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pregnancyId: string | null;
}

const VetCheckupDialog = ({ open, onOpenChange, pregnancyId }: VetCheckupDialogProps) => {
  const [formData, setFormData] = useState({
    date: undefined as Date | undefined,
    type: "",
    findings: "",
    recommendations: "",
    nextCheckupDate: undefined as Date | undefined,
    veterinarian: "",
  });

  const checkupTypes = [
    { value: "routine", label: "Routine Checkup" },
    { value: "emergency", label: "Emergency" },
    { value: "ultrasound", label: "Ultrasound" },
    { value: "vaccination", label: "Vaccination" },
  ];

  const veterinarians = [
    "Dr. Smith",
    "Dr. Johnson",
    "Dr. Brown", 
    "Dr. Davis",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Checkup data:", { pregnancyId, ...formData });
    onOpenChange(false);
    // Reset form
    setFormData({
      date: undefined,
      type: "",
      findings: "",
      recommendations: "",
      nextCheckupDate: undefined,
      veterinarian: "",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Stethoscope className="h-5 w-5" />
            Schedule Veterinary Checkup
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
            {/* Checkup Date */}
            <div className="space-y-2">
              <Label>Checkup Date</Label>
              <DatePicker
                date={formData.date}
                onDateChange={(date) => setFormData({...formData, date})}
                placeholder="Select checkup date"
              />
            </div>

            {/* Checkup Type */}
            <div className="space-y-2">
              <Label htmlFor="type">Checkup Type</Label>
              <Select 
                value={formData.type} 
                onValueChange={(value) => setFormData({...formData, type: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select checkup type" />
                </SelectTrigger>
                <SelectContent>
                  {checkupTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
              placeholder="Enter checkup findings..."
              value={formData.findings}
              onChange={(e) => setFormData({...formData, findings: e.target.value})}
              rows={3}
            />
          </div>

          {/* Recommendations */}
          <div className="space-y-2">
            <Label htmlFor="recommendations">Recommendations</Label>
            <Textarea
              id="recommendations"
              placeholder="Enter recommendations..."
              value={formData.recommendations}
              onChange={(e) => setFormData({...formData, recommendations: e.target.value})}
              rows={2}
            />
          </div>

          {/* Next Checkup Date */}
          <div className="space-y-2">
            <Label>Next Checkup Date (Optional)</Label>
            <DatePicker
              date={formData.nextCheckupDate}
              onDateChange={(date) => setFormData({...formData, nextCheckupDate: date})}
              placeholder="Select next checkup date"
            />
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Schedule Checkup
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default VetCheckupDialog;
