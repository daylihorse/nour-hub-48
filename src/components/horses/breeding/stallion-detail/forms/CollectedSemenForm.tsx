
import { useState } from "react";
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

interface CollectedSemenFormProps {
  stallionId: string;
  onSubmit: (data: any) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const CollectedSemenForm = ({ 
  stallionId, 
  onSubmit, 
  onCancel, 
  isLoading = false 
}: CollectedSemenFormProps) => {
  const [formData, setFormData] = useState({
    stallionId,
    collectionDate: new Date().toISOString().split('T')[0],
    volume: "",
    concentration: "",
    motility: "",
    quality: "",
    technician: "",
    status: "Fresh",
    temperature: "37°C",
    ph: "",
    notes: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="collectionDate">Collection Date</Label>
          <Input
            id="collectionDate"
            type="date"
            value={formData.collectionDate}
            onChange={(e) => handleChange('collectionDate', e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="technician">Technician</Label>
          <Select value={formData.technician} onValueChange={(value) => handleChange('technician', value)}>
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
            placeholder="e.g., 50ml"
            value={formData.volume}
            onChange={(e) => handleChange('volume', e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="concentration">Concentration</Label>
          <Input
            id="concentration"
            placeholder="e.g., 150M/ml"
            value={formData.concentration}
            onChange={(e) => handleChange('concentration', e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="motility">Motility</Label>
          <Input
            id="motility"
            placeholder="e.g., 85%"
            value={formData.motility}
            onChange={(e) => handleChange('motility', e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="quality">Quality</Label>
          <Select value={formData.quality} onValueChange={(value) => handleChange('quality', value)}>
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
          <Label htmlFor="temperature">Temperature</Label>
          <Input
            id="temperature"
            value={formData.temperature}
            onChange={(e) => handleChange('temperature', e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="ph">pH Level</Label>
          <Input
            id="ph"
            placeholder="e.g., 7.2"
            value={formData.ph}
            onChange={(e) => handleChange('ph', e.target.value)}
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          placeholder="Additional notes about the collection..."
          value={formData.notes}
          onChange={(e) => handleChange('notes', e.target.value)}
          rows={3}
        />
      </div>
      
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Collection"}
        </Button>
      </div>
    </form>
  );
};

export default CollectedSemenForm;
