
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Plus } from "lucide-react";
import MareViewToggle from "./MareViewToggle";
import MareGridView from "./MareGridView";
import MareListView from "./MareListView";
import MareTableView from "./MareTableView";

interface Mare {
  id: string;
  horseId: string;
  horseName: string;
  status: string;
  age: number;
  breed: string;
  totalFoals: number;
  liveFoals: number;
  lastBreedingDate: string | null;
  expectedDueDate: string | null;
  pregnancyDay: number;
  nextHeat: string | null;
  stallionName: string | null;
  foalBirthDate?: string;
}

interface MareTableContainerProps {
  mares: Mare[];
}

const MareTableContainer = ({ mares }: MareTableContainerProps) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'table'>('grid');

  const handleAddMare = () => {
    console.log('Add new mare');
    // TODO: Implement add mare functionality
  };

  const handleExport = () => {
    console.log('Export mare data');
    // TODO: Implement export functionality
  };

  const renderContent = () => {
    switch (viewMode) {
      case 'grid':
        return <MareGridView mares={mares} />;
      case 'list':
        return <MareListView mares={mares} />;
      case 'table':
        return <MareTableView mares={mares} />;
      default:
        return <MareGridView mares={mares} />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with view toggle and actions */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">Mare Management</h2>
        <div className="flex items-center gap-4">
          <MareViewToggle currentView={viewMode} onViewChange={setViewMode} />
          <div className="flex gap-3">
            <Button variant="outline" onClick={handleExport} className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button onClick={handleAddMare} className="bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Mare
            </Button>
          </div>
        </div>
      </div>

      {/* Mare content based on view mode */}
      {renderContent()}
    </div>
  );
};

export default MareTableContainer;
