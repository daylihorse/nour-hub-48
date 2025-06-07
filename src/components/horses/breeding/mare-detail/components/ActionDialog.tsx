
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar, Heart, Activity, Baby } from "lucide-react";

interface ActionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  actionType: 'checkup' | 'breeding' | 'health' | 'birth' | null;
  title: string;
}

const ActionDialog = ({ isOpen, onClose, actionType, title }: ActionDialogProps) => {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    veterinarian: '',
    notes: '',
    stallion: '',
    method: 'natural'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`${actionType} action submitted:`, formData);
    onClose();
  };

  const getIcon = () => {
    switch (actionType) {
      case 'checkup': return <Calendar className="h-5 w-5" />;
      case 'breeding': return <Heart className="h-5 w-5" />;
      case 'health': return <Activity className="h-5 w-5" />;
      case 'birth': return <Baby className="h-5 w-5" />;
      default: return <Calendar className="h-5 w-5" />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {getIcon()}
            {title}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="veterinarian">Veterinarian</Label>
            <Input
              id="veterinarian"
              value={formData.veterinarian}
              onChange={(e) => setFormData({ ...formData, veterinarian: e.target.value })}
              placeholder="Dr. Sarah Ahmed"
            />
          </div>

          {actionType === 'breeding' && (
            <div>
              <Label htmlFor="stallion">Stallion</Label>
              <Input
                id="stallion"
                value={formData.stallion}
                onChange={(e) => setFormData({ ...formData, stallion: e.target.value })}
                placeholder="Thunder Storm"
              />
            </div>
          )}

          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Additional notes..."
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Schedule {actionType}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ActionDialog;
