
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
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { usePaddockService } from "@/hooks/usePaddockService";
import { useAuth } from "@/hooks/useAuth";

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
  const { usePaddocks, usePaddockAssignments, assignHorse, isAssigningHorse } = usePaddockService();
  const { user } = useAuth();
  const { data: paddocks = [] } = usePaddocks();
  const { data: assignments = [] } = usePaddockAssignments();
  
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
    const selectedHorse = mockHorses.find(h => h.id === data.horseId);
    
    if (!selectedHorse || !user) {
      return;
    }
    
    // Assign horse to paddock using the database service
    assignHorse({
      paddockId: data.paddockId,
      horseId: selectedHorse.id,
      horseName: selectedHorse.name,
      assignedDate: new Date(),
      assignmentType: data.assignmentType,
      status: 'active',
      assignedBy: user.id,
      notes: data.notes,
      reason: `${data.assignmentType} assignment`
    });
    
    // Reset form
    form.reset();
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="horseId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select Horse</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose a horse" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {mockHorses.map((horse) => (
                            <SelectItem key={horse.id} value={horse.id}>
                              {horse.name} - {horse.breed}
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
                      <FormLabel>Select Paddock</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose a paddock" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {availablePaddocks.map((paddock) => (
                            <SelectItem key={paddock.id} value={paddock.id}>
                              {paddock.name} - Available Space: {paddock.capacity - paddock.currentOccupancy}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="assignmentType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Assignment Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select assignment type" />
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
                    <FormLabel>Notes (Optional)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Any additional notes about this assignment..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isAssigningHorse}>
                {isAssigningHorse ? 'Assigning...' : 'Assign Horse to Paddock'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Current assignments display */}
      {assignments.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Assignments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {assignments.slice(0, 5).map((assignment) => (
                <div key={assignment.id} className="flex justify-between items-center p-2 bg-muted rounded">
                  <span>{assignment.horseName}</span>
                  <span className="text-sm text-muted-foreground">
                    {assignment.status} • {assignment.assignedDate.toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PaddockHorseAssignment;
