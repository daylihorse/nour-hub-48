
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Plus, Clock } from "lucide-react";

interface ScheduleAppointmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mareId?: string | null;
  mareName?: string;
}

const ScheduleAppointmentDialog = ({ open, onOpenChange, mareId, mareName }: ScheduleAppointmentDialogProps) => {
  const [formData, setFormData] = useState({
    date: undefined as Date | undefined,
    time: "",
    type: "",
    duration: "",
    provider: "",
    location: "",
    notes: "",
    reminderBefore: "24",
  });
  const [showAddProvider, setShowAddProvider] = useState(false);
  const [newProviderName, setNewProviderName] = useState("");

  const appointmentTypes = [
    { value: "veterinary", label: "Veterinary Checkup" },
    { value: "ultrasound", label: "Ultrasound" },
    { value: "vaccination", label: "Vaccination" },
    { value: "dental", label: "Dental Care" },
    { value: "farrier", label: "Farrier Service" },
    { value: "breeding", label: "Breeding Examination" },
    { value: "training", label: "Training Session" },
    { value: "grooming", label: "Grooming" },
  ];

  const timeSlots = [
    "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
    "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
    "17:00", "17:30", "18:00"
  ];

  const durations = [
    { value: "30", label: "30 minutes" },
    { value: "60", label: "1 hour" },
    { value: "90", label: "1.5 hours" },
    { value: "120", label: "2 hours" },
    { value: "180", label: "3 hours" },
  ];

  const providers = [
    "Dr. Smith (Veterinarian)",
    "Dr. Johnson (Veterinarian)",
    "Mike Brown (Farrier)",
    "Sarah Davis (Trainer)",
    "Tom Wilson (Groomer)",
  ];

  const reminderOptions = [
    { value: "15", label: "15 minutes before" },
    { value: "60", label: "1 hour before" },
    { value: "24", label: "24 hours before" },
    { value: "48", label: "48 hours before" },
    { value: "168", label: "1 week before" },
  ];

  const handleAddProvider = () => {
    if (newProviderName.trim()) {
      setFormData({...formData, provider: newProviderName.trim()});
      setNewProviderName("");
      setShowAddProvider(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Appointment data:", { mareId, mareName, ...formData });
    onOpenChange(false);
    // Reset form
    setFormData({
      date: undefined,
      time: "",
      type: "",
      duration: "",
      provider: "",
      location: "",
      notes: "",
      reminderBefore: "24",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Schedule Appointment
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {mareId && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Horse Information</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Mare: {mareName || `ID: ${mareId}`}
                </p>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Appointment Date */}
            <div className="space-y-2">
              <Label>Appointment Date *</Label>
              <DatePicker
                date={formData.date}
                onDateChange={(date) => setFormData({...formData, date})}
                placeholder="Select appointment date"
                disabled={(date) => date < new Date()}
              />
            </div>

            {/* Appointment Time */}
            <div className="space-y-2">
              <Label htmlFor="time">Time *</Label>
              <Select 
                value={formData.time} 
                onValueChange={(value) => setFormData({...formData, time: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent className="bg-white z-50 max-h-48 overflow-y-auto">
                  {timeSlots.map((time) => (
                    <SelectItem key={time} value={time}>
                      <div className="flex items-center gap-2">
                        <Clock className="h-3 w-3" />
                        {time}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Appointment Type */}
            <div className="space-y-2">
              <Label htmlFor="type">Appointment Type *</Label>
              <Select 
                value={formData.type} 
                onValueChange={(value) => setFormData({...formData, type: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select appointment type" />
                </SelectTrigger>
                <SelectContent className="bg-white z-50">
                  {appointmentTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Duration */}
            <div className="space-y-2">
              <Label htmlFor="duration">Duration *</Label>
              <Select 
                value={formData.duration} 
                onValueChange={(value) => setFormData({...formData, duration: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent className="bg-white z-50">
                  {durations.map((duration) => (
                    <SelectItem key={duration.value} value={duration.value}>
                      {duration.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Service Provider */}
          <div className="space-y-2">
            <Label htmlFor="provider">Service Provider *</Label>
            {!showAddProvider ? (
              <Select 
                value={formData.provider} 
                onValueChange={(value) => {
                  if (value === "__add_new__") {
                    setShowAddProvider(true);
                  } else {
                    setFormData({...formData, provider: value});
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select service provider" />
                </SelectTrigger>
                <SelectContent className="bg-white z-50">
                  {providers.map((provider) => (
                    <SelectItem key={provider} value={provider}>
                      {provider}
                    </SelectItem>
                  ))}
                  <SelectItem value="__add_new__" className="border-t mt-1 pt-2">
                    <div className="flex items-center gap-2 font-medium text-primary">
                      <Plus className="h-4 w-4" />
                      <span>Add New Provider</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <div className="flex gap-2">
                <Input
                  placeholder="Enter provider name"
                  value={newProviderName}
                  onChange={(e) => setNewProviderName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddProvider()}
                />
                <Button type="button" onClick={handleAddProvider}>Add</Button>
                <Button type="button" variant="outline" onClick={() => setShowAddProvider(false)}>Cancel</Button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="Enter location"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
              />
            </div>

            {/* Reminder */}
            <div className="space-y-2">
              <Label htmlFor="reminderBefore">Reminder</Label>
              <Select 
                value={formData.reminderBefore} 
                onValueChange={(value) => setFormData({...formData, reminderBefore: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white z-50">
                  {reminderOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              placeholder="Enter any additional notes..."
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              rows={3}
              className="resize-none"
            />
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button 
              type="submit"
              disabled={!formData.date || !formData.time || !formData.type || !formData.duration || !formData.provider}
            >
              Schedule Appointment
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleAppointmentDialog;
