
import MareFilters from "./components/MareFilters";
import MareStats from "./components/MareStats";
import MareTableContainer from "./components/MareTableContainer";
import { useMareManagement } from "./hooks/useMareManagement";

const MareManagement = () => {
  const {
    searchTerm,
    setSearchTerm,
    filteredMares,
  } = useMareManagement();

  return (
    <div className="space-y-6">
      <MareFilters 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <MareStats />

      <MareTableContainer mares={filteredMares} />
    </div>
  );
};

export default MareManagement;
