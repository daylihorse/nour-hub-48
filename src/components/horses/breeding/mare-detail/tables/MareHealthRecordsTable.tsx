
import { useRecordSearch } from "../hooks/useRecordSearch";
import { useRecordActions } from "../hooks/useRecordActions";
import RecordHeader from "../components/RecordHeader";
import RecordSearch from "../components/RecordSearch";
import StatisticsCards from "../components/StatisticsCards";
import HealthRecordsTable from "./health/HealthRecordsTable";
import RecordCard from "../components/RecordCard";
import RecordListItem from "../components/RecordListItem";
import { Card, CardContent } from "@/components/ui/card";
import { mockHealthRecords, healthStatistics } from "./health/HealthRecordsData";

interface MareHealthRecordsTableProps {
  mareId: string;
  viewMode: 'grid' | 'list' | 'table';
  onViewModeChange: (mode: 'grid' | 'list' | 'table') => void;
  onActionClick: (type: 'checkup' | 'breeding' | 'health' | 'birth', title: string) => void;
}

const MareHealthRecordsTable = ({ mareId, viewMode, onViewModeChange, onActionClick }: MareHealthRecordsTableProps) => {
  const { searchTerm, setSearchTerm, filteredRecords } = useRecordSearch({
    records: mockHealthRecords,
    searchFields: ['type', 'veterinarian', 'findings']
  });

  const { handleEdit, handleView, handleAddRecord } = useRecordActions({
    mareId,
    onActionClick
  });

  const handleAddHealthRecord = () => {
    handleAddRecord('health', 'Add Health Record');
  };

  const renderContent = () => {
    if (viewMode === 'table') {
      return (
        <HealthRecordsTable
          records={filteredRecords}
          onEdit={(recordId) => handleEdit(recordId, 'health')}
          onView={(recordId) => handleView(recordId, 'health')}
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
              onEdit={() => handleEdit(record.id, 'health')}
              onView={() => handleView(record.id, 'health')}
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
              onEdit={() => handleEdit(record.id, 'health')}
              onView={() => handleView(record.id, 'health')}
            />
          ))}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <RecordHeader
        title="Health Records"
        viewMode={viewMode}
        onViewModeChange={onViewModeChange}
        onAddRecord={handleAddHealthRecord}
        addButtonText="Add Health Record"
        exportLabel="Export Records"
      />

      <RecordSearch
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        placeholder="Search by type, veterinarian, or findings..."
      />

      <StatisticsCards statistics={healthStatistics} />

      {renderContent()}
    </div>
  );
};

export default MareHealthRecordsTable;
