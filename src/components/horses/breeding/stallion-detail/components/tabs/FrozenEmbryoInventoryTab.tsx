
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Plus,
  Filter,
  Search,
  Download,
  Heart
} from "lucide-react";
import ViewSelector, { ViewMode } from "../../../components/ViewSelector";
import { GridSize } from "../../../components/GridSizeSelector";

interface FrozenEmbryoInventoryTabProps {
  stallionId: string;
  onActionClick: (action: string, title: string) => void;
}

const FrozenEmbryoInventoryTab = ({ stallionId, onActionClick }: FrozenEmbryoInventoryTabProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [gridSize, setGridSize] = useState<GridSize>(3);

  // Mock data for demonstration
  const frozenEmbryos = [
    {
      id: "FE001",
      freezeDate: "2024-01-20",
      mareId: "M001",
      mareName: "Bella Star",
      stage: "Blastocyst",
      quality: "Grade A",
      viability: "98%",
      tank: "Tank E-1",
      location: "Section 1A",
      expiry: "2029-01-20"
    }
  ];

  const getGridColumns = () => {
    switch (gridSize) {
      case 2:
        return "grid-cols-1 md:grid-cols-2";
      case 3:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
      case 4:
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
      default:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
    }
  };

  const renderGridView = () => (
    <div className={`grid ${getGridColumns()} gap-4`}>
      {frozenEmbryos.map((embryo) => (
        <Card key={embryo.id}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-base flex items-center gap-2">
                  <Heart className="h-4 w-4 text-pink-500" />
                  {embryo.id}
                </CardTitle>
                <div className="text-sm text-muted-foreground">
                  <span>Frozen: {embryo.freezeDate}</span>
                  <span> • </span>
                  <span>Expires: {embryo.expiry}</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <p className="text-sm text-muted-foreground">Mare</p>
                <p className="font-medium">{embryo.mareName}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Stage</p>
                  <p className="font-medium">{embryo.stage}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Quality</p>
                  <p className="font-medium">{embryo.quality}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Viability</p>
                  <p className="font-medium">{embryo.viability}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Tank</p>
                  <p className="font-medium">{embryo.tank}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderView = () => {
    switch (viewMode) {
      case "grid":
        return renderGridView();
      case "list":
        return <div className="text-center py-8 text-muted-foreground">List view coming soon</div>;
      case "table":
        return <div className="text-center py-8 text-muted-foreground">Table view coming soon</div>;
      default:
        return renderGridView();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Frozen Embryo Inventory</h3>
          <p className="text-muted-foreground">Manage frozen embryo storage and tracking</p>
        </div>
        <div className="flex gap-2">
          <ViewSelector
            currentView={viewMode}
            onViewChange={setViewMode}
            gridSize={gridSize}
            onGridSizeChange={setGridSize}
          />
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button 
            size="sm"
            onClick={() => onActionClick("new-frozen-embryo", "Add Frozen Embryo")}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Inventory
          </Button>
        </div>
      </div>

      <div className="flex gap-4 items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search by ID, mare, tank..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>

      {renderView()}
    </div>
  );
};

export default FrozenEmbryoInventoryTab;
