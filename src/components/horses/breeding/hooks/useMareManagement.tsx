
import { useMareContext } from "@/contexts/MareContext";

export const useMareManagement = () => {
  const {
    searchTerm,
    setSearchTerm,
    filteredMares,
    updateMare,
    isLoading,
    error,
    mares
  } = useMareContext();

  return {
    searchTerm,
    setSearchTerm,
    mares: filteredMares, // Use filteredMares as the main mares array
    filteredMares,
    updateMare,
    isLoading,
    error
  };
};
