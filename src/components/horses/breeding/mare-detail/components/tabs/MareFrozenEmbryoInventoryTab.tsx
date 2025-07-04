
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Filter, Download, LayoutGrid, List, Table2 } from "lucide-react";
import { useMareFrozenEmbryoManagement } from "../../hooks/useMareFrozenEmbryoManagement";
import { GridSize } from "../../../components/GridSizeSelector";
import MareFrozenEmbryoGridView from "./MareFrozenEmbryoGridView";
import MareFrozenEmbryoListView from "./MareFrozenEmbryoListView";
import MareFrozenEmbryoTableView from "./MareFrozenEmbryoTableView";

interface MareFrozenEmbryoInventoryTabProps {
  mareId?: string;
}

type ViewMode = "grid" | "list" | "table";

const MareFrozenEmbryoInventoryTab = ({ mareId }: MareFrozenEmbryoInventoryTabProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
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
  } = useMareFrozenEmbryoManagement(mareId);

  const filteredEmbryos = frozenEmbryos.filter(embryo =>
    embryo.mareName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    embryo.stallionName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    embryo.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddEmbryo = () => {
    console.log("Add new frozen embryo");
  };

  const handleExport = () => {
    exportData("csv");
  };

  const handleEdit = (record: any) => {
    console.log("Edit embryo record:", record);
  };

  const handleDelete = (record: any) => {
    console.log("Delete embryo record:", record);
  };

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case "Grade 1":
        return "default" as const;
      case "Grade 2":
        return "secondary" as const;
      default:
        return "outline" as const;
    }
  };

  const renderView = () => {
    const commonProps = {
      frozenEmbryos: filteredEmbryos,
      onEdit: handleEdit,
      onDelete: handleDelete,
      getGradeColor
    };

    switch (viewMode) {
      case "grid":
        return <MareFrozenEmbryoGridView {...commonProps} gridSize={gridSize} />;
      case "list":
        return <MareFrozenEmbryoListView {...commonProps} />;
      case "table":
        return <MareFrozenEmbryoTableView {...commonProps} />;
      default:
        return <MareFrozenEmbryoGridView {...commonProps} gridSize={gridSize} />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with controls */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Frozen Embryo Inventory</h2>
          <p className="text-muted-foreground">
            Manage frozen embryo collection and transfers
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
          <Button
            variant={viewMode === "list" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setViewMode("list")}
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "table" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setViewMode("table")}
          >
            <Table2 className="h-4 w-4" />
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
            <CardTitle className="text-sm font-medium">Transferred</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {filteredEmbryos.filter(e => e.transferDate).length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Embryos view */}
      {isLoading ? (
        <div className="text-center py-8">Loading...</div>
      ) : (
        renderView()
      )}
    </div>
  );
};

export default MareFrozenEmbryoInventoryTab;
