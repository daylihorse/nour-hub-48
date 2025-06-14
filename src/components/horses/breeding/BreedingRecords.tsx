
import BreedingRecordsHeader from "./components/BreedingRecordsHeader";
import BreedingRecordsStats from "./components/BreedingRecordsStats";
import BreedingRecordsFilters from "./components/BreedingRecordsFilters";
import BreedingRecordsGrid from "./components/BreedingRecordsGrid";
import BreedingRecordsList from "./components/BreedingRecordsList";
import BreedingRecordsTable from "./components/BreedingRecordsTable";
import BreedingRecordsViewSelector from "./components/BreedingRecordsViewSelector";
import AddBreedingRecordDialog from "./AddBreedingRecordDialog";
import { useBreedingRecords } from "./hooks/useBreedingRecords";

const BreedingRecords = () => {
  const {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    typeFilter,
    setTypeFilter,
    showAddDialog,
    setShowAddDialog,
    filteredRecords,
    stats,
    viewMode,
    setViewMode,
    gridSize,
    setGridSize,
  } = useBreedingRecords();

  const renderView = () => {
    const commonProps = {
      records: filteredRecords,
      onEditRecord: (record: any) => console.log('Edit record:', record),
      onViewDetails: (record: any) => console.log('View details:', record),
      onDeleteRecord: (record: any) => console.log('Delete record:', record),
    };

    switch (viewMode) {
      case "grid":
        return <BreedingRecordsGrid {...commonProps} gridSize={gridSize} />;
      case "list":
        return <BreedingRecordsList {...commonProps} />;
      case "table":
        return <BreedingRecordsTable {...commonProps} />;
      default:
        return <BreedingRecordsGrid {...commonProps} gridSize={gridSize} />;
    }
  };

  return (
    <div className="space-y-6">
      <BreedingRecordsHeader 
        onAddRecord={() => setShowAddDialog(true)}
        viewSelector={
          <BreedingRecordsViewSelector
            currentView={viewMode}
            onViewChange={setViewMode}
            gridSize={gridSize}
            onGridSizeChange={setGridSize}
          />
        }
      />
      
      <BreedingRecordsStats stats={stats} />

      <BreedingRecordsFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
      />

      {renderView()}

      <AddBreedingRecordDialog 
        open={showAddDialog} 
        onOpenChange={setShowAddDialog}
      />
    </div>
  );
};

export default BreedingRecords;
