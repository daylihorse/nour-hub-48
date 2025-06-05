
import StallionHeader from "./components/StallionHeader";
import StallionFilters from "./components/StallionFilters";
import StallionGrid from "./components/StallionGrid";
import StallionStats from "./components/StallionStats";
import { useStallionManagement } from "./hooks/useStallionManagement";

const StallionManagement = () => {
  const {
    searchTerm,
    setSearchTerm,
    filteredStallions,
  } = useStallionManagement();

  return (
    <div className="space-y-6">
      <StallionHeader />
      
      <StallionFilters 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <StallionGrid stallions={filteredStallions} />

      <StallionStats />
    </div>
  );
};

export default StallionManagement;
