
import { useRecordSearch } from "../hooks/useRecordSearch";
import { useRecordActions } from "../hooks/useRecordActions";
import RecordHeader from "../components/RecordHeader";
import RecordSearch from "../components/RecordSearch";
import StatisticsCards from "../components/StatisticsCards";
import HeatCycleTable from "./heat-cycle/HeatCycleTable";
import RecordCard from "../components/RecordCard";
import RecordListItem from "../components/RecordListItem";
import { Card, CardContent } from "@/components/ui/card";
import { mockHeatCycles, heatCycleStatistics } from "./heat-cycle/HeatCycleData";

interface MareHeatCycleTableProps {
  mareId: string;
  viewMode: 'grid' | 'list' | 'table';
  onViewModeChange: (mode: 'grid' | 'list' | 'table') => void;
  onActionClick: (type: 'checkup' | 'breeding' | 'health' | 'birth', title: string) => void;
}

const MareHeatCycleTable = ({ mareId, viewMode, onViewModeChange, onActionClick }: MareHeatCycleTableProps) => {
  const { searchTerm, setSearchTerm, filteredRecords } = useRecordSearch({
    records: mockHeatCycles,
    searchFields: ['intensity', 'notes']
  });

  const { handleEdit, handleView, handleAddRecord } = useRecordActions({
    mareId,
    onActionClick
  });

  const handleAddHeatCycle = () => {
    handleAddRecord('checkup', 'Record Heat Cycle');
  };

  const renderContent = () => {
    if (viewMode === 'table') {
      return (
        <HeatCycleTable
          cycles={filteredRecords}
          onEdit={(cycleId) => handleEdit(cycleId, 'heat-cycle')}
          onView={(cycleId) => handleView(cycleId, 'heat-cycle')}
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
              onEdit={() => handleEdit(record.id, 'heat-cycle')}
              onView={() => handleView(record.id, 'heat-cycle')}
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
              onEdit={() => handleEdit(record.id, 'heat-cycle')}
              onView={() => handleView(record.id, 'heat-cycle')}
            />
          ))}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <RecordHeader
        title="Heat Cycle Tracking"
        viewMode={viewMode}
        onViewModeChange={onViewModeChange}
        onAddRecord={handleAddHeatCycle}
        addButtonText="Record Heat Cycle"
        exportLabel="Export Data"
      />

      <RecordSearch
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        placeholder="Search by intensity or notes..."
      />

      <StatisticsCards statistics={heatCycleStatistics} />

      {renderContent()}
    </div>
  );
};

export default MareHeatCycleTable;
