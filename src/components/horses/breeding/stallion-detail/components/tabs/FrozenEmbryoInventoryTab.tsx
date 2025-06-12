
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Snowflake, 
  Calendar,
  Heart,
  Plus,
  Filter,
  Search,
  Download
} from "lucide-react";
import { useFrozenEmbryoManagement } from "../../hooks/useFrozenEmbryoManagement";

interface FrozenEmbryoInventoryTabProps {
  stallionId: string;
  onActionClick: (action: string, title: string) => void;
}

const FrozenEmbryoInventoryTab = ({ stallionId, onActionClick }: FrozenEmbryoInventoryTabProps) => {
  const { frozenEmbryos, filters, setFilters, exportData } = useFrozenEmbryoManagement(stallionId);
  const [searchTerm, setSearchTerm] = useState(filters.searchTerm || "");

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setFilters({ ...filters, searchTerm: value });
  };

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'Grade 1': return 'default';
      case 'Grade 2': return 'secondary';
      case 'Grade 3': return 'outline';
      default: return 'secondary';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Frozen Embryo Inventory</h3>
          <p className="text-muted-foreground">Cryopreserved embryo storage and tracking</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => exportData('csv')}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button 
            size="sm"
            onClick={() => onActionClick("freeze-embryo", "Freeze New Embryo")}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Embryo
          </Button>
        </div>
      </div>

      <div className="flex gap-4 items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search by ID, mare name, or tank..."
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
        {frozenEmbryos.map((embryo) => (
          <Card key={embryo.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Heart className="h-4 w-4 text-pink-500" />
                    {embryo.id}
                  </CardTitle>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Created: {embryo.creationDate}</span>
                    <span>•</span>
                    <span>Mare: {embryo.mareName}</span>
                  </div>
                </div>
                <Badge variant={getGradeColor(embryo.grade)}>
                  {embryo.grade}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <Snowflake className="h-4 w-4 text-blue-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Stage</p>
                    <p className="font-medium">{embryo.stage}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Viability</p>
                  <p className="font-medium">{embryo.viability}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Tank</p>
                  <p className="font-medium">{embryo.tank}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-medium">{embryo.location}</p>
                </div>
              </div>
              {embryo.diameter && (
                <div className="mt-2">
                  <p className="text-sm text-muted-foreground">Diameter: {embryo.diameter}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FrozenEmbryoInventoryTab;
