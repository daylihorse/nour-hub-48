
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, Search, AlertTriangle, Baby, Plus } from "lucide-react";

const ExpectedFoalings = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const expectedFoalings = [
    {
      id: "1",
      mareName: "Bella",
      stallionName: "Thunder",
      breedingDate: "2023-05-15",
      expectedDate: "2024-01-15",
      currentDay: 332,
      totalDays: 340,
      status: "due_soon",
      veterinarian: "Dr. Smith",
      lastCheckup: "2024-01-05",
      notes: "Mare showing signs of preparation",
    },
    {
      id: "2",
      mareName: "Luna",
      stallionName: "Lightning",
      breedingDate: "2023-07-20",
      expectedDate: "2024-03-20",
      currentDay: 325,
      totalDays: 340,
      status: "monitoring",
      veterinarian: "Dr. Johnson",
      lastCheckup: "2024-01-03",
      notes: "Pregnancy progressing normally",
    },
    {
      id: "3",
      mareName: "Storm",
      stallionName: "Thunder",
      breedingDate: "2023-03-10",
      expectedDate: "2024-01-05",
      currentDay: 342,
      totalDays: 340,
      status: "overdue",
      veterinarian: "Dr. Smith",
      lastCheckup: "2024-01-06",
      notes: "Monitoring closely for signs of labor",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "due_soon":
        return "default";
      case "overdue":
        return "destructive";
      case "monitoring":
        return "secondary";
      default:
        return "secondary";
    }
  };

  const calculateProgress = (currentDay: number, totalDays: number) => {
    return Math.min((currentDay / totalDays) * 100, 100);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const filteredFoalings = expectedFoalings.filter(foaling => {
    const matchesSearch = foaling.mareName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         foaling.stallionName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || foaling.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Expected Foalings</h2>
          <p className="text-muted-foreground">Monitor upcoming births and pregnancy progress</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Expected Foaling
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Calendar className="h-6 w-6 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">{expectedFoalings.length}</div>
            <p className="text-sm text-muted-foreground">Total Expected</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Baby className="h-6 w-6 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-600">
              {expectedFoalings.filter(f => f.status === "due_soon").length}
            </div>
            <p className="text-sm text-muted-foreground">Due Soon</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <AlertTriangle className="h-6 w-6 text-red-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-red-600">
              {expectedFoalings.filter(f => f.status === "overdue").length}
            </div>
            <p className="text-sm text-muted-foreground">Overdue</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {expectedFoalings.filter(f => f.status === "monitoring").length}
            </div>
            <p className="text-sm text-muted-foreground">Monitoring</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search by mare or stallion name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button 
                variant={statusFilter === "all" ? "default" : "outline"}
                onClick={() => setStatusFilter("all")}
              >
                All
              </Button>
              <Button 
                variant={statusFilter === "due_soon" ? "default" : "outline"}
                onClick={() => setStatusFilter("due_soon")}
              >
                Due Soon
              </Button>
              <Button 
                variant={statusFilter === "overdue" ? "default" : "outline"}
                onClick={() => setStatusFilter("overdue")}
              >
                Overdue
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Expected Foalings List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredFoalings.map((foaling) => (
          <Card key={foaling.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{foaling.mareName}</CardTitle>
                <Badge variant={getStatusColor(foaling.status) as any}>
                  {foaling.status.replace('_', ' ')}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Sire: {foaling.stallionName}
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Pregnancy Progress */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Pregnancy Progress</span>
                  <span className="text-sm font-bold">Day {foaling.currentDay}/{foaling.totalDays}</span>
                </div>
                <Progress value={calculateProgress(foaling.currentDay, foaling.totalDays)} className="h-2" />
              </div>

              {/* Details */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Expected Date:</span>
                  <span className="font-medium">{formatDate(foaling.expectedDate)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Breeding Date:</span>
                  <span className="font-medium">{formatDate(foaling.breedingDate)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Veterinarian:</span>
                  <span className="font-medium">{foaling.veterinarian}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last Checkup:</span>
                  <span className="font-medium">{formatDate(foaling.lastCheckup)}</span>
                </div>
              </div>

              {/* Notes */}
              {foaling.notes && (
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">Notes:</p>
                  <p className="text-sm">{foaling.notes}</p>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  View Details
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  Schedule Checkup
                </Button>
                {foaling.status === "due_soon" && (
                  <Button size="sm" className="flex-1">
                    Record Birth
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ExpectedFoalings;
