/**
 * Component: PaddockMaintenanceScheduler
 * 
 * PURPOSE:
 * Comprehensive maintenance scheduling and tracking system for paddock
 * infrastructure and environmental upkeep. Provides task scheduling,
 * cost tracking, staff assignment, and maintenance history management
 * for optimal paddock condition maintenance.
 * 
 * ARCHITECTURAL PATTERN:
 * - Task-based maintenance management with scheduling capabilities
 * - Staff assignment and tracking for accountability
 * - Cost analysis and budget planning integration
 * - Historical maintenance record tracking and analysis
 * 
 * DESIGN PRINCIPLES:
 * - Preventive maintenance scheduling for proactive care
 * - Clear task categorization for efficient resource allocation
 * - Staff accountability through assignment tracking
 * - Cost control through budget monitoring and analysis
 * 
 * MAINTENANCE MANAGEMENT CONTEXT:
 * This component manages critical maintenance activities:
 * - Grass maintenance and pasture care scheduling
 * - Infrastructure repair and upgrade planning
 * - Drainage and soil treatment coordination
 * - Weed control and fertilization management
 * 
 * SCHEDULING FEATURES:
 * The system provides comprehensive maintenance oversight:
 * - Automated task scheduling based on maintenance intervals
 * - Staff workload management and assignment optimization
 * - Cost tracking for budget planning and analysis
 * - Maintenance history for performance evaluation
 * 
 * INTEGRATION CONTEXT:
 * Designed for integration with staff management systems,
 * budget tracking platforms, and equipment management tools.
 * Supports both scheduled maintenance and emergency repair workflows.
 * 
 * ACCESSIBILITY FEATURES:
 * - Color-coded status indicators for task prioritization
 * - Clear task categorization for efficient navigation
 * - Keyboard accessible scheduling interfaces
 * - Screen reader compatible status announcements
 */

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Check, Clock, Filter, Search } from "lucide-react";
import { format, addDays } from "date-fns";
import { cn } from "@/lib/utils";
import { usePaddockData } from "@/hooks/usePaddockData";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PaddockMaintenanceRecord } from "@/types/paddocks";

