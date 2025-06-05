
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, Filter, Calendar, Heart, Baby, AlertCircle } from "lucide-react";
import { BreedingRecord } from "@/types/breeding";
import AddBreedingRecordDialog from "./AddBreedingRecordDialog";
import BreedingRecordCard from "./BreedingRecordCard";

const BreedingRecords = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [showAddDialog, setShowAddDialog] = useState(false);

  // Mock breeding records data
  const breedingRecords: BreedingRecord[] = [
    {
      id: "BR001",
      horseId: "M001",
      horseName: "Bella",
      type: "breeding",
      status: "completed",
      mateId: "S001",
      mateName: "Thunder",
      breedingDate: new Date("2023-05-15"),
      breedingMethod: "natural",
      veterinarian: "Dr. Smith",
      notes: "Successful breeding session",
      cost: 5000,
      createdAt: new Date("2023-05-15"),
      updatedAt: new Date("2023-05-15"),
    },
    {
      id: "BR002",
      horseId: "M002",
      horseName: "Luna",
      type: "pregnancy",
      status: "active",
      pregnancyStartDate: new Date("2023-07-20"),
      expectedDueDate: new Date("2024-03-20"),
      pregnancyDuration: 180,
      veterinarian: "Dr. Johnson",
      notes: "Pregnancy progressing well",
      createdAt: new Date("2023-07-20"),
      updatedAt: new Date("2024-01-05"),
    },
    {
      id: "BR003",
      horseId: "M003",
      horseName: "Aurora",
      type: "breeding",
      status: "planned",
      mateId: "S002",
      mateName: "Lightning",
      breedingDate: new Date("2024-01-15"),
      breedingMethod: "artificial_insemination",
      veterinarian: "Dr. Smith",
      cost: 3500,
      createdAt: new Date("2024-01-05"),
      updatedAt: new Date("2024-01-05"),
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "default";
      case "active":
        return "secondary";
      case "planned":
        return "outline";
      case "cancelled":
        return "destructive";
      case "failed":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "breeding":
        return <Heart className="h-4 w-4" />;
      case "pregnancy":
        return <Baby className="h-4 w-4" />;
      case "birth":
        return <Calendar className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const filteredRecords = breedingRecords.filter(record => {
    const matchesSearch = record.horseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (record.mateName && record.mateName.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === "all" || record.status === statusFilter;
    const matchesType = typeFilter === "all" || record.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const stats = {
    total: breedingRecords.length,
    active: breedingRecords.filter(r => r.status === "active").length,
    completed: breedingRecords.filter(r => r.status === "completed").length,
    planned: breedingRecords.filter(r => r.status === "planned").length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Breeding Records</h2>
          <p className="text-muted-foreground">Track all breeding activities and outcomes</p>
        </div>
        <Button onClick={() => setShowAddDialog(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Record
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-sm text-muted-foreground">Total Records</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.active}</div>
            <p className="text-sm text-muted-foreground">Active</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
            <p className="text-sm text-muted-foreground">Completed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">{stats.planned}</div>
            <p className="text-sm text-muted-foreground">Planned</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search by horse or mate name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="planned">Planned</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="breeding">Breeding</SelectItem>
                <SelectItem value="pregnancy">Pregnancy</SelectItem>
                <SelectItem value="birth">Birth</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Records Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredRecords.map((record) => (
          <BreedingRecordCard 
            key={record.id} 
            record={record}
            statusColor={getStatusColor(record.status)}
            typeIcon={getTypeIcon(record.type)}
          />
        ))}
      </div>

      {filteredRecords.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No records found</h3>
            <p className="text-muted-foreground">
              No breeding records match your current filters.
            </p>
          </CardContent>
        </Card>
      )}

      <AddBreedingRecordDialog 
        open={showAddDialog} 
        onOpenChange={setShowAddDialog}
      />
    </div>
  );
};

export default BreedingRecords;
