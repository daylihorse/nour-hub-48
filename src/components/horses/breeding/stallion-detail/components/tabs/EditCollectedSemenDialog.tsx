
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CollectedSemen } from "@/types/breeding/stallion-detail";

interface EditCollectedSemenDialogProps {
  isOpen: boolean;
  onClose: () => void;
  record: CollectedSemen | null;
  onSave: (record: CollectedSemen) => void;
}

const EditCollectedSemenDialog = ({
  isOpen,
  onClose,
  record,
  onSave
}: EditCollectedSemenDialogProps) => {
  const [formData, setFormData] = useState<Partial<CollectedSemen>>({});

  useEffect(() => {
    if (record) {
      setFormData(record);
    }
  }, [record]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData && record) {
      onSave({ ...record, ...formData } as CollectedSemen);
    }
  };

  const handleChange = (field: keyof CollectedSemen, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!record) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Collection Record {record.id}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="collectionDate">Collection Date</Label>
              <Input
                id="collectionDate"
                type="date"
                value={formData.collectionDate || ""}
                onChange={(e) => handleChange('collectionDate', e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="technician">Technician</Label>
              <Select 
                value={formData.technician || ""} 
                onValueChange={(value) => handleChange('technician', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select technician" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Dr. Smith">Dr. Smith</SelectItem>
                  <SelectItem value="Dr. Johnson">Dr. Johnson</SelectItem>
                  <SelectItem value="Dr. Wilson">Dr. Wilson</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="volume">Volume</Label>
              <Input
                id="volume"
                value={formData.volume || ""}
                onChange={(e) => handleChange('volume', e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="concentration">Concentration</Label>
              <Input
                id="concentration"
                value={formData.concentration || ""}
                onChange={(e) => handleChange('concentration', e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="motility">Motility</Label>
              <Input
                id="motility"
                value={formData.motility || ""}
                onChange={(e) => handleChange('motility', e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="quality">Quality</Label>
              <Select 
                value={formData.quality || ""} 
                onValueChange={(value) => handleChange('quality', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select quality" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Excellent">Excellent</SelectItem>
                  <SelectItem value="Good">Good</SelectItem>
                  <SelectItem value="Fair">Fair</SelectItem>
                  <SelectItem value="Poor">Poor</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select 
                value={formData.status || ""} 
                onValueChange={(value) => handleChange('status', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Fresh">Fresh</SelectItem>
                  <SelectItem value="Used">Used</SelectItem>
                  <SelectItem value="Frozen">Frozen</SelectItem>
                  <SelectItem value="Discarded">Discarded</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="temperature">Temperature</Label>
              <Input
                id="temperature"
                value={formData.temperature || ""}
                onChange={(e) => handleChange('temperature', e.target.value)}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes || ""}
              onChange={(e) => handleChange('notes', e.target.value)}
              rows={3}
            />
          </div>
          
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditCollectedSemenDialog;