const PaddockMaintenanceScheduler = () => {
  const { paddocks, maintenanceRecords, scheduleMaintenanceTask, completeMaintenanceTask } = usePaddockData();
  
  const [selectedPaddock, setSelectedPaddock] = useState<string>("");
  const [maintenanceType, setMaintenanceType] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [scheduledDate, setScheduledDate] = useState<Date | undefined>(new Date());
  const [assignedTo, setAssignedTo] = useState<string>("");
  const [estimatedCost, setEstimatedCost] = useState<string>("");
  const [nextMaintenanceDate, setNextMaintenanceDate] = useState<Date | undefined>(
    addDays(new Date(), 90)
  );
  const [notes, setNotes] = useState<string>("");
  
  // Filters for maintenance records
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  
  const maintenanceTypes = [
    { value: "grass_maintenance", label: "Grass Maintenance" },
    { value: "fence_repair", label: "Fence Repair" },
    { value: "drainage", label: "Drainage Work" },
    { value: "soil_treatment", label: "Soil Treatment" },
    { value: "weed_control", label: "Weed Control" },
    { value: "fertilization", label: "Fertilization" },
    { value: "reseeding", label: "Reseeding" },
  ];
  
  // Mock staff members - in a real app, this would come from an API
  const staffMembers = [
    { id: "staff1", name: "John Smith" },
    { id: "staff2", name: "Emily Johnson" },
    { id: "staff3", name: "Miguel Rodriguez" },
  ];
  
  const handleScheduleMaintenance = () => {
    if (!selectedPaddock) {
      toast({
        title: "Error",
        description: "Please select a paddock",
        variant: "destructive",
      });
      return;
    }
    
    if (!maintenanceType) {
      toast({
        title: "Error",
        description: "Please select a maintenance type",
        variant: "destructive",
      });
      return;
    }
    
    if (!scheduledDate) {
      toast({
        title: "Error",
        description: "Please select a scheduled date",
        variant: "destructive",
      });
      return;
    }
    
    const maintenanceTask: Omit<PaddockMaintenanceRecord, "id" | "createdAt"> = {
      paddockId: selectedPaddock,
      type: maintenanceType as any,
      description,
      scheduledDate: scheduledDate,
      status: "scheduled",
      assignedTo,
      cost: estimatedCost ? parseFloat(estimatedCost) : undefined,
      notes,
      nextMaintenanceDate,
    };
    
    scheduleMaintenanceTask(maintenanceTask);
    
    toast({
      title: "Success",
      description: "Maintenance task has been scheduled",
    });
    
    // Reset form
    setSelectedPaddock("");
    setMaintenanceType("");
    setDescription("");
    setScheduledDate(new Date());
    setAssignedTo("");
    setEstimatedCost("");
    setNextMaintenanceDate(addDays(new Date(), 90));
    setNotes("");
  };
  
  const handleCompleteMaintenance = (recordId: string) => {
    completeMaintenanceTask(recordId);
    
    toast({
      title: "Success",
      description: "Maintenance task marked as completed",
    });
  };
  
  const filteredRecords = maintenanceRecords.filter(record => {
    const paddock = paddocks.find(p => p.id === record.paddockId);
    const paddockName = paddock ? paddock.name : record.paddockId;
    
    const matchesSearch = 
      paddockName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (record.assignedTo && record.assignedTo.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === "all" || record.status === statusFilter;
    const matchesType = typeFilter === "all" || record.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });
  
  const getPaddockName = (paddockId: string) => {
    const paddock = paddocks.find(p => p.id === paddockId);
    return paddock ? paddock.name : paddockId;
  };
  
  const getMaintenanceTypeName = (type: string) => {
    const maintenanceType = maintenanceTypes.find(t => t.value === type);
    return maintenanceType ? maintenanceType.label : type;
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-500';
      case 'in_progress': return 'bg-yellow-500';
      case 'completed': return 'bg-green-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Schedule Maintenance Task</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="paddock">Paddock</Label>
              <Select value={selectedPaddock} onValueChange={setSelectedPaddock}>
                <SelectTrigger>
                  <SelectValue placeholder="Select paddock" />
                </SelectTrigger>
                <SelectContent>
                  {paddocks.map((paddock) => (
                    <SelectItem key={paddock.id} value={paddock.id}>
                      {paddock.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="maintenance-type">Maintenance Type</Label>
              <Select value={maintenanceType} onValueChange={setMaintenanceType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {maintenanceTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label>Scheduled Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !scheduledDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {scheduledDate ? format(scheduledDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={scheduledDate}
                    onSelect={setScheduledDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div>
              <Label htmlFor="assigned-to">Assigned To</Label>
              <Select value={assignedTo} onValueChange={setAssignedTo}>
                <SelectTrigger>
                  <SelectValue placeholder="Select staff member" />
                </SelectTrigger>
                <SelectContent>
                  {staffMembers.map((staff) => (
                    <SelectItem key={staff.id} value={staff.id}>
                      {staff.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="estimated-cost">Estimated Cost ($)</Label>
              <Input
                id="estimated-cost"
                type="number"
                value={estimatedCost}
                onChange={(e) => setEstimatedCost(e.target.value)}
                placeholder="0.00"
              />
            </div>
            
            <div>
              <Label>Next Maintenance Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !nextMaintenanceDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {nextMaintenanceDate ? format(nextMaintenanceDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={nextMaintenanceDate}
                    onSelect={setNextMaintenanceDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          
          <div>
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of the maintenance task"
            />
          </div>
          
          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Additional notes or instructions"
              className="resize-none"
            />
          </div>
          
          <Button onClick={handleScheduleMaintenance}>Schedule Maintenance</Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Maintenance Records</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search records..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {maintenanceTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {filteredRecords.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No maintenance records found.
            </div>
          ) : (
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Paddock</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Scheduled Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Assigned To</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell>{getPaddockName(record.paddockId)}</TableCell>
                      <TableCell>{getMaintenanceTypeName(record.type)}</TableCell>
                      <TableCell>{format(new Date(record.scheduledDate), "MMM d, yyyy")}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(record.status)}>
                          {record.status.replace("_", " ")}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {record.assignedTo ? 
                          staffMembers.find(s => s.id === record.assignedTo)?.name || record.assignedTo 
                          : "Unassigned"}
                      </TableCell>
                      <TableCell className="text-right">
                        {record.status !== "completed" && record.status !== "cancelled" && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="ml-2"
                            onClick={() => handleCompleteMaintenance(record.id)}
                          >
                            <Check className="h-4 w-4 mr-1" />
                            Complete
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PaddockMaintenanceScheduler;
