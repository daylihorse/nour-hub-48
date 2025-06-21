
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { usePaddockService } from "@/hooks/usePaddockService";

interface AddPaddockDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface PaddockFormData {
  name: string;
  paddockNumber: string;
  paddockType: string;
  status: string;
  capacity: number;
  locationSection: string;
  sizeLength: number;
  sizeWidth: number;
  sizeUnit: string;
  features: string[];
}

const AddPaddockDialog = ({ open, onOpenChange }: AddPaddockDialogProps) => {
  const { createPaddock, isCreatingPaddock } = usePaddockService();
  
  const form = useForm<PaddockFormData>({
    defaultValues: {
      name: "",
      paddockNumber: "",
      paddockType: "grazing",
      status: "available",
      capacity: 1,
      locationSection: "",
      sizeLength: 0,
      sizeWidth: 0,
      sizeUnit: "meters",
      features: [],
    },
  });

  const onSubmit = (data: PaddockFormData) => {
    createPaddock({
      name: data.name,
      paddock_number: data.paddockNumber,
      paddock_type: data.paddockType,
      status: data.status,
      capacity: data.capacity,
      current_occupancy: 0,
      location_section: data.locationSection,
      size_length: data.sizeLength,
      size_width: data.sizeWidth,
      size_unit: data.sizeUnit,
      features: data.features,
    });
    
    form.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add New Paddock</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Paddock Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter paddock name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="paddockNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Paddock Number</FormLabel>
                    <FormControl>
                      <Input placeholder="P001" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="paddockType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="grazing">Grazing</SelectItem>
                        <SelectItem value="exercise">Exercise</SelectItem>
                        <SelectItem value="turnout">Turnout</SelectItem>
                        <SelectItem value="quarantine">Quarantine</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="available">Available</SelectItem>
                        <SelectItem value="occupied">Occupied</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                        <SelectItem value="resting">Resting</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="capacity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Capacity</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min="1"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="locationSection"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location Section</FormLabel>
                    <FormControl>
                      <Input placeholder="North Field" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="sizeLength"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Length</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min="0"
                        step="0.1"
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="sizeWidth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Width</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min="0"
                        step="0.1"
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="sizeUnit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unit</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select unit" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="meters">Meters</SelectItem>
                        <SelectItem value="feet">Feet</SelectItem>
                        <SelectItem value="acres">Acres</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isCreatingPaddock}>
                {isCreatingPaddock ? "Creating..." : "Create Paddock"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddPaddockDialog;
