
import { useState } from "react";
import { StoreProduct, StoreService } from "@/types/store";
import { useMarketplaceData } from "./hooks/useMarketplaceData";
import MarketplaceHeader from "./components/MarketplaceHeader";
import MarketplaceItemGrid from "./components/MarketplaceItemGrid";
import MarketplaceLoadingState from "./components/MarketplaceLoadingState";
import MarketplaceErrorState from "./components/MarketplaceErrorState";
import MarketplaceEmptyState from "./components/MarketplaceEmptyState";

interface MarketplaceViewProps {
  onAddToCart?: (item: StoreProduct | StoreService, type: 'product' | 'service') => void;
  showAddToCart?: boolean;
}

const MarketplaceView = ({ onAddToCart, showAddToCart = false }: MarketplaceViewProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  
  const {
    isLoading,
    error,
    filteredItems,
    availableCategories,
    setError,
    setIsLoading
  } = useMarketplaceData();

  console.log('Props - showAddToCart:', showAddToCart, 'onAddToCart:', !!onAddToCart);

  const items = filteredItems(searchTerm, categoryFilter);
  console.log('Rendering MarketplaceView with:', items.length, 'items');
  console.log('Search term:', searchTerm, 'Category filter:', categoryFilter);

  const handleRetry = () => {
    setError(null);
    setIsLoading(true);
    window.location.reload();
  };

  if (isLoading) {
    return <MarketplaceLoadingState />;
  }

  if (error) {
    return <MarketplaceErrorState error={error} onRetry={handleRetry} />;
  }

  return (
    <div className="space-y-6">
      <MarketplaceHeader
        searchTerm={searchTerm}
        categoryFilter={categoryFilter}
        availableCategories={availableCategories}
        onSearchChange={setSearchTerm}
        onCategoryChange={setCategoryFilter}
      />

      <MarketplaceItemGrid
        items={items}
        showAddToCart={showAddToCart}
        onAddToCart={onAddToCart}
      />

      {items.length === 0 && !isLoading && <MarketplaceEmptyState />}
    </div>
  );
};

export default MarketplaceView;
