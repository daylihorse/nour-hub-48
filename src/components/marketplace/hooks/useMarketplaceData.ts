
import { useState, useEffect } from "react";
import { marketplaceService } from "@/services/marketplaceService";

export const useMarketplaceData = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('MarketplaceView component mounted');
    
    try {
      const items = marketplaceService.getAllMarketplaceItems();
      console.log('Initial items loaded:', items.length);
      setIsLoading(false);
    } catch (err) {
      console.error('Error initializing marketplace:', err);
      setError('Failed to load marketplace items');
      setIsLoading(false);
    }
  }, []);

  const filteredItems = (searchTerm: string, categoryFilter: string) => 
    marketplaceService.filterItems(searchTerm, categoryFilter === "all" ? "" : categoryFilter);

  const availableCategories = marketplaceService.getAvailableCategories();

  return {
    isLoading,
    error,
    filteredItems,
    availableCategories,
    setError,
    setIsLoading
  };
};
