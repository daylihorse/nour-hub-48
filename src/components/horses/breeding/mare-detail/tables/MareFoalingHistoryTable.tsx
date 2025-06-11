
import { useRecordSearch } from "../hooks/useRecordSearch";
import { useRecordActions } from "../hooks/useRecordActions";
import RecordHeader from "../components/RecordHeader";
import RecordSearch from "../components/RecordSearch";
import StatisticsCards from "../components/StatisticsCards";
import FoalingHistoryTable from "./foaling/FoalingHistoryTable";
import RecordCard from "../components/RecordCard";
import RecordListItem from "../components/RecordListItem";
import { Card, CardContent } from "@/components/ui/card";
import { mockFoalingHistory, foalingStatistics } from "./foaling/FoalingHistoryData";

interface MareFoalingHistoryTableProps {
  mareId: string;
  viewMode: 'grid' | 'list' | 'table';
  onViewModeChange: (mode: 'grid' | 'list' | 'table') => void;
  onActionClick: (type: 'checkup' | 'breeding' | 'health' | 'birth', title: string) => void;
}

const MareFoalingHistoryTable = ({ mareId, viewMode, onViewModeChange, onActionClick }: MareFoalingHistoryTableProps) => {
  const { searchTerm, setSearchTerm, filteredRecords } = useRecordSearch({
    records: mockFoalingHistory,
    searchFields: ['foalName', 'sire', 'veterinarian']
  });

  const { handleEdit, handleView, handleAddRecord } = useRecordActions({
    mareId,
    onActionClick
  });

  const handleAddFoaling = () => {
    handleAddRecord('birth', 'Record Birth');
  };

  const renderContent = () => {
    if (viewMode === 'table') {
      return (
        <FoalingHistoryTable
          records={filteredRecords}
          onEdit={(recordId) => handleEdit(recordId, 'foaling')}
          onView={(recordId) => handleView(recordId, 'foaling')}
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
              onEdit={() => handleEdit(record.id, 'foaling')}
              onView={() => handleView(record.id, 'foaling')}
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
              onEdit={() => handleEdit(record.id, 'foaling')}
              onView={() => handleView(record.id, 'foaling')}
            />
          ))}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <RecordHeader
        title="Foaling History"
        viewMode={viewMode}
        onViewModeChange={onViewModeChange}
        onAddRecord={handleAddFoaling}
        addButtonText="Record Birth"
        exportLabel="Export Records"
      />

      <RecordSearch
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        placeholder="Search by foal name, sire, or veterinarian..."
      />

      <StatisticsCards statistics={foalingStatistics} />

      {renderContent()}
    </div>
  );
};

export default MareFoalingHistoryTable;
