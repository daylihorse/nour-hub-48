
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { BreedingFormProps } from "./FormSchema";
import { veterinarians } from "./BreedingFormConstants";

const AdditionalInfoFields = ({ formData, setFormData }: Omit<BreedingFormProps, 'breedingDate' | 'setBreedingDate'>) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Veterinarian */}
        <div className="space-y-2">
          <Label htmlFor="veterinarian">Veterinarian</Label>
          <Select 
            value={formData.veterinarian || ""} 
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

        {/* Cost */}
        <div className="space-y-2">
          <Label htmlFor="cost">Cost ($)</Label>
          <Input
            id="cost"
            type="number"
            placeholder="Enter cost"
            value={formData.cost || ""}
            onChange={(e) => setFormData({...formData, cost: parseFloat(e.target.value)})}
          />
        </div>
      </div>

      {/* Notes */}
      <div className="space-y-2">
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          placeholder="Enter any additional notes..."
          value={formData.notes || ""}
          onChange={(e) => setFormData({...formData, notes: e.target.value})}
          rows={3}
        />
      </div>
    </>
  );
};

export default AdditionalInfoFields;
