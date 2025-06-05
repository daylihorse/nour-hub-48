
import MareHeader from "./components/MareHeader";
import MareFilters from "./components/MareFilters";
import MareStats from "./components/MareStats";
import MareGrid from "./components/MareGrid";
import { useMareManagement } from "./hooks/useMareManagement";

const MareManagement = () => {
  const {
    searchTerm,
    setSearchTerm,
    filteredMares,
  } = useMareManagement();

  return (
    <div className="space-y-6">
      <MareHeader />
      
      <MareFilters 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <MareStats />

      <MareGrid mares={filteredMares} />
    </div>
  );
};

export default MareManagement;
