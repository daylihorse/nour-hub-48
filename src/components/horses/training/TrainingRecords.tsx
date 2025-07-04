
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import RecordsViewSelector, { ViewMode, GridSize } from "../records/RecordsViewSelector";
import TrainingRecordsGridView from "./TrainingRecordsGridView";
import TrainingRecordsListView from "./TrainingRecordsListView";
import TrainingRecordsTableView from "./TrainingRecordsTableView";

interface TrainingSession {
  id: string;
  date: string;
  type: 'group' | 'individual' | 'assessment';
  trainer: string;
  duration: string;
  location: string;
  activities: string[];
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
}

interface TrainingRecordsProps {
  horseId?: string;
  horseName?: string;
  viewMode?: ViewMode;
  gridSize?: GridSize;
  onViewModeChange?: (mode: ViewMode) => void;
  onGridSizeChange?: (size: GridSize) => void;
}

const mockTrainingSessions: TrainingSession[] = [
  {
    id: '1',
    date: '2024-01-15',
    type: 'individual',
    trainer: 'Sarah Johnson',
    duration: '45 minutes',
    location: 'Arena A',
    activities: ['Ground work', 'Basic commands', 'Lead training'],
    status: 'completed',
    notes: 'Great progress with lead training. Horse is responding well to commands.'
  },
  {
    id: '2',
    date: '2024-01-18',
    type: 'group',
    trainer: 'Mike Wilson',
    duration: '60 minutes',
    location: 'Main Paddock',
    activities: ['Socialization', 'Group exercises', 'Obstacle course'],
    status: 'scheduled'
  },
  {
    id: '3',
    date: '2024-01-22',
    type: 'assessment',
    trainer: 'Dr. Emily Brown',
    duration: '30 minutes',
    location: 'Training Center',
    activities: ['Performance evaluation', 'Behavior assessment'],
    status: 'scheduled'
  }
];

const TrainingRecords = ({ 
  horseId, 
  horseName,
  viewMode: externalViewMode,
  gridSize: externalGridSize,
  onViewModeChange,
  onGridSizeChange
}: TrainingRecordsProps) => {
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
        return <TrainingRecordsGridView sessions={mockTrainingSessions} gridSize={currentGridSize} />;
      case "list":
        return <TrainingRecordsListView sessions={mockTrainingSessions} />;
      case "table":
        return <TrainingRecordsTableView sessions={mockTrainingSessions} />;
      default:
        return <TrainingRecordsGridView sessions={mockTrainingSessions} gridSize={currentGridSize} />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Training Records</h3>
          {horseName && (
            <p className="text-sm text-muted-foreground">Training sessions for {horseName}</p>
          )}
        </div>
        <div className="flex items-center gap-4">
          <RecordsViewSelector
            currentView={currentViewMode}
            onViewChange={handleViewModeChange}
            gridSize={currentGridSize}
            onGridSizeChange={handleGridSizeChange}
          />
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Schedule Session
          </Button>
        </div>
      </div>

      {renderView()}
    </div>
  );
};

export default TrainingRecords;
