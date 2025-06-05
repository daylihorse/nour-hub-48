
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { BreedingFormProps } from "./FormSchema";
import { stallions, mares, breedingMethods } from "./BreedingFormConstants";

const BasicInfoFields = ({ formData, setFormData, breedingDate, setBreedingDate }: BreedingFormProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Stallion Selection */}
      <div className="space-y-2">
        <Label htmlFor="stallion">Stallion</Label>
        <Select 
          value={formData.stallionId || ""} 
          onValueChange={(value) => setFormData({...formData, stallionId: value})}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select stallion" />
          </SelectTrigger>
          <SelectContent>
            {stallions.map((stallion) => (
              <SelectItem key={stallion.id} value={stallion.id}>
                {stallion.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Mare Selection */}
      <div className="space-y-2">
        <Label htmlFor="mare">Mare</Label>
        <Select 
          value={formData.mareId || ""} 
          onValueChange={(value) => setFormData({...formData, mareId: value})}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select mare" />
          </SelectTrigger>
          <SelectContent>
            {mares.map((mare) => (
              <SelectItem key={mare.id} value={mare.id}>
                {mare.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Breeding Date */}
      <div className="space-y-2">
        <Label>Breeding Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !breedingDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {breedingDate ? format(breedingDate, "PPP") : "Pick a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={breedingDate}
              onSelect={setBreedingDate}
              initialFocus
              className="p-3 pointer-events-auto"
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Breeding Method */}
      <div className="space-y-2">
        <Label htmlFor="method">Breeding Method</Label>
        <Select 
          value={formData.method || ""} 
          onValueChange={(value) => setFormData({...formData, method: value as any})}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select method" />
          </SelectTrigger>
          <SelectContent>
            {breedingMethods.map((method) => (
              <SelectItem key={method.value} value={method.value}>
                {method.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default BasicInfoFields;
