
import { useRecordSearch } from "../hooks/useRecordSearch";
import { useRecordActions } from "../hooks/useRecordActions";
import RecordHeader from "../components/RecordHeader";
import RecordSearch from "../components/RecordSearch";
import StatisticsCards from "../components/StatisticsCards";
import FoalingHistoryTable from "./foaling/FoalingHistoryTable";
import RecordCard from "../components/RecordCard";
import RecordListItem from "../components/RecordListItem";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Baby } from "lucide-react";
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
    searchFields: ['foalName', 'sire', 'color']
  });

  const { handleEdit, handleView, handleAddRecord } = useRecordActions({
    mareId,
    onActionClick
  });

  const handleAddBirth = () => {
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
        <>
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
          
          {/* Detailed Foal Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredRecords.map((foal) => (
              <Card key={foal.id} className="border-slate-200 hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
                    <Baby className="h-5 w-5" />
                    {foal.foalName}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Registration</p>
                        <p className="font-semibold">{foal.registrationNumber}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Current Location</p>
                        <p className="font-semibold">{foal.currentLocation}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Height at Birth</p>
                        <p className="font-semibold">{foal.height}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Weaning Date</p>
                        <p className="font-semibold">{new Date(foal.weaningDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                    {foal.complications !== "None" && (
                      <div>
                        <p className="text-sm text-muted-foreground">Birth Complications</p>
                        <p className="font-semibold text-orange-600">{foal.complications}</p>
                      </div>
                    )}
                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        View Full Record
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        Health Records
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
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
        onAddRecord={handleAddBirth}
        addButtonText="Add Birth Record"
        exportLabel="Export Records"
      />

      <RecordSearch
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        placeholder="Search by foal name, sire, or color..."
      />

      <StatisticsCards statistics={foalingStatistics} />

      {renderContent()}
    </div>
  );
};

export default MareFoalingHistoryTable;
