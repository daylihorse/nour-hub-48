
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, FileText } from "lucide-react";
import RecordsViewSelector, { ViewMode, GridSize } from "../records/RecordsViewSelector";
import HealthRecordsGridView from "./HealthRecordsGridView";
import HealthRecordsListView from "./HealthRecordsListView";
import HealthRecordsTableView from "./HealthRecordsTableView";

interface HealthRecord {
  id: string;
  date: string;
  type: 'checkup' | 'vaccination' | 'treatment' | 'surgery' | 'dental';
  veterinarian: string;
  description: string;
  diagnosis?: string;
  treatment?: string;
  medications?: string[];
  nextAppointment?: string;
  status: 'completed' | 'ongoing' | 'follow_up_required';
}

interface HealthRecordsProps {
  horseId?: string;
  horseName?: string;
  viewMode?: ViewMode;
  gridSize?: GridSize;
  onViewModeChange?: (mode: ViewMode) => void;
  onGridSizeChange?: (size: GridSize) => void;
}

const mockHealthRecords: HealthRecord[] = [
  {
    id: '1',
    date: '2024-01-20',
    type: 'checkup',
    veterinarian: 'Dr. Smith',
    description: 'Routine health examination',
    diagnosis: 'Overall health is good',
    treatment: 'Continue current care routine',
    status: 'completed'
  },
  {
    id: '2',
    date: '2024-01-10',
    type: 'vaccination',
    veterinarian: 'Dr. Johnson',
    description: 'Annual vaccinations',
    medications: ['Tetanus vaccine', 'West Nile vaccine', 'Eastern Equine Encephalitis'],
    nextAppointment: '2025-01-10',
    status: 'completed'
  },
  {
    id: '3',
    date: '2024-01-05',
    type: 'treatment',
    veterinarian: 'Dr. Brown',
    description: 'Minor leg injury treatment',
    diagnosis: 'Superficial laceration on left foreleg',
    treatment: 'Wound cleaning and bandaging',
    medications: ['Antibiotic ointment', 'Pain relief'],
    status: 'follow_up_required'
  }
];

const HealthRecords = ({ 
  horseId, 
  horseName,
  viewMode: externalViewMode,
  gridSize: externalGridSize,
  onViewModeChange,
  onGridSizeChange
}: HealthRecordsProps) => {
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
        return <HealthRecordsGridView records={mockHealthRecords} gridSize={currentGridSize} />;
      case "list":
        return <HealthRecordsListView records={mockHealthRecords} />;
      case "table":
        return <HealthRecordsTableView records={mockHealthRecords} />;
      default:
        return <HealthRecordsGridView records={mockHealthRecords} gridSize={currentGridSize} />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Health Records</h3>
          {horseName && (
            <p className="text-sm text-muted-foreground">Medical history for {horseName}</p>
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
              <FileText className="h-4 w-4 mr-2" />
              Export Records
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

export default HealthRecords;
