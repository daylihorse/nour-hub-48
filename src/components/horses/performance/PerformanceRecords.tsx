
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, TrendingUp } from "lucide-react";
import RecordsViewSelector, { ViewMode, GridSize } from "../records/RecordsViewSelector";
import PerformanceRecordsGridView from "./PerformanceRecordsGridView";
import PerformanceRecordsListView from "./PerformanceRecordsListView";
import PerformanceRecordsTableView from "./PerformanceRecordsTableView";

interface PerformanceRecord {
  id: string;
  date: string;
  eventName: string;
  eventType: 'competition' | 'training' | 'assessment' | 'show';
  location: string;
  discipline: string;
  placement?: number;
  totalParticipants?: number;
  score?: number;
  time?: string;
  notes?: string;
  status: 'completed' | 'upcoming' | 'cancelled';
}

interface PerformanceRecordsProps {
  horseId?: string;
  horseName?: string;
  viewMode?: ViewMode;
  gridSize?: GridSize;
  onViewModeChange?: (mode: ViewMode) => void;
  onGridSizeChange?: (size: GridSize) => void;
}

const mockPerformanceRecords: PerformanceRecord[] = [
  {
    id: '1',
    date: '2024-01-25',
    eventName: 'Spring Show Jumping Championship',
    eventType: 'competition',
    location: 'Wellington Equestrian Center',
    discipline: 'Show Jumping',
    placement: 2,
    totalParticipants: 15,
    score: 85.5,
    time: '1:42.3',
    status: 'completed',
    notes: 'Excellent performance, minor fault at jump 8'
  },
  {
    id: '2',
    date: '2024-01-15',
    eventName: 'Dressage Training Session',
    eventType: 'training',
    location: 'Local Training Facility',
    discipline: 'Dressage',
    score: 78.2,
    status: 'completed',
    notes: 'Good improvement in collection and extension'
  },
  {
    id: '3',
    date: '2024-02-05',
    eventName: 'Regional Equestrian Championships',
    eventType: 'competition',
    location: 'State Fairgrounds',
    discipline: 'Cross Country',
    status: 'upcoming'
  }
];

const PerformanceRecords = ({ 
  horseId, 
  horseName,
  viewMode: externalViewMode,
  gridSize: externalGridSize,
  onViewModeChange,
  onGridSizeChange
}: PerformanceRecordsProps) => {
  const [internalViewMode, setInternalViewMode] = useState<ViewMode>("grid");
  const [internalGridSize, setInternalGridSize] = useState<GridSize>(3);

  const currentViewMode = externalViewMode ?? internalViewMode;
  const currentGridSize = externalGridSize ?? internalGridSize;

  const handleViewModeChange = (mode: ViewMode) => {
    if (onViewModeChange) {
      onViewModeChange(mode);
    } else {
      setInternalViewMode(mode);
    }
  };

  const handleGridSizeChange = (size: GridSize) => {
    if (onGridSizeChange) {
      onGridSizeChange(size);
    } else {
      setInternalGridSize(size);
    }
  };

  const renderView = () => {
    switch (currentViewMode) {
      case "grid":
        return <PerformanceRecordsGridView records={mockPerformanceRecords} gridSize={currentGridSize} />;
      case "list":
        return <PerformanceRecordsListView records={mockPerformanceRecords} />;
      case "table":
        return <PerformanceRecordsTableView records={mockPerformanceRecords} />;
      default:
        return <PerformanceRecordsGridView records={mockPerformanceRecords} gridSize={currentGridSize} />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Performance Records</h3>
          {horseName && (
            <p className="text-sm text-muted-foreground">Competition and training records for {horseName}</p>
          )}
        </div>
        <div className="flex items-center gap-4">
          <RecordsViewSelector
            currentView={currentViewMode}
            onViewChange={handleViewModeChange}
            gridSize={currentGridSize}
            onGridSizeChange={handleGridSizeChange}
          />
          <div className="flex gap-2">
            <Button variant="outline">
              <TrendingUp className="h-4 w-4 mr-2" />
              View Analytics
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Record
            </Button>
          </div>
        </div>
      </div>

      {renderView()}
    </div>
  );
};

export default PerformanceRecords;
