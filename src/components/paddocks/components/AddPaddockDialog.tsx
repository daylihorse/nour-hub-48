import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Paddock } from "@/types/paddocks";

interface AddPaddockDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: Omit<Paddock, 'id' | 'createdAt' | 'updatedAt' | 'tenantId'>) => void;
}

const AddPaddockDialog = ({ open, onOpenChange, onSubmit }: AddPaddockDialogProps) => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm();

  const handleFormSubmit = async (data: any) => {
    setLoading(true);
    try {
      const paddockData = {
        ...data,
        currentOccupancy: 0,
        assignedHorses: [],
        size: {
          length: Number(data.length),
          width: Number(data.width),
          unit: data.unit,
          area: Number(data.length) * Number(data.width)
        },
        location: {
          section: data.section,
          coordinates: data.coordinates ? {
            lat: Number(data.lat),
            lng: Number(data.lng)
          } : undefined
        },
        facilities: {
          waterSource: data.waterSource || false,
          shelter: data.shelter || false,
          fencing: data.fencing,
          gates: Number(data.gates) || 1,
          lighting: data.lighting || false
        },
        soilCondition: {
          type: data.soilType,
          drainage: data.drainage,
          lastTested: new Date()
        },
        capacity: Number(data.capacity)
      };
      
      onSubmit(paddockData);
      reset();
    } catch (error) {
      console.error("Failed to create paddock:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Paddock</DialogTitle>
          <DialogDescription>
            Create a new paddock with all necessary details and specifications.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="facilities">Facilities</TabsTrigger>
              <TabsTrigger value="conditions">Conditions</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Paddock Name *</Label>
                  <Input
                    id="name"
                    {...register("name", { required: "Name is required" })}
                    placeholder="e.g., Paddock Alpha"
                  />
                  {errors.name && <p className="text-sm text-destructive">{errors.name.message as string}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="number">Paddock Number *</Label>
                  <Input
                    id="number"
                    {...register("number", { required: "Number is required" })}
                    placeholder="e.g., P-001"
                  />
                  {errors.number && <p className="text-sm text-destructive">{errors.number.message as string}</p>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Type *</Label>
                  <Select onValueChange={(value) => setValue("type", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pasture">Pasture</SelectItem>
                      <SelectItem value="exercise">Exercise</SelectItem>
                      <SelectItem value="quarantine">Quarantine</SelectItem>
                      <SelectItem value="breeding">Breeding</SelectItem>
                      <SelectItem value="training">Training</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status *</Label>
                  <Select onValueChange={(value) => setValue("status", value)} defaultValue="available">
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="available">Available</SelectItem>
                      <SelectItem value="occupied">Occupied</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                      <SelectItem value="reserved">Reserved</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="section">Section *</Label>
                <Input
                  id="section"
                  {...register("section", { required: "Section is required" })}
                  placeholder="e.g., North Field"
                />
                {errors.section && <p className="text-sm text-destructive">{errors.section.message as string}</p>}
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="length">Length *</Label>
                  <Input
                    id="length"
                    type="number"
                    {...register("length", { required: "Length is required", min: 1 })}
                    placeholder="100"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="width">Width *</Label>
                  <Input
                    id="width"
                    type="number"
                    {...register("width", { required: "Width is required", min: 1 })}
                    placeholder="80"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="unit">Unit *</Label>
                  <Select onValueChange={(value) => setValue("unit", value)} defaultValue="meters">
                    <SelectTrigger>
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="meters">Meters</SelectItem>
                      <SelectItem value="feet">Feet</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="capacity">Capacity (Horses) *</Label>
                <Input
                  id="capacity"
                  type="number"
                  {...register("capacity", { required: "Capacity is required", min: 1 })}
                  placeholder="8"
                />
                {errors.capacity && <p className="text-sm text-destructive">{errors.capacity.message as string}</p>}
              </div>
            </TabsContent>

            <TabsContent value="facilities" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="waterSource"
                    {...register("waterSource")}
                    onCheckedChange={(checked) => setValue("waterSource", checked)}
                  />
                  <Label htmlFor="waterSource">Water Source Available</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="shelter"
                    {...register("shelter")}
                    onCheckedChange={(checked) => setValue("shelter", checked)}
                  />
                  <Label htmlFor="shelter">Shelter Available</Label>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="lighting"
                  {...register("lighting")}
                  onCheckedChange={(checked) => setValue("lighting", checked)}
                />
                <Label htmlFor="lighting">Lighting Available</Label>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fencing">Fencing Type *</Label>
                  <Select onValueChange={(value) => setValue("fencing", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select fencing type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="wood">Wood</SelectItem>
                      <SelectItem value="metal">Metal</SelectItem>
                      <SelectItem value="electric">Electric</SelectItem>
                      <SelectItem value="composite">Composite</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gates">Number of Gates</Label>
                  <Input
                    id="gates"
                    type="number"
                    {...register("gates")}
                    placeholder="1"
                    defaultValue={1}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="conditions" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="soilType">Soil Type *</Label>
                  <Select onValueChange={(value) => setValue("soilType", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select soil type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="grass">Grass</SelectItem>
                      <SelectItem value="sand">Sand</SelectItem>
                      <SelectItem value="dirt">Dirt</SelectItem>
                      <SelectItem value="mixed">Mixed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="drainage">Drainage *</Label>
                  <Select onValueChange={(value) => setValue("drainage", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select drainage" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="excellent">Excellent</SelectItem>
                      <SelectItem value="good">Good</SelectItem>
                      <SelectItem value="fair">Fair</SelectItem>
                      <SelectItem value="poor">Poor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  {...register("notes")}
                  placeholder="Any additional information about this paddock..."
                  rows={3}
                />
              </div>

              <div className="text-sm text-muted-foreground p-3 bg-muted/50 rounded">
                <strong>Optional:</strong> You can add GPS coordinates later for precise location mapping.
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Paddock"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddPaddockDialog;