import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Calendar, 
  User, 
  Building, 
  Clock,
  DollarSign,
  Eye,
  Square
} from "lucide-react";
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
import { Assignment } from "@/types/stableRooms";
import { useStableRoomsData } from "@/hooks/useStableRoomsData";
import { useToast } from "@/hooks/use-toast";
import CreateAssignmentDialog from "./dialogs/CreateAssignmentDialog";
import ViewAssignmentDialog from "./dialogs/ViewAssignmentDialog";
import EnhancedEndAssignmentDialog from "./dialogs/EnhancedEndAssignmentDialog";

const AssignmentManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterType, setFilterType] = useState<string>("all");
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [endDialogOpen, setEndDialogOpen] = useState(false);

  const { assignments, rooms, createAssignment, endAssignment, getAvailableRooms } = useStableRoomsData();
  const { toast } = useToast();
  const availableRooms = getAvailableRooms();

  const filteredAssignments = assignments.filter(assignment => {
    const matchesSearch = assignment.entityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assignment.roomId.includes(searchTerm);
    const matchesStatus = filterStatus === "all" || assignment.status === filterStatus;
    const matchesType = filterType === "all" || assignment.entityType === filterType;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'completed': return 'bg-blue-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getEntityIcon = (type: string) => {
    switch (type) {
      case 'horse': return <User className="h-4 w-4" />;
      case 'equipment': return <Building className="h-4 w-4" />;
      case 'supplies': return <Building className="h-4 w-4" />;
      default: return <Building className="h-4 w-4" />;
    }
  };

  const calculateDuration = (start: Date, end?: Date) => {
    const endDate = end || new Date();
    const diffTime = Math.abs(endDate.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getRoomNumber = (roomId: string) => {
    const room = rooms.find(r => r.id === roomId);
    return room ? room.number : roomId;
  };

  const handleViewAssignment = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
    setViewDialogOpen(true);
  };

  const handleEndAssignment = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
    setEndDialogOpen(true);
  };

  const handleEndAssignmentSubmit = async (assignmentId: string, endData: { 
    actualVacate: Date; 
    finalCost?: number; 
    notes?: string;
    terminationReason: string;
    terminationCategory: string;
    checklistItems: Record<string, boolean>;
    documents: string[];
    movementRecord?: any;
  }) => {
    try {
      await endAssignment(assignmentId);
      
      // If movement record should be created, integrate with Arrivals & Departures
      if (endData.movementRecord) {
        console.log('Creating movement record:', endData.movementRecord);
        // TODO: Integrate with movement system
      }
      
      toast({
        title: "Assignment Terminated",
        description: "Assignment has been successfully completed with enhanced procedures."
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to end assignment. Please try again.",
        variant: "destructive"
      });
      throw error;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header and Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h2 className="text-2xl font-bold">Assignment Management</h2>
          <p className="text-muted-foreground">Track room assignments and occupancy history</p>
        </div>
        <CreateAssignmentDialog 
          onCreateAssignment={createAssignment}
          availableRooms={availableRooms.map(room => ({ 
            id: room.id, 
            number: room.number, 
            name: room.name 
          }))}
        />
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Assignments</p>
                <p className="text-2xl font-bold">
                  {assignments.filter(a => a.status === 'active').length}
                </p>
              </div>
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Horse Assignments</p>
                <p className="text-2xl font-bold">
                  {assignments.filter(a => a.entityType === 'horse').length}
                </p>
              </div>
              <User className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold">
                  ${assignments.reduce((sum, a) => sum + (a.cost?.totalCost || 0), 0).toLocaleString()}
                </p>
              </div>
              <DollarSign className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg. Duration</p>
                <p className="text-2xl font-bold">
                  {assignments.length > 0 ? Math.round(assignments.reduce((sum, a) => sum + calculateDuration(a.assignedDate, a.actualVacate), 0) / assignments.length) : 0} days
                </p>
              </div>
              <Clock className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by entity name or room..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="horse">Horses</SelectItem>
                <SelectItem value="equipment">Equipment</SelectItem>
                <SelectItem value="supplies">Supplies</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Assignments Table */}
      <Card>
        <CardHeader>
          <CardTitle>Assignment Records</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Entity</TableHead>
                <TableHead>Room</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Assigned Date</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Cost</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAssignments.map((assignment) => (
                <TableRow key={assignment.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getEntityIcon(assignment.entityType)}
                      <div>
                        <p className="font-medium">{assignment.entityName}</p>
                        <p className="text-sm text-muted-foreground">ID: {assignment.entityId}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      {getRoomNumber(assignment.roomId)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {assignment.entityType}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {assignment.assignedDate.toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      {calculateDuration(assignment.assignedDate, assignment.actualVacate || assignment.expectedVacate)} days
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(assignment.status)}`} />
                      <Badge variant="outline" className="capitalize">
                        {assignment.status}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    {assignment.cost && (
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        ${assignment.cost.totalCost.toLocaleString()}
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleViewAssignment(assignment)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      {assignment.status === 'active' && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleEndAssignment(assignment)}
                        >
                          <Square className="h-4 w-4 mr-1" />
                          End
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredAssignments.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No assignments found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* View Assignment Dialog */}
      <ViewAssignmentDialog
        assignment={selectedAssignment}
        open={viewDialogOpen}
        onOpenChange={setViewDialogOpen}
        roomNumber={selectedAssignment ? getRoomNumber(selectedAssignment.roomId) : undefined}
      />

      {/* Enhanced End Assignment Dialog */}
      <EnhancedEndAssignmentDialog
        assignment={selectedAssignment}
        open={endDialogOpen}
        onOpenChange={setEndDialogOpen}
        onEndAssignment={handleEndAssignmentSubmit}
        roomNumber={selectedAssignment ? getRoomNumber(selectedAssignment.roomId) : undefined}
      />
    </div>
  );
};

export default AssignmentManagement;
