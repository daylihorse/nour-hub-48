
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
import { Plus, Search, Download, Filter } from "lucide-react";

interface CollectedSemenTabProps {
  stallionId: string;
  onActionClick: (action: string, title: string) => void;
}

const CollectedSemenTab = ({ stallionId, onActionClick }: CollectedSemenTabProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data for collected semen
  const semenCollections = [
    {
      id: "CS001",
      collectionDate: "2024-01-15",
      volume: "85ml",
      concentration: "450M/ml",
      motility: "85%",
      morphology: "92%",
      quality: "Excellent",
      technician: "Dr. Smith",
      status: "Available"
    },
    {
      id: "CS002", 
      collectionDate: "2024-01-10",
      volume: "92ml",
      concentration: "420M/ml",
      motility: "88%",
      morphology: "89%",
      quality: "Very Good",
      technician: "Dr. Johnson",
      status: "Used"
    },
    {
      id: "CS003",
      collectionDate: "2024-01-05",
      volume: "78ml",
      concentration: "380M/ml", 
      motility: "82%",
      morphology: "87%",
      quality: "Good",
      technician: "Dr. Smith",
      status: "Available"
    }
  ];

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case 'Excellent': return 'bg-green-100 text-green-800';
      case 'Very Good': return 'bg-blue-100 text-blue-800';
      case 'Good': return 'bg-yellow-100 text-yellow-800';
      case 'Fair': return 'bg-orange-100 text-orange-800';
      case 'Poor': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available': return 'default';
      case 'Used': return 'secondary';
      case 'Reserved': return 'outline';
      default: return 'secondary';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-xl font-semibold">Collected Semen Records</h3>
          <p className="text-muted-foreground">Manage fresh semen collections and quality assessments</p>
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={() => onActionClick("add-collection", "Add New Semen Collection")}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Collection
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
                  placeholder="Search by collection ID, date, or technician..."
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
              <p className="text-2xl font-bold text-blue-600">15</p>
              <p className="text-sm text-muted-foreground">Total Collections</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">8</p>
              <p className="text-sm text-muted-foreground">Available</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">86%</p>
              <p className="text-sm text-muted-foreground">Avg Motility</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">420M/ml</p>
              <p className="text-sm text-muted-foreground">Avg Concentration</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Data Table */}
      <Card>
        <CardHeader>
          <CardTitle>Semen Collection Records</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Collection ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Volume</TableHead>
                <TableHead>Concentration</TableHead>
                <TableHead>Motility</TableHead>
                <TableHead>Morphology</TableHead>
                <TableHead>Quality</TableHead>
                <TableHead>Technician</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {semenCollections.map((collection) => (
                <TableRow key={collection.id}>
                  <TableCell className="font-medium">{collection.id}</TableCell>
                  <TableCell>{collection.collectionDate}</TableCell>
                  <TableCell>{collection.volume}</TableCell>
                  <TableCell>{collection.concentration}</TableCell>
                  <TableCell>{collection.motility}</TableCell>
                  <TableCell>{collection.morphology}</TableCell>
                  <TableCell>
                    <Badge className={getQualityColor(collection.quality)}>
                      {collection.quality}
                    </Badge>
                  </TableCell>
                  <TableCell>{collection.technician}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(collection.status)}>
                      {collection.status}
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

export default CollectedSemenTab;
