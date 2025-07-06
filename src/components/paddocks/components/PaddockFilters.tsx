import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const PaddockFilters = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="space-y-2">
        <Label>Capacity Range</Label>
        <div className="flex gap-2">
          <Input placeholder="Min" type="number" />
          <Input placeholder="Max" type="number" />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label>Location Section</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select section" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="north">North Wing</SelectItem>
            <SelectItem value="south">South Wing</SelectItem>
            <SelectItem value="east">East Wing</SelectItem>
            <SelectItem value="west">West Wing</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label>Features</Label>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="water" />
            <Label htmlFor="water">Water trough</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="shelter" />
            <Label htmlFor="shelter">Shelter</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="lighting" />
            <Label htmlFor="lighting">Lighting</Label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaddockFilters;