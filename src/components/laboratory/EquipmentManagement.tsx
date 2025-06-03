
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Search, Filter, Wrench, AlertTriangle, CheckCircle, Clock, Settings } from "lucide-react";

const EquipmentManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Mock equipment data
  const equipment = [
    {
      id: "EQ001",
      name: "Centrifuge Model X200",
      type: "Centrifuge",
      manufacturer: "LabTech Inc",
      serialNumber: "CT-2024-001",
      purchaseDate: "2023-01-15",
      lastMaintenance: "2024-05-15",
      nextMaintenance: "2024-08-15",
      status: "operational",
      location: "Lab Room A",
      condition: "excellent",
      warrantyExpiry: "2025-01-15"
    },
    {
      id: "EQ002",
      name: "Microscope Advanced Pro",
      type: "Microscope",
      manufacturer: "OpticalTech",
      serialNumber: "MS-2024-002",
      purchaseDate: "2023-03-20",
      lastMaintenance: "2024-05-20",
      nextMaintenance: "2024-08-20",
      status: "maintenance",
      location: "Lab Room B",
      condition: "good",
      warrantyExpiry: "2025-03-20"
    },
    {
      id: "EQ003",
      name: "Chemistry Analyzer CA-500",
      type: "Analyzer",
      manufacturer: "ChemLab Systems",
      serialNumber: "CA-2024-003",
      purchaseDate: "2022-11-10",
      lastMaintenance: "2024-04-10",
      nextMaintenance: "2024-07-10",
      status: "needs-repair",
      location: "Lab Room C",
      condition: "fair",
      warrantyExpiry: "2024-11-10"
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusMap = {
      operational: { variant: "secondary", icon: CheckCircle, color: "green" },
      maintenance: { variant: "default", icon: Wrench, color: "yellow" },
      "needs-repair": { variant: "destructive", icon: AlertTriangle, color: "red" },
      "out-of-service": { variant: "destructive", icon: AlertTriangle, color: "red" }
    };
    
    const config = statusMap[status as keyof typeof statusMap] || statusMap.operational;
    const Icon = config.icon;
    
    return (
      <Badge variant={config.variant as any} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
      </Badge>
    );
  };

  const getConditionBadge = (condition: string) => {
    const conditionMap = {
      excellent: "text-green-600",
      good: "text-blue-600",
      fair: "text-orange-600",
      poor: "text-red-600"
    };
    return (
      <span className={conditionMap[condition as keyof typeof conditionMap] || "text-gray-600"}>
        {condition.charAt(0).toUpperCase() + condition.slice(1)}
      </span>
    );
  };

  const isMaintenanceDue = (nextMaintenance: string) => {
    const today = new Date();
    const maintenanceDate = new Date(nextMaintenance);
    const daysDiff = Math.ceil((maintenanceDate.getTime() - today.getTime()) / (1000 * 3600 * 24));
    return daysDiff <= 7;
  };

  const filteredEquipment = equipment.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search equipment..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-80"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="operational">Operational</SelectItem>
              <SelectItem value="maintenance">Maintenance</SelectItem>
              <SelectItem value="needs-repair">Needs Repair</SelectItem>
              <SelectItem value="out-of-service">Out of Service</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Equipment
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Equipment</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Equipment Name</Label>
                <Input placeholder="Enter equipment name..." />
              </div>
              <div>
                <Label>Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select equipment type..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="centrifuge">Centrifuge</SelectItem>
                    <SelectItem value="microscope">Microscope</SelectItem>
                    <SelectItem value="analyzer">Analyzer</SelectItem>
                    <SelectItem value="incubator">Incubator</SelectItem>
                    <SelectItem value="spectrophotometer">Spectrophotometer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Manufacturer</Label>
                <Input placeholder="Enter manufacturer..." />
              </div>
              <div>
                <Label>Serial Number</Label>
                <Input placeholder="Enter serial number..." />
              </div>
              <div>
                <Label>Location</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select location..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lab-room-a">Lab Room A</SelectItem>
                    <SelectItem value="lab-room-b">Lab Room B</SelectItem>
                    <SelectItem value="lab-room-c">Lab Room C</SelectItem>
                    <SelectItem value="storage">Storage</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsAddDialogOpen(false)}>
                  Add Equipment
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Equipment Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Settings className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Total Equipment</p>
                <p className="text-2xl font-bold">24</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Operational</p>
                <p className="text-2xl font-bold">19</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Wrench className="h-4 w-4 text-orange-500" />
              <div>
                <p className="text-sm text-muted-foreground">In Maintenance</p>
                <p className="text-2xl font-bold">3</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-red-500" />
              <div>
                <p className="text-sm text-muted-foreground">Due for Service</p>
                <p className="text-2xl font-bold">5</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Maintenance Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            Maintenance Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {equipment.filter(item => isMaintenanceDue(item.nextMaintenance)).map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-muted-foreground">Maintenance due: {item.nextMaintenance}</p>
                </div>
                <Button size="sm">Schedule Service</Button>
              </div>
            ))}
            {equipment.filter(item => isMaintenanceDue(item.nextMaintenance)).length === 0 && (
              <p className="text-muted-foreground text-center py-4">No maintenance alerts at this time</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Equipment Table */}
      <Card>
        <CardHeader>
          <CardTitle>Equipment Inventory</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Equipment ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Condition</TableHead>
                <TableHead>Next Maintenance</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEquipment.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.id}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-muted-foreground">{item.manufacturer}</div>
                    </div>
                  </TableCell>
                  <TableCell>{item.type}</TableCell>
                  <TableCell>{item.location}</TableCell>
                  <TableCell>{getStatusBadge(item.status)}</TableCell>
                  <TableCell>{getConditionBadge(item.condition)}</TableCell>
                  <TableCell>
                    <span className={isMaintenanceDue(item.nextMaintenance) ? "text-red-600 font-medium" : ""}>
                      {item.nextMaintenance}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">View</Button>
                      <Button variant="outline" size="sm">Edit</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default EquipmentManagement;
