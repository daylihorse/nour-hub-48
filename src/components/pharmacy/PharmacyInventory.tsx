
import { usePharmacyInventory } from "./inventory/usePharmacyInventory";
import InventoryHeader from "./inventory/InventoryHeader";
import InventoryFilters from "./inventory/InventoryFilters";
import InventoryItemsList from "./inventory/InventoryItemsList";

const PharmacyInventory = () => {
  const {
    searchTerm,
    setSearchTerm,
    categoryFilter,
    setCategoryFilter,
    stockFilter,
    setStockFilter,
    filteredItems
  } = usePharmacyInventory();

  return (
    <div className="space-y-6">
      <InventoryHeader />
      
      <InventoryFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        stockFilter={stockFilter}
        setStockFilter={setStockFilter}
      />

      <InventoryItemsList items={filteredItems} />
    </div>
  );
};

export default PharmacyInventory;
