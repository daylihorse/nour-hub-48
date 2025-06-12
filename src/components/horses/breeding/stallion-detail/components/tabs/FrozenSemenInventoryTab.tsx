
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Snowflake, 
  Calendar,
  MapPin,
  Plus,
  Filter,
  Search,
  Download
} from "lucide-react";
import { useFrozenSemenManagement } from "../../hooks/useFrozenSemenManagement";

interface FrozenSemenInventoryTabProps {
  stallionId: string;
  onActionClick: (action: string, title: string) => void;
}

const FrozenSemenInventoryTab = ({ stallionId, onActionClick }: FrozenSemenInventoryTabProps) => {
  const { frozenSemen, filters, setFilters, exportData } = useFrozenSemenManagement(stallionId);
  const [searchTerm, setSearchTerm] = useState(filters.searchTerm || "");

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setFilters({ ...filters, searchTerm: value });
  };

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case 'Grade A': return 'default';
      case 'Grade B': return 'secondary';
      case 'Grade C': return 'outline';
      default: return 'secondary';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Frozen Semen Inventory</h3>
          <p className="text-muted-foreground">Cryopreserved semen storage and tracking</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => exportData('csv')}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button 
            size="sm"
            onClick={() => onActionClick("freeze-semen", "Freeze New Semen")}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Semen
          </Button>
        </div>
      </div>

      <div className="flex gap-4 items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search by ID, tank, or location..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>

      <div className="grid gap-4">
        {frozenSemen.map((semen) => (
          <Card key={semen.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Snowflake className="h-4 w-4 text-blue-500" />
                    {semen.id}
                  </CardTitle>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Frozen: {semen.freezeDate}</span>
                    <span>•</span>
                    <span>Expires: {semen.expiry}</span>
                  </div>
                </div>
                <Badge variant={getQualityColor(semen.quality)}>
                  {semen.quality}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Straws</p>
                  <p className="font-medium">{semen.straws}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Viability</p>
                  <p className="font-medium">{semen.viability}</p>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Tank</p>
                    <p className="font-medium">{semen.tank}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-medium">{semen.location}</p>
                </div>
              </div>
              {semen.batchNumber && (
                <div className="mt-2">
                  <p className="text-sm text-muted-foreground">Batch: {semen.batchNumber}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FrozenSemenInventoryTab;
