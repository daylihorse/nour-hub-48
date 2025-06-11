
import { useMareContext } from "@/contexts/MareContext";

export const useMareManagement = () => {
  const {
    searchTerm,
    setSearchTerm,
    filteredMares,
    updateMare,
    isLoading,
    error
  } = useMareContext();

  return {
    searchTerm,
    setSearchTerm,
    mares: filteredMares,
    filteredMares,
    updateMare,
    isLoading,
    error
  };
};
