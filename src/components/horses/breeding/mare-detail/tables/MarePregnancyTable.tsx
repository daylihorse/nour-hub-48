
import { useRecordSearch } from "../hooks/useRecordSearch";
import { useRecordActions } from "../hooks/useRecordActions";
import RecordHeader from "../components/RecordHeader";
import RecordSearch from "../components/RecordSearch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Baby, Activity } from "lucide-react";

// Mock pregnancy data
const mockPregnancyRecords = [
  {
    id: "1",
    title: "Current Pregnancy",
    stallion: "Thunder Storm",
    breedingDate: "2023-07-20",
    expectedDueDate: "2024-04-15",
    pregnancyDay: 280,
    status: "Active",
    lastCheckup: "2024-01-10",
    veterinarian: "Dr. Sarah Wilson"
  }
];

interface MarePregnancyTableProps {
  mareId: string;
  viewMode: 'grid' | 'list' | 'table';
  onViewModeChange: (mode: 'grid' | 'list' | 'table') => void;
  onActionClick: (type: 'checkup' | 'breeding' | 'health' | 'birth', title: string) => void;
}

const MarePregnancyTable = ({ mareId, viewMode, onViewModeChange, onActionClick }: MarePregnancyTableProps) => {
  const { searchTerm, setSearchTerm, filteredRecords } = useRecordSearch({
    records: mockPregnancyRecords,
    searchFields: ['stallion', 'veterinarian', 'status']
  });

  const { handleAddRecord } = useRecordActions({
    mareId,
    onActionClick
  });

  const handleAddPregnancy = () => {
    handleAddRecord('checkup', 'Record Pregnancy');
  };

  return (
    <div className="space-y-6">
      <RecordHeader
        title="Pregnancy Records"
        viewMode={viewMode}
        onViewModeChange={onViewModeChange}
        onAddRecord={handleAddPregnancy}
        addButtonText="Add Pregnancy Record"
        exportLabel="Export"
      />

      <RecordSearch
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        placeholder="Search by stallion, veterinarian, or status..."
      />

      <div className="space-y-4">
        {filteredRecords.map((record) => (
          <Card key={record.id}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Baby className="h-5 w-5 text-blue-500" />
                {record.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Activity className="h-4 w-4 text-purple-500" />
                    <span className="text-sm">Stallion: {record.stallion}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Breeding Date: {new Date(record.breedingDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">Expected Due: {new Date(record.expectedDueDate).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm text-muted-foreground">Pregnancy Day: </span>
                    <Badge variant="outline">{record.pregnancyDay}</Badge>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Status: </span>
                    <Badge className="bg-blue-500">{record.status}</Badge>
                  </div>
                  <div className="text-sm">
                    <span className="text-muted-foreground">Veterinarian: </span>
                    {record.veterinarian}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MarePregnancyTable;
