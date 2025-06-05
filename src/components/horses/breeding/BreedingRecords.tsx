
import BreedingRecordsHeader from "./components/BreedingRecordsHeader";
import BreedingRecordsStats from "./components/BreedingRecordsStats";
import BreedingRecordsFilters from "./components/BreedingRecordsFilters";
import BreedingRecordsGrid from "./components/BreedingRecordsGrid";
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
  } = useBreedingRecords();

  return (
    <div className="space-y-6">
      <BreedingRecordsHeader onAddRecord={() => setShowAddDialog(true)} />
      
      <BreedingRecordsStats stats={stats} />

      <BreedingRecordsFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
      />

      <BreedingRecordsGrid records={filteredRecords} />

      <AddBreedingRecordDialog 
        open={showAddDialog} 
        onOpenChange={setShowAddDialog}
      />
    </div>
  );
};

export default BreedingRecords;
