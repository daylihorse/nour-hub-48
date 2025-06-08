
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Search, 
  Calendar, 
  Wrench, 
  AlertTriangle, 
  Clock,
  DollarSign,
  CheckCircle,
  XCircle,
  User
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
import { MaintenanceRecord } from "@/types/stableRooms";

const MaintenanceScheduling = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterPriority, setFilterPriority] = useState<string>("all");

  // Mock data
  const maintenanceRecords: MaintenanceRecord[] = [
    {
      id: "1",
      roomId: "A-08",
      type: "emergency",
      status: "in_progress",
      priority: "urgent",
      scheduledDate: new Date("2024-01-20"),
      assignedTo: "Mike Johnson",
      description: "Water leak in stall - immediate attention required",
      cost: 250,
      notes: "Plumber contacted, parts ordered",
      createdAt: new Date("2024-01-19"),
      updatedAt: new Date("2024-01-20")
    },
    {
      id: "2",
      roomId: "B-05",
      type: "routine",
      status: "scheduled",
      priority: "medium",
      scheduledDate: new Date("2024-01-25"),
      assignedTo: "Sarah Wilson",
      description: "Monthly deep cleaning and bedding replacement",
      cost: 75,
      createdAt: new Date("2024-01-15"),
      updatedAt: new Date("2024-01-15")
    },
    {
      id: "3",
      roomId: "C-12",
      type: "preventive",
      status: "completed",
      priority: "low",
      scheduledDate: new Date("2024-01-10"),
      completedDate: new Date("2024-01-12"),
      assignedTo: "Tom Brown",
      description: "Quarterly equipment inspection and lubrication",
      cost: 120,
      notes: "All equipment functioning properly",
      createdAt: new Date("2024-01-05"),
      updatedAt: new Date("2024-01-12")
    },
    {
      id: "4",
      roomId: "W-01",
      type: "repair",
      status: "scheduled",
      priority: "high",
      scheduledDate: new Date("2024-01-22"),
      assignedTo: "Lisa Garcia",
      description: "Replace damaged loading dock gate",
      cost: 800,
      notes: "Parts arrived, scheduled for weekend installation",
      createdAt: new Date("2024-01-18"),
      updatedAt: new Date("2024-01-19")
    }
  ];

  const filteredRecords = maintenanceRecords.filter(record => {
    const matchesSearch = record.roomId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.assignedTo?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || record.status === filterStatus;
    const matchesType = filterType === "all" || record.type === filterType;
    const matchesPriority = filterPriority === "all" || record.priority === filterPriority;
    
    return matchesSearch && matchesStatus && matchesType && matchesPriority;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-500';
      case 'in_progress': return 'bg-orange-500';
      case 'completed': return 'bg-green-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'emergency': return <AlertTriangle className="h-4 w-4" />;
      case 'routine': return <Calendar className="h-4 w-4" />;
      case 'preventive': return <CheckCircle className="h-4 w-4" />;
      case 'repair': return <Wrench className="h-4 w-4" />;
      default: return <Wrench className="h-4 w-4" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'scheduled': return <Clock className="h-4 w-4" />;
      case 'in_progress': return <Wrench className="h-4 w-4" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'cancelled': return <XCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const totalCost = filteredRecords.reduce((sum, record) => sum + (record.cost || 0), 0);
  const urgentTasks = maintenanceRecords.filter(r => r.priority === 'urgent' && r.status !== 'completed').length;
  const inProgressTasks = maintenanceRecords.filter(r => r.status === 'in_progress').length;
  const scheduledTasks = maintenanceRecords.filter(r => r.status === 'scheduled').length;

  return (
    <div className="space-y-6">
      {/* Header and Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h2 className="text-2xl font-bold">Maintenance Scheduling</h2>
          <p className="text-muted-foreground">Schedule and track facility maintenance tasks</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Schedule Maintenance
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Urgent Tasks</p>
                <p className="text-2xl font-bold text-red-600">{urgentTasks}</p>
              </div>
              <AlertTriangle className="h-5 w-5 text-red-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">In Progress</p>
                <p className="text-2xl font-bold text-orange-600">{inProgressTasks}</p>
              </div>
              <Wrench className="h-5 w-5 text-orange-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Scheduled</p>
                <p className="text-2xl font-bold text-blue-600">{scheduledTasks}</p>
              </div>
              <Calendar className="h-5 w-5 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Cost</p>
                <p className="text-2xl font-bold">${totalCost.toLocaleString()}</p>
              </div>
              <DollarSign className="h-5 w-5 text-muted-foreground" />
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
                  placeholder="Search by room, description, or assignee..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-40">
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
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="routine">Routine</SelectItem>
                <SelectItem value="emergency">Emergency</SelectItem>
                <SelectItem value="preventive">Preventive</SelectItem>
                <SelectItem value="repair">Repair</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterPriority} onValueChange={setFilterPriority}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Maintenance Records Table */}
      <Card>
        <CardHeader>
          <CardTitle>Maintenance Records</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Room</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Scheduled</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Cost</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="font-medium">{record.roomId}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getTypeIcon(record.type)}
                      <Badge variant="outline" className="capitalize">
                        {record.type}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-xs">
                      <p className="text-sm font-medium truncate">{record.description}</p>
                      {record.notes && (
                        <p className="text-xs text-muted-foreground truncate">{record.notes}</p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${getPriorityColor(record.priority)}`} />
                      <Badge variant="outline" className="capitalize">
                        {record.priority}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(record.status)}
                      <Badge variant="outline" className={`capitalize`}>
                        {record.status.replace('_', ' ')}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        {record.scheduledDate.toLocaleDateString()}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {record.assignedTo && (
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{record.assignedTo}</span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    {record.cost && (
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">${record.cost}</span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        Edit
                      </Button>
                      {record.status === 'scheduled' && (
                        <Button size="sm" variant="outline">
                          Start
                        </Button>
                      )}
                      {record.status === 'in_progress' && (
                        <Button size="sm" variant="outline">
                          Complete
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredRecords.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No maintenance records found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MaintenanceScheduling;
