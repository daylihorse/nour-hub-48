
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
import { Plus, Search, Download, Filter, Snowflake, Heart } from "lucide-react";

interface FrozenEmbryoInventoryTabProps {
  stallionId: string;
  onActionClick: (action: string, title: string) => void;
}

const FrozenEmbryoInventoryTab = ({ stallionId, onActionClick }: FrozenEmbryoInventoryTabProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data for frozen embryo inventory
  const frozenEmbryoInventory = [
    {
      id: "FE001",
      embryoId: "EMB-2024-001",
      mareId: "M001",
      mareName: "Royal Beauty",
      collectionDate: "2024-01-20",
      freezingDate: "2024-01-22",
      stage: "Blastocyst",
      grade: "Grade 1",
      storageLocation: "Tank C-Rack 2",
      temperature: "-196°C",
      viability: "95%",
      status: "Available"
    },
    {
      id: "FE002", 
      embryoId: "EMB-2024-002",
      mareId: "M002",
      mareName: "Golden Star",
      collectionDate: "2024-01-18",
      freezingDate: "2024-01-20",
      stage: "Expanded Blastocyst",
      grade: "Grade 1",
      storageLocation: "Tank C-Rack 4",
      temperature: "-196°C",
      viability: "92%",
      status: "Reserved"
    },
    {
      id: "FE003",
      embryoId: "EMB-2024-003",
      mareId: "M003", 
      mareName: "Silver Moon",
      collectionDate: "2024-01-15",
      freezingDate: "2024-01-17",
      stage: "Blastocyst",
      grade: "Grade 2",
      storageLocation: "Tank C-Rack 1",
      temperature: "-196°C",
      viability: "88%",
      status: "Available"
    }
  ];

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'Grade 1': return 'bg-green-100 text-green-800';
      case 'Grade 2': return 'bg-blue-100 text-blue-800';
      case 'Grade 3': return 'bg-yellow-100 text-yellow-800';
      case 'Grade 4': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available': return 'default';
      case 'Reserved': return 'outline';
      case 'Transferred': return 'secondary';
      case 'Used': return 'secondary';
      default: return 'secondary';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-pink-500" />
            <Snowflake className="h-4 w-4 text-blue-500" />
            <h3 className="text-xl font-semibold">Frozen Embryo Inventory</h3>
          </div>
          <p className="text-muted-foreground">Manage cryopreserved embryo storage and tracking</p>
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={() => onActionClick("add-frozen-embryo", "Add Frozen Embryo")}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Embryo
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
                  placeholder="Search by embryo ID, mare name, or storage location..."
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
              <p className="text-2xl font-bold text-pink-600">24</p>
              <p className="text-sm text-muted-foreground">Total Embryos</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">18</p>
              <p className="text-sm text-muted-foreground">Available</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">75%</p>
              <p className="text-sm text-muted-foreground">Grade 1 & 2</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">92%</p>
              <p className="text-sm text-muted-foreground">Avg Viability</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Data Table */}
      <Card>
        <CardHeader>
          <CardTitle>Frozen Embryo Inventory</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Embryo ID</TableHead>
                <TableHead>Mare</TableHead>
                <TableHead>Collection Date</TableHead>
                <TableHead>Freezing Date</TableHead>
                <TableHead>Stage</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Storage Location</TableHead>
                <TableHead>Viability</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {frozenEmbryoInventory.map((embryo) => (
                <TableRow key={embryo.id}>
                  <TableCell className="font-medium">{embryo.embryoId}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{embryo.mareName}</div>
                      <div className="text-sm text-muted-foreground">{embryo.mareId}</div>
                    </div>
                  </TableCell>
                  <TableCell>{embryo.collectionDate}</TableCell>
                  <TableCell>{embryo.freezingDate}</TableCell>
                  <TableCell>{embryo.stage}</TableCell>
                  <TableCell>
                    <Badge className={getGradeColor(embryo.grade)}>
                      {embryo.grade}
                    </Badge>
                  </TableCell>
                  <TableCell>{embryo.storageLocation}</TableCell>
                  <TableCell>{embryo.viability}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(embryo.status)}>
                      {embryo.status}
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

export default FrozenEmbryoInventoryTab;
