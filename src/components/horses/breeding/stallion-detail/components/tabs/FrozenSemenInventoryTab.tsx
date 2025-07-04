
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Filter, Download, LayoutGrid } from "lucide-react";
import { useFrozenSemenManagement } from "../../hooks/useFrozenSemenManagement";
import { GridSize } from "../../../components/GridSizeSelector";

interface FrozenSemenInventoryTabProps {
  stallionId: string;
}

const FrozenSemenInventoryTab = ({ stallionId }: FrozenSemenInventoryTabProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [gridSize, setGridSize] = useState<GridSize>(3);
  
  const {
    frozenSemen,
    filters,
    setFilters,
    exportData,
    updateFrozenSemen,
    deleteFrozenSemen
  } = useFrozenSemenManagement(stallionId);

  const filteredSemen = frozenSemen.filter(semen =>
    semen.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    semen.freezeDate.includes(searchTerm)
  );

  const handleAddSemen = () => {
    console.log("Add new frozen semen");
  };

  const handleExport = () => {
    exportData("csv");
  };

  const getGridColumns = () => {
    switch (gridSize) {
      case 2:
        return "grid-cols-1 lg:grid-cols-2";
      case 3:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
      case 4:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
      default:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with controls */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Frozen Semen Inventory</h2>
          <p className="text-muted-foreground">
            Manage frozen semen collection and storage
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button onClick={handleAddSemen}>
            <Plus className="h-4 w-4 mr-2" />
            Add Collection
          </Button>
        </div>
      </div>

      {/* Search and filters */}
      <div className="flex gap-4 items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search collections..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
        <div className="flex gap-1 border rounded-md p-1">
          <Button
            variant={viewMode === "grid" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setViewMode("grid")}
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
        </div>
        {viewMode === "grid" && (
          <div className="flex gap-1 border rounded-md p-1">
            <Button
              variant={gridSize === 2 ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setGridSize(2)}
            >
              2
            </Button>
            <Button
              variant={gridSize === 3 ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setGridSize(3)}
            >
              3
            </Button>
            <Button
              variant={gridSize === 4 ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setGridSize(4)}
            >
              4
            </Button>
          </div>
        )}
      </div>

      {/* Statistics cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Straws</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {filteredSemen.reduce((sum, s) => sum + s.straws, 0)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Available</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {filteredSemen.reduce((sum, s) => sum + s.straws, 0)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Used</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Collections</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredSemen.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Semen grid */}
      <div className={`grid ${getGridColumns()} gap-6`}>
        {filteredSemen.map((semen) => (
          <Card key={semen.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{semen.id}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Frozen: {semen.freezeDate}
                  </p>
                </div>
                <Badge variant={semen.quality === "Grade A" ? "default" : "secondary"}>
                  {semen.quality}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Straws:</span>
                  <span>{semen.straws}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Available:</span>
                  <span>{semen.straws}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Viability:</span>
                  <span>{semen.viability}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Location:</span>
                  <span>{semen.tank} - {semen.location}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FrozenSemenInventoryTab;
