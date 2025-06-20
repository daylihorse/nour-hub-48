
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, MapPin, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const FacilityManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Facility Management</h2>
          <p className="text-muted-foreground">Manage training facilities and bookings</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Facility
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search facilities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <Card>
        <CardContent className="p-8 text-center">
          <MapPin className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium mb-2">Facility Management Coming Soon</h3>
          <p className="text-muted-foreground mb-4">
            Training facility management features will be available soon.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default FacilityManagement;
