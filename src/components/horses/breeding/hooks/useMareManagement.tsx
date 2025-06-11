
import { useMareContext } from "@/contexts/MareContext";
import { useEffect } from "react";

export const useMareManagement = () => {
  const {
    searchTerm,
    setSearchTerm,
    filteredMares,
    updateMare,
    isLoading,
    error,
    mares,
    clearError
  } = useMareContext();

  // Debug logging
  useEffect(() => {
    console.log('useMareManagement - Total mares:', mares.length);
    console.log('useMareManagement - Filtered mares:', filteredMares.length);
    console.log('useMareManagement - Search term:', searchTerm);
    if (error) {
      console.error('useMareManagement - Error:', error);
    }
  }, [mares.length, filteredMares.length, searchTerm, error]);

  return {
    searchTerm,
    setSearchTerm,
    mares: filteredMares, // Use filteredMares as the main mares array
    filteredMares,
    updateMare,
    isLoading,
    error,
    clearError
  };
};
