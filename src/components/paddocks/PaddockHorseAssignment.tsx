import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { usePaddockData } from "@/hooks/usePaddockData";
import { useHousingService } from "@/services/housing";

// Mock horse data - in a real app this would come from an API or context
const mockHorses = [
  { id: "h1", name: "Thunder", breed: "Arabian" },
  { id: "h2", name: "Lightning", breed: "Thoroughbred" },
  { id: "h3", name: "Storm", breed: "Quarter Horse" },
  { id: "h4", name: "Shadow", breed: "Appaloosa" },
];

interface AssignmentFormData {
  horseId: string;
  paddockId: string;
  assignmentType: 'grazing' | 'exercise' | 'turnout' | 'breeding' | 'quarantine' | 'rehabilitation';
  notes: string;
}

const PaddockHorseAssignment = () => {
  const { paddocks } = usePaddockData();
  const housingService = useHousingService();
  const [assignments, setAssignments] = useState<any[]>([]);
  
  // Initialize form
  const form = useForm<AssignmentFormData>({
    defaultValues: {
      horseId: "",
      paddockId: "",
      assignmentType: "grazing",
      notes: ""
    }
  });
  
  // Get available paddocks (not at full capacity)
  const availablePaddocks = paddocks.filter(paddock => 
    paddock.currentOccupancy < paddock.capacity
  );
  
  // Handle form submission
  const onSubmit = (data: AssignmentFormData) => {
    try {
      // Find the selected horse
      const selectedHorse = mockHorses.find(h => h.id === data.horseId);
      
      if (!selectedHorse) {
        toast({
          title: "Error",
          description: "Selected horse not found",
          variant: "destructive"
        });
        return;
      }
      
      // Assign horse to paddock using our housing service
      const assignment = housingService.assignHorseToPaddock({
        paddockId: data.paddockId,
        horseId: selectedHorse.id,
        horseName: selectedHorse.name,
        assignedDate: new Date(),
        assignmentType: data.assignmentType,
        status: 'active',
        assignedBy: "current-user", // In a real app, this would be the current user
        notes: data.notes
      });
      
      // Update local assignments state
      setAssignments(prev => [...prev, assignment]);
      
      toast({
        title: "Success",
        description: `${selectedHorse.name} has been assigned to the paddock`
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to assign horse to paddock",
        variant: "destructive"
      });
    }
  };
  
  // Display current horse location
  const getHorseLocation = (horseId: string) => {
    const location = housingService.getHorseLocation(horseId);
    
    if (location.locationType === 'unknown') {
      return "Not assigned";
    }
    
    return `${location.locationType === 'paddock' ? 'Paddock' : 'Stable'}: ${location.locationId}`;
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Assign Horse to Paddock</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="horseId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Horse</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a horse" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {mockHorses.map(horse => (
                          <SelectItem key={horse.id} value={horse.id}>
                            {horse.name} ({horse.breed})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="paddockId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Paddock</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a paddock" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {availablePaddocks.map(paddock => (
                          <SelectItem key={paddock.id} value={paddock.id}>
                            {paddock.name} ({paddock.currentOccupancy}/{paddock.capacity})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="assignmentType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Assignment Type</FormLabel>
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
                        <SelectItem value="breeding">Breeding</SelectItem>
                        <SelectItem value="quarantine">Quarantine</SelectItem>
                        <SelectItem value="rehabilitation">Rehabilitation</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Add any special instructions or notes" 
                        className="resize-none" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit">Assign Horse</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      {/* Current Horse Locations */}
      <Card>
        <CardHeader>
          <CardTitle>Current Horse Locations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {mockHorses.map(horse => (
              <div key={horse.id} className="flex justify-between items-center border-b pb-2">
                <div>
                  <p className="font-medium">{horse.name}</p>
                  <p className="text-sm text-muted-foreground">{horse.breed}</p>
                </div>
                <div>
                  <p className="text-sm">{getHorseLocation(horse.id)}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaddockHorseAssignment;
