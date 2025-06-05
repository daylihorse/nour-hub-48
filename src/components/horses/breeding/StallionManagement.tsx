
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Plus, Search, Filter, Calendar, TrendingUp, Heart } from "lucide-react";

const StallionManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock stallion data
  const stallions = [
    {
      id: "1",
      horseId: "H001",
      horseName: "Thunder",
      status: "active",
      age: 8,
      breed: "Arabian",
      totalMares: 45,
      successfulBreedings: 38,
      livefoals: 35,
      successRate: 92.1,
      studFee: 5000,
      nextAvailable: "2024-01-08",
      bookings: 3,
    },
    {
      id: "2",
      horseId: "H002",
      horseName: "Lightning",
      status: "active",
      age: 6,
      breed: "Thoroughbred",
      totalMares: 28,
      successfulBreedings: 24,
      livefoals: 22,
      successRate: 91.7,
      studFee: 3500,
      nextAvailable: "2024-01-12",
      bookings: 2,
    },
    {
      id: "3",
      horseId: "H003",
      horseName: "Storm",
      status: "retired",
      age: 15,
      breed: "Arabian",
      totalMares: 120,
      successfulBreedings: 105,
      livefoals: 98,
      successRate: 93.3,
      studFee: 0,
      nextAvailable: "N/A",
      bookings: 0,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "default";
      case "retired":
        return "secondary";
      case "unavailable":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const filteredStallions = stallions.filter(stallion =>
    stallion.horseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stallion.breed.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Stallion Management</h2>
          <p className="text-muted-foreground">Manage breeding stallions and their performance</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Stallion
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
                  placeholder="Search stallions by name or breed..."
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

      {/* Stallion Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredStallions.map((stallion) => (
          <Card key={stallion.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{stallion.horseName}</CardTitle>
                <Badge variant={getStatusColor(stallion.status) as any}>
                  {stallion.status}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {stallion.breed} • Age {stallion.age}
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Performance Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{stallion.totalMares}</div>
                  <p className="text-xs text-muted-foreground">Total Mares</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{stallion.livefoals}</div>
                  <p className="text-xs text-muted-foreground">Live Foals</p>
                </div>
              </div>

              {/* Success Rate */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Success Rate</span>
                  <span className="text-sm font-bold text-green-600">{stallion.successRate}%</span>
                </div>
                <Progress value={stallion.successRate} className="h-2" />
              </div>

              {/* Breeding Info */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Stud Fee:</span>
                  <span className="font-medium">
                    {stallion.studFee > 0 ? `$${stallion.studFee.toLocaleString()}` : "Retired"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Next Available:</span>
                  <span className="font-medium">{stallion.nextAvailable}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Pending Bookings:</span>
                  <span className="font-medium">{stallion.bookings}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  View Details
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  Schedule
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Performance Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Overall Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Heart className="h-6 w-6 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">6</div>
              <p className="text-sm text-muted-foreground">Active Stallions</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <Calendar className="h-6 w-6 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-600">93</div>
              <p className="text-sm text-muted-foreground">Total Mares Served</p>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <TrendingUp className="h-6 w-6 text-orange-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-orange-600">92.1%</div>
              <p className="text-sm text-muted-foreground">Average Success Rate</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">85</div>
              <p className="text-sm text-muted-foreground">Expected Foals</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StallionManagement;
