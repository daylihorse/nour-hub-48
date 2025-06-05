
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Plus, Search, Filter, Calendar, Baby, Heart } from "lucide-react";

const MareManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock mare data
  const mares = [
    {
      id: "1",
      horseId: "M001",
      horseName: "Bella",
      status: "pregnant",
      age: 7,
      breed: "Arabian",
      totalFoals: 3,
      liveFoals: 3,
      lastBreedingDate: "2023-05-15",
      expectedDueDate: "2024-01-15",
      pregnancyDay: 280,
      nextHeat: null,
      stallionName: "Thunder",
    },
    {
      id: "2",
      horseId: "M002",
      horseName: "Luna",
      status: "pregnant",
      age: 5,
      breed: "Thoroughbred",
      totalFoals: 1,
      liveFoals: 1,
      lastBreedingDate: "2023-07-20",
      expectedDueDate: "2024-03-20",
      pregnancyDay: 180,
      nextHeat: null,
      stallionName: "Lightning",
    },
    {
      id: "3",
      horseId: "M003",
      horseName: "Aurora",
      status: "open",
      age: 4,
      breed: "Arabian",
      totalFoals: 0,
      liveFoals: 0,
      lastBreedingDate: null,
      expectedDueDate: null,
      pregnancyDay: 0,
      nextHeat: "2024-01-10",
      stallionName: null,
    },
    {
      id: "4",
      horseId: "M004",
      horseName: "Storm",
      status: "nursing",
      age: 9,
      breed: "Warmblood",
      totalFoals: 4,
      liveFoals: 4,
      lastBreedingDate: "2023-02-10",
      expectedDueDate: null,
      pregnancyDay: 0,
      nextHeat: "2024-02-15",
      stallionName: null,
      foalBirthDate: "2023-12-15",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pregnant":
        return "default";
      case "open":
        return "secondary";
      case "nursing":
        return "outline";
      case "bred":
        return "destructive";
      case "retired":
        return "secondary";
      default:
        return "secondary";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pregnant":
        return <Baby className="h-4 w-4" />;
      case "nursing":
        return <Heart className="h-4 w-4" />;
      default:
        return <Calendar className="h-4 w-4" />;
    }
  };

  const filteredMares = mares.filter(mare =>
    mare.horseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mare.breed.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const calculatePregnancyProgress = (pregnancyDay: number) => {
    return Math.round((pregnancyDay / 340) * 100);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Mare Management</h2>
          <p className="text-muted-foreground">Manage breeding mares and pregnancy tracking</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Mare
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search mares by name or breed..."
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

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Baby className="h-6 w-6 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">7</div>
            <p className="text-sm text-muted-foreground">Pregnant Mares</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Heart className="h-6 w-6 text-pink-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">3</div>
            <p className="text-sm text-muted-foreground">Nursing Mares</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Calendar className="h-6 w-6 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">12</div>
            <p className="text-sm text-muted-foreground">Open Mares</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold">22</div>
            <p className="text-sm text-muted-foreground">Total Mares</p>
          </CardContent>
        </Card>
      </div>

      {/* Mare Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredMares.map((mare) => (
          <Card key={mare.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  {getStatusIcon(mare.status)}
                  {mare.horseName}
                </CardTitle>
                <Badge variant={getStatusColor(mare.status) as any}>
                  {mare.status}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {mare.breed} • Age {mare.age}
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Breeding History */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-xl font-bold text-blue-600">{mare.totalFoals}</div>
                  <p className="text-xs text-muted-foreground">Total Foals</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-xl font-bold text-green-600">{mare.liveFoals}</div>
                  <p className="text-xs text-muted-foreground">Live Foals</p>
                </div>
              </div>

              {/* Pregnancy Progress */}
              {mare.status === "pregnant" && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Pregnancy Progress</span>
                    <span className="text-sm font-bold">Day {mare.pregnancyDay}/340</span>
                  </div>
                  <Progress value={calculatePregnancyProgress(mare.pregnancyDay)} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    Due: {mare.expectedDueDate && formatDate(mare.expectedDueDate)}
                  </p>
                </div>
              )}

              {/* Breeding Information */}
              <div className="space-y-2 text-sm">
                {mare.stallionName && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sire:</span>
                    <span className="font-medium">{mare.stallionName}</span>
                  </div>
                )}
                {mare.lastBreedingDate && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Last Breeding:</span>
                    <span className="font-medium">{formatDate(mare.lastBreedingDate)}</span>
                  </div>
                )}
                {mare.nextHeat && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Next Heat:</span>
                    <span className="font-medium">{formatDate(mare.nextHeat)}</span>
                  </div>
                )}
                {mare.foalBirthDate && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Foal Born:</span>
                    <span className="font-medium">{formatDate(mare.foalBirthDate)}</span>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  View Details
                </Button>
                {mare.status === "open" && (
                  <Button size="sm" className="flex-1">
                    Schedule Breeding
                  </Button>
                )}
                {mare.status === "pregnant" && (
                  <Button variant="outline" size="sm" className="flex-1">
                    Checkup
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

export default MareManagement;
