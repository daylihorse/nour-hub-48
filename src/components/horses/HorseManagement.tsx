
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";

const HorseManagement = () => {
  const horses = [
    {
      id: 1,
      name: "Thunder",
      breed: "Arabian",
      age: 8,
      gender: "Stallion",
      status: "Healthy",
      location: "Stable A-1",
      owner: "Ahmed Hassan"
    },
    {
      id: 2,
      name: "Bella",
      breed: "Thoroughbred",
      age: 5,
      gender: "Mare",
      status: "In Training",
      location: "Training Arena",
      owner: "Sara Ahmed"
    },
    {
      id: 3,
      name: "Shadow",
      breed: "Quarter Horse",
      age: 12,
      gender: "Gelding",
      status: "Healthy",
      location: "Stable B-3",
      owner: "Mohamed Ali"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Healthy":
        return "bg-green-100 text-green-800";
      case "In Training":
        return "bg-blue-100 text-blue-800";
      case "Medical Care":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Horse Registry</h3>
          <p className="text-sm text-muted-foreground">Manage all horses in the facility</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add New Horse
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search horses..." className="pl-8" />
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </div>

      {/* Horse List */}
      <Card>
        <CardHeader>
          <CardTitle>Current Horses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {horses.map((horse) => (
              <div key={horse.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    🐎
                  </div>
                  <div>
                    <h4 className="font-medium">{horse.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {horse.breed} • {horse.age} years • {horse.gender}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(horse.status)}`}>
                    {horse.status}
                  </span>
                  <div className="text-right">
                    <p className="text-sm font-medium">{horse.location}</p>
                    <p className="text-xs text-muted-foreground">Owner: {horse.owner}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HorseManagement;
