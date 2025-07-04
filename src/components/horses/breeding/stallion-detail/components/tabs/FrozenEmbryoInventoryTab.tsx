
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Filter, Download, LayoutGrid } from "lucide-react";
import { useFrozenEmbryoManagement } from "../../hooks/useFrozenEmbryoManagement";
import { GridSize } from "../../../components/GridSizeSelector";

interface FrozenEmbryoInventoryTabProps {
  stallionId: string;
}

const FrozenEmbryoInventoryTab = ({ stallionId }: FrozenEmbryoInventoryTabProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [gridSize, setGridSize] = useState<GridSize>(3);
  
  const {
    frozenEmbryos,
    filters,
    setFilters,
    isLoading,
    addFrozenEmbryo,
    updateFrozenEmbryo,
    deleteFrozenEmbryo,
    exportData
  } = useFrozenEmbryoManagement(stallionId);

  const filteredEmbryos = frozenEmbryos.filter(embryo =>
    embryo.mareName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    embryo.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddEmbryo = () => {
    console.log("Add new frozen embryo");
  };

  const handleExport = () => {
    exportData();
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
          <h2 className="text-2xl font-bold">Frozen Embryo Inventory</h2>
          <p className="text-muted-foreground">
            Manage frozen embryo collection and storage
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button onClick={handleAddEmbryo}>
            <Plus className="h-4 w-4 mr-2" />
            Add Embryo
          </Button>
        </div>
      </div>

      {/* Search and filters */}
      <div className="flex gap-4 items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search embryos..."
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
            <CardTitle className="text-sm font-medium">Total Embryos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredEmbryos.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Grade 1</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {filteredEmbryos.filter(e => e.grade === "Grade 1").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Grade 2</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {filteredEmbryos.filter(e => e.grade === "Grade 2").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Available</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {filteredEmbryos.length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Embryos grid */}
      {isLoading ? (
        <div className="text-center py-8">Loading...</div>
      ) : (
        <div className={`grid ${getGridColumns()} gap-6`}>
          {filteredEmbryos.map((embryo) => (
            <Card key={embryo.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{embryo.id}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {embryo.mareName}
                    </p>
                  </div>
                  <Badge variant={embryo.grade === "Grade 1" ? "default" : "secondary"}>
                    {embryo.grade}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Created:</span>
                    <span>{embryo.creationDate}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Stage:</span>
                    <span>{embryo.stage}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Viability:</span>
                    <span>{embryo.viability}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Location:</span>
                    <span>{embryo.tank} - {embryo.location}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default FrozenEmbryoInventoryTab;
