
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
import { Plus, Search, Download, Filter, Calendar } from "lucide-react";

interface BreedingRecordTabProps {
  stallionId: string;
  onActionClick: (action: string, title: string) => void;
}

const BreedingRecordTab = ({ stallionId, onActionClick }: BreedingRecordTabProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data for breeding records
  const breedingRecords = [
    {
      id: "BR001",
      mareId: "M001",
      mareName: "Royal Beauty",
      breedingDate: "2024-01-20",
      method: "Natural Cover",
      outcome: "Confirmed Pregnancy",
      pregnancyCheckDate: "2024-02-20",
      expectedDueDate: "2024-12-15",
      veterinarian: "Dr. Smith",
      notes: "Excellent breeding session",
      status: "Successful"
    },
    {
      id: "BR002",
      mareId: "M002", 
      mareName: "Golden Star",
      breedingDate: "2024-01-18",
      method: "Artificial Insemination",
      outcome: "Confirmed Pregnancy",
      pregnancyCheckDate: "2024-02-18",
      expectedDueDate: "2024-12-13",
      veterinarian: "Dr. Johnson",
      notes: "Used fresh semen",
      status: "Successful"
    },
    {
      id: "BR003",
      mareId: "M003",
      mareName: "Silver Moon",
      breedingDate: "2024-01-15",
      method: "Artificial Insemination",
      outcome: "Not Confirmed",
      pregnancyCheckDate: "2024-02-15",
      expectedDueDate: "",
      veterinarian: "Dr. Smith",
      notes: "Will retry next cycle",
      status: "Failed"
    },
    {
      id: "BR004",
      mareId: "M004",
      mareName: "Diamond Spirit",
      breedingDate: "2024-01-25",
      method: "Embryo Transfer",
      outcome: "Pending Check",
      pregnancyCheckDate: "2024-02-25",
      expectedDueDate: "",
      veterinarian: "Dr. Wilson",
      notes: "First ET attempt",
      status: "Pending"
    }
  ];

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'Natural Cover': return 'bg-green-100 text-green-800';
      case 'Artificial Insemination': return 'bg-blue-100 text-blue-800';
      case 'Embryo Transfer': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Successful': return 'default';
      case 'Failed': return 'destructive';
      case 'Pending': return 'outline';
      default: return 'secondary';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-green-500" />
            <h3 className="text-xl font-semibold">Breeding Records</h3>
          </div>
          <p className="text-muted-foreground">Track all breeding activities and outcomes</p>
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={() => onActionClick("add-breeding-record", "Add Breeding Record")}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Record
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
                  placeholder="Search by mare name, method, or veterinarian..."
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
              <p className="text-2xl font-bold text-blue-600">45</p>
              <p className="text-sm text-muted-foreground">Total Breedings</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">32</p>
              <p className="text-sm text-muted-foreground">Successful</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">71%</p>
              <p className="text-sm text-muted-foreground">Success Rate</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">28</p>
              <p className="text-sm text-muted-foreground">Expected Foals</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Data Table */}
      <Card>
        <CardHeader>
          <CardTitle>Breeding Activity Records</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Record ID</TableHead>
                <TableHead>Mare</TableHead>
                <TableHead>Breeding Date</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Outcome</TableHead>
                <TableHead>Check Date</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Veterinarian</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {breedingRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="font-medium">{record.id}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{record.mareName}</div>
                      <div className="text-sm text-muted-foreground">{record.mareId}</div>
                    </div>
                  </TableCell>
                  <TableCell>{record.breedingDate}</TableCell>
                  <TableCell>
                    <Badge className={getMethodColor(record.method)}>
                      {record.method}
                    </Badge>
                  </TableCell>
                  <TableCell>{record.outcome}</TableCell>
                  <TableCell>{record.pregnancyCheckDate}</TableCell>
                  <TableCell>{record.expectedDueDate || "N/A"}</TableCell>
                  <TableCell>{record.veterinarian}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(record.status)}>
                      {record.status}
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

export default BreedingRecordTab;
