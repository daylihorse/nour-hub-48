
import { useRecordSearch } from "../hooks/useRecordSearch";
import { useRecordActions } from "../hooks/useRecordActions";
import RecordHeader from "../components/RecordHeader";
import RecordSearch from "../components/RecordSearch";
import StatisticsCards from "../components/StatisticsCards";
import BreedingHistoryTable from "./breeding/BreedingHistoryTable";
import RecordCard from "../components/RecordCard";
import RecordListItem from "../components/RecordListItem";
import { Card, CardContent } from "@/components/ui/card";
import { mockBreedingHistory, breedingStatistics } from "./breeding/BreedingHistoryData";

interface MareBreedingHistoryTableProps {
  mareId: string;
  viewMode: 'grid' | 'list' | 'table';
  onViewModeChange: (mode: 'grid' | 'list' | 'table') => void;
  onActionClick: (type: 'checkup' | 'breeding' | 'health' | 'birth', title: string) => void;
}

const MareBreedingHistoryTable = ({ mareId, viewMode, onViewModeChange, onActionClick }: MareBreedingHistoryTableProps) => {
  const { searchTerm, setSearchTerm, filteredRecords } = useRecordSearch({
    records: mockBreedingHistory,
    searchFields: ['stallion', 'veterinarian', 'method']
  });

  const { handleEdit, handleView, handleAddRecord } = useRecordActions({
    mareId,
    onActionClick
  });

  const handleAddBreeding = () => {
    handleAddRecord('breeding', 'Schedule Breeding');
  };

  const renderContent = () => {
    if (viewMode === 'table') {
      return (
        <BreedingHistoryTable
          records={filteredRecords}
          onEdit={(recordId) => handleEdit(recordId, 'breeding')}
          onView={(recordId) => handleView(recordId, 'breeding')}
        />
      );
    }

    if (viewMode === 'grid') {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredRecords.map((record) => (
            <RecordCard
              key={record.id}
              record={record}
              onEdit={() => handleEdit(record.id, 'breeding')}
              onView={() => handleView(record.id, 'breeding')}
            />
          ))}
        </div>
      );
    }

    return (
      <Card>
        <CardContent className="p-0">
          {filteredRecords.map((record) => (
            <RecordListItem
              key={record.id}
              record={record}
              onEdit={() => handleEdit(record.id, 'breeding')}
              onView={() => handleView(record.id, 'breeding')}
            />
          ))}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <RecordHeader
        title="Breeding History"
        viewMode={viewMode}
        onViewModeChange={onViewModeChange}
        onAddRecord={handleAddBreeding}
        addButtonText="Add Breeding Record"
        exportLabel="Export"
      />

      <RecordSearch
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        placeholder="Search by stallion, veterinarian, or method..."
      />

      <StatisticsCards statistics={breedingStatistics} />

      {renderContent()}
    </div>
  );
};

export default MareBreedingHistoryTable;
