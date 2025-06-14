
import { Button } from "@/components/ui/button";
import { LayoutGrid, List, Table } from "lucide-react";

export type ViewMode = "grid" | "list" | "table";

interface ViewSelectorProps {
  currentView: ViewMode;
  onViewChange: (view: ViewMode) => void;
}

const ViewSelector = ({ currentView, onViewChange }: ViewSelectorProps) => {
  return (
    <div className="flex border rounded-md overflow-hidden">
      <Button
        variant={currentView === "grid" ? "secondary" : "ghost"}
        className={`rounded-none ${currentView === "grid" ? "" : "bg-background"}`}
        onClick={() => onViewChange("grid")}
        size="sm"
      >
        <LayoutGrid className="h-4 w-4 mr-1" />
        Grid
      </Button>
      
      <Button
        variant={currentView === "list" ? "secondary" : "ghost"}
        className={`rounded-none ${currentView === "list" ? "" : "bg-background"}`}
        onClick={() => onViewChange("list")}
        size="sm"
      >
        <List className="h-4 w-4 mr-1" />
        List
      </Button>
      
      <Button
        variant={currentView === "table" ? "secondary" : "ghost"}
        className={`rounded-none ${currentView === "table" ? "" : "bg-background"}`}
        onClick={() => onViewChange("table")}
        size="sm"
      >
        <Table className="h-4 w-4 mr-1" />
        Table
      </Button>
    </div>
  );
};

export default ViewSelector;
