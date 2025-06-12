
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Search, Download, Filter, Snowflake } from "lucide-react";

interface FrozenSemenInventoryTabProps {
  stallionId: string;
  onActionClick: (action: string, title: string) => void;
}

const FrozenSemenInventoryTab = ({ stallionId, onActionClick }: FrozenSemenInventoryTabProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data for frozen semen inventory
  const frozenSemenInventory = [
    {
      id: "FS001",
      batchNumber: "FS-2024-001",
      freezingDate: "2024-01-15",
      straws: 45,
      dosesPerStraw: 4,
      totalDoses: 180,
      storageLocation: "Tank A-Rack 3",
      temperature: "-196°C",
      viabilityTest: "85%",
      expiryDate: "2029-01-15",
      status: "Available"
    },
    {
      id: "FS002",
      batchNumber: "FS-2024-002", 
      freezingDate: "2024-01-10",
      straws: 38,
      dosesPerStraw: 4,
      totalDoses: 152,
      storageLocation: "Tank A-Rack 5",
      temperature: "-196°C",
      viabilityTest: "82%",
      expiryDate: "2029-01-10",
      status: "Available"
    },
    {
      id: "FS003",
      batchNumber: "FS-2024-003",
      freezingDate: "2024-01-05",
      straws: 25,
      dosesPerStraw: 4,
      totalDoses: 100,
      storageLocation: "Tank B-Rack 1",
      temperature: "-196°C",
      viabilityTest: "88%",
      expiryDate: "2029-01-05",
      status: "Reserved"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available': return 'default';
      case 'Reserved': return 'outline';
      case 'Used': return 'secondary';
      case 'Expired': return 'destructive';
      default: return 'secondary';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Snowflake className="h-5 w-5 text-blue-500" />
            <h3 className="text-xl font-semibold">Frozen Semen Inventory</h3>
          </div>
          <p className="text-muted-foreground">Manage cryopreserved semen storage and tracking</p>
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={() => onActionClick("add-frozen-batch", "Add Frozen Semen Batch")}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Batch
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search by batch number, location, or status..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">108</p>
              <p className="text-sm text-muted-foreground">Total Straws</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">432</p>
              <p className="text-sm text-muted-foreground">Total Doses</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">85%</p>
              <p className="text-sm text-muted-foreground">Avg Viability</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">3</p>
              <p className="text-sm text-muted-foreground">Storage Tanks</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Data Table */}
      <Card>
        <CardHeader>
          <CardTitle>Frozen Semen Inventory</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Batch Number</TableHead>
                <TableHead>Freezing Date</TableHead>
                <TableHead>Straws</TableHead>
                <TableHead>Total Doses</TableHead>
                <TableHead>Storage Location</TableHead>
                <TableHead>Viability</TableHead>
                <TableHead>Expiry Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {frozenSemenInventory.map((batch) => (
                <TableRow key={batch.id}>
                  <TableCell className="font-medium">{batch.batchNumber}</TableCell>
                  <TableCell>{batch.freezingDate}</TableCell>
                  <TableCell>{batch.straws}</TableCell>
                  <TableCell>{batch.totalDoses}</TableCell>
                  <TableCell>{batch.storageLocation}</TableCell>
                  <TableCell>{batch.viabilityTest}</TableCell>
                  <TableCell>{batch.expiryDate}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(batch.status)}>
                      {batch.status}
                    </Badge>
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

export default FrozenSemenInventoryTab;
