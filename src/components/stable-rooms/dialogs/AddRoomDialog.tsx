
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { Room } from "@/types/stableRooms";

interface AddRoomDialogProps {
  onAddRoom: (room: Omit<Room, 'id' | 'createdAt' | 'updatedAt'>) => void;
}

const AddRoomDialog = ({ onAddRoom }: AddRoomDialogProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    number: "",
    name: "",
    type: "stall" as Room['type'],
    capacity: 1,
    length: 4,
    width: 4,
    height: 3,
    unit: "m" as "m" | "ft",
    building: "",
    section: "",
    features: "",
    amenities: "",
    dailyRate: 0,
    monthlyRate: 0
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newRoom: Omit<Room, 'id' | 'createdAt' | 'updatedAt'> = {
      number: formData.number,
      name: formData.name,
      type: formData.type,
      status: 'available',
      capacity: formData.capacity,
      currentOccupancy: 0,
      size: {
        length: formData.length,
        width: formData.width,
        height: formData.height,
        unit: formData.unit
      },
      location: {
        building: formData.building,
        section: formData.section
      },
      features: formData.features.split(',').map(f => f.trim()).filter(f => f),
      amenities: formData.amenities.split(',').map(a => a.trim()).filter(a => a),
      pricing: formData.dailyRate > 0 ? {
        dailyRate: formData.dailyRate,
        monthlyRate: formData.monthlyRate,
        currency: "USD"
      } : undefined
    };

    onAddRoom(newRoom);
    setOpen(false);
    setFormData({
      number: "",
      name: "",
      type: "stall",
      capacity: 1,
      length: 4,
      width: 4,
      height: 3,
      unit: "m",
      building: "",
      section: "",
      features: "",
      amenities: "",
      dailyRate: 0,
      monthlyRate: 0
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add New Room
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Room</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="number">Room Number *</Label>
              <Input
                id="number"
                value={formData.number}
                onChange={(e) => setFormData({...formData, number: e.target.value})}
                required
              />
            </div>
            <div>
              <Label htmlFor="name">Room Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="type">Room Type</Label>
              <Select value={formData.type} onValueChange={(value: Room['type']) => setFormData({...formData, type: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="stall">Stall</SelectItem>
                  <SelectItem value="paddock">Paddock</SelectItem>
                  <SelectItem value="quarantine">Quarantine</SelectItem>
                  <SelectItem value="breeding">Breeding</SelectItem>
                  <SelectItem value="foaling">Foaling</SelectItem>
                  <SelectItem value="recovery">Recovery</SelectItem>
                  <SelectItem value="warehouse">Warehouse</SelectItem>
                  <SelectItem value="feed_storage">Feed Storage</SelectItem>
                  <SelectItem value="equipment">Equipment</SelectItem>
                  <SelectItem value="office">Office</SelectItem>
                  <SelectItem value="medical">Medical</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="capacity">Capacity</Label>
              <Input
                id="capacity"
                type="number"
                min="1"
                value={formData.capacity}
                onChange={(e) => setFormData({...formData, capacity: parseInt(e.target.value)})}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <div>
              <Label htmlFor="length">Length</Label>
              <Input
                id="length"
                type="number"
                step="0.1"
                value={formData.length}
                onChange={(e) => setFormData({...formData, length: parseFloat(e.target.value)})}
                required
              />
            </div>
            <div>
              <Label htmlFor="width">Width</Label>
              <Input
                id="width"
                type="number"
                step="0.1"
                value={formData.width}
                onChange={(e) => setFormData({...formData, width: parseFloat(e.target.value)})}
                required
              />
            </div>
            <div>
              <Label htmlFor="height">Height</Label>
              <Input
                id="height"
                type="number"
                step="0.1"
                value={formData.height}
                onChange={(e) => setFormData({...formData, height: parseFloat(e.target.value)})}
              />
            </div>
            <div>
              <Label htmlFor="unit">Unit</Label>
              <Select value={formData.unit} onValueChange={(value: "m" | "ft") => setFormData({...formData, unit: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="m">Meters</SelectItem>
                  <SelectItem value="ft">Feet</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="building">Building *</Label>
              <Input
                id="building"
                value={formData.building}
                onChange={(e) => setFormData({...formData, building: e.target.value})}
                required
              />
            </div>
            <div>
              <Label htmlFor="section">Section *</Label>
              <Input
                id="section"
                value={formData.section}
                onChange={(e) => setFormData({...formData, section: e.target.value})}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="features">Features (comma-separated)</Label>
            <Textarea
              id="features"
              value={formData.features}
              onChange={(e) => setFormData({...formData, features: e.target.value})}
              placeholder="Automatic waterer, Rubber matting, Hay feeder"
            />
          </div>

          <div>
            <Label htmlFor="amenities">Amenities (comma-separated)</Label>
            <Textarea
              id="amenities"
              value={formData.amenities}
              onChange={(e) => setFormData({...formData, amenities: e.target.value})}
              placeholder="Climate control, CCTV, WiFi"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="dailyRate">Daily Rate ($)</Label>
              <Input
                id="dailyRate"
                type="number"
                step="0.01"
                value={formData.dailyRate}
                onChange={(e) => setFormData({...formData, dailyRate: parseFloat(e.target.value)})}
              />
            </div>
            <div>
              <Label htmlFor="monthlyRate">Monthly Rate ($)</Label>
              <Input
                id="monthlyRate"
                type="number"
                step="0.01"
                value={formData.monthlyRate}
                onChange={(e) => setFormData({...formData, monthlyRate: parseFloat(e.target.value)})}
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Room</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddRoomDialog;
